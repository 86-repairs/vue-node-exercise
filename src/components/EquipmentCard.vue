<template>
  <v-card elevation="5" outlined>
    <v-card-title class="justify-center"> {{ manufacturer }} </v-card-title>
    <v-card-subtitle> {{ equipment_type }} </v-card-subtitle>
  </v-card>
</template>
<script>
export default {
  name: 'equipment-card',
  props: ["manufacturer", "equipment_type"]
}
</script>
<style scoped>
  .v-card {
    width: 400px;
    padding: 10px;
    margin: 5px;
  }
  .justify-center {
    justify-content: center;
  }

</style>
