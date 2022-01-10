<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
import Breadcrumb from "@/components/Breadcrumb/";
import home_promote_components from "@/components/HomePromote/home_promote_components";
import { create_promote } from "@/api/home_promote.js";
export default {
  name: "HomePromote",
  mixins: [home_promote_components],
  components: {
    Breadcrumb,
    draggable,
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: "",
        },
        {
          title: "首頁底部推薦商品",
          link: "",
        },
      ],
      promote_data: [],
    };
  },
  methods: {
    CreatePromoteData() {
      let data = {
        Link: "link1",
        Seq: 0,
        Image1: "",
        Image2: "",
      };
      create_promote(data).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    this.GetPromoteData();
  },
  filters: {
    image(val) {
      return process.env.VUE_APP_BASEURL + val;
    },
  },
};
</script>
<style>
.image_card {
  transition: opacity 0.4s ease-in-out;
  cursor: grab;
}

.img_card_control {
  background-color: rgba(0, 0, 0, 0.541);
  transition: opacity 0.4s ease-in-out;
  opacity: 0;
}
.img_card_control.show {
  opacity: 1;
}

.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>