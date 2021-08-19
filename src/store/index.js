import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 标识用户是否登录，利用短路运算，若sessionStorage中有数据，则使用它，否则使用false
    isLogin: sessionStorage.getItem("isLogin") || false,
    userId: sessionStorage.getItem("userId") || 0,
    username: sessionStorage.getItem("username") || ""
  },
  mutations: {
    login_mutation(state, payload) {
      state.isLogin = true;
      state.userId = payload.id;
      state.username = payload.username;
    }
  },
  actions: {
  },
  modules: {
  }
})
