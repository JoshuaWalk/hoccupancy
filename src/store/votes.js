import { DB } from "@/firebase";
const votesPageSize = 7;
export default {
  namespaced: true,
  state: {
    votes: [],
    startAfter: null,
    lastPart: false,
    loading: false
  },
  mutations: {
    votes: (state, votes) => (state.votes = votes),
    startAfter: (state, startAfter) => (state.startAfter = startAfter),
    lastPart: (state, lastPart) => (state.lastPart = lastPart),
    loading: (state, loading) => (state.loading = loading)
  },
  actions: {
    async clear({ commit }) {
      commit("votes", []);
      commit("loading", false);
      commit("lastPart", null);
      commit("startAfter", null);
    },
    async vote(_, { comment, status }) {
      let id = this.state.location.id;
      await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .doc()
        .set({
          comment,
          status,
          uid: this.state.user.currentUser.uid
        });
    },
    async loadNextPart({ commit, state }) {
      if (this.state.loading) return;
      commit("loading", true);
      try {
        let id = this.state.location.id;
        let query = DB.collection("locations")
          .doc(id)
          .collection("votes")
          .orderBy("createdAt", "desc");
        if (state.startAfter) {
          query = query.startAfter(state.startAfter);
        }
        let votesSnaphot = await query.limit(votesPageSize).get();
        let size = votesSnaphot.size;
        if (size < votesPageSize) commit("lastPart", true);
        if (size == 0) return;
        commit("startAfter", votesSnaphot.docs[size - 1]);

        let votes = [];
        votesSnaphot.forEach(_ =>
          votes.push(Object.assign({}, _.data(), { id: _.id }))
        );
        commit("votes", [...state.votes, ...votes]);
      } finally {
        commit("loading", false);
      }
    },
    async report(_, { voteId }) {
      let id = this.state.location.id;
      await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .doc(voteId)
        .update({
          reported: this.state.user.currentUser.uid
        });
    }
  }
};
