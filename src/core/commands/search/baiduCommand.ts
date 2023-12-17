import { CommandType } from '../../command'

/**
 * 百度搜索命令
 * @author weirdo
 */
const baiduCommand: CommandType = {
  func: 'baidu',
  name: '百度搜索',
  desc: 'baidu <搜索内容>',
  alias: [],
  params: [
    {
      key: 'word',
      desc: '搜索内容',
      required: true
    }
  ],
  options: [
    {
      key: 'self',
      desc: '是否当前页面打开',
      alias: ['s'],
      type: 'boolean',
      defaultValue: false
    },
    {
      key: 'picture',
      desc: '是否搜索图片',
      alias: ['p'],
      type: 'boolean',
      defaultValue: false
    }
  ],
  // 这里的options是转换后的options, 别混淆了, 调用是在执行器里面调用的
  action(options, terminal) {
    const { _, self, picture } = options
    // const word = _.length > 0 ? _.join(' ') : ''
    let word = _.length > 0 ? _.join(' ') : ''
    let targetLink = `https://www.baidu.com/s?wd=${word}`
    // let targetLink = `https://kaifa.baidu.com/searchPage?wd=${word}`
    // 搜索图片
    if (picture) {
      targetLink = `https://image.baidu.com/search/index?tn=baiduimage&word=${word}`
    }
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default baiduCommand
