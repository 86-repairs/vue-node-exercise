<template>
  <v-container class="billing">
    <v-row>
      <v-card
          class="mx-auto my-12"
          width="374"
          v-for="item in equipmentData"
          :key="item.serial_number"
      >
        <v-card-text>
          <div>Serial Number</div>
          <p class="text-h4 text--primary">
            {{ item.serial_number }}
          </p>
          <v-row>
            <v-col>
              <p>Manufacturer</p>
              <div class="text--primary">
                {{ item.manufacturer }}
              </div>
            </v-col>
            <v-col>
              <p>Equipment Type</p>
              <div class="text--primary">
                {{ item.equipment_type }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapState } from 'vuex'

export default Vue.extend({
  name: 'Equipment',
  computed: mapState(['equipmentData'])
})
</script>
