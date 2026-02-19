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

const TOKEN_KEY = 'ADMIN_TOKEN'
const EXPIRES_KEY = 'ADMIN_TOKEN_EXPIRES_AT'
const ACTIVITY_EVENTS = ['click', 'keydown', 'mousemove', 'touchstart']
const ACTIVITY_CHECK_INTERVAL = 1000
let lastActivityCheck = 0

const checkAndHandleExpiry = () => {
  const token = localStorage.getItem(TOKEN_KEY)
  const expiresAt = Number(localStorage.getItem(EXPIRES_KEY) || 0)
  if (token && expiresAt && Date.now() > expiresAt) {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    if (router.currentRoute.value.path !== '/login') {
      router.push('/login')
    }
  }
}

const handleActivity = () => {
  const now = Date.now()
  if (now - lastActivityCheck < ACTIVITY_CHECK_INTERVAL) return
  lastActivityCheck = now
  checkAndHandleExpiry()
}

ACTIVITY_EVENTS.forEach((eventName) => {
  window.addEventListener(eventName, handleActivity, { passive: true, capture: true })
})

checkAndHandleExpiry()
app.mount('#app')
