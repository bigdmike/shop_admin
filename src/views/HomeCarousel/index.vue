<template src="./template.html"></template>

<script>
import qs from "qs"
import draggable from 'vuedraggable'
import ImageShow from "@/components/HomeCarousel/ImageShowDialog/"
import DeleteDialog from "@/components/HomeCarousel/DeleteDialog/"
import Breadcrumb from "@/components/Breadcrumb/"
export default {
  name: "HomeCarousel",
  components: {
    draggable,
    ImageShow,
    DeleteDialog,
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
          title: "首頁大圖輪播",
          link: ""
        }
      ],
      carousels: [],
      edit_item: null
    }
  },
  methods: {
    async GetCarouselData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "web_edit/get_home_carousel.php")
      if (result != "error") {
        this.carousels = JSON.parse(result.data)
        this.carousels.sort((a, b) => {
          return a.position - b.position
        })
        this.CheckSort()
      }
    },
    async CreateCarouselData(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "web_edit/create_home_carousel.php", formData)
        if (result != "error") {
          this.$refs.ImageUpload.value = ""
          this.GetCarouselData()
        }
      }
    },
    async UpdateCarouselData(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        formData.append("id", this.edit_item.carousel_id);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "web_edit/update_home_carousel.php", formData)
        if (result != "error") {
          this.edit_item = null
          this.$refs.ImageEditUpload.value = ""
          this.GetCarouselData()
        }
      }
    },
    async UpdateSort() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/update_home_carousel_position.php", qs.stringify({ post_data: this.carousels }))
      if (result != "error") {
        this.GetCarouselData()
      }
    },
    CheckSort() {
      let if_sort = true
      this.carousels.forEach((item, item_index) => {
        item.position == item_index + 1 ? "" : if_sort = false
      })
      if_sort == false ? this.UpdateSort() : ""
    },
    OpenImageShow(index) {
      this.$refs.ImageShow.Open(index)
    },
    OpenUpload() {
      this.$refs.ImageUpload.click()
    },
    OpenEdit(item) {
      this.edit_item = item
      this.$refs.ImageEditUpload.click()
    },
    OpenDelete(item) {
      this.$refs.DeleteDialog.Open(item.carousel_id)
    }
  },
  created() {
    this.GetCarouselData()
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