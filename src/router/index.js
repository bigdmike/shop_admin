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
    path: '/about',
    name: 'About',
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
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
    path: '/orders',
    name: 'Orders',
    component: () => import( /* webpackChunkName: "orders" */ '../views/Orders/index.vue')
  },
  {
    path: '/order/:id',
    name: 'OrderEdit',
    component: () => import( /* webpackChunkName: "order_edit" */ '../views/OrderEdit/index.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router