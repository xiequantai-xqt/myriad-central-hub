<template>
  <div class="dashboard">
    <div class="ambient"></div>
    <div class="scanlines"></div>
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="hero-content">
        <div class="hero-badge">Neural Ops Console</div>
        <h1>Welcome back, {{ displayName }}</h1>
        <p class="hero-subtitle">
          Real-time command surface for security, traffic, and system flow.
        </p>
        <div class="hero-actions">
          <button class="btn primary">Open Dashboard</button>
          <button class="btn ghost">View Reports</button>
        </div>
      </div>
      <div class="hero-panel">
        <div class="panel-title">Live Signals</div>
        <div class="signal">
          <span class="dot green"></span>
          <span>Auth Service</span>
          <span class="muted">Healthy</span>
        </div>
        <div class="signal">
          <span class="dot cyan"></span>
          <span>API Gateway</span>
          <span class="muted">Stable</span>
        </div>
        <div class="signal">
          <span class="dot amber"></span>
          <span>Queue</span>
          <span class="muted">Moderate</span>
        </div>
      </div>
    </section>

    <section class="stats">
      <div class="stat-card">
        <div class="stat-label">Active Users</div>
        <div class="stat-value">1,284</div>
        <div class="stat-trend up">+6.4% this week</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Requests / min</div>
        <div class="stat-value">7,912</div>
        <div class="stat-trend up">+12.1% today</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Error Rate</div>
        <div class="stat-value">0.23%</div>
        <div class="stat-trend down">-0.08% today</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Latency</div>
        <div class="stat-value">182ms</div>
        <div class="stat-trend flat">Stable</div>
      </div>
    </section>

    <section class="grid">
      <div class="card wide">
        <div class="card-title">Recent Activity</div>
        <div class="activity">
          <div class="activity-item">
            <span class="pill">Auth</span>
            <span>New admin login: {{ displayName }}</span>
            <span class="muted">{{ $route.path }}</span>
          </div>
          <div class="activity-item">
            <span class="pill">System</span>
            <span>Roles updated: super</span>
            <span class="muted">2 mins ago</span>
          </div>
          <div class="activity-item">
            <span class="pill">Audit</span>
            <span>Policy scan completed</span>
            <span class="muted">8 mins ago</span>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Quick Actions</div>
        <div class="actions">
          <button class="action">User Matrix</button>
          <button class="action">Role Control</button>
          <button class="action">System Forge</button>
          <button class="action">Audit Trails</button>
        </div>
      </div>
      <div class="card">
        <div class="card-title">Security Status</div>
        <div class="meter">
          <div class="meter-bar"></div>
        </div>
        <div class="meter-label">Risk Score: Low</div>
        <div class="muted">Last scan: 10 minutes ago</div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const displayName = computed(() => {
  return (
    userStore.userInfo.nickname ||
    userStore.userInfo.username ||
    'Admin'
  )
})
</script>

