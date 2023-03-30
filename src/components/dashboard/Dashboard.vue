<template>
    <div >
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
        > Dashboard </c-heading>

        <c-heading
            size="lg"
            mr="77%"
            mt="1rem"
            color="white"
            opacity="0.8"
            lineHeight="1.5"
            white-space="pre-line"
        > {{ "Summaries : " }} {{ summary_text }}
        </c-heading>
        <c-divider mt="1%" border-color="white" />

        <c-flex ml="3%" mt="4%" align="center" mb="5%">
        
            <c-box >
                <c-select v-model="dateSelect" placeholder="Select Date" size="md">
                <option value="1">Today</option>
                <option value="2">This Week</option>
                <option value="3">This Month</option>
                <option value="4">This Year</option>
                </c-select>
            </c-box>

            
                <date-pick
                    class="date"
                    v-model="dateSelectValue"
                    :format="'YYYY-MM-DD'"
                >
                </date-pick>
            
            <c-button @click='search()'  width="full" color="#2D3748" size="md" variant="solid" w="7%" ml="2%">
                search
              </c-button> 
              <c-button @click='clear()'  width="full" variant-color="yellow" variant="solid"  w="7%">
                clear
              </c-button> 
        </c-flex>


        <c-flex ml="%">
            <c-box class="total" mx="40px" bg="white" border-width="3px" rounded="lg" overflow="hidden" border-color="white">
                <c-flex>
                    <c-text color="black" fontSize="2xl" fontWeight="bold"> {{ totalRevenue }} </c-text> 
                    <c-text fontSize="xl" fontWeight="bold" mx="4%" mt="4%">Baht </c-text>
                </c-flex>
                
                <c-text color="black" > Total Revenue </c-text> 
            </c-box>

            <c-box class="total" bg="white" border-width="3px" rounded="lg" overflow="hidden" border-color="white">
                <c-text fontSize="2xl" fontWeight="bold"> {{ totalOrdersCount  }} </c-text>
                <c-text color="black" > Total Order </c-text> 
            </c-box>
            
        </c-flex>
        
        <br>
        <c-box class="summary" ml="3%" mt="1%" border-width="3px" rounded="lg" overflow="hidden" border-color="white">
            <c-text color="black" fontSize="2xl" fontWeight="bold">Most Type Of Order</c-text>
            <img class="image_chart" style="width:45%;" src="@/assets/chart.png"/>
            <c-simple-grid  ml="5%" spacing="8" >
               
                <div v-for="index in catagory_count" :key="index.id">
                    
                    <c-text fontSize="xl" fontWeight="bold" color="black" mr="70%"> {{ index.name }} </c-text>
                    <c-text fontSize="lg" color="black"> {{ index.count }} dished ordered</c-text>
                </div>
            </c-simple-grid>
            
        </c-box>
        <!-- <c-divider mt="1%" border-color="white" /> -->

        <br>
        <c-box class="sum_menu" border-color="white" border-width="3px" rounded="lg" overflow="hidden" >
            <c-text color="black" fontSize="2xl" fontWeight="bold">Most Ordered</c-text>
            
            <c-simple-grid  spacing="8" mt="5%" >
                <div v-for="index in menus.data" :key="index.id" >
                    <c-flex w="120%">
                        <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/50" rounded="full" />
                        <c-text color="black" mt="3%" mx="10%"> {{ index.name_ENG  }}</c-text>
                        
                        <c-text  color="black" mt="3%" mx="5%"> {{ index.sort_menu  }} </c-text>
                    </c-flex>
                        
                </div>
            </c-simple-grid>

        </c-box>
    </c-box>

    </div>
</template>

<script>
import OrderApi from "@/store/OrderApi.js"
import IngredientApi from "@/store/IngredientApi.js"
import MenuApi from "@/store/MenuApi.js"
import DatePick from 'vue-date-pick';
import 'vue-date-pick/dist/vueDatePick.css';

import { CInput,CSelect,CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper,
        CButton, CImage, CSimpleGrid, CBox,
        CBadge, CFlex, CText, CHeading, CIcon,
        CStatNumber, CDivider, CStack
} from "@chakra-ui/vue";


