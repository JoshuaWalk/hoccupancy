<template>
  <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="/svg/logo.svg"
          width="28"
          height="28"
        />
      </router-link>
    </div>
  </nav>
</template>
<style scoped>
.navbar-brand {
  margin-left: 0 !important;
}
.navbar{
  box-shadow: 0 0.1em 0.5em -0.125em rgba(10, 10, 10, 0.1);
}
</style>