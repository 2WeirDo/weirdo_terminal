import { CommandType } from '../../../command'
import { getHot } from './hotApi'

/**
 * 热榜相关命令
 * @author weirdo
 */

const hotCommand: CommandType = {
  func: 'hot',
  name: '资讯热榜前10位',
  desc: '通过输入平台名称',
  params: [
    {
      key: 'platform',
      desc: '目标平台名称(拼音)',
      required: true
    }
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }
    const res:any = await getHot(_[0])
    if (res?.code === 0) {
        terminal.writeTextResult(res.data)
    } 
  }
}

export default hotCommand
