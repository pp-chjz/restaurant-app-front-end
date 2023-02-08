import Vue from "vue";
import Vuex from "vuex";

import AuthService from "../services/AuthService";
import backendInstance, { auth } from "../services/backendInstance";

Vue.use(Vuex);

const initialState = {
  user: auth ? auth.user : "",
  jwt: auth ? auth.jwt : "",
  isAuthen: auth ? true : false,
  isActivate: auth ? true : false,
};

export default new Vuex.Store({
  state: initialState,

  getters: {
    user: (state) => state.user,
    jwt: (state) => state.jwt,
    isAuthen: (state) => state.isAuthen,
  },

  mutations: {
    loginSuccess(state, { user, jwt }) {
      state.isAuthen = true;
      state.user = user;
      state.jwt = jwt;
      console.log("loginsuccess ", jwt);
      state.isAdmin = state.user.role === "ADMIN";
    },
    logoutSuccess(state) {
      state.user = "";
      state.jwt = "";
      state.isAuthen = false;
      state.isAdmin = false;
    },
    registerSuccess(state, user) {
      state.user = user;
    },
    setUser(state, data) {
      state.user = data;
    }
  },
  actions: {
    async getApiHeader() {
        return {
          headers: {
            Authorization: `Bearer ${this.jwt}`,
          }
      }
    },
    async register({ commit }, body) {
      let res = await AuthService.register(body);
      console.log("res = " , res);
      commit("registerSuccess", res.user);

      console.log("register med", this.state.user);
      return res;
    },
    async login({ commit }, { email, password }) {
        let res = await AuthService.login({ email, password });
  
        if (res.success) {
          let body = {
            user: res.user,
            jwt: res.jwt,
          };
          commit("loginSuccess", body); // type true=admin false=user
        }
        return res;
      },
  },
});
