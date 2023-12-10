// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
import { getLove } from '../thirdpart/loveApi.js'
import MyError from '../exception/index.js'
import { THIRD_PART_SERVICE_ERROR_CODE } from '../exception/errorCode.js'

/**
 * 随机获取情话
 * @param event
 * @param req
 * @param res
 */
async function getRandomLoveApi(event, req, res) {
  // 调用封装的第三方api
  const result = await getLove()
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export {
  getRandomLoveApi
}
