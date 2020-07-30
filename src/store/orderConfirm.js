/*
 * @Author: your name
 * @Date: 2020-06-09 14:15:30
 * @LastEditTime: 2020-06-24 12:20:33
 * @LastEditors: Please set LastEditors
 * @Description: 用 httpRequest, .....
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/store/list2.js
 */ 
//这个用做httpRequest来做。。。
// import axios from '@/common/ajax'
import url from '@/common/api'
// initial state
const state = {
  getGoodsListParams:{},
  getAddCarParams: {},
  getTypeListParms: {},
  goodList: []

}
// getters，需要加工就用这个呗。
// const getters = {
//   area: state => state.area,
// }

const mutations = {
  SET_GOODLIST: (state, data) => {
    // 这里可以整理数据呀
    data.forEach( (element, index )=> {
      element.label = element.goodsName;
      element.icon = 'demo-icons-category'+index;
      element.num = 0;
    });
    // state.getGoodsList = data;
    state.goodList = data
  },
  setShopCar: (state, data) => {
    state.area = data
  },
  set_index_list: (state, data) => {
    state.index_list = data;
  },
  setGoodsListParams: (state, data ) => {
    state.getGoodsListParams = data;
  },
  setAddCarParams: (state, data ) => {
    state.getAddCarParams = data;
  }
}

const actions = {
  // getTypeList ({state, commit}, params={}) {
  //   return new Promise(( resolve ) => {
  //     axios({
  //       url: url.getTypeList,
  //       params: params
  //     }).then(( data ) => {
  //       let _data = data.rows;
  //       console.log('getCenterList');
  //       commit('set_index_list', _data);
  //       resolve( _data );
  //     })
  //   }) 
  // },
  // getTypeList: ({ state, dispatch }) => {
  //   return dispatch('httpRequest', {
  //     url: url.getTypeList,
  //     params: state.getTypeListParms,
  //     mutations: 'SET_GOODLIST'
  //   })
  // },
  getGoodsList: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: url.getGoodsList,
      params: state.getGoodsListParams,
      mutations: 'SET_GOODLIST'
    })
  },
  addShopCard: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: url.addShopCard,
      params: state.getAddCarParams,
      mutations: 'setShopCar'
    })
  },
  // addShopCard: async ({ state, dispatch }) => {
  //   return await dispatch('httpRequest', {
  //     url: url.addShopCard,
  //     params: state.getAddCarParams,
  //     mutations: 'setShopCar'
  //   })
  // },
}
export default {
  state,
  // getters,
  mutations,
  actions
}
