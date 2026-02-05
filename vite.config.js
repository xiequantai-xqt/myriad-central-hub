import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 路径别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // 开发服务器配置
  server: {
    port: 5173,        // 启动端口
    open: true,        // 自动打开浏览器
    cors: true,        // 允许跨域
    // 接口代理配置（解决前端跨域问题）
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // 后端接口地址
        changeOrigin: true,             // 开启跨域
        rewrite: (path) => path.replace(/^\/api/, '') // 路径重写
      }
    }
  }
})