import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

//axios
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

//toastr
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
window.toastr = require('toastr')
Vue.use(VueToastr2)

Vue.config.productionTip = false

//token global, errores axios globales
if(store.getters.isLogin) {
  axios.defaults.headers.common.Authorization = "Bearer " + store.state.token;
  store.dispatch("getUsuario")
}

// inicia usuarios
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  if(error.response.status === 403 || error.response.status === 404){
    console.log("error 403, 404")
  }
  if(error.response.status === 401) //si no esta autenticado o no existe tocken
  {
    this.toastr.error("Usuario invitado")

    store.dispatch("destroyToken").then(response => {
      this.toastr.succes(response.data.message)
      router.push({name: 'Home'});
    })
  }
  return Promise.reject(error);
});

//control de rutas
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters.isLogin) {
      next({name: 'Home'})
    }
    else {
      next()
    }
  }
  else {
    next()
  }
});





new Vue({
  router,
  store,
  vuetify,
  render: function (h) { return h(App) }
}).$mount('#app')
