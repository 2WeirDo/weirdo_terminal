<template>
  <div v-html="displayContent" class="chat-box"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, computed } from 'vue'
import { marked } from 'marked'
import { getBotOutput } from './botApi'

interface ChatBoxProps {
  message: any
}

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  async: false,
  mangle: false, // 这个选项已经被弃用
  headerIds: false // 这个选项已经被弃用
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
  }, 250)
  // 在挂载后执行异步调用
  try {
    const response: any = await getBotOutput(props.message)
    clearInterval(loadingInterval)
    res.value = String(response)
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// 计算属性来根据 res 的状态动态显示内容
displayContent = computed(() => {
  // @ts-ignore
  return marked(res.value)
})
</script>

<style scoped lang="scss">
.chat-box {
  width: 66vw;
  height: auto;
  border-radius: 5px;
  background-color: rgba($color: #282629, $alpha: 0.5);
  margin: 10px 0 10px 0;
  padding: 20px 20px 5px 20px;
}
</style>
