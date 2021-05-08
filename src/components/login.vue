<template>
  <v-card
      outlined
  >
    <v-form
        lazy-validation
        @submit.prevent="login"
    >

      <v-card-title>
        <h3>LogIn</h3>
        <v-spacer/>
        <v-btn
            outlined
            text
            @click="salir"
        >
          Salir
        </v-btn>
      </v-card-title>

      <v-divider/>

      <v-card-text>
        <v-text-field
            label="Email *"
            required
            type="email"
            v-model="email"
        ></v-text-field>

        <v-text-field
            label="Password *"
            type="password"
            required
            v-model="password"
        ></v-text-field>

      </v-card-text>

      <v-card-actions>
        <v-btn
            color="green"
            block
            type="submit"
        >
          Aceptar
        </v-btn>
      </v-card-actions>

    </v-form>

  </v-card>
</template>

<script>
import store from '@/store/index';

export default {
  name: "login",
  data: () => ({
    email: "",
    password: ""
  }),
  methods: {
    salir() {
      this.$emit("salir")
    },
    login(){
      store.dispatch('getToken', {
        email: this.email,
        password: this.password
      }).then(response => {
        if(response.data.res === true){
          this.$toastr.success(response.data.message);
          this.$emit("salir")
        }
        else
          this.$toastr.error(response.data.message);
      })
    }
  }
}
</script>

<style scoped>

</style>