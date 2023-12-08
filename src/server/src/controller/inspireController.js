// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
const { getInspire } = require('../thirdpart/inspireApi')
const MyError = require('../exception')
const { THIRD_PART_SERVICE_ERROR_CODE } = require('../exception/errorCode')

/**
 * 随机获取励志句子
 * @param event
 * @param req
 * @param res
 */
async function getRandomInspireApi(event, req, res) {
  // 调用封装的第三方api
  const result = await getInspire()
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  getRandomInspireApi
}
