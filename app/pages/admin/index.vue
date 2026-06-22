<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight">Tổng quan hệ thống</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Xin chào, chúc bạn một ngày làm việc hiệu quả.</p>
      </div>
    </div>

    <!-- Stats Cards -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-statistic title="Tổng Users" :value="1248">
            <template #prefix><TeamOutlined class="text-indigo-500" /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-statistic title="Đơn thành công" :value="856">
            <template #prefix><CheckCircleOutlined class="text-emerald-500" /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-statistic title="Tổng Hoa hồng" value="42.5M">
            <template #prefix><BankOutlined class="text-amber-500" /></template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="6">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-statistic title="Đơn chờ duyệt" :value="142">
            <template #prefix><ClockCircleOutlined class="text-rose-500" /></template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>

    <!-- Leaderboard Section -->
    <a-card :bordered="false" class="admin-card">
      <template #title>
        <div class="flex items-center gap-2">
          <StarOutlined class="text-amber-500 text-lg" />
          <span class="font-extrabold text-slate-800 dark:text-slate-100">Bảng Xếp Hạng</span>
        </div>
      </template>
      <template #extra>
        <a-space>
          <!-- Month Picker (only when monthly tab active) -->
          <a-date-picker
            v-if="activeTab === 'monthly'"
            picker="month"
            v-model:value="selectedMonthObj"
            size="small"
            format="YYYY-MM"
            class="font-bold"
          />
          <!-- Tab switcher -->
          <a-radio-group v-model:value="activeTab" button-style="solid" size="small">
            <a-radio-button value="allTime">Tất Cả</a-radio-button>
            <a-radio-button value="monthly">Tháng Này</a-radio-button>
          </a-radio-group>
        </a-space>
      </template>

      <!-- Loading skeleton -->
      <div v-if="pendingLeaderboard" class="flex flex-col gap-3">
        <a-skeleton-button v-for="i in 5" :key="i" active block size="large" />
      </div>

      <!-- Empty state -->
      <a-empty
        v-else-if="!currentData || currentData.length === 0"
        description="Chưa có dữ liệu thống kê trong khoảng thời gian này"
        :image="'simple'"
      />

      <!-- Data list -->
      <div v-else class="flex flex-col gap-3">
        <div
          v-for="(user, idx) in currentData"
          :key="user.userId"
          class="flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
          :class="[
            idx === 0 ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700/50' :
            idx === 1 ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700' :
            idx === 2 ? 'bg-orange-50 dark:bg-orange-900/10 border-orange-200/60 dark:border-orange-800/50' :
            'bg-white dark:bg-transparent border-transparent hover:border-slate-200 dark:hover:border-slate-700',
          ]"
        >
          <div class="flex items-center gap-4">
            <!-- Rank -->
            <div
              class="w-8 text-center font-black text-2xl"
              :class="idx === 0 ? 'text-amber-500' : idx === 1 ? 'text-slate-400' : idx === 2 ? 'text-orange-500' : 'text-slate-300 dark:text-slate-600'"
            >{{ idx + 1 }}</div>

            <!-- Avatar -->
            <div
              class="h-12 w-12 rounded-full overflow-hidden shrink-0 border-2 flex items-center justify-center bg-slate-100 dark:bg-slate-800"
              :class="idx === 0 ? 'border-amber-400' : idx === 1 ? 'border-slate-300' : idx === 2 ? 'border-orange-400' : 'border-white dark:border-slate-700'"
            >
              <img v-if="user.image" :src="user.image" class="h-full w-full object-cover" />
              <span v-else class="font-black text-lg text-slate-400 uppercase">{{ user.name?.charAt(0) || 'U' }}</span>
            </div>

            <!-- Name & orders -->
            <div>
              <div class="font-extrabold text-slate-800 dark:text-slate-100">{{ user.name || 'Ẩn danh' }}</div>
              <div class="text-xs text-slate-500 mt-0.5">{{ user.totalOrders }} đơn hàng</div>
            </div>
          </div>

          <!-- Commission -->
          <div class="font-black text-base flex items-center gap-1.5" :class="idx <= 2 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-700 dark:text-slate-300'">
            {{ formatMoney(user.totalCommission) }}
            <DollarOutlined class="text-[18px] opacity-40" />
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { TeamOutlined, CheckCircleOutlined, BankOutlined, ClockCircleOutlined, StarOutlined, LineChartOutlined, DollarOutlined } from "@ant-design/icons-vue";
import dayjs from "dayjs";

definePageMeta({ layout: "admin" });
useHead({ title: 'Tổng quan | Admin Saffiliate' });

const activeTab = ref('allTime');
const now = new Date();
const currentMonthStr = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}`;
const selectedMonth = ref(currentMonthStr);
const selectedMonthObj = ref(dayjs(currentMonthStr));

watch(selectedMonthObj, (newVal) => {
  if (newVal) selectedMonth.value = newVal.format('YYYY-MM');
});

const pendingLeaderboard = ref(true);
const leaderboardData = ref({ allTime: [], monthly: [] });

const fetchLeaderboard = async () => {
  pendingLeaderboard.value = true;
  try {
    const res = await useAppFetch().api.get("/stat/leaderboard", { query: { month: selectedMonth.value } });
    if (res.data) leaderboardData.value = res.data;
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
  } finally {
    pendingLeaderboard.value = false;
  }
};

onMounted(() => { fetchLeaderboard(); });
watch(selectedMonth, () => { fetchLeaderboard(); });

const currentData = computed(() =>
  activeTab.value === 'monthly' ? leaderboardData.value.monthly || [] : leaderboardData.value.allTime || []
);

const formatMoney = (val) => {
  if (!val) return '0đ';
  return Math.round(Number(val)).toLocaleString('vi-VN') + 'đ';
};
</script>

<style scoped>
.admin-stat-card {
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
</style>
