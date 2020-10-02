<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>

    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommends" ref="recommend"></goods-list>
    </scroll>

    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>

    <!-- <toast :message="message" :show="show"/> -->
    
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'
 
import Scroll from 'components/common/scroll/Scroll'
import GoodsList from 'components/content/goods/GoodsList'
// import Toast from 'components/common/toast/Toast'


import {getDetail, Goods, Shop, GoodsParam, getRecommend} from 'network/detail'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
    // Toast,
  },
  props:{},
  mixins: [itemListenerMixin, backTopMixin],
  data(){
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex: 0,
      // message: '',
      // show: false,
    }
  },
  watch:{},
  computed:{},
  methods:{
    imageLoad() {
      this.refresh()

      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)

    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
    },
    contentScroll(position) {
      //1.获取y值
      const positionY = -position.y

      //2.positionY 和 主题中的值进行对比
      for(let i = 0; i < this.themeTopYs.length -1; i++) {
        if(this.currentIndex != i && (positionY >= this.themeTopYs[i]) && (positionY < this.themeTopYs[i+1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }
      }

      //3.是否显示回到顶部
      this.isShowBackTop = (-position.y) > 1000

    },
    addToCart() {
      //1.获取购物车需要展示的信息
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      //2.将商品添加到购物车
      // this.$store.commit('addCart', product)
      this.$store.dispatch('addCart', product).then(res => {
        this.$toast.show(res, 1500)

      })
      // console.log(this.$store.state.cartList);
    }

  },
  created(){
    //1.保存传入的iid
    this.iid = this.$route.params.iid

    //2.根据iid请求详细数据
    getDetail(this.iid).then(res => {

      //(0获取数据)
      const data = res.result

      //(1)获取顶部的图片轮播数据
      this.topImages = data.itemInfo.topImages

      //(2)获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      //(3)创建店铺信息
      this.shop = new Shop(data.shopInfo)

      //(4)保存商品的详情数据
      this.detailInfo = data.detailInfo

      //(5)获取参数的信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      //(6)获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }
    })
    
    //3.请求推荐数据
    getRecommend().then(res => {
      this.recommends = res.data.list
    })


    
  },
  mounted(){

  },
  destroyed() {
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
  .content {
    height: calc(100% - 44px - 49px);
  }

</style>