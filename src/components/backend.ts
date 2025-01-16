import axios, { AxiosRequestConfig } from 'axios'
import { Blog, User, Online } from './model'

const gin = axios.create({ baseURL: 'https://blog.nana7mi.link/' })

export function replace_url(url: string): string {
    return "https://blog.nana7mi.link/public/" + url.replace(":/", "")
}

interface Result<D = any> {
    code: number
    error?: string
    data: D
}

class APIError extends Error {
    constructor(code: number, error: string) {
        super(`APIError: ${error} (${code})`);
    }
}

export async function get<D = any>(url: string, config?: AxiosRequestConfig) {
    const r = await gin.get<Result<D>>(url, config)
    if (r.status != 200) {
        throw new APIError(r.status, r.statusText)
    }
    if (r.data.code != 0) {
        throw new APIError(r.data.code, r.data.error)
    }
    return r.data.data
}

export async function get_submitter_info(uid: string) {
    return await get<User>(`/u/${uid}`)
}

export async function get_online() {
    return await get<Online>("/online")
}

export async function get_blogs(offset: number = 0, limit: number = 30): Promise<Blog[]> {
    // let r = await gin.get("/blogs?order=time desc")
    // let blogs: Blog[] = r.data.data
    // blogs.forEach(blog => blog.avatar = "https://blog.nana7mi.link/public/" + blog.avatar.replace(":/", ""))
    // return blogs
    return await get<Blog[]>("/blogs", {
        params: {
            order: "time desc",
            offset: offset,
            limit: limit,
            reply: true,
        }
    })
}