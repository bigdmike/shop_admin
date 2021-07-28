<template src="./template.html"></template>
<script>
import qs from "qs"
export default {
  name: "CategoryEditDialog",
  data() {
    return {
      dialog: false,
      name: "",
      status: "1",
      id: -1,
      status_array: [
        {
          label: "已啟用",
          value: '1'
        },
        {
          label: "已停用",
          value: '0'
        }
      ],
      Require: [
        v => !!v || '選項內容請勿空白'
      ],
      valid: false
    }
  },
  methods: {
    Open(item) {
      this.dialog = true
      this.status = item.status
      this.id = item.category_id
      this.name = item.name
    },
    UpdateCategory() {
      this.$refs.form.validate()
      setTimeout(() => {
        if (this.valid) {
          this.SendUpdateData()
        }
      }, 100);
    },
    async SendUpdateData() {
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/update_category.php", qs.stringify({ post_data: { name: this.name, status: this.status, category_id: this.id } }))
      if (result.status != "error") {
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", {
          content: "商品分類已更新",
          status: true
        })
        this.Cancel()
      }
    },
    Cancel() {
      this.dialog = false
      this.status = "1"
      this.name = ""
      this.id = -1
    }
  }
}
</script>