<template>
  <section class="section">
    <div class="container">
      <ReportItem
        v-for="(item, key) in reports"
        :key="key"
        :item="item"
        :index="key"
      />
    </div>
  </section>
</template>
<script>
import { mapState } from "vuex";
import ReportItem from "@/components/admin/ReportItem";
export default {
  components: { ReportItem },
  computed: {
    ...mapState("admin", ["reports"])
  },
  mounted() {
    this.$store.dispatch("admin/listReports");
  }
};
</script>
