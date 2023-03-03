<template src="./template.html"></template>

<script>
import { get_common_column } from '@/api/common_column.js';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog';
import MainList from '@/components/MainList/';
export default {
  name: 'SeoList',
  components: {
    Breadcrumb,
    DeleteDialog,
    MainList,
  },
  data() {
    return {
      drag: false,

      options: {
        action: [
          {
            title: '刪除',
            class: 'error',
            action: 'delete-action',
          },
        ],
        status: [
          {
            title: '已啟用',
            class: 'success',
            condition: 'Y',
          },
          {
            title: '已停用',
            class: '',
            condition: 'N',
          },
        ],
      },
      headers: [
        {
          text: '頁面名稱',
          align: 'start',
          sortable: false,
          value: 'TableTitle',
        },
      ],
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: 'SEO編輯列表',
          link: '/seo_list',
        },
      ],
      seo_list: [],
    };
  },
  methods: {
    GetData() {
      get_common_column([
        'meta_title_home',
        'meta_content_home',
        'meta_image_home',
        'meta_title_about',
        'meta_content_about',
        'meta_image_about',
        'meta_title_newslist',
        'meta_content_newslist',
        'meta_image_newslist',
        'meta_title_productlist',
        'meta_content_productlist',
        'meta_image_productlist',
        'meta_title_contact',
        'meta_content_contact',
        'meta_image_contact',
        'meta_title_dealer',
        'meta_content_dealer',
        'meta_image_dealer',
      ]).then((res) => {
        this.seo_list.push({
          page: '首頁',
          column_title: 'home',
          TableTitle: res.meta_title_home.Content,
          content: res.meta_content_home.Content,
          image: res.meta_image_home.Content,
        });
        this.seo_list.push({
          page: '關於我們',
          column_title: 'about',
          TableTitle: res.meta_title_about.Content,
          content: res.meta_content_about.Content,
          image: res.meta_image_about.Content,
        });
        this.seo_list.push({
          page: '最新消息列表',
          column_title: 'newslist',
          TableTitle: res.meta_title_newslist.Content,
          content: res.meta_content_newslist.Content,
          image: res.meta_image_newslist.Content,
        });
        this.seo_list.push({
          page: '商品列表',
          column_title: 'productlist',
          TableTitle: res.meta_title_productlist.Content,
          content: res.meta_content_productlist.Content,
          image: res.meta_image_productlist.Content,
        });
        this.seo_list.push({
          page: '聯絡我們',
          column_title: 'contact',
          TableTitle: res.meta_title_contact.Content,
          content: res.meta_content_contact.Content,
          image: res.meta_image_contact.Content,
        });
        this.seo_list.push({
          page: '經銷據點',
          column_title: 'dealer',
          TableTitle: res.meta_title_dealer.Content,
          content: res.meta_content_dealer.Content,
          image: res.meta_image_dealer.Content,
        });
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
