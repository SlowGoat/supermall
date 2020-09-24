<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image"  @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import {Swiper, SwiperItem} from 'components/common/swiper/index.js'

export default {
  name:'HomeSwiper',
  components:{
    Swiper,
    SwiperItem,
  },
  props:{
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
      isLoad: false
    }
  },
  watch:{},
  computed:{},
  methods:{
    imageLoad() {
      if(!this.isLoad) {
        this.$emit('swiperImageLoad')
        this.isLoad = true
      }
    }
  },
  created(){},
  mounted(){}
}
</script>

<style scoped>
</style>