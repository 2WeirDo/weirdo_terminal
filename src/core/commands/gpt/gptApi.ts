import myAxios from '@/plugins/myAxios'
import { useGptStore } from '@/stores/gptStore'
/**
 * gpt请求
 * @param message 消息
 * @param memory 历史消息记录
 */
export const getGptOutput = async (message: string, memory: any) => {
  if (!message) return null
  let res: any = await myAxios.post('/gpt/get', { message, memory })
  res = res.data
  // let [text, id] = res
  let gptStore = useGptStore()
  gptStore.addRecord(message)
  return res
}
