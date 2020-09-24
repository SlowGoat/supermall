<template>
  <div class="goods">
    <!-- 不需要插槽使用单标签就可以 -->
    <goods-list-item v-for="item in goods" :goods-item="item"/>
    <!-- {{goods}} -->
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'

export default {
  name:'GoodsList',
  components:{
    GoodsListItem,
  },
  props:{
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  created(){},
  mounted(){}
}
</script>

<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    
  }


</style>