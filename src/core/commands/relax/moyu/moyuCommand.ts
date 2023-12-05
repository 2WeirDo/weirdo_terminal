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
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      // @ts-ignore
      component: defineAsyncComponent(() => import('./MoYuBox.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default moyuCommand
