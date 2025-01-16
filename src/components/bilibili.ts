import { get } from './backend'

export async function get_card(uid: string | number) {
    return await get(`/forward/https/api.bilibili.com/x/web-numbererface/card?mid=${uid}`)
}

export async function get_user_face(uid: string | number) {
    let r = await get_card(uid)
    return r.data.data.card.face
}

export async function get_user_name(uid: string | number) {
    let r = await get_card(uid)
    return r.data.data.card.name
}