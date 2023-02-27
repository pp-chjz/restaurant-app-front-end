import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Chakra, {
  CThemeProvider,
  CColorModeProvider,
  CBox,
  CReset,
} from "@chakra-ui/vue";
import VueSwal from "vue-swal";
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'


Vue.use(Chakra)
Vue.use(Vuesax, {
  // options here
})
Vue.use(VueSwal)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  render(h) {
    // Mount our application inside the
    // ThemeProvider and ColorModeProvider components :)

    // You can also do this inside the App.vue file if you wish :)
    // See example at https://github.com/chakra-ui/chakra-ui-vue#usage
    return h(CThemeProvider, [
      h(CColorModeProvider, [h(CBox, [h(CReset), h(App)])]),
    ]);
  },
}).$mount('#app')

Vue.use(VueSwal);
