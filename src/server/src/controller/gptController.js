/**
 * gpt接口
 * @param event
 * @param req
 * @param res
 */
import { getGptOutput } from '../thirdpart/gptApi.js'
import MyError from '../exception/index.js'
import { REQUEST_PARAMS_ERROR_CODE, THIRD_PART_SERVICE_ERROR_CODE } from '../exception/errorCode.js'
async function getGptApi(event, req, res) {
  const { message, memory } = event
  // console.log("message", message);
  if (!message) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入消息')
  }
  const result = await getGptOutput(message, memory)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export { getGptApi }
