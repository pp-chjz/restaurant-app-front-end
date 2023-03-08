<template>
    <div>
        <c-box
            mt="1"
            font-weight="semibold"
            as="h4"
            line-height="tight"
            is-truncated
        >
            <c-flex align="center">

            <c-text color="black"> {{  menu.name_TH  }} </c-text> 
            <c-badge v-if="menu.pivot.food_status === 'prepare' " rounded="full" px="2" variant-color="green" ml="2">
                Prepare
            </c-badge>
            <c-badge v-if="menu.pivot.food_status === 'cooking' " rounded="full" px="2" variant-color="yellow" ml="2">
                Cooking
            </c-badge>
            <c-badge v-if="menu.pivot.food_status === 'served' " rounded="full" px="2" variant-color="red" ml="2">
                served
            </c-badge>

            <c-select v-model="payload.food_status" placeholder="Select status" ml="4%" borderColor="gray.800">
                <option value="1">Prepare</option>
                <option value="2">Cooking</option>
                <option value="3">Served</option>

            </c-select>

            <c-button @click="confirm()"  ml="4%" variant-color="yellow" variant="solid" size="lg">
                  ยืนยัน
              </c-button> 

            </c-flex>
        </c-box>
    </div>
</template>

<script>
import OrderApi from "@/store/OrderApi.js"

  import { CInput,CSelect,CNumberInput,
    CNumberInputField,
    CNumberInputStepper,
    CNumberIncrementStepper,
    CNumberDecrementStepper, CStack,
    CButton, CImage, CSimpleGrid, CBox,
    CBadge, CFlex, CText, CHeading, CIcon,  CGrid, CGridItem,
    CTextarea, CIconButton ,CFormControl ,
    } from "@chakra-ui/vue";
export default {
    props:{
        menu: Object,
        order_id: Number,
        orders: Object
    },
    components: {
          CInput,
          CSelect,
          CNumberInput,
          CNumberInputField,
          CNumberInputStepper,
          CNumberIncrementStepper,
          CNumberDecrementStepper, CIconButton,
          CButton, CText, CHeading, CIcon,
          CImage, CSimpleGrid ,CBox ,CBadge ,CFlex ,
          CGrid, CGridItem, CStack, CTextarea , CFormControl 
  
    },
    data(){
        return{
            payload:{
                menu_id:0,
                food_status:"",
                order_id:0
              },
            food_status:"",
        }
    },
    async created(){

    },
    methods:{
        async confirm(){

            this.payload.menu_id = this.menu.id
            this.payload.order_id = this.order_id

            if(this.payload.food_status == "")
            {
                console.log("choose first")
            }
            else
            {
                this.payload.food_status = parseInt(this.payload.food_status)
                console.log("payload",this.payload)
                await OrderApi.dispatch("updateFoodStatus",this.payload)
                if(this.payload.food_status == 1)
                {
                    this.menu.pivot.food_status = 'prepare'

                }
                if(this.payload.food_status == 2)
                {
                    this.menu.pivot.food_status = 'cooking'

                }
                if(this.payload.food_status == 3)
                {
                    this.menu.pivot.food_status = 'served'

                }


            }

            this.payload.menu_id = 0
            this.payload.order_id = 0


        },
    }

}
</script>

<style>

</style>