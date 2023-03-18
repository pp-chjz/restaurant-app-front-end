<template>
    <div>
        <!-- ช่องสำหรับ add menu -->
        <div v-if="ingredient.ingredient_ID === 'true' "> 
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


        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->
        <c-box v-if="ingredient.ingredient_ID === 'false'"  m="2rem" maxW="sm" border-width="3px" rounded="lg" overflow="hidden" border-color="#393C49" bg="#1F1D2B" fontSize="xl">
            
            <!-- <c-image :src="ingredient.image[0].path" alt="cat" /> -->
            <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/150" ml="30%" mt="3%"/>
            <!-- <img class="image" v-show:"image" :src="image"/> -->
            
            <!-- <c-image
                size="150px"
                objectFit="cover"
                src="gibberish.png"
                alt="PICTURE"
            /> -->
            <c-box p="6">
                <c-box d="flex" align-items="baseline">
                    <c-badge rounded="full" px="5" variant-color="green" font-size="0.75em" v-if="ingredient.ingredient_status === 'in stock'">
                    IN STOCK
                    </c-badge>
                    <c-badge rounded="full" px="5" variant-color="red" font-size="0.75em" v-if="ingredient.ingredient_status === 'out of stock'">
                    OUT OF STOCK
                    </c-badge>

                
                </c-box>

                <c-box
                color="white"
                    mt="1"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    {{ ingredient.ingredient_name_ENG }} | {{ ingredient.ingredient_name_TH }}
                </c-box>

                <c-flex jusify="center">
                    <c-box w="162%">
                    <c-select v-model="status" placeholder="Select Status"  size="md" mt="12%" borderColor="gray.800">
                        <option value="1">In Stock</option>
                        <option value="2">Out Of Stock</option>
                    </c-select>
                    </c-box>

                    <c-button @click="editStatus(ingredient.id)" ml="4%" w="100rem" mt="1rem" size="lg" variant-color="orange" >
                        Edit status
                    </c-button>
                </c-flex>

            </c-box>
        </c-box>
        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->
    </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
// import IngredientCard from "@/components/ingredient-card/IngredientCard.vue"

import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,
  } from "@chakra-ui/vue";
export default {
    props:{
        ingredient: Object,
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
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex 

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
            IngredientStatus:[],
            

        }
    },
    async created(){
        console.log("IngredientCard Created");
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
            console.log("payload = ",  this.payload)
            await IngredientApi.dispatch("updateIngredientStatus" , this.payload)
            // await this.fetchIngredient()
            // this.IngredientStatus = IngredientApi.getters.getIngredientsStatus
            // console.log("this.IngredientStatus = ",  this.IngredientStatus)
            if(this.payload.ingredient_status == 2)
                this.ingredient.ingredient_status = 'out of stock'
            else if(this.payload.ingredient_status == 1)
                this.ingredient.ingredient_status = 'in stock'

        }
    }
}
</script>

<style>
.box {
        border: dashed 3px #EA7C69;
    }
</style>