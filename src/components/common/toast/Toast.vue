<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name:'Toast',
  components:{},
  props:{},
  data(){
    return {
      message: '',
      isShow: false,
    }
  },
  watch:{},
  computed:{},
  methods:{
    show(message="默认字体", duration=2000) {

      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration)
    },
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
  .toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 10px;

    color: #fff;
    background-color: rgba(0, 0, 0, .7);
    z-index: 999;
  }
</style>