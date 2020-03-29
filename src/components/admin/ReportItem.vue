<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="field">
          <p class="control">
            <strong>Location: </strong>
            <router-link
              :to="{ name: 'detailed', params: { id: item.locationId } }"
              :title="item.locationName"
              >{{ item.locationName }}</router-link
            >
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
        <nav class="level ">
          <div class="level-item">
            <div class="field is-fullwidth">
              <p class="control is-expanded">
                <button
                  class="button is-h is-small is-fullwidth"
                  :class="{ 'is-loading': updating }"
                  :disabled="disabledForm"
                  @click="updateAndPublish"
                >
                  Update and publish
                </button>
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="field is-fullwidth">
              <p class="control is-expanded">
                <button
                  class="button is-dark is-fullwidth is-inverted is-small"
                  :disabled="!changed || disabledForm"
                  @click="reset"
                >
                  Reset to original
                </button>
              </p>
            </div>
          </div>
          <div class="level-item">
            <div class="field is-fullwidth">
              <p class="control is-expanded">
                <a
                  class="button is-h is-fullwidth is-inverted is-small"
                  :class="{ 'is-loading': deleting }"
                  :disabled="disabledForm"
                  @click="deleteReport"
                  ><Delete /> Delete</a
                >
              </p>
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
@import "~bulma/sass/utilities/_all";
.tag {
  float: right;
}
.textarea {
  margin-top: 0.5rem;
}
.is-fullwidth {
  width: 100%;
}
</style>
