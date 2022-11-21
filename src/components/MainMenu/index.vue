<template src="./template.html"></template>

<script>
export default {
  name: 'MainMenu',
  data() {
    return {
      menu: [
        {
          title: '首頁',
          icon: 'mdi-home',
          type: 'U',
          link: '/',
          group: false,
          list: [],
        },
        {
          title: '頁面編輯',
          icon: 'mdi-pencil',
          link: '/questions',
          type: 'U',
          group: true,
          list: [
            {
              title: '網站選單',
              link: '/web_links',
            },
            {
              title: '首頁管理',
              link: '/home_page',
            },
            {
              title: '關於我們頁面管理',
              link: '/about_page',
            },
            {
              title: '首頁大圖輪播',
              link: '/home_carousel',
            },
            {
              title: '最新消息分類',
              link: '/news_category',
            },
            {
              title: '最新消息',
              link: '/news',
            },
            {
              title: '公司資訊',
              link: '/company_info',
            },
            {
              title: '隱私權政策',
              link: '/privacy_page',
            },
            {
              title: '會員責任規範條款',
              link: '/terms_of_customer',
            },
          ],
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
            // {
            //   title: "遺棄的購物車",
            //   link: "/checkout"
            // }
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
              title: '商品分類',
              link: '/product_menu',
            },
            {
              title: '商品目錄',
              link: '/categories',
            },
            // {
            //   title: "庫存管理",
            //   link: "/products/inventories"
            // },
            // {
            //   title: "商品描述模板",
            //   link: "/products/templates"
            // }
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
        // {
        //   title: "銷售管道",
        //   icon: "mdi-store",
        //   link: "/channels",
        //   group: false,
        //   list: []
        // }
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
