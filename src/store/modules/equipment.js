import { stringify } from "query-string";

export default {
  namespaced: true,
  state() {
    return {
      items: [],
      loading: false,
      loadingError: null,
      showInactive: false,
    };
  },
  mutations: {
    removeItem(state, payload) {
      const id = payload;
      const itemIndex = state.items.findIndex((ci) => {
        return ci.id === id;
      });
      state.items.splice(itemIndex, 1);
    },
    setItems(state, items) {
      console.log("WE ARE IN SET ITEMS");
      state.items = items;
    },
    setLoading(state, status) {
      state.loading = status;
    },
    setLoadingError(state, error) {
      state.loadingError = error;
    },
    setShowInactive(state, active) {
      state.showInactive = active;
    },
  },
  actions: {
    search({ commit }, payload) {
      const queryString = stringify(payload);
      fetch("http://localhost:8100/equipment/search?" + queryString)
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw resp;
          }
        })
        .then((data) => {
          commit("setItems", data);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          err.json().then((data) => {
            commit("setLoadingError", data.error);
          });
        });
    },
    removeItem({ commit }, payload) {
      fetch("http://localhost:8100/equipment/" + payload, { method: "DELETE" })
        .then((resp) => {
          if (resp.ok) {
            commit("removeItem", payload);
          } else {
            throw resp;
          }
        })
        .catch((err) => {
          commit("setLoading", false);
          err.json().then((data) => {
            commit("setLoadingError", data.error);
          });
        });
    },
    loadEquipment({ commit }) {
      commit("setLoading", true);
      commit("setLoadingError", null);

      fetch("http://localhost:8100/equipment")
        .then((resp) => {
          if (resp.ok) {
            return resp.json();
          } else {
            throw resp;
          }
        })
        .then((data) => {
          commit("setItems", data);
          commit("setLoading", false);
        })
        .catch((err) => {
          commit("setLoading", false);
          err.json().then((data) => {
            commit("setLoadingError", data.error);
          });
        });
    },
    setShowInactive({ commit }, status) {
      commit("setShowInactive", status);
    },
  },
  getters: {
    items(state) {
      return state.items;
    },
    loading(state) {
      return state.loading;
    },
    loadingError(state) {
      return state.loadingError;
    },
    showInactive(state) {
      return state.showInactive;
    },
  },
};
