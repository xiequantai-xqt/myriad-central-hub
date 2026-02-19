<template>
  <el-config-provider :locale="zhCn">
    <div class="role-page">
      <div class="ambient"></div>
      <div class="scanlines"></div>

      <section class="hero">
        <div class="hero-bg"></div>
        <div class="hero-content">
          <div class="hero-badge">Access Control</div>
          <h1>角色管理</h1>
          <p class="hero-subtitle">统一管理系统角色、权限与状态。</p>
        </div>
        <div class="hero-actions">
          <el-button type="success" class="btn primary" @click="handleAdd">新增角色</el-button>
        </div>
      </section>

      <section class="panel">
        <div class="panel-title">筛选条件</div>
        <el-row :gutter="16" class="search-bar">
          <el-col :span="6">
            <el-input v-model="searchForm.roleName" placeholder="请输入角色名称" clearable />
          </el-col>
          <el-col :span="6">
            <el-select v-model="searchForm.status" placeholder="角色状态" clearable style="width: 100%" popper-class="role-status-popper">
              <el-option label="启用" value="1" />
              <el-option label="禁用" value="0" />
            </el-select>
          </el-col>
          <el-col :span="8" class="actions">
            <el-button type="primary" class="btn" @click="getList">查询</el-button>
            <el-button class="btn ghost" @click="resetSearch">重置</el-button>
          </el-col>
        </el-row>
      </section>

      <section class="panel table-panel">
        <div class="panel-title">角色列表</div>
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

        <el-pagination
          v-model:current-page="pageInfo.current"
          v-model:page-size="pageInfo.size"
          :total="pageInfo.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="getList"
          @current-change="getList"
          style="margin-top: 20px; text-align: right"
        />
      </section>
    </div>
  </el-config-provider>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const searchForm = reactive({
  roleName: '',
  status: ''
})

const pageInfo = reactive({
  current: 1,
  size: 10,
  total: 50
})

const tableData = ref([
  { id: 1, roleName: '超级管理员', roleCode: 'SUPER_ADMIN', status: 1, createTime: '2025-01-01 12:00:00' },
  { id: 2, roleName: '普通管理员', roleCode: 'ADMIN', status: 1, createTime: '2025-01-02 10:30:00' },
  { id: 3, roleName: '普通用户', roleCode: 'USER', status: 0, createTime: '2025-01-03 09:20:00' }
])

const getList = () => {
  // TODO: replace with real API call
}

const resetSearch = () => {
  searchForm.roleName = ''
  searchForm.status = ''
}

