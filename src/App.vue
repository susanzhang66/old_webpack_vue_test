<!--
 * @Author: your name
 * @Date: 2020-05-12 15:16:27
 * @LastEditTime: 2020-06-22 20:34:11
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: /learn/Users/rainbow/Documents/工作/vue/fruit/src/App.vue
--> 

<template>
  <div id="app">
    <http></http>
    <router-view/>
  </div>
</template>

<script>
import http from '@/components/http'
export default {
  name: 'App',
  components: { http }
}
</script>

<style>

</style>
