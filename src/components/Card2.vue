<template>
  <div class="card" :style="{ borderRadius: radius }">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({ radius: String })
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 8px 4px;
  transition: all 0.2s;
  overflow: hidden;

  @include themeify {
    opacity: themed('fill');
    color: themed('shadow-container-color');
    background-color: themed('shadow-container-back');
    box-shadow: themed('shadow-container-box');
  }
}

#app[data-theme=light] .card {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
    0 2px 2px 0 rgb(0 0 0 / 14%),
    0 1px 5px 0 rgb(0 0 0 / 20%);
}
</style>