import axios from 'axios'

async function getVarbookOutput(params) {
  if (!params) return null
  const api = 'https://api-varbook.uiuing.com/translate'
  return await axios.get(api, { params }).then((res) => res.data)
  //   let ob = axios.create({
  //     baseURL: 'https://api-varbook.uiuing.com/translate'
  //   })
  //   ob.interceptors.response.use((response) => {
  //     if (response.status === 200) {
  //       const { data } = response
  //       return Promise.resolve(data)
  //     }
  //     return Promise.reject(response)
  //   })
  //   let res = await ob.get('', { params })
  //   return res
  // }
}
export { getVarbookOutput }
