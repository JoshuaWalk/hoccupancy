<template>
  <section class="section">
    <div class="container" v-if="hasReports">
      <ReportItem
        v-for="(item, key) in reports"
        :key="item.id"
        :item="item"
        :index="key"
      />
      <a
        class="button is-white is-fullwidth hospital-item"
        @click="loadNextPartReports"
        v-if="!lastPart"
        :class="{ 'is-loading': loading }"
        >Load more</a
      >
    </div>
    <div class="container" v-else>
      <h2 class="subtitle">No reports...</h2>
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import ReportItem from "@/components/admin/ReportItem";
export default {
  components: { ReportItem },
  computed: {
    ...mapState("reports", ["reports", "lastPart", "loading"]),
    hasReports() {
      return this.reports && this.reports.length > 0;
    }
  },
  methods: {
    loadNextPartReports() {
      this.$store.dispatch("reports/loadNextPart");
    }
  },
  mounted() {
    this.$store.dispatch("reports/clear");
    this.loadNextPartReports();
  },
};
</script>
