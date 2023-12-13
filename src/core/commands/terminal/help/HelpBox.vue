<template>
  <div>
    <div>😈😈 使用 [help 命令英文名] 可以查询某命令的具体用法, 如: help search</div>
    <div>命令列表：</div>
    <div v-for="(command, index) in commandList" :key="index">
      <a-row :gutter="20">
        <a-col :span="4">{{ command.func }}</a-col>
        <a-col :span="5">{{ command.name }}</a-col>
        <a-col>{{ command.desc }}</a-col>
      </a-row>
    </div>
    <br>
    <p>输入过程中会出现命令提示, 按下 Tab 键可以进行命令补全, 按下回车即可触发命令哦 ~~ (如果输入框被遮挡, 触发'clear'命令或者按下'ctrl + L'快捷键即可清屏)</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { commandList } from '../../../commandRegister'
onMounted(() => {})
</script>

<style scoped lang="scss"></style>
