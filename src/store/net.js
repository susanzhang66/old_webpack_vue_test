/*
 * @Author: your name
 * @Date: 2020-06-03 14:57:34
 * @LastEditTime: 2020-06-03 14:57:35
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/store/net.js
 */ 
import axios from '@/common/ajax'
import url from '@/common/api'

export const getMallAdInfoList =  new Promise((resolve, reject) => {
  axios({
    url: url.getMallAdInfoList,
    params: {

    }
  }).then(( data ) => {
      var _data = data.data;
      resolve( _data.data );
      // self.commit('setImgList', _data.data);
  })
}) 