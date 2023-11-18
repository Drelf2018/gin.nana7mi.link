<template>
  <Login />
  <el-scrollbar ref="scrollbar" @scroll="(evt) => OnScroll(evt)" :height="100 / theme.zoom + 'vh'">
    <Main :isCovered="isCovered" :theme="theme">
      <template #left>
        <StickyArea>
          <template #normal>
            <iPhone ref="Phone" />
          </template>
          <template #sticky>
            <Card mode="mask" border="16px" radius="16px" :cover="card.photo" v-for="card in cards">
              <Profile :blogger="card"></Profile>
            </Card>
          </template>
        </StickyArea>
      </template>
      <template #right="{ submitters }">
        <StickyArea>
          <template #normal>
          </template>
          <template #sticky>
            <Card border="16px" radius="16px">
              <Swiper speed="2000" width="292px" :pictures="pictures" />
            </Card>
            <p style="color: gray;margin-left: 0.75em;margin-bottom: 0.5em;">提交者名单</p>
            <ul style="margin: 0.5em 0;">
              <li v-for="time, name of submitters.users"
                :class="{ online: submitters.server - time < 12, wait: submitters.server - time < 60 }">
                <span v-if="submitters.server - time < 60">{{ `${name} ${submitters.server - time} 秒前` }}</span>
                <span v-else>{{ `${name} 很久之前` }}</span>
              </li>
            </ul>
            <a href="https://github.com/Drelf2018/submitter" target="_blank" style="color: gray;">
              <p style="font-size: 14px;margin-top:0.5em;text-align: right;">如何成为提交者</p>
            </a>
          </template>
        </StickyArea>
      </template>
    </Main>
  </el-scrollbar>
  <!-- <Spine fileName="https://api.nana7mi.link/image/build_char_1023_ghost2" lambda="4773" /> -->
  <Spine
    fileName="https://gin.nana7mi.link/fetch/https://static.prts.wiki/spine38/char/char_1023_ghost2/build_char_1023_ghost2/build_char_1023_ghost2"
    lambda="4773" />
</template>
  
<script setup lang="ts">
import Main from './Main.vue'
import Card from '../components/Card.vue'
import Login from '../components/Login.vue'
import Spine from '../components/Spine.vue'
import iPhone from '../components/iPhone.vue'
import Swiper from '../components/Swiper.vue'
import StickyArea from '../components/StickyArea.vue'

import { Theme } from '../components/tool'

import { ref } from 'vue'

import { get_room_info, get_all_video_cover } from '../aliyun'
import { Attachment, Blogger, NewBlogger, get_weibo_index } from '../components/api'

// 主题
const theme = ref(new Theme)
// 卡片和画框
const cards = ref<Array<Blogger>>([])
const pictures = ref<Array<Attachment>>([])

// 取消系统自带滚动条
document.body.style.overflow = "hidden"

// 滚盘判断头部是否隐藏以及是否更新早期博文
const isCovered = ref(false)
const scrollbar = ref(null)

function OnScroll(evt) {
  isCovered.value = 136 <= evt.scrollTop
}

// 获取画框封面
get_all_video_cover([
  "BV1Nd4y1E7Xi", "BV1NV4y1s7qy", "BV1Wq4y1g7SW", "BV1WQ4y1i7NH", "BV1Y541177Rg", "BV18q4y1z7Vv",
  "BV1vJ411B7ng", "BV1n3411Y7fR", "BV1d34y1D7Vk", "BV1wT4y1r7g6", "BV1924y1R76y", "BV1JA4y1d7Bb",
  "BV1yU4y1W7Y2", "BV1tU4y1R7qu", "BV1yf4y137XH", "BV16D4y177Ef", "BV1DK4y1g7zE", "BV19K4y1p7Zh",
]).then(result => {
  result.push(result[0])
  pictures.value = result
})

// 卡片
get_room_info(21452505).then(data => {
  cards.value.push(NewBlogger({
    platform: "bilibili",
    uid: data.room_info.uid,
    name: data.anchor_info.base_info.uname,
    description: `粉丝 ${data.anchor_info.relation_info.attention} | 舰长 ${data.guard_info.count}`,
    face: { link: data.anchor_info.base_info.face },
    pendant: { link: "" },
    photo: {
      url: `https://live.bilibili.com/${data.room_info.room_id}`,
      link: data.room_info.cover.replace("http://", "https://"),
    }
  }))
})

get_weibo_index("7198559139").then(resp => {
  let u = resp.data.data.userInfo
  let cover: string = u.cover_image_phone
  cover = cover.replace(/(\.\d+){4,}/, ".0.350.1080.607")
  cards.value.push(NewBlogger({
    platform: "weibo",
    uid: u.id,
    name: u.screen_name,
    description: `粉丝 ${u.followers_count} | 关注 ${u.follow_count}`,
    face: { link: `https://gin.nana7mi.link/fetch/${u.avatar_hd}` },
    pendant: { link: "" },
    photo: {
      url: u.profile_url,
      link: `https://gin.nana7mi.link/fetch/${cover}`,
    }
  }))
})
</script>

<style>
@media screen and (min-width: 1200px) {
  .pc {
    zoom: var(--zoom);
  }
}

@media screen and (max-width: 1200px) {
  .pc {
    zoom: calc(1.15 * var(--zoom));
  }
}</style>