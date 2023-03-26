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
            mr="83%"
            mt="2rem"
            color="white"
            opacity="0.8"
            fontWeight="bold"
            lineHeight="1.5"
            white-space="pre-line"
        >
        {{ "Check Bills" }}
        </c-heading>
        <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10" >
    
            <div v-for="index in orders_use" :key="index.id">


                <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="#393C49">
                    <c-box v-if="index.order_status === 'wait_for_check_bill' " bg="blue.300" w="100%" p="4" color="black">
                        <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                        {{ index.order_time }}
                    <c-box v-if="index.order_status === 'complete' " bg="red.300" w="100%" p="4" color="black">
                        <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                        {{ index.order_time }}
                    </c-box>
                </c-box>

                    <c-box p="6">
                        <c-box d="flex" align-items="baseline">
                            <c-badge v-if="index.order_status === 'wait_for_check_bill' " rounded="full" px="2" variant-color="blue">
                            Waiting for check bill
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

                            <c-text color="white"> {{ menu.result }} x {{  menu.name  }} </c-text> 
                        </c-flex>
                        
                        </c-box>
                    </div>
                    <c-button ml="4%" mt="1rem" size="lg" variant-color="orange" >
                        <a @click='pay(index)' v-bind="index">Pay Success</a>
                    </c-button>
                </c-box>
            </c-box>

            <!-- <c-box maxW="sm" border-width="1px" rounded="lg" overflow="hidden" bg="#393C49">

                <c-box v-if="index.order_status === 'wait_for_check_bill' " bg="blue.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>
                <c-box v-if="index.order_status === 'complete' " bg="red.300" w="100%" p="4" color="black">
                    <c-text fontWeight="bold" fontSize="xl"> Table {{ index.table_number }} <br> </c-text>
                    {{ index.order_time }}
                </c-box>

                <c-badge v-if="index.order_status === 'wait_for_check_bill' " rounded="full" px="2" variant-color="blue">
                    Waiting for check bill
                </c-badge>
                <c-badge v-if="index.order_status === 'complete' " rounded="full" px="2" variant-color="red">
                    Complete
                </c-badge>
                    <div v-for="menu in index.menus" :key="index.id">
                        {{ menu.name }} x {{ menu.result }}
                    </div>

                ราคา {{ index.total_price }}

                <c-button ml="4%" mt="1rem" size="lg" variant-color="orange" >
                    <a @click='pay(index)' v-bind="index">Pay Success</a>
                </c-button>
                </c-box> -->
            </div>
        </c-simple-grid>
        </c-box>
        

    </div>
</template>

<script>
import OrderApi from "@/store/OrderApi.js"

import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CStack, CImage,
  CBox, CGrid, CInputGroup, CSimpleGrid,
  CFormControl, CFormLabel, CHeading,CFlex,CCheckbox, CCheckboxGroup,
  CText,CBadge  } from "@chakra-ui/vue";
