<template>
  <div class="box" :class="{ reported: reported }">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ item.email }}</strong>
            <br />
            <small>{{ date }}</small>
            <br />
          </p>
          <p>
            <span class="tag is-success is-medium" v-if="item.status == 'g'"
              >OK</span
            >
            <span
              class="tag is-warning is-medium"
              v-else-if="item.status == 'y'"
              >Not OK</span
            >
            <span class="tag is-danger is-medium" v-else-if="item.status == 'r'"
              >Bad</span
            >
          </p>
          <p v-if="comment">
            {{ comment }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <a
          class="button is-white is-small"
          @click="report"
          v-if="!reported"
          :class="{ 'is-loading': reporting }"
          ><FlagOutline /> Report</a
        >
      </div>
    </article>
  </div>
</template>
<script>
import { mapState } from "vuex";
import eventBus from "@/eventbus";
import FlagOutline from "mdi-vue/FlagOutline";
export default {
  props: ["item"],
  components: {
    FlagOutline
  },
  data: () => ({
    reported: false,
    reporting: false
  }),
  computed: {
    ...mapState("user", ["currentUser"]),
    date() {
      return new Date(this.item.createdAt).toGMTString();
    },
    comment() {
      if (this.reported) {
        if (this.item.comment) {
          return "[The comment is under moderation due to report]";
        }
        return "";
      }
      return this.item.comment;
    }
  },
  methods: {
    async report() {
      if (!this.currentUser) {
        eventBus.$emit("showModalLogin", this.$route.params.id);
        return;
      }
      this.reporting = true;
      try {
        await this.$store.dispatch("location/votes/report", {
          voteId: this.item.id
        });
        this.reported = true;
      } catch (error) {
        console.log(error);
        //todo notify
      }
      this.reporting = false;
    }
  },
  mounted() {
    this.reported = this.item.reported;
  }
};
</script>
<style lang="scss" scoped>
.reported {
  background: #f0f0f0;
}
</style>
