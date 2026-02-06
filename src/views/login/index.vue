<!-- src/views/login/index.vue -->
<template>
  <div class="login-container">
    <!-- 1. 科技黑底层（带拉丝纹理） -->
    <div class="bg-base"></div>
    <!-- 2. 冷调网格扫描层（科技核心动效） -->
    <div class="bg-grid-scan"></div>
    <!-- 3. 极简细网格层 -->
    <div class="bg-grid"></div>

    <!-- 登录面板（哑光黑玻璃拟态） -->
    <div class="login-box">
      <!-- 顶部冷光装饰条 -->
      <div class="box-highlight"></div>
      <!-- 极简logo/标题区 -->
      <div class="login-logo">
        <div class="logo-icon"></div>
        <h2 class="login-title">核心管理系统</h2>
        <p class="login-desc">ENTERPRISE CORE SYSTEM v3.0</p>
      </div>
      <!-- 表单区域（极简布局） -->
      <el-form 
        :model="loginForm" 
        :rules="loginRules" 
        ref="loginRef" 
        label-width="0"
        class="login-form"
      >
        <el-form-item prop="username" class="form-item">
          <el-input 
            v-model="loginForm.username" 
            placeholder="请输入管理员账号"
            @keyup.enter="focusPasswordInput"
            clearable
            class="tech-input"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item prop="password" class="form-item">
          <el-input 
            v-model="loginForm.password" 
            type="password" 
            placeholder="请输入登录密码"
            @keyup.enter="handleLogin"
            clearable
            show-password
            class="tech-input"
            ref="passwordInput"
            prefix-icon="Lock"
          />
        </el-form-item>
        <!-- 忘记密码/注册 链接 -->
        <div class="login-link-group">
          <span class="link forget-link" @click="showForgetDialog = true">忘记密码？</span>
          <span class="link register-link" @click="showRegisterDialog = true">注册账号</span>
        </div>
        <el-form-item class="login-btn-item">
          <el-button 
            type="primary" 
            @click="handleLogin" 
            style="width: 100%"
            :loading="isLoginLoading"
            class="tech-btn"
          >
            登 录
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 底部极简版权（动态年份） -->
      <div class="login-footer">
        <span>© {{ currentYear }} CoreTech · All Rights Reserved</span>
      </div>
    </div>

    <!-- 忘记密码弹窗（保留） -->
    <el-dialog 
      v-model="showForgetDialog" 
      title="找回登录密码" 
      width="400px"
      class="tech-dialog"
      :close-on-click-modal="false"
    >
      <el-form 
        :model="forgetForm" 
        :rules="forgetRules" 
        ref="forgetRef" 
        label-width="80px"
        class="forget-form"
      >
        <el-form-item label="管理员账号" prop="username">
          <el-input 
            v-model="forgetForm.username" 
            placeholder="请输入注册账号"
            clearable
            class="tech-input dialog-input"
            prefix-icon="User"
          />
        </el-form-item>
        <el-form-item label="验证码" prop="code">
          <el-input 
            v-model="forgetForm.code" 
            placeholder="请输入验证码"
            clearable
            class="tech-input dialog-input"
            prefix-icon="Message"
            style="width: 65%; display: inline-block"
          />
          <el-button 
            type="primary" 
            class="tech-btn code-btn"
            :loading="isCodeLoading"
            @click="getVerifyCode"
            style="width: 32%; display: inline-block; margin-left: 3%"
          >
            {{ codeText }}
          </el-button>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="forgetForm.newPassword" 
            type="password" 
            placeholder="请输入新密码"
            clearable
            show-password
            class="tech-input dialog-input"
            prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="forgetForm.confirmPassword" 
            type="password" 
            placeholder="请确认新密码"
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
            @click="showForgetDialog = false"
          >
            取 消
          </el-button>
          <el-button 
            type="primary" 
            class="tech-btn submit-btn"
            :loading="isForgetLoading"
            @click="handleForgetPassword"
          >
            确 认 修 改
          </el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 引入register目录下的index.vue组件（核心修改：路径调整） -->
    <Register 
      v-model:visible="showRegisterDialog"
      @registerSuccess="handleRegisterSuccess"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
// 核心修改：引入views/register/index.vue组件
import Register from '@/views/register/index.vue'
// 核心新增：引入userLogin接口函数
import { userLogin } from '@/api/user.js'

