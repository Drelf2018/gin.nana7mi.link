<template>
  <div class="nav-container" :style="'--height: ' + height">
    <div class="nav-picture" :style="`background-image: url(${src})`"></div>
    <div :class="[isCovered === true ? 'nav-cover' : 'nav-show', 'nav-header']">
      <div class="nav-controler" @click="theme.modifyTheme">
        <ion-icon v-if="theme.theme == 'light'" name="sunny"></ion-icon>
        <ion-icon v-else name="moon"></ion-icon>
      </div>
      <input v-model="search" type="text" placeholder="支持模糊搜索动态" @input="e => emit('search', search)">
      <Face id="face" :login="blogger.uid != ''" :blogger="blogger" style="font-size: 34px" />
      <div id="info" @mouseenter="info" @mouseleave="info">
        <Card v-if="theme.isPC" mode="shadow" border="16px" radius="16px" :cover="blogger.photo">
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
import { ref, PropType, onMounted, computed } from 'vue'
import { Theme } from './tool'
import { Attachment, Blogger } from './api'

import Card from './Card.vue'
import vueConfig from 'vue.config'

const emit = defineEmits(['search'])

const props = defineProps({
  src: String,
  height: String,
  isCovered: Boolean,
  blogger: Object as PropType<Blogger>,
  theme: Object as PropType<Theme>
})

const search = ref("")

function info(evt) {
  switch(evt.type) {
    case "mouseenter":
      let style = window.getComputedStyle(evt.target)
      if (style.opacity != "0") {
        evt.target.classList.add(["show-info"])
        document.getElementById("face").classList.add("show-face")
      }
      break
    case "mouseleave":
      evt.target.classList.remove(["show-info"])
      document.getElementById("face").classList.remove("show-face")
      break
  }
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

.show-info {
  top: 72px !important;
  opacity: 1 !important;
  transition: all 0.25s !important;
}

#face {
  z-index: 107;
  transition: all 0.35s ease 0.25s;

  &:hover + #info {
    top: 72px;
    opacity: 1;
    transition: all 0.25s;
  }
}

#face[login=true]:hover {
  transform: translateY(35%);
  transition: all 0.25s;
  scale: 2;
}

.show-face[login=true] {
  transform: translateY(35%);
  transition: all 0.25s;
  scale: 2;
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
  height: var(--height);

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
  height: var(--height);
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