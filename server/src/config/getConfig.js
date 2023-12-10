/**
 * 获取当前环境的配置
 * @author weirdo
 */
let config
const env = process.env.NODE_ENV ?? 'local'

if (env === 'local') {
  config = import('./config.js')
} else {
  config = import(`./config.${env}.js`)
}

export default config

