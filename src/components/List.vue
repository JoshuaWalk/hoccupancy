<template>
  <div class="list-wrapper">
    <ListItem v-for="(item, key) in items" :key="key" :item="item" class="hospital-item"/>
  </div>
</template>
<script>
import { mapState } from "vuex";
import eventBus from "@/eventbus";
import ListItem from './ListItem'
export default {
  components:{ListItem},
  computed: {
    ...mapState("locations", ["items"])
  },
  watch: {
    items(to) {
      if (to.length > 0) {
        eventBus.$emit("showOnMap", to[0]);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.list-wrapper {
  height: 100%;
}

.hospital-item:last-child{
  margin-bottom: 1rem;
}

</style>
