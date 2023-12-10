import { CommandType } from '../../command'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType

const baseUrl = 'https://www.baidu.com/s'

/**
 * B 站搜索命令
 * @author weirdo
 */
const youtubeCommand: CommandType = {
  func: 'youtube',
  name: 'youtube 搜索',
  alias: ['ytube'],
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
  collapsible: true,
  action(options, terminal) {
    const { _, self } = options
    const word = _.length > 0 ? _.join(' ') : ''
    const targetLink = `https://www.youtube.com/results?search_query=${word}`
    if (self) {
      window.location.href = targetLink
    } else {
      window.open(targetLink)
    }
  }
}

export default youtubeCommand
