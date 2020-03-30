<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <p class="is-size-7 has-text-grey">
          <span class="tag is-success"> Green </span> : The hospital is
          operating normally. You can expect to receive a degree of care similar
          to pre-pandemic times. <br />
        </p>
        <p class="is-size-7 has-text-grey">
          <span class="tag is-warning"> Yellow </span> : The hospital is nearing
          capacity. There may be longer waits than usual, but all patients still
          receive the care they need. <br />
        </p>
        <p class="is-size-7 has-text-grey">
          <span class="tag is-danger"> Red </span> : The hospital is over
          capacity. There are not enough supplies, beds, or doctors to give
          everyone proper care. The staff may be triaging patients for
          admission.
        </p>
      </div>
    </div>
  </section>
</template>
<style lang="scss" scoped>
.hero-body {
  padding-bottom: 0;
}
p {
  padding-bottom: 0.2rem;
}
</style>
