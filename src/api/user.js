// src/api/user.js
import service from '@/utils/request'

// 接口请求超时时间（统一管理）
const REQUEST_TIMEOUT = 10000

/**
 * 管理员注册接口
 * @param {Object} data 注册参数 { username: 账号, password: 密码 }
 * @returns {Promise} 请求Promise对象
 */
export const userRegister = (data) => {
  return service({
    url: '/auth/register', // 仅需修改这里的后端接口路径！
    method: 'post',
    data,
    timeout: REQUEST_TIMEOUT
  })
}

/**
 * 管理员登录接口（可选，统一封装）
 * @param {Object} data 登录参数 { username: 账号, password: 密码 }
 * @returns {Promise}
 */
export const userLogin = (data) => {
  return service({
    url: '/auth/login',
    method: 'post',
    data,
    timeout: REQUEST_TIMEOUT
  })
}