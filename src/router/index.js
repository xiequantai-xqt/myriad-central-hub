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
  { path: '/:pathMatch(.*)*', redirect: '/404', meta: { hidden: true } }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('ADMIN_TOKEN')
  const expiresAt = Number(localStorage.getItem('ADMIN_TOKEN_EXPIRES_AT') || 0)
  const isExpired = token && expiresAt && Date.now() > expiresAt

  if (isExpired) {
    localStorage.removeItem('ADMIN_TOKEN')
    localStorage.removeItem('ADMIN_TOKEN_EXPIRES_AT')
  }

  // Block returning to login when already authenticated
  if (to.path === '/login' && token && !isExpired) {
    next('/dashboard')
    return
  }

  // Allow login route for unauthenticated users
  if (to.path === '/login') {
    next()
    return
  }

  // Require auth for all other routes
  if (!token || isExpired) {
    next('/login')
    return
  }

  next()
})

export default router
