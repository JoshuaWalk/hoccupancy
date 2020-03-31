<template>
  <fragment>
    <MainInfo />
    <Main />
    <MainInfoBottom />
    <MainFooter />
  </fragment>
</template>
<script>
import { Fragment } from "vue-fragment";
import Main from "./Main";
import MainInfo from "@/components/MainInfo";
import MainInfoBottom from "@/components/MainInfoBottom";
import MainFooter from "@/components/MainFooter";

export default {
  components: {
    Fragment,
    Main,
    MainInfo,
    MainFooter,
    MainInfoBottom
  }
};
</script>
