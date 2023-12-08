import myAxios from '@/plugins/myAxios'

export const getLove = async () => {
  return await myAxios.post('/love/get/random')
}
