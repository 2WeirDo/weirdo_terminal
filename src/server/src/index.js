/**
 * 创建一个基于云托管(CloudBase Run)的服务器实例，
 * 并注册一些接口路由，最后监听指定的端口以便接受请求。
 */

const { CloudBaseRunServer } = require('./server/server.js')
const routes = require('./routes/routes.js')

// 创建云托管 Server 实例
const server = new CloudBaseRunServer()

// 注册接口路由
for (const route of routes) {
  server.setRoute(route.path, route.handler)
}

// 监听端口
server.listen(7345)
