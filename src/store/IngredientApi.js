import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      ingredients:[],
      newIngredientCreated:[],
  },
  getters: {
      getIngredients: (state) => state.ingredients,
  },
  mutations: {
      async fetch(state, { res }){
          state.ingredients = (await res).data
      },
      async setNewIngredient(state, { res }){
        state.newIngredientCreated = (await res)
    },
  },
  actions: {
    async fetchIngredient({ commit }) {
        console.log("fetchIngredient")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/ingredient` , header);
        commit("fetch", {res} );
    },
    async createIngredient({ commit } , payload){
        try {
            let header = AuthService.getApiHeader();
            console.log("header = ", header)
            let res = await backendInstance.post(`/api/ingredient`, payload , header);
            console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewIngredient', res.data)
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
