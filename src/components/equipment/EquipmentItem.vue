<template>
  <li :class="missing">
    <font-awesome-icon @click="remove" class="trash" icon="trash" />
    <equipment-photo :equipment-photos="equipmentPhotos"></equipment-photo>
    <div>
      <h3>Manufacturer</h3>
      {{ manufacturer ? manufacturer : "UNKNOWN" }}
      <h3>Equipment Type</h3>
      {{ equipmentType }}
    </div>
    <button @click="more">More Info</button>
    <div class="more" v-if="expanded">
      <h3>Serial Number</h3>
      {{ serialNumber }}
      <h3>Model Number</h3>
      {{ modelNumber }}
      <h3>Description</h3>
      {{ description }}
      <h3>Active</h3>
      {{ active }}
    </div>
  </li>
</template>

<script>
import EquipmentPhoto from "./EquipmentPhoto.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTrash);

export default {
  components: { EquipmentPhoto, FontAwesomeIcon },
  props: [
    "id",
    "active",
    "description",
    "manufacturer",
    "modelNumber",
    "serialNumber",
    "equipmentType",
    "equipmentPhotos",
  ],
  data() {
    return {
      expanded: false,
    };
  },
  computed: {
    missing() {
      if (!this.manufacturer || !this.equipmentType) {
        return "missing";
      }
      return "";
    },
  },
  methods: {
    more() {
      this.expanded = !this.expanded;
    },
    remove() {
      this.$store.dispatch("equipment/removeItem", this.id);
    },
  },
};
</script>

<style scoped>
.trash {
  position: absolute;
  top: 1rem;
  right: 1rem;
  margin: 0;
  color: red;
  font-size: 1.5rem;
}

li {
  margin: 1rem auto;
  padding: 1rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  position: relative;
}
li.missing {
  background: yellow;
}
h3 {
  margin-bottom: 0px;
}
div {
  text-align: left;
}
img {
  text-align: center;
  width: 10rem;
  height: 10rem;
}

button {
  margin-top: 1rem;
  font: inherit;
  border: 1px solid #8f0030;
  background-color: #8f0030;
  color: white;
  border-radius: 30px;
  cursor: pointer;
  padding: 0.5rem 1.5rem;
}

button:hover,
button:active {
  background-color: #53001c;
  border-color: #53001c;
}
</style>
