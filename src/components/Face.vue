<template>
  <a v-if="blog.avatar" :href="blog.avatar" target="_blank">
    <div class="face">
      <img id="avatar" :src="replace_url(blog.avatar)">
    </div>
  </a>
  <a v-else href="javascript:;" class="login" @click="login">
    <div>登录</div>
  </a>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Blog } from './model'
import { replace_url } from './backend'

defineProps({ blog: Object as PropType<Blog> })

function login() {
  let form = document.getElementById("hidden-login-form")
  form.style.display = "block"
  setTimeout(() => form.style.opacity = "1", 1)
}
</script>

<style lang="scss" scoped>
.face {
  width: 1em;
  height: 1em;
  position: relative;
  background-size: contain;

  #avatar {
    width: 1em;
    height: 1em;
    border-radius: 25%;

    #app[data-theme=light] & {
      box-shadow: 0 3px 1px -2px rgb(0 0 0 / 12%),
        0 2px 2px 0 rgb(0 0 0 / 14%),
        0 1px 5px 0 rgb(0 0 0 / 20%);
    }
  }
}

.login {
  font-size: 14px !important;
  color: white;
  text-decoration: none;
  border-radius: 50%;
  overflow: hidden;

  div {
    width: 34px;
    line-height: 34px;
    text-align: center;
    background-color: rgb(0, 161, 214);
    text-shadow: none !important;
  }
}
</style>