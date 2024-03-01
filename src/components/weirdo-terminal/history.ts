import { Ref, ref } from 'vue'
import CommandOutputType = WeirdoTerminal.CommandOutputType
import CommandInputType = WeirdoTerminal.CommandInputType

/**
 * 查看历史功能
 * 按 上下箭头 可以回显输入过的text
 * @param commandList
 * @param inputCommand
 */
const useHistory = (commandList: CommandOutputType[], inputCommand: Ref<CommandInputType>) => {
  // 记录一下当前命令的位置
  // commandList: 已经输入过的命令的列表
  const commandHistoryPos = ref(commandList.length)

  const listCommandHistory = () => {
    return commandList
  }

  // 历史记录下翻
  const showNextCommand = () => {
    // console.log(commandHistoryPos.value, commandList, inputCommand);
    if (commandHistoryPos.value < commandList.length - 1) {
      // 还没到最新记录
      commandHistoryPos.value++
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    } else if (commandHistoryPos.value === commandList.length - 1) {
      commandHistoryPos.value++
      // 一直按下减就会赋值为空, 准备开始输入新的
      inputCommand.value.text = ''
    }
  }

  // 历史记录上翻
  const showPrevCommand = () => {
    // console.log(commandHistoryPos.value, commandList, inputCommand);
    if (commandHistoryPos.value >= 1) {
      commandHistoryPos.value--
      inputCommand.value.text = commandList[commandHistoryPos.value].text
    }
  }

  return {
    commandHistoryPos, // 命令个数
    listCommandHistory, // 获取所有输入过的命令
    showNextCommand,
    showPrevCommand
  }
}

export default useHistory
