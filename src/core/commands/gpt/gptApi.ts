import myAxios from '@/plugins/myAxios'

/**
 * gpt请求
 * @param keywords
 * @param config
 */
export const getGptOutput = async (message: string) => {
  if (!message) return null
  let res:any = await myAxios.post('/gpt/get', { message })
  res = res.data;
  return res;
}