export default {
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper, CDivider,
        CButton, CText, CHeading, CIcon,
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex , DatePick,
        CStatNumber, CStack

    },
    data(){
          return{
              timestamp:"",
              totalOrders:[],
              totalOrdersCount:0,
              totalRevenue:0,
              dateSelect:"",
              dateSelectValue:"Select Date",
              payloadTotalOrders:{
                timestamp:"",
                type:"",
              },
              month_use:0,
              year_use:0,
              summary_text:"today",
              totalCatagory:[],
              ingredients:[],
              ingredient_array:[],

              ingredient_count:{
                name:"",
                count:0,
              },

              catagory_count:[
                {name:"food",
                count:0},
                {name:"drink",
                count:0},
                {name:"dessert",
                count:0},
              ],

              menus:{},
              menu_array:[],
              menu_count:{
                name:"",
                count:0,
              },

          }
      },
    async created(){
        console.log("dashboard Created");
        this.getNow();
        this.timestamp = "%" + this.timestamp + "%"
        this.payloadTotalOrders.timestamp = this.timestamp
        this.payloadTotalOrders.type = "day"
        await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
        await IngredientApi.dispatch("fetchIngredient")
        
        this.countMenu()

        this.countCatagory()



        this.ingredients = IngredientApi.getters.getIngredients
        this.totalOrders = OrderApi.getters.getTotalOrdersByDate


        this.totalOrders = this.totalOrders.data
        this.getTotalRevenue(this.totalOrders)
        this.totalOrdersCount = this.totalOrders.data.length


        console.log("this.totalOrdersCount = ", this.totalOrdersCount)
        console.log("this.totalCatagory = ", this.totalCatagory)


    },
    methods:{
        getNow() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth()+1);
            const day = today.getDate();
            const dateTime = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2) 
            this.month_use = ('0' + month).slice(-2)
            this.year_use = year
            this.timestamp = dateTime;

        },
        async search(){
            console.log("search")
            if(this.dateSelectValue == "Select Date")
            {
                console.log(this.dateSelect)
                if(this.dateSelect == "1")
                {
                    this.summary_text = "today"

                    this.getNow();
                    this.timestamp = "%" + this.timestamp + "%"
                    this.payloadTotalOrders.timestamp = this.timestamp
                    this.payloadTotalOrders.type = "day"
                    this.countCatagory()
                    this.countMenu()


                    await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
                    this.totalOrders = OrderApi.getters.getTotalOrdersByDate
                    this.totalOrders = this.totalOrders.data
                    this.getTotalRevenue(this.totalOrders)
                    this.totalOrdersCount = this.totalOrders.data.length
                    this.$forceUpdate()
                    
                }
                else if(this.dateSelect == "2")
                {
                    this.summary_text = "this week"
                    this.payloadTotalOrders.timestamp = this.month_use
                    this.payloadTotalOrders.type = "week"
                    this.countCatagory()
                    this.countMenu()
                    await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
                    this.totalOrders = OrderApi.getters.getTotalOrdersByDate
                    this.totalOrders = this.totalOrders.data
                    this.getTotalRevenue(this.totalOrders)
                    this.totalOrdersCount = this.totalOrders.data.length
                    this.$forceUpdate()

                }
                else if(this.dateSelect == "3")
                {
                    this.summary_text = "this month"


                    this.getNow();
                    console.log("month")

                    this.month_use = "%" + this.month_use + "%"
                    this.payloadTotalOrders.timestamp = this.month_use
                    this.payloadTotalOrders.type = "month"
                    this.countCatagory()
                    this.countMenu()

                    await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
                    this.totalOrders = OrderApi.getters.getTotalOrdersByDate
                    this.totalOrders = this.totalOrders.data
                    this.getTotalRevenue(this.totalOrders)
                    this.totalOrdersCount = this.totalOrders.data.length
                    this.$forceUpdate()
                }
                else if(this.dateSelect == "4")
                {
                    this.summary_text = "this year"


                    this.getNow();
                    console.log("year")

                    this.year_use = "%" + this.year_use + "%"
                    this.payloadTotalOrders.timestamp = this.year_use
                    this.payloadTotalOrders.type = "year"
                    this.countCatagory()
                    this.countMenu()
                    await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
                    this.totalOrders = OrderApi.getters.getTotalOrdersByDate
                    this.totalOrders = this.totalOrders.data
                    this.getTotalRevenue(this.totalOrders)
                    this.totalOrdersCount = this.totalOrders.data.length
                    this.$forceUpdate()
                }
            }
            else
            {
                this.summary_text = this.dateSelectValue

                this.dateSelectValue = "%" + this.dateSelectValue + "%"
                this.payloadTotalOrders.timestamp = this.dateSelectValue
                this.payloadTotalOrders.type = "day"
                this.countCatagory()
                this.countMenu()
                await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
                this.totalOrders = OrderApi.getters.getTotalOrdersByDate
                this.totalOrders = this.totalOrders.data
                this.getTotalRevenue(this.totalOrders)
                this.totalOrdersCount = this.totalOrders.data.length
                this.$forceUpdate()

            }
        },
        async clear(){
            console.log("clear")
            
            this.getNow();
            this.summary_text = "today"
            this.timestamp = "%" + this.timestamp + "%"
            this.payloadTotalOrders.timestamp = this.timestamp
            this.payloadTotalOrders.type = "day"
            this.countCatagory()
            this.countMenu()
            await OrderApi.dispatch("fetchTotalOrdersByDate",this.payloadTotalOrders)
            this.totalOrders = OrderApi.getters.getTotalOrdersByDate
            this.totalOrders = this.totalOrders.data
            this.getTotalRevenue(this.totalOrders)
            this.totalOrdersCount = this.totalOrders.data.length

            this.dateSelect="",
            this.dateSelectValue="Select Date"
        },
        getTotalRevenue(orders){
            this.totalRevenue = 0
            for(let i = 0 ; i < orders.data.length ; i++)
            {
                // console.log("price = " , orders.data[i].total_price)
                this.totalRevenue += orders.data[i].total_price
            }
        },
        async countMenu(){
            await MenuApi.dispatch("fetchMenu")
            this.menus = MenuApi.getters.getMenus
            await OrderApi.dispatch("fetchTotalCatagoryByDate",this.payloadTotalOrders)
            this.totalCatagory = OrderApi.getters.getTotalCatagoryByDate

            for(let i = 0 ; i < this.totalCatagory.data.length ; i++)
            {
                console.log("name_ENG ======= " , this.totalCatagory.data[i].name_ENG_dashboard)

                for(let j = 0 ; j < this.menus.data.length ; j++)
                {
                    console.log("name_ENG = " , this.totalCatagory.data[i].name_ENG_dashboard)
                    console.log("this.menus[j].data.name = " , this.menus.data[j].name_ENG)

                    if(this.totalCatagory.data[i].name_ENG_dashboard == this.menus.data[j].name_ENG)
                    {
                        if(this.totalCatagory.data[i].QTY > 1)
                        {
                            console.log("if name =",this.totalCatagory.data[i].name_ENG_dashboard)
                            console.log("if QTY =",this.totalCatagory.data[i].QTY)
                            this.menus.data[j].sort_menu += this.totalCatagory.data[i].QTY
                        }
                        else
                        {
                            console.log("else name =",this.totalCatagory.data[i].name_ENG_dashboard)
                            console.log("else QTY =",this.totalCatagory.data[i].QTY)
                            this.menus.data[j].sort_menu += this.totalCatagory.data[i].QTY


                        }
                    }
                    
                }
            }

            this.menus.data.sort((a, b) => b.sort_menu - a.sort_menu);


        },
        async countCatagory(){
            this.catagory_count = [
                {name:"food",
                count:0},
                {name:"drink",
                count:0},
                {name:"dessert",
                count:0},
              ],
            await OrderApi.dispatch("fetchTotalCatagoryByDate",this.payloadTotalOrders)
            this.totalCatagory = OrderApi.getters.getTotalCatagoryByDate
            for(let i = 0 ; i < this.totalCatagory.data.length ; i++)
            {
                // console.log("this.totalCatagory = ", this.totalCatagory.data[i].catagories_dashboard)

                for(let j = 0 ; j < this.catagory_count.length ; j++)
                {
                    // console.log("this.catagory_count = ", this.catagory_count[j].name)
                    if(this.totalCatagory.data[i].catagories_dashboard == this.catagory_count[j].name)
                    {
                        if(this.totalCatagory.data[i].QTY >1)
                        {
                            this.catagory_count[j].count += this.totalCatagory.data[i].QTY
                            
                        }
                        else
                        {
                            this.catagory_count[j].count += 1

                        }
                    }

                    // this.ingredient_array.push(this.ingredient_count)
                }
            }

            this.catagory_count.sort((a, b) => b.count - a.count);
            // console.log("this.catagory_count = ", this.catagory_count)
        }
    }
}
</script>

<style>
.date {
   font-size: 16px;
   margin-left: 2%;
}

.total {
    /* display: flex; */
    flex-direction: column;
    align-items: flex-start;
    padding: 66px;
    gap: 8px;
    width: 249px;
    height: 143px;
}

.summary {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 24px;
    background-color: rgb(132, 233, 194);
    width: 372px;
    height: 500px;
    top: 409px;
}

.sum_menu {
    background-color: rgb(207, 140, 58);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
    gap: 20px;
    position: absolute;
    width: 372px;
    height: 596px;
    left: 45%;
    top: 425px;
}

.image_chart {
    margin-left: 25%;
}
</style>