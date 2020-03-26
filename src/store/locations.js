import { DB, FieldValue } from "@/firebase";
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
    votes: (state, votes) => (state.votes = votes),
  },
  actions: {
    async detailed({ commit }, { id }) {
      let snapShot = await DB.collection("locations")
        .doc(id)
        .get();
      let item = snapShot.data();
      item.id = id;

      //start todo
      let statuses = ["g", "y", "r"];
      item.status = statuses[Math.floor(Math.random() * statuses.length)];
      //end todo
      commit("detailed", item);
    },
    async detailedClear({ commit }) {
      commit("detailed", null);
    },
    async list({ commit }) {
      let snapShot = await DB.collection("locations").get();
      let items = [];
      snapShot.forEach(_ =>
        items.push(Object.assign({}, { id: _.id }, _.data()))
      );
      //start todo
      let statuses = ["g", "y", "r"];
      items.forEach(
        _ => (_.status = statuses[Math.floor(Math.random() * statuses.length)])
      );
      //end todo
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
          createdAt: FieldValue.serverTimestamp()
        });
    },
    async votes({commit}, { id }) {
      let votesSnaphot = await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .get();
        let votes = [];
      votesSnaphot.forEach(_=>votes.push(_.data()));
      commit("votes", votes);
    }
  }
};
