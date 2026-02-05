<template>
  <el-container style="height: 100%">
    <!-- 侧边栏 -->
    <el-aside width="200px" style="background-color: #2f4050">
      <div class="logo">后台管理系统</div>
      <el-menu
        :default-active="$route.path"
        mode="vertical"
        background-color="#2f4050"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
      >
        <!-- 动态渲染菜单 -->
        <template v-for="route in constantRoutes" :key="route.path">
          <!-- 隐藏路由不渲染 -->
          <template v-if="!route.meta?.hidden">
            <!-- 一级菜单（无子路由） -->
            <el-menu-item v-if="!route.children" :index="route.path">
              <component :is="route.meta.icon" />
              <span>{{ route.meta.title }}</span>
            </el-menu-item>
            <!-- 二级菜单（有子路由） -->
            <el-sub-menu v-else :index="route.path">
              <template #title>
                <component :is="route.meta.icon" />
                <span>{{ route.meta.title }}</span>
              </template>
              <el-menu-item
                v-for="child in route.children"
                :key="child.path"
                :index="route.path + '/' + child.path"
              >
                <span>{{ child.meta.title }}</span>
              </el-menu-item>
            </el-sub-menu>
          </template>
        </template>
      </el-menu>
    </el-aside>

    <el-container>
      <!-- 顶部导航 -->
      <el-header style="text-align: right; font-size: 12px; background: #fff; border-bottom: 1px solid #e6e6e6">
        <el-dropdown>
          <span class="user-info">
            {{ userStore.userInfo.nickname || '管理员' }}
            <el-icon class="el-icon--right"><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="toLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <!-- 主内容区 -->
      <el-main style="background: #f3f3f4">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
import { constantRoutes } from '@/router'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ArrowDown } from '@element-plus/icons-vue'

const userStore = useUserStore()
const router = useRouter()

// 退出登录
const toLogout = () => {
  userStore.logout()
  ElMessage.success('退出成功')
  router.push('/login')
}

// 进入页面获取用户信息
userStore.getUserInfo().catch(() => {})
</script>

<style lang="scss" scoped>
.logo {
  height: 60px;
  line-height: 60px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}
.user-info {
  cursor: pointer;
  line-height: 60px;
}
.el-header {
  padding: 0 20px;
}
</style>