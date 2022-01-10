<template src="./template.html"></template>

<script>
import { get_all_data } from "@/api/news";
import ListShow from "@/components/News/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import category_components from "@/components/News/category_components.js";
import news_components from "@/components/News/news_components.js";
export default {
  name: "News",
  mixins: [category_components, news_components],
  components: {
    ListShow,
    Breadcrumb,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: "",
        },
        {
          title: "最新消息",
          link: "",
        },
      ],
      news_categories: [],
      news_data: [],
    };
  },
  methods: {
    async GetNewsData() {
      get_all_data().then((res) => {
        console.log(res);
        this.news_categories = res[0].data;
        this.news_data = res[1].data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.news_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateNewsCategorySort();

      is_sort = true;
      this.news_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateNewsSort();
    },
  },
  created() {
    this.GetNewsData();
  },
};
</script>
