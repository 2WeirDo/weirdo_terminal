<!-- 就是一个组件, 根据你的输入进行输出 -->
<template>
  <div class="content-output">
    <!-- 如果是文本类型 -->
    <template v-if="output.type === 'text'">
      <a-tag v-if="outputTagColor" :color="outputTagColor">{{ output.status }} </a-tag>
      <!-- smartText 用于将 url 变得可以点击(就是换成a标签) -->
      <!-- 这里暂时不需要了, 避免引起冲突 -->
      <span v-if="output.type === 'text'" v-html="output.text" />
    </template>
    <!-- 如果是组件类型 -->
    <!-- 通过动态组件实现根据输入命令按需加载需要的组件 -->
    <!-- 比如输入 todo, 出来一个todo组件 -->
    <template v-if="output.type === 'component'">
      <a-tag v-if="outputTagColor" :color="outputTagColor">{{ output.status }} </a-tag>
      <component :is="output.component.component" v-bind="output.component.props ?? {}" />
    </template>
  </div>
</template>

<script setup lang="ts">
// import transferText from '../../utils/transferText'
import OutputType = WeirdoTerminal.OutputType
import { computed, toRefs } from 'vue'

interface OutputProps {
  output: OutputType
}

const props = defineProps<OutputProps>()
const { output } = toRefs(props) // 注意要响应式地拿到
// console.log('output:', output)
/**
    status: "success"
    text: "登录成功"
    type: "text"
   */
// 根据输出信息的状态返回响应的输出颜色
const outputTagColor = computed((): string => {
  if (!output.value.status) {
    return ''
  }
  switch (output.value.status) {
    case 'info':
      return 'dodgerblue'
    case 'success':
      return 'limegreen'
    case 'warning':
      return 'darkorange'
    case 'error':
      return '#c0300f'
    // return "#be8909"
    case 'system':
      return '#bfc4c9'
    default:
      return ''
  }
})
</script>

<style scoped lang="scss">
.content-output :deep(.ant-tag) {
  border-radius: 0;
  font-size: 16px;
  border: none;
}
</style>
