import Vue from "vue";
import Vuex from "vuex";
import locations from "@/store/locations";
import user from "@/store/user";
import admin from "@/store/admin";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    locations,
    user,
    admin
  }
});
