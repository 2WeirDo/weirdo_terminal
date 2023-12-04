import { ref } from 'vue'
import { getUsageStr } from '../../core/commands/terminal/help/helpUtils'
import { commandMap } from '../../core/commandRegister'
import _, { trim } from 'lodash'
import { useTerminalConfigStore } from '../../stores/terminalConfigStore'

/**
 * 命令提示功能
 * @author yupi
 */
const useHint = () => {
  const hint = ref('')

  // 从终端store中拿到保存的数据
  const { showHint } = useTerminalConfigStore()

  const setHint = (inputText: string) => {
    // 未开启提示
    if (!showHint) {
      return
    }
    if (!inputText) {
      hint.value = ''
      return
    }
    const args = trim(inputText).split(' ')
    // 大小写无关
    let func = args[0].toLowerCase() //拿到你输入的命令
    // 前缀匹配
    const likeKey = Object.keys(commandMap).filter((key) => key.startsWith(func))[0]
    let command = commandMap[likeKey] // 从命令集中匹配并拿到这个命令
    if (!command) {
      hint.value = ''
      return
    }
    // 子命令提示
    if (command.subCommands && Object.keys(command.subCommands).length > 0 && args.length > 1) {
      // 如果有子命令,通过命令拿到提示, 这里第一个参数传递子命令, 第二个参数传递父命令
      hint.value = getUsageStr(command.subCommands[args[1]], command)
    } else {
      // 通过命令拿到提示
      hint.value = getUsageStr(command)
    }
  }

  /**
   * 输入提示防抖
   */
  // 在 YuTerminal 中通过watchEffect监听输入框内容改变时，触发输入提示
  const debounceSetHint = _.debounce(function (inputText: string) {
    setHint(inputText)
  }, 250)

  return {
    hint,
    setHint,
    debounceSetHint
  }
}

export default useHint
