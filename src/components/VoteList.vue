<template>
  <section class="section" v-show="location">
    <VoteItem v-for="(item, key) in votes" :key="key" :item="item" />
    <a
      class="button is-white is-fullwidth hospital-item"
      @click="loadNextPartVotes"
      v-if="!lastPart"
      :class="{ 'is-loading': loading }"
      >Load more</a
    >
  </section>
</template>
<script>
import VoteItem from "@/components/VoteItem";
import { mapState } from "vuex";
import pageScrollDownHandler from "@/mixins/pageScrollDownHandler";
export default {
  mixins: [pageScrollDownHandler("loadNextPartVotes")],
  props: ["id"],
  components: {
    VoteItem
  },
  computed: {
    ...mapState("location/votes", ["votes", "loading", "lastPart"]),
    ...mapState("location", ["location"])
  },
  methods: {
    loadNextPartVotes() {
      this.$store.dispatch("location/votes/loadNextPart");
    }
  },
  watch: {
    location(to) {
      if (to) {
        this.loadNextPartVotes();
      }
    }
  }
};
</script>
