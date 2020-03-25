<template>
  <div>
    <section class="hero" v-if="detailed">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            {{detailed.Name}}
          </h1>
          <h2 class="subtitle">
            {{detailed.Address}}
          </h2>
          <p><strong>Phone:</strong>&nbsp;<a :href="`tel:${detailed.Phone}`" v-if="detailed.Phone">{{detailed.Phone}}</a><span v-else>No phone information</span></p>
          <p><strong>Site:</strong>&nbsp;<a :href="detailed.Url" v-if="detailed.Url">{{detailed.Url}}</a><span v-else>No url information</span></p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  props: ["id"],
  computed:{
    ...mapState("locations", ["detailed"])
  },
  mounted(){
    this.$store.dispatch('locations/detailed',{id:this.id})
  },
  beforeDestroy(){
    this.$store.dispatch('locations/detailedClear')
  }
};
</script>
