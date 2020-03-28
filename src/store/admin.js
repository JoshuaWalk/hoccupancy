import { DB } from "@/firebase";

export default {
  namespaced: true,
  state: {
    reports: []
  },
  mutations: {
    reports: (state, reports) => (state.reports = reports)
  },
  actions: {
    async listReports({ commit }) {
      let reports = [];
      let reportsSnapshot = await DB.collection("report").get();
      reportsSnapshot.forEach(_ => reports.push(_.data()));
      commit("reports", reports);
    },
    async deleteReport({ state,commit }, { locationId, voteId, index }) {
      await DB.collection("locations")
        .doc(locationId)
        .collection("votes")
        .doc(voteId)
        .delete();
      let reports = [...state.reports];
      reports.splice(index, 1)
      commit("reports", reports);
    },
    async updateAndPublishReport({ state,commit }, { locationId, voteId, index, comment }) {
      await DB.collection("locations")
        .doc(locationId)
        .collection("votes")
        .doc(voteId)
        .update({comment, reported: false});

      let reports = [...state.reports];
      reports.splice(index, 1)
      commit("reports", reports);
    }
  }
};
