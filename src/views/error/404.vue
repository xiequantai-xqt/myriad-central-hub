<template>
  <div class="error-404">
    <h1>404</h1>
    <p>页面不存在</p>
    <el-button type="primary" @click="$router.push('/')">返回首页</el-button>
  </div>
</template>

<style lang="scss" scoped>
.error-404 {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 80px;
    color: #409eff;
  }
  p {
    margin: 20px 0;
    font-size: 18px;
  }
}
</style>