<template>
  <div v-html="displayContent" class="chat-box"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, computed } from 'vue'
import { getGptOutput } from './gptApi'

interface ChatBoxProps {
  message: string
}

let props = defineProps<ChatBoxProps>()

// 创建的对象只是浅层响应式的，不会对其值的内部结构进行深层次的响应式追踪
const res = shallowRef<string | { value: string }>('loading') // 初始设置为 'loading'
let displayContent = shallowRef<string | { value: string }>('loading') // 初始设置为 'loading'

onMounted(async () => {
  // 在挂载后执行异步调用
  try {
    const response = await getGptOutput(props.message)
    res.value = response
  } catch (error) {
    console.error('Error fetching data:', error)
  }
})

// 计算属性来根据 res 的状态动态显示内容
displayContent = computed(() => {
  if (res.value === 'loading') {
    return 'Loading...'
  } else if (typeof res === 'object' && 'value' in res) {
    return res.value
  } else {
    return '' // 其他情况返回空字符串或者其他默认内容
  }
})
</script>

<style scoped lang="scss">
.chat-box {
  width: auto;
  height: auto;
  background-color: rgba($color: #383736, $alpha: 0.4);
  margin: 10px 0 10px 0;
  padding: 10px 10px 5px 20px;
}
</style>
