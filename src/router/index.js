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
    name: '首頁頁面管理',
    component: () =>
      import(/* webpackChunkName: "home_page" */ '../views/HomePage/index.vue'),
  },
  {
    path: '/about_page',
    name: '關於頁面管理',
    component: () =>
      import(
        /* webpackChunkName: "about_page" */ '../views/AboutPage/index.vue'
      ),
  },
  {
    path: '/home_carousel',
    name: '首頁大圖輪播',
    component: () =>
      import(
        /* webpackChunkName: "home_carousel" */ '../views/HomeCarousel/index.vue'
      ),
  },
  {
    path: '/news_category',
    name: '最新消息分類管理',
    component: () =>
      import(
        /* webpackChunkName: "news_category" */ '../views/NewsCategory/index.vue'
      ),
  },
  {
    path: '/news',
    name: '最新消息管理',
    component: () =>
      import(/* webpackChunkName: "news" */ '../views/News/index.vue'),
  },
  {
    path: '/news/:id',
    name: '最新消息',
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
    path: '/customize_category',
    name: '客製化選項類型管理',
    component: () =>
      import(
        /* webpackChunkName: "customize_category" */ '../views/CustomizeCategory/index.vue'
      ),
  },
  {
    path: '/customize_category/:id',
    name: '客製化選項管理',
    component: () =>
      import(
        /* webpackChunkName: "customize_spec" */ '../views/CustomizeSpec/index.vue'
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
    path: '/event_page',
    name: '銷售頁管理',
    component: () =>
      import(
        /* webpackChunkName: "event_page" */ '../views/EventPage/index.vue'
      ),
  },
  {
    path: '/event_page/new/',
    name: '新增銷售頁',
    component: () =>
      import(
        /* webpackChunkName: "create_event_page" */ '../views/EventPageEdit/index.vue'
      ),
  },
  {
    path: '/event_page/:id',
    name: '編輯銷售頁',
    component: () =>
      import(
        /* webpackChunkName: "edit_event_page" */ '../views/EventPageEdit/index.vue'
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
    name: '所有訂單',
    component: () =>
      import(/* webpackChunkName: "orders" */ '../views/Orders/index.vue'),
  },
  {
    path: '/event_orders',
    name: '分潤訂單統計',
    component: () =>
      import(
        /* webpackChunkName: "event_orders" */ '../views/EventOrders/index.vue'
      ),
  },
  {
    path: '/event_order/:id',
    name: '分潤訂單統計報表',
    component: () =>
      import(
        /* webpackChunkName: "event_order_chart" */ '../views/EventOrderChart/index.vue'
      ),
  },
  {
    path: '/order/:id',
    name: '訂單詳細',
    component: () =>
      import(
        /* webpackChunkName: "order_edit" */ '../views/OrderEdit/index.vue'
      ),
  },
  {
    path: '/charts',
    name: '分析報表',
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
    name: '隱私權政策管理',
    component: () =>
      import(
        /* webpackChunkName: "privacy_page" */ '../views/PrivacyPage/index.vue'
      ),
  },
  {
    path: '/terms_of_customer',

    name: '會員條款管理',
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
    name: '公司資訊管理',
    component: () =>
      import(
        /* webpackChunkName: "company_info" */ '../views/CompanyInfo/index.vue'
      ),
  },
  {
    path: '/seo_list',
    name: 'SEO設定',
    component: () =>
      import(/* webpackChunkName: "seo_list" */ '../views/SeoList/index.vue'),
  },
  {
    path: '/seo_edit/:id',
    name: 'SEO編輯',
    component: () =>
      import(/* webpackChunkName: "seo_edit" */ '../views/SeoEdit/index.vue'),
  },
  {
    path: '/members',
    name: '會員管理',
    component: () =>
      import(
        /* webpackChunkName: "member_list" */ '../views/Members/index.vue'
      ),
  },
  {
    path: '/member/:id',
    name: '會員資訊',
    component: () =>
      import(
        /* webpackChunkName: "member_info" */ '../views/MemberInfo/index.vue'
      ),
  },
];

const router = new VueRouter({
  routes,
  base: '/yaowen_admin/',
  mode: 'history',
});

export default router;
