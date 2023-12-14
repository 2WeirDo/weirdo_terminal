import { defineStore } from 'pinia'

/**
 * gpt
 */

export const useBotStore = defineStore('bot', {
  state: (): any => ({
    memory: []
  }),
  getters: {},
  persist: {
    key: 'bot-store',
    storage: window.localStorage,
    beforeRestore: (context) => {},
    afterRestore: (context) => {}
  },
  actions: {
    addRecord(item: any) {
      let { memory } = this.$state
      if (memory.length >= 30) this.$reset()
      memory.push(item)
    }
  }
})