const router = useRouter()
const userStore = useUserStore()
const loginRef = ref(null)
const forgetRef = ref(null)
const isLoginLoading = ref(false)
const passwordInput = ref(null)

// 动态年份
const currentYear = new Date().getFullYear()

// 登录表单
const loginForm = ref({
  username: 'testUser',
  password: '7kbCbdlb!XtNBI&'
})

// 登录校验规则
const loginRules = ref({
  username: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度需3-20位', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入登录密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度需6-20位', trigger: 'blur' }
  ]
})

// 忘记密码相关（保留）
const showForgetDialog = ref(false)
const isForgetLoading = ref(false)
const isCodeLoading = ref(false)
const codeText = ref('获取验证码')
const forgetForm = ref({
  username: '',
  code: '',
  newPassword: '',
  confirmPassword: ''
})
const forgetRules = ref({
  username: [
    { required: true, message: '请输入管理员账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度需3-20位', trigger: 'blur' }
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码长度为6位', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度需6-20位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { 
      validator: (rule, value, callback) => {
        if (value !== forgetForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      }, 
      trigger: 'blur' 
    }
  ]
})

// 注册弹窗控制（仅保留显示/隐藏变量）
const showRegisterDialog = ref(false)

// 聚焦密码框
const focusPasswordInput = () => {
  passwordInput.value?.focus()
}

// 核心修改：登录逻辑（替换为调用userLogin接口）
const handleLogin = async () => {
  if (isLoginLoading.value) return
  
  // 表单验证
  try {
    await loginRef.value.validate()
  } catch (err) {
    ElMessage.warning('请完善登录信息')
    return
  }

  try {
    isLoginLoading.value = true
    // 调用真实的登录接口
    const response = await userLogin(loginForm.value)
    
    // 接口调用成功后的处理（根据实际接口返回调整）
    // 示例：将用户信息/Token存入store
    if (response && response.data) {
      // 假设store中有存储token和用户信息的方法，根据实际情况调整
      // userStore.setToken(response.data.token)
      // userStore.setUserInfo(response.data.user)
      
      ElMessage.success('登录成功，进入核心系统...')
      setTimeout(() => router.push('/'), 1200)
    }
  } catch (err) {
    // 错误处理（适配axios接口错误格式）
    const errorMsg = err.response?.data?.message || err.message || '账号或密码错误'
    ElMessage.error('登录失败：' + errorMsg)
  } finally {
    isLoginLoading.value = false
  }
}

// 忘记密码验证码
const getVerifyCode = async () => {
  if (!forgetForm.value.username) {
    ElMessage.warning('请先输入管理员账号')
    return
  }
  if (isCodeLoading.value) return
  
  try {
    await forgetRef.value.validateField('username')
  } catch (err) {
    return
  }

  isCodeLoading.value = true
  codeText.value = '发送中...'
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('验证码已发送，有效期5分钟')
    let count = 60
    codeText.value = `${count}s后重新获取`
    const timer = setInterval(() => {
      count--
      codeText.value = `${count}s后重新获取`
      if (count <= 0) {
        clearInterval(timer)
        codeText.value = '获取验证码'
        isCodeLoading.value = false
      }
    }, 1000)
  } catch (err) {
    ElMessage.error('获取验证码失败：' + err.message)
    codeText.value = '获取验证码'
    isCodeLoading.value = false
  }
}

// 忘记密码提交
const handleForgetPassword = async () => {
  if (isForgetLoading.value) return
  
  try {
    await forgetRef.value.validate()
  } catch (err) {
    ElMessage.warning('请完善表单信息')
    return
  }

  try {
    isForgetLoading.value = true
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success('密码修改成功，请重新登录')
    showForgetDialog.value = false
    forgetForm.value = {
      username: '',
      code: '',
      newPassword: '',
      confirmPassword: ''
    }
  } catch (err) {
    ElMessage.error('密码修改失败：' + (err.message || '系统异常'))
  } finally {
    isForgetLoading.value = false
  }
}

// 接收注册组件的成功事件（自动填充账号到登录框）
const handleRegisterSuccess = (username) => {
  loginForm.value.username = username
}

// 生命周期
onMounted(() => {
  passwordInput.value && passwordInput.value.focus()
})
</script>

<style lang="scss" scoped>
// 仅保留登录页和忘记密码的样式
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  margin: 0;
  padding: 0 20px;
  background: #0a0a0a;
}

