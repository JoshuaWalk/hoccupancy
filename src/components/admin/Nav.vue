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
      <div class="navbar-start">
        <router-link
          class="navbar-item"
          :to="{ name: 'reports' }"
          active-class="is-active"
        >
          Reports
        </router-link>
      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a
              class="button is-fullwidth-mobile is-h  is-small is-outlined"
              @click="logOut"
            >
              Log out
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data: () => ({
    isActive: false
  }),
  methods: {
    async logOut() {
      await this.$store.dispatch("user/signOut");
      this.$router.push({ name: "main" });
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
