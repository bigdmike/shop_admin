<template src="./template.html"></template>

<script>
export default {
  name: "MainDialog",
  data() {
    return {}
  },
  methods: {
    Close() {
      this.$store.commit("SetDialog", {
        title: "",
        content: "",
        status: false
      })
    }
  }
}
</script>