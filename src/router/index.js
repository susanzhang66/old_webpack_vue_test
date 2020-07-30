import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import login from '@/pages/login/login'
import register from '@/pages/login/register'
import index from '@/pages/index'
import list from '@/pages/goods/list'
import order_comfirm from '@/pages/order/order_comfirm'
import order_detail from '@/pages/order/order_detail'
import goods_detail from '@/pages/goods/goods_detail'
import uc_center from '@/pages/user/uc_center'
import user_set from '@/pages/user/user_set'
import address from '@/pages/user/address'
import new_address from '@/pages/user/new_address'
import myorder from '@/pages/order/myorder'

import about from '@/pages/intro/about'
import addto from '@/pages/intro/addto'
import reback from '@/pages/intro/reback'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  // base: '/',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        { path: 'a', component: order_comfirm },
      ]
    },
    {
      path: '/myorder',
      name: 'myorder',
      component: myorder
    },
    {
      path: '/uc_center',
      name: 'uc_center',
      component: uc_center
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/list/:id',
      name: 'list',
      component: list
    },
    {
      path: '/order_comfirm',
      name: 'order_comfirm',
      component: order_comfirm
    },
    {
      path: '/order_detail',
      name: 'order_detail',
      component: order_detail
    },
    {
      path: '/goods_detail',
      name: 'goods_detail',
      component: goods_detail
    }, 
    {
      path: '/user_set',
      name: 'user_set',
      component: user_set
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },  
    {
      path: '/new_address',
      name: 'new_address',
      component: new_address
    }, 
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/addto',
      name: 'addto',
      component: addto
    },  
    {
      path: '/reback',
      name: 'reback',
      component: reback
    }, 
    
  ]
})
