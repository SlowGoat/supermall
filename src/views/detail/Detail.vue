<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
    <detail-swiper :topImages="topImages"></detail-swiper>
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'

import {getDetail, Goods} from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
  },
  props:{},
  data(){
    return {
      iid: null,
      topImages: [],
      goods: null,
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详细数据
    getDetail(this.iid).then(res => {
      //获取顶部的图片轮播数据
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    })
    
  },
  mounted(){}
}
</script>

<style scoped>
</style>