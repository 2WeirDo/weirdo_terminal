<!-- 这个组件只负责终端, 是压根不知道命令系统的 -->
<template>
  <!-- 最外层这个div主要是为了全局替换样式 通过:style -->
  <!-- handleClickWrapper点击空白聚焦输入框 -->
  <div class="weirdo_terminal-wrapper" :style="wrapperStyle" @click="handleClickWrapper">
    <div ref="terminalRef" class="weirdo_terminal" :style="mainStyle">
      <!-- 下面 a-collapse 包括的就是列表 -->
      <!-- a-collapse : 控制命令的折叠 -->
      <!-- activeKeys是一个数组, 代表要展开哪些元素的下标 -->
      <a-collapse v-model:activeKey="activeKeys" :bordered="false" expand-icon-position="right">
        <template v-for="(output, index) in outputList" :key="index">
          <!-- 折叠 -->
          <a-collapse-panel v-if="output.collapsible" :key="index" class="terminal-row">
            <template #header>
              <span style="user-select: none; margin-right: 10px">
                {{ prompt }}
              </span>
              <span>{{ output.text }}</span>
            </template>
            <div v-for="(result, idx) in output.resultList" :key="idx" class="terminal-row">
              <content-output :output="result" />
            </div>
          </a-collapse-panel>

          <!-- 因为有些组件它是不可(不允许)折叠的, 所以这里还区分了情况 -->
          <!-- 不折叠 -->
          <template v-else>
            <!-- 输出命令及结果-->
            <template v-if="output.type === 'command'">
              <div class="terminal-row">
                <span style="user-select: none; margin-right: 10px">{{ prompt }}</span>
                <span>{{ output.text }}</span>
              </div>
              <div v-for="(result, idx) in output?.resultList" :key="idx" class="terminal-row">
                <content-output :output="result" />
              </div>
            </template>
            <!-- 打印信息 -->
            <template v-else>
              <div class="terminal-row">
                <content-output :output="output" />
              </div>
            </template>
          </template>
        </template>
      </a-collapse>

      <!-- 下面的就是输入框 -->
      <div class="terminal-row">
        <a-input
          ref="commandInputRef"
          v-model:value="inputCommand.text"
          :disabled="isRunning"
          class="command-input"
          :placeholder="inputCommand.placeholder"
          :bordered="false"
          autofocus
          @press-enter="doSubmitCommand"
        >
          <template #addonBefore>
            <!-- 这是插槽, 输入框前面放用户名称 -->
            <span class="command-input-prompt">😈{{ prompt }}</span>
          </template>
        </a-input>
      </div>

      <!-- 输入提示-->
      <!-- 这里hint的值是通过 watchEffect 监听输入框值的改变从 setHint 函数中拿到的-->
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">hint: {{ hint }}</div>
      <div style="margin-bottom: 16px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, StyleValue, toRefs, watchEffect } from 'vue'
import CommandOutputType = WeirdoTerminal.CommandOutputType
import OutputType = WeirdoTerminal.OutputType
import CommandInputType = WeirdoTerminal.CommandInputType
import { registerShortcuts } from './shortcuts'
import TerminalType = WeirdoTerminal.TerminalType
import TextOutputType = WeirdoTerminal.TextOutputType
import useHistory from './history'
import ContentOutput from './ContentOutput.vue'
import OutputStatusType = WeirdoTerminal.OutputStatusType
import { useTerminalConfigStore } from '../../stores/terminalConfigStore'
import useHint from './hint'
import UserType = User.UserType
import { LOCAL_USER } from '../../core/commands/user/userConstant'

interface WeirdoTerminalProps {
  height?: string | number
  fullScreen?: boolean
  user?: UserType
  // eslint-disable-next-line vue/require-default-prop
  onSubmitCommand?: (inputText: string) => void
}

// withDefaults是Vue 3的一个方法，用于为组件的props设置默认值
const props = withDefaults(defineProps<WeirdoTerminalProps>(), {
  height: '400px',
  fullScreen: false,
  user: LOCAL_USER as any
})

const { user } = toRefs(props)

const terminalRef = ref()
const activeKeys = ref<number[]>([])
// 输出列表
const outputList = ref<OutputType[]>([])
// 命令列表
const commandList = ref<CommandOutputType[]>([])
const commandInputRef = ref()

