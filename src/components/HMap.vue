<template>
  <l-map :zoom="zoom" :center="center" ref="theMap" :options="options">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      v-for="(item, key) in items"
      :lat-lng="createMarker(item)"
      :icon="getIcon(item)"
      :key="key"
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
      no: L.icon({
        iconUrl: "/svg/marker_noinfo.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      }),
      y: L.icon({
        iconUrl: "/svg/marker_warning.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      }),
      g: L.icon({
        iconUrl: "/svg/marker_ok.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      }),
      r: L.icon({
        iconUrl: "/svg/marker_danger.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 20]
      }),
      showOnMap: null
    };
  },
  computed: {
    ...mapState("locations", ["items"]),
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
      if(!item.statistics.status) return this.no;
      switch (item.statistics.status) {
        case "r":
          return this.r;
        case "g":
          return this.g;
        case "y":
          return this.y;
      }
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
