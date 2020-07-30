<!--
 * @Author: your name
 * @Date: 2020-06-15 18:15:19
 * @LastEditTime: 2020-06-20 14:42:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/about.vue
--> 
<template>
    <div>
      <yd-navbar title="关于我们" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

      	<div class="aboutimg">
          <img src="@/assets/images/about.png" height="100%" width="100%" alt="">
        </div>
        <div class="odetail reback">
          <p class="awords">鲜果直通车是本地O2O网络平台，专注于鲜果手机网络下单急速配送领域的企业。</p>
          <p class="awords">公司与果农有良好的合作关系，厂家直销，为广大用户提供最新鲜的水果产品。我们竭诚承诺2小时到达。欢迎新老用户体验这种便捷的服务。</p>
          <p class="awords">要鲜果，就上鲜果直通车！</p>
        </div>
    </div>
</template>
<script>

import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
// require('@/assets/css/m_uc.css');
export default {
		name: 'reback',
    components: {},
    created () {
        this.$store.dispatch('getGoodsList').then( (data) => {
          console.log(data);
        })
    },
		data() {
			return {
        list: [
            {label: '空调', icon: 'demo-icons-category1', color: 'gray'},
            {label: '冰箱', icon: 'demo-icons-category2', color: 'blue'},
            {label: '洗衣机', icon: 'demo-icons-category3', color: 'yellow'},
            {label: '热水器', icon: 'demo-icons-category4', color: 'green'},
            {label: '厨房大家电', icon: 'demo-icons-category5', color: 'saddlebrown'},
            {label: '厨房小家电', icon: 'demo-icons-category6', color: 'darkgoldenrod'},
            {label: '生活家电', icon: 'demo-icons-category7', color: 'indianred'},
            {label: '风扇', icon: 'demo-icons-category8', color: 'aqua'}
        ]
			}
		},
    computed: {
        ...mapState({
            goodList: state => state.list2.goodList,  
        })
    },
		methods: {
      change(index) {
          console.log('ScrollTab：---> index：' + index);
      },
      delClick(){

      },
      addClick(){

      }

		}
}
</script>


<style>
@import '../../assets/css/m_uc.css'
</style>
