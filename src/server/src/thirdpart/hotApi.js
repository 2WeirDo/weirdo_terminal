const axios = require('axios')

/**
 * 随机获取热榜信息
 * @return {Promise<*[]>}
 */
const platList = {
  zhihu: 'zhihuHot',
  hupu: 'huPu',
  baidu: 'baiduRD',
  bilibili: 'bili',
  history: 'history',
  tieba: 'baiduRY',
  weibo: 'wbHot',
  caijing: 'wxMoney',
  keji: 'wxKeJi',
  bagua: 'wxBaGua',
  xingzuo: 'wxXingZuo',
  lvyou: 'wxLvYou',
  douyin: 'douyinHot',
  douban: 'douban',
  shaoshupai: 'ssPai',
  it: 'itInfo',
  weixin: 'wxHot',
  meishi: 'wxFood',
  gaoxiao: 'wxJoke'
}


async function getHot(platform) {
  if (!platform) {
    return null
  }
  platform = platList[platform];
  if(!platform) {
    return null
  }
  const api = `https://api.vvhan.com/api/hotlist?type=${platform}`
  let q = await axios.get(api).then((res) =>
    res.data.data.slice(0, 10).map((item) => {
      return `${item.hot}&nbsp&nbsp&nbsp&nbsp    <a href="${item.url}" target="_blank" style="color: white; border-bottom: 1px solid pink" >${item.title}</a>`
    })
  )
  q = JSON.parse(JSON.stringify(q))
  let concatenatedText = q.join('<br>')
  concatenatedText = concatenatedText.replace(/'/g, '')
  return concatenatedText
}

module.exports = {
  getHot
}
