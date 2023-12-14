import { CommandType } from '../../command'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType
import { defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useBotStore } from '@/stores/botStore'
/**
 * gpt命令
 */
const botCommand: CommandType = {
  func: 'bot',
  name: '文心一言 ERNIT-Bot ',
  desc: '支持记忆功能',
  alias: [],
  params: [
    {
      key: 'message',
      desc: '消息内容',
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
    let message = _.join(' ')
    let botStore = useBotStore()

    let { memory } = storeToRefs(botStore)
    const output: ComponentOutputType = {
      type: 'component',
      // 动态组件
      component: defineAsyncComponent(() => import('./botBox.vue')),
      props: {
        message,
        memory,
      }
    }
    terminal.writeResult(output)
  }
}

export default botCommand
