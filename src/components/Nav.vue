<template>
  <div class="nav-container" :style="{height: height}">
    <div class="nav-picture" :style="{backgroundImage: `url(${src})`}"></div>
    <div :class="[isCovered ? 'nav-cover' : 'nav-show', 'nav-header']">
      <div class="nav-controler" @click="theme.modifyTheme">
        <ion-icon v-if="theme.isLight()" name="sunny"></ion-icon>
        <ion-icon v-else name="moon"></ion-icon>
      </div>
      <input v-model="search" type="text" placeholder="支持模糊搜索动态" @input="() => emit('search', search)">
      <Face id="face" :login="blogger.uid != ''" :enter="hover" :blogger="blogger" style="font-size: 34px" />
      <div id="info" @mouseenter="enter" @mouseleave="() => hover = false">
        <Card v-if="theme.isPC" mode="shadow" border="16px" radius="16px" :cover="blogger.photo" style="opacity: 1;">
          <div style="padding: 8px;">
            <slot v-if="blogger.uid" name="login"></slot>
            <slot v-else name="logout"></slot>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, PropType, onMounted } from 'vue'
import { Theme } from './tool'
import { Blogger } from './api'

import Card from './Card.vue'
import Face from './Face.vue'

const emit = defineEmits(['search'])

defineProps({
  src: String,
  height: String,
  isCovered: Boolean,
  blogger: Object as PropType<Blogger>,
  theme: Object as PropType<Theme>
})

const search = ref("")
const hover = ref(false)

function enter(evt: MouseEvent) {
  hover.value = window.getComputedStyle(evt.target as Element).opacity != "0"
}

onMounted(() => {
  let f1 = document.getElementById("face")
  let f2 = document.getElementById("info")
  f2.style.left = f1.offsetLeft + f1.offsetWidth / 2 + "px"
})
</script>

<style lang="scss" scoped>
#info {
  position: fixed;
  top: 48px;
  transform: translateX(-50%);
  opacity: 0;
  transition: all 0.35s ease 0.25s;
  z-index: 105;
  overflow: hidden;
}

#face {
  z-index: 107;
  transition: all 0.35s ease 0.25s;

  &:hover, &[enter=true]{
    &[login=true]{
      transform: translateY(35%);
      transition: all 0.25s;
      scale: 2;
    }

    & + #info {
      top: 72px;
      opacity: 1;
      transition: all 0.25s;
    }
  }
}

@each $status in show, cover {
  .nav-#{$status} {
    @if $status == cover {
      text-shadow: none;
      transition: all 0.2s;

      @include themeify{
        background-color: themed('nav-cover-color');
        box-shadow: themed('nav-cover-shadow');
      }
    }
    .nav-controler {
      width: 34px;
      height: 34px;
      font-size: 24px;
      border-radius: 17px;
      transition: all 0.2s;

      ion-icon {
        vertical-align: -7px;
      }

      [aria-label=sunny] {
        color: rgb(255,130,0);
      }

      [aria-label=moon] {
        color: rgb(255,228,53);
      }

      @include themeify{
        background-color: themed('nav-#{$status}');
      }

      &:hover {
        @include themeify{
          background-color: themed('nav-#{$status}-hover');
        }
      }
    }
  }
}

.nav-container {
  text-align: center;

  .mobile & {
    height: 64px !important;
  }
}

.nav-header {
  position: fixed;
  z-index: 2;
  top: 0;
  width: 100%;
  height: 64px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  transition: all 0.2s;
  z-index: 100;
}

.nav-picture {
  // filter: contrast(90%);
  // position: absolute;

  .mobile & {
    background-image: none !important;
  }

  position: relative;
  z-index: -2;
  top: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center 0%;
  background-size: cover;
  transition: opacity 0.2s;

  @include themeify{
    opacity: themed('fill');
  }
}

input {
  display: block;
  box-sizing: border-box;
  width: calc(92% - 8px);
  max-width: 592px;
  height: 40px;
  font-size: 1em;
  font-weight: 540;
  padding: 1px 0 0 0.5em;
  border: 1px solid #ced4da;
  border-radius: 0.5em;
  transition: all 0.2s;
  opacity: 0.65;

  &:hover { opacity: 0.85; }
  &:focus {
    border-color: #86b7fe;
    outline: 0;
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 25%);
    opacity: 1;

    @include themeify{
      box-shadow: themed('input-focus');
    }
  }
}

@media screen and (max-width: 1000px) {
  .nav-picture {
    background-position: 53%;
  }
}

@media screen and (max-width: 750px) {
  .nav-container #face {
    display: none;
  }

  .nav-container .nav-controler {
    display: none;
  }
}
</style>
