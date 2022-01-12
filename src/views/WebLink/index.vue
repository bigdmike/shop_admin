<template src="./template.html"></template>

<script>
import { getWeblinkAndCategory } from "@/api/web_links";
import ListShow from "@/components/WebLink/ListShow/index";
import CategoryListShow from "@/components/WebLink/CategoryListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import category_components from "@/components/WebLink/category_components.js";
import weblink_components from "@/components/WebLink/weblink_components.js";
export default {
  name: "WebLink",
  mixins: [category_components, weblink_components],
  components: {
    ListShow,
    CategoryListShow,
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
          title: "常見問題",
          link: "",
        },
      ],
      weblink_categories: [],
      weblink_data: [],
    };
  },
  methods: {
    async GetWebLinkData() {
      getWeblinkAndCategory().then((res) => {
        console.log(res);
        this.weblink_categories = res[0].data;
        this.weblink_data = res[1].data;
        // this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.weblink_categories.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateWebLinkCategorySort();

      is_sort = true;
      this.weblink_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateWebLinkSort();
    },
  },
  created() {
    this.GetWebLinkData();
  },
};
</script>
