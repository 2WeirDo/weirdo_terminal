import { CommandType } from '../../../command'
import myAxios from '@/plugins/myAxios'
import { useSpaceStore } from '@/stores/spaceStore'

/**
 * @author weirdo
 */
const analyzeCommand: CommandType = {
  func: 'analyze',
  name: '网站技术分析',
  alias: ['fenxi'],
  params: [
    {
      key: 'link',
      desc: '目标链接或书签名',
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
    //优先找空间条目
    let link = _[0]
    let { getItem } = useSpaceStore()
    const item = getItem(link)
    if (item?.link) {
      link = item?.link
    }
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      link = 'http://' + link
    }
    const res: any = await myAxios.post('/analyze/get', { link })
    
    if (res?.code === 0) {
      // console.log(res.data);
      terminal.writeTextSuccessResult(res.data)
    }
  }
}

export default analyzeCommand
