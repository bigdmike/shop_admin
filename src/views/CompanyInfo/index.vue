<template src="./template.html"></template>

<script>
import { get_common_column, update_common_column } from "@/api/common_column";
import Breadcrumb from "@/components/Breadcrumb/";
export default {
  name: "CompanyInfo",
  components: {
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
          title: "公司資訊",
          link: "",
        },
      ],
      page_data: null,
    };
  },
  methods: {
    async UpdateData(index = 0) {
      let key = Object.keys(this.page_data)[index];
      update_common_column(this.page_data[key]).then(() => {
        if (index != Object.keys(this.page_data).length - 1) {
          this.UpdateData(index + 1);
        } else {
          this.GetPageData();
        }
      });
    },
    CancelEdit() {
      this.GetPageData();
    },
    async GetPageData() {
      get_common_column([
        "CompanyAddress",
        "CompanyEmail",
        "CompanyFBLink",
        "CompanyIGLink",
        "CompanyLineLink",
        "CompanyPhone",
        "CompanyTime",
      ]).then((res) => {
        this.page_data = res;
      });
    },
    GetFormData(key) {
      return this.page_data.filter((item) => item.column_name == key)[0];
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