import { defineStore } from 'pinia'
import { getLoginUser } from '../core/commands/user/userApi'
import { LOCAL_USER } from '../core/commands/user/userConstant'
import UserType = User.UserType

/**
 * 用户系统
 */
export const useUserStore = defineStore('user', {
  state: () => ({
    loginUser: {
      // 当前登录用户
      ...LOCAL_USER
    }
  }),
  getters: {},
  // 持久化
  persist: {
    key: 'user-store',
    storage: window.localStorage,
    beforeRestore: (context) => {},
    afterRestore: (context) => {}
  },
  actions: {
    async getAndSetLoginUser() {
      const res: any = await getLoginUser() // 获取当前登录用户
      if (res?.code === 0 && res.data) {
        this.loginUser = res.data
      } else {
        console.warn('未登录或登录失败')
        this.$reset()
      }
    },
    setLoginUser(user: UserType) {
      this.loginUser = user
    }
  }
})
