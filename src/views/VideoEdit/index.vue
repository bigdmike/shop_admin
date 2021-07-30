<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import DeleteDialog from "@/components/Videos/DeleteDialog/index"
export default {
  name: "VideoEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    DeleteDialog
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有影片",
          link: "/videos"
        },
        {
          title: "影片編輯",
          link: ""
        }
      ],
      status_data: [
        {
          label: "已發布",
          value: "Y"
        },
        {
          label: "隱藏",
          value: "N"
        },
      ],
      video_data: null,
      category_data: [],
      delete_array: {
        options: [],
        option_types: [],
        images: []
      },
      drag: false
    }
  },
  methods: {
    async UpdateData() {

      //檢查images options category name
      let error = ""
      if (this.video_data.title == "") {
        error += "- 請輸入影片標題 <br>"
      }
      if (this.video_data.cover == "") {
        error += "- 請至上傳一張封面圖片 <br>"
      }
      if (this.video_data.video == "") {
        error += "- 請填寫影片連結 <br>"
      }
      if (error == "") {
        this.UpdateVideo()
      }
      else {
        error = "無法儲存影片請修正以下問題：<br>" + error
        this.$store.commit("SetDialog", { title: "發生錯誤", content: error, status: true })
      }
    },
    CancelEdit() {
      console.log("close")
      this.$router.push("/products")
    },
    async GetVideoData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "videos/get_video.php", qs.stringify({ id: this.$route.params.id }))
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.video_data = JSON.parse(result.data)
        if (this.video_data.length <= 0) {
          this.$router.push("/videos")
        }
      }
    },
    OpenDeleteDialog() {
      this.$refs.DeleteDialog.Open(this.$route.params.id)
    },
    OpenUploadImage() {
      this.$refs.ImageUpload.click()
    },
    async UpdateCoverImage(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/upload_product_image.php", formData)
        if (result != "error") {
          this.$refs.ImageUpload.value = ""
          console.log(JSON.parse(result.data).link)
          this.video_data.cover = JSON.parse(result.data).link
        }
      }
    },

    async UpdateVideo() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "videos/update_video.php", qs.stringify({
        video_data: this.video_data
      }
      ))
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "影片已更新",
          status: true
        })
        this.GetVideoData()
      }
    }
  },
  created() {
    this.GetVideoData()
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