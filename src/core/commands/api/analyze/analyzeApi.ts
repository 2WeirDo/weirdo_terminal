import myAxios from '@/plugins/myAxios'

export const getAnalyze = async (link: string) => {
  return await myAxios.post('/analyze/get', { link })
}
