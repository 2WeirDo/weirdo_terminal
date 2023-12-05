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
  }
]

module.exports = routes
