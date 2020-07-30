
<template>
    <yd-layout title="ScrollTab">
        <yd-navbar title="鲜果直通车" bgcolor="#40cd89" color="#fff" fontsize=".3rem" slot="navbar">
              <router-link to="/" slot="left">
                  <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
              </router-link>
                <div class="u_fb u_nw" slot="center">
                    <i class="icon2_hlogo ui_pr01" ></i>
                    <span class="u_c ui_fs12 ui_clr_white">鲜果直通车</span>
                </div>
        </yd-navbar>
        <yd-scrolltab :callback="change">
            <yd-scrolltab-panel v-for="(item,index) in goodList" :label="item.label" :icon="item.icon" :key="index">
               <ul class="guolist">
                  <li>
                    <i class="sanright"></i>
                    <a href="#" class="ui_db listhover">
                      <img :src="item.mainPhoto" height="140">
                    </a>
                    <div class="tip u_fb">
                      <div class="xinxi u_f">
                        <div class="name">{{item.goodsName}}</div>
                        <div class="money">{{item.marketPrice}}元/{{item.standard}} 月售：{{item.saleCount}}</div>
                      </div>
                      <div class="u_fb ui_pt10 jjf">
                        <i class="ui_liang u_c js_del" @click="delClick(item)">-</i>
                        <span class="addnums">{{item.num}}</span>
                        <i class="ui_liang u_c ui_mr15 js_add" @click="addClick(item)">+</i>
                      </div>
                    </div>
                  </li>
              </ul>
            </yd-scrolltab-panel>
        </yd-scrolltab>
        <div class="cl mine ui_bt ui_rel" slot="tabbar">
          <div class="z">
            <div class="icon2_cart">
              <span class="num" id="cartNum">{{totalNum}}</span>		
            </div>
            <div class="cartmoney">¥<span id="totalMoney">{{totalMoney}}</span>元</div>
          </div>
          
          <div class="xuanbtn y">
            <button class="btncart ui_mr15" @click="submit">选好了</button>
          </div>
        </div>
    </yd-layout>
</template>
<script>
import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
import ydScrolltab from '@/components/scrolltab/scrolltab.vue';
import ydScrolltabPanel from '@/components/scrolltab/scrolltab-panel.vue';

require('@/assets/css/m_index.css');
export default {
		name: 'index',
    components: {ydScrolltab, ydScrolltabPanel},
    created () {
        let num = parseInt(this.$route.params.id, 10);
        if (typeof num == 'number'){
            this.centerId = num;
        } 
        // 避免冲突，这样不行哦，找不到list2
        this.$store.commit('list2/setGoodsListParams',{
          centerId: this.centerId,
          typeId: 1,
          pageSize: 6, //每页大小
          page : 1 //第几页
        });
        this.$store.dispatch('getGoodsList').then( (data) => {
          console.log(data);
        })
        // console.log(this.$route.params)
        
    },
		data() {
			return {
        totalMoney: 0,
        totalNum: 0,
        centerId: 0 // 配送中心编号。
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
      delClick( data ){
          console.log(data)
          if(data.num == 0) return;
          data.num--;
          this.totalNum--;
          this.totalMoney -= data.marketPrice;
          let params = {
            centerId: this.centerId,
            goodsId: data.typeId,
            count: data.num
          }
          this.$store.commit('setAddCarParams', params);
          this.$store.dispatch('addShopCard');
      },
      addClick( data ){
          console.log(data)
          	if( data.limitCount != 0 && (data.num > data.limitCount) ){
              this.$dialog.toast('不能超过最大购买数！');
              return;
            }else if( data.num < 0 ){
              return;
            }
          
          let params = {
            centerId: this.centerId,
            goodsId: data.typeId,
            count: data.num+1
          }
          // 如何节流用遮罩层，以及那个，如何同步异步。
          //解答：同步可以放到 dispatch回调里面即then里就可以。
          this.$store.commit('setAddCarParams', params);
          //设置 loading为透明。
          this.$store.commit("setHttpShowMask", true)
          this.$store.dispatch('addShopCard').then(()=>{
                data.num++;
                this.totalNum++;
                this.totalMoney += data.marketPrice;
          })
      },
      back (){
        this.$router.back();
      },
      submit (){
        if(this.totalNum != 0 )
        this.$router.push({path: '/order_comfirm'})
      }

		}
}
</script>


<style>
    body {
        background-color: #fff;
        margin-bottom:1.5rem;
    }
    #app {
      height:100%
    }
</style>
