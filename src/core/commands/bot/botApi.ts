import myAxios from '@/plugins/myAxios'
import { useBotStore } from '@/stores/botStore'
import { storeToRefs } from 'pinia'

/**
 * gpt请求
 * @param message 消息
 * @param memory 历史消息记录
 */
export const getBotOutput = async (message: string) => {
  if (!message) return null
  let botStore = useBotStore()
  // bug
  // botStore.addRecord({ role: 'user', content: message })
  let { memory } = botStore
  let res: any = await myAxios.post('/bot/get', {message, memory })
  res = res.data
  botStore.addRecord({ role: 'user', content: message })
  botStore.addRecord({ role: 'assistant', content: res })
  return res
}
