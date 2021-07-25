<template src="./template.html"></template>

<script>
import qs from "qs"
export default {
  name: "OrderCommentDialog",
  data() {
    return {
      dialog: false,
      comment: ""
    }
  },
  methods: {
    Open(val) {
      this.dialog = true
      this.comment = val
    },
    Close() {
      this.dialog = false
      this.comment = ""
    },
    async UpdateData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "orders/update_order_comment.php", qs.stringify({ order_id: this.$route.params.id, comment: this.comment }))
      if (result != "error") {
        this.Close()
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", { content: "商店備註已更新", status: true })
      }
    }
  }
}
</script>