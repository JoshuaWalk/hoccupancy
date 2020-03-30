<template>
  <footer class="footer is-white">
    <div class="content is-size-7">
      <p>
        Contact us: <a href="mailto:">contact email</a><br />

        Additional links for information: <br />
        <a
          href="https://profiles.health.ny.gov/hospital/county_or_region/region:new+york+metro+-+new+york+city"
          >NYS department of Health contains a list of every hospital in NYC
          along with the number of beds per hospital</a
        ><br />
        <a
          href="https://www.bloomberg.com/graphics/2020-new-york-coronavirus-outbreak-how-many-hospital-beds/"
          >Bloomberg NYC hospital beds map</a
        >
      </p>
    </div>
  </footer>
</template>
<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all";
.footer {
  padding: 1rem 2rem;
  background: #fff;
  @include touch() {
    padding: 0.5rem 1rem;
  }
}
</style>
