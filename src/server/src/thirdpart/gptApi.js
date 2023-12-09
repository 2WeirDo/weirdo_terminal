import { ChatGPTAPI } from 'chatgpt'
import { gptConfig } from '../config/config.js'
/**
 * 获取gpt返回的内容
 * @return {Promise<*[]>}
 */

async function getGptOutput(message) {
  if (!message) return null
  let api = new ChatGPTAPI({
    apiBaseUrl: gptConfig.baseUrl,
    apiKey: gptConfig.key
  })
  let res = await api.sendMessage(message)

  // let res = await api.sendMessage(message, {
  //   onProgress: (partialResponse) => console.log(partialResponse.text)
  // })

  // res = await api.sendMessage(message, {
  //   parentMessageId: res.id
  // })
  // console.log("res: ", res);
  return res.text
}

export { getGptOutput }
