import router from '@/router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 你的接口前缀
  timeout: 10000
})

// 响应拦截器（核心修复：200/201都算成功）
// 请求拦截：检查 token 是否过期
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ADMIN_TOKEN')
    const expiresAt = Number(localStorage.getItem('ADMIN_TOKEN_EXPIRES_AT') || 0)
    if (token && expiresAt && Date.now() > expiresAt) {
      localStorage.removeItem('ADMIN_TOKEN')
      localStorage.removeItem('ADMIN_TOKEN_EXPIRES_AT')
      router.push('/login')
      return Promise.reject(new Error('登录已过期，请重新登录'))
    }
    return config
  },
  (error) => Promise.reject(error)
)

service.interceptors.response.use(
  (response) => {
    // 只要HTTP状态码是2xx，都返回响应数据，不抛错
    if (response.status >= 200 && response.status < 300) {
      return response // 关键：返回完整response，不是只返回data
    }
    return Promise.reject(new Error(response.data?.message || '请求失败'))
  },
  (error) => {
    ElMessage.error(error.message || '网络异常')
    return Promise.reject(error)
  }
)

export default service
