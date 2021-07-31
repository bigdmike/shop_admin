<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
export default {
  name: "CompanyInfo",
  components: {
    Breadcrumb
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "頁面編輯",
          link: ""
        },
        {
          title: "公司資訊",
          link: ""
        }
      ],
      page_data: [],
    }
  },
  methods: {
    async UpdateData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/update_common_column.php", qs.stringify({ column_array: this.page_data }))
      if (result != "error") {
        this.$store.commit("SetSnackbar", {
          content: "資料已更新",
          status: true
        })
        this.GetPageData()
      }
    },
    CancelEdit() {
      this.GetPageData()
    },
    async GetPageData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/get_common_column.php", qs.stringify({ column_array: ["company_name", "company_address", "company_phone", "company_email", "company_time", "company_create_date"] }))
      if (result != "error") {
        this.page_data = JSON.parse(result.data)
      }
    },
    GetFormData(key) {
      return this.page_data.filter(item => item.column_name == key)[0]
    }
  },
  created() {
    this.GetPageData()
  }
}
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