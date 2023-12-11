/**
 * 使用Express框架来创建一个基于HTTP的Web服务器。
 */
import express from 'express'
import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import expressSession from 'express-session'
import { createClient } from 'redis'
import {redisConfig} from '../config/config.js'
import MyError from '../exception/index.js'
import { createServer } from 'http'
import {FORBIDDEN_ERROR_CODE} from '../exception/errorCode.js'
import morgan from 'morgan' // 用于记录HTTP请求日志。
import connectRedis from 'connect-redis';
const RedisStore = connectRedis(expressSession);
 // 用于将Express会话存储到Redis中。

// 创建一个Redis客户端实例，并配置它连接到Redis数据库。
const redisClient = createClient(redisConfig)

redisClient.on('connect', function () {
  console.log('Redis client connected')
})
redisClient.on('error', function (e) {
  console.error(e)
})

// 请求体大小限制
const requestLimit = '5120kb'

class ExpressServer {
  constructor() {
    this.app = express()
    // 上下文请求路径, 在myAxios.ts中有用到
    this.contextPath = '/api'
    // 请求日志
    this.app.use(morgan('short'))
    // extended 参数是一个布尔值，它指定了在解析请求体时是否使用扩展模式。当它false时，
    // 它会使用 Node.js 内置的 querystring 模块来解析数据，只支持简单的键值对数据。
    this.app.use(urlencoded({ extended: false, limit: requestLimit }))
    this.app.use(json({ limit: requestLimit }))

    // 隐藏服务器的标识信息。它的值通常是 "Express" 或 "Node.js"，
    // 通过将其设置为 false，Express 将不再在响应头中包含这个字段，从而隐藏服务器的技术信息。
    this.app.set('x-powered-by', false)

    // app.all() 方法来捕获所有HTTP请求的路由（*通配符匹配所有路径）。
    this.app.all('*', (req, res, next) => {
      // 开启跨域, 表示允许跨域请求携带认证信息（例如，cookies、HTTP认证等）。
      res.setHeader('Access-Control-Allow-Credentials', 'true')

      //  获取请求头中的 "Origin" 字段，该字段表示发起请求的源（域名）
      const origin = req.get('Origin')

      // 允许的地址 http://127.0.0.1:9000 这样的格式
      // 检查请求中是否包含 "Origin" 头

      if (origin) {
        // 将响应头的允许源设置为与请求源相同，即允许来自相同源的跨域请求。
        res.setHeader('Access-Control-Allow-Origin', origin)
      }


      // 允许跨域请求的方法
      res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PUT')
      // 允许跨域请求 header 携带哪些东西
      res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, If-Modified-Since'
      )
      // 调用 next() 函数，将控制传递给下一个中间件或路由处理器
      next()
    })

    // 设置Express的Session存储中间件(跟之前session设置方法一样，只加了store项为redis存储)
    const sessionOptions = {
      // store session存储实例，默认为一个新的 MemoryStore 实例。
      store: new RedisStore({ client: redisClient }), // 只需设置这个就可存储到redis
      name: 'session_id', // 设置会话ID的cookie的名称, 默认connect.sid
      secret: 'weirdo', // 设置签名秘钥  内容可以任意填写
      resave: false, // 强制保存，如果session没有被修改也要重新保存,默认true(推荐false)
      saveUninitialized: true, // 如果原先没有session那么就设置，否则不设置(推荐true)
      rolling: true, // 每次请求更新有效时长
      cookie: {
        // domain: ".weirdo_terminal.com", // 需要共享 cookie 时再设置
        // 全局设置 cookie，就是访问随便 api 就会设置 cookie，也可以在登录的路由下单独设置
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 天后过期
        httpOnly: true // 是否允许客户端修改 cookie（默认 true 不能被修改）
      }
    }
    this.app.use(expressSession(sessionOptions))

    // 创建了一个HTTP服务器并将Express.js应用程序绑定到这个服务器上，
    // 这样应用程序就可以监听HTTP请求并处理它们。
    this.server = createServer(this.app)
  }

  setRoute(path, handlerFunction) {
    const handler = async (req, res) => {
      const requestClientIp = getClientIp(req)
      if (!requestClientIp) {
        return FORBIDDEN_ERROR_CODE
      }
      let result
      const event = req.body
      try {
        result = await handlerFunction(event, req, res)
        result = {
          code: 0,
          data: result
        }
      } catch (e) {
        if (e instanceof MyError) {
          result = {
            code: e.code,
            message: e.message,
            data: null
          }
        } else {
          result = {
            code: 500,
            data: null,
            message: 'server error'
          }
        }
      }
      res.send(result)
    }
    this.app.post(this.contextPath + path, handler)
  }

  listen(port) {
    this.server.listen(port)
    let url = `http://localhost:${port}`
    if (this.contextPath) {
      url += this.contextPath
    }
    // console.log(`server start at ${url}, env = ${process.env.NODE_ENV}`);
  }
}

/**
 * 获取真实客户端 ip
 * @param req
 * @returns {*|string}
 */
function getClientIp(req) {
  if (!req) return ''
  return (
    req.headers['x-forwarded-for'] ||
    req.connection?.remoteAddress ||
    req.socket?.remoteAddress ||
    req.connection?.socket?.remoteAddress ||
    req.ip
  )
}

export const CloudBaseRunServer = ExpressServer