<style lang="scss" scoped>
.dashboard {
  --bg: #0b0f16;
  --panel: #111827;
  --panel-2: #0f172a;
  --text: #e6e9ef;
  --muted: #93a1b3;
  --accent: #35f5c4;
  --accent-2: #6a7cff;
  --amber: #f5c451;
  --cyan: #22d3ee;
  --pink: #ff6ad5;
  min-height: 100%;
  padding: 28px 28px 46px;
  color: var(--text);
  background:
    radial-gradient(1200px 800px at 10% -10%, rgba(53, 245, 196, 0.12) 0%, transparent 55%),
    radial-gradient(900px 700px at 90% 10%, rgba(106, 124, 255, 0.18) 0%, transparent 55%),
    radial-gradient(700px 500px at 50% 100%, rgba(255, 106, 213, 0.08) 0%, transparent 60%),
    linear-gradient(180deg, #0b0f16 0%, #0a0f17 60%, #070a11 100%);
  font-family: "Space Grotesk", "IBM Plex Sans", "Sora", "PingFang SC",
    "Microsoft YaHei", sans-serif;
  position: relative;
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
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
  padding: 28px;
  border-radius: 18px;
  background:
    linear-gradient(135deg, rgba(53, 245, 196, 0.12), rgba(106, 124, 255, 0.12)),
    radial-gradient(200px 120px at 15% 15%, rgba(255, 255, 255, 0.08), transparent 60%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.45),
    0 0 40px rgba(53, 245, 196, 0.12);
  z-index: 1;
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
  margin: 14px 0 10px;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0.4px;
}

.hero-subtitle {
  margin: 0 0 18px;
  color: var(--muted);
  line-height: 1.6;
}

.hero-actions {
  display: flex;
  gap: 12px;
}

.btn {
  height: 40px;
  padding: 0 16px;
  border-radius: 10px;
  border: 1px solid transparent;
  font-size: 13px;
  letter-spacing: 0.6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn.primary {
  background: linear-gradient(135deg, var(--accent), var(--accent-2));
  color: #0b0f14;
  box-shadow: 0 12px 28px rgba(53, 245, 196, 0.35);
}

.btn.primary:hover {
  transform: translateY(-1px);
}

.btn.ghost {
  background: transparent;
  color: var(--text);
  border-color: rgba(255, 255, 255, 0.18);
}

.hero-panel {
  position: relative;
  z-index: 1;
  background: rgba(12, 17, 28, 0.82);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 14px;
  padding: 18px;
  backdrop-filter: blur(6px);
}

.panel-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--muted);
  margin-bottom: 12px;
}

.signal {
  display: grid;
  grid-template-columns: 12px 1fr auto;
  align-items: center;
  gap: 10px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.signal:last-child {
  border-bottom: none;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  display: inline-block;
}

.dot.green { background: #22c55e; }
.dot.cyan { background: #22d3ee; }
.dot.amber { background: var(--amber); }

.stats {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  position: relative;
  z-index: 1;
}

.stat-card {
  background: var(--panel);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
  box-shadow: inset 0 0 0 1px rgba(53, 245, 196, 0.04);
}

.stat-label {
  color: var(--muted);
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}

.stat-value {
  font-size: 26px;
  margin: 8px 0 6px;
  font-weight: 600;
}

.stat-trend {
  font-size: 12px;
}

.stat-trend.up { color: #22c55e; }
.stat-trend.down { color: #f97316; }
.stat-trend.flat { color: var(--muted); }

.grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 16px;
  position: relative;
  z-index: 1;
}

.card {
  background: var(--panel-2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  padding: 16px;
  min-height: 180px;
}

.card.wide {
  min-height: 220px;
}

.card-title {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  color: var(--muted);
  margin-bottom: 12px;
}

.activity {
  display: grid;
  gap: 12px;
}

.activity-item {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 10px;
  align-items: center;
  padding: 10px 12px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.04);
}

.pill {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(106, 124, 255, 0.22);
  color: #d6dcff;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.actions {
  display: grid;
  gap: 10px;
}

.action {
  height: 38px;
  border-radius: 10px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--text);
  cursor: pointer;
  transition: all 0.2s ease;
}

.action:hover {
  border-color: rgba(53, 245, 196, 0.7);
  color: var(--accent);
}

.meter {
  height: 8px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.06);
  overflow: hidden;
  margin: 8px 0 10px;
}

.meter-bar {
  height: 100%;
  width: 78%;
  background: linear-gradient(90deg, #22c55e, #3dd6c6);
  animation: pulse 3.5s ease-in-out infinite;
}

.meter-label {
  margin-bottom: 6px;
}

.muted {
  color: var(--muted);
  font-size: 12px;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

@keyframes drift {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
  50% { transform: translate3d(10px, -20px, 0) rotate(8deg); }
}

@keyframes pulse {
  0%, 100% { filter: brightness(1); }
  50% { filter: brightness(1.2); }
}

@media (max-width: 1100px) {
  .hero {
    grid-template-columns: 1fr;
  }
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
