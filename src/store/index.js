/*
 * @Author: your name
 * @Date: 2020-05-18 14:19:07
 * @LastEditTime: 2020-07-30 17:01:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/store/index.js
 */ 


import Vue from 'vue'
import Vuex from 'vuex'
import login from './login'
import list from './list'
import http from './http'
import list2 from './list2'

Vue.use(Vuex)
export default new Vuex.Store({
  namespaced: true,
  modules: {
    http,
    login,
    list,
    list2
  }
})
