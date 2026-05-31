<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Tổng quan hệ thống</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Xin chào, chúc bạn một ngày làm việc hiệu quả.</p>
      </div>
    </div>

    <!-- Stats Cards (Mock) -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Users -->
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Users</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">1,248</div>
        </div>
      </div>
      <!-- Successful Orders -->
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn thành công</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">856</div>
        </div>
      </div>
      <!-- Total Commission -->
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08-.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Hoa hồng</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">42.5M</div>
        </div>
      </div>
      <!-- Pending Orders -->
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
        <div class="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn chờ duyệt</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">142</div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Section (Tab-based) -->
    <div class="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden mt-2">
      <!-- Decorative Background SVG -->
      <div class="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.02] pointer-events-none scale-150 transform translate-x-10 -translate-y-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      </div>

      <!-- Header & Tabs -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 relative z-10 gap-5">
        
        <!-- Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
          </div>
          <h3 class="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">Bảng Xếp Hạng</h3>
        </div>
        
        <!-- Controls -->
        <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full md:w-auto justify-end">
          
          <!-- Month Picker -->
          <transition 
            enter-active-class="transition-all duration-300 ease-out origin-right" 
            enter-from-class="opacity-0 scale-95 translate-x-4 max-w-0" 
            enter-to-class="opacity-100 scale-100 translate-x-0 max-w-[200px]" 
            leave-active-class="transition-all duration-200 ease-in absolute sm:relative origin-right" 
            leave-from-class="opacity-100 scale-100 translate-x-0 max-w-[200px]" 
            leave-to-class="opacity-0 scale-95 translate-x-4 max-w-0"
          >
            <div v-show="activeTab === 'monthly'" class="relative shrink-0 z-10 w-full sm:w-auto">
              <input 
                type="month" 
                v-model="selectedMonth" 
                class="w-full sm:w-auto px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-full text-sm bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/50 shadow-sm cursor-pointer"
              />
            </div>
          </transition>

          <!-- Pill Tabs -->
          <div class="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 relative z-20 shrink-0">
            <button 
              @click="activeTab = 'monthly'"
              class="flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded-full transition-all duration-300"
              :class="activeTab === 'monthly' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
            >
              Tháng Này
            </button>
            <button 
              @click="activeTab = 'allTime'"
              class="flex-1 sm:flex-none px-6 py-2 text-sm font-bold rounded-full transition-all duration-300"
              :class="activeTab === 'allTime' ? 'bg-white dark:bg-slate-900 text-amber-600 dark:text-amber-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'"
            >
              Tất Cả
            </button>
          </div>
        </div>
      </div>

      <!-- List Content -->
      <div class="relative min-h-[400px]">
        <!-- Loading State -->
        <div v-if="pendingLeaderboard" class="absolute inset-0 flex flex-col gap-3">
          <div v-for="i in 5" :key="i" class="h-20 bg-slate-100 dark:bg-slate-800/50 rounded-2xl animate-pulse"></div>
        </div>

        <!-- Empty State -->
        <div v-else-if="!currentData || currentData.length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300 dark:text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
             <path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
           </svg>
           <p class="text-sm font-medium">Chưa có dữ liệu thống kê trong khoảng thời gian này</p>
        </div>

        <!-- Data List -->
        <div v-else class="space-y-3 pb-2 relative z-10">
          <div 
            v-for="(user, idx) in currentData" 
            :key="user.userId"
            class="flex items-center justify-between p-4 sm:px-6 rounded-2xl transition-all duration-300"
            :class="[
              idx === 0 ? 'bg-gradient-to-r from-amber-100 to-amber-50/50 dark:from-amber-900/30 dark:to-amber-900/10 border-amber-200 dark:border-amber-700/50' :
              idx === 1 ? 'bg-gradient-to-r from-slate-100 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-800/30 border-slate-200 dark:border-slate-700' :
              idx === 2 ? 'bg-gradient-to-r from-orange-100/60 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-900/10 border-orange-200/60 dark:border-orange-800/50' :
              'bg-slate-50/50 dark:bg-slate-800/30 border-transparent hover:border-slate-200 dark:hover:border-slate-700',
              'border shadow-sm group hover:-translate-y-0.5 hover:shadow-md'
            ]"
          >
            <!-- Left Info -->
            <div class="flex items-center gap-4 sm:gap-6">
              <!-- Rank Number -->
              <div 
                class="w-6 sm:w-8 text-center font-black text-xl sm:text-2xl drop-shadow-sm" 
                :class="
                  idx === 0 ? 'text-amber-500' : 
                  idx === 1 ? 'text-slate-400' : 
                  idx === 2 ? 'text-orange-500' : 
                  'text-slate-300 dark:text-slate-600'
                "
              >
                {{ idx + 1 }}
              </div>
              
              <!-- Avatar -->
              <div class="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white dark:bg-slate-800 overflow-hidden shrink-0 border-2"
                :class="
                  idx === 0 ? 'border-amber-400' : 
                  idx === 1 ? 'border-slate-300 dark:border-slate-600' : 
                  idx === 2 ? 'border-orange-400' : 
                  'border-white dark:border-slate-800 shadow-sm'
                "
              >
                <img v-if="user.image" :src="user.image" class="h-full w-full object-cover" />
                <span v-else class="font-black text-lg text-slate-400 uppercase flex items-center justify-center h-full w-full bg-slate-50 dark:bg-slate-900">{{ user.name ? user.name.charAt(0) : 'U' }}</span>
              </div>
              
              <!-- Name & Orders -->
              <div class="flex flex-col">
                <span class="font-extrabold text-[15px] sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">{{ user.name || 'Người dùng ẩn danh' }}</span>
                <span class="text-xs font-medium text-slate-500 mt-0.5">{{ user.totalOrders }} đơn hàng</span>
              </div>
            </div>

            <!-- Right Revenue -->
            <div 
              class="font-black text-[15px] sm:text-lg flex items-center gap-1.5" 
              :class="idx <= 2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'"
            >
              {{ formatMoney(user.totalCommission) }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 sm:h-5 sm:w-5 opacity-40 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                 <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.736 6.979C9.208 6.193 9.696 6 10 6c.304 0 .792.193 1.264.979a1 1 0 001.715-1.029C12.279 4.784 11.232 4 10 4s-2.279.784-2.979 1.95c-.285.498.026 1.05.571 1.05h1.144zM11 11.5a1 1 0 11-2 0 1 1 0 012 0zm-1.5-3a.5.5 0 000 1h1a.5.5 0 000-1h-1z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: "admin"
});

useHead({
  title: 'Tổng quan | Admin Saffiliate'
});

const headers = useRequestHeaders(["cookie"]);

// State
const activeTab = ref('monthly'); // 'monthly' or 'allTime'
const now = new Date();
const currentMonthStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
const selectedMonth = ref(currentMonthStr);

// Fetch
const { data: leaderboardResponse, pending: pendingLeaderboard } = useFetch("/api/stat/leaderboard", {
  headers,
  query: computed(() => ({ month: selectedMonth.value })),
  watch: [selectedMonth]
});

// Computed Data
const leaderboardData = computed(() => {
  return leaderboardResponse.value?.data || { allTime: [], monthly: [] };
});

const currentData = computed(() => {
  if (activeTab.value === 'monthly') return leaderboardData.value.monthly || [];
  return leaderboardData.value.allTime || [];
});

// Helpers
const formatMoney = (val) => {
  if (!val) return '0đ';
  return Math.round(Number(val)).toLocaleString('vi-VN') + 'đ';
};
</script>
