import {
  userRegisterApi,
  userLoginApi,
  userLogoutApi,
  getLoginUserApi
} from '../controller/userController.js'

import { translateApi } from '../controller/fanyiController.js'
import { getSingleMusicApi } from '../controller/musicController.js'
import { getRandomDujitangApi } from '../controller/dujitangController.js'
import { getRandomBackgroundApi } from '../controller/backgroundController.js'
import { getRandomLoveApi } from '../controller/loveController.js'
import { getHotApi } from '../controller/hotController.js'
import { getAnalyzeApi } from '../controller/analyzeController.js'
import { getRandomInspireApi } from '../controller/inspireController.js'
import { getFilmApi } from '../controller/filmController.js'
import { getGptApi } from '../controller/gptController.js'
import { getVarbookApi } from '../controller/varbookController.js'

const routes = [
  { path: '/user/register', handler: userRegisterApi },
  { path: '/user/login', handler: userLoginApi },
  { path: '/user/logout', handler: userLogoutApi },
  { path: '/user/current', handler: getLoginUserApi },
  { path: '/fanyi/translate', handler: translateApi },
  { path: '/music/get', handler: getSingleMusicApi },
  { path: '/dujitang/get/random', handler: getRandomDujitangApi },
  { path: '/background/get/random', handler: getRandomBackgroundApi },
  { path: '/love/get/random', handler: getRandomLoveApi },
  { path: '/hot/get', handler: getHotApi },
  { path: '/analyze/get', handler: getAnalyzeApi },
  { path: '/inspire/get/random', handler: getRandomInspireApi },
  { path: '/film/get', handler: getFilmApi },
  { path: '/gpt/get', handler: getGptApi },
  { path: '/varbook/get', handler: getVarbookApi }
]

export default routes
