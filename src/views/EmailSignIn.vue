<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container" v-if="!emailSent">
        <h1 class="title">PLease verify your email</h1>
        <h2 class="subtitle">
          We kindly ask you to do it to prevent malicious activity
        </h2>
        <form v-on:submit.prevent="requestConfirmation">
          <div class="field has-addons has-addons-centered">
            <p class="control">
              <a class="button is-light" @click="goToMain">
                Cancel
              </a>
            </p>
            <p class="control is-expanded">
              <input
                class="input"
                type="email"
                placeholder="Your email"
                v-model="email"
              />
            </p>
            <p class="control">
              <button class="button is-h" type="submit">
                Confirm
              </button>
            </p>
          </div>
        </form>
      </div>
      <div class="container has-text-centered" v-else>
        <h2 class="subtitle has-text-info">
          We have sent an email with a confirmation link to you <EmailOutline />
        </h2>
      </div>
    </div>
  </section>
</template>
<script>
import EmailOutline from "mdi-vue/EmailOutline";

export default {
  components: { EmailOutline },
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
      setTimeout(() => {
        this.goToMain();
      }, 2500);
    },
    goToMain() {
      this.$router.go(-1);
    }
  },
  mounted() {
    document.body.classList.remove("has-navbar-fixed-top");
  },
  beforeDestroy() {
    document.body.classList.add("has-navbar-fixed-top");
  }
};
</script>
