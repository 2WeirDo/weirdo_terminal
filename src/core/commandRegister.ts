import { CommandType } from './command'

/**
 * 命令列表（数组元素顺序会影响 help 命令的展示顺序）
 */
const commandList: CommandType[] = []

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
