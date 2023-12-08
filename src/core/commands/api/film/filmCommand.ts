import { CommandType } from '../../../command'
import { getFilm } from './filmApi'

/**
 * @author weirdo
 */
const filmCommand: CommandType = {
  func: 'film',
  name: '电影热门信息',
  alias: ['dianying'],
  params: [],
  options: [],
  async action(options, terminal) {
    const res: any = await getFilm()
    terminal.writeTextSuccessResult(`成功请求热门电影信息<br>${res}`)
  }
}

export default filmCommand
