import { CommandType } from '../../../command'
import { getInspire } from './inspireApi'


const inspireCommand: CommandType = {
  func: 'inspire',
  name: '励志句子',
  options: [],
  async action(options, terminal) {
    const res = await getInspire();
    terminal.writeTextSuccessResult(`每日一句: <br>${res}`)
  }
}

export default inspireCommand