export default {
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton,
        CBox, CText,
        CFormControl,
        CGrid, CImage, CSimpleGrid,
        CHeading, CInputGroup, CFormLabel,
        CStack, CFlex,CCheckbox, CCheckboxGroup, CBadge
    },
    data(){
        return{
            orders:[],
            orders_use:[],

            order_loop:{
                table:0,
                order_status:"",
                order_time:"",
                total_price:0,
                menus:{}
            },
            allMenus:[],
            allNames:[],
            filteredArray :[],

            allId:[],

            IdForChangeStatus:[],

            payload_order_status:{
                order_id: 0,
                order_status: 5,
              },
            

        }
    },
    async created(){
        await OrderApi.dispatch("waitForPayOrder")
        this.orders = OrderApi.getters.getWaitForPayOrders
        this.orders = this.orders.data
        // console.log("thishis.orders" , this.orders)
        // console.log("this.orders.length" , this.orders.length)

        for(let i = 0  , count = 0 ; i < this.orders.length ; i++ , count++)
        {
            console.log("==============================================")

            console.log("test1" , this.orders[i] )
            for(let j = 0 ; j < this.orders[i].length ; j++ )
            {
                

                if(j == 0)
                {
                    this.orders_use.push(this.orders[i][1])

                    this.allId.push(this.orders[i][1].id)
                    console.log("this.order_use.push" , this.orders[i][1])
                    console.log("this.order_use" , this.orders_use)
                    for(let z = 0 ; z < this.orders[i][1].menus.length ; z++ )
                    {
                        console.log("price 1 " , this.orders[i][1].menus[z].pivot.price)
                        console.log("QTY 1" , this.orders[i][1].menus[z].pivot.QTY)
                        if(this.orders[i][1].menus[z].pivot.QTY > 1)
                        {
                            // console.log("if = " , this.orders[i][1].menus[z].name_TH)
                            for(let x = 1 ; x < this.orders[i][1].menus[z].pivot.QTY ; x++)
                            {
                                console.log("if = " , this.orders[i][1].menus[z])
                                console.log("ifif = " , this.orders_use[count].menus)

                                // this.orders_use[count].menus.push(this.orders[i][1].menus[z])
                                console.log("x = " , x)
                                console.log("this.orders[i][1].menus[z].pivot.QTY = " , this.orders[i][1].menus[z].pivot.QTY)


                            }
                        }

                    }


                }
                else if(j > 1)
                {
                    this.orders_use[count].total_price += this.orders[i][j].total_price
                    this.allId.push(this.orders[i][j].id)

                    console.log("id = " ,this.orders[i][j].id)
                    for(let z = 0 ; z < this.orders[i][j].menus.length ; z++ )
                    {
                        console.log("price " , this.orders[i][j].menus[z].pivot.price)
                        console.log("QTY " , this.orders[i][j].menus[z].pivot.QTY)
                        if(this.orders[i][j].menus[z].pivot.QTY == 1)
                        {
                            this.orders_use[count].menus.push(this.orders[i][j].menus[z])

                        }
                        else
                        {
                            for(let x = 0 ; x < this.orders[i][j].menus[z].pivot.QTY ; x++)
                            {
                                console.log("for")
                                this.orders_use[count].menus.push(this.orders[i][j].menus[z])

                            }
                        }

                        // console.log("count" , count)
                        
                        // console.log("this.orders_use[count].menus" , this.orders_use[count].menus)

                        // console.log("menu = ", this.orders[i][j].menus[z])
                        // this.orders_use[count].menus.push(this.orders[i][j].menus[z])
                    }

                }
                // console.log("allId" , this.allId)

                // this.allId = []

            }
            console.log("allId" , this.allId)
            this.IdForChangeStatus.push(this.allId)
            this.allId = []

            console.log("==============================================")

        }

        console.log("this.order_use = ", this.orders_use)


        for(let i = 0   ; i < this.orders_use.length ; i++ )
        {
            console.log("this.orders_use[i].menus = ", this.orders_use[i].menus)

            this.allMenus = this.orders_use[i].menus.map(item => item.name_TH);
            console.log("allMenus", this.allMenus)
            
            for (let j = 0; j < this.allMenus.length; j++) {
                this.allNames[this.allMenus[j]] = (this.allNames[this.allMenus[j]] + 1) || 1;
            }

            console.log("allNames = ", this.allNames)

            this.filteredArray = Object.keys(this.allNames).reduce((acc, cur) => {
                acc.push({name: cur, result: this.allNames[cur]});
                return [...acc]
            }, [])

            console.log("this.filteredArray = ", this.filteredArray)
            this.orders_use[i].menus = this.filteredArray
            console.log(" this.orders_use[i]y = ",  this.orders_use[i])

            this.allMenus= []
            this.allNames= []
            this.filteredArray = []


        }
        console.log("this.order_use = ", this.orders_use)
        console.log("this.IdForChangeStatus = ", this.IdForChangeStatus)



    },
    methods:{
        forceUpdate(){
            console.log("resr")
            this.$forceUpdate()

        },
        async pay(order){
            console.log("id = " , order.id)
            for(let i = 0 ; i < this.IdForChangeStatus.length ; i++)
            {
                // console.log("1 = " , this.IdForChangeStatus[i])

                for(let j = 0 ; j < this.IdForChangeStatus[i].length ; j++)
                {
                    // console.log("2 = " , this.IdForChangeStatus[i][j])

                    if(order.id == this.IdForChangeStatus[i][j])
                    {
                        for(let z = 0 ; z < this.IdForChangeStatus[i].length ; z++)
                        {
                            console.log(this.IdForChangeStatus[i][z])
                            this.payload_order_status.order_id = this.IdForChangeStatus[i][z]
                            await OrderApi.dispatch("updateOrderStatus",this.payload_order_status)


                        }
                        // console.log(this.IdForChangeStatus[i])
                        this.$swal("จ่ายสำเร็จ" , `จ่ายเงินโต๊ะ ${order.table_number}`, "success");

                    }
                }
            }

            order.order_status = 'complete'
        }
    }
}
</script>

<style>

</style>