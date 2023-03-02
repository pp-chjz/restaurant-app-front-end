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
        mr="85%"
        mt="2rem"
        color="white"
        opacity="0.8"
        fontWeight="bold"
        lineHeight="1.5"
        white-space="pre-line"
        >
        {{ orders.data.length }} {{ "Orders" }}
        </c-heading>

        <c-box ml="87%" w="80px">
            <c-select v-model="orderStatus" placeholder="All">
            <option value="grilled">Preparing</option>
            <option value="pub-style" bg="yellow">Cooking</option>
            <option value="jucy-lucy">Served</option>
            </c-select>
        </c-box>

    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10" >
    
        <div v-for="index in orders.data" :key="index.id">

            <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="#393C49">
                <c-box v-if="index.order_status === 'new' " bg="green.200" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'cooking' " bg="yellow.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'complete' " bg="red.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                    <c-box p="6">
                        <c-box d="flex" align-items="baseline">
                            <c-badge v-if="index.order_status === 'new' " rounded="full" px="2" variant-color="green">
                            New
                            </c-badge>
                            <c-badge v-if="index.order_status === 'cooking' " rounded="full" px="2" variant-color="yellow">
                            cooking
                            </c-badge>
                            <c-badge v-if="index.order_status === 'complete' " rounded="full" px="2" variant-color="red">
                            complete
                            </c-badge>
                    </c-box>
                    <div v-for="menu in index.menus" :key="menu.id">

                        <c-box
                            mt="1"
                            font-weight="semibold"
                            as="h4"
                            line-height="tight"
                            is-truncated
                        >
                        <c-text color="white"> {{ menu.pivot.QTY }} x {{  menu.name_TH  }} </c-text> 
                            <div v-if="menu.pivot.comment !== null ">
                                <c-text color="#DEC95C"> - {{ menu.pivot.comment }} </c-text>
                            </div>
                        </c-box>
                    </div>
                </c-box>
            </c-box>

        </div>
        </c-simple-grid>
    </c-box>

    </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
import TableApi from "@/store/FoodTableApi.js"
import OrderApi from "@/store/OrderApi.js"

import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,
  } from "@chakra-ui/vue";

export default {
    name: 'AllOrder',
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
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex, 

    },
    data(){
        return{
            tables:[],
            orders:[],
            tablesWithOrder:[],
            menu:[{menu_id:'not show'}],
            table_count:0,
            popupActivo2:false,
        }
    },
    async created(){
        console.log("All order Created");
        // await this.fetchTable()
        // await TableApi.dispatch("fetchTableWithOrder")
        // this.tablesWithOrder = TableApi.getters.getTablessWithOrder
        // console.log("this.tablesWithOrder" , this.tablesWithOrder.data)

        // await this.fetchTable()
        await OrderApi.dispatch("fetchOrder")
        this.orders = OrderApi.getters.getOrders
        console.log("this.orders =" , this.orders.data)

    },
    methods:{
        async fetchTable(){
            // console.log("fetchMenu")
            await TableApi.dispatch("fetchTable")
            this.tables = TableApi.getters.getTables
            this.table_count = this.tables.data.length + 1
            console.log(this.tables)
        },
        edit(){
            console.log("create table")
        },
        cancel(){
            this.popupActivo2 = false   
        },
        async create(){
            await TableApi.dispatch("createTable")
            await this.fetchTable()
            
            this.popupActivo2 = false   
        },
    }
    
}
</script>

<style>
</style>