<template src="./template.html"></template>
<script>
import qs from "qs"
export default {
  name: "GTMEditDialog",
  data() {
    return {
      dialog: false,
      code: null,
      Require: [
        v => !!v || '選項內容請勿空白'
      ],
      valid: false
    }
  },
  methods: {
    async Open() {
      this.dialog = true
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/get_common_column.php", qs.stringify({ column_array: ["google_tag_manager"] }))
      if (result != "error") {
        this.code = JSON.parse(result.data)[0]
      }
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
      let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "web_edit/update_common_column.php", qs.stringify({ column_array: [this.code] }))
      if (result != "error") {
        this.$store.commit("SetSnackbar", {
          content: "資料已更新",
          status: true
        })
        this.Cancel()
      }
    },
    Cancel() {
      this.dialog = false
      this.code = null
    }
  }
}
</script>