<template src="./template.html"></template>
<script>
import qs from "qs"
export default {
  name: "CategoryCreateDialog",
  data() {
    return {
      dialog: false,
      name: "",
      status: "1",
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
    Open() {
      this.dialog = true
      this.status = "1"
      this.name = ""
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
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "products/create_category.php", qs.stringify({ post_data: { name: this.name, status: this.status } }))
      if (result.status != "error") {
        this.$emit("load-data")
        this.$store.commit("SetSnackbar", {
          content: "商品分類已新增",
          status: true
        })
        this.Cancel()
      }
    },
    Cancel() {
      this.dialog = false
      this.status = "1"
      this.name = ""
    }
  }
}
</script>