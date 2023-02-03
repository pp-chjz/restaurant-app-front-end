<template>
  <div>
    <div class="login">
      <h1>This is an login page</h1>
      <p>Email</p>
      <input v-model="form.email" placeholder="Email" /> 
      <p>Password</p>
      <input v-model="form.password" placeholder="Password" />
      
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
      form:{
        email: '',
        password: '',
      }
    }
  },
  async created(){
    console.log("LoginViewCreated")
  },
  methods:{
    async summit(){
      console.log(this.form)
      let res = await AuthUser.dispatch('login',this.form)

      if (res.success) {
            this.$router.push("/home");
        }
    }
  }
}
</script>