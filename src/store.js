import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

const EQUIPMENT_URL = 'http://localhost:8100/equipment';

export default new Vuex.Store({
    state: {
        equipments: []
    },
    getters: {
        equipments: state => {
            return state.equipments
        }
    },
    mutations: {
        setEquipment(state, equipments) {
            state.equipments = equipments
        }
    },
    actions: {
        async loadEquipments({ commit }){
            try {
                const equipment = await axios.get(EQUIPMENT_URL)
                commit('setEquipment', equipment.data)
            } catch (e) {
                console.log(e);
            }
        }
    }
})
