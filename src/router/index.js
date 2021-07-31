import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import( /* webpackChunkName: "login" */ '../views/Login/index.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import( /* webpackChunkName: "products" */ '../views/Products/index.vue')
  },
  {
    path: '/product/:id',
    name: 'ProductEdit',
    component: () => import( /* webpackChunkName: "product_edit" */ '../views/ProductEdit/index.vue')
  },
  {
    path: '/products/new/',
    name: 'ProductCreate',
    component: () => import( /* webpackChunkName: "product_create" */ '../views/ProductCreate/index.vue')
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import( /* webpackChunkName: "categories" */ '../views/Categories/index.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import( /* webpackChunkName: "orders" */ '../views/Orders/index.vue')
  },
  {
    path: '/order/:id',
    name: 'OrderEdit',
    component: () => import( /* webpackChunkName: "order_edit" */ '../views/OrderEdit/index.vue')
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () => import( /* webpackChunkName: "charts" */ '../views/Charts/index.vue')
  },
  {
    path: '/home_carousel',
    name: 'HomeCarousel',
    component: () => import( /* webpackChunkName: "home_carousel" */ '../views/HomeCarousel/index.vue')
  },
  {
    path: '/home_product',
    name: 'HomeProduct',
    component: () => import( /* webpackChunkName: "home_product" */ '../views/HomeProduct/index.vue')
  },
  {
    path: '/home_video_social',
    name: 'HomeVideoSocial',
    component: () => import( /* webpackChunkName: "home_video_social" */ '../views/HomeVideoSocial/index.vue')
  },

  {
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/videos',
    name: 'Videos',
    component: () => import( /* webpackChunkName: "videos" */ '../views/Videos/index.vue')
  },
  {
    path: '/video/:id',
    name: 'VideoEdit',
    component: () => import( /* webpackChunkName: "video_edit" */ '../views/VideoEdit/index.vue')
  },
  {
    path: '/videos/create',
    name: 'VideoCreate',
    component: () => import( /* webpackChunkName: "video_create" */ '../views/VideoCreate/index.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import( /* webpackChunkName: "news" */ '../views/News/index.vue')
  },
  {
    path: '/article/:id',
    name: 'NewsEdit',
    component: () => import( /* webpackChunkName: "news_edit" */ '../views/NewsEdit/index.vue')
  },
  {
    path: '/articles/create',
    name: 'NewsCreate',
    component: () => import( /* webpackChunkName: "news_create" */ '../views/NewsCreate/index.vue')
  },
  {
    path: '/questions',
    name: 'Questions',
    component: () => import( /* webpackChunkName: "questions" */ '../views/Questions/index.vue')
  },
  {
    path: '/question/:id',
    name: 'QuestionEdit',
    component: () => import( /* webpackChunkName: "question_edit" */ '../views/QuestionEdit/index.vue')
  },
  {
    path: '/questions/create',
    name: 'QuestionCreate',
    component: () => import( /* webpackChunkName: "question_create" */ '../views/QuestionCreate/index.vue')
  },
  {
    path: '/shops',
    name: 'Shops',
    component: () => import( /* webpackChunkName: "shops" */ '../views/Shops/index.vue')
  },
  {
    path: '/company_info',
    name: 'CompanyInfo',
    component: () => import( /* webpackChunkName: "company_info" */ '../views/CompanyInfo/index.vue')
  },
  {
    path: '/ship_doc',
    name: 'ShipDoc',
    component: () => import( /* webpackChunkName: "ship_doc" */ '../views/ShipDoc/index.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import( /* webpackChunkName: "settings" */ '../views/Setting/index.vue')
  },
  {
    path: '/seo_setting',
    name: 'SeoSetting',
    component: () => import( /* webpackChunkName: "seo_setting" */ '../views/SeoMetaSetting/index.vue')
  },
]

const router = new VueRouter({
  routes,
  base: "/rerace_admin/",
  mode: "history"
})

export default router