import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType

/**
 * ikun 命令（整活）
 * @author weirdo
 */
const ikunCommand: CommandType = {
  func: 'ikun',
  name: '测试你是不是小黑子🐔',
  options: [],
  collapsible: true,
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./IkunBox.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default ikunCommand
