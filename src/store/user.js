import { Auth } from "@/firebase";

export default {
  namespaced: true,
  state: {
    currentUser: null
  },
  mutations: {
    currentUser: (state, currentUser) => (state.currentUser = currentUser)
  },
  actions: {
    saveEmail: async (_, email) =>
      window.localStorage.setItem("emailForSignIn", email),
    deleteEmail: async () => window.localStorage.removeItem("emailForSignIn"),
    retrieveEmail: async () => window.localStorage.getItem("emailForSignIn"),
    load({ commit }) {
      commit("currentUser", Auth.currentUser);
    },
    async requestEmailSignInLink({ dispatch }, { email, locationId }) {
      var actionCodeSettings = {
        url: `${process.env.VUE_APP_FIREBASE_EMAIL_SIGNIN_URL}?locationId=${locationId}`,
        handleCodeInApp: true
      };
      await Auth.sendSignInLinkToEmail(email, actionCodeSettings);
      dispatch("saveEmail", email);
    },
    async verifyEmailSignInLink({ commit, dispatch }, { email }) {
      if (Auth.isSignInWithEmailLink(window.location.href)) {
        if (!email) throw new Error("Empty email");
        await Auth.signInWithEmailLink(email, window.location.href);
        dispatch("deleteEmail");
        commit("currentUser", Auth.currentUser);
      }
    },
    async signOut({ commit }) {
      await Auth.signOut();
      commit("currentUser", Auth.currentUser);
    }
  }
};
