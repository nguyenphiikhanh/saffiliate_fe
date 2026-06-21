<template>
  <div class="order-process-card">
    <!-- Header -->
    <div class="process-header">
      <div class="process-header-icon">
        <svg xmlns="http://www.w3.org/2000/svg" class="icon-sm" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h2 class="process-title">Quy Trình Đơn Hàng</h2>
    </div>

    <!-- Timeline -->
    <div class="process-timeline">
      <!-- Step 1 -->
      <div class="step-item">
        <div class="step-circle step-circle--orange">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/>
          </svg>
        </div>
        <span class="step-label">Mua hàng</span>
      </div>

      <!-- Connector 1 -->
      <div class="step-connector">
        <div class="connector-line connector-line--gradient1">
          <svg xmlns="http://www.w3.org/2000/svg" class="connector-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="step-item">
        <div class="step-circle step-circle--yellow">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M13 3 4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <span class="step-label">Ghi nhận</span>
      </div>

      <!-- Connector 2 -->
      <div class="step-connector">
        <div class="connector-line connector-line--gradient2">
          <svg xmlns="http://www.w3.org/2000/svg" class="connector-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="step-item">
        <div class="step-circle step-circle--sky">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
          </svg>
        </div>
        <span class="step-label">Đối soát</span>
      </div>

      <!-- Connector 3 -->
      <div class="step-connector">
        <div class="connector-line connector-line--gray">
          <svg xmlns="http://www.w3.org/2000/svg" class="connector-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      <!-- Step 4 -->
      <div class="step-item">
        <div class="step-circle step-circle--emerald">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon-lg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
          </svg>
        </div>
        <span class="step-label">Duyệt hoàn</span>
      </div>
    </div>

    <!-- Toggle button -->
    <div class="process-toggle">
      <button @click="isDetailsOpen = !isDetailsOpen" class="toggle-btn">
        <span>Xem chi tiết</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="toggle-arrow" :class="{ 'toggle-arrow--open': isDetailsOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Details section -->
    <div class="details-section" :class="isDetailsOpen ? 'details-section--open' : 'details-section--closed'">
      <div class="details-overflow">
        <div class="details-grid">
          <!-- Detail Card 1 -->
          <div class="detail-card">
            <div class="detail-icon detail-icon--yellow">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 3 4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div class="detail-label">Thời gian ghi nhận</div>
              <div class="detail-value">Trong vòng <span class="detail-highlight">24h</span></div>
            </div>
          </div>

          <!-- Detail Card 2 -->
          <div class="detail-card">
            <div class="detail-icon detail-icon--emerald">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon-md" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
              </svg>
            </div>
            <div>
              <div class="detail-label">Thời gian duyệt hoàn</div>
              <div class="detail-value"><span class="detail-highlight detail-highlight--emerald">7 - 14 ngày</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer note -->
    <div class="process-footer-note">
      Đơn hàng mua qua <strong>Saffi</strong> sẽ được tự động ghi nhận. Hãy đảm bảo bạn không bấm link khác (live, video, quảng cáo,...) hoặc chuyển sang link khác khi đang mua sắm.
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isDetailsOpen = ref(false);
</script>

<style scoped>
.order-process-card {
  border-radius: 1.5rem;
  border: 1px solid #F1F5F9;
  background: white;
  padding: 1.5rem;
  box-shadow: 0 20px 40px rgba(0,0,0,0.015);
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.process-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
}

.process-header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  color: #EE4D2D;
  border: 1px solid rgba(238,77,45,0.3);
  flex-shrink: 0;
}

.process-title {
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #1E293B;
  margin: 0;
}

/* Timeline */
.process-timeline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  max-width: 48rem;
  margin: 0 auto 2rem;
  padding: 0 4px;
}

@media (min-width: 640px) {
  .process-timeline { padding: 0 1.5rem; }
}

.step-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  width: 64px;
  flex-shrink: 0;
}

@media (min-width: 640px) {
  .step-item { width: 80px; }
}

.step-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.step-circle--orange { background: #EE4D2D; box-shadow: 0 4px 12px rgba(238,77,45,0.2); }
.step-circle--yellow { background: #FBBF24; box-shadow: 0 4px 12px rgba(251,191,36,0.2); }
.step-circle--sky { background: #38BDF8; box-shadow: 0 4px 12px rgba(56,189,248,0.2); }
.step-circle--emerald { background: #10B981; box-shadow: 0 4px 12px rgba(16,185,129,0.2); }

.step-label {
  font-size: 11px;
  font-weight: 700;
  color: #334155;
  text-align: center;
  line-height: 1.3;
}

@media (min-width: 640px) {
  .step-label { font-size: 12px; }
}

.step-connector {
  flex: 1;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 4px;
}

@media (min-width: 640px) {
  .step-connector { padding: 0 0.75rem; }
}

.connector-line {
  height: 2px;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.connector-line--gradient1 { background: linear-gradient(to right, #EE4D2D, #FBBF24); }
.connector-line--gradient2 { background: linear-gradient(to right, #FBBF24, #38BDF8); }
.connector-line--gray { background: #E2E8F0; }

.connector-arrow {
  color: #CBD5E1;
  background: white;
  width: 12px;
  height: 12px;
  position: absolute;
  right: -4px;
}

.icon-sm { width: 12px; height: 12px; }
.icon-md { width: 20px; height: 20px; }
.icon-lg { width: 24px; height: 24px; }

/* Toggle */
.process-toggle {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.toggle-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #EE4D2D;
  font-size: 14px;
  font-weight: 600;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s ease;
}

.toggle-btn:hover { color: #D94429; }

.toggle-arrow {
  width: 16px;
  height: 16px;
  transition: transform 0.3s ease;
}

.toggle-arrow--open { transform: rotate(180deg); }

/* Details section */
.details-section {
  display: grid;
  transition: all 0.5s ease;
}

.details-section--open {
  grid-template-rows: 1fr;
  opacity: 1;
  margin-bottom: 1.5rem;
}

.details-section--closed {
  grid-template-rows: 0fr;
  opacity: 0;
  margin-bottom: 0;
}

.details-overflow {
  overflow: hidden;
}

.details-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .details-grid { grid-template-columns: 1fr 1fr; }
}

.detail-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(248,250,252,0.7);
  border: 1px solid #F1F5F9;
}

.detail-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.detail-icon--yellow { background: rgba(251,191,36,0.1); color: #FBBF24; }
.detail-icon--emerald { background: rgba(16,185,129,0.1); color: #10B981; }

.detail-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94A3B8;
  margin-bottom: 2px;
}

.detail-value {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

.detail-highlight { color: #EE4D2D; font-weight: 700; }
.detail-highlight--emerald { color: #10B981; font-weight: 700; }

/* Footer note */
.process-footer-note {
  font-size: 13px;
  color: #64748B;
  line-height: 1.6;
  border-top: 1px solid #F1F5F9;
  padding-top: 1.25rem;
}
</style>
