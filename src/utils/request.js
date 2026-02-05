import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // 接口基础路径
  timeout: 5000 // 请求超时时间
})

// 请求拦截器：统一携带token
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('ADMIN_TOKEN')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器：统一处理返回结果和错误
service.interceptors.response.use(
  (response) => {
    const res = response.data
    // 后端自定义状态码判断（根据实际接口规范调整）
    if (res.code !== 200) {
      ElMessage.error(res.message || '系统异常')
      // token过期/未授权：清除本地存储，跳转到登录页
      if (res.code === 401) {
        localStorage.removeItem('ADMIN_TOKEN')
        router.push('/login')
      }
      return Promise.reject(res)
    }
    return res
  },
  (error) => {
    ElMessage.error(error.message || '网络请求失败')
    return Promise.reject(error)
  }
)

export default service