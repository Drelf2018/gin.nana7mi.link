<template>
  <Nav src="https://yun.nana7mi.link/7mi.webp" height="200px" :isCovered="isCovered" @search="searchHandler" :theme="theme" :blogger="blogger">
    <template #login>
      <p :style="{color: blogger.get_pendant_color(), fontSize: '1.2em', width: '300px'}">{{ blogger.name }}</p>
      <el-button type="danger" @click="clean">退出登录</el-button>
    </template>
    <template #logout>
      <img src="https://i0.hdslb.com/bfs/new_dyn/0de10012b4a96d7d4bcd82728f77b2051464240042.png" style="border-radius: 8px;">
      <span style="display: block;margin: 4px 0px;">不登录还想用？</span>
    </template>
  </Nav>

  <div class="content">
    <slot name="left"></slot>
    <div 
      v-infinite-scroll="GetPastPost" 
      :infinite-scroll-immediate="false" 
      :infinite-scroll-distance="100"
      class="post">
      <Post :key="post.platform+post.mid" :post="post" v-for="post in FilterPosts" />
      <p v-if="BeginTime <= 1675768827" style="text-align: center;color: grey">
        <span style="font-size: 0.5em;">◥</span> 
        到底了啦
        <span style="font-size: 0.5em;">◤</span>
      </p>
    </div>
    <slot name="right" :submitters="submitters"></slot>
  </div>
</template>

<script setup lang="ts">
import { get_download_url, get_user_info, get_user_name } from '../aliyun'
import { Theme } from '../components/tool'
import { posts, PostModel, NewBlogger } from '../components/api'
import { online, Blogger, me } from '../components/api'
import { ref, PropType } from 'vue'

import Nav from '../components/Nav.vue'
import Post from '../components/Post.vue'

const props = defineProps({
  isCovered: Boolean,
  theme: Object as PropType<Theme>
})

// 自动播放好运来的组件
const Phone = ref(null)

// 本地账户信息
const token = ref(localStorage.getItem("token"))

// 服务器返回用户数据
const star = ref(false)

// 提交者
const submitters = ref<online>({
  server: 0,
  users: {}
})

// 博文数据
const PastPosts = ref<Array<PostModel>>([])
const FuturePosts = ref<Array<PostModel>>([])
const FilterPosts = ref<Array<PostModel>>([])

const blogger = ref<Blogger>(NewBlogger({
  platform: "__login__",
  uid: "",
  name: "",
  face: {link:""},
}))

// 登录
if(props.theme.isPC) login(token.value).catch(console.log)

// 获取博文函数
const BeginTime = ref(Math.ceil(new Date().getTime() / 1000))
// 获取一定数量的初始博文
GetPastPost()
async function GetPastPost() {
  if (BeginTime.value <= 1666969128 - 7 * 86400) return
  BeginTime.value -= 7 * 86400
  let res = await posts(BeginTime.value, BeginTime.value + 7 * 86400)
  if (res.posts.length != 0) {
    let posts = res.posts.reverse()
    PastPosts.value = PastPosts.value.concat(posts)
    setTimeout(() => searchHandler(""), 30)
  } else {
    await GetPastPost()
  }
}
defineExpose({ GetPastPost })

// 更新贡献者提交时间
if(props.theme.isPC) setInterval(() => submitters.value.server += 1, 1000)

// 每五秒获取新博文
if(props.theme.isPC) {
  NewPost()
  setInterval(NewPost, 4500)
}
async function NewPost() {
  let data = await posts()
  submitters.value.server = data.online.server
  for(let key in data.online.users) {
    get_user_name(key, 86400).then(name => submitters.value.users[name] = data.online.users[key])
  }
  data.posts.forEach(async post => {
    if (FuturePosts.value.length == 0) FuturePosts.value = [post]
    else if (FuturePosts.value[0].time != post.time) FuturePosts.value.unshift(post)
    else return
    let data = await get_download_url("BV1ty4y1E7w9")
    Phone.value.play(data[0].url)
    post.notice()
    setTimeout(() => searchHandler(""), 30)
  })
}

// 登录
async function login(token: string) {
  let user = await me(token)
  let data = await get_user_info(user.uid)
  blogger.value.uid = user.uid
  blogger.value.name = data.name
  blogger.value.face = {link: data.face}
  blogger.value.pendant = {link: data.pendant.image}
  await blogger.value.get_photo()
}

// 退出登录
function clean() {
  localStorage.setItem("token", "")
  location.reload()
}

// 搜索栏过滤函数
function searchHandler(search: string) {
  let TotalPosts = FuturePosts.value.concat(PastPosts.value).filter(
    post => {
      let watch = post.platform + post.blogger.uid
      if (watch == "weibo7198559139") return true
      if (!props.theme.isPC) return false
      if (star.value) return true
      // if (me.value.watch) if(me.value.watch.indexOf(watch) != -1) return true
      return false
    }
  )
  if (search != "") {
    FilterPosts.value = TotalPosts.filter(post => post.text.includes(search))
  } else {
    FilterPosts.value = TotalPosts
  }
}
</script>

<style lang="scss">
ul {
  color: grey;
  font-size: 14px;
  font-family:sans-serif;
}

li.online::marker {
  color: green !important;
}

li.wait::marker {
  color: orange;
}

.post {
  width: 600px;
  z-index: 1;
}

.sider, .tool {
  position: sticky;
  top: 72px;
  z-index: 1;
}

.fill {
  padding: 0;
  transition: all 0.2s;

  @include themeify{
    opacity: themed('fill');
  }
}

.content {
  display: flex;
  justify-content: center;
}

.hidden {
  width: 300px;
}
</style>