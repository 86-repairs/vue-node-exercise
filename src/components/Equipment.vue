<template>
  <div 
    class="equipment" 
    :class="{ 'missing-data': isMissingData }"
    @mouseenter="setHovering(true)" 
    @mouseleave="setHovering(false)"
  >
    <button 
      v-if="hovering" 
      class="delete-button" 
      @click="deleteEquipment"
      aria-label="Delete equipment"
    >
      <i class="fas fa-trash-alt"></i>
    </button>
    <div class="image-container">
      <span v-if="isMissingPhotos">NO PHOTOS</span>
      <img class="equipment-image" v-else :src="thumbnailUrl" />
    </div>
    <div style="text-align: left;">
      <div v-for="field in mainFields" :key="field.key" class="field-wrapper">
        <div class="field">{{field.label}}</div>
        <div>{{getData(field.key)}}</div>
      </div>
      <div v-if="expanded">
        <div v-for="field in expandedFields" :key="field.key" class="field-wrapper">
          <div class="field">{{field.label}}</div>
          <div>{{getData(field.key)}}</div>
        </div>
      </div>
      <button 
        @click="toggleExpanded()" 
        class="expand-button"
      >{{expanded ? "Less info" : "More info"}}</button>  
    </div>
  </div>
</template>

<script>

export default {
  name: "Equipment",
  props: {
    equipment: Object
  },
  data: function() {
    return {
      expanded: false,
      hovering: false,
      mainFields: [
        {
          label: 'Manufacturer',
          key: 'manufacturer'
        },
        {
          label: 'Equipment Type',
          key: 'equipment_type'
        }
      ],
      expandedFields: [
        { 
          label: 'Serial Number',
          key: 'serial_number'
        },
        { 
          label: 'Model Number',
          key: 'model_number'
        },  
        { 
          label: 'Description',
          key: 'description'
        },  
      ]
    };
  },
  computed: {
    isMissingPhotos() {
      return !this.equipment.equipment_photos?.length;
    },
    isMissingData() {
      return this.equipment.manufacturer == null || this.equipment.equipment_type == null;
    },
    thumbnailUrl() {
      return this.equipment.equipment_photos?.[0].thumbnail_url;
    }
  },
  methods: {
    toggleExpanded() {
      this.expanded = !this.expanded;
    },
    getData(key) {
      return this.equipment[key] ?? "Not set";
    },
    setHovering(hovering) {
      this.hovering = hovering;
    },
    deleteEquipment() {
      this.$emit('deleted', this.equipment.serial_number);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .equipment {
    padding: 1rem;
    background: white;
    border-radius: 10px;
    display: flex;
    box-shadow: 0 3px 5px rgb(0 0 0 / 0.1);
    height: max-content;
    position: relative;
  }

  .delete-button {
    position: absolute;
    right: 10px;
    top: 10px;
    background: none;
    border: none;
    color: #fd4c4c;
    padding: 0;
    cursor: pointer;
  }

  .image-container {
    max-width: 75px; 
    height: 75px;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 16px;
  }

  .image-container > span {
    opacity: 0.8;
  }

  .equipment-image {
    width: 100%; 
    height: 100%;
    object-fit: scale-down;
  }

  .missing-data {
    background: #ffffa6;
  }

  .field-wrapper {
    margin-bottom: 3px;
  }

  .field {
    font-size: 12px;
    opacity: 0.8;
  }

  .expand-button {
    background: none;
    border: none;
    color: #005aff;
    padding: 0;
    cursor: pointer;
  }


</style>
