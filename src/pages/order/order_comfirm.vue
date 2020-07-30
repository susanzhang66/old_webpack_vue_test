

<template> 
    <div>
        <yd-navbar title="确认订单" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <div @click="back" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </div>
        </yd-navbar>
        <div style="margin-top:1rem;">
          <div v-if="addyou" class="u_l li_arrow_r ui_clr_red2 ui_mb10px">
            <!-- <i class="i_add u_c"></i> -->
            <div class="u_f ui_tac">+添加收货地址</div>
          </div>
          <div v-else class="address_li li_arrow_r u_fb_ac ui_pd15 ui_bb ui_bg_white cur">
            <div class="u_f">
              <div id="adname">{{order_defaultAdress.userName+' '+order_defaultAdress.phone}}</div>
              <div id="ad_con">{{'[默认]'+ order_defaultAdress.areaName}}</div>
              <div id="ad_detail">{{order_defaultAdress.areaInfo}}</div>
            </div>
          </div>
        </div>
        <div class="payway ui_bb ui_mb10px ui_bt">
          <div class="u_l pd">

            <label class="u_f" for="weixin">微信支付</label>
            <input class="radio" type="radio" checked="checked" name="coupon" id="weixin" value="50" />
          </div>
          <div class="u_l pd">

            <label class="u_f" for="zhifubao">支付宝支付</label>
            <input class="radio" type="radio" name="coupon" value="100" id="zhifubao"/>
          </div>
          <div class="u_l pd ui_bb_none">
            <label class="u_f" for="huo" >货到付款</label>
            <input class="radio" type="radio" name="coupon" value="150" id="huo" />
          </div>
        </div>
        <div class="payway ui_bb ui_mb10px ui_bt">
          <div class="u_l pd ui_clr_666">
            <div class="ui_prx5 ui_clr_000">送达时间</div>		
            <input type="radio" name="time" value="150" id="today" />
            <label class="u_f" for="today" >今天</label>
            <input type="radio" name="time" value="150" id="tommory" />
            <label class="u_f" for="tommory" >明天</label>
            <input type="radio" name="time" value="150" id="hours" />
            <label class="u_f" for="hours" >2小时内</label>
          </div>
          <div class="u_l pd ui_bb_none ti beizhu">
            <!-- <div class="ui_pr5"></div> -->		
            <label for="con" >备注</label>
            <input type="radio" name="time" value="150" id="con" />
            <input type="text" class="ui_input u_f" placeholder="备注其他精确时间">
          </div>
        </div>
        <div class="coupon ui_bb ui_bt" v-if="order_yhList.length">
          <div class="ui_fs16">使用优惠：（满足条件可多选）</div>

          <ul class="cl coupon_ls">
            <template v-for="(item, index) in order_yhList">
            <li v-if="item.isFit == 1">
              <input type="checkbox" :name="'time'+index" value="150" :id="'check'+index" />
              <label class="u_f" :for="'check'+index" >{{item.name}}</label>
            </li>
            </template>
          </ul>

        </div>
        <div class="ui_bg_white u_l ordertit ui_bt ui_fs16">订单信息</div>
        <div class="payway ui_mb10 ui_pb25 ui_bb">

          <div v-for="(item,index) in order_goodsList"  key="index" class="u_l order_pd">

            <div class="u_f" for="weixin">{{ item.goodsName}}</div>
            <div class="u_c ">
              <i class="liang u_c">-</i>
              <span class="order_nums">{{item.count}}</span>
              <i class="liang u_c " id="plus">+</i>
            </div>
            <div class="dmeny">¥{{item.price}}</div>
          </div>
          <div class="u_tr peisong">
            <div>配送费（满<span class="ui_clr_orange">0元</span>免<span class="ui_clr_orange">5元</span>配送费）</div>
          </div>
        </div>
        <yd-tabbar :fixed="Boolean(true)" class="ui_bt">
           
                <yd-cell-item style="flex:1">
                    <span class="ui_clr_orange u_f ui_fs18" slot="left">¥{{order_totalPrice}}元</span>
                    <button slot="right" class="ui_btn btn_green btn_middle">立即下单</button>
                </yd-cell-item>
           
        </yd-tabbar>
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
        this.$store.dispatch('before').then((data)=>{
            console.log(data)
        })
    },
		data() {
			return {
         addyou: true
			}
		},
    watch: {
        order_defaultAdress (val, oldval){
            console.log(val, oldval)
            this.addyou = false;
        }
    },
    computed: {
        ...mapGetters({
          //下单总金额
          order_totalPrice: 'order_totalPrice',
          // order_defaultAdress: state => state.list2.order_defaultAdress,  
          // 默认地址
          order_defaultAdress: 'order_defaultAdress',
          // 下单数据
          order_goodsList: 'order_goodsList',
          // 邮费信息
          order_freePostage: 'order_freePostage',
          //优惠卷列表
          order_yhList: 'order_yhList',
        })
    },
		methods: {
      back (){
        this.$router.back();
      }
		}
}
</script>


<style>
@import '../../assets/css/m_uc.css'
</style>
