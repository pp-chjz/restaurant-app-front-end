<template>
  <div>
    <h1>This is an All menu</h1>
    <c-simple-grid :columns="[1, 1, 1, 3]" spacing="10" m="10">
    <div v-for="index in menu" :key="index.id">

        <!-- ช่องสำหรับ add menu -->
        <div v-if="index.menu_id === 'true' ">
            <c-box  mt="4rem" m="2rem" maxW="sm" border-width="3px" rounded="lg" overflow="hidden" border-color="black" :_hover="{bg: 'indigo.100' , borderColor:'indigo'}" fontSize="xl">
                <c-box
                    mt="1"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    Add new Dish
                </c-box>


                <c-flex jusify="center">
                    <c-button  mt="1rem" bgColor="black" color="white" size="lg" :_hover="{bg: 'pink.400'}" >
                        <a @click='edit(index.id)' :href="'/createMenu'" v-bind="index">Add dish</a>

                    </c-button>
                </c-flex>
            </c-box>
        </div>
        <!-- ช่องสำหรับ add menu -->


        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->
        <c-box v-if="index.menu_id === 'false'"  mt="4rem" m="2rem" maxW="sm" border-width="3px" rounded="lg" overflow="hidden" border-color="black" :_hover="{bg: 'indigo.100' , borderColor:'indigo'}" fontSize="xl">
            
            <!-- <c-image :src="index.image[0].path" alt="cat" /> -->
            <c-image
                size="150px"
                objectFit="cover"
                src="https://bit.ly/chakra-naruto-uzumaki"
                alt="PICTURE"
            />
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
                    mt="1"
                    font-weight="semibold"
                    as="h4"
                    line-height="tight"
                    is-truncated
                >
                    {{ index.name_ENG }}
                </c-box>

                <c-box
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
                        color="gray.500"
                        font-weight="semibold"
                        letter-spacing="wide"
                        font-size="0.75em"
                        text-transform="uppercase"
                        ml="2"
                        >
                        {{ index.price }} bath
                        <!-- {{ index.price }} bath &bull; {{ index.QTY }} bowls -->
                    </c-box>

                <c-flex jusify="center">
                    <c-button  mt="1rem" bgColor="black" color="white" size="lg" :_hover="{bg: 'pink.400'}" >
                        <a @click='edit(index.id)' :href="'/editMenuView/'+index.id" v-bind="index">Edit dish</a>

                    </c-button>
                </c-flex>
                <!-- <c-flex jusify="center" v-if="index.apply">
                    <c-text color="red">คุณสมัครงานนี้ไปแล้ว</c-text>
                </c-flex>
                <c-button  mt="1rem" border="1px" bgColor="white" color="red" size="lg" :_hover="{bg: 'red' ,color:'white' , borderColor:'red'}">
                        <a @click='report(index.id)' v-bind="index">REPORT</a>
                </c-button> -->
            </c-box>
        </c-box>
        <!-- ช่องสำหรับแสดงเมนูทั้งหมด -->




    </div>
    </c-simple-grid>
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
  CButton , CImage,CSimpleGrid , CBox,
  CBadge,CFlex    } from "@chakra-ui/vue";

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
        CButton ,
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex 
    },
    data(){
        return{
            menus:[],
            menu:[{menu_id:'not show'}],
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
