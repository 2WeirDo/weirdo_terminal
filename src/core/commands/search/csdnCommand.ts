import { CommandType } from '../../command'

/**
 * 知乎搜索命令
 * @author weirdo
 */
const csdnCommand: CommandType = {
  func: 'csdn',
  name: 'csdn搜索',
  alias: [],
  desc: 'csdn <搜索内容>',
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
    const targetLink = `https://so.csdn.net/so/search?q=${word}`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default csdnCommand
