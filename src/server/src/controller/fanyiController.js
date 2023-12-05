const { translate } = require('../thirdpart/baiduFanYiApi')
const MyError = require('../exception')
const {
  REQUEST_PARAMS_ERROR_CODE,
  THIRD_PART_SERVICE_ERROR_CODE
} = require('../exception/errorCode')

/**
 * 翻译
 * @param event
 * @param req
 * @param res
 */

async function translateApi(event, req, res) {
  const { keywords, config } = event
  // keywords就是要翻译的文本, config里面包括 from 和 to
  // 前端的fanyi命令代码 : return await myAxios.post("/fanyi/translate", { keywords, config });
  if (!keywords) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入关键词')
  }
  const result = await translate(keywords, config)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  translateApi
}
