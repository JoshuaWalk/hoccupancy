<template>
  <div class="modal " :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <section class="section">
          <div class="container" v-if="!emailSent">
            <h1 class="title">PLease verify your email</h1>
            <h2 class="subtitle">
              We kindly ask you to do it to prevent malicious activity
            </h2>
            <form v-on:submit.prevent="requestConfirmation">
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="email"
                    placeholder="your email"
                    v-model="email"
                  />
                </div>
              </div>
              <vue-recaptcha :sitekey="siteKey" :loadRecaptchaScript="true"></vue-recaptcha>
              <div class="field is-grouped">
                <div class="control">
                  <button class="button is-h" type="submit">
                    Confirm
                  </button>
                </div>
                <div class="control">
                  <a class="button is-light" @click="cancel">
                    Cancel
                  </a>
                </div>
              </div>
            </form>
          </div>
          <div class="container has-text-centered" v-else>
            <h2 class="subtitle has-text-info">
              We have sent an email with a confirmation link to you
              <EmailOutline />
            </h2>
          </div>
        </section>
      </div>
    </div>
    <button
      class="modal-close is-large"
      aria-label="close"
      @click="cancel"
    ></button>
  </div>
</template>
<script src='https://www.google.com/recaptcha/api.js'></script>
<script>
import EmailOutline from "mdi-vue/EmailOutline";
import eventBus from "@/eventbus";
import VueRecaptcha from 'vue-recaptcha';
import { mapState } from "vuex";

export default {
  components: {
    EmailOutline,
    VueRecaptcha
  },
  data: () => ({
    locationId: null,
    email: "",
    emailSent: false,
    isActive: false,
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY
  }),
  computed: {
    ...mapState("user", ["currentUser"])
  },
  methods: {
    requestConfirmation() {
      const gResponse = grecaptcha.getResponse()
      if (gResponse == "" || gResponse == null || gResponse == undefined ) {
        alert('Please check ReCaptcha')
      }
      else {
      this.$store.dispatch("user/requestEmailSignInLink", {
        email: this.email,
        locationId: this.locationId
      });
      this.emailSent = true;
      setTimeout(() => {
        this.cancel();
      }, 2500);
    }},
    cancel() {
      this.isActive = false;
    }
  },
  mounted() {
    eventBus.$on("showModalLogin", locationId => {
      this.locationId = locationId;
      this.isActive = true;
      if (this.emailSent) {
        setTimeout(() => {
          this.cancel();
        }, 2000);
      }
    });
  },
  watch: {
    currentUser() {
      this.emailSent = false;
    }
  }
};
</script>
<style lang="scss" scoped>
.modal {
  z-index: 9999;
}
.modal-content,
.modal-card {
  max-height: inherit;
}
</style>
