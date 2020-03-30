<template>
  <section class="hero">
    <div class="hero-body vote-form">
      <div class="container">
        <form @submit.prevent="vote">
          <div class="buttons  is-centered">
            <a
              class="button is-size-5-desktop is-size-6-mobile is-fullwidth-touch "
              @click="status = 'g'"
              :class="{ 'is-selected is-success': status == 'g' }"
            >
              Space is available
            </a>
            <a
              class="button is-size-5-desktop is-size-6-mobile is-fullwidth-touch"
              @click="status = 'y'"
              :class="{ 'is-selected is-warning': status == 'y' }"
            >
              Near capacity
            </a>
            <a
              class="button is-size-5-desktop is-size-6-mobile is-fullwidth-touch"
              @click="status = 'r'"
              :class="{ 'is-selected is-danger': status == 'r' }"
            >
              Over capacity
            </a>
          </div>
          <div class="field">
            <label class="label">Comment (optional)</label>
            <div class="control">
              <textarea
                class="textarea"
                placeholder="Comment"
                v-model="comment"
              ></textarea>
            </div>
          </div>
          <div class="field">
            <vue-recaptcha
              :sitekey="siteKey"
              :loadRecaptchaScript="true"
              class="g-recaptcha"
            ></vue-recaptcha>
          </div>
          <div class="field is-grouped">
            <div class="control">
              <button class="button is-h">Submit</button>
            </div>
            <div class="control">
              <a class="button is-light" @click="$router.go(-1)">
                Cancel
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>
<script src="https://www.google.com/recaptcha/api.js"></script>
<script>
import VueRecaptcha from "vue-recaptcha";
export default {
  data: () => ({
    status: "g",
    comment: "",
    siteKey: process.env.VUE_APP_RECAPTCHA_KEY
  }),
  components: {
    VueRecaptcha
  },
  methods: {
    async vote() {
      const gResponse = grecaptcha.getResponse();
      if (gResponse == "" || gResponse == null || gResponse == undefined) {
        alert("Please check ReCaptcha");
      } else {
        await this.$store.dispatch("location/votes/vote", {
          comment: this.comment,
          status: this.status
        });
        this.$router.push({
          name: "detailed",
          params: { id: this.$route.params.id }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.vote-form {
  padding-top: 0;
}

.button {
  &.is-fullwidth-touch {
    @include touch() {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      width: 100%;
    }
  }
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
</style>
