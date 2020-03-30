<template>
  <div>
    <Nav class="nav-component" />
    <Info />
    <section class="hero" v-if="location">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Make a report</h1>
          <h2 class="subtitle">
            How are conditions at
            <router-link
              :to="{ name: 'detailed', params: { id: location.id } }"
              :title="location.name"
              >{{ location.Name }}</router-link
            >? Share what you’ve seen. Please indicate whether you are a
            patient, family member, or member of hospital staff. Don’t forget to
            include the date and time of your observation.
          </h2>
          <p>
            (Note: the situation at hospitals can change rapidly. Do not report
            information older than 24 hours)
          </p>
        </div>
      </div>
    </section>
    <VoteForm v-if="currentUser" class="vote-form" />
    <VoteEmailConfirmation v-else />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import VoteForm from "@/components/VoteForm";
import Info from "@/components/Info";
import VoteEmailConfirmation from "@/components/VoteEmailConfirmation";
import { mapState } from "vuex";
export default {
  props: ["id"],
  components: {
    Nav,
    Info,
    VoteForm,
    VoteEmailConfirmation
  },
  computed: {
    ...mapState("location", ["location"]),
    ...mapState("user", ["currentUser"])
  },
  mounted() {
    this.$store.dispatch("location/load", { id: this.id });
  },
  beforeDestroy() {
    this.$store.dispatch("location/clear");
  }
};
</script>
