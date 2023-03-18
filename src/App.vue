<template>
    <div>
    <nav-bar/>
</div>
</template>

<script>
import AuthUser from '@/store/AuthUser'
import { CText, CFlex, CMenu, CMenuButton, CSimpleGrid } from '@chakra-ui/vue';
import NavBar from '@/components/NavBar.vue'

export default {
  name: "app",
  components: { 
    CText, 
    CMenu,
    CMenuButton,
    CSimpleGrid,
    CFlex,
    NavBar
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
            }
        }
    },
    async created(){
        console.log("App Created");
    },
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

