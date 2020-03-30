<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <router-link
              :to="{ name: 'detailed', params: { id: item.id } }"
              :title="item.name"
              >{{ item.Name }}</router-link
            >

            <br />
          </p>
          <div class="field is-grouped is-grouped-multiline">
            <div class="control">
              <div class="tags has-addons">
                <span class="tag is-grey-darker">Past 24h</span>
                <span class="tag is-grey-darker" v-if="!item.statistics.status"
                  >No data</span
                >
                <span
                  class="tag is-success"
                  v-else-if="item.statistics.status == 'g'"
                  >Available</span
                >
                <span
                  class="tag is-warning"
                  v-else-if="item.statistics.status == 'y'"
                  >Near capacity</span
                >
                <span
                  class="tag is-danger"
                  v-else-if="item.statistics.status == 'r'"
                  >Over capacity</span
                >
              </div>
            </div>
            <div class="control">
              <span class="tags has-addons" v-if="item.statistics.status">
                <span class="tag">Last 24h</span>
                <span class="tag is-success">{{
                  item.statistics.amounts.g ? item.statistics.amounts.g : "0"
                }}</span>
                <span class="tag is-warning">{{
                  item.statistics.amounts.y ? item.statistics.amounts.y : "0"
                }}</span>
                <span class="tag is-danger">{{
                  item.statistics.amounts.r ? item.statistics.amounts.r : "0"
                }}</span>
              </span>
              <span class="tags has-addons" v-else>
                <span class="tag">Last 24h</span>
                <span class="tag ">No data</span>
              </span>
            </div>
          </div>
          <p>
            <strong v-if="item.Phone">{{ item.Phone }}</strong
            ><strong v-else>No phone information</strong><br />
            {{ item.Address }}
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <div class="level-item">
              <a
                class="button is-h  is-small"
                @click="leaveFeedback"
                :title="item.name"
                >Make a report</a
              >
            </div>
          </div>
          <div class="level-right show-on-map">
            <div class="level-item">
              <a
                class="button is-h is-inverted  is-small"
                @click="showOnMap(item)"
              >
                <MapMarker /> Locate</a
              >
            </div>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>
<script>
import MapMarker from "mdi-vue/MapMarker";
import eventBus from "@/eventbus";
import { mapState } from "vuex";
export default {
  props: ["item"],
  components: { MapMarker },
  computed: {
    ...mapState("user", ["currentUser"])
  },
  methods: {
    showOnMap(item) {
      eventBus.$emit("showOnMap", item);
    },
    leaveFeedback() {
      if (!this.currentUser) {
        eventBus.$emit("showModalLogin", this.item.id);
        return;
      }
      this.$router.push({ name: "vote", params: { id: this.item.id } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";

.show-on-map {
  @include touch() {
    display: none !important;
  }
}
.field.is-grouped {
  justify-content: space-between;
}
</style>
