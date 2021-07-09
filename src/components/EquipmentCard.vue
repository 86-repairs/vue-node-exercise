<template>
  <v-card elevation="5" outlined>
    <v-card-title class="justify-center"> {{ equipment.manufacturer }} </v-card-title>
    <v-card-subtitle> {{ equipment.equipment_type }} </v-card-subtitle>
    <v-card-text v-if="!equipment.equipment_photos">
      NO PHOTOS
    </v-card-text>
    <v-btn elevation="2" @click="show = !show">Details</v-btn>
    <v-btn elevation="2" @click="removeEquipment(index)">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
    <v-card-text v-if="show">
      <p> Description: {{ equipment.description}}</p>
      <p> Serial Number: {{ equipment.serial_number }}</p>
      <p> Model Number: {{ equipment.model_number}}</p>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'equipment-card',
  props: ["equipment", "index"],
  data(){
    return {
      show: false
    }
  },
  methods: {
    removeEquipment(index){
      this.$emit('del-equipment', index)
    }
  }
}
</script>
<style scoped>
  .v-card {
    width: 400px;
    padding: 10px;
    margin: 5px;
  }
  .v-btn {
    margin: 5px
  }
  .justify-center {
    justify-content: center;
  }
</style>
