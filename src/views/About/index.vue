<template src="./template.html"></template>

<script>
import qs from "qs"
import FroalaEditor from "@/components/FroalaEditor/"
import Breadcrumb from "@/components/Breadcrumb/"
export default {
  name: "About",
  components: {
    FroalaEditor,
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
          title: "關於我們",
          link: ""
        }
      ],
      page_data: [],
      edit_item: null
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
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/get_common_column.php", qs.stringify({ column_array: ["about"] }))
      if (result != "error") {
        this.page_data = JSON.parse(result.data)
      }
    },
    async UpdateCoverImage(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/upload_product_image.php", formData)
        if (result != "error") {
          this.edit_item.image = JSON.parse(result.data).link
        }
      }
    },
    OpenUploadImage(item) {
      this.edit_item = item
      this.$refs.ImageUpload.click()
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