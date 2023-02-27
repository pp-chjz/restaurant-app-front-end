<template>
    <div>
        <vs-button @click="popupActivo2=true" color="green" type="filled">เพิ่มโต๊ะ</vs-button>
            <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
            <vs-popup  title="ต้องการสร้างโต๊ะ" :active.sync="popupActivo2">
                <p class="name">ต้องการสร้างโต๊ะที่ {{ table_count }} ใช่หรือไม่</p>

                <c-flex align="center">
                    <c-flex  align="flex-end">
                        <c-button @click="cancel()" mt="2rem" width="full" variant-color="red" variant="solid" size="lg">
                            ยกเลิก
                        </c-button> 
                    </c-flex>
                    
                    <c-box>
                        <c-button @click="create()" mt="2rem" width="full" variant-color="green" variant="solid" size="lg">
                            ยืนยัน
                        </c-button> 
                    </c-box>
                </c-flex>

            </vs-popup>
        <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->

        {{  tables.data }}

    </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
import TableApi from "@/store/FoodTableApi.js"
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,
  } from "@chakra-ui/vue";

export default {
    name: 'AllTable',
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
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex ,

    },
    data(){
        return{
            tables:[],
            menu:[{menu_id:'not show'}],
            table_count:0,
            popupActivo2:false,
        }
    },
    async created(){
        console.log("All table Created");
        await this.fetchMenu()
    },
    methods:{
        async fetchMenu(){
            // console.log("fetchMenu")
            await TableApi.dispatch("fetchTable")
            this.tables = TableApi.getters.getTables
            this.table_count = this.tables.data.length + 1
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
            await this.fetchMenu()
            
            this.popupActivo2 = false   
        },
    }
    
}
</script>

<style>

</style>