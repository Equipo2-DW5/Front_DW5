import { createRouter, createWebHistory } from 'vue-router'
import Register from '../views/Register.vue'
import Reserva from '../views/Reserva.vue'
import Login from '../views/Login.vue'


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/reserva',
    name: 'reserva',
    component: Reserva
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