const handleAdd = () => {
  ElMessage.info('打开新增角色弹窗')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑角色：${row.roleName}`)
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm(
      '此操作将永久删除该角色，是否继续？',
      '提示',
      { type: 'warning' }
    )
    tableData.value = tableData.value.filter(item => item.id !== id)
    ElMessage.success('删除成功')
  } catch (error) {
    ElMessage.info('已取消删除')
  }
}
</script>

<style lang="scss" scoped>
.role-page {
  --panel: #111827;
  --panel-2: #0f172a;
  --text: #e6e9ef;
  --muted: #93a1b3;
  --accent: #35f5c4;
  --accent-2: #6a7cff;
  --cyan: #22d3ee;
  position: relative;
  min-height: 100%;
  padding: 28px 28px 46px;
  color: var(--text);
  background:
    radial-gradient(1200px 800px at 10% -10%, rgba(53, 245, 196, 0.12) 0%, transparent 55%),
    radial-gradient(900px 700px at 90% 10%, rgba(106, 124, 255, 0.18) 0%, transparent 55%),
    radial-gradient(700px 500px at 50% 100%, rgba(255, 106, 213, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #0b0f16 0%, #0a0f17 60%, #070a11 100%);
  overflow: hidden;
}

.ambient {
  position: absolute;
  inset: -20% -10% auto -10%;
  height: 60%;
  background:
    conic-gradient(from 180deg at 50% 50%, rgba(53, 245, 196, 0.12), rgba(106, 124, 255, 0.15), rgba(255, 106, 213, 0.08), rgba(53, 245, 196, 0.12));
  filter: blur(60px);
  opacity: 0.7;
  animation: drift 18s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
}

.scanlines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
  background-size: 120px 120px, 120px 120px;
  mix-blend-mode: soft-light;
  opacity: 0.25;
  pointer-events: none;
  z-index: 0;
}

.hero {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 24px 28px;
  border-radius: 16px;
  background:
    linear-gradient(135deg, rgba(53, 245, 196, 0.12), rgba(106, 124, 255, 0.12)),
    radial-gradient(200px 120px at 15% 15%, rgba(255, 255, 255, 0.08), transparent 60%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.45),
    0 0 40px rgba(53, 245, 196, 0.12);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(380px 220px at 20% 10%, rgba(53, 245, 196, 0.18), transparent 60%),
    radial-gradient(520px 320px at 80% 30%, rgba(106, 124, 255, 0.2), transparent 60%),
    radial-gradient(280px 180px at 70% 80%, rgba(255, 106, 213, 0.18), transparent 60%);
  animation: float 12s ease-in-out infinite;
  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

.hero-badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  color: var(--accent);
  background: rgba(53, 245, 196, 0.14);
  border: 1px solid rgba(53, 245, 196, 0.35);
  box-shadow: 0 0 20px rgba(53, 245, 196, 0.25);
}

.hero h1 {
  margin: 12px 0 8px;
  font-size: 28px;
  font-weight: 600;
}

.hero-subtitle {
  margin: 0;
  color: var(--muted);
}

.hero-actions {
  position: relative;
  z-index: 1;
}

.panel {
  position: relative;
  z-index: 1;
  margin-top: 18px;
  background: var(--panel-2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
}

.panel-title {
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--muted);
  margin-bottom: 12px;
}

.panel :deep(.el-input__wrapper),
.panel :deep(.el-select .el-input__wrapper),
.panel :deep(.el-select__wrapper) {
  background: rgba(12, 17, 28, 0.9);
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.12);
  box-shadow: none;
}

.panel :deep(.el-input__inner),
.panel :deep(.el-select__placeholder) {
  color: var(--text);
}

.panel :deep(.el-input__inner::placeholder),
.panel :deep(.el-select__placeholder) {
  color: var(--muted);
}

.panel :deep(.el-input__wrapper.is-focus),
.panel :deep(.el-select .el-input__wrapper.is-focus),
.panel :deep(.el-select__wrapper.is-focus) {
  border-color: rgba(53, 245, 196, 0.45);
  box-shadow: 0 0 0 2px rgba(53, 245, 196, 0.15);
}

.panel :deep(.el-select__popper .el-select-dropdown),
.panel :deep(.el-select__popper .el-select-dropdown__item) {
  background: rgba(12, 17, 28, 0.98);
  color: var(--text);
}

.panel :deep(.el-select__popper .el-select-dropdown__item.is-hovering),
.panel :deep(.el-select__popper .el-select-dropdown__item.is-selected) {
  background: rgba(53, 245, 196, 0.18);
  color: #0b0f14;
}

:global(.role-status-popper .el-select-dropdown),
:global(.role-status-popper .el-select-dropdown__item) {
  background: rgba(12, 17, 28, 0.98);
  color: var(--text);
}

:global(.role-status-popper .el-select-dropdown__item.is-hovering),
:global(.role-status-popper .el-select-dropdown__item.is-selected) {
  background: rgba(53, 245, 196, 0.18);
  color: #0b0f14;
}

:global(.role-status-popper .el-select-dropdown__item) {
  color: #f8fafc;
}

.search-bar {
  align-items: center;
}

.actions {
  display: flex;
  gap: 10px;
}

.btn {
  height: 36px;
  border-radius: 10px;
}

.btn.primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  border: none;
}

.btn.ghost {
  background: transparent;
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.12);
}

.table-panel :deep(.el-table) {
  background: transparent;
}

.table-panel :deep(.el-table th.el-table__cell),
.table-panel :deep(.el-table td.el-table__cell) {
  background: rgba(12, 17, 28, 0.82);
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.08);
}

.table-panel :deep(.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell) {
  background: rgba(15, 23, 42, 0.9);
}

.table-panel :deep(.el-table__row:hover td.el-table__cell) {
  background: rgba(15, 23, 42, 0.95);
  color: var(--text);
}

.table-panel :deep(.el-table--striped .el-table__body tr.el-table__row--striped:hover td.el-table__cell) {
  background: rgba(15, 23, 42, 0.95);
  color: var(--text);
}

.table-panel :deep(.el-table__body-wrapper),
.table-panel :deep(.el-table__header-wrapper) {
  background: transparent;
}

.table-panel :deep(.el-pagination) {
  color: var(--text);
}

.table-panel :deep(.el-pagination__total),
.table-panel :deep(.el-pagination__sizes),
.table-panel :deep(.el-pagination__jump) {
  background: rgba(12, 17, 28, 0.9);
  color: var(--text);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  padding: 4px 10px;
}

.table-panel :deep(.el-pagination__sizes .el-select .el-input__wrapper),
.table-panel :deep(.el-pagination__sizes .el-select__wrapper),
.table-panel :deep(.el-pagination__sizes .el-select .el-input__inner),
.table-panel :deep(.el-pagination__jump .el-input__wrapper),
.table-panel :deep(.el-pagination__jump .el-input__inner) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  color: var(--text) !important;
}

.table-panel :deep(.el-pagination__sizes .el-select__popper .el-select-dropdown),
.table-panel :deep(.el-pagination__sizes .el-select__popper .el-select-dropdown__item) {
  background: rgba(12, 17, 28, 0.98) !important;
  color: var(--text) !important;
}

.table-panel :deep(.el-pagination__sizes .el-select__popper .el-select-dropdown__item.is-hovering),
.table-panel :deep(.el-pagination__sizes .el-select__popper .el-select-dropdown__item.is-selected) {
  background: rgba(53, 245, 196, 0.18) !important;
  color: #0b0f14 !important;
}

.table-panel :deep(.el-pagination .el-pager li),
.table-panel :deep(.el-pagination .btn-prev),
.table-panel :deep(.el-pagination .btn-next),
.table-panel :deep(.el-pagination .el-input__wrapper),
.table-panel :deep(.el-select .el-input__wrapper),
.table-panel :deep(.el-input__wrapper) {
  background: rgba(12, 17, 28, 0.9) !important;
  color: var(--text) !important;
  border-color: rgba(255, 255, 255, 0.12) !important;
}

.table-panel :deep(.el-pagination .el-pager li.is-active) {
  background: rgba(53, 245, 196, 0.2) !important;
  color: #0b0f14 !important;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes drift {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(10px, -20px, 0) rotate(8deg); }
}

@media (max-width: 960px) {
  .hero {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
