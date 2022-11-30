<template src="./template.html"></template>

<script>
import { get_common_column } from '@/api/common_column.js';
import Breadcrumb from '@/components/Breadcrumb/';
import DeleteDialog from '@/components/MainDeleteDialog';
export default {
  name: 'SeoList',
  components: {
    Breadcrumb,
    DeleteDialog,
  },
  data() {
    return {
      drag: false,
      headers: [
        { text: '', value: '', width: 100 },
        {
          text: '頁面名稱',
          align: 'start',
          sortable: false,
          value: 'page_title',
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
      ]).then((res) => {
        this.seo_list.push({
          page: '首頁',
          column_title: 'home',
          title: res.meta_title_home.Content,
          content: res.meta_content_home.Content,
          image: res.meta_image_home.Content,
        });
        this.seo_list.push({
          page: '關於我們',
          column_title: 'about',
          title: res.meta_title_about.Content,
          content: res.meta_content_about.Content,
          image: res.meta_image_about.Content,
        });
        this.seo_list.push({
          page: '最新消息列表',
          column_title: 'newslist',
          title: res.meta_title_newslist.Content,
          content: res.meta_content_newslist.Content,
          image: res.meta_image_newslist.Content,
        });
        this.seo_list.push({
          page: '商品列表',
          column_title: 'productlist',
          title: res.meta_title_productlist.Content,
          content: res.meta_content_productlist.Content,
          image: res.meta_image_productlist.Content,
        });
      });
    },
  },
  created() {
    this.GetData();
  },
};
</script>
