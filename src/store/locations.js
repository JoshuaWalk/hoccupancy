import { DB } from "@/firebase";
import calcStatus from "@/extras/calcStatus";
const locationPageSize = 66;
export default {
  namespaced: true,
  state: {
    locations: [],
    startAfter: null,
    lastPart: false,
    loading: false
  },
  mutations: {
    locations: (state, locations) => (state.locations = locations),
    startAfter: (state, startAfter) => (state.startAfter = startAfter),
    lastPart: (state, lastPart) => (state.lastPart = lastPart),
    loading: (state, loading) => (state.loading = loading)
  },
  actions: {
    async loadNextPart({ commit, state }) {
      if (this.state.loading) return;
      commit("loading", true);
      try {
        let query = DB.collection("locations");
        if (state.startAfter) {
          query = query.startAfter(state.startAfter);
        }
        let locationSnapshot = await query.limit(locationPageSize).get();
        let size = locationSnapshot.size;
        if (size < locationPageSize) commit("lastPart", true);
        if (size == 0) return;
        commit("startAfter", locationSnapshot.docs[size - 1]);
        let locations = [];
        locationSnapshot.forEach(_ => {
          let data = _.data();
          locations.push(
            Object.assign({}, { id: _.id }, data, {
              statistics: calcStatus(data)
            })
          );
        });
        commit("locations", [...state.locations, ...locations]);
      } finally {
        commit("loading", false);
      }
    },
    clear({ commit }) {
      commit("locations", []);
      commit("startAfter", null);
      commit("lastPart", false);
      commit("loading", false);
    }
  }
};
