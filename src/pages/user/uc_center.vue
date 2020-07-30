<!--
 * @Author: your name
 * @Date: 2020-06-15 15:08:28
 * @LastEditTime: 2020-06-22 15:22:45
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/user/uc_center.vue
--> 

<template>
    <div>

        <headers title="个人中心"> </headers>
        <div class="u_c user_info" style="margin-top:1rem">
          <i class="icon2_set"></i>
          <div class="ui_tac ui_fs18 ui_clr_green">
            <span class="user_img">
              <img src="@/assets/images/avar.png" alt="" width="66" height="66" />
            </span>
            <div><a href="#">登录</a>/<a href="#">注册</a></div>
          </div>
        </div>
        <div class="u_u ui_mb15 ui_bt_none">
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/order_list.html">
          <i class="icon_ac_1"></i><div class="u_f">我的订单</div>
        </a>
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/order_list.html?type=nopay">
          <i class="icon_ac_2"></i><div class="u_f">配送地址管理</div>
          <span style="display:none;" id="txtNum" class="num u_c"> </span>
        </a>
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/mycoupons.html">
          <i class="icon_ac_3"></i><div class="u_f">意见反馈</div>
        </a>
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/address.html">
          <i class="icon_ac_4"></i><div class="u_f">关于我们</div>
        </a>
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/mycoupons.html">
          <i class="icon_ac_5"></i><div class="u_f">加盟鲜果直通车</div>
        </a>
        <a class="u_l li_arrow_r ui_clr_333" href="http://m.iuni.com/uc/address.html">
          <i class="icon_ac_6"></i><div class="u_f">客服电话：0755-83259030</div>
        </a>

      </div>

      <footers usr></footers>
    </div>
</template>
<script>

import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
import footers from '@/components/includes/footer'
import headers from '@/components/includes/headers'
// require('@/assets/css/m_uc.css');
export default {
		name: 'index',
    components: {headers, footers },
    methods: {
      back (){
        this.$router.back();
      }

    },
  
}
</script>


<style>
@import '../../assets/css/m_uc.css'
</style>
