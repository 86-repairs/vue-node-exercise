<template>
  <div class="equipment-card">
      <EquipmentCard
          v-for="(equipment, index) in activeEquipment"
          v-on:del-equipment="removeEquipment"
          :key="index"
          :index="index"
          :equipment="equipment"
          :class="{ warn: !equipment.equipment_type, warn: !equipment.manufacturer }"

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
    },
  },
  data() {
    return  {}
  },
  methods: {
    removeEquipment(index) {
      this.$delete(this.activeEquipment, index);
      this.$forceUpdate();
    }
  },
  created(){
    this.$store.dispatch('loadEquipments');
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .equipment-card {
    max-width: 800px;
    margin: 2em auto;
    display: grid;
    grid-template-columns: 3fr 1fr;
    grid-template-rows: repeat(3,auto);
    grid-gap: 1rem;
  }

  .warn {
    background-color: yellow;
  }
</style>
