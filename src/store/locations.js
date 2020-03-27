import { DB } from "@/firebase";

function calculateCurrentStats({ g, y, r }) {
  if (g > 0 || y > 0 || r > 0) {
    let avg = (g * 0.01 + y * 0.505 + r * 0.995) / (g + y + r);
    let status = "g";
    if (avg > 0.66) {
      status = "r";
    } else if (avg > 0.33) {
      status = "y";
    } else {
      status = "g";
    }
    return { status, amounts: { g, r, y } };
  }
  return { status: null, amounts: { g, r, y } };
}

export default {
  namespaced: true,
  state: {
    items: [],
    votes: [],
    detailed: null
  },
  mutations: {
    items: (state, items) => (state.items = items),
    detailed: (state, detailed) => (state.detailed = detailed),
    votes: (state, votes) => (state.votes = votes)
  },
  actions: {
    async detailed({ commit }, { id }) {
      let snapShot = await DB.collection("locations")
        .doc(id)
        .get();
      let item = snapShot.data();
      item.id = id;
      item.statistics = calculateCurrentStats(item);
      commit("detailed", item);
    },
    async detailedClear({ commit }) {
      window.console.log("detailedClear")
      commit("detailed", null);
      commit("votes", []);
    },
    async list({ commit }) {
      let snapShot = await DB.collection("locations").get();
      let items = [];
      snapShot.forEach(_ =>
        items.push(Object.assign({}, { id: _.id }, _.data()))
      );
      items.forEach(_ => (_.statistics = calculateCurrentStats(_)));
      commit("items", items);
    },
    async vote(_, { id, comment, status }) {
      await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .doc()
        .set({
          comment,
          status,
          uid: this.state.user.currentUser.uid,
        });
    },
    async votes({ commit }, { id }) {
      let votesSnaphot = await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .orderBy("createdAt", "desc")
        .get();
      let votes = [];
      votesSnaphot.forEach(_ => votes.push(Object.assign({}, _.data(), {id:_.id})));

      commit("votes", votes);
    },
    report: async (_, { id, voteId }) => {
      await DB.collection("locations")
        .doc(id).collection('votes').doc(voteId)
        .update({
          reported: true
        })
    }
  }
};
