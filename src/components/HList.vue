<template>
  <div class="hlist-wrapper">
    <div v-for="(item, key) in items" :key="key" class="box">
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
                  <span class="tag is-grey-darker">Overall 24h</span>
                  <span
                    class="tag is-grey-darker"
                    v-if="!item.statistics.status"
                    >No info</span
                  >
                  <span
                    class="tag is-success"
                    v-else-if="item.statistics.status == 'g'"
                    >OK</span
                  >
                  <span
                    class="tag is-warning"
                    v-else-if="item.statistics.status == 'y'"
                    >Not OK</span
                  >
                  <span
                    class="tag is-danger"
                    v-else-if="item.statistics.status == 'r'"
                    >Bad</span
                  >
                </div>
              </div>
              <div class="control">
                <span class="tags has-addons" v-if="item.statistics.status">
                  <span class="tag">Last 24h</span>
                  <span class="tag is-success">{{
                    item.statistics.amounts.gAmount
                  }}</span>
                  <span class="tag is-warning">{{
                    item.statistics.amounts.yAmount
                  }}</span>
                  <span class="tag is-danger">{{
                    item.statistics.amounts.rAmount
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
                <router-link
                  class="button is-h "
                  :to="{ name: 'vote', params: { id: item.id } }"
                  :title="item.name"
                  >Feedback</router-link
                >
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <a class="button is-h is-inverted" @click="showOnMap(item)"
                  > <MapMarker/> Show on map</a
                >
              </div>
            </div>
          </nav>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import MapMarker from 'mdi-vue/MapMarker'
import { mapState } from "vuex";
import eventBus from "@/eventbus";
export default {
  components:{MapMarker},
  computed: {
    ...mapState("locations", ["items"])
  },
  methods: {
    showOnMap(item) {
      eventBus.$emit("showOnMap", item);
    }
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
@import "~bulma/sass/utilities/_all";
.hlist-wrapper {
  height: 100%;
}
.image {
  cursor: pointer;
}
.media-left {
  @include touch() {
    display: none;
  }
}
.box:last-child{
  margin-bottom: 1rem;
}
.field.is-grouped{
  justify-content: space-between;
}
</style>
