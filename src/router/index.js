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
    path: '/product_menu',

    name: 'ProductMenu',
    component: () => import( /* webpackChunkName: "product_menu" */ '../views/ProductMenu/index.vue')
  },
  {
    path: '/categories',

    name: 'Categories',
    component: () => import( /* webpackChunkName: "categories" */ '../views/MenuCategories/index.vue')
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
    path: '/about',

    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About/index.vue')
  },
  {
    path: '/discount',

    name: 'Discount',
    component: () => import( /* webpackChunkName: "discount" */ '../views/Discount/index.vue')
  },
  {
    path: '/news',

    name: 'News',
    component: () => import( /* webpackChunkName: "news" */ '../views/News/index.vue')
  },
  {
    path: '/web_links',

    name: 'WebLinks',
    component: () => import( /* webpackChunkName: "web_links" */ '../views/WebLink/index.vue')
  },
  {
    path: '/payment',

    name: 'PayMent',
    component: () => import( /* webpackChunkName: "payment" */ '../views/Payment/index.vue')
  },
  {
    path: '/shipping',

    name: 'Shipping',
    component: () => import( /* webpackChunkName: "shipping" */ '../views/Shipping/index.vue')
  },
  {
    path: '/questions',

    name: 'Questions',
    component: () => import( /* webpackChunkName: "questions" */ '../views/Questions/index.vue')
  },
  {
    path: '/home_kol',

    name: 'HomeKol',
    component: () => import( /* webpackChunkName: "home_kol" */ '../views/HomeKol/index.vue')
  },
  {
    path: '/home_promote',

    name: 'HomePromote',
    component: () => import( /* webpackChunkName: "home_promote" */ '../views/HomePromote/index.vue')
  },
  {
    path: '/mascot',

    name: 'Mascot',
    component: () => import( /* webpackChunkName: "mascot" */ '../views/Mascot/index.vue')
  },
  {
    path: '/advertisement',

    name: 'Advertisement',
    component: () => import( /* webpackChunkName: "advertisement" */ '../views/Advertisement/index.vue')
  },
  {
    path: '/privacy_page',

    name: 'PrivacyPage',
    component: () => import( /* webpackChunkName: "privacy_page" */ '../views/PrivacyPage/index.vue')
  },
  {
    path: '/terms_of_customer',

    name: 'TermsOfCustomer',
    component: () => import( /* webpackChunkName: "terms_of_customer" */ '../views/TermsOfCustomer/index.vue')
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: () => import( /* webpackChunkName: "coupon" */ '../views/Coupon/index.vue')
  },
  {
    path: '/company_info',
    name: 'CompanyInfo',
    component: () => import( /* webpackChunkName: "company_info" */ '../views/CompanyInfo/index.vue')
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
  base: "/kol_kitchen/",
  mode: "history"
})

export default router