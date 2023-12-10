import myAxios from '@/plugins/myAxios'
import { enBase64 } from '@/utils/standard'

export const getNamedVariables = async (searchText: string) => {
  const s = enBase64(searchText)
  const params = {s}
  const res = await myAxios.post('/varbook/get', { params })
  // console.log("res ", res.data.data);
  // return res.data.data
  console.log("res ", res);
  return res;
}
