// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
import { getAnalyze } from '../thirdpart/analyzeApi.js'
import MyError from '../exception/index.js'
import { THIRD_PART_SERVICE_ERROR_CODE, REQUEST_PARAMS_ERROR_CODE } from '../exception/errorCode.js'

/**
 * 网站技术分析
 * @param event
 * @param req
 * @param res
 */
async function getAnalyzeApi(event, req, res) {
  // 调用封装的第三方api
  const { link } = event
  if (!link) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入目标链接')
  }
  const result = await getAnalyze(link)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export {
  getAnalyzeApi
}
