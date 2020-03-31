<template>
  <section class="section">
    <div class="container">
      <p class="is-size-5 is-size-6-touch">
        The goal of this site is to provide information about the state of the
        hospital system in coping with Covid19 cases. If you are in need of
        emergency medical help, please do not rely solely on the information
        provided here to decide where to seek help.
        <b
          >Please contact your primary care physician or other medical provider,
          and directly verify any information provided here before acting on
          it.</b
        >
        Please remember, this is crowdsourced data and may be limited or
        inaccurate. <br /><br />

        We strive to ensure that information on this site is as accurate as
        possible. If you represent a hospital or health authority and would like
        to set up an official data channel for reporting real-time capacity of
        your institution please
        <a :href="`mailto:${contactEmail}`">contact us by email</a>. Please use
        the words “HEALTH OFFICIAL” in the subject of your email so we can
        respond immediately. <br /><br />
        Hospital Tracker C19 is being actively developed and expanded. We hope
        to include locations beyond NYC and other types of critical
        infrastructure. If you have suggestions, questions, or would like to
        volunteer your help, please
        <a :href="`mailto:${contactEmail}`">contact us by email</a>.
      </p>
    </div>
  </section>
</template>
<script>
import contactInfo from "@/mixins/contactInfo";
export default {
  mixins: [contactInfo]
};
</script>
<style lang="scss" scoped>
p {
  padding-bottom: 0.75rem;
}
</style>
