<!-- 这个主页面只负责连接终端和命令系统 -->
<template>
  <!-- 无法解决终端多开 -->
  <weirdo-terminal
    ref="terminalRef"
    full-screen
    :on-submit-command="onSubmitCommand"
    :user="loginUser"
  />
</template>

<script setup lang="ts">
import { doCommandExecute } from '../core/commandExecutor'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'

const terminalRef = ref()

// 写入命令触发回车后, 对命令进行解析 (这里的实现就可以自定义了)
const onSubmitCommand = async (inputText: string) => {
  if (!inputText) {
    return
  }

  // 拿到YuTerminal暴露出来的终端对象
  const terminal = terminalRef.value.terminal

  // 命令解析
  // 为什么要放在外面❓ 而不是放在组件中 : 实现低耦合, 你可以自主定义和扩展你的解析系统
  // 将文本和终端对象 传递给 命令系统
  // 这里是没传第三个参数(父级命令), 因为这里本就是全局命令(最顶级), 但是实现子父命令的时候要传递
  await doCommandExecute(inputText, terminal)
}
const userStore = useUserStore()
const { loginUser } = storeToRefs(userStore)
// 挂载终端后 : 即将用户登录信息存到storage中
onMounted(() => {
  userStore.getAndSetLoginUser()
})
</script>

<style></style>
