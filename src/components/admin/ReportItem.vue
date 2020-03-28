<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="field">
          <p class="control">
            <strong>Location: </strong> {{ item.locationName }}
            <span class="tag is-success " v-if="status == 'g'">OK</span>
            <span class="tag is-warning " v-else-if="status == 'y'"
              >Not OK</span
            >
            <span class="tag is-danger " v-else-if="status == 'r'">Bad</span>
            <br />
            <strong>Email: </strong> {{ item.vote ? item.vote.email : "" }}
            <br />
            <strong>Created at: </strong>{{ date }}
            <br />
            <span v-if="!hasComment">No comments left</span>
            <textarea
              class="textarea"
              v-if="hasComment"
              v-model="comment"
            ></textarea>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <div class="field has-addons">
                <p class="control">
                  <button
                    class="button is-h is-small"
                    :class="{ 'is-loading': updating }"
                    :disabled="disabledForm"
                    @click="updateAndPublish"
                  >
                    Update and publish
                  </button>
                </p>
                <p class="control">
                  <button
                    class="button is-dark is-inverted is-small"
                    :disabled="!changed || disabledForm"
                    @click="reset"
                  >
                    Reset to original
                  </button>
                </p>
              </div>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item">
              <label class="checkbox">
                <a
                  class="button is-h is-inverted is-small"
                  :class="{ 'is-loading': deleting }"
                  :disabled="disabledForm"
                  @click="deleteReport"
                  ><Delete /> Delete</a
                >
              </label>
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>
<script>
import Delete from "mdi-vue/Delete";
export default {
  props: ["item", "index"],
  components: { Delete },
  data: () => ({
    comment: "",
    changed: false,
    deleting: false,
    updating: false
  }),
  computed: {
    date() {
      return this.item.vote
        ? new Date(this.item.vote.createdAt).toGMTString()
        : "";
    },
    hasComment() {
      return this.item.vote ? this.item.vote.comment : false;
    },
    status() {
      return this.item.vote ? this.item.vote.status : null;
    },
    disabledForm() {
      return this.deleting || this.updating;
    }
  },
  methods: {
    reset() {
      this.comment = this.item.vote.comment;
    },
    async updateAndPublish() {
      this.updating = true;
      try {
        await this.$store.dispatch("admin/updateAndPublishReport", {
        locationId: this.item.locationId,
        voteId: this.item.voteId,
        comment: this.comment,
        index: this.index
      });
      } catch (error) {
        // todo notify
      }
      this.updating = false;
    },
    async deleteReport() {
      this.deleting = true;
      try {
        await this.$store.dispatch("admin/deleteReport", {
          locationId: this.item.locationId,
          voteId: this.item.voteId,
          index: this.index
        });
      } catch (error) {
        // todo notify
      }
      this.deleting = false;
    }
  },
  mounted() {
    let comment = this.item.vote ? this.item.vote.comment : "";
    this.comment = comment;
  },
  watch: {
    comment(to) {
      this.changed = to != this.item.vote.comment;
    }
  }
};
</script>
<style lang="scss" scoped>
.tag {
  float: right;
}
.textarea {
  margin-top: 0.5rem;
}
</style>
