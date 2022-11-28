import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    component: () =>
      import(/* webpackChunkName: "login" */ '../views/Login/index.vue'),
  },
  {
    path: '/home_page',
    name: 'HomePageEdit',
    component: () =>
      import(/* webpackChunkName: "home_page" */ '../views/HomePage/index.vue'),
  },
  {
    path: '/about_page',
    name: 'AboutPageEdit',
    component: () =>
      import(
        /* webpackChunkName: "about_page" */ '../views/AboutPage/index.vue'
      ),
  },
  {
    path: '/home_carousel',
    name: 'HomeCarousel',
    component: () =>
      import(
        /* webpackChunkName: "home_carousel" */ '../views/HomeCarousel/index.vue'
      ),
  },
  {
    path: '/news_category',
    name: 'NewsCategory',
    component: () =>
      import(
        /* webpackChunkName: "news_category" */ '../views/NewsCategory/index.vue'
      ),
  },
  {
    path: '/news',

    name: 'News',
    component: () =>
      import(/* webpackChunkName: "news" */ '../views/News/index.vue'),
  },
  {
    path: '/news/:id',
    name: 'NewsEdit',
    component: () =>
      import(/* webpackChunkName: "news_edit" */ '../views/NewsEdit/index.vue'),
  },

  {
    path: '/products',

    name: '所有商品',
    component: () =>
      import(/* webpackChunkName: "products" */ '../views/Products/index.vue'),
  },
  {
    path: '/product/:id',
    name: '編輯商品',
    component: () =>
      import(
        /* webpackChunkName: "product_edit" */ '../views/ProductEdit/index.vue'
      ),
  },
  {
    path: '/products/new/',
    name: '新增商品',
    component: () =>
      import(
        /* webpackChunkName: "product_edit" */ '../views/ProductEdit/index.vue'
      ),
  },
  {
    path: '/product_menu',

    name: '商品分類管理',
    component: () =>
      import(
        /* webpackChunkName: "product_menu" */ '../views/ProductMenu/index.vue'
      ),
  },
  {
    path: '/categories',

    name: 'Categories',
    component: () =>
      import(
        /* webpackChunkName: "categories" */ '../views/MenuCategories/index.vue'
      ),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () =>
      import(/* webpackChunkName: "orders" */ '../views/Orders/index.vue'),
  },
  {
    path: '/order/:id',
    name: 'OrderEdit',
    component: () =>
      import(
        /* webpackChunkName: "order_edit" */ '../views/OrderEdit/index.vue'
      ),
  },
  {
    path: '/charts',
    name: 'Charts',
    component: () =>
      import(/* webpackChunkName: "charts" */ '../views/Charts/index.vue'),
  },

  {
    path: '/discount',

    name: '折扣與贈品',
    component: () =>
      import(/* webpackChunkName: "discount" */ '../views/Discount/index.vue'),
  },
  {
    path: '/web_links',

    name: 'WebLinks',
    component: () =>
      import(/* webpackChunkName: "web_links" */ '../views/WebLink/index.vue'),
  },
  {
    path: '/payment',

    name: '付款方式管理',
    component: () =>
      import(/* webpackChunkName: "payment" */ '../views/Payment/index.vue'),
  },
  {
    path: '/shipping',

    name: '配送方式管理',
    component: () =>
      import(/* webpackChunkName: "shipping" */ '../views/Shipping/index.vue'),
  },
  {
    path: '/privacy_page',

    name: 'PrivacyPage',
    component: () =>
      import(
        /* webpackChunkName: "privacy_page" */ '../views/PrivacyPage/index.vue'
      ),
  },
  {
    path: '/terms_of_customer',

    name: 'TermsOfCustomer',
    component: () =>
      import(
        /* webpackChunkName: "terms_of_customer" */ '../views/TermsOfCustomer/index.vue'
      ),
  },
  {
    path: '/coupon',
    name: '優惠券代碼',
    component: () =>
      import(/* webpackChunkName: "coupon" */ '../views/Coupon/index.vue'),
  },
  {
    path: '/company_info',
    name: 'CompanyInfo',
    component: () =>
      import(
        /* webpackChunkName: "company_info" */ '../views/CompanyInfo/index.vue'
      ),
  },
  {
    path: '/seo_list',
    name: 'SeoList',
    component: () =>
      import(/* webpackChunkName: "seo_list" */ '../views/SeoList/index.vue'),
  },
  {
    path: '/seo_edit/:id',
    name: 'SeoEdit',
    component: () =>
      import(/* webpackChunkName: "seo_edit" */ '../views/SeoEdit/index.vue'),
  },
];

const router = new VueRouter({
  routes,
  base: '/yaowen_admin/',
  mode: 'history',
});

export default router;
