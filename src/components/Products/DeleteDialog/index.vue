<template src="./template.html"></template>

<script>
import qs from "qs"
export default {
  name: "DeleteProductDialog",
  data() {
    return {
      id: -1,
      dialog: false
    }
  },
  methods: {
    Open(id) {
      this.id = id
      this.dialog = true
    },
    Cancel() {
      this.id = -1
      this.dialog = false
    },
    async DeleteProduct() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/delete_product.php", qs.stringify({ product_id: this.id }))
      if (result.status != "error") {
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", {
          content: "商品已刪除",
          status: true
        })
        this.Cancel()
      }
    }
  }
}
</script>