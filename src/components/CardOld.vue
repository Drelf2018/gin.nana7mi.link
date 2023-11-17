<template>
  <div>
    <a :href="card.href" target="_blank">
      <img class="cover" :src="card.cover">
    </a>
    <div v-if="card.href" class="linear"></div>
    <div class="show">
      <Face :blogger="card.blogger" style="margin: 0.24em;" />
      <span>  
        <div>
          <span :style="{color: card.color}">{{ card.title }}</span>
        </div>
        <p>{{ card.subtitle }}</p>
      </span>  
    </div>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { CardModel } from "./api";
import Face from './Face.vue'

const props = defineProps({ card: Object as PropType<CardModel> })
// console.log(props.card);

if(props.card.title == null) props.card.title = props.card.blogger.name
if(props.card.subtitle == null) props.card.subtitle = props.card.blogger.description
// if(props.card.color == null) props.card.color = get_pendant_color(props.card.blogger)
// :class="{cmt: card.subtitle == null}"
</script>

<style lang="scss" scoped>
.cover {
  width: 100%;
  border-radius: 5px 5px 0 0;
  display: block;
}

.linear {
  position: relative;
  height: 20px;
  z-index: 2;
  margin-top: -20px;

  @include themeify{
    background-image: themed('linear');
  }
}

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

.pc .cmt {
  font-size: 0.43em !important;
}

.mobile .cmt {
  font-size: 0.5em !important;
}
</style>