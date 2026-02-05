<template>
  <div class="page-container">
    <h3>用户管理页面</h3>
    <el-table :data="tableData" style="width: 100%; margin-top: 20px">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="name" label="姓名" />
      <el-table-column prop="role" label="角色" />
    </el-table>
  </div>
</template>

<script setup>
const tableData = [
  { id: 1, name: '张三', role: '管理员' },
  { id: 2, name: '李四', role: '普通用户' }
]
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
}
</style>