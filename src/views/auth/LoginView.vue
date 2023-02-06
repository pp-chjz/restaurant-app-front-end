<template>
    <!-- <div class="login">
      <h1>This is an login page</h1>
      <p>Email</p>
      <input v-model="form.email" placeholder="Email" /> 
      <p>Password</p>
      <input v-model="form.password" placeholder="Password" />
      
    </div> <br>
    <c-button variant-color="blue" variant="outline" size="sm" @click="summit">
        summit
    </c-button> -->
  <div>
    <c-grid template-columns="repeat(2, 1fr)">
      <c-box borderWidth="0.1rem" 
            px="4rem" 
            py="10px"
            width="full" 
            mt="1%"
            maxWidth="500vh"
            borderRadius="5px"
            boxShadow="lg"
            bg="#FFF9DA">
          <img class="image" src="@/assets/saen.png">
      </c-box>

      <c-box >
        <c-flex minHeight="89vh" justifyContent="center">
          <c-box 
            borderWidth="0.1rem" 
            px="4rem" 
            py="10px"
            width="full" 
            mt="1%"
            maxWidth="500vh"
            borderRadius="5px"
            boxShadow="lg"
            bg="#1E024C"
          >
          <c-heading
            class="head"
            as="h2"
            size="xl"
            mt="3rem"
            color="white"
            opacity="0.8"
            fontWeight="normal"
            lineHeight="1.5"
            white-space="pre-line"
          >
            {{ "Sign In with your account" }}
          </c-heading>
           <!-- Email -->
          <c-form-control>
            <c-form-label 
            color="white"
            mt="10%"
            mr="100%"
            fontWeight="normal"
            white-space="pre-line"> Email </c-form-label>
              <c-input
                    pr="4.5rem"
                    placeholder="Email"
                    v-model="form.email"
              />
          </c-form-control>
          <!-- Password -->
          <c-form-control>
            <c-form-label 
            color="white"
            mt="5%"
            mr="90%"
            fontWeight="normal"
            white-space="pre-line"> Password </c-form-label>
            <c-input-group size="md">
              <c-input
                pr="4.5rem"
              :type="show ? 'text' : 'password'"
                placeholder="Password"
                v-model="form.password"
              />
            <c-input-right-element width="4.5rem">
                  <c-button h="1.75rem" size="sm" @click="show = !show" mr="0.5rem">
                    <c-image src="/eye.svg" w="30px" />
                  </c-button>
            </c-input-right-element>
            </c-input-group>
          </c-form-control>

          <c-button @click="summit" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
            Sign In
          </c-button>
          
          <c-text size="md" mt="2rem" color="white">
            Don't have an account? 
            <router-link class="shadowLink" to="/register" >
              <c-text as="u" color="primary">Sign up</c-text>
            </router-link>
          </c-text>
          </c-box>
        </c-flex>
      </c-box>
    </c-grid>
  </div>
</template>

<script>
import MenuApi from "@/store/MenuApi.js"
import AuthUser from '@/store/AuthUser.js'
import { CButton } from "@chakra-ui/vue"
import { CFlex } from "@chakra-ui/vue"
import { CBox } from "@chakra-ui/vue"
import { CHeading } from '@chakra-ui/vue'
import { CInput } from '@chakra-ui/vue'
import { CInputGroup } from '@chakra-ui/vue'
import { CInputRightElement } from '@chakra-ui/vue'
import { CImage } from '@chakra-ui/vue'
import { CFormControl } from '@chakra-ui/vue'
import { CFormLabel, CGrid, CGridItem, CText } from '@chakra-ui/vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    CButton,
    CFlex,
    CHeading,
    CInput,
    CInputGroup,
    CInputRightElement,
    CImage,
    CBox,
    CFormControl,
    CFormLabel,
    CGrid,
    CGridItem,
    CText
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

<style>
.head {
  font-family: "Times New Roman", Times, serif;
}

.image {
  padding-top: 30%;
  margin: auto;
}
</style>