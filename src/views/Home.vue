<template>
  <v-card outlined :loading="loading">
    <v-card-title>
      CATALOGO DE PRODUCTOS

      <v-spacer/>

      <v-btn
          color="green"
          text
          outlined
          @click="openForm"
      >
        Nuevo producto
      </v-btn>
    </v-card-title>
    <v-divider/>

    <v-card-text>

      <v-row>
        <v-col cols="10" md="10" sm="12">
          <v-text-field
              v-model="txtBuscar"
              label="Buscar por nombre o descripcion"
              outlined
              dense
          ></v-text-field>
        </v-col>
        <v-col cols="2" md="2" sm="12">
          <v-btn
              color="primary"
              @click="getProductos"
          >
            Buscar
          </v-btn>
        </v-col>
      </v-row>

      <v-row style="margin-top: -50px">
        <v-col cols="12" md="3" sm="6" v-for="(row, index) in productos" :key="index">
          <producto
            :producto="row"
            @listar="getProductos"
          ></producto>
        </v-col>
      </v-row>

    </v-card-text>
  </v-card>
</template>

<script>
  import Producto from "../components/producto";
  import {mapState} from "vuex";

  export default {
    name: 'Home',
    components: {Producto},
    data: () => ({
      productos: [],
      loading: false,
      txtBuscar: ""
    }),
    computed: {
      ...mapState(['url'])
    },
    mounted() {
      this.getProductos()
    },
    methods: {
      openForm(){
        this.$router.push({name: 'Producto'})
      },
      getProductos(){
        this.loading = true;

          const url = this.url + "productos" + "?txtBuscar=" + this.txtBuscar;
          this.axios.get(url).then(response => {
            //todo lo que trae del backend
            console.log(response.data);
            this.productos = response.data;

            this.loading = false;
          })
      }
    }
  }
</script>
