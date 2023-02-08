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

        <c-heading
        size="xl"
        color="black"
        opacity="0.8"
        fontWeight="normal"
        lineHeight="1.5"
        white-space="pre-line"
        > {{ "Create Menu" }} </c-heading>
        
      <c-flex>
      <c-form-control>
        
        <c-box w="20%" mt="4%" ml="30%">
          <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/150" ml="70%" />
          <c-button w="49%" size="md" ml="70%">
            Add picture
          </c-button>
          <c-input v-model="form.name_ENG" placeholder="name_ENG" w="180%" borderColor="gray.800" mt="10%"/>
          <c-input v-model="form.name_TH" placeholder="name_TH" mt="8%" w="180%" borderColor="gray.800"/>

          <c-stack should-wrap-children is-inline>
            <c-box w="120%">
              <c-select v-model="catagories" placeholder="Select Catagories" size="md" mt="12%" borderColor="gray.800">
                <option value="1">Food</option>
                <option value="2">Drink</option>
                <option value="3">Main dish</option>
                <option value="4">Dessert</option>
              </c-select>
            </c-box>

            <!-- Select Status -->
            <c-box w="260%">
              <c-select v-model="menu_status" placeholder="Select status" size="md" mt="7%" ml="10%" borderColor="gray.800">
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

            <c-form-label 
                  color="black"
                  mt="40%"
                  ml="323%"
                  fontWeight="normal"
                  white-space="pre-line">Qauntity</c-form-label>
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
            <c-box w="182%" ml="83%">
                <c-number-input v-model="form.QTY" >
                <c-number-input-field type="number" borderColor="gray.800"/>
                <c-number-input-stepper>
                <c-numberIncrement-stepper />
                <c-number-decrement-stepper />
                </c-number-input-stepper>
                </c-number-input>
              </c-box>
          </c-stack>
        
          <!-- Select Size -->
          <c-stack should-wrap-children is-inline>
            <c-box w="120%">
              <c-select v-model="form.size" placeholder="Select size" mt="18%" borderColor="gray.800">
                <option value="s">Small</option>
                <option value="l">Big</option>
              </c-select>
            </c-box>

            <c-box w="217%">
              <c-input v-model="form.comment" placeholder="comment" mt="6%" ml="6%" borderColor="gray.800"/>
            </c-box>
          </c-stack>
        </c-box>

        <c-box bg="tomato" marginTop="10">
          <p>select ingredient in this menu</p>
          <c-checkbox-group v-model="ingredient" is-inline spacing="8" variant-color="blue" :default-value="['itachi', 'kisame']">
            <c-checkbox value="itachi">Itachi</c-checkbox>
            <c-checkbox value="madara">Madara</c-checkbox>
            <c-checkbox value="kisame">Kisame</c-checkbox>
          </c-checkbox-group>
        </c-box>
        <c-button @click="addIngredient" mr="4%" mb="3%" mt="8%" width="36%" variant-color="indigo" variant="solid" size="lg">
          Add Ingredient
        </c-button>

        <c-button @click="createMenu" mr="4%" mb="3%" mt="8%" width="36%" variant-color="yellow" variant="solid" size="lg">
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

import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CStack, CImage,
  CBox, CGrid, CInputGroup,
  CFormControl, CFormLabel, CHeading,CFlex,CCheckbox, CCheckboxGroup  } from "@chakra-ui/vue";

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
        CBox,
        CFormControl,
        CGrid, CImage,
        CHeading, CInputGroup, CFormLabel,
        CStack, CFlex,CCheckbox, CCheckboxGroup,
    },
    data(){
        return{
            catagories:'',
            menu_status:"",
            ingredient:[],
            all_ingredient:[],
            form:{
                menu_id:"test",
                catagories:0,
                sort_menu:1,
                name_ENG:"",
                name_TH:"",
                menu_status:0,
                price:1,
                QTY:1,
                size:"",
                comment:""
            }
        }
    },
    async created(){
        console.log("CreateMenuPage Created");
        IngredientApi.dispatch("fetchIngredient");
        this.all_ingredient = IngredientApi.getters.getIngredients;
        console.log("all ingredient = " ,this.all_ingredient);
        // console.log("jwt = " , AuthUser.getters.jwt )
    },
    methods:{
        async createMenu(){
            this.form.catagories = parseInt(this.catagories);
            this.form.menu_status = parseInt(this.menu_status);
            this.form.price = parseFloat(this.form.price);

            console.log(this.form)
            let res = MenuApi.dispatch("createMenu" ,this.form);
            console.log(res);
        },

        async addIngredient(){
          console.log("ingredient = ", this.ingredient);
        }
    }
}
</script>

<style>
.form {
}
</style>
