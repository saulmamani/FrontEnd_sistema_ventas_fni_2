<template>
  <v-card
      class="mx-auto my-12"
      max-width="220"
      max-height="640"
  >
    <v-img
        v-if="producto.url_imagen !== null && producto.url_imagen.includes('http')"
        height="150"
        :src="producto.url_imagen"
        @click="dialogImagen = true"
    ></v-img>
    <v-img
        v-if="producto.url_imagen !== null && !producto.url_imagen.includes('http')"
        height="150"
        :src="'http://127.0.0.1:8000/imagenes/' + producto.url_imagen"
        @click="dialogImagen = true"
    ></v-img>

    <v-card-title>{{ producto.codigo }} | {{ producto.nombre }}</v-card-title>

    <v-card-text>
      {{ producto.url_imagen }}

      <v-row
          align="center"
          class="mx-0"
      >
        <v-rating
            :value="4.5"
            color="amber"
            dense
            half-increments
            readonly
            size="14"
        ></v-rating>

        <div class="grey--text ml-4">
          4.5 (413)
        </div>
      </v-row>

      <div class="my-4 subtitle-1">
        BOB: {{ producto.precio }}
      </div>

      <div> {{ producto.descripcion }} </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
      >
        <v-chip @click="setLike">
          <v-icon>mdi-thumb-up</v-icon> ( {{ producto.like }} )
        </v-chip>

        <v-chip @click="setDisLike">
          <v-icon>mdi-thumb-down</v-icon> ( {{ producto.dislike }} )
        </v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
          v-if="isLogin"
          color="green"
          text
          @click="openForm"
      >
        Editar
      </v-btn>
      <v-btn
          v-if="isLogin"
          color="red"
          text
          @click="eliminar"
      >
        Eliminar
      </v-btn>
    </v-card-actions>

    <v-dialog
      v-model="dialogImagen"
      max-width="500px"
      persistent
    >
      <subir-imagen
          :producto="producto"
        @salir="dialogImagen = false"
          @listar="$emit('listar')"
      ></subir-imagen>
    </v-dialog>

  </v-card>
</template>

<script>
import SubirImagen from "./subir-imagen";
import {mapGetters, mapState} from "vuex";
export default {
  name: "producto",
  components: {SubirImagen},
  props: ['producto'],
  data: () => ({
    dialogImagen: false
  }),
  computed: {
    ...mapState(['url']),
    ...mapGetters({
      isLogin: "isLogin",
      user: "getUser"
    })
  },
  methods:{
    openForm(){
      this.$router.push({name: 'Producto.edit', params: {id: this.producto.id}})
    },
    setLike(){
      const url = this.url + "set_like/" + this.producto.id;
      this.axios.put(url).then(response => {
          if(response.data.res === true) {
            this.$toastr.success(response.data.message)
            this.producto.like = this.producto.like + 1;
          }
          else
            this.$toastr.error(response.data.message);
      });
    },
    setDisLike(){
      const url = this.url + "set_dislike/" + this.producto.id;
      this.axios.put(url).then(response => {
        if(response.data.res === true) {
          this.$toastr.success(response.data.message)
          this.producto.dislike = this.producto.dislike + 1;
        }
        else
          this.$toastr.error(response.data.message);
      });
    },
    eliminar(){
      if(confirm("Seguro que quiere eliminar el registro? ")) {

        const url = this.url + "productos/" + this.producto.id;
        this.axios.delete(url).then(response => {
          if (response.data.res === true) {
            this.$toastr.success(response.data.message)
            this.$emit('listar')
          } else
            this.$toastr.error(response.data.message);
        });

      }
    }
  }
}
</script>

<style scoped>

</style>