<template>
  <v-card
    outlined
  >
    <v-card-title>
      <h3>Nuevo / Editar producto</h3>

      <v-spacer/>
      <v-btn
          outlined
          @click="$router.back()"
      >
        Volver
      </v-btn>
    </v-card-title>
    <v-divider/>
    <v-card-text>

      <v-form
          lazy-validation
      >
        <v-text-field
            label="Código *"
            required
            type="number"
            outlined
        ></v-text-field>

        <v-text-field
            label="Nombre *"
            required
        ></v-text-field>

        <v-textarea
          label="Descripción *"
          required
        ></v-textarea>

        <v-text-field
            label="Precio *"
            required
            type="number"
        ></v-text-field>

      </v-form>

    </v-card-text>

    <v-card-actions>
      <v-btn
          color="green"
          outlined
      >
        Guardar
      </v-btn>
    </v-card-actions>

  </v-card>
</template>

<script>
export default {
  name: "producto-form"
}
</script>

<style scoped>

</style>