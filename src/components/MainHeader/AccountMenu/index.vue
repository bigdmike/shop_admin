<template src="./template.html"></template>

<script>
export default {
  name: "MainHeaderAccountMenu",
  data() {
    return {
      open: false,
      menu: [
        // {
        //   title: "帳單資訊",
        //   link: "/settings/billing",
        //   icon: "mdi-credit-card-multiple"
        // },
        // {
        //   title: "個人資料",
        //   link: "/settings/profile",
        //   icon: "mdi-account-circle-outline"
        // },
        {
          title: "登出",
          link: "",
          icon: "mdi-logout"
        }
      ]
    }
  },
  methods: {
    IfPopUp(val) {
      this.open = val
    },
    Logout() {
      this.RemoveToken()
      this.$router.push("/login")
    }
  },
  computed: {
    arrow_icon() {
      return this.open ? "mdi-chevron-up" : "mdi-chevron-down"
    },
    user_data() {
      if (this.$cookie.get("account_data")) {
        return JSON.parse(this.$cookie.get("account_data"))
      }
      else {
        return { name: "", admin_id: -1 }
      }
    }
  }
}
</script>

<style>
#MainHeaderAccountMenuBtn {
  cursor: pointer;
}
</style>