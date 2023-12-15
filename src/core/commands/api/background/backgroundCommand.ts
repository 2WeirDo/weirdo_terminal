import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '../../../../stores/terminalConfigStore'
import { getBackground } from './backgroundApi'
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
  options: [
    {
      key: 'back',
      type: 'boolean',
      desc: '切换回上一张',
      alias: ['b'],
      defaultValue: false
    }
  ],
  async action(options, terminal) {
    const { _, back } = options
    let url = _[0]
    if (_.length > 0) {
      url = _[0]
    }
    const { setBackground, setPreBg } = useTerminalConfigStore()
    const terminalStore = useTerminalConfigStore()
    if (!url) {
      // 随机获取壁纸
      if (back) {
        const res = terminalStore.preBg
        setBackground(res);
      } else {
        const res = await getBackground()
        // const pre = terminalStore.preBg
        const bg = terminalStore.background
        // setBackground(res.data)
        setPreBg(bg);
        setBackground(res)
      }
    } else setBackground(url)
    terminal.writeTextSuccessResult('成功更换壁纸')
    // setTimeout(() => {
    //   terminal.focusInput()
    // }, 0)
  }
}

export default backgroundCommand
