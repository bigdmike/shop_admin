<template src="./template.html"></template>

<script>
export default {
  name: "ImageUrlDialog",
  data() {
    return {
      dialog: false,
      url: "",
      error: false,
      error_messages: ""
    }
  },
  methods: {
    Open() {
      this.dialog = true
      this.url = ""
      this.error = false
      this.error_messages = ""
    },
    CreateImage() {
      if (this.url == "") {
        this.error = true
        this.error_messages = ["請輸入圖片網址"]
      }
      else {
        this.$emit("create-image", this.url)
        this.Cancel()
      }
    },
    Cancel() {
      this.dialog = false
      this.url = ""
      this.error = false
      this.error_messages = ""
    }
  }
}
</script>