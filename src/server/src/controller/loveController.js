// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
const { getLove } = require('../thirdpart/loveApi')
const MyError = require('../exception')
const { THIRD_PART_SERVICE_ERROR_CODE } = require('../exception/errorCode')

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

module.exports = {
  getRandomLoveApi
}
