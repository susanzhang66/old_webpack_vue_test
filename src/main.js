import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 部分引用ydui但插件
import ydui from '@/components/plugins/ydui/'
import prototypes from '@/common/'
require('@/assets/css/m_com_rem.css')

Object.keys(prototypes).forEach(k => { Vue.prototype[k] = prototypes[k] })

Vue.use(ydui)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
