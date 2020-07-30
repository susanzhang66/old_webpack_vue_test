import flag from './flag'
import api from './api'
const Utils = {
  RegexMap: {
        //制表符
        table: /\t/g,
        //换行符
        line: /\n/g,
        //正负整数或浮点数
        intOrFloat: /^(-)?\d+(\.\d+)?$/,
        //组织机构代码
        enterpriseCode: /^[a-zA-Z0-9]{8}-[a-zA-Z0-9]$/,
        //工商执照注册号
        enterpriseRegCode: /^\d{13}$|^\d{15}$/, //   以前是13位,08年以后变15位
        //身份证
        idCard: /^\d{15}$|^\d{18}$|^\d{17}(\d|X|x)$/,
        // 手机号码
        //MobileNo: /^1[34587]\d{9}$/,
        MobileNo: /^1\d{10}$/,
        // 银行卡号（大于或等于16位的数字）
        CardNo: /^\d{16,}$/,
        // 短验证码（6位数字以上）
        MobileCode: /^\d{6,}$/,
        // 交易密码(6-16位数字或字母)
        OrderPassword: /^\S{6,16}$/,
        //千分位正则
        parseThousands: /(\d{1,3})(?=(\d{3})+(?:$|\.))/g,
        //每4位字符用空格隔开
        bankCardNo: /(\d{4})(?=\d)/g,
        //金额检测
        moneyTest: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
        //卡号屏蔽
        parseToStarNumber: /^(\d{4})(\d+)(\d{4})$/,
        // 后四位屏蔽
        parseRightFourStar: /^(\w+)(\w{4})$/,
        //日期格式检测
        parseDateFormat: /\b(\d{4})\b[^\d]+(\d{1,2})\b[^\d]+(\d{1,2})\b(\s(\d{1,2}):(\d{1,2}):(\d{1,2}))?[^\d]?/,
        // 出生日期掩码，显示格式（"19**年**月*2日")
        userBirthdayStarRegex: /(\d{2})\d{2}([^\d]+)\d+([^\d]+)\d?(\d)([^\d]+)?/,
        //金额转换
        moneyReplace: /[^0-9.]/g,
        //POS机编号
        posNumberREG: /^[0123456789]\d{14}$/,
        //lufax's name
        lufaxName: /^[a-zA-Z0-9-_]{4,30}$/g,
        //图片格式
        isImg: /\.(gif|jpg|jpeg|png)$/i
  },
  RegexReplacement: {
      parseThousands: '$1,',
      parseToStarNumber: function ($0, $1, $2, $3) {
          return $1 + $2.replace(/\d/g, '*') + $3;
      },
      parseRightFourStar: function ($0, $1, $2) {
          return $1.replace(/\w/g, '*') + $2;
      }
  },
  /**
   * 日志打印方法
   * @param text 需要打印的日志内容
   */
  logs: function (text) {
    window.console && console.log && console.log(text);
  },
  parseThousands: function (priceVal) {
      return ((priceVal || '0') + '').replace(Utils.RegexMap.parseThousands, Utils.RegexReplacement.parseThousands);
  },
  /**
   * 本地数据操作
   * @param key
   * @param value
   * @param type{0-localStorage, 1-sessionStorage}
   */
  data: function (key, value, type) {
      var storage = localStorage;
      if (type && type == '1') {
          storage = sessionStorage;
      }
      var getItemValue = function () {
          var data = storage.getItem(key);
          try {
              data = JSON.parse(data);
          } catch (e) {
              Utils.logs(e.message);
          }
          return data;
      };
      if (key && value === undefined) {
          return getItemValue();
      } else if (key && value === null) {
          storage.removeItem(key);
      } else {
          storage.setItem(key, JSON.stringify(value));
      }
  },
  /**
   * 公共方法定义
   * @example: http://xxx.com/a.do?productCode=P001
   *     Result:  C.getParameter('productCode')  // 'P001'
   */
  getParameter: function (param) {
      var reg = new RegExp('[&,?,&amp;]' + param + '=([^\\&]*)', 'i');
      var hrefStr = location.search;
      hrefStr = decodeURIComponent(decodeURIComponent(hrefStr));
      var value = reg.exec(hrefStr);
      return value ? value[1] : '';
  },
  /**
   * 获取URL参数对象
   * @param queryString
   * @returns {{}}
   */
  getQueryMap: function (queryString) {
      var paramObj = {},
          paramList,
          oneQueryMatch,
          regGlobal = /[?&][^?&]+=[^?&#]+/g,
          regOne = /[?&]([^=?]+)=([^?&#]+)/;

      queryString = queryString || location.href;
      paramList = queryString.match(regGlobal);

      if (!paramList) {
          return paramObj;
      }

      for (var i = 0, len = paramList.length; i < len; i++) {
          oneQueryMatch = paramList[i].match(regOne);
          if (null === oneQueryMatch) {
              continue;
          }
          paramObj[oneQueryMatch[1]] = oneQueryMatch[2];
      }

      return paramObj;
  },
  /**
   * 获取HTML页面名称
   * @returns {{}}
   */
  getHtmlName: function () {
      var hostName = location.href;
      var htmlName,
          htmlNameOrg;
      if (hostName.indexOf('?') != -1) {
          htmlNameOrg = hostName.substring(0, hostName.indexOf('?'));
          htmlName = htmlNameOrg.substring(htmlNameOrg.lastIndexOf('/') + 1);
      } else {
          htmlName = hostName.substring(hostName.lastIndexOf('/') + 1);
      }
      htmlName = htmlName.replace('.html', '');
      return htmlName;
  },
  /**
   * 获取填写身份证相关的信息
   * @ param str 截取的出生日期字符串 或 身份证号
   * @ param type 传入第二个值是证明需返回的是string，否则是boolean
   * 检测身份证中的日期是否有效
   *
   */
  strDateTime: function (str, type) {
      type = type || true;
      // 如果传入的是身份证号时，从第6位开始截取8个字符
      if(str.length == 18){
          str = str.substr(6, 8);
      }
      var r = str.match(/^(\d{1,4})(-|\/)?(\d{1,2})\2(\d{1,2})$/);
      if(r===null)return false;
      var d= new Date(r[1], r[3]-1, r[4]);
      var now = new Date();
      var minDate = new Date('1900-01-01'), maxDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      // 如果不符合最大当前日期，最小1900年1月1日，则不通过日期校验
      if(d < minDate || d > maxDate){
          return false;
      }
      if(type){
          return d.getFullYear()+'年'+(d.getMonth()+1)+'月'+d.getDate()+'月';
      }

      return (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4]);
  },
  // 判断对象中属性的值为空的个数
  isEmptyAttrValObject: function (obj) {
      var count = 0;
      if(_.isArray(obj)){
          for(var i=0, len = obj.length;i<len;i++){
              count = _.filter(obj[i], function(val){ return !!val == false;}).length;
          }
      }else{
          count = _.filter(obj, function(val){ return !!val == false;}).length;
      }
      return !!count;
  },
  // 设置优惠券展示几折,0.9 => 9; 0.99 => 9.9 ; 0.999 => 9.99。
  setRenerCouponRate: function (inputRate) {
      var rateString = String(inputRate);
      // 兼容处理，如果传进来不含小数点，那么直接原路返回。
      if (rateString.indexOf('.') == -1) return inputRate;

      // 去掉数字后面没有用的0，比如0.900，转为0.9
      var removeZero = function (str) {
          var lastItem = str.charAt(str.length - 1);
          if (lastItem == '0') {
              var newStr = str.substring(0, str.length - 1);
              return removeZero(newStr);
          }
          return str;
      };
      // 去0的字符串
      var noZeroStr = removeZero(rateString);
      // 拿到“.”后面的字符串
      var decimals = noZeroStr.split('.')[1];
      // 然后取长度 - 1的值，就是需要保留几位小数
      var fixedlength = decimals.length - 1;
      try {
          return (Number(inputRate) * 10).toFixed(fixedlength);
      } catch (err) {
          // 万一报错也原路返回
          return inputRate;
      }
  },
  // 金额格式化
  formatMoney: function (s, n) {
      if(!s) return s;
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + '').replace(/[^\d.-]/g, '')).toFixed(n) + '';
      var l = s.split('.')[0].split('').reverse(),
          r = s.split('.')[1],
          t = '';
      for(var i = 0; i < l.length; i ++ )
      {
          t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
      }
      return t.split('').reverse().join('') + '.' + r;
  },
  /** 转换日期格式
   * @param date : 日期格式|String类型 (如：'2012-12-12' | '2012年12月12日' | new Date())
   * @param format : String类型 （如: 'yyyy年MM月dd日'或'yyyy年MM月dd日 hh时mm分ss秒',默认'yyyy-MM-dd'）
   * @example C.parseDateFormat(new Date(), 'yyyy年MM月dd日') 输出："2014年04月29日"
   * @example C.parseDateFormat(new Date()) 输出："2014-04-29"
   * @exmaple C.parseDateFormat("2014-05-07 16:09:47","yyyy年MM月dd日 hh时mm分ss秒")
   *          输出："2014年05月07日 16时09分47秒"
   **/
  parseDateFormat: function (date, format) {
      if(!date){
          return date || '';
      }
      if(!isNaN(date) && String(date).length == 8){
          date = (date+'').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1/$2/$3');
      }
      var addZero = function (val) {
          return /^\d{1}$/.test(val) ? '0' + val : val;
      };
      format = format || 'yyyy-MM-dd';
      var year = '', month = '', day = '', hours = '', minutes = '', seconds = '';
      if (typeof date == 'string') {
          var dateReg = Utils.RegexMap.parseDateFormat;
          var dateMatch = date.match(dateReg);
          if (dateMatch) {
              year = dateMatch[1];
              month = dateMatch[2];
              day = dateMatch[3];
              hours = dateMatch[5];
              minutes = dateMatch[6];
              seconds = dateMatch[7];
          }
      } else {
          year = date.getFullYear();
          month = date.getMonth() + 1;
          day = date.getDate();
          hours = date.getHours();
          minutes = date.getMinutes();
          seconds = date.getSeconds();
      }
      month = addZero(month);
      day = addZero(day);
      hours = addZero(hours);
      minutes = addZero(minutes);
      seconds = addZero(seconds);
      return format.replace('yyyy', year).replace('MM', month).replace('dd', day).replace('hh', hours).replace('mm', minutes).replace('ss', seconds);
  },
  // 为界面金额添加分隔逗号
  regMoneyAndDou: function (money) {
      if(money =='0'){
          return '0';
      }
      money = money.toString();
      var source= money.replace(/,/g, '').split('.');
      source[0]=source[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
      if(source[1]){
          money = source[0]+'.'+source[1];
      }else{
          money = source[0];
      }
      return money;
  },
  // 每4个字符用空格隔开
  formatCardNo: function (num) {
    num = num.toString()
    return num.replace(Utils.RegexMap.bankCardNo, '$1 ').replace(/\s*$/, '')
  },
  /**
   * 费率小数换算
   * 如：后台返回费率均是%之前的返回数据，即：如果费率为0.78%，后台实际返回0.0078.前端要做%处理。
   * 0.07--->0.0070--->00.70--->0.70
   * 0.0078--->0.0070--->00.70--->0.70
   * 0.00792--->0.0079--->00.79--->0.79
   * 0.1278--->0.1270--->12.70--->12.70
   */
  toChangeXS: function (num) {
      var temp = num.toString();
      if(temp.length<=5){
          var cha = 6-temp.length;
          for(var i=0;i<cha;i++){
              temp = temp+'0';
          }
      }else if(temp.length<=6){
          temp = temp.substring(0, 5)+'0';
      }else{
          temp = temp.substring(0, 6);
      }
      var start = temp.substring(2, 4);
      var end = temp.substring(4, 6);
      if(start.indexOf(0)=='0'){
          start = start.substring(1);
      }
      return start+'.'+end;
  },
  /**
   * iloan小数加法运算，并保证小数点保留两位小数
   */
  iloanAccAdd: function () {
      var decimals = [], m, sum = 0, value, i;
      for (i = 0; i < arguments.length; i++) {
          if(arguments[i].toString().indexOf('.') != -1){
              decimals.push(arguments[i].toString().split('.')[1].length);
          }
      }
      m = Math.pow(10, decimals.sort(function(a, b){return b - a;})[0]);
      for (i = 0;i < arguments.length; i++){
          sum += Math.round(arguments[i]*m);
      }
      value = sum/m;
      if (value.toString().indexOf('.') == -1) {
          value = value + '.00';
      } else {
          var afterDoitLen = value.toString().substring(value.toString().indexOf('.'), value.toString().length).length;
          if (afterDoitLen < 3) {
              var cha = 3 - afterDoitLen;
              for (i = 0; i < cha; i++) {
                  value = value + '0';
              }
          }
      }
      return value;
  },
  /**
   * 小数加法运算，并保证小数点保留两位小数
   */
  accAdd: function(arg1, arg2){
      var r1, r2, m;
      try{r1=arg1.toString().split('.')[1].length;}catch(e){r1=0;}
      try{r2=arg2.toString().split('.')[1].length;}catch(e){r2=0;}
      m=Math.pow(10, Math.max(r1, r2));
      var value = (arg1*m+arg2*m)/m;
      if(value.toString().indexOf('.')==-1){
          value = value+'.00';
      }else{
          var afterDoitLen = value.toString().substring(value.toString().indexOf('.'), value.toString().length).length;
          if(afterDoitLen<3){
              var cha = 3 - afterDoitLen;
              for(var i=0;i<cha;i++){
                  value = value+'0';
              }
          }
      }
      return value;
  },
  /**
   * 计算month月day日的日期+monthDays间隔天数（其实就是这个月month的天数）之后的日期
   * 如果当前day>这个月的天数，就说明是下一个月的了，求取多出的天数nextDay
   * 返回{month：加后的月份，day：加后的日}
   */
  calcDay: function(month, day, monthDays){
      var nextDay = 0;
      if(day>monthDays){
          nextDay = monthDays % day;
      }
      if(nextDay!=0){
          month = month+1;
          if(month == 13){//加到下一年
              month = 1;
          }
          day = nextDay;
      }
      return {month: month, day: day};
  },
  /**
   * 转义<> ", 页面带出数据时需先调用该方法替换，避免跨站脚本攻击
   * @param  {[type]} str [description]
   * @return {[type]}     [description]
   */
  escapeHtml: function(str) {
      return str ? str.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\\"/g, '&quot;') : '';
  },
  /**
   * base64编码码
   * @param str 需base64编码字符
   * @returns {*} base64解码后的字符
   */
  base64encode: function (str) {
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var out, i, len;
      var c1, c2, c3;
      str=this.utf16to8(str);
      len = str.length;
      i = 0;
      out = '';
      while (i < len) {
          c1 = str.charCodeAt(i++) & 0xff;
          if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt((c1 & 0x3) << 4);
              out += '==';
              break;
          }
          c2 = str.charCodeAt(i++);
          if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
              out += base64EncodeChars.charAt((c2 & 0xF) << 2);
              out += '=';
              break;
          }
          c3 = str.charCodeAt(i++);
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
          out += base64EncodeChars.charAt(c3 & 0x3F);
      }
      return out;
  },
  utf16to8: function (str) {
      var out, i, len, c;

      out = '';
      len = str.length;
      for (i = 0; i < len; i++) {
          c = str.charCodeAt(i);
          if ((c >= 0x0001) && (c <= 0x007F)) {
              out += str.charAt(i);
          } else if (c > 0x07FF) {
              out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
              out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          } else {
              out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
          }
      }
      return out;
  },
  /**
   * base64加密
   * @param {Object} str
   */
  base64DecodeChars: function(str) {
      var base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      var out, i, len;
      var c1, c2, c3;
      str=this.utf8_decode(str);
      len = str.length;
      i = 0;
      out = '';
      while (i < len) {
          c1 = str.charCodeAt(i++) & 0xff;
          if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt((c1 & 0x3) << 4);
              out += '==';
              break;
          }
          c2 = str.charCodeAt(i++);
          if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
              out += base64EncodeChars.charAt((c2 & 0xF) << 2);
              out += '=';
              break;
          }
          c3 = str.charCodeAt(i++);
          out += base64EncodeChars.charAt(c1 >> 2);
          out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
          out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
          out += base64EncodeChars.charAt(c3 & 0x3F);
      }
      return out;
  },
  //电子签名使用base64加密方法
  Base64T: {
      _keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
      _utf8_encode: function (r) {
          r = r.replace(/\r\n/g, '\n');
          var e = '';
          for (var t = 0; t < r.length; t++) {
              var n = r.charCodeAt(t);
              n < 128 ? e += String.fromCharCode(n) : n > 127 && n < 2048 ? (e += String.fromCharCode(n >> 6 | 192), e += String.fromCharCode(63 & n | 128)) : (e += String.fromCharCode(n >> 12 | 224), e += String.fromCharCode(n >> 6 & 63 | 128), e += String.fromCharCode(63 & n | 128));
          }
          return e;
      },
      encode: function (r) {
          var e, t, n, o, a, i, c, f = '', u = 0;
          for (r = Utils.Base64T._utf8_encode(r); u < r.length;)o = (e = r.charCodeAt(u++)) >> 2, a = (3 & e) << 4 | (t = r.charCodeAt(u++)) >> 4, i = (15 & t) << 2 | (n = r.charCodeAt(u++)) >> 6, c = 63 & n, isNaN(t) ? i = c = 64 : isNaN(n) && (c = 64), f = f + this._keyStr.charAt(o) + this._keyStr.charAt(a) + this._keyStr.charAt(i) + this._keyStr.charAt(c);
          return f;
      }
  },
  /**
   * base64解码
   * @param {Object} str
   */
  base64decode: function(input) {
      var _keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',
          output = '';
      var chr1, chr2, chr3;
      var enc1, enc2, enc3, enc4;
      var i = 0;
      if (!input) return input;
      input = input.replace(/[^A-Za-z0-9+/=]/g, '');
      while (i < input.length) {
          enc1 = _keyStr.indexOf(input.charAt(i++));
          enc2 = _keyStr.indexOf(input.charAt(i++));
          enc3 = _keyStr.indexOf(input.charAt(i++));
          enc4 = _keyStr.indexOf(input.charAt(i++));
          chr1 = (enc1 << 2) | (enc2 >> 4);
          chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
          chr3 = ((enc3 & 3) << 6) | enc4;
          output = output + String.fromCharCode(chr1);
          if (enc3 != 64) {
              output = output + String.fromCharCode(chr2);
          }
          if (enc4 != 64) {
              output = output + String.fromCharCode(chr3);
          }
      }
      output = this.utf8_decode(output);
      return output;
  },
  // 解码成utf-8
  utf8_decode: function(utftext) {
      var string = '';
      var i = 0;
      var c, c2, c3;
      while (i < utftext.length) {
          c = utftext.charCodeAt(i);
          if (c < 128) {
              string += String.fromCharCode(c);
              i++;
          } else if ((c > 191) && (c < 224)) {
              c2 = utftext.charCodeAt(i + 1);
              string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
              i += 2;
          } else {
              c2 = utftext.charCodeAt(i + 1);
              c3 = utftext.charCodeAt(i + 2);
              string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
              i += 3;
          }
      }
      return string;
  },
  //金额正则校验
  numFilter: function (number, digit, flag) {
      if(number == '0'){ // 可以输入0
          return '0';
      }
      if('' == number && typeof number == 'string'){
          return '';
      }
      if (parseFloat(number) > 1 || parseFloat(number) == 0 && !/\./.test(number)) {
          number = number.replace(/^(\s*)(0*)(.*?)/, '');
      }
      number = number.replace(/[^\d.]/g, '');
      number = number.replace(/\.{1,}/g, '.');
      return number.match(new RegExp('\\d+\\.?\\d{0,'+(digit || 1)+'}'));//提取 只保留俩位小数
  },
  /**
   * 婚姻、学历、职务
   * @param str dataInfo：merryInfo-婚姻 jobInfo-职务 degreeInfo-学历  code：编码
   * @returns !code -> teturn [{}]    code -> 对应dataInfo类型的text
   * **/
  chooseInfo: function (dataInfo, code) {
      var textInfo;
      var obj = {
          merryInfo: CONSTANT.MERRYINFO,
          jobInfo: CONSTANT.JOBINFO,
          degreeInfo: CONSTANT.DEGREEINFO
      };

      if(!obj[dataInfo]) {
          return false;
      }
      if(typeof code != 'undefined') {
          obj[dataInfo].forEach(function (val) {
              if(val['code'] == code){
                  textInfo = val['text'];
                  return;
              }
          });
          return textInfo;
      }
      return obj[dataInfo];

  },
  /**
   * 数字转中文
   * @param num -> str 数字
   * @returns re ->   str-中文数字
   * **/
  NoToChinese: function (num) {
      if (!/^\d*(\.\d*)?$/.test(num)) {
          return;
      }
      var AA = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
      var BB = ['', '十', '百', '千', '万', '亿', '点', ''];
      var a = ('' + num).replace(/(^0*)/g, '').split('.'), k = 0, re = '';
      for (var h = a[0].length - 1; h >= 0; h--) {
          switch (k) {
              case 0:
                  re = BB[7] + re;
                  break;
              case 4:
                  if (!new RegExp('0{4}\\d{' + (a[0].length - h - 1) + '}$').test(a[0])){
                      re = BB[4] + re;
                  }
                  break;
              case 8:
                  re = BB[5] + re;
                  BB[7] = BB[5];
                  k = 0;
                  break;
          }
          if (k % 4 == 2 && a[0].charAt(h + 2) != 0 && a[0].charAt(h + 1) == 0) re = AA[0] + re;
          if (a[0].charAt(h) != 0) re = AA[a[0].charAt(h)] + BB[k % 4] + re;
          k++;
      }

      if (a.length > 1) //加上小数部分(如果有小数部分)
      {
          re += BB[6];
          for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
      }
      return re;
  },
  //823 重新封装ajax,只用于该页面,请求CC的OCR校验系统
  xmlHttp: function(opt){
      var xhr = null;
      // var _ajax = $.ajax;
      // 页面中自定义的回调函数
      var fn = {
          success: opt.success || function(data){
              //
          },
          error: opt.error || function(XMLHttpRequest, textStatus, errorThrown){
              //
          },
          complete: opt.complete || function(XHR, TS){
              //
          }
      };
      // 合并共用回调函数和页面回调函数
      var _opt = $.extend(opt, {
          // 设置默认参数
          type: opt.type || 'GET',
          data: opt.data || {},
          dataType: opt.dataType || 'json',
          // headers: opt.headers || {},
          // timeout: opt.timeout || 60000,
          success: function(data) {
              console.log('success callback data:' + JSON.stringify(data));
              // 执行页面回调函数之后再执行共用回调函数
              fn.success(data);
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
              fn.error(XMLHttpRequest, textStatus, errorThrown);
              // 增加ajax错误的标志
              _opt['Err'] = {content: fn.error};
          }
      });

      console.log(_opt);
      // 执行ajax请求
      // _ajax(_opt);
      xhr = new XMLHttpRequest();
      _opt.type = _opt.type.toUpperCase();
      // 连接
      if(_opt.type == 'GET'){
          xhr.open(_opt.type, _opt.url);
          xhr.send(null);
      }else if(_opt.type == 'POST'){
          xhr.open(_opt.type, _opt.url);//,options.async
          // 遍历出header的各项
          if(_opt.headers){
              for(var i in _opt.headers){
                  xhr.setRequestHeader(i, _opt.headers[i]);
              }
              // xhr.setRequestHeader("Content-Type",_opt.headers['Content-Type']);
              // xhr.setRequestHeader("source",_opt.headers.source);
              // xhr.setRequestHeader('serialNo',_opt.headers.serialNo);
          }
          xhr.send(_opt.data);
      }
      // 回调返回的函数
      xhr.onreadystatechange = function(){
          if(xhr.readyState == 4 ){
              if(xhr.status == 200){
                  _opt.success(xhr.responseText);
              }else{
                  _opt.error(xhr.responseText);
              }
          }
      };
  },
  // 823 调用AES解密
  aesDecrypt: function(word) {
      var result = word;
      // 密钥
      var key = window.CryptoJS.enc.Utf8.parse(word.key);//self.aesKey
      // 偏移量
      var iv = window.CryptoJS.enc.Utf8.parse(word.iv);//''a661ff2b56cb4703''
      // 解密方法
      var Decrypt = function(str) {
          str = str.replace(/(\n)+|(\r\n)+/g, ''); // 去除加密串中的换行符
          var decrypted = window.CryptoJS.AES.decrypt(str, key, {
              iv: iv,
              mode: window.CryptoJS.mode.CBC,
              padding: window.CryptoJS.pad.Pkcs7
          });
          return decrypted.toString(window.CryptoJS.enc.Utf8);
      };
      result = Decrypt(word.encryptData);
      return result;
  },
  /**
   * AES加密通用方法
   * options = {
      key : 'kTKQL2c6IkK4umXq' //密钥,
      iv : 'kTKQL2c6IkK4umXq' //偏移量,
      encryptData: 加密对象
    }
    * */
  aesEncrypt: function(options) {
      if(!options.key || !options.iv || !options.encryptData){
          return ;
      }
      // 密钥
      var key = CryptoJS.enc.Utf8.parse(options.key);
      // 偏移量
      var iv = CryptoJS.enc.Utf8.parse(options.iv);

      var encryptData = options.encryptData;
      if(typeof options.encryptData === 'object'){
          encryptData = JSON.stringify(encryptData);
      }

      var srcs = CryptoJS.enc.Utf8.parse(encryptData);

      var encrypted = CryptoJS.AES.encrypt(srcs, key, {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
  },
  /*
  * 判断对象是否包含某属性值
  * keyName 以 keys.child1.child2 区分嵌套对象
  */
  keyIsInObj: function(keyName, obj){
      var keys = keyName.split('.');
      var flag = true;
      var temp = obj;
      for(var i = 0, len = keys.length;i<len;i++){
          var key = keys[i];
          if(temp.hasOwnProperty(key)){
              temp = temp[key];
          }else{
              flag = false;
              break;
          }
      }
      return flag;
  },
  /*
  *新APP存储卡片数据
  * { currentcardOpt: {},
      nextCardOpt: {}
  * }
  */
  setStorageData: function(options){
      if (options.currentcardOpt) {
          this.data(CONSTANT.DataKey.O2O_CURRENT_CARD, options.currentcardOpt);
      }
      if (options.nextCardOpt){
          this.data(CONSTANT.DataKey.O2O_NEXT_CARD, options.nextCardOpt);
      }

  },
  //给时、分、秒补0
  addZero: function (val) {
      return /^\d{1}$/.test(val) ? '0' + val : val;
  },
  /**
   * 补足小数点后至少几位小数
   */
  formatFloat: function(value, number) {
      // 入参验证
      if(typeof value != 'number' || String(value) == '' ? true : false) return value;
      number = number ? number : 2;
      // 操作字符串
      var s = String(value);
      var arr = s.split('.');
      var integer = arr[0];
      var decimal = arr[1] ? arr[1] : '';
      if(decimal.length<number){
          for(var i=decimal.length; i<number; i++) {
              decimal += '0';
          }
      }
      return integer + '.' + decimal;
  },
  /**
   * 小数减法运算，防止小数点相减出现误差
   * 例如 80.4-30.4=50.00000000000001
   */
  accSub: function() {
      var decimals = [], m, result = 0, value;
      for (var i = 0; i < arguments.length; i++){
          if(arguments[i].toString().indexOf('.') != -1){
              decimals.push(arguments[i].toString().split('.')[1].length);
          }
      }
      if (decimals.length === 0) {
          value = Number(arguments[0]) - Number(arguments[1]);
          return value;
      }
      m = Math.pow(10, decimals.sort(function(a, b){return b - a;})[0]);
      result = Math.round(arguments[0]*m) - Math.round(arguments[1]*m);
      value = result / m;
      return value;
  },
  /**
   * 小数加法运算，防止小数点相加出现误差
   */
  accAddPlus: function() {
      var decimals = [], sum = 0, value = 0, m, i, j;
      for (i = 0; i < arguments.length; i++) {
          if(arguments[i].toString().indexOf('.') != -1) {
              decimals.push(arguments[i].toString().split('.')[1].length);
          }
      }
      if (decimals.length === 0) {
          for (j = 0; j < arguments.length; j++){
              value += Number(arguments[j]);
          }
          return value;
      }
      m = Math.pow(10, decimals.sort(function(a, b){return b - a;})[0]);
      for (i = 0; i < arguments.length; i++){
          sum += Math.round(arguments[i]*m);
      }
      value = sum / m;
      return value;
  },
  regMoneyAndDous: function(money, n) {
      if (isNaN(money) || money == '0') {
          return '0.00';
      }
      isNaN(n) && (n = 2);
      money = (parseFloat(money).toFixed(n)).toString();
      var source = money.replace(/,/g, '').split('.');
      source[0] = source[0].replace(/(\d)(?=(\d{3})+$)/ig, '$1,');
      if (source[1]) {
          money = source[0] + '.' + source[1];
      } else {
          money = source[0];
      }
      return money;
  },
  validate: validate
};

function validate() {

  var Validator = function (opt) {
      this.cache = [];
      this.strategies = {
          isNonEmpty: function (value, errorMsg) {
              if (value === '') {
                  return errorMsg;
              }
          },
          minLength: function (value, length, errorMsg) {
              if (value.length < length) {
                  return errorMsg;
              }
          },
          isMobile: function (value, errorMsg) {
              if (!Utils.RegexMap.MobileNo.test(value)) {
                  return errorMsg;
              }
          },
          isIdNo: function (value, errorMsg) {
              if (!Utils.RegexMap.CardNo.test(value)) {
                  return errorMsg;
              }
          },
          issameNum:function(value,pwdValue,errorMsg){
            if( value !== pwdValue ){
                return errorMsg;
            }
          }
      };
      for (var i in opt) {
          this.strategies[i] = opt[i];
      }
  };
  Validator.prototype.add = function (value, rules) {
      var that = this;
      for (var i = 0, rule; rule = rules[i++];) {
          (function (rule) {
              var ary = rule.ruleName.split(':');
              var errorMsg = rule.errorMsg;
              that.cache.push(function () {
                  var ruleName = ary.shift();
                  ary.unshift(value);
                  ary.push(errorMsg);
                  return that.strategies[ruleName].apply(null, ary);
              });
          })(rule);
      }
  };
  Validator.prototype.start = function () {
      for (var i = 0, vlidatorFunc; vlidatorFunc = this.cache[i++];) {
          var errorMsg = vlidatorFunc();
          if (errorMsg) {
              return errorMsg;
          }
      }
  };

  return Validator;
}
/**
 * 封装函数,限制函数的执行次数,返回一个只允许被调用有限次数的函数,超过次数的调用会报出异常
 * @param {Function} fn 需要被封装的函数
 * @param {Number} lim 限制的次数,默认为1次
 */
export function $limitCalls(fn,lim) {
	var lim = lim||1;
	return function() {
		if (lim<=0)
			console.log('limit');
		lim--;
		fn.apply(this, arguments);
	}
}

export function singleton ( fn ){
  var result;
  return function(){
      return result || ( result = fn .apply( this, arguments ) );
  }
}

export const Flag = flag;
export const Api = api;

export default Utils;