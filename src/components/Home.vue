<template>
  <div class="equipment__list">
    <equipment-list :equipment="equipment"></equipment-list>
  </div>
</template>

<script>
import EquipmentList from "./equipment/EquipmentList.vue";
export default {
  components: { EquipmentList },
  name: "Home",
  computed: {
    equipment() {
      return this.$store.getters["equipment/items"];
    },
  },
  beforeCreate() {
    this.$store.dispatch("equipment/loadEquipment");
  },
};
</script>

<style scoped>
h2 {
  margin: 60px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
.equipment__list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: flex-start;
  width: 90%;
  margin: 5%;
}
</style>
