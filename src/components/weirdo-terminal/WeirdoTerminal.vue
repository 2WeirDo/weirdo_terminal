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
            <span class="command-input-prompt" style="text-shadow: 1px 0px 2px rgb(243, 134, 134)"
              >😈{{ prompt }}</span
            >
          </template>
        </a-input>
      </div>

      <!-- 输入提示-->
      <!-- 这里hint的值是通过 watchEffect 监听输入框值的改变从 setHint 函数中拿到的-->
      <div v-if="hint && !isRunning" class="terminal-row" style="color: #bbb">hint: {{ hint }}</div>
      <div style="margin-bottom: 16px" />
    </div>

    <button class="Btn">
      <a
        href="https://github.com/2WeirDo/weirdo_terminal"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span class="svgContainer">
          <svg fill="white" viewBox="0 0 496 512" height="1.6em">
            <path
              d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
            ></path>
          </svg>
        </span>
      </a>
      <span class="BG"></span>
    </button>
    <div class="spinner">
      <div class="spinner1"></div>
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
import ComponentOutputType = WeirdoTerminal.ComponentOutputType

import useHistory from './history'
import ContentOutput from './ContentOutput.vue'
import OutputStatusType = WeirdoTerminal.OutputStatusType
import { useTerminalConfigStore } from '@/stores/terminalConfigStore'
import { useGptStore } from '@/stores/gptStore'
import { useBotStore } from '@/stores/botStore'
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
const gptStore = useGptStore()
const botStore = useBotStore()

/**
 * 初始命令
 */
const initCommand: CommandInputType = {
  text: '',
  placeholder: 'Enter command'
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
const prompt = computed(() => {
  return `[${user.value?.username}]$`
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
  const { background, theme } = configStore
  const style = {
    ...mainStyle.value
  }
  if (background.startsWith('http')) {
    style.background = `url(${background})  no-repeat center center/cover`
  } else {
    style.background = background
  }
  style.filter = theme
  return style
})

// const fontStyle = computed(() => {
//   const { font } = configStore
//   const fStyle: StyleValue = {
//     color: `${font}`
//   }
//   return fStyle
// })

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
  // bug
  setTimeout(() => {
    terminal.focusInput()
  }, 0)
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
const writeResult = (output: OutputType, status?: OutputStatusType) => {
  const newOutput: ComponentOutputType = {
    component: output,
    type: 'component',
    status: 'success'
  }
  currentNewCommand.resultList.push(newOutput)
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
    //  `<a href="//github.com/2WeirDo/weirdo_terminal" target='_blank' style="color:pink"> GitHub Open Source</a>`
    terminal.writeTextOutput(
      `Welcome to Weirdo_Terminal!` +
        ' ~~~ ' +
        `Author :  <a href="//2weirdo.github.io/about/" target="_blank" style="color:pink; border-bottom: 1px solid pink">weirdo</a>`
    )
    terminal.writeTextOutput(
      `🔥输入'help'查看所有命令,  输入'shortcut'查看快捷键, 'tab'快速输入, 'clear' 清屏`
    )
    terminal.writeTextOutput(
      `🔥'history'查看历史记录,  'bot'调用文心一言服务,  'bg'切换背景图片(配合'theme'使用体验更佳~)`
    )
    terminal.writeTextOutput(
      `🎆🎮在输入框中输入正确的命令并触发'回车'键即成功进行一次操作&nbsp~~` +
        `~&nbsp其余命令请各位小伙伴自行探索哦~~`
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

<style scoped lang="scss">
.spinner {
  position: absolute;
  z-index: 10;
  right: 25px;
  top: 25px;
  background-image: linear-gradient(rgb(186, 66, 255) 35%, rgb(0, 225, 255));
  width: 56px;
  height: 56px;
  animation: spinning82341 2.7s linear infinite;
  text-align: center;
  border-radius: 50px;
  filter: blur(1px);
  box-shadow:
    0px -3px 10px 0px rgb(186, 66, 255),
    0px 3px 10px 0px rgb(0, 225, 255);
}

.spinner1 {
  background-color: rgb(36, 36, 36);
  width: 56px;
  height: 56px;
  border-radius: 50px;
  filter: blur(10px);
}

@keyframes spinning82341 {
  to {
    transform: rotate(360deg);
  }
}

.Btn {
  position: absolute;
  z-index: 100;
  right: 33px;
  top: 33px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;

  /* overflow: hidden; */
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.4s;
}

.svgContainer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  backdrop-filter: blur(0px);
  letter-spacing: 0.8px;
  border-radius: 10px;
  transition: all 0.3s;
  border: 1px solid rgba(156, 156, 156, 0.466);
}

.BG {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  background: #151515;
  z-index: -1;
  box-shadow: 0px 0px 10px gray;
  border-radius: 50%;
  pointer-events: none;
  transition: all 0.3s;
}

.Btn:hover {
  .BG {
    transform: scale(1.3);

    /* transform-origin: b; */
  }

  .svgContainer {
    background-color: rgba(156, 156, 156, 0.466);
    backdrop-filter: blur(4px);
  }
}

.weirdo_terminal-wrapper {
  // filter: hue-rotate(90deg);
  // filter: v-bind('configStore.$state.theme')  !important;
  background: black;
}

.weirdo_terminal {
  background: rgba(0, 0, 0, 0.7);

  /* bug : 子元素设置了background-image之后, 父元素再设置background为url则无效果 */
  // background-image: linear-gradient(to top, #4e435c 0%, #313838 100%);
  padding: 25px;
  overflow: scroll;

  &::-webkit-scrollbar {
    display: none;
  }

  span {
    font-size: 16px;
  }

  :deep(.ant-collapse-icon-position-right > .ant-collapse-item > .ant-collapse-header) {
    color: white;
    padding: 0;
  }

  :deep(.ant-collapse) {
    background: none;
  }

  :deep(.ant-collapse-borderless > .ant-collapse-item) {
    border: none;
  }

  :deep(.ant-collapse-content > .ant-collapse-content-box) {
    padding: 0;
  }
}

.command-input {
  caret-color: white;

  :deep(input) {
    color: white !important;
    font-size: 16px;
    padding: 0 10px;
  }

  :deep(.ant-input-group-addon) {
    background: none;
    border: none;
    padding: 0;
  }
}

.command-input-prompt {
  color: white;
  background: transparent;
}

/* 修改字体大小 */

.terminal-row {
  color: white;
  font-size: 16px;
  font-family: courier-new, courier, monospace;
  // font-family: serif;
}
</style>
