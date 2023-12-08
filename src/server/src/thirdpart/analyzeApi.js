const axios = require('axios')

/**
 * 获取网站技术信息
 * @return {Promise<*[]>}
 */

async function getAnalyze(link) {
  if (!link) return null
  const api = `https://api.asilu.com/php/web-info.php?url=${link}`
  return await axios.get(api).then(res => res.data);
}

module.exports = {
  getAnalyze
}
