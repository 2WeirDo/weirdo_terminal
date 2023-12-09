import axios from 'axios'
import MD5 from 'md5'
// import config from '../config/config.js'
import { baiduFanYiConfig } from '../config/config.js'

const appid = baiduFanYiConfig?.appid
const key = baiduFanYiConfig?.key
const apiUrl = 'http://api.fanyi.baidu.com/api/trans/vip/translate'

/**
 * 百度翻译
 * @param keywords 关键词
 * @param config 翻译配置
 * @return {Promise<*[]>}
 */
async function translate(keywords, config) {
  if (!keywords) {
    return null
  }
  const salt = new Date().getTime()
  // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
  const from = config?.from ?? 'auto'
  const to = config?.to ?? 'auto'
  const sign = MD5(appid + keywords + salt + key)
  return await axios({
    method: 'get',
    url: apiUrl,
    params: {
      q: keywords,
      appid,
      salt,
      from,
      to,
      sign
    }
  }).then((res) => res.data)
}

export { translate }
