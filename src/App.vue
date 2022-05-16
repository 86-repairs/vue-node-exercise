<template>
  <div id="app">
    <img id="logo" alt="Vue logo" src="./assets/logo.png" />
    <Home />
  </div>
</template>

<script>
import Home from "./components/Home.vue";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 60px 10% 0;
}

#logo {
  margin-bottom: 50px;
}
</style>
