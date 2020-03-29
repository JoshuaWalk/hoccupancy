import Vue from "vue";
import Vuex from "vuex";
import locations from "@/store/locations";
import location from "@/store/location";
import user from "@/store/user";
import reports from "@/store/admin/reports";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    locations,
    location,
    user,
    reports
  }
});
