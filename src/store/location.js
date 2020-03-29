import { DB } from "@/firebase";
import calcStatus from "@/extras/calcStatus";
import votes from "@/store/votes";
export default {
  namespaced: true,
  modules: {
    votes
  },
  state: {
    id: null,
    location: null,
    loading: false
  },
  mutations: {
    location: (state, location) => (state.location = location),
    loading: (state, loading) => (state.loading = loading),
    id: (state, id) => (state.id = id)
  },
  actions: {
    async load({ commit }, { id }) {
      commit("loading", true);
      commit("id", id);
      try {
        let snapShot = await DB.collection("locations")
          .doc(id)
          .get();
        let location = snapShot.data();
        location.id = id;
        location.statistics = calcStatus(location);
        commit("location", location);
      } finally {
        commit("loading", false);
      }
    },
    async clear({ commit, dispatch }) {
      commit("location", null);
      dispatch("votes/clear");
      commit("id", null);
    }
  }
};
