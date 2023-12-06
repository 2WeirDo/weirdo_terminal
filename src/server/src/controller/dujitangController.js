// 请求层 : 接收前端发起的请求, 拿到参数
// 请求层调用逻辑层的方法或者调用第三方api
const { getDujitang } = require('../thirdpart/dujitangApi')
const MyError = require('../exception')
const { THIRD_PART_SERVICE_ERROR_CODE } = require('../exception/errorCode')

/**
 * 随机获取背景
 * @param event
 * @param req
 * @param res
 */
// routes中调用getRandomBackgroundApi
async function getRandomDujitangApi(event, req, res) {
  // 调用封装的第三方api
  const result = await getDujitang()
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  getRandomDujitangApi
}
