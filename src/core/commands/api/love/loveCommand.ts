import { CommandType } from '../../../command'
import myAxios from '@/plugins/myAxios'

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
    const res = await myAxios.post('/love/get/random')
    terminal.writeTextResult(res.data)
  }
}

export default loveCommand
