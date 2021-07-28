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
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/delete_home_carousel.php", qs.stringify({ id: this.id }))
      if (result.status != "error") {
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", {
          content: "圖片已刪除",
          status: true
        })
        this.Cancel()
      }
    }
  }
}
</script>