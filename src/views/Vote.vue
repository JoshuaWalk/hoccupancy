<template>
  <div>
    <Nav class="nav-component" />

    <section class="hero" v-if="location">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title">Your report</h1>
          <h2 class="subtitle">
            What is the current status at
            <router-link
              :to="{ name: 'detailed', params: { id: location.id } }"
              :title="location.name"
              >{{ location.Name }}</router-link
            >?
          </h2>
        </div>
      </div>
    </section>
    <VoteForm />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import VoteForm from "@/components/VoteForm";
import { mapState } from "vuex";
export default {
  props: ["id"],
  components: {
    Nav,
    VoteForm
  },
  computed: {
    ...mapState("location", ["location"]),
    ...mapState("user", ["currentUser"])
  },
  mounted() {
    document.body.classList.add("has-navbar-fixed-top");
    this.$store.dispatch("location/clear");
    this.$store.dispatch("location/load", { id: this.id });
  }
};
</script>
