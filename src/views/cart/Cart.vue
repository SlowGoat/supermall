<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

import CartList from './childComps/CartList'
import CartBottomBar from './childComps/CartBottomBar'


export default {
  name: 'Cart',
  components: {
    NavBar,
    CartList,
    CartBottomBar,
  },
  props: {},
  data() {
    return {
    }
  },
  watch: {},
  computed: {
    cartLength() {
      return this.$store.state.cartList.length
    }
  },
  methods: {
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>