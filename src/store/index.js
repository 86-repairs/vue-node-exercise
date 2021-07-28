import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import equipmentModule from "./modules/equipment.js";

const store = new Vuex.Store({
  modules: {
    equipment: equipmentModule,
  },
  state() {
    return {};
  },
});

export default store;
