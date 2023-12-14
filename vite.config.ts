import { fileURLToPath, URL } from 'node:url'

import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// 进行 gzip 压缩
import compression from 'vite-plugin-compression'

// import { visualizer } from 'rollup-plugin-visualizer'

// 配置 CDN
import { autoComplete, Plugin as importToCDN } from "vite-plugin-cdn-import";


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
      compressionOptions: { level: 9 }, // 指定gzip压缩级别，默认为9（最高级别）
    }),
    importToCDN({
      prodUrl: 'https://unpkg.com/{name}@{path}',
      modules: [
        // autoComplete('vue'), 
        autoComplete('axios'),
        {
          name: 'ant-design-vue',
          var: 'AntDesignVue',
          path: '3.2.10',
          css: '3.2.10/dist/antd.min.css'
        },
        {
          name: 'vue',
          var: 'Vue',
          path: '3.3.4',
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: '4.2.5'
        },
        {
          name: 'pinia',
          var: 'Pinia',
          path: '2.1.7'
        }
      ]
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
