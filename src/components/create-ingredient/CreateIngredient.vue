<template>
  <div>
    <c-box
        x="4rem" 
        py="1rem"
        height="90vh"
        width="full" 
        maxWidth="500vh"
        bg="#252836"
    >
    <c-box 
        borderColor="gray.100"
        borderWidth="0.1rem"
        borderRadius="0.5rem"
        mt="100%"
        w="93%"
        height="85vh"
        m="auto"
        p="1rem"
        bg="#D9D9D9"
      >
        <c-box 
            w="100%"
            py="10px"
            height="10vh"
            borderColor="gray.100"
            borderWidth="0.1rem"
            borderRadius="0.5rem"
            bg="#EDF2F7"
        >
        <c-text 
            fontSize="4xl" 
            textAlign="center" 
            color="black"> {{ "Create Ingredient" }}
            </c-text>
    </c-box>
      

      <c-flex justify="center" mt="2%">
      <c-form-control w="100%">
        <c-text fontWeight="normal" mr="33%">English Name </c-text>
        <c-flex justify="center" mt="0.5%">
            <c-input v-model="form.ingredient_name_ENG" placeholder="ชื่อวัตถุดิบภาษาอังกฤษ" justify="center" w="40%" borderColor="gray.800"/>
        </c-flex>

        <c-text fontWeight="normal" mt="2%" mr="34%">Thai Name </c-text>
        <c-flex justify="center" mt="0.5%">
            <c-input v-model="form.ingredient_name_TH" placeholder="ชื่อวัตถุดิบภาษาไทย" w="40%" borderColor="gray.800"/>
        </c-flex>

        <c-text fontSize="md" mt="2rem" mr="35%">{{ "Qauntity" }}</c-text>

        <c-flex justify="center">
            <c-stack should-wrap-children is-inline w="40%">
                <c-box w="160%" mt="2%">
                    <c-number-input v-model="form.QTY" >
                    <c-number-input-field type="number" borderColor="gray.800" />
                    <c-number-input-stepper>
                    <c-numberIncrement-stepper />
                    <c-number-decrement-stepper />
                    </c-number-input-stepper>
                    </c-number-input>
                </c-box>
            

                <c-box w="193%" ml="95%" mt="4%">
                    <c-select v-model="ingredient_status"  placeholder="Select status" borderColor="gray.800">
                        <option value="1">In stock</option>
                        <option value="2">Out of stock</option>
                    </c-select>
                </c-box>
            </c-stack> 
        </c-flex>

        <c-flex justify="center">
            <c-button  @click="createIngredient" mt="10%" width="40%" variant-color="green" variant="solid" size="lg" :_hover="{bg: '#A0AEC0'}">
                Create Ingredient
            </c-button>
        </c-flex>
        </c-form-control>
        </c-flex>
        </c-box>
    </c-box>
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
  CButton, CText, CStack, CBox,
  CFlex, CHeading, CFormControl } from "@chakra-ui/vue";

export default {
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton, CText, CStack, CBox,
        CFlex, CHeading, CFormControl
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
            this.$router.push("/allMenuView");

        }
    }
}
</script>
