import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //para definir variables globales
        url: `${process.env.VUE_APP_URL}`,
        token: localStorage.getItem('token') || null,
        user: {}
    },
    getters: {
        //para usar las variables globales
        isLogin(state) {
            return state.token !== null;
        },
        getUser(state) {
            return state.user;
        }
    },
    mutations: {
        //asginar valora alos variables globales (state) ///commit
        setToken(state, token) {
            state.token = token
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        //para prograr funciones, globales
        getUser({commit, state}) {
            const url = state.url + "user";
            axios.get(url).then(response => {
                commit('setUser', response.data)
            }).catch(e => {
                console.log(e.response.data.errors)
                commit('setUser', {})
            })
        },
        getToken(context, params) {
            return new Promise((resolve, reject) => {
                axios(
                    {
                        method: 'POST',
                        url: context.state.url + "login",
                        data: params
                    }
                ).then(response => {
                    if (response.data.res === true) {
                        localStorage.setItem('token', response.data.token);

                        axios.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                        context.commit('setToken', response.data.token)
                        context.commit('setUser', response.data.user)
                    }
                    resolve(response)
                }).catch(e => {
                    reject(e)
                })
            })
        },
        destroyToken(context) {
            if (context.getters.isLogin) {
                return new Promise((resolve, reject) => {
                    axios(
                        {
                            method: 'POST',
                            url: context.state.url + "logout",
                        }
                    ).then(response => {
                        if (response.data.res === true) {
                            localStorage.removeItem('token');

                            context.commit('setToken', null)
                            context.commit('setUser', {})
                        }
                        resolve(response)
                    }).catch(e => {
                        reject(e)
                    })
                })
            }
        }
    },
    modules: {}
})
