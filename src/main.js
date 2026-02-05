import { createApp } from 'vue'
import App from './App.vue'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// 引入所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 引入Pinia
import { createPinia } from 'pinia'
// 引入路由
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 挂载全局插件
app.use(ElementPlus)
app.use(pinia)
app.use(router)
app.mount('#app')