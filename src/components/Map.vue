<template>
  <l-map :zoom="zoom" :center="center" ref="theMap" :options="options">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      v-for="(item, key) in locationsShowOnMap"
      :lat-lng="item.marker"
      :icon="item.icon"
      :key="key"
      :class="{ 'is-active': item.isActive }"
    ></l-marker>
  </l-map>
</template>
<script>
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import L from "leaflet";
import { mapState } from "vuex";
import eventBus from "@/eventbus";

export default {
  components: { LMap, LTileLayer, LMarker },
  data() {
    return {
      zoom: 12,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icons: {
        no: "/svg/marker_noinfo.svg",
        g: "/svg/marker_ok.svg",
        y: "/svg/marker_warning.svg",
        r: "/svg/marker_danger.svg"
      },
      unactive: {
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      },
      active: {
        iconSize: [60, 60],
        iconAnchor: [30, 30]
      },
      showOnMap: null
    };
  },
  computed: {
    ...mapState("locations", ["locations"]),
    locationsShowOnMap() {
      let locations = this.locations.map(_ => {
        let result = Object.assign({}, _, {
          marker: this.createMarker(_),
          isActive: this.showOnMap && _.id == this.showOnMap.id
        });
        result.icon = this.getIcon(result);
        return result;
      });
      return locations;
    },
    center() {
      if (!this.showOnMap) return L.latLng(this.latitude, this.longitude);
      return L.latLng(this.showOnMap.lat, this.showOnMap.lon);
    },
    marker() {
      return L.latLng(this.latitude, this.longitude);
    },
    latitude() {
      return 41.303921;
    },
    longitude() {
      return -81.901693;
    },
    options() {
      return { zoomControl: true };
    }
  },
  methods: {
    imgError(e) {
      e.target.style.display = "none";
    },
    createMarker(item) {
      return L.latLng(item.lat, item.lon);
    },
    getIcon(item) {
      let status = !item.statistics.status ? "no" : item.statistics.status;
      return L.icon(
        Object.assign(
          {
            iconUrl: this.icons[status]
          },
          item.isActive ? this.active : this.unactive
        )
      );
    }
  },
  mounted() {
    eventBus.$on("showOnMap", _ => (this.showOnMap = _));
    this.$nextTick(() => {
      this.$refs.theMap.mapObject.invalidateSize();
    });
  }
};
</script>
<style lang="scss" scoped>
.is-active {
  z-index: 1000;
}
</style>
