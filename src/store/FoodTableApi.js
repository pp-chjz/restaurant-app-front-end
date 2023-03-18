import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      tables:[],
      newTableCreated:[],
      tablesWithOrder:[],
      totalTable:[],

  },
  getters: {
      getTables: (state) => state.tables,
      getTablessWithOrder: (state) => state.tablesWithOrder,
      getTotalTable: (state) => state.totalTable,


  },
  mutations: {
      async fetch(state, { res }){
          state.tables = (await res).data
      },
      async setNewTable(state, { res }){
        state.newTableCreated = (await res)
      },
      async setTablesWithOrder(state, { res }){
        state.tablesWithOrder = (await res)
      },
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
    async fetchTable({ commit }) {
        console.log("fetchTable")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/food-table` , header);
        console.log("fetchTable" , res.data)
        commit("fetch", {res} );
    },
    async fetchTableWithOrder({ commit }) {
      console.log("fetchTableWithOrder")
      let header = AuthService.getApiHeader();
      console.log("header = " , header)
      let res = await backendInstance.get(`/api/get-table-have-order` , header);
      console.log("fetchTableWithOrder" , res.data)
      commit("setTablesWithOrder", {res} );
  },
    async createTable({ commit } , payload){
        try {
            let payload = {
                "tablenum_status":1,
                "checkbill_status":1,
                "tablenumber":"1",
                "order_id":1
            }
            let header = AuthService.getApiHeader();
            console.log("header = ", header)
            let res = await backendInstance.post(`/api/food-table`, payload , header);
            console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewTable', res.data)
              return {
                success: true,
              };
            }
          } catch (e) {
            //console.log(payload)
            return {
              success: false,
              message: "ตรวจสอบฟอร์มกรอกข้อมูลอีกครั้ง",
            };
          }
    }
  },
  modules: {
  }
})
