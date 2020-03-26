import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Detailed from "../views/Detailed.vue";
import Vote from "../views/Vote.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/:id",
    name: "detailed",
    component: Detailed,
    props: true
  },
  {
    path: "/:id/vote",
    name: "vote",
    component: Vote,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
