/*
 * @Author: your name
 * @Date: 2020-05-26 16:57:24
 * @LastEditTime: 2020-06-03 19:44:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/common/ajax.js
 */ 

import axios from 'axios'
import {BASE_URL} from './api'
import Flag from './flag'



const commonParams = {
  os: String(window.navigator.platform).slice(0, 10),
  channelType: 'H5OUT'
}

const instance = axios.create({
  baseURL: 'http://localhost:8080/',
  timeout: 6000,
  method: 'post',
  headers: {'Content-Type': 'application/x-www-form-urlencode;'}
})
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  Object.assign(config.params, commonParams)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // console.log('aaa', response)
  response = response.data;
  if(response.code == Flag.SUCCESS){
      return response;
  }else{
    console.log('aaaaa,服务错误')
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
});


// function ajax({url = '', params= {}, method='post'}){
//   // let isLoading = false;
//   return new Promise((resolve, reject) => {
//     // isLoading = true;
//     axios({
//       url,
//       data: params,
//       method: method,
//       baseURL: BASE_URL,
//       timeout: 60000,
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded'
//       }
//     })
//     .then(({data}) => {
//       // isLoading = false;
//       // if (data.flag === '1') {
//         resolve(data.data)
//       }
//     })
//     .catch(() => {
//       // isLoading = false;
//       reject()
//     })
//   })
// }

export default instance
