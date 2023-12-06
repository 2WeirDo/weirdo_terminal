import { CommandType } from './command'
import dateCommand from './commands/basic/dateCommand'
import gotoCommand from './commands/basic/gotoCommand'
import baiduCommand from './commands/search/baiduCommand'
import bingCommand from './commands/search/bingCommand'
import doubanCommand from './commands/search/doubanCommand'
import douyinCommand from './commands/search/douyinCommand'
import githubCommand from './commands/search/githubCommand'
import googleCommand from './commands/search/googleCommand'
import mdnCommand from './commands/search/mdnCommand'
import StackoverflowCommand from './commands/search/stackoverflowCommand'
import zhihuCommand from './commands/search/zhihuCommand'
import shortcutCommand from './commands/terminal/shortcut/shortcutCommand'
import helpCommand from './commands/terminal/help/helpCommand'
import clearCommand from './commands/terminal/shortcut/clearCommand'
import ikunCommand from './commands/relax/ikun/ikunCommand'
import todoCommand from './commands/relax/todo/todoCommand'
import copyCommand from './commands/basic/copyCommand'
import moyuCommand from './commands/relax/moyu/moyuCommand'
import bilibiliCommand from './commands/search/bilibiliCommand'
import youtubeCommand from './commands/search/youtubeCommand'
import historyCommand from './commands/terminal/history/historyCommand'
import hintCommand from './commands/terminal/hint/hintCommand'
import resetCommand from './commands/terminal/reset/resetCommand'
import welcomeCommand from './commands/terminal/welcome/welcomeCommand'
import userCommands from './commands/user/userCommands'
import fanyiCommand from './commands/api/fanyi/fanyiCommand'
import juejinCommand from './commands/search/juejinCommand'
import csdnCommand from './commands/search/csdnCommand'
import musicCommand from './commands/api/music/musicCommand'
import weatherCommand from './commands/basic/weather/weatherCommand'
import dujitangCommand from './commands/api/dujitang/dujitangCommand'
import backColorCommand from './commands/basic/backColorCommand'
import backgroundCommand from './commands/api/background/backgroundCommand'

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = [
  dateCommand,
  shortcutCommand,
  zhihuCommand,
  StackoverflowCommand,
  mdnCommand,
  googleCommand,
  githubCommand,
  doubanCommand,
  douyinCommand,
  bingCommand,
  baiduCommand,
  gotoCommand,
  helpCommand,
  clearCommand,
  ikunCommand,
  todoCommand,
  copyCommand,
  moyuCommand,
  bilibiliCommand,
  youtubeCommand,
  historyCommand,
  hintCommand,
  resetCommand,
  welcomeCommand,
  userCommands,
  fanyiCommand,
  juejinCommand,
  csdnCommand,
  musicCommand,
  weatherCommand,
  dujitangCommand,
  backColorCommand,
  backgroundCommand
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
  command.alias?.forEach((name) => {
    commandMap[name] = command
  })
})

export { commandList, commandMap }
