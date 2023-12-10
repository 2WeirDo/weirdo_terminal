import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiBaseUrl: '',
    apiKey: ''
  })
  let res = await api.sendMessage('你是什么')
  console.log(res.text)

  // send a follow-up
  res = await api.sendMessage('你能扩充一下吗', {
    parentMessageId: res.id
  })
  console.log(res.text)

  // send another follow-up
  res = await api.sendMessage('我们刚刚谈论了什么?', {
    parentMessageId: res.id
  })
  console.log(res.text)
}

example()

