/*
 * @Author: your name
 * @Date: 2020-05-26 17:06:36
 * @LastEditTime: 2020-06-23 12:43:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/common/api.js
 */ 
let baseURL = '/'
let configJson = ''
const url = {
  // 商品分类列表
  getTypeList: '/rest/mallTypeRest/getTypeList',
  //获取中心地址
  getCenterList: '/rest/mallCenterRest/getCenterList',
  // 商品列表
  getGoodsList: '/rest/mallGoodsRest/getGoodsList',
  // 通过广告位code获取广告列表
  getMallAdInfoList: '/rest/mallAdInfoRest/getMallAdInfoList',
  // 获取供货中心地址列表
  getCenterAddressList: '/rest/mallCenterAddressRest/getCenterAddressList',
  // 下单前数据
  before: '/rest/mallOrderRest/before',
  // 添加购物车
  addShopCard: '/rest/mallShopCardRest/addShopCard'
}
export default url

export const BASE_URL = baseURL
export const CONFIGJSON = configJson