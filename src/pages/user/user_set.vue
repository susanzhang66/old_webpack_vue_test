
<template>
    <div>
        <yd-navbar title="确认订单" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="u_u ui_mb15 ui_bt_none" style="margin-top:1rem;">
          <div class="ui_mt10px ui_bt">
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_userimg">
              <div class="u_f">头像</div><div class="user_con"><img src="@/assets/images/avar.png" width="28" id="userimg"/></div>
            </a>
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_nicename">
              <div class="u_f">昵称</div>
              <div class="user_con" id="nicename"></div>
            </a>
          </div>
          <div class="ui_mt10px ui_bt">
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_username">
              <div class="u_f">姓名</div>
              <div class="user_con" id="username"></div>
            </a>
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_sex">
              <div class="u_f">性别</div>
              <div class="user_con" id="sex"></div>
            </a>
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_phone">
              <div class="u_f">手机号码</div>
              <div class="user_con" id="phone"></div>
            </a>
            <!-- <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_email">
              <div class="u_f">邮箱</div>
              <div class="user_con" id="email"></div>
            </a> -->
          </div>
          <div class="ui_mt10px ui_bt">
            <a class="u_l li_arrow_r ui_clr_333 user_lp" href="javascript:;" id="mod_pwd">
              <div class="u_f">修改密码</div>
            </a>
          </div>
          

        </div>
        <div class="u_c ui_mb15 mt70">
          <button class="ui_btn btn_middle btn_middle_small btn_green ui_br_8">退出登陆</button>
        </div>
    </div>
</template>
<script>

import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
// require('@/assets/css/m_uc.css');
export default {
		name: 'index',
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
