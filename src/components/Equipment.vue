<template>
  <div class="container">
    <div
        v-for="item in equipmentData"
        :key="item.serial_number"
    >
      <div class="card">
        <span >Serial Number: {{ item.serial_number }}</span>
        <div>
          <div>
            <p>Manufacturer: {{ item.manufacturer }}</p>
          </div>
          <div>
            <p>Equipment Type: {{ item.equipment_type }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Equipment',
  computed: mapState(['equipmentData'])
})
</script>

<style>
.card {
  border: solid black 1px;
  border-radius: 10px;
  width: 350px;
  height: 125px;
  padding: 20px;
  margin: 10px;
}
.container {
  margin: 1em;
  display: flex;
  flex-wrap: wrap;
}
</style>
