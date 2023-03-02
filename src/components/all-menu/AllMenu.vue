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
        mr="67%"
        mt="2rem"
        color="white"
        opacity="0.8"
        fontWeight="normal"
        lineHeight="1.5"
        white-space="pre-line"
        >
        {{ "Products Management" }}
        </c-heading>
    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10">
    <div v-for="index in menu" :key="index.id">

        <!-- ช่องสำหรับ add menu -->
        <div v-if="index.menu_id === 'true' "> 
            <c-box class="box"  mt="4rem" m="2rem" maxW="sm" height="430px"  rounded="lg" overflow="hidden"  border-color="salmon" bg="#1F1D2B" fontSize="xl">
                <c-flex jusify="center" >
                    <c-button  ml="40%" color="#FD821B" size="lg" variant-color="white" mt="45%">
                        <a @click='edit(index.id)' :href="'/createMenu'" v-bind="index"> 
                            <c-icon name="add"/>
                        </a>
                        <!-- <a @click='edit(index.id)' :href="'#/job/'+index.id" v-bind="index">Edit dish</a> -->

                    </c-button>
                </c-flex>

                <c-box
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    <c-text color="#EA7C69">
                        Add new dish
                    </c-text>
                
                </c-box>
            </c-box>
        </div>
        <!-- ช่องสำหรับ add menu -->


        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->
        <c-box v-if="index.menu_id === 'false'"  m="2rem" maxW="sm" border-width="3px" rounded="lg" overflow="hidden" border-color="#393C49" bg="#1F1D2B" fontSize="xl">
            
            <!-- <c-image :src="index.image[0].path" alt="cat" /> -->
            <!-- <c-image src="gibberish.png" fallback-src="https://via.placeholder.com/150" ml="30%" mt="3%"/> -->
            <img class="image" v-show:"image" :src="image"/>
            
            <!-- <c-image
                size="150px"
                objectFit="cover"
                src="gibberish.png"
                alt="PICTURE"
            /> -->
            <c-box p="6">
                <c-box d="flex" align-items="baseline">
                    <c-badge rounded="full" px="5" variant-color="green" font-size="0.75em" v-if="index.menu_status === 'in stock'">
                    IN STOCK
                    </c-badge>
                    <c-badge rounded="full" px="5" variant-color="red" font-size="0.75em" v-if="index.menu_status === 'out of stock'">
                    OUT OF STOCK
                    </c-badge>

                    <c-badge rounded="full" px="5" variant-color="yellow" font-size="0.75em" v-if="index.catagories === 'food'">
                    FOOD
                    </c-badge>
                    <c-badge rounded="full" px="5" variant-color="blue" font-size="0.75em" v-if="index.catagories === 'drink'">
                    DRINK
                    </c-badge>
                    <c-badge rounded="full" px="5" bg="#FED7E2" font-size="0.75em" v-if="index.catagories === 'dessert'">
                    DESSERT
                    </c-badge>

                
                </c-box>
                <c-box
                    color="white"
                    mt="8%"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    {{ index.name_ENG }}
                </c-box>

                <c-box
                color="white"
                    mt="1"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    {{ index.name_TH }}
                </c-box>

                <c-box
                        mt="1.5rem"
                        color="#ABBBC2"
                        font-weight="semibold"
                        letter-spacing="wide"
                        font-size="0.75em"
                        text-transform="uppercase"
                        ml="2"
                        >
                        {{ index.price }} baht
                        <!-- {{ index.price }} bath &bull; {{ index.QTY }} bowls -->
                    </c-box>

                <c-flex jusify="center">
                    <c-button ml="4%" w="100rem" mt="1rem" size="lg" variant-color="orange" >
                        <a @click='edit(index.id)' :href="'/editMenuView/'+index.id" v-bind="index">Edit dish</a>
                    </c-button>
                </c-flex>

            </c-box>
        </c-box>
        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->
    </div>
    </c-simple-grid>
    </c-box>
  </div>
</template>

<script>
import IngredientApi from "@/store/IngredientApi.js"
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,
  } from "@chakra-ui/vue";

export default {
    name: 'All Menu',
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
            menus:[],
            menu:[{menu_id:'not show'}],
            image:"@/assets/saen.png"
        }
    },
    async created(){
        console.log("AllMenuPage Created");
        await this.fetchMenu()
    },
    methods:{
        async fetchMenu(){
            // console.log("fetchMenu")
            await MenuApi.dispatch("fetchMenu")
            this.menus = MenuApi.getters.getMenus
            console.log(this.menus)
            for(let i = 0; i<this.menus.data.length ; i++){
                this.menu.push(this.menus.data[i])
            }
            this.menu[0].menu_id = 'true';
        },
        edit(id){
            console.log("index.id = ", id)
            console.log("menu = ", this.menu)
        }
    }
}
</script>

<style>
.box {
        border: dashed 3px #EA7C69;
    }
</style>
