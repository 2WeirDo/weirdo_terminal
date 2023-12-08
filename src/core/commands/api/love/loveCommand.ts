import { CommandType } from '../../../command'
import { getLove } from './loveApi'

/**
 * 来情话看看
 * @author weirdo
 */
const loveCommand: CommandType = {
  func: 'love',
  name: '情话',
  options: [],
  async action(options, terminal) {
    // 随机获取情话
    const res = await getLove()
    terminal.writeTextSuccessResult(res.data)
  }
}

export default loveCommand
