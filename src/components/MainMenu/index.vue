<template src="./template.html"></template>

<script>
export default {
  name: "MainMenu",
  data() {
    return {
      menu: [
        {
          title: "首頁",
          icon: "mdi-home",
          link: "/",
          group: false,
          list: []
        },
        {
          title: "訂單管理",
          icon: "mdi-inbox",
          link: "/orders",
          group: true,
          list: [
            {
              title: "所有訂單",
              link: "/orders"
            },
            {
              title: "遺棄的購物車",
              link: "/checkout"
            }
          ]
        },
        {
          title: "商品管理",
          icon: "mdi-tag-text",
          link: "/products",
          group: true,
          list: [
            {
              title: "所有商品",
              link: "/products"
            },
            {
              title: "商品分類",
              link: "/products/collections"
            },
            {
              title: "庫存管理",
              link: "/products/inventories"
            },
            {
              title: "商品描述模板",
              link: "/products/templates"
            }
          ]
        },
        {
          title: "客戶管理",
          icon: "mdi-account",
          link: "/customers",
          group: false,
          list: []
        },
        {
          title: "促銷優惠",
          icon: "mdi-sale",
          link: "/promotions",
          group: false,
          list: []
        },
        {
          title: "分析報表",
          icon: "mdi-google-analytics",
          link: "/analytics",
          group: false,
          list: []
        },
        {
          title: "銷售管道",
          icon: "mdi-store",
          link: "/channels",
          group: false,
          list: []
        }
      ]
    }
  },
  methods: {
    GroupOpenFilter(menu_item) {
      let result = false
      menu_item.list.forEach(item => {
        this.$route.path == item.link ? result = true : ""
      });
      return result
    }
  }
}
</script>

<style>
#MainMenu {
  height: 100%;
}
</style>