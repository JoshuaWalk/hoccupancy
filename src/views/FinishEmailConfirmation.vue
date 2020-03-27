<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container" v-if="!needToInput">
        <h1 class="title">
          Email confirmation
        </h1>
        <h2 class="subtitle" v-if="!error">
          You'll be able to continue in few seconds...
        </h2>
        <h2 class="subtitle has-text-danger" v-else>
          {{ error }}
        </h2>
      </div>
      <div class="container" v-else>
        <h1 class="title">
          Please confirm your email to make sure that it's exact you...
        </h1>
        <div class="field is-grouped">
          <p class="control is-expanded">
            <input
              class="input"
              type="email"
              placeholder="Your email"
              v-model="email"
            />
          </p>
          <p class="control">
            <a class="button is-h" @click="verifyEmail">
              Confirm
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    needToInput: true,
    email: "",
    error: ""
  }),
  methods: {
    async verifyEmail() {
      try {
        await this.$store.dispatch("user/verifyEmailSignInLink", {
          email: this.email
        });
        this.$router.push({
          name: "vote",
          params: { id: this.$route.query.locationId }
        });
      } catch (error) {
        this.error = error.message;
        setTimeout(() => {
          this.$router.push({ name: "main" });
        }, 2500);
      }
    }
  },
  async mounted() {
    document.body.classList.remove("has-navbar-fixed-top");
    this.email = await this.$store.dispatch("user/retrieveEmail");
    this.needToInput = !this.email;
    if (!this.needToInput) await this.verifyEmail();
  },
  beforeDestroy() {
    document.body.classList.add("has-navbar-fixed-top");
    this.$store.dispatch("locations/detailedClear");
  }
};
</script>
