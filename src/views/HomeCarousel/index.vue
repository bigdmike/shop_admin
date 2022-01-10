<template src="./template.html"></template>

<script>
import draggable from "vuedraggable";
import Breadcrumb from "@/components/Breadcrumb/";
import home_carousel_components from "@/components/HomeCarousel/home_carousel_components";
export default {
  name: "HomeCarousel",
  mixins: [home_carousel_components],
  components: {
    draggable,
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
          title: "首頁大圖輪播",
          link: "",
        },
      ],
      carousels: [],
    };
  },
  methods: {},
  created() {
    this.GetCarouselData();
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