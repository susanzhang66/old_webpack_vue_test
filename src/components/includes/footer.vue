<template>

    <yd-tabbar fixed active-color="#EA3F17" color="#39C076">
        <yd-tabbar-item title="首页" link="/" :active="index">
            <yd-icon name="home" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="我的订单" link="/myorder" :active="order">
            <yd-icon name="shopcart" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
        <yd-tabbar-item title="个人中心" link="/uc_center" :active="usr">
            <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
    </yd-tabbar>

</template>
<script>

export default {
		name: 'footerss',
    props: {
        index: {
            type: Boolean,
            default: false
        },
        order: {
            type: Boolean,
            default: false
        },
        usr: {
            type: Boolean,
            default: false
        }
    },
    data () {
      return {
          
      }
    }
}
</script>


<style>

</style>
