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
      searchedIngredients:[],

  },
  getters: {
      getIngredients: (state) => state.ingredients,
      getIngredientsStatus: (state) => state.ingredientStatus,
      getSearchIngredients: (state) => state.searchedIngredients,
      // removeIngredient(state, data) {
      //   state.ingredients = state.ingredients.map((ingredient) => ingredient.id != data.id);
      // },


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
   async setIngredientMenu(state, { res }){
    state.searchedIngredients = (await res)
  },
  },
  actions: {
    async fetchSearchIngredient({ commit } , payload) {
      console.log("fetchSearchIngredient payload = ",payload)
      let header = AuthService.getApiHeader();
      let res = await backendInstance.post(`/api/ingredients/get-ingredient-by-search` , payload ,header);
      console.log("fetchSearchIngredient" , res.data)
      commit("setIngredientMenu", {res} );
  },
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
    },
    async removeIngredient({ commit },  id ) {
      let header = AuthService.getApiHeader();
      console.log("removeIngredient =  id",id)

        let res = await backendInstance.delete(`/api/ingredient/${id}`,header);
        console.log("delete" , res)
        // commit("removeIngredient", res.data);
    },
  },
  modules: {
  }
})
