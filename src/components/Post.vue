<template>
  <Card mode="mask" border="16px" radius="16px">
    <a :href="post.get_post_url()" style="color: inherit" target="_blank"><ion-icon name="arrow-redo-outline" class="goto"></ion-icon></a>
    <ion-icon name="alert-circle-outline" class="goto" @click="post.notice"></ion-icon>
    <Profile :blogger="post.blogger"></Profile>
    <p class="text" v-html="post.text"></p>
    <div :style="{'padding': '0px 8px', '--len': Math.min(post.attachments.length, 3)}">
      <img class="attachments" :src="a.link" v-for="a in post.attachments">
    </div>
    <Post v-if="post.repost" :post="post.repost" style="margin: 8px;" />
    <p class="date">{{ post.get_format_time() }} 来自 {{ post.source }}</p>
    <!-- :style="[post.comments.length != 0 ? '' : 'margin-bottom: 0']"
      <Comments 
        :key="com.mid"
        :comment="com"
        :reply="false"
        :last="i == post.comments.length-1"
        v-for="com, i in post.comments"
      />
    -->
  </Card>
</template>

<script setup lang="ts">
import { PostModel } from "./api";
import { PropType } from 'vue';
import Card from './Card.vue'
import Comments from './Comments.vue'

defineProps({ post: Object as PropType<PostModel> })
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
  color: rgb(0,161,214);
  background-color: rgba(0,0,0,0.1);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.text {
  margin: 0 8px;
}

.attachments {
  width: calc(100% / var(--len) - 2px);
  margin: 1px 2px 1px 0;
  vertical-align: middle;
}

.date {
  color: grey;
  text-align: right;
  font-size: 12px;
  // margin-top: 8px;
  margin-right: 16px;
}
</style>