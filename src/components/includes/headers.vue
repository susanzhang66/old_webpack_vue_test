
<template>

    <yd-navbar :title="title" bgcolor="#40cd89" color="#fff" fontsize=".3rem" :fixed="fixed" >
        <div @click="back" slot="left">
            <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </div>
    </yd-navbar>

</template>
<script>

export default {
		name: 'headers',
    props: {
        title: {
            type: String,
            default: ''
        },
        fixed: {
          type: Boolean,
          default: true
        }
    },
    data () {
      return {
          
      }
    },
    methods: {
      back (){
        this.$emit('back2');
        this.$router.back();
      }

    },
}
</script>


<style>

</style>
