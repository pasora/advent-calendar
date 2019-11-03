import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Logout from '../views/Logout.vue'
import Calendar from '../views/Calendar'
// import firebase from 'firebase/app'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'calendar',
    component: Calendar
  },
  {
    path: '/success',
    name: 'success',
    component: Calendar
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/logout',
    name: 'logout',
    component: Logout
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeResolve((to, from, next) => {
//   if (to.path === '/login') {
//     next()
//   } else {
//     firebase.auth().onAuthStateChanged(user => {
//       if (user) {
//         next()
//       } else {
//         next({path: '/login'})
//       }
//     })
//   }
// });

export default router
