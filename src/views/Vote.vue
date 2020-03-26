<template>
  <div>
    <Nav class="nav-component" />
    <section class="hero" v-if="detailed">
      <div class="hero-body">
        <div class="container">
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
    <section class="section">
      <div class="buttons has-addons is-centered">
        <button
          class="button is-large"
          @click="status = 'g'"
          :class="{ 'is-selected is-success': status == 'g' }"
        >
          Ok
        </button>
        <button
          class="button is-large"
          @click="status = 'y'"
          :class="{ 'is-selected is-warning': status == 'y' }"
        >
          Not OK
        </button>
        <button
          class="button is-large"
          @click="status = 'r'"
          :class="{ 'is-selected is-danger': status == 'r' }"
        >
          Bad
        </button>
      </div>
      <div class="field">
        <label class="label">Comment</label>
        <div class="control">
          <textarea
            class="textarea"
            placeholder="Comment"
            v-model="comment"
          ></textarea>
        </div>
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-h" @click="vote">Submit</button>
        </div>
        <div class="control">
          <button class="button is-light" @click="$router.go(-1)">Cancel</button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Nav from "@/components/Nav";
import { mapState } from "vuex";
export default {
  props: ["id"],
  components:{
    Nav
  },
  data: () => ({
    status: 'g',
    comment: ""
  }),
  computed: {
    ...mapState("locations", ["detailed"])
  },
  methods:{
    async vote(){
      await this.$store.dispatch('locations/vote',{
        id: this.id,
        comment: this.comment,
        status: this.status
      })
      this.$router.go(-1)
    }
  },
  mounted() {
    this.$store.dispatch("locations/detailed", { id: this.id });
  },
  beforeDestroy() {
    this.$store.dispatch("locations/detailedClear");
  }
};
</script>
