<template>
  <transition
    enter-active-class="loader-enter-active"
    enter-from-class="loader-enter-from"
    enter-to-class="loader-enter-to"
    leave-active-class="loader-leave-active"
    leave-from-class="loader-leave-from"
    leave-to-class="loader-leave-to"
  >
    <div v-if="isLoading" class="global-loader-overlay">
      <div class="global-loader-card">
        <!-- Custom spinning SVG (Shopee orange) -->
        <svg class="global-loader-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle class="global-loader-track" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="global-loader-fill" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        <h4 class="global-loader-title">Đang Xử Lý</h4>
        <p class="global-loader-desc">Vui lòng đợi trong giây lát...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { usePromiseTracker } from '@/composables/usePromiseTracker';

const { isLoading } = usePromiseTracker();
</script>

<style scoped>
.global-loader-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(15, 23, 42, 0.12);
  pointer-events: auto;
  user-select: none;
}

.global-loader-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: 1.5rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.08);
  max-width: 200px;
  text-align: center;
}

.global-loader-spin {
  width: 40px;
  height: 40px;
  color: #EE4D2D;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.global-loader-track {
  opacity: 0.2;
}

.global-loader-fill {
  opacity: 0.9;
}

.global-loader-title {
  font-size: 12px;
  font-weight: 800;
  color: #1E293B;
  margin-top: 1rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  user-select: none;
}

.global-loader-desc {
  font-size: 10px;
  color: #94A3B8;
  font-weight: 700;
  margin-top: 4px;
  letter-spacing: 0.05em;
  user-select: none;
}

/* Transitions */
.loader-enter-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.loader-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.loader-enter-to {
  opacity: 1;
  transform: scale(1);
}
.loader-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.loader-leave-from {
  opacity: 1;
  transform: scale(1);
}
.loader-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
