<template>
  <div class="box" :class="{ reported: reported }">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ item.email }}</strong>
            <a
              class="button is-white is-small flag-desktop"
              @click="report"
              v-if="!reported"
              title="Flag an abusive report for review by administrators"
              :class="{ 'is-loading': reporting }"
              ><FlagOutline /> Flag an abusive report</a
            >
            <br />
            <small>{{ date }}</small>
            <br />
          </p>
          <p>
            <span class="tag is-success is-medium" v-if="item.status == 'g'"
              >Available</span
            >
            <span
              class="tag is-warning is-medium"
              v-else-if="item.status == 'y'"
              >Near capacity</span
            >
            <span class="tag is-danger is-medium" v-else-if="item.status == 'r'"
              >Over capacity</span
            >
          </p>
          <p v-if="comment">
            {{ comment }}
          </p>
        </div>
        <nav class="level">
          <div class="level-item">
            <a
              class="button is-white is-small flag-touch"
              @click="report"
              v-if="!reported"
              :class="{ 'is-loading': reporting }"
              title="Flag an abusive report for review by administrators"
              ><FlagOutline /> Flag an abusive report</a
            >
          </div>
        </nav>
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
@import "~bulma/sass/utilities/_all";
.reported {
  background: #f0f0f0;
}
.flag {
  &-touch {
    @include desktop() {
      display: none;
    }
  }
  &-desktop {
    float: right;
    @include touch() {
      display: none;
    }
  }
}
</style>
