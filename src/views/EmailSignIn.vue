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
            <vue-recaptcha :sitekey="siteKey" :loadRecaptchaScript="true"></vue-recaptcha>
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

<script src='https://www.google.com/recaptcha/api.js'></script>
<script>
import EmailOutline from "mdi-vue/EmailOutline";
import VueRecaptcha from 'vue-recaptcha';


export default {
  components: { EmailOutline, VueRecaptcha },
  data: () => ({
    email: "",
    emailSent: false,
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY
  }),
  methods: {
    requestConfirmation() {
      const gResponse = grecaptcha.getResponse()
      if (gResponse == "" || gResponse == null || gResponse == undefined ) {
        alert('Please check ReCaptcha')
      }
      else {
      this.$store.dispatch("user/requestEmailSignInLink", {
        email: this.email,
        locationId: this.$route.params.id
      });
      this.emailSent = true;
      setTimeout(() => {
        this.goToMain();
      }, 2500);
    }},
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
