<template>
    <div>
        this is dashboard

        <c-flex ml="3%" mt="4%" align="center" mb="5%">
        
            <c-box >
                <c-select v-model="dateSelect" placeholder="Select Date" size="md">
                <option value="1">Today</option>
                <option value="2">This Week</option>
                <option value="4">This Month</option>
                <option value="3">This Year</option>
                </c-select>
            </c-box>

            
            <c-button @click='search()'  width="full" color="#2D3748" size="md" variant="solid" w="7%" ml="2%">
                search
              </c-button> 
              <c-button @click='clear()'  width="full" variant-color="yellow" variant="solid"  w="7%">
                clear
              </c-button> 
        </c-flex>


        <br>
        <c-text>Total Order : {{ totalOrdersCount  }}</c-text>

    </div>
</template>

<script>
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
              timestamp:"",
              totalOrders:[],
              totalOrdersCount:0,
              dateSelect:"",
          }
      },
    async created(){
        console.log("dashboard Created");
        this.getNow();
        console.log("date = ",this.timestamp)
        this.timestamp = "%" + this.timestamp + "%"
        await OrderApi.dispatch("fetchTotalOrdersByDate",this.timestamp)
        this.totalOrders = OrderApi.getters.getTotalOrdersByDate
        this.totalOrders = this.totalOrders.data
        this.totalOrdersCount = this.totalOrders.data.length

        console.log("this.totalOrdersCount = ", this.totalOrdersCount)
    },
    methods:{
        getNow() {
            const today = new Date();
            const year = today.getFullYear();
            const month = (today.getMonth()+1);
            const day = today.getDate();
            // console.log("month" , month)
            const dateTime = year + "-" + ('0' + month).slice(-2) + "-" + ('0' + day).slice(-2) 
            this.timestamp = dateTime;
        },
        search(){
            console.log("search")
        },
        clear(){
            console.log("clear")
        },
    }
}
</script>

<style>

</style>