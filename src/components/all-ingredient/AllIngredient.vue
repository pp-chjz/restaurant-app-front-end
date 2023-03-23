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

            <c-input v-model="payloadSearch.ingredient_name" placeholder="search name" />


            <c-select v-model="ingredient_status" placeholder="Select status">
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
        <!-- ช่องสำหรับ add menu -->
        <div> 
            <c-box class="box"  mt="4rem" m="2rem" maxW="sm" height="430px"  rounded="lg" overflow="hidden"  border-color="salmon" bg="#1F1D2B" fontSize="xl">
                <c-flex jusify="center" >
                    <c-button  ml="40%" color="#FD821B" size="lg" variant-color="white" mt="45%">
                        <a @click='edit(ingredient.id)' :href="'/createIngredientView'" v-bind="ingredient"> 
                            <c-icon name="add"/>
                        </a>
                        <!-- <a @click='edit(ingredient.id)' :href="'#/job/'+ingredient.id" v-bind="ingredient">Edit dish</a> -->

                    </c-button>
                </c-flex>

                <c-box
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    <c-text color="#EA7C69">
                        Add new ingredient
                    </c-text>
                
                </c-box>
            </c-box>
        </div>
        <!-- ช่องสำหรับ add menu -->
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
            payloadSearch:{
                ingredient_status:0,
                ingredient_name:"",
            },
            ingredient_status:"",
            

        }
    },
    async created(){
        console.log("AllIngredientPage Created");
        await this.fetchIngredient()
        console.log("ingredient = ", this.ingredient)
    },
    methods:{
        async search(){
            console.log("search")
                if(this.payloadSearch.ingredient_name == "" && this.ingredient_status == "" )
                {
                    this.$swal({
                        icon: 'error',
                        title: 'ไม่สามารถค้นหาได้',
                        text: 'กรุณาเลือกรายการที่จะค้นหา',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
                else
                {
                    this.payloadSearch.ingredient_name = "%" + this.payloadSearch.ingredient_name + "%" 
                    if(this.ingredient_status != "")
                        this.payloadSearch.ingredient_status = parseInt(this.ingredient_status);
                    console.log("payloadSearch df = " ,this.payloadSearch)
                    await IngredientApi.dispatch("fetchSearchIngredient", this.payloadSearch)
                    this.ingredients = IngredientApi.getters.getSearchIngredients
                    this.ingredients = this.ingredients.data
                    this.ingredient = [{ingredient_ID:'not show'}]
                    console.log("this.menuuuuuuuuuuuuuu = " ,this.ingredient)

                    for(let i = 0; i<this.ingredients.length ; i++){
                        this.ingredient.push(this.ingredients[i])
                    }
                    this.ingredient[0].ingredient_ID = 'true';
                    console.log("ingredient = ", this.ingredient)
                    this.payloadSearch.ingredient_status = 0
                    this.payloadSearch.ingredient_name = ""
                    this.ingredient_status = "",

                    this.$forceUpdate()
                }
                

            
                
        },
        async clear(){
            this.ingredient = [{ingredient_ID:'not show'}],
            this.payloadSearch.ingredient_status = 0
            this.payloadSearch.ingredient_name = ""
            this.ingredient_status = "",
            await this.fetchIngredient()


        },
        async fetchIngredient(){
            // console.log("fetchMenu")
            await IngredientApi.dispatch("fetchIngredient")
            this.ingredient = IngredientApi.getters.getIngredients
            // console.log(this.ingredients)
            // for(let i = 0; i<this.ingredients.length ; i++){
            //     this.ingredient.push(this.ingredients[i])
            // }
            // this.ingredient[0].ingredient_ID = 'true';
            // console.log("ingredient = ", this.ingredient)

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
