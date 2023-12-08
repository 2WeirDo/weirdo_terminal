import myAxios from '@/plugins/myAxios'

export const getInspire = async () => {
  let res:any = await myAxios.post('/inspire/get/random');
  res = `${res.data.en}&nbsp&nbsp&nbsp${res.data.zh}`
  return res;
}
