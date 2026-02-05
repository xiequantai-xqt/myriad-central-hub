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
      <!-- 底部极简版权 -->
      <div class="login-footer">
        <span>© 2025 CoreTech · All Rights Reserved</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const loginRef = ref(null)
const isLoginLoading = ref(false)
const passwordInput = ref(null)

// 登录表单
const loginForm = ref({
  username: 'admin',
  password: '123456'
})

// 表单校验规则
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

// 聚焦密码框
const focusPasswordInput = () => {
  passwordInput.value?.focus()
}

// 登录逻辑
const handleLogin = async () => {
  if (isLoginLoading.value) return
  
  try {
    await loginRef.value.validate()
  } catch (err) {
    ElMessage.warning('请完善登录信息')
    return
  }

  try {
    isLoginLoading.value = true
    await userStore.login(loginForm.value)
    ElMessage.success('登录成功，进入核心系统...')
    setTimeout(() => router.push('/'), 1200)
  } catch (err) {
    ElMessage.error('登录失败：' + (err.message || '账号或密码错误'))
  } finally {
    isLoginLoading.value = false
  }
}

// 生命周期
onMounted(() => {
  passwordInput.value && passwordInput.value.focus()
})
</script>

<style lang="scss" scoped>
// 核心容器：科技黑基调
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
  background: #0a0a0a; // 基础科技黑（不是纯黑，带灰度）
}

// 1. 科技黑底层（带哑光拉丝纹理）
.bg-base {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  // 多层渐变模拟哑光黑质感
  background: 
    radial-gradient(circle at 50% 50%, #121212 0%, #0a0a0a 100%),
    url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%231a1a1a' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E");
  z-index: 1;
}

// 2. 冷调网格扫描层（科技核心动效，参考阿里云）
.bg-grid-scan {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, rgba(14, 165, 233, 0.03) 50%, transparent 100%);
  background-size: 200% 100%;
  // 慢扫描动效，科技感拉满
  animation: grid-scan 15s linear infinite;
  z-index: 2;
  pointer-events: none;
}

// 3. 极简细网格层（科技黑标配）
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

// 登录面板：哑光黑玻璃拟态（参考华为云）
.login-box {
  width: 400px; // 更紧凑的高端比例
  padding: 45px 40px;
  // 哑光黑玻璃质感
  background: rgba(18, 18, 18, 0.85);
  backdrop-filter: blur(15px);
  // 极细冷色边框
  border: 1px solid rgba(14, 165, 233, 0.15);
  border-radius: 16px;
  // 冷色细微阴影，无彩色渐变
  box-shadow: 
    0 8px 40px rgba(0, 0, 0, 0.4),
    0 2px 10px rgba(14, 165, 233, 0.05);
  position: relative;
  z-index: 10;
  // 哑光质感
  box-sizing: border-box;
}

// 顶部冷光装饰条（极简）
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

// Logo/标题区（极简科技风）
.login-logo {
  text-align: center;
  margin-bottom: 30px;

  .logo-icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 15px;
    // 极简科技图标（冷青蓝描边）
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
    color: #f8f8f8; // 冷白
    font-size: 22px;
    font-weight: 500; // 轻字重，高端感
    letter-spacing: 1px;
    margin: 0 0 8px 0;
  }

  .login-desc {
    color: #888; // 浅灰
    font-size: 12px;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin: 0;
    opacity: 0.7;
  }
}

// 表单区域（极简）
.login-form {
  .form-item {
    margin-bottom: 20px;
  }

  .el-form-item__error {
    color: #ef4444; // 错误提示色，低饱和
    font-size: 12px;
  }
}

// 输入框：科技黑哑光风格
.tech-input {
  ::v-deep(.el-input__wrapper) {
    // 哑光黑输入框
    background: rgba(26, 26, 26, 0.9);
    border: 1px solid rgba(14, 165, 233, 0.1);
    border-radius: 8px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.3);
    color: #f8f8f8;
    transition: all 0.3s ease;
    padding: 0 12px;
    height: 48px;

    // 焦点态：冷青蓝边框+细微发光
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
}

// 登录按钮：科技黑哑光按钮（参考苹果开发者后台）
.tech-btn {
  height: 48px;
  font-size: 15px;
  letter-spacing: 2px;
  // 哑光黑按钮，冷青蓝描边
  background: rgba(26, 26, 26, 0.95);
  border: 1px solid rgba(14, 165, 233, 0.4);
  border-radius: 8px;
  color: #f8f8f8;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  // hover态：冷青蓝发光+轻微上浮
  &:hover {
    background: rgba(30, 30, 30, 1);
    border-color: #0ea5e9;
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.4),
      0 0 12px rgba(14, 165, 233, 0.15);
    transform: translateY(-1px);
    color: #f8f8f8;
  }

  // active态：按压反馈
  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  }

  ::v-deep(.el-button__loading) {
    color: #0ea5e9;
  }
}

// 底部版权：极简低调
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

// 核心动画：网格扫描
@keyframes grid-scan {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
</style>