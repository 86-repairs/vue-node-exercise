<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <Equipment />
  </div>
</template>

<script>
import Equipment from "./components/Equipment.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "App",
  components: {
    Equipment,
  },
  computed: mapState(['equipmentData']),
  methods: {
    ...mapActions(['getEquipmentData']),
  },
  async mounted () {
    await this.getEquipmentData()
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
