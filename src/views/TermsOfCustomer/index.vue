<template src="./template.html"></template>

<script>
import FroalaEditor from "@/components/FroalaEditor/";
import Breadcrumb from "@/components/Breadcrumb/";
import { get_common_column, update_common_column } from "@/api/common_column";
export default {
  name: "TermsOfCustomer",
  components: {
    FroalaEditor,
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
          title: "會員責任規範條款",
          link: "",
        },
      ],
      privacy_content: null,
    };
  },
  methods: {
    async UpdateData() {
      update_common_column(this.privacy_content).then(() => {
        this.GetPageData();
      });
    },
    async GetPageData() {
      get_common_column(["TermsOfCustomer"]).then((res) => {
        this.privacy_content = res.TermsOfCustomer;
      });
    },
    CancelEdit() {
      this.GetPageData();
    },
  },
  created() {
    this.GetPageData();
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