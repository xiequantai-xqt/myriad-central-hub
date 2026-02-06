<!-- src/views/register/index.vue -->
<template>
  <!-- 核心修改：替换 v-model="visible" 为 model-value + update 事件 -->
  <el-dialog 
    :model-value="visible" 
    @update:model-value="handleModelUpdate"
    title="注册管理员账号" 
    width="400px"
    class="tech-dialog"
    :close-on-click-modal="false"
  >
    <el-form 
      :model="registerForm" 
      :rules="registerRules" 
      ref="registerRef" 
      label-width="80px"
      class="register-form"
    >
      <el-form-item label="管理员账号" prop="username">
        <el-input 
          v-model="registerForm.username" 
          placeholder="请设置管理员账号"
          clearable
          class="tech-input dialog-input"
          prefix-icon="User"
        />
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input 
          v-model="registerForm.password" 
          type="password" 
          placeholder="请设置登录密码"
          clearable
          show-password
          class="tech-input dialog-input"
          prefix-icon="Lock"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input 
          v-model="registerForm.confirmPassword" 
          type="password" 
          placeholder="请确认登录密码"
          clearable
          show-password
          class="tech-input dialog-input"
          prefix-icon="Lock"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button 
          class="tech-btn cancel-btn"
          @click="handleCancel"
        >
          取 消
        </el-button>
        <el-button 
          type="primary" 
          class="tech-btn submit-btn"
          :loading="isRegisterLoading"
          @click="handleRegister"
        >
          完 成 注 册
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

// 接收父组件传值：控制弹窗显示/隐藏
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

// 向父组件发送事件
const emit = defineEmits(['update:visible', 'registerSuccess'])

const registerRef = ref(null)
const isRegisterLoading = ref(false)

// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

// 注册校验规则
const registerRules = ref({
  username: [
    { required: true, message: '请设置管理员账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度需3-20位', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        // 简单校验账号格式（字母数字组合）
        const reg = /^[a-zA-Z0-9]+$/
        if (!reg.test(value)) {
          callback(new Error('账号仅支持字母和数字'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ],
  password: [
    { required: true, message: '请设置登录密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度需6-20位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认登录密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== registerForm.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
})

// 新增：处理el-dialog的model-value更新事件（弹窗关闭时触发）
const handleModelUpdate = (newValue) => {
  emit('update:visible', newValue)
  // 弹窗关闭时清空表单
  if (!newValue) {
    registerForm.value = {
      username: '',
      password: '',
      confirmPassword: ''
    }
  }
}

// 取消注册（关闭弹窗）
const handleCancel = () => {
  emit('update:visible', false)
  // 清空表单
  registerForm.value = {
    username: '',
    password: '',
    confirmPassword: ''
  }
}

// 注册提交
const handleRegister = async () => {
  if (isRegisterLoading.value) return
  
  try {
    await registerRef.value.validate()
  } catch (err) {
    ElMessage.warning('请完善表单信息')
    return
  }

  try {
    isRegisterLoading.value = true
    // 模拟接口请求（实际项目中替换为真实接口）
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success('账号注册成功，请登录')
    
    // 向父组件发送注册成功事件，并传递注册的账号
    emit('registerSuccess', registerForm.value.username)
    
    // 关闭弹窗+清空表单
    handleCancel()
  } catch (err) {
    ElMessage.error('注册失败：' + (err.message || '账号已存在'))
  } finally {
    isRegisterLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
// 注册弹窗专属样式
.tech-dialog {
  ::v-deep(.el-dialog) {
    background: rgba(18, 18, 18, 0.95);
    border: 1px solid rgba(14, 165, 233, 0.2);
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  }

  ::v-deep(.el-dialog__header) {
    border-bottom: 1px solid rgba(14, 165, 233, 0.1);
    padding-bottom: 12px;

    .el-dialog__title {
      color: #f8f8f8;
      font-size: 16px;
      letter-spacing: 1px;
    }

    .el-dialog__close {
      color: #777;
      &:hover {
        color: #0ea5e9;
      }
    }
  }

  ::v-deep(.el-dialog__body) {
    padding: 20px 20px 10px;
    color: #f8f8f8;
  }

  ::v-deep(.el-dialog__footer) {
    border-top: 1px solid rgba(14, 165, 233, 0.1);
    padding-top: 12px;
  }

  ::v-deep(.el-form-item__label) {
    color: #ddd;
    font-size: 13px;
  }

  ::v-deep(.el-form-item__error) {
    font-size: 11px;
    color: #ef4444;
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .register-form {
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}

// 输入框样式
.tech-input {
  &.dialog-input {
    ::v-deep(.el-input__wrapper) {
      height: 42px;
      background: rgba(26, 26, 26, 0.9);
      border: 1px solid rgba(14, 165, 233, 0.1);
      border-radius: 8px;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
      color: #f8f8f8;
    }

    ::v-deep(.el-input__inner) {
      background: transparent;
      color: #f8f8f8;
      font-size: 13px;
      line-height: 42px;
    }

    ::v-deep(.el-input__prefix) {
      color: #0ea5e9;
      opacity: 0.7;
      margin-right: 8px;
    }

    ::v-deep(.el-input__clear) {
      color: #777;
      &:hover {
        color: #0ea5e9;
      }
    }
  }
}

// 按钮样式
.tech-btn {
  height: 42px;
  font-size: 13px;
  letter-spacing: 2px;
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(14, 165, 233, 0.4);
  border-radius: 8px;
  color: #f8f8f8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 30, 30, 1);
    border-color: #0ea5e9;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(14, 165, 233, 0.15);
    transform: translateY(-1px);
    color: #f8f8f8;
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  &.cancel-btn, &.submit-btn {
    width: 48%;
  }
}
</style>