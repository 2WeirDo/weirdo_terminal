import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '../../../../stores/terminalConfigStore'

/**
 * 重置配置
 * @author weirdo
 */
const resetCommand: CommandType = {
  func: 'reset',
  name: '重置终端配置',
  alias: [],
  options: [],
  action(options, terminal): void {
    // 从store中拿到重置的方法
    const { reset } = useTerminalConfigStore()
    reset()
    // 重置背景, storage, 欢迎语什么的
    terminal.writeTextSuccessResult('已重置终端配置')
  }
}

export default resetCommand
