/**
 * Node.js应用中使用Sequelize库连接到MySQL数据库
 */

import { Sequelize } from 'sequelize'
import { dbConfig } from '../config/config.js'

/**
 * 创建数据库实例
 * @type {Sequelize}
 */
const sequelize = new Sequelize({
  database: dbConfig.database,
  username: dbConfig.username,
  password: dbConfig.password,
  host: dbConfig.host,
  port: dbConfig.port,
  dialect: 'mysql', // 指定使用的数据库类型
  logging: console.log // 指定日志输出函
})

// 测试连接
// 使用 .authenticate() 函数测试连接是否正常：
sequelize
  .authenticate()
  .then(() => {
    console.log('MySQL client connected')
  })
  .catch((e) => {
    console.error('Unable to connect to MySQL', e)
  })

export default sequelize

// 默认情况下,Sequelize 将保持连接打开状态,并对所有查询使用相同的连接.
// 如果需要需要关闭连接,请调用 sequelize.close()
