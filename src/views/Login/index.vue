<template src="./template.html"></template>

<script>
import { login } from '@/api/login.js';
export default {
  name: 'Login',

  data() {
    return {
      account: '',
      password: '',
      error_msg: '',
    };
  },
  methods: {
    async SendLoginData() {
      if (this.account != '' && this.password != '') {
        login(this.account, this.password).then((res) => {
          if (res.code != 200) {
            this.$store.commit('SetDialog', {
              title: '發生錯誤',
              content: res.msg,
              status: true,
            });
          } else {
            this.$cookie.set('account_token', res.data.Token);
            this.$router.push('/');
          }
        });
      } else {
        this.error_msg = '請正確輸入帳號與密碼';
      }
    },
  },
  created() {},
};
</script>
