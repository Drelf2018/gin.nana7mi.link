import axios from 'axios'
import { Format } from './tool'
import { get_user_photo } from '../aliyun'

const gin_old = axios.create({ baseURL: 'https://gin.nana7mi.link/' })
// const gin = axios.create({ baseURL: 'https://blog.nana7mi.link/' })

interface GinData<T = any> {
  code: number
  message?: string
  data: T
}

export async function request<T = any>(url: string, method: string = "GET", auth: string = "", params: any = {}, data: any = {}) {
  let resp = await gin_old.request<GinData<T>>({
    method: method,
    url: url,
    headers: { "Authorization": auth },
    params: params,
    data: data,
  })
  if (resp.data.code != 0) throw resp.data.message
  return resp.data.data
}

export async function test(url: string, method: string, auth: string = "", data: any = {}) {
  return await request("/test", "POST", auth, null, {
    pattern: "",
    method: "GET",
    url: url,
    data: data,
  })
}

export async function get_weibo_index(wb: string) {
  return await test("https://m.weibo.cn/api/container/getIndex", "GET", "783977a6-c616-49da-90cf-60de90f9d781", {
    "uid": wb,
    "type": "uid",
    "value": wb,
    "containerid": `100505${wb}"`,
  })
}

export async function me(auth: string) {
  return await request<Submitter>("/me", "GET", auth)
}

export async function get_token(uid: string | number) {
  return await request(`/token?uid=${uid}`)
}

export async function register(auth: string) {
  return await request("/register", "GET", auth)
}



export interface Submitter {
  uid: string
  permission: number
}

export interface Attachment {
  url?: string
  link: string
  MIME?: string
}

export class Blogger {
  platform: string
  uid: string
  name?: string
  create?: string
  follower?: string
  following?: string
  description?: string
  face: Attachment
  pendant: Attachment
  photo?: Attachment

  get_pendant_color(): string {
    switch (this.platform) {
      case "__login__":
        return "rgb(251, 114, 153)"
      case "bilibili":
        return "rgb(251, 114, 153)"
      case "weibo":
        return "#eb7350"
      default:
        return "transparent"
    }
  }

  get_face_href(): string {
    switch (this.platform) {
      case "__login__":
        return "/user"
      case "bilibili":
        return `https://space.bilibili.com/${this.uid}`
      case "weibo":
        return `https://weibo.com/u/${this.uid}`
      default:
        return ""
    }
  }

  async get_photo() {
    this.photo = { link: await get_user_photo(this.uid, 86400) }
  }
}

export class PostModel {
  platform: string
  mid: string
  time: string
  text: string
  source: string
  blogger: Blogger
  repost?: PostModel
  comments: Array<PostModel>
  attachments: Array<Attachment>
  submitter: Submitter

  get_post_url(): string {
    let uid = this.blogger.uid
    let mid = this.mid
    switch (this.platform) {
      case "bilibili":
        return ""
      case "weibo":
        return `https://weibo.com/${uid}/${mid}`
      default:
        return ""
    }
  }

  get_format_time(): string {
    return Format(new Date(parseInt(this.time) * 1000), "yy-MM-dd hh:mm:ss")
  }

  // 通知博文
  notice() {
    Notification.requestPermission().then(result => {
      if (result === 'denied') {
        console.log('Permission wasn\'t granted. Allow a retry.');
        return;
      }
      if (result === 'default') {
        console.log('The permission request was dismissed.');
        return;
      }

      let notice = new Notification(`${this.blogger.name} 发布了新动态！`, {
        body: this.text.replace(/<[^>]*>/g, ''),
        icon: "/favicon.ico",
        // image: this.attachments[0]?.link,
        data: "https://nana7mi.link"
      })
      let url = this.get_post_url()
      notice.onclick = function (event) {
        event.preventDefault(); // prevent the browser from focusing the Notification's tab
        window.open(url, '_blank');
      }
    })
  }
}

// export interface data {
//   online: online
//   posts: Array<PostModel>
// }

export function NewBlogger(blogger: Object) {
  return Object.assign(new Blogger(), blogger)
}

export function NewPost(post: Object) {
  if (!post) return null
  let p = Object.assign(new PostModel(), post)
  p.blogger = NewBlogger(p.blogger)
  p.repost = NewPost(p.repost)
  return p
}
