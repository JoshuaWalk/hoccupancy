<template>
  <fragment>
    <DetailedInfo />
    <Detailed :id="id" />
  </fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import Detailed from "./Detailed";
import DetailedInfo from "@/components/DetailedInfo";

export default {
  props: ["id"],
  components: {
    Fragment,
    Detailed,
    DetailedInfo
  }
};
</script>
