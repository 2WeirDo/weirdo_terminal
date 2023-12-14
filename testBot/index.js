import axios from 'axios'

const API_KEY = ''
const SECRET_KEY = ''
const ACCESS_TOKEN_URL = 'https://aip.baidubce.com/oauth/2.0/token'

// 获取 access token
async function fetchAccessToken() {
  const accessTokenRes = await axios.post(ACCESS_TOKEN_URL, null, {
    params: {
      grant_type: 'client_credentials',
      client_id: API_KEY,
      client_secret: SECRET_KEY
    }
  })
  return accessTokenRes.data.access_token
}

// Access Token 的有效期是 30 天，需要及时更新，在一个需要持久运行的 Node 应用里，
// 最好把 Access Token 和它对应的生成时间成对记录，以便在 token 过期之前及时更新：
// 全局存储一个 access token -> 过期时间对象
let accessToken = {
  expiredTime: 0,
  value: ''
}

async function getAccessToken() {
  if (accessToken.value && Date.now() < accessToken.expiredTime) {
    return accessToken.value
  }
  const token = await fetchAccessToken()
  accessToken = {
    expiredTime: Date.now() + 29 * 86400 * 1000, // 29 days
    value: token
  }
  return token
}

const CHAT_URL = 'https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions'

// async function ask(memory) {
//   const token = await getAccessToken()
//   const res = await axios.post(CHAT_URL, { memory }, { params: { access_token: token } })
//   const { data } = res
//   return data
// }

async function ask() {
  const messages = [
    { role: 'user', content: '把我接下来说的话都翻译成英文' },
    { role: 'assistant', content: '好的，我会尽力把您接下来想要表达的内容翻译成英文。请随时告诉我您想要说的话。' },
    { role: 'user', content: '你好，我是一名程序员。' }
]
  const token = await getAccessToken()
  // bug? 这里只能用messages?
  const res = await axios.post(CHAT_URL, { messages }, { params: { access_token: token } })
  const { data } = res
  return data
}

async function main() {
  const res = await ask()
  console.log(res)
}

main()
