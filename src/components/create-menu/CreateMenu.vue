<template>
  <div>
      <c-box 
        px="4rem" 
        py="10px"
        width="full" 
        maxWidth="500vh"
        bg="#252836"
      >
      
      <!-- Select Catagories -->
      <c-box 
        borderColor="gray.100"
        borderWidth="0.1rem"
        borderRadius="0.5rem"
        m="auto"
        p="1rem"
        bg="#D9D9D9"
      >

      <c-box 
        w="100%"
        height="10vh"
        borderColor="gray.100"
        borderWidth="0.1rem"
        borderRadius="0.5rem"
        bg="#EDF2F7"
      >
        <c-heading
        size="xl"
        textAlign="center"
        color="black"
        opacity="0.8"
        fontWeight="normal"
        lineHeight="1.5"
        mt="1%"
        white-space="pre-line"
        > {{ "Create Menu" }} </c-heading>
      </c-box>

        
      <c-flex >
      <c-form-control w="100%">
        
        <c-box w="20%" mt="4%" ml="30%">
          <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/150" ml="70%" />


          <!-- สำหรับรูป -->
          <!-- <div v-if="!imagePreview">
            <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/150" ml="70%" />
          </div>
          <div v-if="imagePreview">
            <img :src="imagePreview" >

          </div> -->

          <!-- <img :src="imageURL"> -->
          <!-- <input type="file" @change="handleImageSelected"> -->
          <!-- สำหรับรูป -->

          

          <c-button @click="imageUpload" w="49%" size="md" ml="70%">
            Add picture
          </c-button>
          <c-text mr="66%" mt="15%" fontWeight="normal">English Name </c-text>
          <c-input v-model="form.name_ENG" placeholder="ชื่อเมนูภาษาอังกฤษ" w="180%" borderColor="gray.800" mt="3%"/>
          <c-text mr="74%" mt="10%" fontWeight="normal">Thai Name</c-text>
          <c-input v-model="form.name_TH" placeholder="ชื่อเมนูภาษาไทย" mt="3%" w="180%" borderColor="gray.800"/>

          <c-stack w="180%" m="auto" should-wrap-children is-inline>
            <c-box w="162%">
              <c-select v-model="catagories" placeholder="Select Catagories"  size="md" mt="12%" borderColor="gray.800">
                <option value="1">Food</option>
                <option value="2">Drink</option>
                <option value="3">Dessert</option>
              </c-select>
            </c-box>

            <!-- Select Status -->
            <c-box w="184%">
              <c-select v-model="menu_status" placeholder="Select status" size="md" mt="13%" ml="44%" borderColor="gray.800">
                <option value="1">In stock</option>
                <option value="2">Out of stock</option>
              </c-select>
            </c-box>
          </c-stack>

          <c-stack should-wrap-children is-inline>
            <c-form-label 
            color="black"
            mt="60%"
            mr="90%"
            fontWeight="normal"
            white-space="pre-line">Price</c-form-label>

            <!-- <c-form-label 
                  color="black"
                  mt="40%"
                  ml="323%"
                  fontWeight="normal"
                  white-space="pre-line">Qauntity</c-form-label> -->
          </c-stack>
            
          <!-- Select Price -->
          <c-stack should-wrap-children is-inline>
            <c-box w="182%">
              <c-number-input v-model="form.price" :precision="2" >
              <c-number-input-field type="number" borderColor="gray.800"/>
              <c-number-input-stepper>
              <c-numberIncrement-stepper />
              <c-number-decrement-stepper />
              </c-number-input-stepper>
              </c-number-input>
            </c-box>

            <!-- Select QTY -->
            <!-- <c-box w="182%" ml="83%">
                <c-number-input v-model="form.QTY" >
                <c-number-input-field type="number" borderColor="gray.800"/>
                <c-number-input-stepper>
                <c-numberIncrement-stepper />
                <c-number-decrement-stepper />
                </c-number-input-stepper>
                </c-number-input>
              </c-box> -->
          </c-stack>
        
          <!-- Select Size -->
          <c-stack should-wrap-children is-inline>
            <c-box w="220%">
              <c-select v-model="form.size" placeholder="Select size" mt="18%" borderColor="gray.800">
                <option value="s">Small</option>
                <option value="l">Big</option>
              </c-select>
            </c-box>

            <!-- <c-box w="217%">
              <c-input v-model="form.comment" placeholder="comment" mt="6%" ml="6%" borderColor="gray.800"/>
            </c-box> -->
          </c-stack>
        </c-box>

        <c-flex justify="center">
          <c-box 
            w="50%"
            border-color="gray.600"
            border-width="3px" 
            rounded="lg"
            borderRadius="0.5rem"
            marginTop="10">

            <c-text fontWeight="normal" fontSize="2xl" mr="37%" mt="4%" color="#C42231"> Select ingredient in this menu </c-text>
              <ul class="checkboxes">
                <c-simple-grid :columns="[1, 2]" spacing="8" mt="5%" mb="8%">
                  
                  <div v-for="item in all_ingredient" :key="item.id">
                    <c-stack should-wrap-children is-inline ml="25%">
                      <c-text fontSize="xl">
                        <input
                            type="checkbox"
                            :value="item.id"
                            v-model="form.ingredients"
                        />
                      {{ item.ingredient_name_ENG }}
                      </c-text>
                    </c-stack>
                  </div>
                
              </c-simple-grid>
              </ul>
            <!-- <p>{{ form.ingredients }}</p> -->
          </c-box>
        </c-flex>

        <c-button @click="createMenu" mr="4%" mb="3%" mt="5%" width="36%" variant-color="yellow" variant="solid" size="lg" :_hover="{bg: '#A0AEC0'}">
          Create Menu
        </c-button>

      </c-form-control>
      </c-flex>
    </c-box>
    </c-box>
  </div>
