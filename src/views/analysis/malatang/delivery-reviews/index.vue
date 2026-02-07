<template>
  <div class="analysis-page">
    <div class="ambient"></div>
    <div class="scanlines"></div>
    <div class="page-header">
      <h2>外卖评价分析</h2>
      <p>分析麻辣烫外卖评价趋势、评分分布与关键反馈。</p>
    </div>
    <div class="page-body">
      <div class="placeholder">功能建设中</div>
    </div>
  </div>
</template>

<style scoped>
.analysis-page {
  min-height: 100%;
  padding: 24px 28px 40px;
  color: #e6e9ef;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(900px 650px at 10% -10%, rgba(53, 245, 196, 0.12) 0%, transparent 55%),
    radial-gradient(720px 520px at 90% 10%, rgba(106, 124, 255, 0.18) 0%, transparent 55%),
    radial-gradient(520px 380px at 50% 100%, rgba(255, 106, 213, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #0b0f16 0%, #0a0f17 60%, #070a11 100%);
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

.page-header {
  margin-bottom: 16px;
  position: relative;
  z-index: 1;
}

.page-header h2 {
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 600;
}

.page-header p {
  margin: 0;
  color: #93a1b3;
}

.page-body {
  margin-top: 20px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(12, 17, 28, 0.78);
  position: relative;
  z-index: 1;
}

.placeholder {
  color: #a3b1c2;
  font-size: 14px;
}

@keyframes drift {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(10px, -20px, 0) rotate(8deg); }
}
</style>
