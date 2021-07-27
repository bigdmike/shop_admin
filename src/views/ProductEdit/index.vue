<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import ImageCard from "@/components/ProductEdit/ImageCard/"
import OptionCard from "@/components/ProductEdit/OptionCard/"
import OptionCombineCard from "@/components/ProductEdit/OptionCombineCard/"
export default {
  name: "ProductEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    ImageCard,
    OptionCard,
    OptionCombineCard
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "所有商品",
          link: "/products"
        },
        {
          title: "商品編輯",
          link: ""
        }
      ],
      status_data: [
        {
          label: "已發布",
          value: "Y"
        },
        {
          label: "尚未開賣",
          value: "W"
        },
        {
          label: "隱藏",
          value: "N"
        },
      ],
      product_data: null,
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
      let tmp_product = JSON.parse(JSON.stringify(this.product_data))
      tmp_product.option_combine.forEach(item => {
        item.status = item.status == true ? "Y" : "N"
      })
      let data = {
        product_data: tmp_product,
        delete_array: this.delete_array
      }
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/update_product.php", qs.stringify({
        post_data: data
      }))
      if (result != "error") {
        console.log(JSON.parse(result.data))
      }
    },
    CancelEdit() {
      console.log("close")
    },
    async GetProductData() {
      let result = await this.SendGetData(process.env.VUE_APP_BASE_API + "products/get_product_list.php")
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.product_data = JSON.parse(result.data).products.filter(item => item.product_id == this.$route.params.id)[0]
        this.category_data = JSON.parse(result.data).category
      }
    },
    OpenUploadImage() {
      this.$refs.ImageUpload.click()
    },
    async ChangeImageFile(files) {
      console.log(files)
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/create_product_image.php", formData)
        if (result != "error") {
          console.log(JSON.parse(result.data).link)
          this.product_data.images.push(
            {
              image_id: 0,
              url: JSON.parse(result.data).link,
              title: "",
              alt: "",
              position: this.product_data.images.length - 1
            }
          )
        }
      }
    },
    UpdateDeleteOptions(array) {
      this.delete_array["options"] = this.delete_array["options"].concat(array)
    },
    UpdateDeleteOptionTypes(array) {
      this.delete_array["option_types"] = this.delete_array["option_types"].concat(array)
    },
    UpdateDeleteImages(array) {
      this.delete_array["images"] = this.delete_array["images"].concat(array)
    },
    UpdateOptionCombine(array) {
      this.product_data.option_combine = array
    },
    async UpdateCoverImage(files) {
      if (files.length > 0) {
        let formData = new FormData();
        formData.append("file", files[0]);
        let result = await this.SendFormData(process.env.VUE_APP_BASE_API + "products/create_product_image.php", formData)
        if (result != "error") {
          console.log(JSON.parse(result.data).link)
          this.product_data.cover = JSON.parse(result.data).link
        }
      }
    }
  },
  computed: {},
  created() {
    this.GetProductData()
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