<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
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
        <vue-recaptcha
          :sitekey="siteKey"
          :loadRecaptchaScript="true"
        ></vue-recaptcha>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-h" @click="vote">Submit</button>
          </div>
          <div class="control">
            <button class="button is-light" @click="$router.go(-1)">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script src='https://www.google.com/recaptcha/api.js'></script>
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
      const gResponse = grecaptcha.getResponse()
      if (gResponse == "" || gResponse == null || gResponse == undefined ) {
        alert('Please check ReCaptcha')
      }
      else {
      await this.$store.dispatch("locations/vote", {
        id: this.$route.params.id,
        comment: this.comment,
        status: this.status
      });
      this.$router.push({
        name: "detailed",
        params: { id: this.$route.params.id }
      });
    }}
  }
};
</script>
