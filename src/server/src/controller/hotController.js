// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
import { getHot } from '../thirdpart/hotApi.js'
import MyError from '../exception/index.js'
import { THIRD_PART_SERVICE_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE } from '../exception/errorCode.js'

/**
 * 随机获取热榜
 * @param event
 * @param req
 * @param res
 */
async function getHotApi(event, req, res) {
  // 调用封装的第三方api
  const { platform } = event
  if (!platform) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入相关平台')
  }
  const result = await getHot(platform)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export {
  getHotApi
}
