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
        {{ orders_use.data.length }} {{ "Orders" }}
        </c-heading>

        <c-box ml="87%" w="150px">
            <c-select v-model="orderStatus" placeholder="Select status">
            <option value="1">New</option>
            <option value="2" bg="yellow">Cooking</option>
            <option value="4" bg="yellow">All served / Unpaid</option>
            <option value="3" bg="yellow">Waiting for checkbill</option>
            <option value="5">Complete</option>
            </c-select>

            <c-select v-model="table_number" placeholder="Select table" size="md" borderColor="gray.800">
                <option v-for="index in table" :value="index" > {{ index }}</option>
            </c-select>
            <c-button @click='search()' mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                search
              </c-button> 
              <c-button @click='clear()' mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                clear
              </c-button> 
        </c-box>

    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10" >
    
        <div v-for="index in orders_use.data" :key="index.id">

            <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="#393C49">
                <c-box v-if="index.order_status === 'new' " bg="green.200" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'cooking' " bg="yellow.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'wait_for_check_bill' " bg="blue.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'all_served_unpaid' " bg="indigo.300" w="100%" p="4" color="black">
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
                            <c-badge v-if="index.order_status === 'wait_for_check_bill' " rounded="full" px="2" variant-color="blue">
                            Waiting for check bill
                            </c-badge>
                            <c-badge v-if="index.order_status === 'all_served_unpaid' " rounded="full" px="2" variant-color="indigo">
                            All served / Unpaid
                            </c-badge>
                            <c-badge v-if="index.order_status === 'complete' " rounded="full" px="2" variant-color="red">
                            complete
                            </c-badge>
                    </c-box>
                    <br>
                    <div v-for="menu in index.menus" :key="menu.id">

                        <c-box
                            mt="1"
                            font-weight="semibold"
                            as="h4"
                            line-height="tight"
                            is-truncated
                        >
                        <c-flex align="center">

                            <c-text color="white"> {{ menu.pivot.QTY }} x {{  menu.name_TH  }} </c-text> 
                            <c-badge v-if="menu.pivot.food_status === 'prepare' " rounded="full" px="2" variant-color="green" ml="2">
                                Prepare
                            </c-badge>
                            <c-badge v-if="menu.pivot.food_status === 'cooking' " rounded="full" px="2" variant-color="yellow" ml="2">
                                Cooking
                            </c-badge>
                            <c-badge v-if="menu.pivot.food_status === 'cancel' " rounded="full" px="2" variant-color="pink" ml="2">
                                Cancel
                            </c-badge>
                            <c-badge v-if="menu.pivot.food_status === 'served' " rounded="full" px="2" variant-color="red" ml="2">
                                served
                            </c-badge>
                        </c-flex>
                        <c-flex align="center">

                            <div v-if="menu.pivot.comment !== null ">
                                <c-text color="#DEC95C"> - {{ menu.pivot.comment }} </c-text>
                            </div>
                        </c-flex>
                        
                        </c-box>
                    </div>
                    <order-popup
                    v-bind:menus="index.menus"
                    v-bind:order_id="index.id"
                    v-bind:orders="index"
                    @saveInfo="editOrder"></order-popup>
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
import OrderPopup from "@/components/order-popup/OrderPopup.vue"



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
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex,OrderPopup

    },
    data(){
        return{
            tables:[],
            orders:[],
            orders_use:[],

            tablesWithOrder:[],
            menu:[{menu_id:'not show'}],
            table_count:0,
            popupActivo2:false,
            prepare: 0,
            served: 0,
            payload:{
                order_status: 0,
                table_number: 0,
            },
            table_number: "",
            orderStatus:"",
            table:[],
            num:0,
        }
    },
    async created(){
        console.log("All order Created");
        console.log("openRes isOpen" , !AuthUser.getters.isOpen)
        console.log("isAuthen" , AuthUser.getters.isAuthen)

        await OrderApi.dispatch("fetchOrder")
        this.orders_use = OrderApi.getters.getOrders

        await TableApi.dispatch('fetchTotalTable')
        this.total_table = TableApi.getters.getTotalTable
        this.total_table = this.total_table.data
        console.log('this.total_table = ', this.total_table)
        for(let i = 0 ; i<this.total_table ; i++)
        {
            this.num = i+1
            this.table.push(this.num.toString())
        }

    },
    methods:{
        async clear(){
            await OrderApi.dispatch("fetchOrder")
        this.orders_use = OrderApi.getters.getOrders
        },
        async search(){
            console.log("search")
            if(this.table_number == "" && this.orderStatus == "")
            {
                this.$swal({
                    icon: 'error',
                    title: 'ไม่สามารถค้นหาได้',
                    text: 'กรุณาเลือกรายการที่จะค้นหา',
                    footer: '<a href="">Why do I have this issue?</a>'
                })

            }
            else if(this.table_number == "")
            {
                this.payload.order_status = parseInt(this.orderStatus);
                await OrderApi.dispatch("fetchSearchOrder" , this.payload)
                this.orders_use = OrderApi.getters.getSearchOrders
                this.orders_use = this.orders_use.data

                console.log("orders_use = " ,this.orders_use)

                this.$forceUpdate()

            }
            else if(this.orderStatus == "")
            {
                this.payload.table_number = parseInt(this.table_number);
                await OrderApi.dispatch("fetchSearchOrder", this.payload)
                this.orders_use = OrderApi.getters.getSearchOrders
                this.orders_use = this.orders_use.data

                console.log("payload = " ,this.payload)

                this.$forceUpdate()
                
            }

            else
            {
                this.payload.order_status = parseInt(this.orderStatus);
                this.payload.table_number = parseInt(this.table_number);
                console.log("payload = " ,this.payload)
                await OrderApi.dispatch("fetchSearchOrder", this.payload)
                this.orders_use = OrderApi.getters.getSearchOrders
                this.orders_use = this.orders_use.data

                this.$forceUpdate()
            }
            

            
                
        },
        editOrder(){
            console.log("edit order")
        },
        async fetchTable(){
            // console.log("fetchMenu")
            await TableApi.dispatch("fetchTable")
            this.tables = TableApi.getters.getTables
            this.table_count = this.tables.data.lenght + 1
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