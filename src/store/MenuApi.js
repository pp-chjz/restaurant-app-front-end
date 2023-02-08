import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      menus:[],
      newMenuCreated:[],
  },
  getters: {
      getMenus: (state) => state.menus,
  },
  mutations: {
      async fetch(state, { res }){
          state.menus = (await res).data
      },
      async setNewMenu(state, { res }){
        state.newMenuCreated = (await res)
    },
  },
  actions: {
    async fetchMenu({ commit }) {
        console.log("fetchMenu")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/menu` , header);
        commit("fetch", {res} );
    },
    async createMenu({ commit } , payload){
        try {
            let header = AuthService.getApiHeader();
            console.log("header = ", header)
            let res = await backendInstance.post(`/api/menu`, payload , header);
            console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewMenu', res.data)
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
