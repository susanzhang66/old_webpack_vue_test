<template>
<div>
<div class="o_press u_c ui_bb ui_bt ui_mb0">
	<div class="process u_f u_fb u_fb_ac curr2">
		<div class="xiadan cur1 u_f"><span class="yixiadan">已下单</span></div>
		<div class="xiadan cur2 u_f"><span class="yixiadan">已付款</span></div>
		<div class="xiadan cur3 u_f"><span class="yixiadan">已发货</span></div>
		<div class="xiadan cur4 u_f"><span class="yixiadan">已完成</span></div>
	</div>
</div>
<div class="odetail ui_bb ui_fs12">
	<div class="u_fb_as">
		<div class="u_f">订单编号：20151115454785</div>
		<div class="u_f">支付方式：微信支付</div>
	</div>
	<div class="u_fb_as">
		<div class="u_f">金额：29元</div>
		<div class="u_f">时间：2015-12-16 14:15</div>
	</div>

</div>
<div class="odetail ui_bb ui_bt">
	<div class="ui_fs16 ui_clr_000">华强北供货中心</div>
	<div class="oaddress"><i class="odress_tu icon_odress"></i>福田区华强北红荔村9栋</div>
	<div class="ophone"><i class="ophoe_tu icon_ophoe_tu"></i>835453122</div>
</div>
<div class="odetail ui_bb ui_bt">
	<div class="ui_fs16 ui_clr_000">优惠信息</div>

	<ul class="cl youhui_ls">
		<li>5元优惠劵（新用户）</li>
		<li>免配送费</li>
		<li>礼品</li>
		<li>5元优惠劵（新用户）</li>
	</ul>

</div>
<div class="o_detail_time ui_bb ui_bt">
	<div class="ui_fs16 ui_clr_000">配送时间</div>
	<div>今天（2015-12-15）</div>

</div>
<div class="ui_bg_white u_l ordertit ui_bt ui_fs16 ui_clr_000">订单信息</div>
<div class="payway ui_mb10 ui_pb25">

	<div class="u_l order_pd">

		<div class="u_f">山东红富士</div>
		<div class="ui_clr_999 o_detail_num">X1</div>
		<div class="dmeny ui_clr_000">¥3434</div>
	</div>
	<div class="u_l order_pd">

		<div class="u_f">香蕉</div>
		<div class="ui_clr_999 o_detail_num">X1</div>
		<div class="dmeny ui_clr_000">¥10004</div>
	</div>
	<div class="u_l order_pd">

		<div class="u_f">山东红富士</div>
		<div class="ui_clr_999 o_detail_num">X1</div>
		<div class="dmeny ui_clr_000">¥3434</div>
	</div>
	<div class="u_tr peisong">
		<div class="u_f ui_clr_000">配送费</div>
		<div class="ui_clr_999 o_detail_num">X1</div>
		<div class="dmeny ui_clr_000">¥3434</div>
	</div>
</div>
</div>
</template>
<script>
import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';


require('@/assets/css/m_uc.css');
export default {
		name: 'order_detail',
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
