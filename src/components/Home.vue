<template>
  <div class="hello">
    <h1>Equipment List</h1>
    <body>
      <div id="App"> 
        <ul v-for="(equip, index) in filteredActive" :key="index" >
          <li :class="{ card: !equip.manufacturer || !equip.equipment_type }" >
              <h3> {{ equip.manufacturer }} / {{ equip.equipment_type }}</h3>
              <p v-if="isShowingDetails(index)"> SN:{{ equip.serial_number }}</p>
              <p v-if="isShowingDetails(index)"> MODEL:{{ equip.model_number }}</p>
              <p v-if="isShowingDetails(index)"> ACTIVE:{{ equip.active }}</p>
              <button class= "button" @click="toggleInfo(index)"> 
                  <span v-if="isShowingDetails(index)">Hide Details</span>
                  <span v-else>Show Details</span>
              </button>
              <button @click="deleteListItem(equip.serial_number)">
                <img src="./assets/trash.png" alt="trashcan" width="20" height="20"/>
              </button>
          </li>
        </ul>
      </div>
    </body>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      equipmentData: [],
      errorMessage: "",
      showFullDetails: false
    }
  },
  created() {
    this.getAllData()
  },
  computed: {
    filteredActive() {
      return this.equipmentData.filter((equip) => equip.active)
    }
  },
  methods: {
     async getAllData() {
      try {
        const res = await fetch('http://localhost:8100/equipment');

        if (!res.ok) {
          const message = `An error has occured: ${res.status} - ${res.statusText}`;
          throw new Error(message);
        }

        this.equipmentData = await res.json()
      } 
      catch (err) 
      {
        this.equipmentData = err.message;
      }
    },
    toggleInfo(index) {
      this.showFullDetails = index
    },
    isShowingDetails(index) {
      return this.showFullDetails === index
    },
    deleteListItem(serialNumber) {
      return this.equipmentData.find((sn) => sn.serial_number == serialNumber).active = false
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  max-width: 960px;
  margin: 20px auto;
}
h2 {
  margin: 60px 0 0;
}
p, h3 {
  margin : 0;
  padding: 0;
}
li {
  list-style-type: none;
  background: #fff;
  margin: 20px auto;
  padding: 10px 20px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
ul {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
}
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  background-color: yellow;
}
a {
  color: #42b983;
}
.button{
  background-color: #2ab3c5; /* Green */
  border: none;
  color: white;
  padding: 12px 28px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 12px;
}

</style>
