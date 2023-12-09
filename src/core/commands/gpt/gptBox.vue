<template>
  <div v-html="displayContent" class="chat-box"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, computed } from 'vue'
import { getGptOutput } from './gptApi'
import { marked } from 'marked'
// import hljs from "highlight.js";

interface ChatBoxProps {
  message: string
}

marked.setOptions({
  renderer: new marked.Renderer,
  gfm: true,
  async: false,
  // highlight(code: string): string {
  //   return hljs.highlightAuto(code).value
  // },
  // 移除被弃用的选项或设置为新的选项
  mangle: false, // 这个选项已经被弃用
  headerIds: false, // 这个选项已经被弃用
  // headerPrefix: '', // 这个选项已经被弃用
})

let props = defineProps<ChatBoxProps>()

// 创建的对象只是浅层响应式的，不会对其值的内部结构进行深层次的响应式追踪
const res = shallowRef<string | { value: string }>('loading') // 初始设置为 'loading'
let displayContent = shallowRef<string | { value: string }>('loading') // 初始设置为 'loading'

onMounted(async () => {
  // 定时器 loading 效果
  let count = 0
  let loadingInterval = setInterval(() => {
    count++
    if (count > 3) {
      count = 0
    }
    switch (count) {
      case 0:
        res.value = 'loading'
        break
      case 1:
        res.value = 'loading.'
        break
      case 2:
        res.value = 'loading..'
        break
      case 3:
        res.value = 'loading...'
        break
    }
  }, 500)
  // 在挂载后执行异步调用
  try {
    const response = await getGptOutput(props.message)
    clearInterval(loadingInterval)
    res.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// 计算属性来根据 res 的状态动态显示内容
displayContent = computed(() => {
  // if (res.value === 'loading') {
  //   return 'Loading...'
  // } else if (typeof res === 'object' && 'value' in res) {
  //   return res.value
  // } else {
  //   return '' // 其他情况返回空字符串或者其他默认内容
  // }
  // @ts-ignore
  return marked(res.value)
})
</script>

<style scoped lang="scss">
.chat-box {
  width: auto;
  height: auto;
  background-color: rgba($color: #282629, $alpha: 0.5);
  margin: 10px 0 10px 0;
  padding: 10px 10px 5px 20px;
}
</style>
