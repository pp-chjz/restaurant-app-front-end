<template>
  <div>
    <c-box 
        px="4rem" 
        py="10px"
        width="full" 
        maxWidth="500vh"
        bg="#1F1D2B"
      >
      <c-heading
        size="xl"
        mr="67%"
        mt="2rem"
        color="white"
        opacity="0.8"
        fontWeight="normal"
        lineHeight="1.5"
        white-space="pre-line"
        >
        {{ "Products Management" }}
        </c-heading>

        <c-flex align="center">

            <c-input v-model="payload.menu_name" placeholder="search name" />


            <c-select v-model="menu_status" placeholder="Select status">
            <option value="1">In Stock</option>
            <option value="2" bg="yellow">Out of stock</option>
            </c-select>

            <c-button @click='search()' width="full" variant-color="yellow" variant="solid" size="lg">
                search
              </c-button> 
              <c-button @click='clear()' width="full" variant-color="yellow" variant="solid" size="lg">
                clear
              </c-button> 
        </c-flex>

    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10">
    <div v-for="index in ingredient" :key="index.id">
        <ingredient-card
        v-bind:ingredient="index"></ingredient-card>
        
    </div>
    </c-simple-grid>
    </c-box>
  </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
import IngredientCard from "@/components/ingredient-card/IngredientCard.vue"

import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,
  } from "@chakra-ui/vue";

export default {
    name: 'All Menu',
    props: {
        msg: String
    },
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton, CText, CHeading, CIcon,
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex , IngredientCard

    },
    data(){
        return{
            ingredients:[],
            ingredient:[{ingredient_ID:'not show'}],
            image:"@/assets/saen.png",
            searchStatus:"",
            searchCatagory:"",
            searchName:"",
            payload:{
                ingredient_status:0,
                id:0,
            },
            menu_status:"",
            menu_catagory:"",
            status:"",
            

        }
    },
    async created(){
        console.log("AllIngredientPage Created");
        await this.fetchIngredient()
    },
    methods:{
        
        async fetchIngredient(){
            // console.log("fetchMenu")
            await IngredientApi.dispatch("fetchIngredient")
            this.ingredients = IngredientApi.getters.getIngredients
            console.log(this.ingredients)
            for(let i = 0; i<this.ingredients.length ; i++){
                this.ingredient.push(this.ingredients[i])
            }
            this.ingredient[0].ingredient_ID = 'true';
            console.log("ingredient = ", this.ingredient)

        },
        async editStatus(id){
            this.payload.id = id
            this.payload.ingredient_status = parseInt(this.status)
            await IngredientApi.dispatch("updateIngredientStatus" , this.payload)
            await this.fetchIngredient()

        }
    }
}
</script>

<style>
.box {
        border: dashed 3px #EA7C69;
    }
</style>
