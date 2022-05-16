<template>
  <div>
    <div v-if="error">Could not load data. Please try again later.</div>
    <div v-else>
      <div
        v-for="equipment in equipmentData"
        :key="equipment.serial_number"
      >
        <Card v-bind="equipment" :deleteCard="deleteCard"/>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import Card from "./Card.vue";

export default {
  name: "Home",
  components: {
    Card,
  },
  apollo: {
    equipmentData: {
      query: gql`query {
        equipment {
          active
          equipment_type
          manufacturer
          serial_number
          model_number
          description
          equipment_photos {
            full_size_url
          }
        },
      }`,
      update: data => data.equipment
    }
  },
  data() {
    return {
      equipmentData: [],
      error: null,
    }
  },
  methods: {
    // async getEquipmentData() {
    //   try {
    //     const res = await fetch('http://localhost:8100/equipment');
    //     const data = await res.json();
    //     this.equipmentData = data.filter(d => d.active);
    //   } catch (error) {
    //     this.error = error;
    //   }
    // },
    deleteCard(serial_number) {
      this.equipmentData = this.equipmentData.filter(data => data.serial_number !== serial_number);
    },
  },
  // async created() {
  //   this.getEquipmentData();
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
