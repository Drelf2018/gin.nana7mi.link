<template>
  <div class="show">
    <Face :blog="blog" style="font-size: 2.5em;" />
    <div :style="{ marginLeft: space }">
      <span>{{ blog.name }}</span>
      <p>{{ blog.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Blog } from './model'

import Face from './Face.vue'
import Card2 from './Card2.vue'

defineProps({
  blog: Object as PropType<Blog>,
  space: String,
})
</script>

<style lang="scss" scoped>
.show {
  // font-size: 20px;
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;

  p {
    font-size: 0.7em;
    margin: 0;
    color: grey;
  }
}
</style>