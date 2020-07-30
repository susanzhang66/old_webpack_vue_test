
<template>
    <div>
        <yd-navbar title="配送地址管理" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>
        <div class="addlist" style="margin-top:1.1rem;">地址列表</div>
          <ul id="adrsList">
            <li class="adr_li">
              <div class="u_fb_ac ui_mb5px">
                <div class="name u_f">叶生</div>
                <div class="aphone u_f">18098971980</div>
                <div class="biaoqian u_f">家</div>
                <div class="moren btn_green">默认地址</div>
              </div>
              <div class="u_fb_ac">
                <div class="u_f">深圳市福田区华强北红荔村</div>
                <div class="del btn_green">删除</div>
              </div>
            </li>
            <li class="adr_li">
              <div class="u_fb_ac ui_mb5px">
                <div class="name u_f">叶生</div>
                <div class="aphone u_f">18098971980</div>
                <div class="biaoqian u_f">家</div>
                <div class="moren btn_green">默认地址</div>
              </div>
              <div class="u_fb_ac">
                <div class="u_f">深圳市福田区华强北红荔村</div>
                <div class="del btn_green">删除</div>
              </div>
            </li>
            <li class="adr_li">
              <div class="u_fb_ac ui_mb5px">
                <div class="name u_f">叶生</div>
                <div class="aphone u_f">18098971980</div>
                <div class="biaoqian u_f">家</div>
                <div class="moren btn_green">默认地址</div>
              </div>
              <div class="u_fb_ac">
                <div class="u_f">深圳市福田区华强北红荔村</div>
                <div class="del btn_green">删除</div>
              </div>
            </li>
          </ul>

          <div class="ui_pl15px ui_pr15px ui_mb10px ui_mt50px">
            <button class="ui_btn btn_middle_small btn_green" id="btnAdd">
              增加收货地址
            </button>
          </div>
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
