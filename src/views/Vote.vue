<template>
  <div>
    <Nav class="nav-component" />
    <section class="hero" v-if="detailed">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">
            Leave you impression about
            <router-link
              :to="{ name: 'detailed', params: { id: detailed.id } }"
              :title="detailed.name"
              >{{ detailed.Name }}</router-link
            >
          </h1>
        </div>
      </div>
    </section>
    <VoteForm v-if="currentUser" />
    <VoteEmailConfirmation v-else />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import VoteForm from "@/components/VoteForm";
import VoteEmailConfirmation from "@/components/VoteEmailConfirmation";
import { mapState } from "vuex";
export default {
  props: ["id"],
  components: {
    Nav,
    VoteForm,
    VoteEmailConfirmation
  },
  computed: {
    ...mapState("locations", ["detailed"]),
    ...mapState("user", ["currentUser"])
  },
  mounted() {
    this.$store.dispatch("locations/detailed", { id: this.id });
  },
  beforeDestroy() {
    this.$store.dispatch("locations/detailedClear");
  }
};
</script>
