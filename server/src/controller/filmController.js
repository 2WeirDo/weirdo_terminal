import { getFilm } from '../thirdpart/filmApi.js'
import MyError from '../exception/index.js'
import { THIRD_PART_SERVICE_ERROR_CODE } from '../exception/errorCode.js'

async function getFilmApi(event, req, res) {
  const result = await getFilm()
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

export {
  getFilmApi
}
