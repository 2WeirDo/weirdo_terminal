import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType

/**
 * 摸鱼命令
 * @author weirdo
 */
const moyuCommand: CommandType = {
  func: 'moyu',
  name: '摸鱼',
  desc: '一些小游戏',
  options: [
    {
      key: 'back',
      type: 'boolean',
      desc: '重新进行上一个游戏',
      alias: ['b'],
      defaultValue: false
    }
  ],
  collapsible: true,
  action(options, terminal) {
    const { back } = options
    const output: ComponentOutputType = {
      type: 'component',
      // @ts-ignore
      component: defineAsyncComponent(() => import('./MoYuBox.vue')),
      props: { back }
    }
    terminal.writeResult(output)
  }
}

export default moyuCommand
