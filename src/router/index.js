import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Login from '../views/Login'
import Logout from '../views/Logout'
import Calendar from '../views/Calendar'
import Profile from '../views/Profile'
import firebase from 'firebase/app'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/calendar/:id',
    name: ':id',
    component: Calendar
  },
  {
    path: '/success',
    name: 'success',
    component: Calendar
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
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

router.beforeResolve((to, from, next) => {
  if (to.path === "/success") {
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      if (user.displayName != null) {
        next()
      } else {
        next({path: '/profile'})
      }
    })
  } else {
    next()
  }
  if (to.path === "/profile") {
    firebase.auth().onAuthStateChanged(user => {
      // eslint-disable-next-line no-console
      console.log(user);
      if (user != null) {
        next()
      } else {
        next({path: '/login'})
      }
    })
  } else {
    next()
  }
});

export default router
