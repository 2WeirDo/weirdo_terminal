<template>
  <div style="margin: 8px 0">
    <canvas ref="canvasRef" class="charVideoCanvas" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
// @ts-ignore
import CharVideo from './charVideo'
import ikun from './ikun.mp4'

// 从指定的URL获取视频文件的二进制数据（Blob对象）
const getBlob = () => {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', ikun, true)
    xhr.responseType = 'blob'     // ❗接收二进制文件
    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(xhr.response)
      }
    }
    xhr.send()
  })
}

const canvasRef = ref()

onMounted(async () => {
  const blob = await getBlob()
  if (blob) {
    new CharVideo({
      canvasElement: canvasRef.value
    }).playFile(blob)
  }
})
</script>

<style scoped>
.main {
  width: 100%;
  height: 80vh;
  min-height: 600px;
}
</style>
