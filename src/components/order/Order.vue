<template>
    <div>
        all order view

    
    
        <div v-for="index in orders.data" :key="index.id">

            <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden">
                <c-box v-if="index.order_status === 'new' " bg="green.200" w="100%" p="4" color="black">
                    Table {{ index.table_number }} <br>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'cooking' " bg="yellow.300" w="100%" p="4" color="white">
                    Table {{ index.table_number }} <br>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'complete' " bg="red.300" w="100%" p="4" color="white">
                    Table {{ index.table_number }} <br>
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
                            {{ menu.pivot.QTY }} x {{  menu.name_TH  }} <br>
                            <div v-if="menu.pivot.comment !== null ">
                                - {{ menu.pivot.comment }}
                            </div>
                        </c-box>
                    </div>
                </c-box>
            </c-box>

        </div>

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
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex ,

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