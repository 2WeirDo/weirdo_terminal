import { CommandType } from '../../../command'
import { defineAsyncComponent } from 'vue'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType
import { checkSearchText } from '@/utils/standard'

/**
 * 变量命名命令
 * @author weirdo
 */
const varbookCommand: CommandType = {
  func: 'varbook',
  name: '输入信息自动帮你取变量名',
  desc: '❗接口问题暂时用不了',
  alias: ['vb'],
  params: [
    {
      key: 'data',
      desc: '待转译为变量内容',
      required: true
    }
  ],
  options: [],
  collapsible: true,
  action(options, terminal) {
    const _ = options._.join(' ')
    const searchText: string | boolean = checkSearchText(_, terminal)
    if (!searchText) return
    const output: ComponentOutputType = {
      type: 'component',
      component: defineAsyncComponent(() => import('./VarbookBox.vue')),
      props: {
        searchText
      }
    }
    terminal.writeResult(output)
  }
}

export default varbookCommand
