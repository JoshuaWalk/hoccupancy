<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container" v-if="!emailSent">
        <p class="is-size-6 has-text-grey">
          Your email address will not be shown to anyone else.
        </p>
        <p class="is-size-4 has-text-weight-medium">Please verify your email address</p>
        <p class="is-size-5">
          To prevent malicious activity, you’ll have to verify your email
          address. After submitting, please check your inbox and click a link in
          the email we send.
        </p>
        <form v-on:submit.prevent="requestConfirmation">
          <div class="field ">
            <p class="control is-expanded">
              <input
                class="input"
                type="email"
                placeholder="Your email"
                v-model="email"
              />
            </p>
             <p class="help is-danger" v-if="!isEmailValid">
              Please check captcha
            </p>
          </div>
          <div class="field g-recaptcha">
            <vue-recaptcha
              :sitekey="siteKey"
              :loadRecaptchaScript="true"
              class=""
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
              <a class="button is-light" @click="goToMain">
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
    </div>
  </section>
</template>

<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
import EmailOutline from "mdi-vue/EmailOutline";
import VueRecaptcha from "vue-recaptcha";
import { mapState } from "vuex";
export default {
  components: { EmailOutline, VueRecaptcha },
  data: () => ({
    email: "",
    emailSent: false,
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
      } else {
        this.$store.dispatch("user/requestEmailSignInLink", {
          email: this.email,
          locationId: this.$route.params.id
        });
        this.emailSent = true;
        this.timeout = setTimeout(() => {
          this.goToMain();
        }, 20000);
      }
    },
    goToMain() {
      if(this.timeout) {
        clearTimeout(this.timeout)
      }
      this.$router.push({ name: "main" });
    }
  },
  mounted() {
    document.body.classList.remove("has-navbar-fixed-top");
  },
  beforeDestroy() {
    document.body.classList.add("has-navbar-fixed-top");
  },
  watch:{
    currentUser(){
      this.goToMain();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.container {
  min-width: 16rem;
}
.g-recaptcha {
  margin-bottom: 0.75rem;
  @include touch() {
    transform: scale(0.87);
    -webkit-transform: scale(0.87);
    transform-origin: 0 0;
    -webkit-transform-origin: 0 0;
    margin-bottom: 0;
  }
}
.is-size-6, .is-size-5, .is-size-4 {
  padding-bottom: 1rem;
}

.container{
@include desktop() {max-width: 50%;}
}
</style>
