<template>
  <div>
    <ModalLogin />
    <Nav class="nav-component" />
    <section class="hero" v-if="location">
      <div class="hero-body">
        <div class="container">
          <a
            class="button is-h is-small leave-impression"
            @click="leaveFeedback"
            :title="location.name"
            >Vote</a
          >
          <h1 class="title">
            {{ location.Name }}
          </h1>
          <h2 class="subtitle">
            {{ location.Address }}
          </h2>
          <p>
            <strong>Phone:</strong>&nbsp;<a
              :href="`tel:${location.Phone}`"
              v-if="location.Phone"
              >{{ location.Phone }}</a
            ><span v-else>No phone information</span>
          </p>
          <p>
            <strong>Site:</strong>&nbsp;<a
              :href="location.Url"
              v-if="location.Url"
              >{{ location.Url }}</a
            ><span v-else>No url information</span>
          </p>
        </div>
      </div>
    </section>
    <VoteList />
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import ModalLogin from "@/components/ModalLogin";
import VoteList from "@/components/VoteList";
import { mapState } from "vuex";
import eventBus from "@/eventbus";
export default {
  props: ["id"],
  components: {
    VoteList,
    Nav,
    ModalLogin
  },
  computed: {
    ...mapState("location", ["location"]),
    ...mapState("location/votes", ["lastPart"]),
    ...mapState("user", ["currentUser"])
  },
  mounted() {
    this.$store.dispatch("location/load", { id: this.id });
  },
  methods: {
    leaveFeedback() {
      if (!this.currentUser) {
        eventBus.$emit("showModalLogin", this.id);
        return;
      }
      this.$router.push({ name: "vote", params: { id: this.location.id } });
    }
  },
  beforeDestroy() {
    this.$store.dispatch("location/clear");
  }
};
</script>
<style lang="scss" scoped>
.leave-impression {
  float: right;
}
</style>
