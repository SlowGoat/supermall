<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon" ></slot>
    </div>
    
    <div v-else>
      <slot name="item-icon-active" ></slot>
    </div>
    
    <div :style="activeStyle">
      <slot name="item-text" ></slot>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  components: {},
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
    }
  },
  watch: {},
  computed: {
    isActive() {
      //之所以不用 == 是因为 整个页面中可能还有别的子路由，这些子路由也会让当前页面处于活跃状态，所以用indexOf
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      //后面加了catch, 捕获一下错误，解决重复点击同一个页面报错
      this.$router.push(this.path).catch(err => err);
    }
  },
  created() {},
  mounted() {}
}
</script>

<style scoped>
/* flex: 1 作用：让所有弹性盒模型对象的子元素都有相同的长度（均等分） */
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>