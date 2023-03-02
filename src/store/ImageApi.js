import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      image:[],
      newImageCreated:[],
  },
  getters: {
      getimage: (state) => state.image,
      getNewImageCreated: (state) => state.newImageCreated,

  },
  mutations: {
      async fetch(state, { res }){
          state.image = (await res).data
      },
      async setNewImage(state, { res }){
        state.newImageCreated = (await res)
      },
  },
  actions: {
    async fetchImage({ commit }) {
        console.log("fetchImage")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/image` , header);
        console.log("fetchImage" , res.data)
        commit("fetch", {res} );
    },
    async createImage({ commit } , payload){
        try {
            let header = AuthService.getApiHeader();
            console.log("header = ", payload)
            let res = await backendInstance.post(`/api/image`, payload , header);
            console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewImage', res.data)
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
