import { fileURLToPath, URL } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 进行 gzip 压缩
import compression from 'vite-plugin-compression'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    }),
    compression({
      algorithm: 'gzip', // 压缩算法，可选['gzip'，'brotliCompress'，'deflate'，'deflateRaw']
      threshold: 10240, // 如果体积大于10kb阈值，则进行压缩，参数单位为b
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/base.scss";`
      }
    }
  },
  // bug: 前端无法识别process.env, 添加以下define
  define: {
    'process.env': process.env
  }
})
