<!--
 * @Author: your name
 * @Date: 2020-06-15 18:03:17
 * @LastEditTime: 2020-06-22 16:35:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/order/myorder.vue
--> 


<template>
    <div>
      <headerss title="我的订单" @back2="back"> </headerss>
      <div class="ui_mt10">
          <div class="o_press ui_bt2 ui_mt10px ui_rel">
            <i class="myo_right"></i>
            <div class="process myprocess u_f u_fb u_fb_ac curr2">
              <div class="xiadan cur1 u_f"><span class="yixiadan">已下单</span></div>
              <div class="xiadan cur2 u_f"><span class="yixiadan">已付款</span></div>
              <div class="xiadan cur3 u_f"><span class="yixiadan">已发货</span></div>
              <div class="xiadan cur4 u_f"><span class="yixiadan">已完成</span></div>
            </div>
            <div class="ui_fs12px ui_pt5px">
              <div class="u_fb_as">
                <div class="u_f">订单编号：20151115454785</div>
                <div class="u_f">支付方式：微信支付</div>
              </div>
              <div class="u_fb_as">
                <div class="u_f">金额：29元</div>
                <div class="u_f">时间：2015-12-16 14:15</div>
              </div>

            </div>
            
          </div>

          <div class="o_press ui_bt2 ui_mt10px ui_rel">
            <i class="myo_right"></i>
            <div class="process myprocess u_f u_fb u_fb_ac curr3">
              <div class="xiadan cur1 u_f"><span class="yixiadan">已下单</span></div>
              <div class="xiadan cur2 u_f"><span class="yixiadan">已付款</span></div>
              <div class="xiadan cur3 u_f"><span class="yixiadan">已发货</span></div>
              <div class="xiadan cur4 u_f"><span class="yixiadan">已完成</span></div>
            </div>
            <div class="ui_fs12px ui_pt5px">
              <i class="myo_right"></i>
              <div class="u_fb_as">
                <div class="u_f">订单编号：20151115454785</div>
                <div class="u_f">支付方式：微信支付</div>
              </div>
              <div class="u_fb_as">
                <div class="u_f">金额：29元</div>
                <div class="u_f">时间：2015-12-16 14:15</div>
              </div>

            </div>

          </div>
      </div>
    </div>
</template>
<script>

import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
import headerss from '@/components/includes/headers'
// require('@/assets/css/m_uc.css');
export default {
		name: 'myorder',
    components: { headerss },
    methods: {
      back () {
        console.log('dadafa')
      }
    }
}
</script>


<style>
@import '../../assets/css/m_uc.css'
</style>
