import myAxios from '@/plugins/myAxios'

export const getDujitang = async () => {
  return await myAxios.post('/dujitang/get/random')
}
