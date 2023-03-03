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
      menuById:[],
  },
  getters: {
      getMenus: (state) => state.menus,
      getMenuById: (state) => state.menuById,
  },
  mutations: {
    async fetch(state, { res }){
        state.menus = (await res).data
    },
    async setNewMenu(state, { res }){
      state.newMenuCreated = (await res)
    },
    async fetchMenuById(state , { res }){
      state.menuById = (await res).data.data
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
            console.log("payload = ", payload)

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
    },
    async fetchMenuById({ commit } , id){
      let header = AuthService.getApiHeader();
      let res = await backendInstance.get(`/api/menu/${id}` , header);
      commit("fetchMenuById" , { res });
      // console.log("menu by id = " , res.data.data)

    },
    async editMenu({ commit }, payload ){
      console.log("payload = ", payload)
      let id = payload.menu_id
      let header = AuthService.getApiHeader();
      let res = await backendInstance.put(`/api/menu/${id}` , payload ,header);
      console.log("edit = ", res)
    }
  },
  modules: {
  }
})
