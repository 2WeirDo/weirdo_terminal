import { defineStore } from 'pinia'

/**
 * gpt
 */

export const useGptStore = defineStore('gpt', {
  state: (): any => ({
    // bug
    // ❗这里一定一定不能用record作为数组, 因为好像跟pinia封装的有关, 因为这个搞了很久
    memory: []
  }),
  getters: {},
  persist: {
    key: 'gpt-store',
    storage: window.localStorage,
    beforeRestore: (context) => {},
    afterRestore: (context) => {}
  },
  actions: {
    addRecord(item: string) {
      let { memory } = this.$state
      // bug 不能直接设置数组为[], 最好使用this.$reset()重置数据
      if (memory.length >= 5) this.$reset()
      memory.push(item) // 尝试更新记录
    }
  }
})
