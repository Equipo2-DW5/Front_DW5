import { createRouter, createWebHistory } from "vue-router";
import Register from "../views/Register.vue";
import Reserva from "../views/Reserva.vue";
import Login from "../views/Login.vue";
import GetReservasByUserfrom from "../components/getReservationByUser";
import CreateReservation from "../components/createReservation.vue";
import Settings from "../components/settings.vue";
function guardMyroute(to, from, next) {
  var isAuthenticated = false;
  if (localStorage.getItem("LoggedUser")=== true) isAuthenticated = true;
  else isAuthenticated = false;
  if (isAuthenticated) {
    next(); // allow to enter route
  } else {
    next("/"); // go to '/login';
  }
}
const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    
  },
  {
    path: "/reservation",
    name: "reservation",
    component: Reserva,
    children: [
      {
        path: "create",
        component: CreateReservation,
      },
      {
        path: "your-reservations",
        component: GetReservasByUserfrom,
      },
      {
        path: "settings",
        component: Settings,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
