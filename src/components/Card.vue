<template>
  <div class="card" :mode="mode" :link="cover.link != ''" :style="{borderRadius: border, '--r': radius}">
    <a v-if="cover.link" :href="cover.url" target="_blank">
      <img class="cover" :src="cover.link">
      <div id="shadow"></div>
    </a>
    <div id="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Attachment } from "./api";

defineProps({ 
  mode: String,
  border: String,
  radius: String,
  cover: {
    type: Object as PropType<Attachment>,
    default: { link: "" },
  },
})
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  margin: 8px 4px;
  padding: 0;
  transition: all 0.2s;
  overflow: hidden;

  @include themeify{
    opacity: themed('fill');
    color: themed('shadow-container-color');
    background-color: themed('shadow-container-back');
    box-shadow: themed('shadow-container-box');
  }

  &[mode=mask][link=false] {
    border-top-left-radius: var(--r) !important;
    border-top-right-radius: var(--r) !important;
  }

  #content {
    background-color: inherit;
  }
  
  &[mode=mask] #content {
    border-top-left-radius: var(--r);
    border-top-right-radius: var(--r);
    overflow: hidden;
  }

  &[mode=mask][link=true] #content {
    position: relative;
    margin-top: calc(-1*var(--r));
  }

  a {
    color: #eb7350;
  }

  .cover {
    width: 100%;
    display: block;
  }

  &[mode=shadow] #shadow {
    position: absolute;
    width: 100%;
    height: 20px;
    z-index: 2;
    transform: translateY(-19px);

    @include themeify{
      background-image: themed('linear');
    }
  }
}

#app[data-theme=light] .card {
  box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
              0 2px 2px 0 rgb(0 0 0 / 14%),
              0 1px 5px 0 rgb(0 0 0 / 20%);
}
</style>