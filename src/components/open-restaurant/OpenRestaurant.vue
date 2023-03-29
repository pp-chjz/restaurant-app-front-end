<template>
  <div class="scroll-bg">
    <c-heading color="white" mt="10%" fontSize="6xl">
      Open Restaurant 
    </c-heading>

    <c-heading color="white" mt="3%" size="2xl">
      at {{ timestamp }}
    </c-heading>

    <div>
      <c-button class="button" @click='open()' width="25%" mt="10%" variant-color="yellow" height="60px"  variant="solid" size="lg">
        Confirm
      </c-button> 
    </div>

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
    CTextarea, CIconButton, CFormControl, 
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

@keyframes scrollBg {
  from {
    transform: translateY(0px);
  }
  to {
    transform: translateY(-330px);
  }
}

.scroll-bg {
  height: 100%;
  width: 100%;
  position: fixed;
  padding-bottom: 330px;
  background-color: #E8BA9B;
  background-image: url('https://andreivictor.ro/codepen/scroll-bg-animation-pinterest/bg_pasta_grid-3f880df3.jpg');
  background-size: cover;
  
}

</style>