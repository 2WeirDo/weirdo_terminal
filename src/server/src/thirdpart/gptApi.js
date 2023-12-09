import { ChatGPTAPI } from 'chatgpt'
import { gptConfig } from '../config/config.js'
/**
 * 获取gpt返回的内容
 * @return {Promise<*[]>}
 */

async function getGptOutput(message, memory) {
  if (!message) return null
  let api = new ChatGPTAPI({
    apiBaseUrl: gptConfig.baseUrl,
    apiKey: gptConfig.key
  })

  // let res = await api.sendMessage(message, {
  //   parentMessageId: gptId
  // })
  // return [res.text, res.id]

  // let res
  // let parentId = null
  // let item = memory[memory.length - 1]
  // res = await api.sendMessage(item, {
  //   parentMessageId: parentId
  // })
  // parentId = res.id

  let res
  let parentId = null
  for (const item of memory) {
    res = await api.sendMessage(item, {
      parentMessageId: parentId
    })
    parentId = res.id
  }

  res = await api.sendMessage(message, {
    parentMessageId: parentId
  })
  return res.text
}

export { getGptOutput }
