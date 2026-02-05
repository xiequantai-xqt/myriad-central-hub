<template>
  <!-- 路由出口：所有页面都会在这里渲染 -->
  <router-view />
</template>

<script setup>
</script>

<style lang="scss">
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html, body, #app {
  height: 100%;
  width: 100%;
}
</style>