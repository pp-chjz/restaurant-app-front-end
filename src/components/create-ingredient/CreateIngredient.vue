<template>
  <div>
    <h1>This is an CreateIngredient page</h1>
    <br><br><br><br><br><br>
    <c-input v-model="form.ingredient_name_ENG" placeholder="name_ENG" />
    <c-input v-model="form.ingredient_name_TH" placeholder="name_TH" />

    <c-select v-model="ingredient_status" placeholder="Select status">
      <option value="1">In stock</option>
      <option value="2">Out of stock</option>
    </c-select>

    <p>select QTY</p>
    <template>
        <c-number-input v-model="form.QTY">
            <c-number-input-field type="number" />
            <c-number-input-stepper>
            <c-numberIncrement-stepper />
            <c-number-decrement-stepper />
            </c-number-input-stepper>
        </c-number-input>
    </template>

    <br><br>
    <c-button @click="createIngredient" variant-color="green">Create Ingredient</c-button>

  </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton ,  } from "@chakra-ui/vue";

export default {
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton ,
    },
    data(){
        return{
            ingredient_status:'',
            form:{
                ingredient_status:0,
                QTY:0,
                ingredient_ID:"ingredient_ID",
                ingredient_name_ENG:"",
                ingredient_name_TH:"",
                recipe_id:0,
            }
        }
    },
    async created(){
        console.log("CreateIngredientPage Created");
    },
    methods:{
        async createIngredient(){
            this.form.ingredient_status = parseInt(this.ingredient_status);
            this.form.QTY = parseInt(this.form.QTY);

            console.log(this.form)
            let res = IngredientApi.dispatch("createIngredient" ,this.form);
            console.log(res);
        }
    }
}
</script>
