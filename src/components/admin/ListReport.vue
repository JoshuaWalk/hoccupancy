<template>
  <section class="section">
    <div class="container" v-if="hasReports">
      <ReportItem
        v-for="(item, key) in reports"
        :key="key"
        :item="item"
        :index="key"
      />
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
    ...mapState("admin", ["reports"]),
    hasReports() {
      return this.reports && this.reports.length > 0;
    }
  },
  mounted() {
    this.$store.dispatch("admin/listReports");
  },
  beforeDestroy() {
    this.$store.dispatch("admin/clearReports");
  }
};
</script>
