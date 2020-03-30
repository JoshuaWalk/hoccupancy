<template>
  <nav
    class="navbar is-fixed-top"
    role="navigation"
    aria-label="main navigation"
  >
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img src="/svg/logo.svg" width="28" height="28" />
      </router-link>
      <a
        role="button"
        class="navbar-burger burger"
        aria-label="menu"
        aria-expanded="false"
        @click="isActive = !isActive"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="navbar-menu" :class="{ 'is-active': isActive }">
      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons" v-if="currentUser">
            <router-link
              class="button is-h is-outlined is-fullwidth-mobile is-small"
              v-if="hasAdminRight"
              :to="{ name: 'reports' }"
            >
              Administration panel
            </router-link>
            <a
              class="button is-h is-outlined is-fullwidth-mobile is-small"
              @click="logOut"
            >
              Log out
            </a>
          </div>
          <div class="buttons" v-else>
            <a
              class="button is-h is-outlined is-fullwidth-mobile is-small"
              @click="logIn"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import { mapState } from "vuex";
import eventBus from "@/eventbus";
export default {
  data: () => ({
    isActive: false
  }),
  computed: {
    ...mapState("user", ["currentUser", "roles"]),
    hasAdminRight() {
      return this.roles && this.roles.length > 0;
    }
  },
  methods: {
    async logOut() {
      await this.$store.dispatch("user/signOut");
      if (this.$route.name != "main") {
        this.$router.push({ name: "main" });
      }
      this.isActive = false;
    },
    async logIn() {
      eventBus.$emit("showModalLogin", {});
      this.isActive = false;
    }
  }
};
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.navbar-brand {
  margin-left: 0 !important;
}
.navbar {
  box-shadow: 0 0.1em 0.5em -0.125em rgba(10, 10, 10, 0.1);
}
.is-fullwidth-mobile {
  @include touch() {
    margin-right: 0 !important;
    display: flex;
    width: 100%;
  }
}
</style>
