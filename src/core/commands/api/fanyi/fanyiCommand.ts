import { CommandType } from '../../../command'
import { translate } from './fanYiApi'

/**
 * 翻译命令
 * @author weirdo
 */
const fanyiCommand: CommandType = {
  func: 'fanyi',
  name: '翻译',
  alias: ['translate'],
  params: [
    {
      key: 'word',
      desc: '要翻译的内容',
      required: true
    }
  ],
  options: [
    {
      key: 'from',
      desc: '源语言',
      alias: ['f'],
      type: 'string',
      defaultValue: 'auto'
    },
    {
      key: 'to',
      desc: '目标语言',
      alias: ['t'],
      type: 'string',
      defaultValue: 'auto'
    }
  ],
  async action(options, terminal) {
    const { _, from, to } = options
    if (_.length < 1) {
      terminal.writeTextErrorResult('参数不足')
      return
    }
    const keywords = _.join(' ')
    // console.log("keywords: ", keywords);
    const res: any = await translate(keywords, {
      from,
      to
    })
    if (res?.code === 0) {
      terminal.writeTextSuccessResult(`翻译结果：${res.data?.trans_result[0]?.dst}`)
    } else {
      terminal.writeTextErrorResult(res?.message ?? '翻译失败')
    }
  }
}

export default fanyiCommand
