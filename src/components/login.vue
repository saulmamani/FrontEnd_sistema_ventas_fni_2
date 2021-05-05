<template>
  <v-card
      outlined
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

      <v-form
          lazy-validation
      >
        <v-text-field
            label="Email *"
            required
            type="email"
        ></v-text-field>

        <v-text-field
            label="Password *"
            type="password"
            required
        ></v-text-field>
      </v-form>

    </v-card-text>

    <v-card-actions>
      <v-btn
          color="green"
          block
      >
        Aceptar
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "login",
  methods:{
    salir(){
      this.$emit("salir")
    }
  }
}
</script>

<style scoped>

</style>