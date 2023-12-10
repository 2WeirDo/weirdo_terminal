/**
 * gpt接口
 * @param event
 * @param req
 * @param res
 */
import { getVarbookOutput } from '../thirdpart/varbookApi.js'
import MyError from '../exception/index.js'
import { REQUEST_PARAMS_ERROR_CODE, THIRD_PART_SERVICE_ERROR_CODE } from '../exception/errorCode.js'
async function getVarbookApi(event, req, res) {
  const { params } = event
  if (!params) {
    throw new MyError(REQUEST_PARAMS_ERROR_CODE, '请输入变量描述')
  }
  const result = await getVarbookOutput(params)
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export { getVarbookApi }
