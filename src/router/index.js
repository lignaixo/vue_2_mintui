import Vue from 'vue'
import VueRouter from 'vue-router'

//引入demo组件
import Navbar from '../components/Navbar.vue'
import Tabber from '../components/Tabbar.vue'
import Indicator from '../components/Indicator.vue'

//引入项目组件
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Article from '../views/Article.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/navbar',
    component: Navbar
  },
  {
    path: '/indicator',
    component: Indicator
  },
  {
    path: '/tabbar',
    component: Tabber
  },
  {
    path: '/',
    component: Home
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/article/:id',
    props: true,
    component: Article
  }
  // {
  //   path: '/about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
