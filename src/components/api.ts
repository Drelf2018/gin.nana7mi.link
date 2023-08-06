import axios from 'axios'

const gin = axios.create({
  baseURL: 'https://gin.nana7mi.link/',
})

export default gin

export async function request(url: string, method: string = "GET", auth: string = "") {
  let res = await gin.request({
		method: method,
		url: url,
		headers: {"Authorization": auth},
	})
  if(res.data.code != 0) throw res.data.message
  return res.data.data
}

export async function get_token(uid: string | number) {
	return await request(`/token?uid=${uid}`)
}

export async function register(auth: string) {
	return await request("/register", "GET", auth)
}

export async function get_posts(begin: number = -1, end: number = -1) {
	let url = "/posts"
	if (begin != -1 || end != -1) {
		url += "?"
	}
	if (begin != -1) {
		url += `begin=${begin}`
	}
	if (end != -1) {
		url += `end=${end}`
	}
	return await request(url)
}