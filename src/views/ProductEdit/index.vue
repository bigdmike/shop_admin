<template src="./template.html"></template>

<script>
import qs from "qs"
import Breadcrumb from "@/components/Breadcrumb/"
import FroalaEditor from "@/components/FroalaEditor/"
import ImageShow from "@/components/ProductEdit/ImageShow/"
export default {
  name: "ProductEdit",
  components: {
    Breadcrumb,
    FroalaEditor,
    ImageShow,
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
      image: [
        {
          img: 'https://images.unsplash.com/photo-1429514513361-8fa32282fd5f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3264&q=80',
          name: "1"
        },
        {
          img: 'https://images.unsplash.com/photo-1498038432885-c6f3f1b912ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80',
          name: "2"
        },
        {
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
          name: "3"
        },
        {
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
          name: "4"
        },
        {
          img: 'https://images.unsplash.com/photo-1542320868-f4d80389e1c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3750&q=80',
          name: "5"
        },
      ],
      product_data: null,
      drag: false
    }
  },
  methods: {
    UpdateData() {
      console.log("update!!")
    },
    CancelEdit() {
      console.log("close")
    },
    async GetProductData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/get_product.php", qs.stringify({ id: this.$route.params.id }))
      if (result != "error") {
        console.log(JSON.parse(result.data))
        this.product_data = JSON.parse(result.data)
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