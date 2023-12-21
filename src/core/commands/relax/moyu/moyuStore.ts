import { defineStore } from 'pinia'

export const useMoyuStore = defineStore('moyuConfig', {
  state: () => ({
    preGame: '',
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'moyu-config-store', // Key 用于引用 storage 中的数据
    storage: window.localStorage, // 将数据持久化到的 storage 中
  },
  actions: {
    setPreGame(url: string) {
      if (!url) return
      this.preGame = url
    },
  }
})
