import { defineStore } from 'pinia'
import request from '@/utils/request'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('ADMIN_TOKEN') || '',
    userInfo: {}
  }),
  actions: {
    // 登录接口
    async login(loginForm) {
      const res = await request({
        url: '/login',
        method: 'post',
        data: loginForm
      })
      // 存储token到本地存储和状态
      this.token = res.data.token
      localStorage.setItem('ADMIN_TOKEN', res.data.token)
      localStorage.setItem(
        'ADMIN_TOKEN_EXPIRES_AT',
        String(Date.now() + 12 * 60 * 60 * 1000)
      )
      return res
    },
    // 获取用户信息
    async getUserInfo() {
      const res = await request({
        url: '/user/info',
        method: 'get'
      })
      this.userInfo = res.data
      return res
    },
    // 登出
    logout() {
      this.token = ''
      this.userInfo = {}
      localStorage.removeItem('ADMIN_TOKEN')
      localStorage.removeItem('ADMIN_TOKEN_EXPIRES_AT')
      localStorage.removeItem('ADMIN_USERNAME')
    }
  }
})
