import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      ingredients:[],
      newIngredientCreated:[],
      ingredientStatus:[],
  },
  getters: {
      getIngredients: (state) => state.ingredients,
      getIngredientsStatus: (state) => state.ingredientStatus,

  },
  mutations: {
      async fetch(state, { res }){
          state.ingredients = (await res).data
      },
      async setNewIngredient(state, { res }){
        state.newIngredientCreated = (await res)
    },
    async setIngredientsStatus(state, { res }){
      state.ingredientStatus = (await res)
   },
  },
  actions: {
    async fetchIngredient({ commit }) {
        console.log("fetchIngredient")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/ingredient` , header);
        console.log("fetchIngredient" , res.data)
        commit("fetch", {res} );
    },
    async updateIngredientStatus({ commit } , payload) {
      console.log("updateIngredientStatus" , payload)
      let header = AuthService.getApiHeader();
      console.log("header = " , header)
      let res = await backendInstance.post(`/api/ingredients/${payload.id}/update-ingredient-status` , payload , header);
      console.log("updateIngredientStatus" , res.data)
      commit("setIngredientsStatus", res.data );

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
