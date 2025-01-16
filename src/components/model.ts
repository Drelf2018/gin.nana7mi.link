// 博文
export interface Blog {
    id?: number
    created_at?: string

    submitter?: string
    platform?: string
    type?: string
    uid?: string
    mid?: string

    url?: string
    text?: string
    time?: string
    title?: string
    source?: string
    edited?: boolean

    name?: string
    avatar: string
    follower?: string
    following?: string
    description?: string

    reply_id?: number
    reply?: Blog
    comment_id?: number
    comments?: Blog[]

    assets?: string[]
    banner?: string[]
    extra?: { [key: string]: any }
}

// 权限
export enum Role {
    Invalid,
    Normal,
    Trusted,
    Admin,
    Owner,
}

// 请求记录
export class RequestLog {
    blog_id: number
    created_at: string
    finished_at: string
    raw_result: string
    result: any
    error: string
}

// 博文筛选条件
export class Filter {
    submitter: string
    platform: string
    type: string
    uid: string
}

// 任务
export class Task {
    id: number
    created_at: string

    public: boolean
    enable: boolean
    name: string
    method: string
    url: string
    body: string
    header: { [key: string]: string }
    README: string
    fork_id: number
    fork_count: number

    filters: Filter[]
    logs: RequestLog[]
    user_id: string
}

// 用户
export class User {
    uid: string
    created_at: string
    ban: string
    role: Role
    name: string
    nickname: string
    tasks: Task[]
}

// 在线
export interface Online { [key: string]: number }

// 测试任务
export class Test {
    blog: Blog
    task: Task
}

// 测试任务集
export class Tests {
    blog: Blog
    tasks: number[]
}

// 查询条件
export class BlogQuery {
    submitter: string
    platform: string
    type: string
    uid: string
    mid: string
    reply: boolean
    comments: boolean
    order: string
    limit: number
    offset: number
    conds: string[]
}

// 筛选条件
export class BlogFilter {
    filters: Filter[]
    reply: boolean
    comments: boolean
    order: string
    limit: number
    offset: number
    conds: string[]
}

export class PatchBody {
    op: string
    path: string
    value?: string
}
