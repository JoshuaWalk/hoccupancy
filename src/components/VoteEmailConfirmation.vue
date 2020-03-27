<template>
  <section class="hero">
    <div class="hero-body">
      <div class="field is-grouped" v-if="!emailSent">
        <p class="control is-expanded">
          <input
            class="input"
            type="email"
            placeholder="Your email"
            v-model="email"
          />
        </p>
        <p class="control">
          <a class="button is-h" @click="requestConfirmation">
            Confirm
          </a>
        </p>
      </div>
      <div class="container has-text-centered"  v-else>
        <h2 class="subtitle">
          We have sent an email with a confirmation link to your email
          address...
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data: () => ({
    email: "",
    emailSent: false
  }),
  methods: {
    requestConfirmation() {
      this.$store.dispatch("user/requestEmailSignInLink", {
        email: this.email,
        locationId: this.$route.params.id
      });
      this.emailSent = true;
    }
  }
};
</script>
