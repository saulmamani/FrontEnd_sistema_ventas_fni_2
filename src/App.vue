<template>
  <v-app>
    <v-app-bar
        app
        color="pink darken-2"
        dark
    >
      <div class="d-flex align-center">
        <h2>SHOP STORE</h2>
      </div>

      <v-spacer/>

      <v-btn
          v-if="!isLogin"
          text
          @click="dialog = !dialog"
      >
        <span class="mr-2">Login</span>
      </v-btn>

      <v-btn
          v-else
          text
          @click="logout"
      >
       {{ user.email }} | Salir
        <v-avatar>
          <img
              src="https://cdn.vuetifyjs.com/images/john.jpg"
              alt="John"
          >
        </v-avatar>
      </v-btn>

    </v-app-bar>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view/>
      </v-container>
    </v-main>

    <v-dialog
        v-model="dialog"
        max-width="500"
        persistent
    >
      <login
          @salir="salir"
      />
    </v-dialog>

  </v-app>
</template>

<script>

import Login from "./components/login";
import store from '@/store/index';
import {mapGetters} from "vuex";

export default {
  name: 'App',
  components: {Login},
  data: () => ({
    dialog: false
  }),
  computed: {
    ...mapGetters({
      isLogin: "isLogin",
      user: "getUser"
    })
  },
  methods: {
    salir() {
      this.dialog = false
    },
    logout() {
      if (confirm("Seguro que quires salir? ")) {
        store.dispatch('destroyToken').then(response => {
          if (response.data.res === true) {
            this.$toastr.success(response.data.message);
          } else
            this.$toastr.error(response.data.message);
        })
      }
    }
  }
};
</script>
