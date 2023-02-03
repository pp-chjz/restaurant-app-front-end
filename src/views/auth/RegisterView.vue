<template>
  <div>
    <div class="register">
      <h1>This is an register page</h1>
      <p>Email</p>
      <input v-model="form.email" placeholder="Email" /> 
      <p>username</p>
      <input v-model="form.username" placeholder="username" />
      <p>Password</p>
      <input v-model="form.password" placeholder="Password" />
      <p>Confirm Password</p>
      <input v-model="form.password_confirmation" placeholder="Password" />
      <p>commit tmp</p>
    </div> <br>
    <c-button variant-color="blue" variant="outline" size="sm" @click="summit">
        summit
    </c-button>
  </div>
</template>

<script>
import MenuApi from "@/store/MenuApi.js"
import AuthUser from '@/store/AuthUser.js'
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
      iEmail:"",
      iUsername:"",
      iPassword:"",
      form:{
        email: '',
        username: '',
        password: '',
        password_confirmation: '',
      }
    }
  },
  async created(){
    console.log("RegisterViewCreated")
    // await this.fetchMenu()
  },
  methods:{
    async fetchMenu(){
      console.log("fetchMenu.")
      await MenuApi.dispatch("fetchMenu")
      this.menus = MenuApi.getters.getMenus
      console.log(this.menus)
    },
    async summit(){
      console.log(this.form)
      let res = await AuthUser.dispatch('register',this.form)
    }
  }
}
</script>