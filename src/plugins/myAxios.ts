import axios from 'axios'


/**
 *  @ts-ignore 一个特殊的注释，用于告诉TypeScript编译器，忽略某个特定的错误或警告
 * 某些情况下会遇到一些TypeScript编译器无法识别或处理的代码，例如第三方库或旧的代码，
 * 这时候，编译器可能会产生一些错误或警告，但这些错误或警告并不会影响代码的运行或使用，
 * 为了避免这些错误或警告对代码的阅读或编辑造成干扰，
 * 可以使用// @ts-ignore注释来告诉编译器忽略这些错误或警告，
 */

const myAxios = axios.create({
  baseURL:
  // @ts-ignore
    process.env.NODE.ENV === 'production'
      ? 'https://yuindex-server-974538-1256524210.ap-shanghai.run.tcloudbase.com/api'
      : 'http://localhost:7345/api'
})

myAxios.defaults.withCredentials = true

myAxios.interceptors.request.use(
  function (config) {
    return config
  },
  function (err) {
    return Promise.reject(err)
  }
)

myAxios.interceptors.response.use(
  function (response) {
    // console.log(response.data);
    return response.data;
  },
  function(err) {
    return Promise.reject(err);
  }
)

export default myAxios;