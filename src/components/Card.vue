<template>
  <div class="equipmentCard" :class="{ warn: !equipment_type || !manufacturer }">
    <div class="button" @click="isExpanded = !isExpanded">
      <div v-if="!isExpanded">></div>
      <!-- <i class="fa-solid fa-chevron-right"></i> -->
      <div v-else>V</div>
      <!-- <i class="fa-solid fa-chevron-down"></i> -->
    </div>

    <div class="content">
      <div class="title">
        <span class="type">{{ equipment_type || '--' }}</span>
        |
        <span class="manufacturer">{{ manufacturer || '--' }}</span>
      </div>
      <div class="tag" v-if="!equipment_photos || !equipment_photos.length">NO PHOTOS</div>

      <div class="details" v-if="isExpanded">
        <div>
          <div class="label">SERIAL NUMBER</div>
          <div>{{ serial_number || '--' }}</div>
        </div>
        <div>
          <div class="label">MODEL NUMBER</div>
          <div>{{ model_number || '--' }}</div>
        </div>
        <div>
          <div class="label">DESCRIPTION</div>
          <div>{{ description || '--' }}</div>
        </div>
      </div>
    </div>

    <!-- To do: Use an ID to key which card should be deleted -->
    <div class="button" @click="deleteCard(serial_number)">
      <i class="fa-solid fa-trash-can"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    active: Boolean,
    description: String,
    manufacturer: String,
    model_number: String,
    serial_number: String,
    equipment_type: String,
    equipment_photos: [{
      full_size_url: String,
      thumbnail_url: String,
    }],
    deleteCard: Function,
  },
  data() {
    return {
      isExpanded: false,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.equipmentCard {
  display: flex;
  border-radius: 2px;
  background-color: whitesmoke;

  margin-bottom: 20px;
  padding: 20px;
  text-align: left;
  .content {
    flex: 1;
    margin-left: 4px;
    margin-bottom: 8px;
  }
  .title {
    .type {
      margin: 0;
      font-weight: bold;
    }
    .manufacturer {
      margin: 0;
    }
  }
  .details {
    display: flex;
    margin-top: 8px;
    div {
      flex: 1;
    }
    div:nth-child(3) {
      flex: 2;
    }
    .label {
      font-size: 12px;
    }
  }
}

.warn {
  background-color: yellow;
}

.tag {
  width: fit-content;
  border-radius: 5px;
  padding: 4px 12px;
  background-color: lightgray;
  font-size: 14px;
}

.button {
  color: #46A4AD;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
</style>
