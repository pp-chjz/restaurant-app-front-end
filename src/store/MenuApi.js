import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'

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
        let res = await backendInstance.get(`/api/menu`);
        commit("fetch", {res} );
    }
  },
  modules: {
  }
})
