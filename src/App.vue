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
          text
          @click="dialog = !dialog"
      >
        <span class="mr-2">Login</span>
      </v-btn>

      <v-btn
          text
      >
        Salir
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

export default {
  name: 'App',
  components: {Login},
  data: () => ({
    dialog: false
  }),
  methods: {
    salir() {
      this.dialog = false
    }
  }
};
</script>