</template>

<script>
import MenuApi from "@/store/MenuApi.js"
import AuthUser from '@/store/AuthUser.js'
import AuthService from '@/services/AuthService'
import IngredientApi from '@/store/IngredientApi'
import ImageApi from '@/store/ImageApi'


import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CStack, CImage,
  CBox, CGrid, CInputGroup, CSimpleGrid,
  CFormControl, CFormLabel, CHeading,CFlex,CCheckbox, CCheckboxGroup,
  CText  } from "@chakra-ui/vue";

export default {
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton,
        CBox, CText,
        CFormControl,
        CGrid, CImage, CSimpleGrid,
        CHeading, CInputGroup, CFormLabel,
        CStack, CFlex,CCheckbox, CCheckboxGroup,
    },
    data(){
        return{
            catagories:'',
            menu_status:"",
            ingredient:[],
            all_ingredient:[],
            user:[],
            form:{
                menu_id:"false",
                catagories:0,
                sort_menu:1,
                name_ENG:"",
                name_TH:"",
                menu_status:0,
                price:1,
                // QTY:1,
                size:"",
                comment:"ไมผัก",
                ingredients:[]
            },
            payload:{
              menu_id:1,
              image:"",
            },
            imageFile:"",
            imageURL:"",
            imagePreview:null,
        }
    },
    async created(){
        console.log("CreateMenuPage Created");
        await IngredientApi.dispatch("fetchIngredient");
        this.all_ingredient = IngredientApi.getters.getIngredients;
        console.log("all ingredient = " ,this.all_ingredient);
        // console.log("jwt = " , AuthUser.getters.jwt )
    },
    methods:{
        imageUpload(){
          let data = new FormData;
          data.append('image' , this.imageFile)
          this.payload.image = data
          // axios.post('../image' , data)
          ImageApi.dispatch("createImage",this.payload)

          // .then(()=>{
          //   window.location = '../image'
          // }).catch(()=>{

          // })
        },
        handleImageSelected(event){
          // let imageFile = ref("");
          console.log(event)

          if(event.target.files.length == 0){
            return;
          }

          this.imageFile = event.target.files[0]

          console.log("imageFile", this.imageFile)

          let reader = new FileReader()
          reader.readAsDataURL(this.imageFile)
          reader.onload = e =>{
            this.imagePreview = e.target.result
          }

          // this.imageURL = "@/assets/" + this.imageFile
          // this.imagePreview = require(this.imageURL)
          // console.log("imageURL.value" , this.imageURL)

        },
        async createMenu(){
            this.form.catagories = parseInt(this.catagories);
            this.form.menu_status = parseInt(this.menu_status);
            this.form.price = parseFloat(this.form.price);
            if (this.form.name_ENG == "" || this.form.name_TH == "" || this.form.catagories == "" || this.form.menu_status == "" || this.form.price == "" || this.form.size == "") {
              this.$swal({
                  icon: 'error',
                  title: 'ไม่สามารถเพิ่มเมนูได้',
                  text: 'กรุณากรอกให้ข้อมูลให้ครบถ้วน',
                  footer: '<a href="">Why do I have this issue?</a>'
              })
            } else {
              console.log(this.form)
              let res = MenuApi.dispatch("createMenu" ,this.form);
              console.log(res);
              this.$router.push("/allMenuView");
            }

        },
        async addIngredient(){
          console.log("ingredient = ", this.ingredient);
        }
    }
}
</script>

<style>
</style>
