

<template>
    <div id="conAddressItem">
      <yd-navbar title="新建收货地址" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

      <input type="hidden" id="id">
      <div class="u_l ui_pd0" style="margin-top:1.1rem;">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">收货人:</div>
        <input class="ui_input u_f" type="text" placeholder="姓名" id="iptConsignee">
      </div>
      <div class="u_l ui_pd0">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">联系手机:</div>
        <input class="ui_input u_f" type="text" placeholder="11位手机号" id="iptMobile">
      </div>
      <div class="u_l ui_pd0">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">省份:</div>
        <select name="" class="ui_select u_f" id="selProvince">
          <option value="1">广东省</option>
        </select>
      </div>
      <div class="u_l ui_pd0">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">城市</div>
        <select name="" id="selCity" class="ui_select u_f" data-msg="城市">
          
        </select>
      </div>
      <div class="u_l ui_pd0">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">区域：</div>
        <select name="" id="selDistrict" class="ui_select u_f" data-msg="地区">
        </select>
      </div>
      <div class="u_l ui_pd0 u_fb_as">
        <div class="ui_pl15px ui_w_22pc ui_clr_666 ui_pt12px">详细地址：</div>
        <textarea name="" id="iptAddress" rows="4" class="textarea u_f" placeholder="请输入详细地址"></textarea>
      </div>
      <div class="u_l ui_pd0 ui_mb15px">
        <div class="ui_pl15px ui_w_20pc ui_clr_666">标签</div>
        <select name="" id="selbq" class="ui_select u_f">
          <option value="家">家</option>
          <option value="公司">公司</option>
          <option value="学校">学校</option>
          <option value="其他">其他</option>
        </select>
      </div>
      <div class="u_l ui_bt ui_mb20px">
        <label class="u_f" for="default">设为默认收获地址</label>
        <input class="checkbox" type="checkbox" checked="checked" id="ckbDefault" tabindex="5">
      </div>
      <div class="ui_pl15px ui_pr15px ui_mb20px">
        <button class="ui_btn btn_middle_small btn_green" id="btnSave">保存</button>
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
