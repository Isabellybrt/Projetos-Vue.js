import { createRouter, createWebHistory } from 'vue-router'
import Home from './components/Home.vue'
import ListCar from './components/ListCar.vue'
import AddCar from './components/AddCar.vue'
import EditCar from './components/EditCar.vue'
import ListClient from './components/ListClient.vue'
import AddClient from './components/AddClient.vue'
import EditClient from './components/EditClient.vue'
import ListModel from './components/ListModel.vue'
import AddModel from './components/AddModel.vue'
import EditModel from './components/EditModel.vue'
import ListBrand from './components/ListBrand.vue'
import AddBrand from './components/AddBrand.vue'
import EditBrand from './components/EditBrand.vue'
import ListRental from './components/ListRental.vue'
import AddRental from './components/AddRental.vue'
import EditRental from './components/EditRental.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/carros', component: ListCar },
  { path: '/carros/add', component: AddCar },
  { path: '/carros/edit/:id', component: EditCar },
  { path: '/clientes', component: ListClient },
  { path: '/clientes/add', component: AddClient },
  { path: '/clientes/edit/:id', component: EditClient },
  { path: '/modelos', component: ListModel },
  { path: '/modelos/add', component: AddModel },
  { path: '/modelos/edit/:id', component: EditModel },
  { path: '/marcas', component: ListBrand },
  { path: '/marcas/add', component: AddBrand },
  { path: '/marcas/edit/:id', component: EditBrand },
  { path: '/locacoes', component: ListRental },
  { path: '/locacoes/add', component: AddRental },
  { path: '/locacoes/edit/:id', component: EditRental },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router