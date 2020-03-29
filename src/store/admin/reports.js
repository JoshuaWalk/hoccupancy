import { DB } from "@/firebase";
const reportPageSize = 7;
export default {
  namespaced: true,
  state: {
    reports: [],
    startAfter: null,
    lastPart: false,
    loading: false
  },
  mutations: {
    reports: (state, reports) => (state.reports = reports),
    startAfter: (state, startAfter) => (state.startAfter = startAfter),
    lastPart: (state, lastPart) => (state.lastPart = lastPart),
    loading: (state, loading) => (state.loading = loading)
  },
  actions: {
    async loadNextPart({ commit, state }) {
      commit("loading", true);
      try {
        let query = DB.collection("report").orderBy("reportedAt");
        if (state.startAfter) {
          query = query.startAfter(state.startAfter);
        }
        let reportsSnapshot = await query.limit(reportPageSize).get();
        let size = reportsSnapshot.size;
        if (size < reportPageSize) commit("lastPart", true);
        if (size == 0) return;
        commit("startAfter", reportsSnapshot.docs[size - 1]);

        let reports = [];
        reportsSnapshot.forEach(_ =>
          reports.push(Object.assign({}, { id: _.id }, _.data()))
        );
        commit("reports", [...state.reports, ...reports]);
      } finally {
        commit("loading", false);
      }
    },
    async deleteReport({ state, commit }, { locationId, voteId, index }) {
      await DB.collection("locations")
        .doc(locationId)
        .collection("votes")
        .doc(voteId)
        .delete();
      let reports = [...state.reports];
      reports.splice(index, 1);
      commit("reports", reports);
    },
    async clear({ commit }) {
      commit("reports", []);
      commit("startAfter", null);
      commit("lastPart", false);
      commit("loading", false);
    },
    async updateAndPublish(
      { state, commit },
      { locationId, voteId, index, comment }
    ) {
      await DB.collection("locations")
        .doc(locationId)
        .collection("votes")
        .doc(voteId)
        .update({ comment, reported: false });

      let reports = [...state.reports];
      reports.splice(index, 1);
      commit("reports", reports);
    }
  }
};
