<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Tổng quan hệ thống</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Xin chào, chúc bạn một ngày làm việc hiệu quả.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Users</div>
          <div v-if="pending" class="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
          <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">1,248</div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn thành công</div>
          <div v-if="pending" class="h-6 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
          <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">856</div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Hoa hồng</div>
          <div v-if="pending" class="h-6 w-20 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
          <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">42.5M</div>
        </div>
      </div>
      
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn chờ duyệt</div>
          <div v-if="pending" class="h-6 w-12 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
          <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">142</div>
        </div>
      </div>
    </div>

    <!-- Main Chart Placeholder -->
    <div class="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm h-96 flex flex-col mt-2">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-[13px] font-bold text-slate-800 dark:text-slate-100">Biểu đồ Doanh thu hoàn tiền</h3>
        <select class="text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-1 focus:ring-slate-400">
          <option>7 ngày qua</option>
          <option>30 ngày qua</option>
          <option>Năm nay</option>
        </select>
      </div>
      <div class="flex-1 rounded-lg border border-dashed border-slate-200 dark:border-slate-700 flex items-center justify-center bg-slate-50/50 dark:bg-slate-800/20">
        <div class="text-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-slate-400 dark:text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
          </svg>
          <p class="text-xs font-medium text-slate-500">Đang chờ tích hợp Chart.js / ApexCharts</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

definePageMeta({
  layout: "admin"
});

const pending = ref(true);

onMounted(() => {
  setTimeout(() => {
    pending.value = false;
  }, 600);
});
</script>
