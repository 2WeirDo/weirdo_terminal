// 引入的一个用于转换的库
import getopts, { ParsedOptions } from 'getopts'

import { commandMap } from './commandRegister'
import { CommandOptionType, CommandType } from './command'
import TerminalType = WeirdoTerminal.TerminalType

/**
 * 执行命令
 * @param text 输入字符串
 * @param terminal 终端
 * @param parentCommand
 */
export const doCommandExecute = async (
  text: string, // 输入的文本(所有的)
  terminal: TerminalType,
  parentCommand?: CommandType // 可选 父命令
) => {
  //去除命令首尾空格
  text = text.trim()
  if (!text) {
    return
  }
  // 解析输入文本，得到命令对象
  const command: CommandType = getCommand(text, parentCommand)
  if (!command) {
    // 这里的"找不到命令", 就会从YuTerminal中传递参数到ContentOutput中去
    // 可以在ContentOutput中决定输出的状态标签的颜色
    terminal.writeTextErrorResult('找不到命令')
    return
  }
  // 解析参数（需传递不同的解析规则）
  const parsedOptions = doParse(text, command.options)
  // 将参数都放到 _ 里,比如{ _: [abc, def]}
  // 而像 -n, -l这种就是选项 { n: "唯多" l: "www.baidu,com" }
  const { _ } = parsedOptions
  // 有子命令，执行
  // 子父命令如何做 : 考虑递归即可
  if (_.length > 0 && command.subCommands && Object.keys(command.subCommands).length > 0) {
    // 把子命令当做新命令解析，user login xxx => login xxx
    const subText = text.substring(text.indexOf(' ') + 1)

    // 注意这个函数doCommanExecute, 可选传入第三个参数(父命令)
    // 比如 user login : 这里的第三个参数传递的就是父级命令 (user)
    // 目的❗: 也就是说拿到父命令集下的子命令对象
    await doCommandExecute(subText, terminal, command)
    return
  }
  // 执行命令, 调用命令的相关行为函数action (如果有子命令则这是第二次进入函数, 然后执行)
  // 如果有子命令, 这里的command就是子命令对象
  await doAction(command, parsedOptions, terminal, parentCommand)
}

/**
 * 获取命令（匹配）
 * @param text
 * @param parentCommand
 */
const getCommand = (text: string, parentCommand?: CommandType): CommandType => {
  let func = text.split(' ', 1)[0] // 这个 1 是分割力度, 只分割一次
  // 大小写无关
  func = func.toLowerCase()
  let commands = commandMap // commandMap 是我们已经注册好的命令集
  // 有父命令，则从父命令中查找 (比如 user login 中的 user 就是父命令)
  if (
    parentCommand &&
    parentCommand.subCommands &&
    Object.keys(parentCommand.subCommands).length > 0
  ) {
    // ❗命令集改为父命令的子命令集
    commands = parentCommand.subCommands
  }
  const command = commands[func] // 这个command 就是我们的命令对象了
  // console.log("getCommand = ", command);
  return command
}

/**
 * 解析参数
 * @param text
 * baidu weirdo -s
 * 
 * @param commandOptions
 * options: [
  {
    key: "self",
    desc: "是否当前页面打开",
    alias: ["s"],
    type: "boolean",
    defaultValue: false,
  },
  {
    key: "picture",
    desc: "是否搜索图片",
    alias: ["p"],
    type: "boolean",
    defaultValue: false,
  },
],
 */

const doParse = (text: string, commandOptions: CommandOptionType[]): getopts.ParsedOptions => {
  // 过滤掉关键词 (比如上例中的 baidu )
  const args: string[] = text.split(' ').slice(1)
  // 转换成getopts库需要的格式 (适配器模式)
  const options: getopts.Options = {
    alias: {},
    default: {},
    string: [],
    boolean: []
  }
  commandOptions.forEach((commandOption) => {
    const { alias, key, type, defaultValue } = commandOption
    if (alias && options.alias) {
      options.alias[key] = alias
    }
    options[type]?.push(key)
    if (defaultValue && options.default) {
      options.default[key] = defaultValue
    }
  })
  // getopts 是引入的一个转换的包, 可以将options转换为一个js对象, 处理起来更方便
  // 比如百度搜索唯多则对象为 {link: "www.baidu.com" name: "唯多" l: "www.baidu.com" n: "唯多"}
  const parsedOptions = getopts(args, options)
  // console.log('parsedOptions = ', parsedOptions)
  return parsedOptions
}

/**
 * 执行
 * @param command
 * @param options
 * @param terminal
 * @param parentCommand
 */
const doAction = async (
  command: CommandType,
  options: ParsedOptions,
  terminal: TerminalType,
  parentCommand?: CommandType
) => {
  const { help } = options // 就是说parsedOptions中写了 --help 这一个选项 即 help : true
  // 设置输出折叠
  if (command.collapsible || help) {
    terminal.setCommandCollapsible(true)
  }

  // todo => help指令

  // 调用命令的action方法, 我们每个命令都单独定义了一个怎么处理这个命令的方法 即action
  // 所以这个命令要做什么事情是跟解析器无关的, 只跟命令本身有关
  await command.action(options, terminal)
}
