<template>
  <v-app id="inspire">
    <MainSnackbar />
    <MainLoading />
    <MainDialog />
    <v-navigation-drawer
      class="grey lighten-3 border-none"
      v-model="drawer"
      v-if="$route.name != 'Login'"
      app
    >
      <MainMenu />
    </v-navigation-drawer>

    <v-app-bar
      app
      class="elevation-0 grey lighten-3"
      v-if="$route.name != 'Login'"
      style="z-index: 99"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <AccountMenu v-if="change_header == 'account'" />
      <EditButtonGroup
        v-on:CallCancelFunction="CallCancelFunction"
        v-on:CallUpdateFunction="CallUpdateFunction"
        :show="change_header == 'edit'"
      />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view ref="RouterView" class="lg-pa-10"></router-view>
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
        'HomePageEdit',
        'ProductEdit',
        'ProductCreate',
        'About',
        'CompanyInfo',
        'PrivacyPage',
        'SeoSetting',
        'TermsOfCustomer',
        'NewsCover',
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
    console.log(this.$cookie.get('account_token'));
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

<style>
a {
  text-decoration: none;
}
.v-navigation-drawer__border {
  background-color: transparent !important;
}
</style>
