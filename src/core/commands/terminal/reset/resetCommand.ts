import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '@/stores/terminalConfigStore'

/**
 * 重置配置
 * @author weirdo
 */
const resetCommand: CommandType = {
  func: 'reset',
  name: '重置终端配置',
  alias: [],
  desc: '包括重置主题, 背景, 欢迎语, 是否开启提示',
  options: [
    {
      key: 'force',
      desc: '是否强制重置终端设置',
      alias: ['f'],
      type: 'boolean',
      defaultValue: false
    }
  ],
  action(options, terminal): void {
    const { force } = options;
    // 从store中拿到重置的方法
    const { reset } = useTerminalConfigStore()
    if (!force) {
      terminal.writeTextErrorResult('操作失败: 请确认要强制重置终端设置')
      return
    }
    reset()
    // 重置背景, storage, 欢迎语什么的
    terminal.writeTextSuccessResult('已重置终端配置')
  }
}

export default resetCommand
