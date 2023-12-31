import { CommandType } from '../../command'
import { ParsedOptions } from 'getopts'
import { useSpaceStore } from '@/stores/spaceStore'

/**
 * 列举
 */
const listCommand: CommandType = {
  func: 'list',
  name: '列举空间条目',
  alias: ['ls'],
  params: [
    {
      key: 'dir',
      desc: '目录'
    }
  ],
  options: [
    {
      key: 'recursive',
      desc: '是否递归列举',
      alias: ['r'],
      type: 'boolean',
      defaultValue: false
    }
  ],
  collapsible: true,
  action(options: ParsedOptions, terminal): void {
    const { _, recursive } = options
    const { listItems, currentDir } = useSpaceStore()
    // 判断是否传入目录, 否则就list当前目录
    let dir = _.join(' ') ?? currentDir
    // 通过传入目录和是否递归获取该目录下所有的条目
    const resultList = listItems(dir, recursive)
    terminal.writeTextResult(`目录 ${dir}：`)
    resultList.forEach((item) => {
      let output = `${item.name} &nbsp <a href="${item.link}" target="_blank" style="color: white; border-bottom: solid 1px pink">${item.link}</a>`
      if (item.type === 'dir') {
        output = `<span style="color: lawngreen">${item.name}</span>`
      }
      terminal.writeTextResult(output)
    })
  }
}

export default listCommand
