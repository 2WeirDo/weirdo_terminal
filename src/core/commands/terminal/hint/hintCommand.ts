import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '@/stores/terminalConfigStore'

/**
 * 提示命令
 * @author weirdo
 */
const hintCommand: CommandType = {
  func: 'hint',
  name: '开关提示',
  desc: '开启 / 关闭输入提示',
  params: [
    {
      key: 'switch',
      desc: '开关: on 开启, off 关闭',
      defaultValue: 'on'
    }
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options
    const { setOrToggleShowHint } = useTerminalConfigStore()
    let newHint
    if (_.length >= 1) {
      // 在终端输入 hint 后, 后面你不是要输入 on 或者 off 吗, 就是去匹配
      if (['on', 'off'].includes(_[0])) {
        newHint = _[0]
      }
    }
    const res = setOrToggleShowHint(newHint) // 如果不传参数或者newHint为undefined则toggle
    terminal.writeTextSuccessResult(`输入提示已${res ? '开启' : '关闭'}，刷新页面后生效`)
  }
}

export default hintCommand
