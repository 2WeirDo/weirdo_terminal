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

  const res = await api.sendMessage('困死我了')
  console.log(res.text)
}

example()

// import { ChatGPTAPI } from 'chatgpt'
// import { gptConfig } from '../src/server/src/config/config.js'
// /**
//  * 获取gpt返回的内容
//  * @return {Promise<*[]>}
//  */

// async function getGptOutput(message) {
//   if (!message) return null
//   const api = new ChatGPTAPI({
//     apiBaseUrl: gptConfig.baseUrl,
//     apiKey: gptConfig.key
//   })
//   const res = await api.sendMessage(message)
//   console.log("wwww: ", res.text);
//   // return res.text
// }

// // export { getGptOutput }
// getGptOutput('你好啊')
