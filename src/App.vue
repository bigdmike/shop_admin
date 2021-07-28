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
import MainMenu from "@/components/MainMenu/index"
import AccountMenu from "@/components/MainHeader/AccountMenu"
import EditButtonGroup from "@/components/MainHeader/EditButtonGroup"
import MainLoading from "@/components/MainLoading"
import MainDialog from "@/components/MainDialog"
import MainSnackbar from "@/components/MainSnackbar"
export default {
  name: "App",
  components: {
    MainMenu,
    AccountMenu,
    EditButtonGroup,
    MainLoading,
    MainDialog,
    MainSnackbar
  },
  data() {
    return {
      drawer: true,
      change_header: "account"
    }
  },
  methods: {
    ChangeHeader() {
      console.log(this.$route.name)
      let pages = ["ProductEdit", "ProductCreate"]
      this.change_header = pages.filter(item => item == this.$route.name).length > 0 ? "edit" : "account"
    },
    CallCreateFunction() {
      this.$refs.RouterView.CreateData()
    },
    CallUpdateFunction() {
      this.$refs.RouterView.UpdateData()
    },
    CallCancelFunction() {
      this.$refs.RouterView.CancelEdit()
    },
  },
  async created() {
    await this.CheckToken()
    this.ChangeHeader()
  },
  watch: {
    "$route"() {
      this.ChangeHeader()
    }
  }
}
</script>

<style>
a {
  text-decoration: none;
}
.v-navigation-drawer__border {
  background-color: transparent !important;
}
</style>