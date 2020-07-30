
module.exports = {
  '/rest/mallOrderRest/before': {
    '$post': {
      "total": 0,
      "data": {
      "goodsList": [
                  {
      "goodsId": 1,
      "price": 120,          //商品总价
      "count": 8,
      "goodsName": "富士苹果"
                  }
              ],
      "yhList": [               //优惠列表
                  {
      "isFit": 2,            //是否满足 1满足 2不满足
      "name": "5.0元优惠劵(新用户)",
      "redInfo": "新",
      "key": "newUser"
                  },
                  {
      "isFit": 1,
      "name": "鲜果礼包",
      "redInfo": "赠",
      "key": "gift"
                  },
                  {
      "isFit": 2,
      "name": "5元优惠券(满50元)",
      "redInfo": "满减",
      "key": "free1"
                  },
                  {
      "isFit": 1,
      "name": "12元优惠券(满100元)",
      "redInfo": "满减",
      "key": "free2"
                  },
                  {
      "isFit": 1,
      "name": "满0.0元免0.0元配送费",
      "redInfo": "免",
      "key": "over"
                  }
              ],
      "defaultAddress": {            //默认地址信息
      "id": 1,
      "userName": "屌丝it",
      "createTime": 1449921370529,
      "areaName": "广东省 深圳市 福田区",
      "phone": "13527616959",
      "areaInfo": "天祥大厦ab栋 xx楼 xx公司",
      "areaId": 3,
      "isDefault": 1,
      "labelInfo": "家"
              },
      "freePostage": {                    //邮费信息
      "freePostagePrice": 0,
      "isFit": 1,                         //1免邮 2需要邮费
      "postagePrice": 0
              },
      "totalPrice": 103                 //总价
          },
      "desc": "ok",
      "code": "0001",
      "rows": []
      }
                  
  }
}; 



  