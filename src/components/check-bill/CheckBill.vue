<template>
    <div>
        check bill page
        this.$forceUpdate()
        <c-button @click="forceUpdate" mr="4%" mb="3%" mt="5%" width="36%" variant-color="yellow" variant="solid" size="lg" :_hover="{bg: '#A0AEC0'}">
          Create Menu
        </c-button>

    </div>
</template>

<script>
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CStack, CImage,
  CBox, CGrid, CInputGroup, CSimpleGrid,
  CFormControl, CFormLabel, CHeading,CFlex,CCheckbox, CCheckboxGroup,
  CText  } from "@chakra-ui/vue";
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
        CStack, CFlex,CCheckbox, CCheckboxGroup,
    },
    data(){
        return{
        }
    },
    async created(){
    },
    methods:{
        forceUpdate(){
            console.log("resr")
            this.$forceUpdate()

        }
    }
}
</script>

<style>

</style>