<template>
   <div class="scroll-bg">
    <c-heading color="white" mt="10%" fontSize="6xl">
      Close Restaurant 
    </c-heading>

    <c-heading color="white" mt="3%" size="2xl">
      at {{ timestamp }}
    </c-heading>

    <div>
      <c-button class="button" @click='close()' width="25%" mt="10%" variant-color="yellow" height="60px" variant="solid" size="lg">
        Confirm
      </c-button> 
    </div>

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