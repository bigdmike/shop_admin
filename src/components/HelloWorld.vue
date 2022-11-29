<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="30"
        />
      </v-col>

      <v-col class="mb-4">
        <p class="body-2 font-weight-regular">
          請點選左邊選單進行操作,若您遇到任何問題請先聯絡系統管理員
          <br />需要技術障礙排除或網站功能出錯
          <a href="https://www.yongxin-design.com/Contact" target="_blank"
            >請聯絡我們</a
          >
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
};
</script>
