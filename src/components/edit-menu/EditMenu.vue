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
          <c-button w="49%" size="md" ml="70%">
            Add picture
          </c-button>
          <c-text mr="66%" mt="15%" fontWeight="normal">English Name </c-text>
          <c-input v-model="menu.name_ENG" placeholder="ชื่อเมนูภาษาอังกฤษ" w="180%" borderColor="gray.800" mt="3%"/>
          <c-text mr="74%" mt="10%" fontWeight="normal">Thai Name</c-text>
          <c-input v-model="menu.name_TH" placeholder="ชื่อเมนูภาษาไทย" mt="3%" w="180%" borderColor="gray.800"/>

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
              <c-number-input v-model="menu.price" :precision="2" >
              <c-number-input-field type="number" borderColor="gray.800"/>
              <c-number-input-stepper>
              <c-numberIncrement-stepper />
              <c-number-decrement-stepper />
              </c-number-input-stepper>
              </c-number-input>
            </c-box>

             <!-- Select QTY -->
            <!-- <c-box w="182%" ml="83%">
                <c-number-input v-model="menu.QTY" >
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
              <c-select v-model="menu.size" placeholder="Select size" mt="18%" borderColor="gray.800">
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

       
        <!-- <c-button @click="addIngredient" mr="4%" mb="3%" mt="8%" width="36%" variant-color="indigo" variant="solid" size="lg">
          Add Ingredient
        </c-button> -->

        <c-button @click="editMenu" mr="4%" mb="3%" mt="8%" width="36%" variant-color="yellow" variant="solid" size="lg">
          Edit Menu
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
  CBox, CGrid, CInputGroup, CText,
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
        CGrid, CImage, CText,
        CHeading, CInputGroup, CFormLabel,
        CStack, CFlex,CCheckbox, CCheckboxGroup,
    },
    data(){
        return{
            catagories:'',
            menu_status:"",
            ingredient:[],
            all_ingredient:[],
            menu_id: this.$route.params.id,
            menu:[],
            form:{
                catagories:0,
                name_ENG:"",
                name_TH:"",
                menu_status:0,
                price:1,
                // QTY:1,
                size:"",
                ingredients:[],
                menu_id: this.$route.params.id,
            }
        }
    },
    async created(){
        console.log("EditMenuPage Created");
        await IngredientApi.dispatch("fetchIngredient");
        this.all_ingredient = IngredientApi.getters.getIngredients;
        console.log("all ingredient = " ,this.all_ingredient);

        await MenuApi.dispatch("fetchMenuById" , this.menu_id);
        this.menu = MenuApi.getters.getMenuById;
        console.log("menu = " , this.menu);
        if(this.menu.catagories === "food")
        {
            this.catagories = "1"
        }
        if(this.menu.catagories === "drink")
        {
            this.catagories = "2"
        }
        if(this.menu.catagories === "dessert")
        {
            this.catagories = "3"
        }

        if(this.menu.menu_status === "in stock")
        {
            this.menu_status = "1"
        }
        if(this.menu.menu_status === "out of stock")
        {
            this.menu_status = "2"
        }

        for(let i=0 ; i<this.menu.ingredient.length ; i++)
            this.form.ingredients.push(this.menu.ingredient[i].id)
            // console.log("this.ingredient = " , this.menu.ingredient[i])
    },
    methods:{
        async editMenu(){
            this.form.catagories = parseInt(this.catagories);
            this.form.menu_status = parseInt(this.menu_status);
            this.form.price = parseFloat(this.menu.price);
            this.form.name_ENG = this.menu.name_ENG;
            this.form.name_TH = this.menu.name_TH;
            this.form.size = this.menu.size
            // this.form.QTY = this.menu.QTY;

            console.log(this.form)

            let res = MenuApi.dispatch("editMenu" ,this.form );
            // console.log(res);
            this.$router.push("/allMenuView");

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
