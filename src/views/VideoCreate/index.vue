<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
export default {
  name: "VideoEdit",
  components: {
    Breadcrumb,
    FroalaEditor
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有影片",
          link: "/videos"
        },
        {
          title: "影片新增",
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
      video_data: {
        video_id: 0,
        cover: "",
        title: "",
        description: "",
        status: "Y"
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
        this.CreateVideo()
      }
      else {
        error = "無法儲存影片請修正以下問題：<br>" + error
        this.$store.commit("SetDialog", { title: "發生錯誤", content: error, status: true })
      }
    },
    CancelEdit() {
      this.$router.push("/videos")
    },
    GetVideoData() {
      this.video_data = {
        video_id: 0,
        cover: "",
        title: "",
        description: "",
        status: "Y"
      }
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
          this.video_data.cover = JSON.parse(result.data).link
        }
      }
    },
    async CreateVideo() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "videos/create_video.php", qs.stringify({
        video_data: this.video_data
      }
      ))
      if (result.status == "success") {
        this.$store.commit("SetSnackbar", {
          content: "影片已建立",
          status: true
        })
        this.$router.push("/videos")
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