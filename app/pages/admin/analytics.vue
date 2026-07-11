<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header & Filters -->
    <div
      class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
    >
      <div>
        <h2
          class="text-xl font-bold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          Thống kê chi tiết
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Dữ liệu trực quan về đơn hàng, doanh thu và hiệu suất người dùng.
        </p>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1.5">
          <ClockCircleOutlined class="text-emerald-500" />
          <small>
            Báo cáo sẽ được làm mới sau
            <span class="font-bold text-emerald-600 dark:text-emerald-400 font-mono bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded border border-emerald-100 dark:border-emerald-800/50">{{ timeUntilNextUpdate }}</span>
          </small>
        </p>
      </div>
    </div>

    <!-- Section 1: Tài chính -->
    <div>
      <h3
        class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-600"
        >
          <DollarOutlined />
        </span>
        Doanh thu & Dòng tiền
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-transparent dark:from-emerald-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="commissionAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Hoa hồng sàn
              </div>
              <div
                class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
              >
                {{ formatMoney(commissionAnalytic.total_commission) }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white shadow-emerald-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <BankOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-transparent dark:from-blue-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="commissionAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Hoa hồng người dùng
              </div>
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{ formatMoney(commissionAnalytic.total_user_commission) }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white shadow-blue-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <UserOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-rose-100 to-transparent dark:from-rose-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="commissionAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Phí dịch vụ + Thuế
              </div>
              <div class="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {{ formatMoney(commissionAnalytic.total_fee) }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white shadow-rose-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <PercentageOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-amber-100 to-transparent dark:from-amber-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="commissionAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Lợi nhuận (Ước tính)
              </div>
              <div
                class="text-2xl font-bold text-amber-600 dark:text-amber-400"
              >
                {{ formatMoney(commissionAnalytic.total_profit) }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-amber-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <MoneyCollectOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>
      </div>
    </div>

    <!-- Section 2: Người dùng -->
    <div>
      <h3
        class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600"
        >
          <TeamOutlined />
        </span>
        Thống kê Người dùng
      </h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-transparent dark:from-purple-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="userAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Tổng người dùng
              </div>
              <div
                class="text-2xl font-bold text-slate-800 dark:text-slate-100"
              >
                {{ userAnalytic.total_users }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white shadow-purple-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <TeamOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-indigo-100 to-transparent dark:from-indigo-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="userAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Người dùng mới
              </div>
              <div
                class="text-2xl font-bold text-slate-800 dark:text-slate-100"
              >
                {{ userAnalytic.new_users }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white shadow-indigo-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <UserAddOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-orange-100 to-transparent dark:from-orange-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="userAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Đã có đơn hàng
              </div>
              <div
                class="text-2xl font-bold text-orange-600 dark:text-orange-400"
              >
                {{ userAnalytic.users_with_orders }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white shadow-orange-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <ShoppingCartOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>

        <a-card
          :bordered="false"
          class="admin-stat-card group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
        >
          <div
            class="absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-transparent dark:from-pink-900/20 opacity-50 group-hover:scale-150 transition-transform duration-500"
          ></div>
          <a-skeleton
            active
            :paragraph="{ rows: 1 }"
            v-if="userAnalyticPending"
          />
          <div v-else class="flex justify-between items-center relative z-10">
            <div>
              <div
                class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
              >
                Đã tạo link
              </div>
              <div class="text-2xl font-bold text-pink-600 dark:text-pink-400">
                {{ userAnalytic.users_generate_link }}
              </div>
            </div>
            <div
              class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white shadow-pink-500/30 shadow-lg transform -rotate-6 group-hover:rotate-0 transition-transform duration-300"
            >
              <LinkOutlined class="text-2xl" />
            </div>
          </div>
        </a-card>
      </div>
    </div>

    <!-- Section 3: Biểu đồ -->
    <div>
      <h3
        class="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2"
      >
        <span
          class="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-blue-600"
        >
          <LineChartOutlined />
        </span>
        Biểu đồ Trực quan
      </h3>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Orders Chart -->
        <a-card
          :bordered="false"
          class="admin-card border-t-4 border-emerald-500 hover:shadow-xl transition-shadow duration-300"
        >
          <template #title>
            <span class="font-bold text-emerald-700 dark:text-emerald-400"
              >Đơn hàng ({{ orderAnalytic.total_orders }})</span
            >
          </template>
          <div ref="ordersChartRef" class="w-full h-[300px]"></div>
        </a-card>

        <!-- Withdrawals Chart -->
        <a-card
          :bordered="false"
          class="admin-card border-t-4 border-amber-500 hover:shadow-xl transition-shadow duration-300"
        >
          <template #title>
            <span class="font-bold text-amber-700 dark:text-amber-400"
              >Dòng tiền từ người dùng</span
            >
          </template>
          <div ref="withdrawalsChartRef" class="w-full h-[300px]"></div>
        </a-card>

        <!-- Users & Links Chart -->
        <a-card
          :bordered="false"
          class="admin-card lg:col-span-2 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300"
        >
          <template #title>
            <span class="font-bold text-blue-700 dark:text-blue-400"
              >Hiệu suất tiếp thị</span
            >
          </template>
          <div ref="usersLinksChartRef" class="w-full h-[300px]"></div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch, markRaw } from "vue";
import { useTheme } from "@/composables/useTheme";
import * as echarts from "echarts";
import {
  ShoppingCartOutlined,
  DollarOutlined,
  TeamOutlined,
  LinkOutlined,
  UserAddOutlined,
  BankOutlined,
  UserOutlined,
  PercentageOutlined,
  MoneyCollectOutlined,
  LineChartOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons-vue";

definePageMeta({ layout: "admin" });
useHead({ title: "Thống kê | Saffi Admin" });

const { isDark } = useTheme();

const timeUntilNextUpdate = ref("00:00:00");
let countdownInterval = null;

const updateCountdown = () => {
  const now = new Date();
  const currentHour = now.getHours();
  let nextHour = 24;

  if (currentHour < 6) nextHour = 6;
  else if (currentHour < 12) nextHour = 12;
  else if (currentHour < 18) nextHour = 18;

  const nextUpdate = new Date();
  nextUpdate.setHours(nextHour, 0, 0, 0);

  const diffMs = nextUpdate - now;
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

  timeUntilNextUpdate.value = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
};

const { api } = useAppFetch();

// Fetch API for Commission Analytics
const { data: commissionAnalyticRes, pending: commissionAnalyticPending } =
  useLazyAsyncData(
    "commission-analytic",
    () =>
      api.get("/admin/analytics", { query: { key: "commission-analytic" } }),
    { server: false }
  );

const commissionAnalytic = computed(
  () =>
    commissionAnalyticRes.value?.data || {
      total_commission: 0,
      total_user_commission: 0,
      total_fee: 0,
      total_profit: 0,
    }
);

// Fetch API for Order Analytics
const { data: orderAnalyticRes } = useLazyAsyncData(
  "order-analytic",
  () => api.get("/admin/analytics", { query: { key: "order-analytic" } }),
  { server: false }
);

const orderAnalytic = computed(
  () =>
    orderAnalyticRes.value?.data || {
      total_orders: 0,
      completed_orders: 0,
      pending_orders: 0,
      cancelled_orders: 0,
    }
);

// Fetch API for Wallet Analytics
const { data: walletAnalyticRes } = useLazyAsyncData(
  "wallet-analytic",
  () => api.get("/admin/analytics", { query: { key: "wallet-analytic" } }),
  { server: false }
);

const walletAnalytic = computed(
  () =>
    walletAnalyticRes.value?.data || {
      available_balance: 0,
      pending_balance: 0,
      rejected_balance: 0,
      total_paid: 0,
    }
);

// Fetch API for Marketing Analytics
const { data: marketingAnalyticRes } = useLazyAsyncData(
  "affiliate-analytic",
  () => api.get("/admin/analytics", { query: { key: "affiliate-analytic" } }),
  { server: false }
);

const marketingAnalytic = computed(
  () =>
    marketingAnalyticRes.value?.data || {
      total_links: 0,
      shopee_links: 0,
      lazada_links: 0,
      tiktok_links: 0,
      total_orders: 0,
      shopee_orders: 0,
      tiktok_orders: 0,
      lazada_orders: 0,
    }
);

watch([orderAnalyticRes, walletAnalyticRes, marketingAnalyticRes], () => {
  if (process.client) renderCharts();
});

// Fetch API for User Analytics
const { data: userAnalyticRes, pending: userAnalyticPending } =
  useLazyAsyncData(
    "user-analytic",
    () => api.get("/admin/analytics", { query: { key: "user-analytic" } }),
    { server: false }
  );

const userAnalytic = computed(
  () =>
    userAnalyticRes.value?.data || {
      total_users: 0,
      new_users: 0,
      users_with_orders: 0,
      users_generate_link: 0,
    }
);

// Time Filter
const timeFilter = ref("all");

// Refs for chart DOM elements
const ordersChartRef = ref(null);
const withdrawalsChartRef = ref(null);
const usersLinksChartRef = ref(null);

// Echarts instances
let ordersChart = null;
let withdrawalsChart = null;
let usersLinksChart = null;

// Mock Data State
const mockStats = ref({
  orders: {
    pending: 45,
    canceled: 12,
    completed: 120,
    completionRate: 67.8,
    cancelationRate: 6.7,
  },
  commissions: {
    estimatedTotal: 25000000,
    pendingRefund: 1500000,
    paid: 18000000,
    profit: 5500000,
  },
  withdrawals: {
    withdrawn: 15000000,
    unwithdrawn: 3000000,
    pending: 2000000,
    canceled: 500000,
  },
  users: {
    new: 15,
    total: 350,
    withOrders: 85,
  },
  performance: {
    linksCreated: 1200,
    linksWithOrders: 320,
  },
});

const formatMoney = (val) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(val);
};

// Generates random data for filtering
const updateMockData = () => {
  const multiplier =
    timeFilter.value === "today"
      ? 0.1
      : timeFilter.value === "week"
      ? 0.3
      : timeFilter.value === "month"
      ? 0.7
      : 1;

  mockStats.value = {
    orders: {
      pending: Math.floor(45 * multiplier) + 1,
      canceled: Math.floor(12 * multiplier),
      completed: Math.floor(120 * multiplier) + 5,
      completionRate: (67.8 + Math.random() * 10 - 5).toFixed(1),
      cancelationRate: (6.7 + Math.random() * 2 - 1).toFixed(1),
    },
    commissions: {
      estimatedTotal: 25000000 * multiplier,
      pendingRefund: 1500000 * multiplier,
      paid: 18000000 * multiplier,
      profit: 5500000 * multiplier,
    },
    withdrawals: {
      withdrawn: 15000000 * multiplier,
      unwithdrawn: 3000000 * multiplier,
      pending: 2000000 * multiplier,
      canceled: 500000 * multiplier,
    },
    users: {
      new: Math.floor(15 * multiplier),
      total: Math.floor(350 * multiplier),
      withOrders: Math.floor(85 * multiplier),
    },
    performance: {
      linksCreated: Math.floor(1200 * multiplier),
      linksWithOrders: Math.floor(320 * multiplier),
    },
  };

  renderCharts();
};

const getTextColor = () => (isDark.value ? "#cbd5e1" : "#475569");
const getTooltipBg = () => (isDark.value ? "#1e293b" : "#ffffff");

const renderCharts = () => {
  const textColor = getTextColor();
  const tooltipBg = getTooltipBg();

  // 1. Orders Chart (Pie)
  if (ordersChartRef.value) {
    if (!ordersChart) ordersChart = markRaw(echarts.init(ordersChartRef.value));
    ordersChart.setOption({
      tooltip: {
        trigger: "item",
        backgroundColor: tooltipBg,
        textStyle: { color: textColor },
      },
      legend: { bottom: "0", textStyle: { color: textColor } },
      series: [
        {
          name: "Đơn hàng",
          type: "pie",
          radius: ["40%", "70%"],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: isDark.value ? "#0b0f19" : "#fff",
            borderWidth: 2,
          },
          label: { show: false, position: "center" },
          emphasis: { label: { show: true, fontSize: 20, fontWeight: "bold" } },
          labelLine: { show: false },
          data: [
            {
              value: Number(orderAnalytic.value.completed_orders) || 0,
              name: "Hoàn thành",
              itemStyle: { color: "#10b981" },
            },
            {
              value: Number(orderAnalytic.value.pending_orders) || 0,
              name: "Chờ duyệt",
              itemStyle: { color: "#f59e0b" },
            },
            {
              value: Number(orderAnalytic.value.cancelled_orders) || 0,
              name: "Đã huỷ",
              itemStyle: { color: "#ef4444" },
            },
          ],
        },
      ],
    });
  }

  // 3. Withdrawals Chart (Doughnut)
  if (withdrawalsChartRef.value) {
    if (!withdrawalsChart)
      withdrawalsChart = markRaw(echarts.init(withdrawalsChartRef.value));
    withdrawalsChart.setOption({
      tooltip: {
        trigger: "item",
        backgroundColor: tooltipBg,
        textStyle: { color: textColor },
      },
      legend: { bottom: "0", textStyle: { color: textColor } },
      series: [
        {
          name: "Rút tiền",
          type: "pie",
          radius: "70%",
          data: [
            {
              value: Number(walletAnalytic.value.total_paid) || 0,
              name: "Đã rút",
              itemStyle: { color: "#10b981" },
            },
            {
              value: Number(walletAnalytic.value.available_balance) || 0,
              name: "Chưa rút",
              itemStyle: { color: "#64748b" },
            },
            {
              value: Number(walletAnalytic.value.pending_balance) || 0,
              name: "Chờ duyệt",
              itemStyle: { color: "#f59e0b" },
            },
            {
              value: Number(walletAnalytic.value.rejected_balance) || 0,
              name: "Đã huỷ",
              itemStyle: { color: "#ef4444" },
            },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    });
  }

  // 4. Users & Links (Multiple Bars)
  if (usersLinksChartRef.value) {
    if (!usersLinksChart)
      usersLinksChart = markRaw(echarts.init(usersLinksChartRef.value));
    usersLinksChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: tooltipBg,
        textStyle: { color: textColor },
      },
      legend: { textStyle: { color: textColor } },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: { type: "value", axisLabel: { color: textColor } },
      yAxis: {
        type: "category",
        data: ["TikTok", "Lazada", "Shopee", "Tổng"],
        axisLabel: { color: textColor },
      },
      series: [
        {
          name: "Link đã tạo",
          type: "bar",
          data: [
            Number(marketingAnalytic.value.tiktok_links) || 0,
            Number(marketingAnalytic.value.lazada_links) || 0,
            Number(marketingAnalytic.value.shopee_links) || 0,
            Number(marketingAnalytic.value.total_links) || 0,
          ],
          itemStyle: { color: "#94a3b8", borderRadius: [0, 4, 4, 0] },
        },
        {
          name: "Phát sinh đơn",
          type: "bar",
          data: [
            Number(marketingAnalytic.value.tiktok_orders) || 0,
            Number(marketingAnalytic.value.lazada_orders) || 0,
            Number(marketingAnalytic.value.shopee_orders) || 0,
            Number(marketingAnalytic.value.total_orders) || 0,
          ],
          itemStyle: { color: "#3b82f6", borderRadius: [0, 4, 4, 0] },
        },
      ],
    });
  }
};

const handleResize = () => {
  ordersChart?.resize();
  withdrawalsChart?.resize();
  usersLinksChart?.resize();
};

onMounted(() => {
  updateCountdown();
  countdownInterval = setInterval(updateCountdown, 1000);
  renderCharts();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  if (countdownInterval) clearInterval(countdownInterval);
  window.removeEventListener("resize", handleResize);
  ordersChart?.dispose();
  withdrawalsChart?.dispose();
  usersLinksChart?.dispose();
});

// Re-render charts when theme changes
watch(isDark, () => {
  renderCharts();
});
</script>

<style scoped>
.admin-stat-card {
  border-radius: 12px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
</style>
