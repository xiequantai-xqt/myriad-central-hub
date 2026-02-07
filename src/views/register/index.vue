<template>
  <el-dialog 
    v-model="dialogVisible" 
    title="注册管理员账号" 
    width="400px"
    class="admin-register-dialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <el-form 
      :model="registerForm" 
      :rules="registerRules" 
      ref="registerFormRef" 
      label-width="80px"
      autocomplete="off"
    >
      <el-form-item label="管理员账号" prop="username">
        <el-input 
          v-model="registerForm.username" 
          placeholder="请设置3-20位字母数字组合的账号"
          clearable
          prefix-icon="User"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input 
          v-model="registerForm.email" 
          placeholder="请输入邮箱"
          clearable
          prefix-icon="Message"
          maxlength="50"
        />
      </el-form-item>
      <el-form-item label="登录密码" prop="password">
        <el-input 
          v-model="registerForm.password" 
          type="password" 
          placeholder="请设置6-20位含字母+数字+特殊字符的密码"
          clearable
          show-password
          prefix-icon="Lock"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input 
          v-model="registerForm.confirmPassword" 
          type="password" 
          placeholder="请再次输入登录密码"
          clearable
          show-password
          prefix-icon="Lock"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button 
          @click="dialogVisible = false; resetForm()"
          :disabled="isLoading"
        >
          鍙?娑?        </el-button>
        <el-button 
          type="primary" 
          :loading="isLoading"
          @click="submitRegister"
        >
          瀹?鎴?娉?鍐?        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { userRegister } from '@/api/user.js'

// 1. 弹窗状态（独立控制）
const dialogVisible = ref(false)
// 接收父组件传值
const props = defineProps({
  visible: { type: Boolean, default: false }
})
const emit = defineEmits(['update:visible', 'register-success'])
// 同步父组件的 visible 值
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
}, { immediate: true })

// 2. 表单核心逻辑
const registerFormRef = ref(null)
const isLoading = ref(false)
const registerForm = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// 3. 表单校验规则
const registerRules = ref({
  username: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]{3,20}$/, message: '账号仅支持 3-20 位字母数字', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,20}$/, message: '密码需含字母+数字+特殊字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value && value !== registerForm.value.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

// 4. 閲嶇疆琛ㄥ崟
const resetForm = () => {
  registerForm.value = { username: '', email: '', password: '', confirmPassword: '' }
  if (registerFormRef.value) {
    registerFormRef.value.resetFields()
  }
  emit('update:visible', false)
}
// 5. 注册提交
const submitRegister = async () => {
  if (isLoading.value) return

  try {
    await registerFormRef.value.validate()
  } catch (error) {
    ElMessage.warning('请完善并正确填写表单信息')
    return
  }

  try {
    await ElMessageBox.confirm(
      '确认要注册该管理员账号吗？',
      '注册确认',
      {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
  } catch (error) {
    ElMessage.info('已取消注册')
    return
  }

  isLoading.value = true
  try {
    const res = await userRegister({
      username: registerForm.value.username,
      email: registerForm.value.email,
      password: registerForm.value.password
    })

    ElMessage.closeAll()
    ElMessage.success(res.data?.message || '注册成功')
    dialogVisible.value = false
    resetForm()
    emit('register-success', registerForm.value.username)
  } catch (error) {
    ElMessage.closeAll()
    const errMsg = error.response?.data?.message || '注册失败，请稍后重试'
    ElMessage.error(errMsg)
  } finally {
    isLoading.value = false
  }
}
</script>

<!-- 淇鎵€鏈塖ass璇硶閿欒锛氱‘淇濆ぇ鎷彿闂悎銆佸祵濂楀悎瑙?-->
<style lang="scss" scoped>
.admin-register-dialog {
  ::v-deep .el-dialog {
    background: rgba(18, 18, 18, 0.95);
    border: 1px solid rgba(14, 165, 233, 0.2);
    border-radius: 12px;
  }

  ::v-deep .el-dialog__header {
    border-bottom: 1px solid rgba(14, 165, 233, 0.1);
    padding: 16px 20px;

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

  ::v-deep .el-dialog__body {
    padding: 20px 20px 10px;
    color: #f8f8f8;
  }

  ::v-deep .el-dialog__footer {
    border-top: 1px solid rgba(14, 165, 233, 0.1);
    padding: 12px 20px;
  }

  // 表单项样式
  ::v-deep .el-form-item {
    margin-bottom: 18px;

    .el-form-item__label {
      color: #ddd;
      font-size: 13px;
    }

    .el-form-item__error {
      font-size: 11px;
      color: #ef4444;
      margin-top: 4px;
    }
  }

  // 输入框样式
  ::v-deep .el-input__wrapper {
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(14, 165, 233, 0.1);
    color: #f8f8f8;
    height: 42px;
    border-radius: 8px;
    padding: 0 12px;

    &:hover {
      border-color: rgba(14, 165, 233, 0.3);
    }

    &:focus-within {
      border-color: #0ea5e9;
      box-shadow: 0 0 0 2px rgba(14, 165, 233, 0.2);
    }
  }

  ::v-deep .el-input__inner {
    background: transparent;
    color: #f8f8f8;
    font-size: 13px;
    line-height: 42px;
    padding: 0;
  }

  ::v-deep .el-input__prefix {
    color: #0ea5e9;
    opacity: 0.7;
    margin-right: 8px;
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .el-button {
      width: 48%;
      height: 42px;
      letter-spacing: 2px;
      border-radius: 8px;
      background: rgba(26, 26, 26, 0.95);
      border: 1px solid rgba(14, 165, 233, 0.4);
      color: #f8f8f8;
      transition: all 0.3s ease;

      &:hover {
        background: rgba(30, 30, 30, 1);
        border-color: #0ea5e9;
        color: #f8f8f8;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(0);
      }

      &.el-button--primary {
        background: rgba(14, 165, 233, 0.1);
        border-color: #0ea5e9;
      }

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        transform: none;
      }
    }
  }
}
</style>









