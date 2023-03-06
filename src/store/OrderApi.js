import Vue from 'vue'
import Vuex from 'vuex'
import backendInstance from '../services/backendInstance'
import AuthService from '../services/AuthService'
import AuthUser from '@/store/AuthUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      newOrderCreated:[],
      orders:[],
      ordersUnpaid:[],


  },
  getters: {
      getNewOrder: (state) => state.newOrderCreated,
      getOrders: (state) => state.orders,
      getUnpaidOrders: (state) => state.ordersUnpaid,


  },
  mutations: {
    async fetch(state, { res }){
      state.orders = (await res).data
    },
    async setNewOrder(state, { res }){
      state.newOrderCreated = (await res)
    },
    async setUnpaidOrder(state, { res }){
      state.ordersUnpaid = (await res)
    },
  },
  actions: {
    async updateFoodStatus({ commit } , payload) {
      console.log("updateFoodStatus")
      let order_id = payload.order_id
      let header = AuthService.getApiHeader();
      console.log("header = " , header)
      let res = await backendInstance.put(`/api/orders/${order_id}/update-menu-status` , payload , header);
      console.log("updateFoodStatus", res)
  },
  async updateOrderStatus({ commit } , payload) {
    console.log("updateOrderStatus")
    let order_id = payload.order_id
    let header = AuthService.getApiHeader();
    console.log("header = " , header)
    let res = await backendInstance.put(`/api/orders/${order_id}/update-order-status` , payload , header);
    console.log("updateOrderStatus", res)
},
      async fetchOrder({ commit }) {
        console.log("fetchOrder")
        let header = AuthService.getApiHeader();
        console.log("header = " , header)
        let res = await backendInstance.get(`/api/order` , header);
        console.log("fetchOrder" , res.data)
        commit("fetch", {res} );
    },
    async fetchUnpaidOrder({ commit } , payload) {
      console.log("fetchUnpaidOrder")
      let header = AuthService.getApiHeader();
      console.log("header = " , header)
      let res = await backendInstance.post(`/api/get-order-unpaid` , payload , header);
      console.log("fetchUnpaidOrder" , res.data)
      commit("setUnpaidOrder", {res} );
  },
    async createOrder({ commit } , payload){
        try {
            let header = AuthService.getApiHeader();
            // console.log("header = ", header)
            let res = await backendInstance.post(`/api/order`, payload , header);
            // console.log("res = ", res)
            if (res.status === 201) {
              commit('setNewOrder', res.data)

              let table_id = JSON.parse(localStorage.getItem("table_number"));
              console.log("table_id = " , table_id)
              let payload = {
                order_id: res.data.id
              }
              let res_table = await backendInstance.put(`/api/food-table/${table_id}`, payload , header);
              console.log("res_table.data =" , res_table.data)



              console.log(res.data)
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
  },
  modules: {
  }
})