// 命令是否运行
const isRunning = ref(false)

// 引入终端配置状态
const configStore = useTerminalConfigStore()

/**
 * 初始命令
 */
const initCommand: CommandInputType = {
  text: '',
  placeholder: ''
}

/**
 * 待输入的命令
 */
const inputCommand = ref<CommandInputType>({
  ...initCommand
})

/**
 * 全局记录当前命令，便于写入结果
 */
let currentNewCommand: CommandOutputType

const { commandHistoryPos, showPrevCommand, showNextCommand, listCommandHistory } = useHistory(
  commandList.value,
  inputCommand
)

const { hint, setHint, debounceSetHint } = useHint()

/**
 * 提交命令（回车）
 */
const doSubmitCommand = async () => {
  isRunning.value = true
  setHint('')
  // inputCommand.value.text变量和上面输入框v-model绑定, 随着输入发生变化
  let inputText = inputCommand.value.text
  // 执行某条历史命令, 因为 ! + 历史列表的序号可以快速执行历史命令, 所以这里要判断一下
  if (inputText.startsWith('!')) {
    const commandIndex = Number(inputText.substring(1))
    // 根据序号拿到这条命令
    const command = commandList.value[commandIndex - 1]
    if (command) {
      inputText = command.text
    }
  }
  // 执行命令
  const newCommand: CommandOutputType = {
    text: inputText,
    type: 'command',
    resultList: []
  }
  // 记录当前命令，便于写入结果
  // 由于是赋值引用, currentNewCommand变了 newCommand跟着变
  currentNewCommand = newCommand

  // 执行命令 ❗ 这里的onSubmitCommand 就是 IndexPage 传递过来的方法
  await props.onSubmitCommand?.(inputText)

  // 添加输出（为空也要输出换行）
  outputList.value.push(newCommand)
  // ❗我们要拿到的对象就在outputList里面的newCommand里面的resultList里面的output里面的(text或者component)

  // 不为空字符串才算是有效命令
  if (inputText) {
    commandList.value.push(newCommand)
    // 重置当前要查看的命令位置
    commandHistoryPos.value = commandList.value.length
  }
  // 重置初始命令
  inputCommand.value = { ...initCommand }
  // 默认展开折叠面板
  activeKeys.value.push(outputList.value.length - 1)
  // 自动滚到底部
  setTimeout(() => {
    terminalRef.value.scrollTop = terminalRef.value.scrollHeight
  }, 50)

  // 命令允许结束
  isRunning.value = false
}

// 输入框内容改变时，触发输入提示
watchEffect(() => {
  // inputCommand 在上面 写入了 v-model 了的
  debounceSetHint(inputCommand.value.text)
})

/**
 * 输入提示符, 输入框前面的用户昵称, 当然你可以改成其它的
 */
// todo
const prompt = computed(() => {
  return '[weirdo]$'
})

/**
 * 终端主样式
 */
const mainStyle = computed(() => {
  const fullScreenStyle: StyleValue = {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
  return props.fullScreen
    ? fullScreenStyle
    : {
        height: props.height
      }
})

/**
 * 终端包装类主样式
 */
const wrapperStyle = computed(() => {
  const { background } = configStore
  const style = {
    ...mainStyle.value
  }
  if (background.startsWith('http')) {
    style.background = `url(${background})`
  } else {
    style.background = background
  }
  return style
})

/**
 * 清空所有输出
 */
const clear = () => {
  outputList.value = []
}

/**
 * 写命令文本结果
 * @param text
 * @param status
 */
const writeTextResult = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: 'text',
    status
  }
  currentNewCommand.resultList.push(newOutput)
}

/**
 * 写文本错误状态结果
 * @param text
 */
const writeTextErrorResult = (text: string) => {
  writeTextResult(text, 'error')
}

/**
 * 写文本成功状态结果
 * @param text
 */
const writeTextSuccessResult = (text: string) => {
  writeTextResult(text, 'success')
}

/**
 * 写结果
 * @param output
 */
const writeResult = (output: OutputType) => {
  currentNewCommand.resultList.push(output)
}

/**
 * 立即输出文本
 * @param text
 * @param status
 */
