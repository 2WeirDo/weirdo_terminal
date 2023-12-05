/**
 * 接口路由
 * @author weirdo
 */
const routes = [
  {
    path: '/user/register',
    handler: require('./controller/userController').userRegisterApi
  },
  {
    path: '/user/login',
    handler: require('./controller/userController').userLoginApi
  },
  {
    path: '/user/logout',
    handler: require('./controller/userController').userLogoutApi
  },
  {
    path: '/user/current',
    handler: require('./controller/userController').getLoginUserApi
  }
]

module.exports = routes
