<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="isLoading"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/15 dark:bg-slate-950/30 backdrop-blur-[4px] pointer-events-auto select-none"
    >
      <!-- Glassmorphic Card Container -->
      <div class="flex flex-col items-center justify-center p-6 rounded-3xl bg-white/70 dark:bg-slate-900/70 border border-white/20 dark:border-slate-800/30 shadow-2xl shadow-slate-950/10 dark:shadow-slate-950/40 max-w-xs text-center transform transition-transform">
        <!-- Spinning Shopee-orange SVG Icon -->
        <svg
          class="animate-spin h-10 w-10 text-shopee-orange"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-20"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-90"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>

        <!-- Loading message -->
        <h4 class="text-xs font-black text-slate-800 dark:text-slate-200 mt-4 tracking-wider uppercase select-none">
          Đang Xử Lý
        </h4>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1 tracking-wide select-none">
          Vui lòng đợi trong giây lát...
        </p>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { usePromiseTracker } from '@/composables/usePromiseTracker';

const { isLoading } = usePromiseTracker();
</script>
