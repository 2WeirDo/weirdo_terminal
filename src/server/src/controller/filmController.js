const { getFilm } = require('../thirdpart/filmApi')
const MyError = require('../exception')
const { THIRD_PART_SERVICE_ERROR_CODE } = require('../exception/errorCode')

async function getFilmApi(event, req, res) {
  const result = await getFilm()
  if (!result) {
    throw new MyError(THIRD_PART_SERVICE_ERROR_CODE)
  }
  return result
}

module.exports = {
  getFilmApi
}
