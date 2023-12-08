import myAxios from '@/plugins/myAxios'

/**
 * @param platform
 */

const platList: any = {
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

export const getHot = async (platform: string) => {
  if (!platform) {
    return null
  }
  platform = platList[platform]
  if (!platform) {
    return null
  }
  let res: any = await myAxios.post('/hot/get', { platform })
  if (res.code === 0) {
    res = res.data
    res = res.slice(0, 10).map((item: any) => {
      return `${item.hot}&nbsp---&nbsp    <a href="${item.url}" target="_blank" style="color: white; border-bottom: 1px solid pink" >${item.title}</a>`
    })
    res = JSON.parse(JSON.stringify(res))
    let concatenatedText = res.join('<br>')
    concatenatedText = concatenatedText.replace(/'/g, '')
    return concatenatedText
  } else return null
}
