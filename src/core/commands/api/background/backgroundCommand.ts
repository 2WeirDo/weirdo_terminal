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
  desc: '壁纸源于wallhaven, 需科学上网访问',
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
    if (url && url.length < 5) {
      terminal.writeTextErrorResult('图片路径输入有误~')
      return
    }
    const { setBackground, setPreBg } = useTerminalConfigStore()
    const terminalStore = useTerminalConfigStore()
    if (!url) {
      // 随机获取壁纸
      if (back) {
        const res = terminalStore.preBg
        const bg = terminalStore.background
        if (res === bg) {
          terminal.writeTextErrorResult('只支持回退一次~')
          return
        }
        setBackground(res)
        terminal.writeTextSuccessResult('成功回退壁纸')
        return
      } else {
        const res = await getBackground()
        const bg = terminalStore.background
        setPreBg(bg)
        setBackground(res)
      }
    } else {
      const bg = terminalStore.background
      setPreBg(bg)
      setBackground(url)
    }
    terminal.writeTextSuccessResult('成功更换壁纸')
  }
}

export default backgroundCommand
