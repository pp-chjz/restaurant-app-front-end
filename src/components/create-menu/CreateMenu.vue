<template>
  <div>
    <h1>This is an CreateMenu page</h1>
    <br><br><br><br>
    <c-select v-model="catagories" placeholder="Select Catagories">
      <option value="1">Food</option>
      <option value="2">Drink</option>
      <option value="3">Main dish</option>
      <option value="4">Dessert</option>
    </c-select>
    <c-input v-model="form.name_ENG" placeholder="name_ENG" />
    <c-input v-model="form.name_TH" placeholder="name_TH" />
    <c-select v-model="menu_status" placeholder="Select status">
      <option value="1">In stock</option>
      <option value="2">Out of stock</option>
    </c-select>
    <p>select price</p>
    <template>
        <c-number-input v-model="form.price" :precision="2">
            <c-number-input-field type="number" />
            <c-number-input-stepper>
            <c-numberIncrement-stepper />
            <c-number-decrement-stepper />
            </c-number-input-stepper>
        </c-number-input>
    </template>
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
    <c-select v-model="form.size" placeholder="Select size">
      <option value="s">Small</option>
      <option value="l">Big</option>
    </c-select>
    <c-input v-model="form.comment" placeholder="comment" />
    <br><br>
    <c-button @click="createMenu" variant-color="green">Create Menu</c-button>
  </div>
</template>

<script>
import MenuApi from "@/store/MenuApi.js"
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
            catagories:'',
            menu_status:"",
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
    },
    methods:{
        async createMenu(){
            this.form.catagories = parseInt(this.catagories);
            this.form.menu_status = parseInt(this.menu_status);
            this.form.price = parseFloat(this.form.price);

            console.log(this.form)
            let res = MenuApi.dispatch("createMenu" ,this.form);
            console.log(res);
        }
    }
}
</script>
