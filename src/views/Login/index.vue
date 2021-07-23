<template src="./template.html"></template>

<script>
export default {
  name: "Login",

  data() {
    return {
      account: "",
      password: "",
      error_msg: "帳號不存在請重新登入"
    }
  },
  methods: {
    Login() {
      if (this.account != "" && this.password != "") {
        //
      }
      else {
        this.error_msg = "請正確輸入帳號與密碼"
      }
    }
  },
  created() { }
}
</script>