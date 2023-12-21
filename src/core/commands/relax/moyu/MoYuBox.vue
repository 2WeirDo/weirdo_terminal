<template>
  <div style="margin: 8px 0">
    <iframe :src="currentGame" class="main" frameborder="no" marginwidth="0" marginheight="0" />
  </div>
</template>

<script setup lang="ts">
import { useMoyuStore } from './moyuStore'
const gameList = [
  'https://haiyong.site/moyu/shitoujiandaobu/',
  'https://haiyong.site/moyu/lion.html',
  'https://haiyong.site/moyu/shengchengshu.html',
  'https://haiyong.site/moyu/zhipaijiyi.html',
  'https://haiyong.site/moyu/doumao.html',
  'https://haiyong.site/moyu/laganziguoguan/',
  'https://haiyong.site/moyu/danzhu.html',
  'https://haiyong.site/moyu/feiji.html',
  'https://haiyong.site/moyu/tiaofangzi.html',
  'https://haiyong.site/moyu/SpaceHuggers/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/wzq-2/',
  'https://haiyong.site/moyu/2048/',
  'https://haiyong.site/moyu/taiqiu/',

]
let moyuStore = useMoyuStore()
interface MoyuBoxProps {
  back: boolean
}
let props = defineProps<MoyuBoxProps>()
let currentGame: any
if (props.back) {
  currentGame = moyuStore.preGame
} else {
  currentGame = gameList[Math.floor(Math.random() * gameList.length)]
  moyuStore.setPreGame(currentGame)
}

</script>

<style scoped lang="scss">
.main {
  width: 80%;
  height: 60vh;
  min-height: 600px;
}
</style>
