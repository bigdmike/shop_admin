import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: 0,
    dialog: {
      title: "發生錯誤",
      content: "帳號不存在，請重新輸入",
      status: false
    },
    snackbar: {
      content: "",
      status: false
    }
  },
  mutations: {
    SetPageLoading(state, action) {
      state.loading += action
    },
    SetDialog(state, {
      title,
      content,
      status
    }) {
      state.dialog.title = title
      state.dialog.content = content
      state.dialog.status = status
    },
    SetSnackbar(state, {
      content,
      status
    }) {
      state.snackbar.content = content
      state.snackbar.status = status
    }
  },
  actions: {},
  modules: {}
})