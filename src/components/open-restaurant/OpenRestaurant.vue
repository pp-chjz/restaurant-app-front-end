<template>
  <div>
    เปิดร้านวันที่ {{  timestamp }}
    <c-button @click='open()' mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                ยืนยัน
    </c-button> 

  </div>
</template>

<script>
import OrderApi from "@/store/OrderApi.js"
import AuthUser from '@/store/AuthUser'
import backendInstance, { auth } from "@/services/backendInstance";


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
          console.log("Open Restaurant Created" , auth);
          this.getNow();
  
      },
      methods:{
          getNow() {
              const today = new Date();
              const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
              const dateTime = date 
              this.timestamp = dateTime;
          },
          async open(){
            this.$swal("เปิดร้านสำเร็จ", `เปิดร้านวันที่ ${this.timestamp}`, "success")

            await AuthUser.dispatch("open");
            localStorage.setItem('close', JSON.stringify("no"));

            this.$router.push("/orderView");

          }
          
      }
}
</script>

<style>

</style>