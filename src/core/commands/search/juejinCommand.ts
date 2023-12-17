import { CommandType } from '../../command'

/**
 * 知乎搜索命令
 * @author weirdo
 */
const juejinCommand: CommandType = {
  func: 'juejin',
  name: '掘金搜索',
  alias: [],
  desc: 'juejin <搜索内容>',
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
    }
  ],
  action(options, terminal) {
    const { _, self } = options
    const word = _.length > 0 ? _.join(' ') : ''
    const targetLink = `https://juejin.cn/search?query=${word}`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default juejinCommand
