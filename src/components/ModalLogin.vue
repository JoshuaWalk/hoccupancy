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
                    placeholder="Your email"
                    v-model="email"
                  />
                </div>
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
<script>
import EmailOutline from "mdi-vue/EmailOutline";
import eventBus from "@/eventbus";
export default {
  components: {
    EmailOutline
  },
  data: () => ({
    email: "",
    emailSent: false,
    isActive: false
  }),
  methods: {
    requestConfirmation() {
      this.$store.dispatch("user/requestEmailSignInLink", {
        email: this.email,
        locationId: this.$route.params.id
      });
      this.emailSent = true;
      setTimeout(() => {
        this.cancel();
      }, 2500);
    },
    cancel() {
      this.isActive = false;
    }
  },
  mounted() {
    eventBus.$on("showModalLogin", () => {
      this.isActive = true;
      if (this.emailSent) {
        setTimeout(() => {
          this.cancel();
        }, 2000);
      }
    });
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