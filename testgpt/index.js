// import { Configuration, OpenAIApi } from 'openai'

// const configuration = new Configuration({
//   apiBaseUrl: 'https://api.kwwai.top',
//   apiKey: 'sk-QipCiTXBHeXWheHoD3168bF695C24cEdA53c259282564d5b'
// })
// const openai = new OpenAIApi(configuration)

// async function createChatCompletion(messages) {
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     messages
//   })
//   if (response.data.choices.length) {
//     const firstMessage = response.data.choices[0].message
//     if (firstMessage) {
//       return firstMessage.content
//     }
//   }
//   throw new Error('Failed to get response from OpenAI service.')
// }

// createChatCompletion([{ role: 'user', content: 'Hello world' }])
//   .then((result) => {
//     console.log('result:', result)
//   })
//   .catch((error) => {
//     console.error(error)
//   })

import { ChatGPTAPI } from 'chatgpt'

async function example() {
  const api = new ChatGPTAPI({
    apiBaseUrl: 'https://api.kwwai.top/v1',
    apiKey: 'sk-QipCiTXBHeXWheHoD3168bF695C24cEdA53c259282564d5b'
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

