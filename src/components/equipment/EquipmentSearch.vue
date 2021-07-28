<template>
  <div>
    <input @blur="search" type="text" ref="searchBox" />
    <button @click="search">Search</button>
  </div>
</template>

<script>
export default {
  name: "EquipmentSearch",
  computed: {},
  data() {
    return {
      queryType: "",
      value: "",
    };
  },
  methods: {
    search() {
      const value = this.$refs.searchBox.value;
      if (!value || (value && value.trim().length === 0)) {
        this.$store.dispatch("equipment/loadEquipment");
      } else {
        this.$store.dispatch("equipment/search", {
          queryType: this.queryType,
          value: this.$refs.searchBox.value,
        });
      }
    },
  },
};
</script>

<style scoped>
div {
  display: inline-block;
}
input {
  display: inline-block;
}
</style>
