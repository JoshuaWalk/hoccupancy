<template>
  <div class=" main-page">
    <ModalLogin />
    <Nav class="nav-component" />
    <div class="columns without-side-margins list-main-wrapper">
      <List
        class="column is-12-touch is-6-desktop columns is-multiline is-marginless list-wrapper without-side-paddings without-side-margins"
      />
      <div
        class="column is-12-touch is-6-desktop without-side-paddings map-view"
      >
        <Map />
      </div>
    </div>
    <MainFooter />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import List from "@/components/List";
import Map from "@/components/Map";
import MainFooter from "@/components/MainFooter";
import ModalLogin from "@/components/ModalLogin";
import { mapState } from "vuex";
export default {
  components: {
    Nav,
    MainFooter,
    List,
    Map,
    ModalLogin
  },
  computed: {
    ...mapState("locations", ["lastPart"])
  },
  mounted() {
    document.body.classList.add("has-navbar-fixed-top");
  }
};
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.list-main-wrapper {
  align-items: stretch;
  height: 100%;
  & > .column {
    padding-bottom: 0;
  }
}
.main-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  & > .columns {
    overflow: auto;
  }
}
.without-side-paddings {
  padding: 0 !important;
}
.without-side-margins {
  margin-left: 0 !important;
  margin-right: 0 !important;
  margin-top: 0 !important;
}
.list-wrapper {
  min-height: 0px;
  flex-direction: column;
}
.map-view {
  @include touch() {
    display: none;
  }
}
</style>
