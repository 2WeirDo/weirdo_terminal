import { CommandType } from '../../../command'
import { useTerminalConfigStore } from '@/stores/terminalConfigStore'

let themList: any = {
  // bug
  // 这里后面不能加 !important
  low1: 'hue-rotate(60deg)',
  mid1: 'hue-rotate(120deg)',
  high: 'hue-rotate(180deg)',
  mid2: 'hue-rotate(240deg)',
  low2: 'hue-rotate(300deg)',
  normal: 'hue-rotate(360deg)',
  // good: 'drop-shadow(0px 0px 20px red) invert(15%)'
}

const themeCommand: CommandType = {
  func: 'theme',
  name: '主题变换(low/high/...)',
  desc: '输入变换程度即可进行主题改变',
  alias: ['zt'],
  params: [
    {
      key: 'degree',
      desc: '变化程度(normal/low1/low2/mid1/mid2/high)', // 90 / 180 / 270
      required: true
    }
  ],
  options: [],
  action(options, terminal) {
    const { _ } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }
    let degree = _.join(' ')
    // console.log('degree: ', degree)
    degree = themList[degree]
    if (!degree) {
      terminal.writeTextErrorResult('参数错误')
      return
    }
    // console.log('degree: ', degree)
    const configStore = useTerminalConfigStore()
    configStore.setTheme(degree)
    terminal.writeTextSuccessResult('更换主题成功')
  }
}

export default themeCommand
