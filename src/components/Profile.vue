<template>
  <div class="show">
    <Face :blogger="blogger" style="margin: 0.24em;" />
    <span>
      <div>
        <span :style="{ color: blogger.get_pendant_color() }">{{ blogger.name }}</span>
      </div>
      <p>{{ blogger.description }}</p>
    </span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Blogger } from "./api";

import Face from './Face.vue'

defineProps({ blogger: Object as PropType<Blogger> })
</script>

<style lang="scss" scoped>
.show {
  font-size: 50px;
  display: flex;
  align-items: center;
  z-index: 2;
  position: relative;

  div {
    font-size: 0.48em;
  }

  p {
    font-size: 0.28em;
    margin: 0;
    color: grey;
  }
}
</style>