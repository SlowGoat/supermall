<template>
  <div class="back-top">
    <img src="~assets/img/common/top.png">
  </div>
</template>

<script>
export default {
  name:'BackTop',
  components:{},
  props:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{
    backClick() {
      console.log('回到顶部');
    }
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 8px;
    bottom: 55px;
  }

  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>