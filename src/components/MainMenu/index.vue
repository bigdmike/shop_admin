<template src="./template.html"></template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      menu: [
        {
          title: '頁面編輯',
          icon: 'mdi-pencil',
          link: '/questions',
          type: 'U',
          group: true,
          list: [
            // {
            //   title: '網站選單',
            //   link: '/web_links',
            // },
            {
              title: '首頁管理',
              link: '/page_edit/home',
            },
            {
              title: '關於我們頁面管理',
              link: '/page_edit/about',
            },
            {
              title: '首頁大圖輪播',
              link: '/home_carousel',
            },
            {
              title: '公司資訊',
              link: '/page_edit/company_info',
            },
            {
              title: '隱私權政策',
              link: '/page_edit/site_privacy',
            },
            {
              title: '會員責任規範條款',
              link: 'page_edit/terms_of_customer',
            },
            {
              title: 'SEO設定',
              link: '/seo_list',
            },
          ],
        },
        {
          title: '最新消息',
          icon: 'mdi-note-edit-outline',
          type: 'U',
          link: '/news',
          group: true,
          list: [
            {
              title: '分類管理',
              link: '/news_category',
            },
            {
              title: '文章管理',
              link: '/news',
            },
          ],
        },
        {
          title: '影音相簿',
          icon: 'mdi-video',
          type: 'U',
          link: '/video_category',
          group: true,
          list: [
            {
              title: '分類管理',
              link: '/video_category',
            },
            {
              title: '影片管理',
              link: '/video',
            },
          ],
        },
        {
          title: '經銷據點',
          icon: 'mdi-store',
          type: 'U',
          link: '/dealers',
          group: false,
        },
        {
          title: '訂單管理',
          icon: 'mdi-inbox',
          link: '/orders',
          type: 'U',
          group: true,
          list: [
            {
              title: '所有訂單',
              link: '/orders',
            },
            {
              title: '分潤訂單統計',
              link: '/event_orders',
            },
          ],
        },
        {
          title: '商品管理',
          icon: 'mdi-tag-text',
          link: '/products',
          type: 'U',
          group: true,
          list: [
            {
              title: '所有商品',
              link: '/products',
            },
            {
              title: '客製化選項',
              link: '/customize_product',
            },
            {
              title: '商品目錄',
              link: '/categories',
            },
            {
              title: '商品分類',
              link: '/product_menu',
            },
            {
              title: '銷售頁管理',
              link: '/event_page',
            },
          ],
        },
        {
          title: '金物流管理',
          icon: 'mdi-credit-card-outline',
          link: '/payment',
          type: 'U',
          group: true,
          list: [
            {
              title: '付款方式',
              link: '/payment',
            },
            {
              title: '運送方式',
              link: '/shipping',
            },
          ],
        },
        {
          title: '促銷優惠',
          icon: 'mdi-sale',
          type: 'U',
          link: '/promotions',
          group: true,
          list: [
            {
              title: '優惠券代碼',
              link: '/coupon',
            },
            {
              title: '打折/贈品',
              link: '/discount',
            },
          ],
        },
        {
          title: '分析報表',
          icon: 'mdi-google-analytics',
          type: 'U',
          link: '/charts',
          group: false,
          list: [],
        },
        {
          title: '會員管理',
          icon: 'mdi-account',
          type: 'U',
          link: '/members',
          group: false,
          list: [],
        },
      ],
    };
  },
  methods: {
    GroupOpenFilter(menu_item) {
      let result = false;
      menu_item.list.forEach((item) => {
        this.$route.path == item.link ? (result = true) : '';
      });
      return result;
    },
  },
  computed: {
    user_data() {
      if (this.$cookie.get('account_data')) {
        return JSON.parse(this.$cookie.get('account_data'));
      } else {
        return { name: '', admin_id: -1 };
      }
    },
  },
};
</script>

<style>
#MainMenu {
  height: 100%;
}
</style>
