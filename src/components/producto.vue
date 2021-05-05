<template>
  <v-card
      class="mx-auto my-12"
      max-width="220"
      max-height="640"
  >
    <v-img
        height="150"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title>Cafe Badilico</v-card-title>

    <v-card-text>
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
        BOB:  230
      </div>

      <div>Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-text>
      <v-chip-group
          active-class="deep-purple accent-4 white--text"
          column
      >
        <v-chip>
          <v-icon>mdi-thumb-up</v-icon> (3)
        </v-chip>

        <v-chip>
          <v-icon>mdi-thumb-down</v-icon> (3)
        </v-chip>

      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="green"
          text
          @click="openForm"
      >
        Editar
      </v-btn>
      <v-btn
          color="red"
          text
      >
        Eliminar
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "producto",
  methods:{
    openForm(){
      this.$router.push({name: 'Producto'})
    }
  }
}
</script>

<style scoped>

</style>