<template>
  <div class="equipment-card">
      <EquipmentCard
          v-for="(equipment, index) in activeEquipment"
          v-on:del-equipment="removeEquipment"
          :key="index"
          :index="index"
          :equipment="equipment"
          :class="{ warn: showWarnClass(equipment) }"

      />
    </div>
</template>

<script>
import EquipmentCard from "./EquipmentCard";
import { mapState } from "vuex";

export default {
  name: "Home",
  components: {
    EquipmentCard,
  },
  computed: {
    ...mapState(["equipments"]),
    activeEquipment(){
      return this.equipments.filter(equipment => equipment.active)
    }
  },
  methods: {
    removeEquipment(index) {
      this.$delete(this.activeEquipment, index)
      this.$forceUpdate()
    },
    showWarnClass(equipment){
      return !(equipment.equipment_type && equipment.manufacturer)
    }
  },
  created(){
    this.$store.dispatch('loadEquipments')
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .equipment-card {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    align-items: flex-start;
    margin: 5%;
    width: 100%;
  }

  .warn {
    background-color: yellow;
  }
</style>
