import { CommandType } from '../../command'

/**
 * 知乎搜索命令
 * @author weirdo
 */
const zhihuCommand: CommandType = {
  func: 'zhihu',
  name: '知乎搜索',
  alias: [],
  desc: 'zhihu <搜索内容>',
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
    const targetLink = `https://www.zhihu.com/search?q=${word}`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default zhihuCommand
