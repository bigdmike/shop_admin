<template src="./template.html"></template>

<script>
import { get_kol } from "@/api/kol";
import ListShow from "@/components/Homekol/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import kol_components from "@/components/Homekol/kol_components.js";
export default {
  name: "HomeKol",
  mixins: [kol_components],
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
          title: "首頁網紅介紹",
          link: "",
        },
      ],
      kol_data: [],
    };
  },
  methods: {
    async GetKOLData() {
      get_kol().then((res) => {
        console.log(res);
        this.kol_data = res.data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.kol_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateKOLSort();
    },
  },
  created() {
    this.GetKOLData();
  },
};
</script>
