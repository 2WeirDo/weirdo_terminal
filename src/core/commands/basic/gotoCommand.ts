import { CommandType } from '../../command'
import { useSpaceStore } from '@/stores/spaceStore'

/**
 * 跳转命令
 * @author weirdo
 */
export default {
  func: 'goto',
  name: '网页跳转',
  alias: ['to', 'open', 'visit', 'jump'],
  params: [
    {
      key: 'link',
      desc: '目标链接',
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
  action(options, terminal): void {
    const { _, self } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }

    //优先找空间条目
    let link = _[0]
    let { getItem } = useSpaceStore()
    const item = getItem(link)
    if (item?.link) {
      link = item?.link
    }

    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      link = 'http://' + link
    }
    if (self) {
      window.location.href = link
    } else {
      window.open(link)
    }
  }
} as CommandType
