import Vue from 'vue'
import VueHead from 'vue-head'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from './firebase'
import VueFirestore from 'vue-firestore'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(VueHead);
Vue.use(VueFirestore);

Vue.config.productionTip = false;

firebase.init();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
