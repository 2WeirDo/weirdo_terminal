import { CommandType } from './command'
import dateCommand from './commands/basic/dateCommand'
import gotoCommand from './commands/basic/gotoCommand'
import shortcutCommand from './commands/terminal/shortcut/shortcutCommand'
import helpCommand from './commands/terminal/help/helpCommand'
import clearCommand from './commands/terminal/shortcut/clearCommand'
import ikunCommand from './commands/relax/ikun/ikunCommand'
import todoCommand from './commands/relax/todo/todoCommand'
import copyCommand from './commands/basic/copyCommand'
import moyuCommand from './commands/relax/moyu/moyuCommand'
import historyCommand from './commands/terminal/history/historyCommand'
import hintCommand from './commands/terminal/hint/hintCommand'
import resetCommand from './commands/terminal/reset/resetCommand'
import welcomeCommand from './commands/terminal/welcome/welcomeCommand'
import userCommands from './commands/user/userCommands'
import fanyiCommand from './commands/api/fanyi/fanyiCommand'
import musicCommand from './commands/api/music/musicCommand'
import weatherCommand from './commands/basic/weather/weatherCommand'
import dujitangCommand from './commands/api/dujitang/dujitangCommand'
import backColorCommand from './commands/basic/backColorCommand'
import backgroundCommand from './commands/api/background/backgroundCommand'
import searchCommands from './commands/search/searchCommands'
import spaceCommands from './commands/space/spaceCommands'
import loveCommand from './commands/api/love/loveCommand'
import hotCommand from './commands/api/hot/hotCommands'
import analyzeCommand from './commands/api/analyze/analyzeCommand'
import inspireCommand from './commands/api/inspire/inspireCommand'
import filmCommand from './commands/api/film/filmCommand'
import gptCommand from './commands/gpt/gptCommand'
import varbookCommand from './commands/api/varbook/varbookCommand'
import themeCommand from './commands/terminal/theme/themeCommand'
import botCommand from './commands/bot/botCommand'


/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  ...searchCommands,
  dateCommand,
  shortcutCommand,
  gotoCommand,
  helpCommand,
  clearCommand,
  ikunCommand,
  todoCommand,
  copyCommand,
  moyuCommand,
  historyCommand,
  hintCommand,
  resetCommand,
  welcomeCommand,
  userCommands,
  fanyiCommand,
  musicCommand,
  weatherCommand,
  dujitangCommand,
  backgroundCommand,
  backColorCommand,
  loveCommand,
  hotCommand,
  analyzeCommand,
  inspireCommand,
  filmCommand,
  gptCommand,
  varbookCommand,
  themeCommand,
  botCommand,
  ...spaceCommands
]

/**
 * 命令字典
 */
// 将命令集适配为一个map, 这样就不用遍历整个list, 查找的时候通过键值对查找即可
// key 为名称, value 为 function
// Record：这是 TypeScript 的内置泛型类型，用于创建具有一组键值对的对象类型。
const commandMap: Record<string, CommandType> = {}

commandList.forEach((command) => {
  commandMap[command.func] = command // func是某个command命令的名称
  command.alias?.forEach((name) => { // 为别名也进行创建
    commandMap[name] = command
  })
})

export { commandList, commandMap }
