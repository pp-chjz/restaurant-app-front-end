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
  },
  getters: {
      getTables: (state) => state.tables,
  },
  mutations: {
      async fetch(state, { res }){
          state.tables = (await res).data
      },
      async setNewTable(state, { res }){
        state.newTableCreated = (await res)
    },
  },
  actions: {
    async fetchTable({ commit }) {
        console.log("fetchTable")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/food-table` , header);
        console.log("fetchTable" , res.data)
        commit("fetch", {res} );
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
