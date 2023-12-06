import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType

/**
 * 查看现在天气
 * @author weirdo
 */
const ddosCommand: CommandType = {
  func: 'weather',
  name: '查看天气',
  alias: ['nw'],
  collapsible: true,
  options: [],
  action(options, terminal) {
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./weather.vue')),
      props: {}
    }
    terminal.writeResult(output)
  }
}

export default ddosCommand
