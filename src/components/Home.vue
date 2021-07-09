<template>
  <div v-if="!loading" class="">
    <div v-if="!error">
      <input 
        type="text" 
        class="search" 
        placeholder="Search by manufacturer"
        v-model="searchText" 
        @keyup="searchUpdated()" 
      />
      <div class="equipment-container">
        <Equipment 
          v-for="equipment in filteredEquipment" 
          :key="equipment.serial_number" 
          :equipment="equipment"
          @deleted="equipmentDeleted"  
        />
      </div>
    </div>
    <div v-else>
      Whoops! Something went wrong.
      <button @click="loadEquipmentList()">Try again</button>
    </div>
  </div>
  <div v-else>
    Loading...
  </div>
</template>

<script>
import Equipment from './Equipment.vue';

export default {
  components: { Equipment },
  name: "Home",
  data: function() {
    return {
      error: false,
      loading: true,
      searchText: "",
      equipmentList: []
    };
  },
  computed: { 
    activeEquipment() {
      return this.equipmentList.filter(e => e.active);
    },
    filteredEquipment() {
      return this.searchText.length > 0 ? 
        this.activeEquipment.filter(e => 
          e.manufacturer?.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1) : 
        this.activeEquipment;
    }
  },
  created() {
    this.loadEquipmentList()
  },
  methods: {
    async loadEquipmentList() {
      this.error = false;
      this.loading = true;
      try {
        const response = await fetch("http://localhost:8100/equipment");
        const data = await response.json();
        if(response.ok) {
          this.equipmentList = data;
        } else {
          console.error(data) // Ah jeez!
          this.error = true;
        }
      } catch (error) {
        console.log(error);
        this.error = true;
      }
      this.loading = false;
    },
    equipmentDeleted(serialNumber) {
      const index = this.equipmentList.findIndex(e => e.serial_number === serialNumber);
      if(index > -1) {  
        this.equipmentList.splice(index, 1);
      }
    },
    searchUpdated: () => {}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.app {
  padding-top: 10em;
}
.equipment-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  grid-column-gap: 15px;
  grid-row-gap: 15px;
}
h2 {
  margin: 60px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.search {
    width: calc(100% - 6px);
    height: 32px;
    border: 2px solid #dddddd;
    border-radius: 5px;
    margin-bottom: 20px;
    padding: 3px;
}
</style>
