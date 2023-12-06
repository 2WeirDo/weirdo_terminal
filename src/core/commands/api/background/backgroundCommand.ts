import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '../../../../stores/terminalConfigStore'
import myAxios from '../../../../plugins/myAxios'

/**
 * 切换终端背景
 * @author weirdo
 */
const backgroundCommand: CommandType = {
  func: 'background',
  name: '切换背景图片',
  alias: ['bg'],
  params: [
    {
      key: 'url',
      desc: '图片地址(不填则随机)',
      required: false
    }
  ],
  options: [],
  async action(options, terminal) {
    const { _ } = options
    let url = _[0]
    if (_.length > 0) {
      url = _[0]
    }
    const { setBackground } = useTerminalConfigStore()
    if (!url) {
      // 随机获取壁纸
      const res = await myAxios.post('/background/get/random')
      setBackground(res.data)
    } else setBackground(url)
    setTimeout(() => {
      terminal.focusInput();
    }, 0);
  }
}

export default backgroundCommand
