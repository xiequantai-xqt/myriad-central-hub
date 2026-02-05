import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/layout/index.vue'

// 静态路由（所有用户都可访问）
export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: '首页', icon: 'HomeFilled' }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: { title: '系统管理', icon: 'Setting' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '用户管理' }
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理' }
      }
    ]
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true }
  },
  // 匹配所有未知路由，重定向到404
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

// 全局路由守卫（权限控制：未登录跳转到登录页）
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ADMIN_TOKEN')
  // 访问登录页：直接放行
  if (to.path === '/login') {
    next()
    return
  }
  // 无token：重定向到登录页
  if (!token) {
    next('/login')
    return
  }
  // 已登录：放行
  next()
})

export default router