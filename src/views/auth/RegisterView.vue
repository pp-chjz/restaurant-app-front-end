<template>
  <div>
    <div class="register">
      <h1>This is an register page</h1>
      <p>Email</p>
      <input v-model="message" placeholder="Email" /> 
      <p>Username</p>
      <input v-model="message" placeholder="Username" />
      <p>Password</p>
      <input v-model="message" placeholder="Password" />
      
    </div> <br>
    <c-button variant-color="blue" variant="outline" size="sm" @click="summit">
        summit
    </c-button>
  </div>
</template>

<script>
import MenuApi from "@/store/MenuApi.js"
import { CButton } from "@chakra-ui/vue"

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    CButton,
  },
  data(){
    return{
      message:"",
      menu: "",
      menus:{},
    }
  },
  async created(){
    console.log("test")
    await MenuApi.dispatch("fetchMenu")
      this.menus = MenuApi.getters.getMenus
      console.log(this.menus)
    await this.fetchMenu()
  },
  methods:{
    async fetchMenu(){
      console.log("fetchMenu.")
      await MenuApi.dispatch("fetchMenu")
      this.menus = MenuApi.getters.getMenus
      console.log(this.menus)
    },
    summit(){
      console.log("summit")
    }
  }
}
</script>