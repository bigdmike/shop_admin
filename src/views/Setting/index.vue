<template src="./template.html"></template>

<script>
import Breadcrumb from "@/components/Breadcrumb/"
import GTMEditDialog from "@/components/Setting/EditDialog/"
export default {
  name: "Setting",
  components: {
    Breadcrumb,
    GTMEditDialog
  },
  data() {
    return {
      breadcrumb_data: [
        {
          title: "網站設定",
          link: ""
        }
      ],
    }
  },
  methods: {
    OpenGTMEditDialog() {
      this.$refs.GTMEditDialog.Open()
    }
  }
}
</script>

<style lang="scss">
.setting_card {
  transition: all 0.3s;
}
</style>