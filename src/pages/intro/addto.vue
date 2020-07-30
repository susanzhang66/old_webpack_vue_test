<!--
 * @Author: your name
 * @Date: 2020-06-15 18:17:54
 * @LastEditTime: 2020-06-20 14:42:28
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/pages/intro/addto.vue
--> 

<template>
    <div>
        <yd-navbar title="加盟鲜果直通车" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="Boolean(true)" >
            <router-link to="#" slot="left">
                <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
            </router-link>
        </yd-navbar>

      	<div class="odetail reback ui_mt10">
          <p class="awords">鲜果直通车平台为了更好更快地服务于全国市场，需要一批有志于在鲜果一条龙服务的创业者。</p>
          <p class="awords">公司提供平台，提供货源及一整套业务相关的技术与流程。</p>
          <p class="awords">O2O是一个大的台风口，加上本平台运作成熟，投入资本不大，前景广阔。</p>
          <p class="awords">加盟热线：13535676676 &nbsp; 张生</p>
        </div>
    </div>
</template>
<script>

import Utils, {singleton} from '@/common/Utils'
import {mapState, mapGetters} from 'vuex';
// require('@/assets/css/m_uc.css');
export default {
		name: 'addto',
		data() {
			return {
        list: [

        ]
			}
		}
}
</script>


<style>
@import '../../assets/css/m_uc.css'
</style>
