import { CommandType } from '../../command'
import ComponentOutputType = WeirdoTerminal.ComponentOutputType
import { defineAsyncComponent } from 'vue'
import { useGptStore } from '@/stores/gptStore'
import { storeToRefs } from 'pinia'
/**
 * gpt命令
 */
const gptCommand: CommandType = {
  func: 'gpt',
  name: 'chatGPT 3.5',
  desc: '传入消息内容进行对话(支持4次记忆功能)',
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


    // bug 这个只能放在action里面
    // 在 Vue 组件外使用 Vue 的 store 或者组件实例并不总是可行的，
    // 因为它们需要在 Vue 实例的上下文中运行。这可能导致 store 的一些方法无法正常工作。
    let gptStore = useGptStore()


    let { memory } = storeToRefs(gptStore)
    const output: ComponentOutputType = {
      type: 'component',
      // 动态组件
      component: defineAsyncComponent(() => import('./gptBox.vue')),
      props: {
        message,
        memory
      }
    }
    terminal.writeResult(output)
    // const res: any = await getGptOutput(message)
    // console.log("res", res);
    // terminal.writeTextSuccessResult(res)
  }
}

export default gptCommand
