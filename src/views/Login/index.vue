<template src="./template.html"></template>

<script>
import qs from "qs"
export default {
  name: "Login",

  data() {
    return {
      account: "piggy5272",
      password: "piggy01478963",
      error_msg: ""
    }
  },
  methods: {
    async Login() {
      if (this.account != "" && this.password != "") {
        let result = await this.SendPostData(process.env.VUE_APP_BASE_API + "admin/login.php", qs.stringify({ account: this.account, password: this.password }))
        if (result != "error") {
          let data = JSON.parse(result.data)
          console.log(data)
          this.$cookie.set("account_token", data.token)
          this.$cookie.set("account_data", JSON.stringify({
            admin_id: data.admin_id,
            name: data.name,
            account: data.account
          }))
          this.$router.push("/")
        }
      }
      else {
        this.error_msg = "請正確輸入帳號與密碼"
      }
    }
  },
  created() { }
}
</script>