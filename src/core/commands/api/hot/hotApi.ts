import myAxios from '@/plugins/myAxios'

/**
 * @param platform
 */
export const getHot = async (platform: string) => {
  return await myAxios.post('/hot/get', { platform })
}
