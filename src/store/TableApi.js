import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      totalTable:[],
  },
  getters: {
      getTotalTable: (state) => state.totalTable,
  },
  mutations: {
    async setNewTotalTable(state, { res }){
      state.totalTable = (await res)
    },
  },
  actions: {
    async fetchTotalTable({ commit }) {
      console.log("fetchTotalTable")
      let header = AuthService.getApiHeader();
      console.log("header = " , header)
      let res = await backendInstance.get(`/api/get-total-table` , header);
      commit("setNewTotalTable", {res} );
  },
  },
  modules: {
  }
})
