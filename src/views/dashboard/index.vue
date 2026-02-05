<template>
  <div class="dashboard-container">
    <h2>欢迎使用后台管理系统</h2>
    <el-card style="margin-top: 20px">
      <template #header>
        <span>系统概览</span>
      </template>
      <p>当前用户：{{ userStore.userInfo.nickname || '管理员' }}</p>
      <p>当前路由：{{ $route.path }}</p>
    </el-card>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'
const userStore = useUserStore()
</script>

<style lang="scss" scoped>
.dashboard-container {
  padding: 20px;
}
</style>