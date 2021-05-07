<template>
  <v-card
      outlined
  >
    <form
      method="post"
      id="frmImagen"
      enctype="multipart/form-data"
      @submit.prevent="save"
    >
      <v-card-title>
        <h3>Cargar imagen del producto: {{ producto.codigo }}</h3>
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
        <input type="file" ref="url_imagen"
                  id="url_imagen"
                  name="url_imagen"
                  accept="image/gif, image/jpeg, image/png, image/jpg"
                  required
               @change="escogerArchivo"
        >
      </v-card-text>

      <v-card-actions>
        <v-btn
            color="green"
            block
            dark
            type="submit"
            :loading="loading"
        >
          Subir imagen
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: "subir-imagen",
  props: ['producto'],
  data: () => ({
    loading: false,
    file: null
  }),
  computed: {
    ...mapState(['url'])
  },
  methods: {
    escogerArchivo(event){
      this.file = event.target.files[0];
    },
    save(){
       const url = this.url + "set_imagen/" + this.producto.id;
       let data = new FormData();
       data.append('imagen', this.file);
       data.append('_method', 'PUT');

       this.loading = true;
       this.axios.post(url, data).then(response => {
          if(response.data.res === true){
            this.$toastr.success(response.data.message);
            this.$emit('listar')
            this.$emit('salir')
          }
          else{
            this.$toastr.error(response.data.message);
          }
          this.loading = false;
       });
    }
  }
}
</script>

<style scoped>

</style>