<!--
 * @Author: your name
 * @Date: 2020-05-25 19:19:25
 * @LastEditTime: 2020-07-30 17:05:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/index.vue
--> 
<template>
<div>
<yd-navbar title="鲜果直通车" bgcolor="#40cd89" color="#fff" fontsize=".3rem">
        <div class="u_fb u_nw" slot="center">
            <i class="icon2_hlogo ui_pr01" ></i>
            <span class="u_c ui_fs12 ui_clr_white">鲜果直通车</span>
        </div>
</yd-navbar>
<div>
<yd-slider autoplay="3000" pagination-activecolor="#000" pagination-color="#ccc" :imgList="imgList" style="height: 166px;">
    <template v-slot:default="slotProps">
    <yd-slider-item v-for="(item,index) in slotProps.imgList" :key="index" :imgListSrc="imgList">
        <template v-slot="slotProps2">
        <a href="javascript:void(0)">
            <img :src="slotProps2.imgListSrc" height="166">
        </a>
        </template>
    </yd-slider-item>
    </template>
</yd-slider>
</div>
<div class="u_c seltit ui_clr_white ui_fs12 li_arrow_b_index"><span class="ui_pr02">配送中心选择</span></div>

<div class="sel u_fb">
    <div class="selname ui_clr_gren u_fb_ac">选择城市：</div>
     <div class="selecteds">
        <select name="" class="index_select u_c" @change="cityChange">   
          <option v-for="(item, index) in city" :key="index" :value="item + 1">{{ item }}</option>
        </select>
      </div>
    <!-- <div class="selcity">深圳市</div> -->
</div>
<div class="sel u_fb">
    <div class="selname ui_clr_gren u_fb_ac">全部城区：</div>
    <!-- <div class="selname ui_clr_gren">全部城区：</div> -->
    <div class="selecteds">
        <select name="" id="xiang" class="index_select u_c" @change="areaChange">
              <option v-for="(item, index) in area" :key="index" :value="item + 1">{{ item }}</option>
        </select>
    </div> 
</div>
<ul class="directD ui_mb20">
       <li class="ui_mb05 js_indexli" v-for="(item,index) in addressList" @click="linkToCenter(item, $event)">
        <div class="ui_bg dres">
            <i class="icon2_direct"></i>
            <span class="i_right"></span>
            <div class="ui_clr_red2 centername ui_fs16">{{item.centerName}}</div>
            <div class="u_fb">
                <div class="fanwei">配送范围：</div>
                <div class="u_f">{{item.disRange}}</div>
            </div>
            <div class="u_fb">
                <div class="address">地址：</div>
                <div class="u_f">{{item.centerAddress}}</div>
            </div>
        </div>
        <div class="cl shiju u_fb u_nw">
            <div class="phone z">
                <i class="icon2_phone"></i>
                <p class="number">{{item.centerPhone}}</p>
            </div>
            <div class="shijiao z">
                <span class="icon2_shitu"> </span>
                <p>时效:约{{item.disFast}}小时送达时效 配送时间:{{item.disTime}}</p>
            </div>
                        
        </div>
    </li>
</ul>
<footers index></footers>

<router-view></router-view>
</div>
</template>
<script>
import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
import ydSlider from '@/components/slider/slider'
import ydSliderItem from '@/components/slider/slider-item'
import footers from '@/components/includes/footer'
// require('@/assets/css/m_index.css');
export default {
		name: 'index',
        components: {ydSlider, ydSliderItem, footers},
        created () {
            var self = this;
            // 获取广告位。。
            this.$store.dispatch('getMallAdInfoList').then(( data ) => {
                console.log(data);
                data.forEach((item, index) => {
                    self.imgList.push(item.adContent)
                })
            })
            //获取city
            this.$store.dispatch('getCenterAddressList');
            // 获取区域--深圳
            this.$store.dispatch('getCenterAddressList',{parentId : '1'});
        },
		data() {
			return {
                imgList: [],
                pageSize: 6,
                page: 1
			}
		},
        computed: {
            ...mapState({
                city: state => state.list.city,  
                addressList: state => state.list.index_list
            }),
            ...mapGetters({
                area: 'area'
            })
        },
        watch: {
            area (val, oldVal) {
                console.log(val, oldVal)
                this.areaChange(null, val[0]);
            }
        },
		methods: {
			handleClick() {
					let validator = singleton( this.validtaFunc )();

					var errorMsg = validator.start()
					if( errorMsg  ){
						this.$dialog.toast({
								mes: errorMsg || '请填写完整信息',
								timeout: 2500
						})
					}else{
						this.$dialog.confirm({
								title: '选填标题',
								mes: '我有一个小毛驴我从来也不骑！',
								opts: () => {
										this.$dialog.toast({mes: '你点了确定', timeout: 1000});
								}
						});
					}
			},
            cityChange( event ) {
                // event: 是原生的DOM事件
                // `this` 在方法里指向当前 Vue 实例
                // console.log( event.target.value );
                //获取area
                this.$store.dispatch('getCenterAddressList',{parentId : event.target.value})
                    .then(( data ) => {
                        console.log('区域发生变化')
                    })
            },
            //第一种事件写法。
            areaChange( event, data ) {
                // event: 是原生的DOM事件
                // console.log( event.target.value );
                console.log( event );
                let parames = { 
                    addressId: data || event.target.value,
                    pageSize:this.pageSize,
                    page:this.page
                }
                //获取 地址中心详细信息。
                this.$store.dispatch('getCenterList',parames);
            },
            //第二种事件写法s
            //linkToCenter(index, $event), 将$event事件传入进来 
            linkToCenter ( item, $event) {
                console.log(item.id)
                this.$router.push(`/list/${item.id}`)
                //开始跳转啦。。。
            }
		},
        mounted () {

        }	
}
</script>


<style>
    @import '../assets/css/m_index.css'
    body {
        background-color: #fff;
        margin-bottom:1.5rem;
    }
</style>


