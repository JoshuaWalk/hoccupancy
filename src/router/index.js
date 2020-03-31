import Vue from "vue";
import VueRouter from "vue-router";
import MainWrapper from "../views/MainWrapper.vue";
import DetailedWrapper from "../views/DetailedWrapper.vue";
import Vote from "../views/Vote.vue";
import FinishEmailConfirmation from "../views/FinishEmailConfirmation.vue";
import EmailSignIn from "../views/EmailSignIn.vue";
import Admin from "../views/Admin.vue";
import ListReport from "../components/admin/ListReport";
import store from "../store";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: MainWrapper
  },
  {
    path: "/admin",
    component: Admin,
    children: [
      {
        path: "reports",
        name: "reports",
        component: ListReport,
        meta: {
          requiresAuth: true,
          adminRights: true // todo check flag
        }
      },
      {
        path: "",
        redirect: "reports"
      }
    ]
  },
  {
    path: "/signin",
    name: "signin",
    component: EmailSignIn
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
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/:id",
    name: "detailed",
    component: DetailedWrapper,
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = store.state.user.currentUser;
  const requiresAuth = to.matched.some(route => route.meta.requiresAuth);
  if (requiresAuth && !currentUser) next({ name: "signin" });
  else next();
});

export default router;
