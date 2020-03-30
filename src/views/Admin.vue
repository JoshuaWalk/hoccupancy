<template>
  <div class="">
    <Nav class="nav-component" />
    <router-view />
  </div>
</template>
<script>
import Nav from "@/components/admin/Nav";
export default {
  components: {
    Nav
  },
  mounted() {
    document.body.classList.add("has-navbar-fixed-top");
  }
};
</script>
