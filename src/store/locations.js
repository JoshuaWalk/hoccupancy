import { DB } from "@/firebase";
export default {
  namespaced: true,
  state: {
    items: [],
    detailed: null,
  },
  mutations: {
    items: (state, items) => (state.items = items),
    detailed: (state, detailed) => (state.detailed = detailed)
  },
  actions: {
    async detailed({ commit },{id}) {
      let snapShot = await DB.collection("locations").doc(id).get();
      let item = snapShot.data();
      item.id = id;
      
      //start todo
      let statuses = ["g", "y", "r"];
      item.status = statuses[Math.floor(Math.random() * statuses.length)]
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
    }
  }
};
