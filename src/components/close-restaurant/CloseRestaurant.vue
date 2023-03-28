<template>
  <div>
    ปิดร้านวันที่ {{  timestamp }}
    <c-button @click='close()' mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                ยืนยัน
    </c-button> 

  </div>
</template>

<script>
import OrderApi from "@/store/OrderApi.js"
import AuthUser from '@/store/AuthUser'

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
            timestamp:""
          }
      },
      async created(){
          console.log("Open Restaurant Created");
          this.getNow();
  
      },
      methods:{
          getNow() {
              const today = new Date();
              const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              const dateTime = date 
              this.timestamp = dateTime;
          },
          async close(){
            this.$swal("ปิดร้านสำเร็จ", `ปิดร้านวันที่ ${this.timestamp}`, "success")

            await AuthUser.dispatch("close");
            localStorage.setItem('close', JSON.stringify("yes"));

            this.$router.push("/openRestaurantView");

          }
          
      }
}
</script>

<style>

</style>