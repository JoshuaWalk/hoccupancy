import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "leaflet/dist/leaflet.css";
import { Auth } from "./firebase";
Vue.config.productionTip = false;

let app = null;
Auth.onAuthStateChanged(async () => {
  if (!app) {
    await store.dispatch("user/load");
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
