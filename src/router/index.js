import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";
import Detailed from "../views/Detailed.vue";
import Vote from "../views/Vote.vue";
import FinishEmailConfirmation from "../views/FinishEmailConfirmation.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Main
  },
  {
    path: "/email-confirmation",
    name: "email-confirmation",
    component: FinishEmailConfirmation
  },
  {
    path: "/:id/vote",
    name: "vote",
    component: Vote,
    props: true
  },
  {
    path: "/:id",
    name: "detailed",
    component: Detailed,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
