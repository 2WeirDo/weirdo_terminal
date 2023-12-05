import { CommandType } from '../../command'

/**
 * nihao 命令（整活）
 * @author weirdo
 */
const nihaoCommand: CommandType = {
  func: 'copy',
  name: '复制文本',
  params: [
    {
      key: 'text',
      desc: '需复制文本',
      required: true
    }
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    // console.log(options);
    const text = options._.join(' ')
    navigator.clipboard.writeText(text)
    terminal.writeTextSuccessResult('文本已复制到剪贴板')
  }
}

export default nihaoCommand
