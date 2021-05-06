import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //para definir variables globales
    url: `${process.env.VUE_APP_URL}`
  },
  getters: {
    //para usar las variables globales
  },
  mutations: {
    //asginar valora alos variables globales (state)
  },
  actions: {
    //para prograr funciones, globales
  },
  modules: {
  }
})
