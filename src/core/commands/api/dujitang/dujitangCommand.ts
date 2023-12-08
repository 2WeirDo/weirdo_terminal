import { CommandType } from '../../../command'
import { getDujitang } from './dujitangApi'

/**
 * 来毒鸡汤看看
 * @author weirdo
 */
const dujitangCommand: CommandType = {
  func: 'dujitang',
  name: '毒鸡汤',
  options: [],
  async action(options, terminal) {
    // 随机获取毒鸡汤
    const res = await getDujitang();
    terminal.writeTextSuccessResult(res.data)
  }
}

export default dujitangCommand
