<template>
  <v-card
      outlined
  >
    <v-form
        ref="form"
        lazy-validation
        v-model="valid"
        @submit.prevent="save"
    >

      <v-card-title>
        <h3> {{ isNew ? 'Nuevo' : 'Editar' }} producto</h3>

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

        <errores
            v-if="errores !== null"
            :errores="errores"
        />

        <v-text-field
            label="Código *"
            v-model="producto.codigo"
            required
            type="number"
            outlined
            :rules="[
                (v) => !!v || 'Codigo es requerido',
                v => (v && v.length >= 3 && v.length <=5) || 'Codigo debe tener entre 3 y 5 digitos'
            ]"
        ></v-text-field>

        <v-text-field
            label="Nombre *"
            v-model="producto.nombre"
            :rules="[
                (v) => !!v || 'Nombre es requerido',
                v => (v && v.length >= 3 && v.length <=20) || 'Nombre debe tener entre 3 y 5 digitos'
            ]"
            required
        ></v-text-field>

        <v-textarea
            label="Descripción *"
            v-model="producto.descripcion"
            :rules="[
                (v) => !!v || 'Descripcion es requerido'
            ]"
            required
        ></v-textarea>

        <v-text-field
            label="Precio *"
            v-model="producto.precio"
            required
            type="number"
            :rules="[
                (v) => !!v || 'Precio es requerido'
            ]"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
            type="submit"
            color="green"
            outlined
            :loading="loading"
        >
          Guardar
        </v-btn>
      </v-card-actions>

      <pre>
      {{ errores }}
    </pre>

    </v-form>

  </v-card>
</template>

<script>
import {mapState} from "vuex";
import Errores from "../components/errores";

export default {
  name: "producto-form",
  components: {Errores},
  data: () => ({
    isNew: true,
    valid: false,
    producto: {
      user: {}
    },
    errores: null,
    loading: false
  }),
  computed: {
    ...mapState(['url'])
  },
  created() {
    this.isNew = !this.$route.params.id;
  },
  mounted() {
    if (!this.isNew)
      this.getProducto();
  },
  methods: {
    getProducto() {
      const url = this.url + "productos/" + this.$route.params.id;
      this.axios.get(url).then(response => {
        this.producto = response.data
      });
    },
    save() {
      if (!this.$refs.form.validate())
        return;

      let url = "";
      if (this.isNew)
        url = this.url + "productos/"
      else
        url = this.url + "productos/" + this.$route.params.id;

      this.loading = true;
      this.axios({
        method: this.isNew ? 'POST' : 'PUT',
        url: url,
        data: this.producto
      }).then(response => {
        if (response.data.res === true) {
          this.$toastr.success(response.data.message)
        } else
          this.$toastr.error(response.data.message);
      }).catch(e => {
        console.log(e.response.data.errors);
        this.errores = e.response.data.errors;
      }).finally(() => {
        this.loading = false;
      })

    }
  }
}
</script>

<style scoped>

</style>