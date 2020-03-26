<template>
  <div>
    <Nav class="nav-component" />
    <section class="hero" v-if="detailed">
      <div class="hero-body">
        <div class="container">
          <router-link
            class="button is-h is-small leave-impression"
            :to="{ name: 'vote', params: { id: detailed.id } }"
            :title="detailed.name"
            >Vote</router-link
          >
          <h1 class="title">
            {{ detailed.Name }}
          </h1>
          <h2 class="subtitle">
            {{ detailed.Address }}
          </h2>
          <p>
            <strong>Phone:</strong>&nbsp;<a
              :href="`tel:${detailed.Phone}`"
              v-if="detailed.Phone"
              >{{ detailed.Phone }}</a
            ><span v-else>No phone information</span>
          </p>
          <p>
            <strong>Site:</strong>&nbsp;<a
              :href="detailed.Url"
              v-if="detailed.Url"
              >{{ detailed.Url }}</a
            ><span v-else>No url information</span>
          </p>
        </div>
      </div>
    </section>
    <section class="section">
      <VoteItem v-for="(item, key) in votes" :key="key" :item="item"/>
    </section>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import VoteItem from "@/components/VoteItem";
import { mapState } from "vuex";
export default {
  props: ["id"],
  components: {
    VoteItem,
    Nav
  },
  computed: {
    ...mapState("locations", ["detailed", "votes"])
  },
  mounted() {
    this.$store.dispatch("locations/detailed", { id: this.id });
    this.$store.dispatch("locations/votes", { id: this.id });
  },
  beforeDestroy() {
    this.$store.dispatch("locations/detailedClear");
  }
};
</script>
<style lang="scss" scoped>
.leave-impression {
  float: right;
}
</style>
