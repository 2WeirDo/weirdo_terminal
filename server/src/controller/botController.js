/**
 * bot接口
 * @param event
 * @param req
 * @param res
 */
import { ask } from '../thirdpart/botApi.js'
import MyError from '../exception/index.js'
import { REQUEST_PARAMS_ERROR_CODE, THIRD_PART_SERVICE_ERROR_CODE } from '../exception/errorCode.js'
async function getBotApi(event, req, res) {
  const { message, memory } = event
  if (!message) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入消息')
  }
  const result = await ask(memory, message)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export { getBotApi }