const writeTextOutput = (text: string, status?: OutputStatusType) => {
  const newOutput: TextOutputType = {
    text,
    type: 'text',
    status
  }
  outputList.value.push(newOutput)
}

/**
 * 设置命令是否可折叠
 * @param collapsible
 */
const setCommandCollapsible = (collapsible: boolean) => {
  currentNewCommand.collapsible = collapsible
}

/**
 * 立即输出
 * @param newOutput
 */
const writeOutput = (newOutput: OutputType) => {
  outputList.value.push(newOutput)
}

/**
 * 输入框聚焦
 */
const focusInput = () => {
  commandInputRef.value.focus()
}
/**
 * 获取输入框是否聚焦
 */
const isInputFocused = () => {
  // 比较这个输入元素input是否和当前获得焦点的元素相等。
  return (commandInputRef.value.input as HTMLInputElement) == document.activeElement
}

/**
 * 设置输入框的值 (按 tab 键)
 */
const setTabCompletion = () => {
  if (hint.value) {
    inputCommand.value.text = `${hint.value.split(' ')[0]}${
      hint.value.split(' ').length > 1 ? ' ' : ''
    }`
  }
}

/**
 * 折叠 / 展开所有块
 */
const toggleAllCollapse = () => {
  // 展开
  if (activeKeys.value.length === 0) {
    activeKeys.value = outputList.value.map((_, index) => {
      return index
    })
  } else {
    // 折叠
    activeKeys.value = []
  }
}

/**
 * 操作终端的对象
 * 这些对外提供的接口, 你要操作终端, 只能使用以下方法
 */
const terminal: TerminalType = {
  writeTextResult,
  writeTextErrorResult,
  writeTextSuccessResult,
  writeResult,
  writeTextOutput,
  writeOutput,
  clear,
  focusInput,
  isInputFocused,
  setTabCompletion,
  doSubmitCommand,
  showNextCommand,
  showPrevCommand,
  listCommandHistory,
  toggleAllCollapse,
  setCommandCollapsible
}

/**
 * 只执行一次
 */
onMounted(() => {
  registerShortcuts(terminal)
  const { welcomeTexts } = configStore
  if (welcomeTexts?.length > 0) {
    welcomeTexts.forEach((welcomeText) => {
      terminal.writeTextOutput(welcomeText)
    })
  } else {
    terminal.writeTextOutput(
      `Welcome to Weirdo_Terminal, coolest browser index for geeks!` +
        `<a href="//github.com/2WeirDo/weirdo_terminal" target='_blank'> GitHub Open Source</a>`
    )
    terminal.writeTextOutput(
      `Author <a href="//2weirdo.github.io/about/" target="_blank">coder_weirdo</a>` +
        `: please input 'help' to enjoy`
    )
    terminal.writeTextOutput('<br/>')
  }
})

/**
 * 当点击空白聚焦输入框
 */
function handleClickWrapper(event: Event): void {
  // @ts-ignore
  if (event.target.className === 'weirdo_terminal') {
    focusInput()
  }
}

// 将终端对象暴露出去
defineExpose({
  terminal
})
</script>

<style scoped>
.weirdo_terminal-wrapper {
  background: black;
}

.weirdo_terminal {
  background: rgba(100, 96, 96, 0.6);
  padding: 20px;
  overflow: scroll;
}

.weirdo_terminal::-webkit-scrollbar {
  display: none;
}

.weirdo_terminal span {
  font-size: 16px;
}

.weirdo_terminal
  :deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header) {
  color: white;
  padding: 0;
}

.weirdo_terminal :deep(.ant-collapse) {
  background: none;
}

.weirdo_terminal :deep(.ant-collapse-borderless > .ant-collapse-item) {
  border: none;
}

.weirdo_terminal :deep(.ant-collapse-content > .ant-collapse-content-box) {
  padding: 0;
}

.command-input {
  caret-color: white;
}

.command-input :deep(input) {
  color: white !important;
  font-size: 16px;
  padding: 0 10px;
}

.command-input :deep(.ant-input-group-addon) {
  background: none;
  border: none;
  padding: 0;
}

.command-input-prompt {
  color: white;
  background: transparent;
}

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
}
</style>
