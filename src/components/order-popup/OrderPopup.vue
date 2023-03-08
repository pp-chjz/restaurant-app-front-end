<template>
    <div>
        <c-button v-if="orders.order_status === 'new' || orders.order_status === 'cooking'" @click="popupActivo2=true" mt="2rem" width="full" variant-color="green" variant="solid" size="lg">
            จัดการออเดอร์
        </c-button> 
        <c-button v-if="orders.order_status === 'complete' || orders.order_status === 'wait_for_check_bill' || orders.order_status === 'all_served_unpaid'" @click="popupActivo2=true" mt="2rem" width="full" variant-color="green" variant="solid" size="lg" isDisabled="true">
            จัดการออเดอร์
        </c-button> 
        <!-- <c-button @click="popupActivo2=true" mt="2rem" width="full" variant-color="green" variant="solid" size="lg">
            จัดการออเดอร์
        </c-button>  -->
  
          <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
          <vs-popup title="จัดการออเดอร์" :active.sync="popupActivo2">
              
            
            <div v-for="menu in menus" :key="menu.id">

                <food-status-popup
                v-bind:menu="menu"
                v-bind:order_id="order_id"
                @saveInfo="editOrder"></food-status-popup>
            </div>
              <!-- <c-button  mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                <a @click='edit()' :href="'/orderView'">  confirm
                        </a>
              </c-button>  -->

              <c-button @click='edit()' mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                confirm
              </c-button> 
              

          </vs-popup>
          <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
    </div>
  </template>
  
  <script>
import FoodStatusPopup from "@/components/food-status-popup/FoodStatusPopup.vue"
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
          menus: Object,
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
          CGrid, CGridItem, CStack, CTextarea , CFormControl ,FoodStatusPopup
  
      },
      data(){
          return{
              comment:'',
              popupActivo2:false,
              popupActivo3:false,
              count:1,
              total_price:0,
              timestamp:"",
              form_payload:{
                  "cancel_status":1,
                  "order_status":1,
                  "total_price": 0,
                  "order_time":"1985-08-05 13:25:30",
                  "menus":[]
              },
              payload:{
                menu_id:0,
                food_status:0
              },
              payload_order_status:{
                order_id: 0,
                order_status: 0,
              },
              food_status:[],
              disabled: true,
            prepare: 0,
            served: 0,
          }
      },
      async created(){
          console.log("Select Menu Pop Up Created");
  
      },
      methods:{
          getNow() {
              const today = new Date();
              const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
              const dateTime = date +' '+ time;
              this.timestamp = dateTime;
          },
          async edit(){
            // this.$forceUpdate();
            // this.
            console.log("edit");
            this.payload_order_status.order_id = this.orders.id
            if(this.orders.order_status == 'new' || this.orders.order_status == 'cooking' || this.orders.order_status == 'all_served_unpaid')
            {
                
                for(let j = 0 ; j < this.orders.menus.length ; j++)
                {
                    if(this.orders.menus[j].pivot.food_status == 'cooking')
                    {
                        // console.log("food_status = " ,this.orders.menus[j].pivot.food_status)
                        this.payload_order_status.order_status = 2
                        await OrderApi.dispatch("updateOrderStatus",this.payload_order_status)
                        this.orders.order_status = 'cooking'

                    }
                    else if(this.orders.menus[j].pivot.food_status == 'prepare')
                    {
                        // console.log("food_status = " ,this.orders.menus[j].pivot.food_status)

                        this.prepare+=1
                    }
                    else if(this.orders.menus[j].pivot.food_status == 'served')
                    {
                        // console.log("food_status = " ,this.orders.menus[j].pivot.food_status)

                        this.served+=1
                        
                    }

                }
                if(this.prepare == this.orders.menus.length)
                {
                    this.payload_order_status.order_status = 1
                    await OrderApi.dispatch("updateOrderStatus",this.payload_order_status)
                    this.orders.order_status = 'new'


                    
                }
                else if(this.served == this.orders.menus.length)
                {
                    this.payload_order_status.order_status = 4
                    await OrderApi.dispatch("updateOrderStatus",this.payload_order_status)
                    this.orders.order_status = 'all_served_unpaid'




                }

                this.prepare = 0
                this.served = 0

            }
            this.popupActivo2=false

            

          },
          cancel(){
              this.popupActivo3 = false
          },
          editOrder() {
              // this.total_price = this.price * this.count
              this.getNow()
              let returnData = {
                  menu_id: this.id,
                  comment: this.comment,
                  status: 1,
                  food_status: 1,
                  order_time: this.timestamp,
                  QTY: this.count,
                  price: this.total_price,
                  complete_at: "1985-08-05 13:25:30",
              }
              this.name_TH = ""
              this.name_ENG = ""
              this.id = 0
              this.price = 0
              this.comment = ""
              this.count = 1
  
              console.log("returndata = ", returnData)
              this.form.push(returnData)
              console.log("form after = ", this.form)
  
              this.$emit('saveInfo',returnData)
              this.popupActivo2 =false
              this.popupActivo3 = false
  
  
          },
          summit(){
              console.log("id =" ,this.id)
          },
          addCount(){
              this.count++
              if (this.count >= 1) {
                  this.disabled = false
              }
          },
          deCount(){
              this.count--
              if (this.count == 0) {
                  this.disabled = true
              }
          }
      }
  }
  </script>
  
  <style>
  .name {
    font-size: 20px;
  }
  .con-vs-popup {
  z-index: 53000;
  }
  .vs-popup {
    width: 380px !important; 
    height: auto;
  }
  .vs-popup--content {
    width: auto !important;
    padding: 1rem;
    font-size: 1rem;
  }
  </style>