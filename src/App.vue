<template>
  <router-view />
</template>
<style lang="scss">
html,
body {
  height:100%;
}
@import "~bulma/sass/utilities/_all";
@import "~bulma/sass/utilities/initial-variables";
@import "~bulma/sass/utilities/functions";
$h: #ff637b;
$h-invert: findColorInvert($h);
@import "~bulma/sass/utilities/derived-variables";
$addColors: (
  "h": ($h, $h-invert)
);
$colors: map-merge($colors, $addColors);

@import "~bulma";
</style>
