/*
 * @Author: your name
 * @Date: 2020-05-26 18:20:48
 * @LastEditTime: 2020-07-30 17:25:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/store/list.js
 */ 
import axios from '@/common/ajax'
import url from '@/common/api'
// initial state
const state = {
  city: [],
  area: ['真的', '测试一下'],
  index_list: [],
  pageSize : 6,
  page : 1,
  totalPage: 1,
  getGoodsListParams: ''
}
// getters，需要加工就用这个呗。
const getters = {
  area: state => state.area,
}

const mutations = {
  SET_CITY: (state, data) => {
    state.city = data
  },
  SET_AREA: (state, data) => {
    state.area = data
  },
  set_index_list: (state, data) => {
    state.index_list = data;
  },
  // 测试相同key
  setGoodsListParams: (state, data ) => {
    console.log('有没有进来')
    state.getGoodsListParams = data;
  },
}

const actions = {
  getCenterList ({state, commit}, params={}) {
    return new Promise(( resolve ) => {
      axios({
        url: url.getCenterList,
        params: params
      }).then(( data ) => {
        let _data = data.rows;
        console.log('getCenterList');
        commit('set_index_list', _data);
        resolve( _data );
      })
    }) 
  },
  // 获取供货中心地址列表
  getCenterAddressList (context, params={}) {
    return new Promise((resolve) => {
      axios({
        url: url.getCenterAddressList,
        params: params
      }).then(( data ) => {
        let _data = data.data;
        let c = [];
        _data.forEach((item, index) => {
            c.push(item.areaName)
        })
        if( !params.parentId ){
            this.commit('SET_CITY', c)
            resolve(_data)
        }else{
            this.commit('SET_AREA', c)
        }
        
      })
    })
  },
  //获取广告位
  getMallAdInfoList (context, params={}) {
    var self = this;
    return new Promise((resolve, reject) => {
      // axios({
      //   url: url.getMallAdInfoList,
      //   params: params
      // }).then(( data ) => {
      //     resolve( data.data );
      // })
      resolve('测试111测试action命名相同')
    }) 
  }
}
export default {
  state,
  getters,
  mutations,
  actions
}
