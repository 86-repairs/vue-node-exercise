<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Home />
    <Card
            v-for="item in equipmentList"
        :key="item.serial_number"
        :equipment_type="item.equipment_type"
        :manufacturer="item.manufacturer"
      >

    </Card>
  </div>
</template>

<script>

import Home from "./components/Home.vue";
import Card from "./components/Card.vue";
export default {
  name: "App",
  components: {
    Home,
    Card
  },
  data() {
    
    let data = [];
    return  {
      equipmentList: data
  }},
  beforeMount(){
    this.getData();
  },
  methods:{
    async getData(){
      let tenantUrl = 'http://localhost:8100';
      const res = await fetch(`${tenantUrl}/equipment`);
      const data = await res.json();
      this.equipmentList = data;
    }
  }
  
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>