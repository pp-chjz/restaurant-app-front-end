import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import LoginView from '../views/auth/LoginView.vue'
import FirstPage from '../views/FirstPage.vue'
import CreateMenuView from '../views/CreateMenuView.vue'
import CreateIngredientView from '../views/CreateIngredientView.vue'
import AllMenuView from '../views/AllMenuView.vue'
import EditMenuView from '../views/EditMenuView.vue'
import TableView from '../views/TableView.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/home',
    name: 'first',
    component: FirstPage
  },
  {
    path: '/createMenu',
    name: 'createMenu',
    component: CreateMenuView
  },
  {
    path: '/createIngredientView',
    name: 'createIngredientView',
    component: CreateIngredientView
  },
  {
    path: '/allMenuView',
    name: 'allMenuView',
    component: AllMenuView
  },
  {
    path: '/editMenuView/:id',
    name: 'editMenuView',
    component: EditMenuView
  },
  {
    path: '/tableView',
    name: 'tableView',
    component: TableView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
