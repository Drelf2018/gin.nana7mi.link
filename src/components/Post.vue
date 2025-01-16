<template>
  <Card2 radius="16px" style="padding: 0.8em;">
    <!-- <a :href="post.get_post_url()" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a> -->
    <!-- <ion-icon name="alert-circle-outline" class="goto" @click="post.notice"></ion-icon> -->
    <Profile :blog="blog" space="0.3em" style="font-size: 1.3333333em;" />
    <p class="text" v-html="blog.text"></p>
    <p class="date">{{ Format(new Date(blog.time), "yy/MM/dd hh:mm:ss") }} {{ blog.source }}</p>
    <div :style="{ '--len': Math.min(Math.ceil(Math.sqrt(blog.assets?.length)), 3) }">
      <img v-for="url in blog.assets" class="attachments" :src="replace_url(url)">
    </div>
    <Post v-if="blog.reply" :blog="blog.reply" style="margin: 0.8em 0px 0px;" />
    <!-- :style="[post.comments.length != 0 ? '' : 'margin-bottom: 0']"
      <Comments 
        :key="com.mid"
        :comment="com"
        :reply="false"
        :last="i == post.comments.length-1"
        v-for="com, i in post.comments"
      />
    -->
  </Card2>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Blog } from './model'
import { Format, get_file_MIME_type } from './tool'

import Card2 from './Card2.vue'
import Comments from './Comments.vue'
import Profile from './Profile.vue';
import { replace_url } from './backend';

defineProps({ blog: Object as PropType<Blog> })
</script>

<style lang="scss" scoped>
.goto {
  font-size: 1.5em;
  position: absolute;
  padding: 0.25em;
  border-radius: 1em;
  transition: all 0.2s;
  z-index: 50;
  top: 0.5em;

  &[aria-label="arrow redo outline"] {
    right: 0.5em;
  }

  &[aria-label="alert circle outline"] {
    right: 2.25em;

    .mobile & {
      display: none;
    }
  }
}

.goto:hover {
  color: rgb(0, 161, 214);
  background-color: rgba(0, 0, 0, 0.1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.text {}

.attachments {
  width: calc(100% / var(--len) - 2px);
  margin: 1px 2px 1px 0;
  vertical-align: middle;
}

.date {
  color: grey;
  text-align: right;
  font-size: 0.6666em;
  margin: 0;
}
</style>