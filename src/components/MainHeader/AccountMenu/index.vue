<template src="./template.html"></template>

<script>
export default {
  name: "MainHeaderAccountMenu",
  data() {
    return {
      open: false,
      menu: [
        {
          title: "帳單資訊",
          link: "/settings/billing",
          icon: "mdi-credit-card-multiple"
        },
        {
          title: "個人資料",
          link: "/settings/profile",
          icon: "mdi-account-circle-outline"
        },
        {
          title: "登出",
          link: "/logout",
          icon: "mdi-logout"
        }
      ]
    }
  },
  methods: {
    IfPopUp(val) {
      this.open = val
    }
  },
  computed: {
    arrow_icon() {
      return this.open ? "mdi-chevron-up" : "mdi-chevron-down"
    }
  }
}
</script>

<style>
#MainHeaderAccountMenuBtn {
  cursor: pointer;
}
</style>