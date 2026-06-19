<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Tổng quan hệ thống</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Xin chào, chúc bạn một ngày làm việc hiệu quả.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Total Users -->
      <UCard
        :ui="{
          body: 'p-5 flex items-center gap-4',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 text-indigo-650 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-users" class="h-5 w-5" />
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Users</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">1,248</div>
        </div>
      </UCard>

      <!-- Successful Orders -->
      <UCard
        :ui="{
          body: 'p-5 flex items-center gap-4',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/30 text-emerald-650 dark:text-emerald-400 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-check-circle" class="h-5 w-5" />
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn thành công</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">856</div>
        </div>
      </UCard>

      <!-- Total Commission -->
      <UCard
        :ui="{
          body: 'p-5 flex items-center gap-4',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-900/30 text-amber-650 dark:text-amber-400 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-banknotes" class="h-5 w-5" />
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Hoa hồng</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">42.5M</div>
        </div>
      </UCard>

      <!-- Pending Orders -->
      <UCard
        :ui="{
          body: 'p-5 flex items-center gap-4',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="w-10 h-10 rounded-lg bg-rose-50 dark:bg-rose-900/30 text-rose-650 dark:text-rose-450 flex items-center justify-center shrink-0">
          <UIcon name="i-heroicons-clock" class="h-5 w-5" />
        </div>
        <div>
          <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Đơn chờ duyệt</div>
          <div class="text-xl font-bold text-slate-800 dark:text-white mt-0.5 tracking-tight">142</div>
        </div>
      </UCard>
    </div>

    <!-- Leaderboard Section -->
    <UCard
      :ui="{
        body: 'p-6 md:p-8',
        ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
        background: 'bg-white dark:bg-slate-900',
        rounded: 'rounded-2xl shadow-sm'
      }"
      class="relative overflow-hidden mt-2"
    >
      <!-- Decorative Background Icon -->
      <div class="absolute top-0 right-0 p-8 opacity-[0.03] dark:opacity-[0.02] pointer-events-none scale-150 transform translate-x-10 -translate-y-10">
        <UIcon name="i-heroicons-sparkles" class="w-[200px] h-[200px]" />
      </div>

      <!-- Header & Tabs -->
      <div class="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 relative z-10 gap-5">
        <!-- Title -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-amber-50 dark:bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center shrink-0">
            <UIcon name="i-heroicons-sparkles" class="h-6 w-6" />
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
              <UInput 
                type="month" 
                v-model="selectedMonth" 
                size="md"
                class="w-full sm:w-auto font-bold"
                :ui="{ rounded: 'rounded-full' }"
              />
            </div>
          </transition>

          <!-- Pill Tabs -->
          <div class="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-full border border-slate-200/50 dark:border-slate-700/50 relative z-20 shrink-0">
            <UButton 
              @click="activeTab = 'allTime'"
              :variant="activeTab === 'allTime' ? 'solid' : 'ghost'"
              :color="activeTab === 'allTime' ? 'primary' : 'neutral'"
              class="px-6 py-2 text-sm font-bold rounded-full"
            >
              Tất Cả
            </UButton>
            <UButton 
              @click="activeTab = 'monthly'"
              :variant="activeTab === 'monthly' ? 'solid' : 'ghost'"
              :color="activeTab === 'monthly' ? 'primary' : 'neutral'"
              class="px-6 py-2 text-sm font-bold rounded-full"
            >
              Tháng Này
            </UButton>
          </div>
        </div>
      </div>

      <!-- List Content -->
      <div class="relative min-h-[400px]">
        <!-- Loading State -->
        <div v-if="pendingLeaderboard" class="absolute inset-0 flex flex-col gap-3">
          <USkeleton v-for="i in 5" :key="i" class="h-20 rounded-2xl" />
        </div>

        <!-- Empty State -->
        <div v-else-if="!currentData || currentData.length === 0" class="absolute inset-0 flex flex-col items-center justify-center text-slate-500 gap-3">
          <UIcon name="i-heroicons-arrow-trending-up" class="h-12 w-12 text-slate-300 dark:text-slate-700" />
          <p class="text-sm font-medium">Chưa có dữ liệu thống kê trong khoảng thời gian này</p>
        </div>

        <!-- Data List -->
        <div v-else class="space-y-3 pb-2 relative z-10">
          <div 
            v-for="(user, idx) in currentData" 
            :key="user.userId"
            class="flex items-center justify-between p-4 sm:px-6 rounded-2xl transition-all duration-300 border shadow-sm group hover:-translate-y-0.5 hover:shadow-md"
            :class="[
              idx === 0 ? 'bg-gradient-to-r from-amber-100 to-amber-50/50 dark:from-amber-900/30 dark:to-amber-900/10 border-amber-200 dark:border-amber-700/50' :
              idx === 1 ? 'bg-gradient-to-r from-slate-100 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-800/30 border-slate-200 dark:border-slate-700' :
              idx === 2 ? 'bg-gradient-to-r from-orange-100/60 to-orange-50/30 dark:from-orange-900/20 dark:to-orange-900/10 border-orange-200/60 dark:border-orange-800/50' :
              'bg-slate-50/50 dark:bg-slate-800/30 border-transparent hover:border-slate-200 dark:hover:border-slate-700',
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
              <UIcon name="i-heroicons-currency-dollar" class="h-4 w-4 sm:h-5 sm:w-5 opacity-40 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

definePageMeta({
  layout: "admin"
});

useHead({
  title: 'Tổng quan | Admin Saffiliate'
});

// State
const activeTab = ref('allTime'); // 'monthly' or 'allTime'
const now = new Date();
const currentMonthStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
const selectedMonth = ref(currentMonthStr);

const pendingLeaderboard = ref(true);
const leaderboardData = ref({ allTime: [], monthly: [] });

// Fetch
const fetchLeaderboard = async () => {
  pendingLeaderboard.value = true;
  try {
    const res = await useAppFetch().api.get("/stat/leaderboard", {
      query: { month: selectedMonth.value }
    });
    if (res.data) {
      leaderboardData.value = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
  } finally {
    pendingLeaderboard.value = false;
  }
};

onMounted(() => {
  fetchLeaderboard();
});

watch(selectedMonth, () => {
  fetchLeaderboard();
});

// Computed Data
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
