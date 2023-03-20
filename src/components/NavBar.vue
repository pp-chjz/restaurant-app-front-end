<template>
    <div id="app">
      <c-simple-grid
      class="navbar"
      :columns="[1]"
        as="nav"
        px="2vw"
        py="5"
        pr="60vh"
        w="100%"
        h="80px"
        alignItems="center"
        justifyContent="space-around"
        :display="['block', 'grid', 'grid', 'grid']"
      >
      
      <c-flex
          wrap="wrap"
          justify="center"
          :direction="['column', 'row', 'row', 'row']"
        >
        <!-- <router-link to="/">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              Home
            </c-menu-button>
          </c-menu>
        </router-link>
  
        <router-link to="/about">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              About
            </c-menu-button>
          </c-menu>
        </router-link> -->
  
        <div v-if="!isLogin()">
            <router-link to="/register">
                <c-menu :close-on-select="false">
                    <c-menu-button mx="1" variant-color="red">
                    Register
                    </c-menu-button>
                </c-menu>
            </router-link>
        </div>
  
        <div v-if="!isLogin()">
            <router-link to="/login">
                <c-menu :close-on-select="false">
                    <c-menu-button mx="1" variant-color="red">
                    Login
                    </c-menu-button>
                </c-menu>
            </router-link>
        </div>


        <div v-if="openRes()">
          <router-link to="/openRestaurantView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Open Restaurant
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>

        <div v-if="openRes()">
          <router-link to="/closeRestaurantView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Close Restaurant
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
        
        <div v-if="openRes()">
          <router-link to="/createMenu">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Creat Menu
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/createIngredientView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Create Ingredient
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/allMenuView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                All Menu
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/allIngredientView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                All Ingredient
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/tableView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                All Table
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
  
        <div  v-if="isOpen()">
          <router-link to="/orderView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                All Order
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/checkBillView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Checkbill
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <div  v-if="isOpen()">
          <router-link to="/dashboardView">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Dashboard
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>

        <div  v-if="isLogOut() ">
          <router-link to="/login">
            <c-menu :close-on-select="false">
              <c-menu-button @click="logout" mx="1" variant-color="red">
                Log Out
              </c-menu-button>
            </c-menu>
          </router-link>
        </div>
  
        <!-- <div v-if="isAuthen()">
          <router-link to="/home">
            <c-menu :close-on-select="false">
              <c-menu-button mx="1" variant-color="red">
                Log out
              </c-menu-button>
            </c-menu>
          </router-link>
        </div> -->
        
      </c-flex>
      </c-simple-grid>
      <router-view/>
    </div>
  </template>
  
  <script>
  import AuthUser from '@/store/AuthUser'
  import { CText, CFlex, CMenu, CMenuButton, CSimpleGrid } from '@chakra-ui/vue';
  export default {
    name: "app",
    components: { 
      CText, 
      CMenu,
      CMenuButton,
      CSimpleGrid,
      CFlex
    },
    data(){
          return{
              ingredient_status:'',
              form:{
                  ingredient_status:0,
                  QTY:0,
                  ingredient_ID:"ingredient_ID",
                  ingredient_name_ENG:"",
                  ingredient_name_TH:"",
                  recipe_id:0,
              },
              logedIn:"",
              count:0,
          }
      },
      async created(){
          console.log("App Created");
          localStorage.setItem('logedIn', "no");

      },
      methods:{
        isLogin(){
            console.log("AuthUser.getters.isAuthen" , AuthUser.getters.isAuthen)
            return AuthUser.getters.isAuthen
        },
        isLogOut(){
            console.log("AuthUser.getters.isAuthen" , AuthUser.getters.isAuthen)
            return AuthUser.getters.isAuthen
        },
        isOpen(){
            console.log("isOpen" , AuthUser.getters.isOpen)
            console.log("isAuthen" , AuthUser.getters.isAuthen)

            if(AuthUser.getters.isOpen || AuthUser.getters.isAuthen )
                return false
        },
        openRes(){
            console.log("openRes isOpen" , AuthUser.getters.isOpen)
            console.log("openRes isAuthen" , AuthUser.getters.isAuthen)
            if(!AuthUser.getters.isOpen || AuthUser.getters.isAuthen )
            {
                console.log("return false")

                return false

            }
            if(AuthUser.getters.isOpen || AuthUser.getters.isAuthen)
            {
                console.log("return true")

                return true

            }
        },
        async logout(){
            let res = await AuthUser.dispatch("logout");
          this.$swal("ออกจากระบบสำเร็จ" , "success");

          this.$router.push("/login");
        }
      }
  };
  </script>
  
  <style lang="scss">
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  
  nav {
    padding: 30px;
  
    a {
      font-weight: bold;
      color: #2c3e50;
  
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
  
  .navbar {
    background:#1B2527;
  }
  
  .homeImage {
    height: 4rem;
  }
  </style>
  
  