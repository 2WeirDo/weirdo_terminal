import { CommandType } from '../../../command'
import myAxios from '../../../../plugins/myAxios'

/**
 * 切换终端背景
 * @author yupi
 */
const backgroundCommand: CommandType = {
  func: 'dujitang',
  name: '毒鸡汤',
  options: [],
  async action(options, terminal) {
    // 随机获取毒鸡汤
    const res = await myAxios.post('/dujitang/get/random')
    terminal.writeTextResult(res.data)
  }
}

export default backgroundCommand
