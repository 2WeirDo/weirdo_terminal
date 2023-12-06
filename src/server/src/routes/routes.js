/**
 * 接口路由
 * @author weirdo
 */
let routes = [
  {
    path: '/user/register',
    handler: require('../controller/userController.js').userRegisterApi
  },
  {
    path: '/user/login',
    handler: require('../controller/userController.js').userLoginApi
  },
  {
    path: '/user/logout',
    handler: require('../controller/userController.js').userLogoutApi
  },
  {
    path: '/user/current',
    handler: require('../controller/userController.js').getLoginUserApi
  },
  {
    path: '/fanyi/translate',
    handler: require('../controller/fanyiController.js').translateApi
  },
  {
    path: '/music/get',
    handler: require('../controller/musicController.js').getSingleMusicApi
  },
  {
    path: "/dujitang/get/random",
    handler: require("../controller/dujitangController").getRandomDujitangApi,
  },
  {
    path: "/background/get/random",
    handler: require("../controller/backgroundController")
      .getRandomBackgroundApi,
  },
]

module.exports = routes
