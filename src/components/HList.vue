<template>
  <div class="hlist-wrapper">
    <article class="media" v-for="(item, key) in items" :key="key">
      <figure class="media-left" @click="showOnMap(item)">
        <p class="image is-48x48">
          <img src="/svg/map.svg" />
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            <span class="tag is-success" v-if="!item.status">OK</span>
            <span class="tag is-success" v-else-if="item.status == 'g'">OK</span>
            <span class="tag is-warning" v-else-if="item.status == 'y'">Not OK</span>
            <span class="tag is-danger" v-else-if="item.status == 'r'">Bad</span>
            &nbsp;
            <router-link
              :to="{ name: 'detailed', params: { id: item.id } }"
              :title="item.name"
              >{{ item.Name }}</router-link
            >

            <br />
            <strong v-if="item.Phone">{{ item.Phone }}</strong
            ><strong v-else>No phone information</strong><br />
            {{ item.Address }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <a class="button is-h is-small">Leave impression</a>
      </div>
    </article>
  </div>
</template>
<script>
import { mapState } from "vuex";
import eventBus from "@/eventbus";
export default {
  computed: {
    ...mapState("locations", ["items"])
  },
  methods:{
    showOnMap(item){
      eventBus.$emit('showOnMap', item)
    }
  },
  watch:{
    items(to){
      if(to.length > 0) {
        eventBus.$emit('showOnMap', to[0])
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.hlist-wrapper {
  height: 100%;
}
</style>
<style lang="scss" scoped>
.image {
  cursor: pointer;
}
</style>
