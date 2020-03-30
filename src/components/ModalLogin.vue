<template>
  <div class="modal " :class="{ 'is-active': isActive }">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <section class="section">
        <div class="container" v-if="!emailSent">
          <p class="is-size-6 has-text-grey">
          Your email address will not be shown to anyone else.
        </p>
        <p class="is-size-4 has-text-weight-medium">Please verify your email address</p>
        <p class="is-size-6">
          To prevent malicious activity, you’ll have to verify your email
          address. After submitting, please check your inbox and click a link in
          the email we send.
        </p>
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
              <p class="help is-danger" v-if="!isEmailValid">
                Email required
              </p>
            </div>
            <div class="field">
              <vue-recaptcha
                :sitekey="siteKey"
                :loadRecaptchaScript="true"
                class="g-recaptcha"
              ></vue-recaptcha>
              <p class="help is-danger" v-if="!isCaptchaValid">
                Please check captcha
              </p>
            </div>
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
            Please check your inbox and click on the verification link we send.
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
<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
import eventBus from "@/eventbus";
import VueRecaptcha from "vue-recaptcha";
import { mapState } from "vuex";

export default {
  components: {
    VueRecaptcha
  },
  data: () => ({
    locationId: null,
    email: "",
    emailSent: false,
    isActive: false,
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY,
    isCaptchaValid: true,
    isEmailValid: true,
    timeout: null
  }),
  computed: {
    ...mapState("user", ["currentUser"])
  },
  methods: {
    requestConfirmation() {
      const gResponse = grecaptcha.getResponse();
      if (!this.email) {
        this.isEmailValid = false;
        return
      }
      if (gResponse == "" || gResponse == null || gResponse == undefined) {
        this.isCaptchaValid = false;
        return;
      }
      this.$store.dispatch("user/requestEmailSignInLink", {
        email: this.email,
        locationId: this.locationId
      });
      this.emailSent = true;
      this.timeout = setTimeout(() => {
        this.cancel();
      }, 20000);
    },
    cancel() {
      this.isActive = false;
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  },
  mounted() {
    eventBus.$on("showModalLogin", locationId => {
      this.locationId = locationId;
      this.isActive = true;
      if (this.emailSent) {
        this.timeout = setTimeout(() => {
          this.cancel();
        }, 20000);
      }
    });
  },
  watch: {
    currentUser() {
      this.emailSent = false;
      this.cancel();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.modal {
  z-index: 9999;
}
.modal-content,
.modal-card {
  max-height: inherit;
}
.is-size-6, .is-size-5, .is-size-4 {
  padding-bottom: 1rem;
}
.g-recaptcha {
  margin-bottom: 0.75rem;
  @include touch() {
    transform: scale(0.77);
    -webkit-transform: scale(0.77);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    margin-bottom: 0;
  }
}
</style>
