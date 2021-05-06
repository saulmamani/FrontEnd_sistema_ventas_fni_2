<template>
  <v-card
      outlined
  >
    <form
      method="post"
      id="frmImagen"
      enctype="multipart/form-data"
    >
      <v-card-title>
        <h3>Cargar imagen del producto: </h3>
        <v-spacer/>

        <v-btn
            icon
            @click="$emit('salir')"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>

      </v-card-title>

      <v-divider/>

      <v-card-text>
        <input type="file" ref="url_imagen" id="url_imagen" name="url_imagen" accept="image/gif, image/jpeg, image/png, image/jpg" required>
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="green"
            block
            dark
            type="submit"
        >
          Subir imagen
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
export default {
  name: "subir-imagen"
}
</script>

<style scoped>

</style>