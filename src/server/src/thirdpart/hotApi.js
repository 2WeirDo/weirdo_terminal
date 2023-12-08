const axios = require('axios')

/**
 * 随机获取热榜信息
 * @return {Promise<*[]>}
 */

async function getHot(platform) {
  if (!platform) {
    return null
  }
  const api = `https://api.vvhan.com/api/hotlist?type=${platform}`
  return await axios.get(api).then((res) => res.data.data)
}

module.exports = {
  getHot
}
