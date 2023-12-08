import myAxios from '@/plugins/myAxios'

export const getBackground = async () => {
  return await myAxios.post('/background/get/random')
}
