import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      menus:[],
  },
  getters: {
      getMenus: (state) => state.menus,
  },
  mutations: {
      async fetch(state, { res }){
          state.menus = (await res).data
      }
  },
  actions: {
    async fetchMenu({ commit }) {
        console.log("fetchMenu")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/menu` , header);
        commit("fetch", {res} );
    }
  },
  modules: {
  }
})
