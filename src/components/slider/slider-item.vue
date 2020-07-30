<!--
 * @Author: your name
 * @Date: 2020-01-17 14:43:44
 * @LastEditTime: 2020-06-08 21:36:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/components/slider/slider-item.vue
--> 
<template>
    <div class="yd-slider-item">
        <slot v-bind:imgListSrc="imgListSrc"></slot>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'yd-slider-item',
        mounted() {
            this.$nextTick(this.$parent.init);
        //    console.log(this.$parent.imgList)  这个也可以拿到数据
        },
        props: {
            imgListSrc: {
                type: Array
            }
        }
    }
</script>
