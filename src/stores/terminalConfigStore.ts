import { defineStore } from 'pinia'

/**
 * 终端配置状态存储
 *
 * @author weirdo
 */
export const useTerminalConfigStore = defineStore('terminalConfig', {
  state: () => ({
    backColor: 'black', // 背景颜色
    background: 'black', // 背景图像
    showHint: true, // 输入提示
    welcomeTexts: [] as string[], // 终端欢迎语
    theme: 'hue-rotate(0deg)'
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'terminal-config-store', // Key 用于引用 storage 中的数据
    storage: window.localStorage, // 将数据持久化到的 storage 中
    beforeRestore: (context) => {
      //将在从 storage 中恢复数据之前触发
      // console.log('load terminalConfigStore data start')
    },
    afterRestore: (context) => {
      // 将在从 storage 中恢复数据之后触发
      // console.log('load terminalConfigStore data end')
    }
  },
  actions: {
    setBackColor(url: string) {
      if (!url) return
      this.backColor = url
    },
    setBackground(url: string) {
      if (!url) return
      this.background = url
    },
    setTheme(url: string) {
      if (!url) return
      this.theme = url
    },
    /**
     * 设置或反转提示
     * @param hint
     * @return 修改后的提示开启 / 关闭状态
     */
    setOrToggleShowHint(hint?: string): boolean {
      // 如果不传参数 : 即终端输入了hint 后没有输入 on 或者 off, 则自动反转提示
      if (!hint) {
        this.showHint = !this.showHint
        return this.showHint
      }
      // 设置提示
      if (hint === 'on') {
        this.showHint = true
      } else if (hint === 'off') {
        this.showHint = false
      }
      return this.showHint
    },
    /**
     * 修改终端提示语
     * @param welcomeTexts
     */
    setWelcomeTexts(welcomeTexts: string[]) {
      this.welcomeTexts = welcomeTexts
    },
    reset() {
      // pinia提供的$reset方法, 直接还原到最开始的位置
      this.$reset()
    }
  }
})
