<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <p>
            {{ item.comment }}
          </p>
        </div>
      </div>
      <div class="media-right">
        <span class="tag is-success" v-if="!item.status">OK</span>
        <span class="tag is-success" v-else-if="item.status == 'g'">OK</span>
        <span class="tag is-warning" v-else-if="item.status == 'y'"
          >Not OK</span
        >
        <span class="tag is-danger" v-else-if="item.status == 'r'">Bad</span>
      </div>
    </article>
  </div>
</template>
<script>
export default {
  props: ["item"]
};
</script>
