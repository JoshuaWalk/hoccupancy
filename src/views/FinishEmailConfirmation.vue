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
        <form @submit.prevent="verifyEmail">
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
              <button class="button is-h">
                Confirm
              </button>
            </p>
          </div>
        </form>
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
        if (this.$route.query.locationId) {
          this.$router.push({
            name: this.$route.query.vote ? "vote" : "detailed",
            params: { id: this.$route.query.locationId }
          });
        } else {
          this.$router.push({
            name: "main"
          });
        }
      } catch (error) {
        this.error = error.message;
        this.needToInput = false;
        setTimeout(() => {
          this.$router.push({ name: "main" });
        }, 3000);
      }
    }
  },
  async mounted() {
    this.$store.dispatch("location/clear");
    document.body.classList.remove("has-navbar-fixed-top");
    this.email = await this.$store.dispatch("user/retrieveEmail");
    this.needToInput = !this.email;
    if (!this.needToInput) await this.verifyEmail();
  }
};
</script>
