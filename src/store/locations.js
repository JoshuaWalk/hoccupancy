import { DB, FieldValue } from "@/firebase";
export default {
  namespaced: true,
  state: {
    items: [],
    status: null,
    votes: [],
    detailed: null
  },
  mutations: {
    items: (state, items) => (state.items = items),
    detailed: (state, detailed) => (state.detailed = detailed),
    votes: (state, votes) => (state.votes = votes)
  },
  actions: {
    async detailed({ commit, dispatch }, { id }) {
      let snapShot = await DB.collection("locations")
        .doc(id)
        .get();
      let item = snapShot.data();
      item.id = id;
      item.status = await dispatch("obtainStatus", id);
      commit("detailed", item);
    },
    async detailedClear({ commit }) {
      commit("detailed", null);
      commit("votes", []);
      commit("status", false);
    },
    async obtainStatus(_, id) {
      let gAmount = (
        await DB.collection("locations")
          .doc(id)
          .collection("votes")
          .where("status", "==", "g")
          .get()
      ).size;
      let yAmount = (
        await DB.collection("locations")
          .doc(id)
          .collection("votes")
          .where("status", "==", "y")
          .get()
      ).size;
      let rAmount = (
        await DB.collection("locations")
          .doc(id)
          .collection("votes")
          .where("status", "==", "r")
          .get()
      ).size;
      if (gAmount > 0 || yAmount > 0 || rAmount > 0) {
        let avg =
          (gAmount * 0.01 + yAmount * 0.505 + rAmount * 0.995) /
          (gAmount + yAmount + rAmount);
        if (avg>0.66) return 'r';
        if (avg>0.33) return 'y';
        return 'g';
      }
      return null;
    },
    async list({ commit, dispatch }) {
      let snapShot = await DB.collection("locations").get();
      let items = [];
      snapShot.forEach(_ =>
        items.push(Object.assign({}, { id: _.id }, _.data()))
      );

      let amountRQs = items.map(_ => dispatch("obtainStatus", _.id));
      let statuses = await Promise.all(amountRQs);
      for (let i = 0; i < items.length; i++) {
        items[i].status = statuses[i];
      }
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
    async votes({ commit }, { id }) {
      let votesSnaphot = await DB.collection("locations")
        .doc(id)
        .collection("votes")
        .get();
      let votes = [];
      votesSnaphot.forEach(_ => votes.push(_.data()));
      commit("votes", votes);
    }
  }
};
