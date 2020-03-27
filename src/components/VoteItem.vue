<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{ item.email }}</strong>
            <br />
            <small>{{ date }}</small>
            <br />
            {{ item.comment }}
            <br />
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
             <a class="button is-h is-outlined is-small" @click="report">Report</a>
            </div>
          </div>
        </nav>
      </div>
      <div class="media-right">
        <span class="tag is-success" v-if="!item.status">OK</span>
        <span class="tag is-success" v-else-if="item.status == 'g'">OK</span>
        <span class="tag is-warning" v-else-if="item.status == 'y'"
          >Not OK</span
        >
        <span class="tag is-danger" v-else-if="item.status == 'r'">Bad</span>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: ["item"],
  computed: {
    date() {
      return new Date(this.item.createdAt).toGMTString();
    }
  },
  methods: {
    report() {
      this.$store.dispatch("locations/report", {
        id: this.$route.params.id,
        voteId: this.item.id
      });
    }
  }
};
</script>
