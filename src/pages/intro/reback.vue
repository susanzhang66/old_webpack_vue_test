<!--
 * @Author: your name
 * @Date: 2020-06-15 18:07:26
 * @LastEditTime: 2020-06-20 14:42:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/reback.vue
--> 

<template>
    <div>
      <yd-navbar title="新建收货地址" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

      <div class="odetail reback ui_mt10">
        <p class="words">欢迎对我们工作与网站存在的问题与不足提出自己宝贵意见，让我们服务的更好，谢谢！</p>

      </div>
      <div class="ui_bg_white ui_pb25">
          <div class="rb_kuan ui_bg_white">
            <div class="u_c">
              <div class="retitle">意见主题：</div>
                <input type="text" class="rb_input u_f" id="title">
            </div>
          </div>
          <div class="rb_kuan ui_bg_white">
            <div class="u_fb_as">
              <div class="retitle">意见主题：</div>
                <textarea class="rb_textarea u_f" rows="4" id="content">
                </textarea>
            </div>
          </div>
          <div class="u_c ui_mt10">
            <button class="ui_btn btn_middle btn_mini_chang btn_green" id="subtn">提交</button>
          </div>
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
