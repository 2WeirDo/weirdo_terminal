import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router'

const app = createApp(App)
app.config.warnHandler = (msg, vm, trace) => {
  // 如果警告信息包含特定内容，你可以在此处判断并忽略该警告
  if (msg.includes('Vue received a Component which was made a reactive object')) {
    return
  }
  // 对于其他警告，可以按照需要进行处理
  console.warn(msg, vm, trace)
}

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
