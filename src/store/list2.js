/*
 * @Author: your name
 * @Date: 2020-06-09 14:15:30
 * @LastEditTime: 2020-07-30 17:25:52
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
  beforeParams: {},
  //展示的商品列表
  goodList: [],
  // 默认地址
  order_defaultAdress: {},
  //优惠列表
  order_yhList: [],
  //下单的商品
  order_goodsList: [],
  //下单的总金额
  order_totalPrice: 0,
  // 邮费信息
  order_freePostage: 0

}
// getters，需要加工就用这个呗。
const getters = {
  order_defaultAdress: state => state.order_defaultAdress,
  order_yhList: state => state.order_yhList,
  order_goodsList: state => state.order_goodsList,
  order_totalPrice: state => state.order_totalPrice,
  order_freePostage: state => state.order_freePostage,
}

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
    // state.area = data
  },
  setBeforeResponse: (state, data ) => {
      if(data.defaultAddress ){
        state.order_defaultAdress = data.defaultAddress;
      }
      // state.order_yhList = data.yhList;
      let order_yhList = data.yhList;
      order_yhList.forEach((item, index) => {
          if(item.isFit == 1){
            state.order_yhList.push(item)
          }
      })
      state.order_goodsList = data.goodsList;
      state.order_totalPrice = data.totalPrice;
      state.order_freePostage = data.freePostage;
  },
  setGoodsListParams: (state, data ) => {
    console.log('有没有进来')
    state.getGoodsListParams = data;
  },
  setAddCarParams: (state, data ) => {
    state.getAddCarParams = data;
  },
  setBeforeParams: (state, data ) => {
    state.beforeParams = data;
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
  before: ({ state, dispatch }) => {
    return dispatch('httpRequest', {
      url: url.before,
      params: state.beforeParams,
      mutations: 'setBeforeResponse'
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
      resolve('测试action命名相同')
    }) 
  }
  // addShopCard: async ({ state, dispatch }) => {
  //   return await dispatch('httpRequest', {
  //     url: url.addShopCard,
  //     params: state.getAddCarParams,
  //     mutations: 'setShopCar'
  //   })
  // },
}
export default {
  namespacce: true,
  state,
  getters,
  mutations,
  actions
}
