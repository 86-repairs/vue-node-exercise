<template>
  <div>
    <equipment-search></equipment-search>
    <h2 v-if="loading">Loading Data...</h2>
    <h2 v-else-if="loadingError">{{ loadingError }}</h2>
    <h2 v-else-if="equipment.length === 0">NO ITEMS FOUND</h2>
    <template v-else>
      <input type="checkbox" @change="toggleShowInactive" />
      Show Inactive
      <ul>
        <template v-for="machine in equipment">
          <equipment-item
            v-if="machine.active || showInactive"
            @remove-item="remove"
            :key="machine.id"
            :id="machine.id"
            :active="machine.active"
            :description="machine.description"
            :manufacturer="machine.manufacturer"
            :modelNumber="machine.model_number"
            :serialNumber="machine.serial_number"
            :equipmentType="machine.equipment_type"
            :equipmentPhotos="machine.equipment_photos"
          ></equipment-item>
        </template>
      </ul>
    </template>
  </div>
</template>

<script>
import EquipmentItem from "./EquipmentItem.vue";
import EquipmentSearch from "./EquipmentSearch.vue";

export default {
  name: "equipmentList",
  components: { EquipmentItem, EquipmentSearch },
  props: ["equipment"],
  computed: {
    showInactive() {
      return this.$store.getters["equipment/showInactive"];
    },
    loading() {
      return this.$store.getters["equipment/loading"];
    },
    loadingError() {
      return this.$store.getters["equipment/loadingError"];
    },
  },
  methods: {
    remove(serialNumber) {
      alert(serialNumber);
    },
    toggleShowInactive() {
      this.$store.dispatch("equipment/setShowInactive", !this.showInactive);
    },
  },
};
</script>

<style scoped>
input {
  display: inline-block;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin-right: 20px;
  float: left;
  width: 300px;
}
</style>
