<template>
  <div class="list-root">
    <div class="column is-12">
      <div class="list-wrapper">
          <ListItem v-if="focusItem" :item="this.focusItem" />
        <ListItem
          v-for="(item, key) in locations"
          :key="key"
          :item="item"
          class="hospital-item"
        />
        <a
          class="button is-white is-fullwidth hospital-item"
          @click="loadNextPart"
          v-if="!lastPart"
          :class="{ 'is-loading': loading }"
          >Load more</a
        >
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import eventBus from "@/eventbus";
import ListItem from "./ListItem";
export default {
  components: { ListItem },
  data: () => ({
    firstLoad: false,
    focusItem: null
  }),
  computed: {
    ...mapState("locations", ["locations", "lastPart", "loading"]),
  },
  methods: {
    loadNextPart() {
      this.$store.dispatch("locations/loadNextPart");
    },
    
  },
  mounted() {
    this.loadNextPart();
    eventBus.$on("focusItem", _ => (this.focusItem = _))
  },
  watch: {
    locations(to) {
      if (to && to.length > 0 && !this.firstLoad) {
        this.firstLoad = true;
        eventBus.$emit("showOnMap", to[0]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.list-wrapper {
  height: 100%;
}

.hospital-item:last-child {
  margin-bottom: 1rem;
}

.list-root > .column {
  flex: 1;
  overflow: auto;
  @include touch() {
    overflow: hidden;
  }
}
</style>
