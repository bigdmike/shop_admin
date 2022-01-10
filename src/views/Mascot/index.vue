<template src="./template.html"></template>

<script>
import { get_mascot } from "@/api/mascot";
import ListShow from "@/components/Mascot/ListShow/index";
import Breadcrumb from "@/components/Breadcrumb/";
import mascot_components from "@/components/Mascot/mascot_components.js";
export default {
  name: "Mascot",
  mixins: [mascot_components],
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
          title: "角色館",
          link: "",
        },
      ],
      mascot_data: [],
    };
  },
  methods: {
    async GetMascotData() {
      get_mascot().then((res) => {
        console.log(res);
        this.mascot_data = res.data;
        this.CheckSort();
      });
    },
    CheckSort() {
      let is_sort = true;
      this.mascot_data.forEach((item, item_index) => {
        item.Seq == item_index + 1 ? "" : (is_sort = false);
      });
      is_sort ? "" : this.UpdateMascotSort();
    },
  },
  created() {
    this.GetMascotData();
  },
};
</script>
