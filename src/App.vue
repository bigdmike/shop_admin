<template>
  <v-app id="yongxin_admin" style="z-index:1">
    <MainSnackbar />
    <MainLoading />
    <MainDialog />
    <v-navigation-drawer
      style="z-index:99"
      class="elevation-1"
      v-model="drawer"
      v-if="$route.name != 'Login'"
      app
    >
      <MainMenu />
    </v-navigation-drawer>

    <v-main class="blue-grey lighten-5 flex flex-column" style="z-index:10">
      <v-app-bar
        class="white elevation-2 pl-5"
        app
        v-if="$route.name != 'Login'"
        style="z-index: 120"
      >
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <AccountMenu v-if="change_header == 'account'" />
        <EditButtonGroup
          v-on:CallCancelFunction="CallCancelFunction"
          v-on:CallUpdateFunction="CallUpdateFunction"
          :show="change_header == 'edit'"
        />
      </v-app-bar>
      <v-container class="pa-md-6 flex-grow-1">
        <router-view ref="RouterView" class=""></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
import MainMenu from '@/components/MainMenu/index';
import AccountMenu from '@/components/MainHeader/AccountMenu';
import EditButtonGroup from '@/components/MainHeader/EditButtonGroup';
import MainLoading from '@/components/MainLoading';
import MainDialog from '@/components/MainDialog';
import MainSnackbar from '@/components/MainSnackbar';
export default {
  name: 'App',
  components: {
    MainMenu,
    AccountMenu,
    EditButtonGroup,
    MainLoading,
    MainDialog,
    MainSnackbar,
  },
  data() {
    return {
      drawer: true,
      change_header: 'account',
    };
  },
  methods: {
    ChangeHeader() {
      let pages = [
        '首頁頁面管理',
        '關於頁面管理',
        '編輯商品',
        '影片編輯',
        '新增商品',
        '公司資訊管理',
        '隱私權政策管理',
        'SEO設定',
        '會員條款管理',
        '最新消息',
        'SEO編輯',
        '新增銷售頁',
        '編輯銷售頁',
        '頁面編輯',
      ];
      this.change_header =
        pages.filter((item) => item == this.$route.name).length > 0
          ? 'edit'
          : 'account';
    },
    CallCreateFunction() {
      this.$refs.RouterView.CreateData();
    },
    CallUpdateFunction() {
      this.$refs.RouterView.UpdateData();
    },
    CallCancelFunction() {
      this.$refs.RouterView.CancelEdit();
    },
  },
  created() {
    this.ChangeHeader();
    if (this.$cookie.get('account_token') == null) {
      this.$router.push('/login');
    }
    // await this.CheckToken()
  },
  watch: {
    $route() {
      this.ChangeHeader();
      if (
        this.$route.meta.promission == 'A' &&
        this.user_data.promission != 'A'
      ) {
        this.$router.push('/');
      }
    },
  },
  computed: {
    user_data() {
      if (this.$cookie.get('account_data')) {
        return JSON.parse(this.$cookie.get('account_data'));
      } else {
        return { name: '', admin_id: -1 };
      }
    },
  },
};
</script>
<style lang="scss" src="@/assets/variables.scss"></style>

<style>
a {
  text-decoration: none;
}
.v-navigation-drawer__border {
  background-color: transparent !important;
}
</style>
