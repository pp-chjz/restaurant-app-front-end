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
      <router-link to="/">
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
      </router-link>

      <router-link to="/register">
        <c-menu :close-on-select="false">
          <c-menu-button mx="1" variant-color="red">
            Register
          </c-menu-button>
        </c-menu>
      </router-link>

      <router-link to="/login">
        <c-menu :close-on-select="false">
          <c-menu-button mx="1" variant-color="red">
            Login
          </c-menu-button>
        </c-menu>
      </router-link>
      
      <div>
        <router-link to="/createMenu">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              CreateMenu
            </c-menu-button>
          </c-menu>
        </router-link>
      </div>

      <div>
        <router-link to="/createIngredientView">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              createIngredient
            </c-menu-button>
          </c-menu>
        </router-link>
      </div>

      <div>
        <router-link to="/allMenuView">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              allMenu
            </c-menu-button>
          </c-menu>
        </router-link>
      </div>

      <div>
        <router-link to="/editMenuView">
          <c-menu :close-on-select="false">
            <c-menu-button mx="1" variant-color="red">
              EditMenu
            </c-menu-button>
          </c-menu>
        </router-link>
      </div>
      
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

