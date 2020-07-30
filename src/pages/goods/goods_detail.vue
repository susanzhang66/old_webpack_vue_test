<!--
 * @Author: your name
 * @Date: 2020-06-15 14:00:43
 * @LastEditTime: 2020-06-15 15:03:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/goods_detail.vue
--> 
<template>
<div>
  <div class="ui_ovh">
    <div class="banner u_fb am_all" style="-webkit-transform: scale(1.0) translate3d(0,0,0);" id="imgid">
      <a href="#" class=""><img src="@/assets/images/test.jpg" alt="" height="192" width="100%"></a>
      <a href="#" class=""><img src="#" alt="" height="192" width="100%"></a>
      <a href="#" class=""><img src="#" alt="" height="192" width="100%"></a>
      <a href="#" class=""><img src="#" alt="" height="192" width="100%"></a>
      <a href="#" class=""><img src="#" alt="" height="192" width="100%"></a>
    </div>
    <div class="slider u_c" id="imgdotted">
      <span class="radius curr"></span>
      <span class="radius"></span>
      <span class="radius"></span>
      <span class="radius"></span>
      <span class="radius"></span>
    </div>
  </div>
  <div class="u_f tailCon ui_bb ui_bg_white">
    <div class="ui_fs16 detail">山东特选级红富士</div>
    <div class="ui_clr_orange ui_bt detail">产品价格：¥9元/份<del class="ui_ml10 ui_clr_000 ">市场价：¥18元/份</del></div>
    <div class="ui_clr_orange ui_bt detail">规格：2个装约800g</div>
  </div>
  <div class="detailsCon">
    <div class="ui_bg detail_tit ui_clr_666">商品详情</div>
    <div id="imglist">
      <img src="" orig_src="@/assets/images/test_ping.png"  class="js_load" alt="" width="100%">
      <img orig_src="@/assets/images/banner.jpg" class="js_load" alt="" width="100%">
      <img src="" alt="" orig_src="@/assets/images/testlist.png" width="100%">
    </div>
  </div>
  <div class="ui_w_100pc" style="height:80px;">
    <div class="ui_fixed ui_bt ui_bottom ui_pd10 ui_pl15 ui_pr15 ui_bg_white">
      <button class="ui_btn btn_green">加入购物车</button>
    </div>
  </div>
</div>
</template>
<script>
import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
require('@/assets/css/m_uc.css');
export default {
		name: 'goods_detail',
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

</style>
