<template>
  <div class="card"> Manufacturer: {{manufacturer}} <br/>
    Equipment: {{equipment_type}}
  </div>
</template>
<script>
export default {
  name: 'equipment-card',
  props: ["manufacturer", "equipment_type"]
}
</script>

<style scoped>
  .card {
    width: 500px;
    height: 100px;
    border: 5px solid;
  }
</style>