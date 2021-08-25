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
    meta: {
      promission: "A"
    },
    name: 'Products',
    component: () => import( /* webpackChunkName: "products" */ '../views/Products/index.vue')
  },
  {
    path: '/product/:id',
    meta: {
      promission: "A"
    },
    name: 'ProductEdit',
    component: () => import( /* webpackChunkName: "product_edit" */ '../views/ProductEdit/index.vue')
  },
  {
    path: '/products/new/',
    meta: {
      promission: "A"
    },
    name: 'ProductCreate',
    component: () => import( /* webpackChunkName: "product_create" */ '../views/ProductCreate/index.vue')
  },
  {
    path: '/categories',
    meta: {
      promission: "A"
    },
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
    meta: {
      promission: "A"
    },
    name: 'HomeCarousel',
    component: () => import( /* webpackChunkName: "home_carousel" */ '../views/HomeCarousel/index.vue')
  },
  {
    path: '/home_product',
    meta: {
      promission: "A"
    },
    name: 'HomeProduct',
    component: () => import( /* webpackChunkName: "home_product" */ '../views/HomeProduct/index.vue')
  },
  {
    path: '/home_video_social',
    meta: {
      promission: "A"
    },
    name: 'HomeVideoSocial',
    component: () => import( /* webpackChunkName: "home_video_social" */ '../views/HomeVideoSocial/index.vue')
  },

  {
    path: '/about',
    meta: {
      promission: "A"
    },
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/videos',
    meta: {
      promission: "A"
    },
    name: 'Videos',
    component: () => import( /* webpackChunkName: "videos" */ '../views/Videos/index.vue')
  },
  {
    path: '/video/:id',
    meta: {
      promission: "A"
    },
    name: 'VideoEdit',
    component: () => import( /* webpackChunkName: "video_edit" */ '../views/VideoEdit/index.vue')
  },
  {
    path: '/videos/create',
    meta: {
      promission: "A"
    },
    name: 'VideoCreate',
    component: () => import( /* webpackChunkName: "video_create" */ '../views/VideoCreate/index.vue')
  },
  {
    path: '/news',
    meta: {
      promission: "A"
    },
    name: 'News',
    component: () => import( /* webpackChunkName: "news" */ '../views/News/index.vue')
  },
  {
    path: '/article/:id',
    meta: {
      promission: "A"
    },
    name: 'NewsEdit',
    component: () => import( /* webpackChunkName: "news_edit" */ '../views/NewsEdit/index.vue')
  },
  {
    path: '/articles/create',
    meta: {
      promission: "A"
    },
    name: 'NewsCreate',
    component: () => import( /* webpackChunkName: "news_create" */ '../views/NewsCreate/index.vue')
  },
  {
    path: '/questions',
    meta: {
      promission: "A"
    },
    name: 'Questions',
    component: () => import( /* webpackChunkName: "questions" */ '../views/Questions/index.vue')
  },
  {
    path: '/question/:id',
    meta: {
      promission: "A"
    },
    name: 'QuestionEdit',
    component: () => import( /* webpackChunkName: "question_edit" */ '../views/QuestionEdit/index.vue')
  },
  {
    path: '/questions/create',
    meta: {
      promission: "A"
    },
    name: 'QuestionCreate',
    component: () => import( /* webpackChunkName: "question_create" */ '../views/QuestionCreate/index.vue')
  },
  {
    path: '/shops',
    meta: {
      promission: "A"
    },
    name: 'Shops',
    component: () => import( /* webpackChunkName: "shops" */ '../views/Shops/index.vue')
  },
  {
    path: '/company_info',
    meta: {
      promission: "A"
    },
    name: 'CompanyInfo',
    component: () => import( /* webpackChunkName: "company_info" */ '../views/CompanyInfo/index.vue')
  },
  {
    path: '/ship_doc',
    meta: {
      promission: "A"
    },
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