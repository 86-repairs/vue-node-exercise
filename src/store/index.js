import Vue from 'vue'
import Vuex from 'vuex'
import {fetchEquipmentData} from "../api/fetchEquipmentData";

Vue.use(Vuex)

const SET_EQUIPMENT_DATA = 'SET_EQUIPMENT_DATA'

export default new Vuex.Store({
    state: {
        equipmentData: null,
    },
    mutations: {
        [SET_EQUIPMENT_DATA] (state, equipmentData) {
            state.equipmentData = equipmentData
        },

    },
    actions: {
        getEquipmentData: async function ({ commit }) {
            try {
                const equipmentData = await fetchEquipmentData()

                commit(SET_EQUIPMENT_DATA, equipmentData)
            } catch (e) {
                // TODO - error handling
                console.log(e)
            }
        },
    },
    modules: {}
})
