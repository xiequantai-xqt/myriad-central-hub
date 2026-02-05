<template>
  <div class="page-container">
    <h3>角色管理页面</h3>
    <!-- 搜索与操作栏 -->
    <el-row :gutter="20" class="search-bar" style="margin: 20px 0">
      <el-col :span="6">
        <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable />
      </el-col>
      <el-col :span="6">
        <el-select v-model="searchForm.status" placeholder="角色状态" clearable style="width: 100%">
          <el-option label="启用" value="1" />
          <el-option label="禁用" value="0" />
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetSearch">重置</el-button>
      </el-col>
      <el-col :span="8" style="text-align: right">
        <el-button type="success" @click="handleAdd">新增角色</el-button>
      </el-col>
    </el-row>

    <!-- 数据表格 -->
    <el-table :data="tableData" style="width: 100%" border stripe>
      <el-table-column prop="id" label="角色ID" align="center" />
      <el-table-column prop="roleName" label="角色名称" align="center" />
      <el-table-column prop="roleCode" label="角色编码" align="center" />
      <el-table-column prop="status" label="状态" align="center">
        <template #default="scope">
          <el-tag :type="scope.row.status === 1 ? 'success' : 'danger'">
            {{ scope.row.status === 1 ? '启用' : '禁用' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" />
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      v-model:current-page="pageInfo.current"
      v-model:page-size="pageInfo.size"
      :total="pageInfo.total"
      layout="total, sizes, prev, pager, next, jumper"
      @size-change="getList"
      @current-change="getList"
      style="margin-top: 20px; text-align: right"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 搜索表单
const searchForm = reactive({
  roleName: '',
  status: ''
})

// 分页信息
const pageInfo = reactive({
  current: 1,
  size: 10,
  total: 50
})

// 模拟表格数据
const tableData = ref([
  { id: 1, roleName: '超级管理员', roleCode: 'SUPER_ADMIN', status: 1, createTime: '2025-01-01 12:00:00' },
  { id: 2, roleName: '普通管理员', roleCode: 'ADMIN', status: 1, createTime: '2025-01-02 10:30:00' },
  { id: 3, roleName: '普通用户', roleCode: 'USER', status: 0, createTime: '2025-01-03 09:20:00' }
])

// 查询数据
const getList = () => {
  ElMessage.success('执行查询操作')
  // 后续对接接口时，在这里调用角色列表接口
}

// 重置搜索条件
const resetSearch = () => {
  searchForm.roleName = ''
  searchForm.status = ''
}

// 新增角色
const handleAdd = () => {
  ElMessage.info('打开新增角色弹窗')
  // 后续可新增el-dialog弹窗实现新增功能
}

// 编辑角色
const handleEdit = (row) => {
  ElMessage.info(`编辑角色：${row.roleName}`)
}

// 删除角色
const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      '此操作将永久删除该角色, 是否继续?',
      '提示',
      { type: 'warning' }
    )
    // 模拟删除逻辑
    tableData.value = tableData.value.filter(item => item.id !== id)
    ElMessage.success('删除成功！')
  } catch (error) {
    ElMessage.info('已取消删除')
  }
}
</script>

<style lang="scss" scoped>
.page-container {
  padding: 20px;
  background: #fff;
  border-radius: 4px;
  min-height: calc(100vh - 180px);
}
.search-bar {
  display: flex;
  align-items: center;
}
</style>