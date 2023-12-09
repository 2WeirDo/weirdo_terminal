import { CommandType } from '../../command'

import ComponentOutputType = WeirdoTerminal.ComponentOutputType
import { defineAsyncComponent } from 'vue'

/**
 * gpt命令
 */
const gptCommand: CommandType = {
  func: 'gpt',
  name: 'chatGPT 3.5',
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
    let message = _[0]
    const output: ComponentOutputType = {
      type: 'component',
      // 动态组件
      component: defineAsyncComponent(() => import('./gptBox.vue')),
      props: {
        message
      }
    }
    terminal.writeResult(output)
    // const res: any = await getGptOutput(message)
    // console.log("res", res);
    // terminal.writeTextSuccessResult(res)
  }
}

export default gptCommand