.bg-base {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 50% 50%, #121212 0%, #0a0a0a 100%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a1a1a' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 1;
}

.bg-grid-scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.03) 50%, transparent 100%);
  background-size: 200% 100%;
  animation: grid-scan 15s linear infinite;
  z-index: 2;
  pointer-events: none;
}

.bg-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(14, 165, 233, 0.02) 1px, transparent 1px),
    linear-gradient(90deg, rgba(14, 165, 233, 0.02) 1px, transparent 1px);
  background-size: 80px 80px;
  z-index: 3;
  pointer-events: none;
}

.login-box {
  width: 400px;
  padding: 45px 40px;
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 16px;
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.4),
    0 2px 10px rgba(14, 165, 233, 0.05);
  position: relative;
  z-index: 10;
  box-sizing: border-box;
}

.box-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent 0%, #0ea5e9 50%, transparent 100%);
  border-radius: 16px 16px 0 0;
  opacity: 0.8;
}

.login-logo {
  text-align: center;
  margin-bottom: 30px;

  .logo-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 15px;
    border: 1px solid rgba(14, 165, 233, 0.6);
    border-radius: 12px;
    background: rgba(14, 165, 233, 0.05);
    display: flex;
    align-items: center;
    justify-content: center;
    &::after {
      content: '';
      width: 20px;
      height: 20px;
      background: #0ea5e9;
      border-radius: 4px;
      opacity: 0.8;
    }
  }

  .login-title {
    color: #f8f8f8;
    font-size: 22px;
    font-weight: 500;
    letter-spacing: 1px;
    margin: 0 0 8px 0;
  }

  .login-desc {
    color: #888;
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.7;
  }
}

.login-form {
  .form-item {
    margin-bottom: 20px;
  }

  .login-link-group {
    display: flex;
    justify-content: space-between;
    margin: -10px 0 20px 0;
    font-size: 12px;

    .link {
      color: #0ea5e9;
      opacity: 0.8;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        opacity: 1;
        text-shadow: 0 0 8px rgba(14, 165, 233, 0.3);
      }
    }
  }

  .el-form-item__error {
    color: #ef4444;
    font-size: 12px;
  }
}

.tech-input {
  ::v-deep(.el-input__wrapper) {
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(14, 165, 233, 0.1);
    border-radius: 8px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    color: #f8f8f8;
    transition: all 0.3s ease;
    padding: 0 12px;
    height: 48px;

    &:focus-within {
      border-color: #0ea5e9;
      box-shadow: 
        0 0 8px rgba(14, 165, 233, 0.2),
        inset 0 1px 2px rgba(0, 0, 0, 0.3);
      background: rgba(26, 26, 26, 1);
    }
  }

  ::v-deep(.el-input__inner) {
    background: transparent;
    color: #f8f8f8;
    font-size: 14px;
    border: none;
    padding: 0;
    height: 100%;
    line-height: 48px;

    &::placeholder {
      color: #777;
      opacity: 0.8;
    }
  }

  ::v-deep(.el-input__prefix) {
    color: #0ea5e9;
    opacity: 0.7;
    margin-right: 8px;
  }

  ::v-deep(.el-input__clear, .el-input__suffix-inner) {
    color: #777;
    transition: all 0.3s ease;

    &:hover {
      color: #0ea5e9;
    }
  }

  &.dialog-input {
    ::v-deep(.el-input__wrapper) {
      height: 42px;
    }
    ::v-deep(.el-input__inner) {
      line-height: 42px;
      font-size: 13px;
    }
  }
}

.tech-btn {
  height: 48px;
  font-size: 15px;
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

  ::v-deep(.el-button__loading) {
    color: #0ea5e9;
  }

  &.code-btn {
    height: 42px;
    font-size: 12px;
    letter-spacing: 1px;
    padding: 0;
  }

  &.cancel-btn, &.submit-btn {
    width: 48%;
    height: 42px;
    font-size: 13px;
  }
}

.login-footer {
  margin-top: 30px;
  text-align: center;

  span {
    font-size: 11px;
    color: #777;
    opacity: 0.7;
    letter-spacing: 1px;
  }
}

@keyframes grid-scan {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

// 忘记密码弹窗样式
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
  }

  .dialog-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .forget-form {
    .el-form-item {
      margin-bottom: 18px;
    }
  }
}
</style>