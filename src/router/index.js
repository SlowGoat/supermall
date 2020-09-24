import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue')
const Category = () => import('views/category/Category.vue')
const Cart = () => import('views/cart/Cart.vue')
const Profile = () => import('views/profile/Profile.vue')
const Detail = () => import('views/detail/Detail')

//1.安装插件
Vue.use(VueRouter)

//2.创建router
const router = new VueRouter({
  routes: [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/detail/:iid',
      component: Detail
    }
  ],
  mode: 'history',
})

export default router