import { CommandType } from '../../command'
import registerCommand from './subCommands/registerCommand'
import loginCommand from './subCommands/loginCommand'
import { useUserStore } from '@/stores/userStore'
import { LOCAL_USER } from './userConstant'
import logoutCommand from './subCommands/logoutCommand'

/**
 * 用户命令
 * @author weirdo
 */
const userCommand: CommandType = {
  func: 'user',
  name: '用户相关指令',
  desc: '各位不用登录即可',
  alias: [],
  params: [
    {
      key: 'subCommand',
      desc: '子命令',
      required: true
    }
  ],
  subCommands: {
    login: loginCommand,
    register: registerCommand,
    logout: logoutCommand
  },
  options: [],
  async action(options, terminal) {
    const { loginUser } = useUserStore()
    if (loginUser && loginUser.username !== LOCAL_USER.username) {
      let text = `当前用户：${loginUser.username}`
      if (loginUser.email) {
        text += ` ${loginUser.email}`
      }
      terminal.writeTextResult(text)
    } else {
      terminal.writeTextErrorResult('未登录，请执行 user login 命令登录')
    }
  }
}

export default userCommand
