<template src="./template.html"></template>

<script>
import { get_categories } from '@/api/news';
import ListShow from '@/components/News/ListShow/index';
import Breadcrumb from '@/components/Breadcrumb/';
import category_components from '@/components/NewsCategory/category_components.js';
export default {
  name: 'NewsCover',
  mixins: [category_components],
  components: {
    ListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: '頁面編輯',
          link: '',
        },
        {
          title: '文章分類',
          link: '',
        },
      ],
      news_categories: [],
    };
  },
  methods: {
    async GetCategoryData() {
      get_categories().then((res) => {
        console.log(res);
        this.news_categories = res.data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.news_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? '' : (is_sort = false);
      });
      is_sort ? '' : this.UpdateNewsCategorySort();
    },
  },
  created() {
    this.GetCategoryData();
  },
};
</script>
