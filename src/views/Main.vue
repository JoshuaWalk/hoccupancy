<template>
  <div class=" main-page">
    <Nav class="nav-component" />
    <div class="columns without-side-margins hlist-main-wrapper">
      <div
        class="column is-12-touch is-6-desktop columns is-multiline is-marginless hlist-wrapper without-side-paddings without-side-margins"
      >
        <div class="column is-12">
          <HList />
        </div>
      </div>
      <div class="column is-12-touch is-6-desktop without-side-paddings map-view">
        <HMap />
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import HList from "@/components/HList";
import HMap from "@/components/HMap";
export default {
  components: {
    Nav,
    HList,
    HMap
  },
  mounted() {
    this.$store.dispatch("locations/list");
  }
};
</script>
<style scoped lang="scss">
@import "~bulma/sass/utilities/_all";
.hlist-main-wrapper {
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
.hlist-wrapper {
  min-height: 0px;
  flex-direction: column;
  & > .column {
    flex: 1;
    overflow: auto;
  }
}
.map-view{
  @include touch(){
    display: none;
  }
}
</style>
