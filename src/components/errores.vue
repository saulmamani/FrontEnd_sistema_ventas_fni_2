<template>

  <v-alert
      dense
      outlined
      type="error"
  >
    <div v-for="(v, k) in errores" :key="k">
      <p v-for="error in v" :key="error" class="text-sm">
        - {{ error }}
      </p>
    </div>

  </v-alert>

</template>

<script>
export default {
  name: "errores",
  props: ['errores']
}
</script>

<style scoped>

</style>