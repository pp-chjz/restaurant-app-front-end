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
        mr="85%"
        mt="2rem"
        color="white"
        opacity="0.8"
        fontWeight="bold"
        lineHeight="1.5"
        white-space="pre-line"
        >
        {{ "Table" }}
        </c-heading>

       <!-- ช่องสำหรับ add table -->
       <c-box ml="82%">
            <vs-button  @click="popupActivo2=true" size="lg" color="green" type="filled">
                <c-text fontSize="lg">
                    Add table
                </c-text>
                
            </vs-button>
            <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
            <vs-popup  title="ต้องการสร้างโต๊ะ" :active.sync="popupActivo2"  >
                <p class="name"> ต้องการสร้างโต๊ะที่ {{ table_count }} ใช่หรือไม่</p>

                <c-flex align="center">
                    <c-flex  align="flex-end">
                        <c-button @click="cancel()" mt="2rem" mx="2" width="full" variant-color="red" variant="solid" size="lg">
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
        </c-box>
        <!-- ช่องสำหรับ add table -->

    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10">
    <div v-for="index in tables.data" :key="index.id">
        <!-- ช่องสำหรับแสดงโต๊ะทั้งหมด -->
        <c-box m="2rem" maxW="sm" border-width="3px" rounded="lg" overflow="hidden" border-color="white" bg="#9FDDB9" fontSize="xl">
            <c-box v-if="index.tablenum_status === 'avaliable'" bg="green.200" color="black"
                    mt="8%"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated>
                <c-text fontWeight="bold" fontSize="xl"> Table {{ index.id }}</c-text>
            </c-box>

            <c-box v-if="index.tablenum_status === 'full'" bg="red.200" color="black"
                    mt="8%"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated>
                <c-text fontWeight="bold" fontSize="xl"> Table {{ index.id }}</c-text>
            </c-box>
            <!-- <c-box
                    color="black"
                    mt="8%"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    Table {{ index.id }}
                </c-box> -->
            <c-box p="4">
                <c-box
                color="black"
                    mt="1"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    {{ index.table_count}}
                </c-box>
            </c-box>
        </c-box>
        <!-- ช่องสำหรับแสดงโต๊ะทั้งหมด -->
        
    </div>
    </c-simple-grid>
    </c-box>
    {{ tables.data }}
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
  CStack
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
        CNumberDecrementStepper, CStack,
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
        await this.fetchTable()
    },
    methods:{
        async fetchTable(){
            // console.log("fetchTable")
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
            await this.fetchTable()
            
            this.popupActivo2 = false   
        },
    }
    
}
</script>

<style>

.name {
    font-size: medium;
}

</style>