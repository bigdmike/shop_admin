<template src="./template.html"></template>

<script>
export default {
  name: "ImageInfoDialog",
  data() {
    return {
      dialog: false,
      title: "",
      alt: "",
      index: -1
    }
  },
  methods: {
    Open({ title, alt, index }) {
      this.dialog = true
      this.title = title
      this.alt = alt
      this.index = index
    },
    UpdateInfo() {
      this.$emit("update-info", { title: this.title, alt: this.alt, index: this.index })
      this.Cancel()
    },
    Cancel() {
      this.dialog = false
      this.title = ""
      this.alt = ""
      this.index = -1
    }
  }
}
</script>