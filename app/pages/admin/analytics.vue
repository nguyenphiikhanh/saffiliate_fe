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
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          <small>* Báo cáo sẽ được cập nhật mới vào cuối mỗi ngày</small>
        </p>
      </div>

      <div class="flex items-center gap-3">
        <span class="text-sm font-semibold text-slate-600 dark:text-slate-300">
          Thời gian:
        </span>
        <a-select
          v-model:value="timeFilter"
          style="width: 150px"
          @change="updateMockData"
        >
          <a-select-option value="all">Tất cả thời gian</a-select-option>
          <a-select-option value="today">Hôm nay</a-select-option>
          <a-select-option value="week">Tuần này</a-select-option>
          <a-select-option value="month">Tháng này</a-select-option>
        </a-select>
      </div>
    </div>

    <!-- Overview Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Tổng hoa hồng
            </div>
            <div
              class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              {{ formatMoney(mockStats.commissions.profit) }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500"
          >
            <DollarOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Phí dịch vụ(Dự kiến)
            </div>
            <div
              class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              {{ formatMoney(mockStats.commissions.profit) }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500"
          >
            <DollarOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Thuế(Dự kiến)
            </div>
            <div
              class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              {{ formatMoney(mockStats.commissions.profit) }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500"
          >
            <DollarOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
      <!-- Commission Card -->
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Lợi nhuận(Ước tính)
            </div>
            <div
              class="text-2xl font-bold text-emerald-600 dark:text-emerald-400"
            >
              {{ formatMoney(mockStats.commissions.profit) }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-500"
          >
            <DollarOutlined class="text-xl" />
          </div>
        </div>
      </a-card>

      <!-- Users Card -->
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Tổng người dùng
            </div>
            <div class="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {{ mockStats.users.total }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500"
          >
            <TeamOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Người dùng mới
            </div>
            <div class="text-2xl font-bold text-slate-800 dark:text-slate-100">
              {{ mockStats.users.total }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-500"
          >
            <TeamOutlined class="text-xl" />
          </div>
        </div>
      </a-card>

      <!-- Performance Card -->
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Tổng đơn hàng
            </div>
            <div
              class="text-2xl font-bold text-orange-600 dark:text-orange-400"
            >
              {{ mockStats.performance.linksWithOrders }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500"
          >
            <LinkOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
      <a-card :bordered="false" class="admin-stat-card">
        <div class="flex justify-between items-start">
          <div>
            <div
              class="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1"
            >
              Tỉ lệ đơn thành công(%)
            </div>
            <div
              class="text-2xl font-bold text-orange-600 dark:text-orange-400"
            >
              {{ mockStats.performance.linksWithOrders }}
            </div>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 flex items-center justify-center text-orange-500"
          >
            <LinkOutlined class="text-xl" />
          </div>
        </div>
      </a-card>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Orders Chart -->
      <a-card :bordered="false" class="admin-card">
        <template #title>
          <span class="font-bold">Đơn hàng</span>
        </template>
        <div ref="ordersChartRef" class="w-full h-[300px]"></div>
      </a-card>

      <!-- Commissions Chart -->
      <a-card :bordered="false" class="admin-card">
        <template #title>
          <span class="font-bold">Hoa hồng</span>
        </template>
        <div ref="commissionsChartRef" class="w-full h-[300px]"></div>
      </a-card>

      <!-- Withdrawals Chart -->
      <a-card :bordered="false" class="admin-card">
        <template #title>
          <span class="font-bold">Trạng thái Rút tiền</span>
        </template>
        <div ref="withdrawalsChartRef" class="w-full h-[300px]"></div>
      </a-card>

      <!-- Users & Links Chart -->
      <a-card :bordered="false" class="admin-card">
        <template #title>
          <span class="font-bold">Người dùng & Hiệu suất Link</span>
        </template>
        <div ref="usersLinksChartRef" class="w-full h-[300px]"></div>
      </a-card>
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
} from "@ant-design/icons-vue";

definePageMeta({ layout: "admin" });
useHead({ title: "Thống kê | Admin Saffiliate" });

const { isDark } = useTheme();

// Time Filter
const timeFilter = ref("all");

// Refs for chart DOM elements
const ordersChartRef = ref(null);
const commissionsChartRef = ref(null);
const withdrawalsChartRef = ref(null);
const usersLinksChartRef = ref(null);

// Echarts instances
let ordersChart = null;
let commissionsChart = null;
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
              value: mockStats.value.orders.completed,
              name: "Hoàn thành",
              itemStyle: { color: "#10b981" },
            },
            {
              value: mockStats.value.orders.pending,
              name: "Chờ duyệt",
              itemStyle: { color: "#f59e0b" },
            },
            {
              value: mockStats.value.orders.canceled,
              name: "Đã huỷ",
              itemStyle: { color: "#ef4444" },
            },
          ],
        },
      ],
    });
  }

  // 2. Commissions Chart (Bar)
  if (commissionsChartRef.value) {
    if (!commissionsChart)
      commissionsChart = markRaw(echarts.init(commissionsChartRef.value));
    commissionsChart.setOption({
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        backgroundColor: tooltipBg,
        textStyle: { color: textColor },
      },
      grid: { left: "3%", right: "4%", bottom: "3%", containLabel: true },
      xAxis: {
        type: "category",
        data: ["Ước tính", "Chờ hoàn", "Đã trả", "Lợi nhuận"],
        axisLabel: { color: textColor },
      },
      yAxis: { type: "value", axisLabel: { color: textColor } },
      series: [
        {
          data: [
            {
              value: mockStats.value.commissions.estimatedTotal,
              itemStyle: { color: "#3b82f6" },
            },
            {
              value: mockStats.value.commissions.pendingRefund,
              itemStyle: { color: "#f59e0b" },
            },
            {
              value: mockStats.value.commissions.paid,
              itemStyle: { color: "#10b981" },
            },
            {
              value: mockStats.value.commissions.profit,
              itemStyle: { color: "#8b5cf6" },
            },
          ],
          type: "bar",
          barWidth: "40%",
          itemStyle: { borderRadius: [4, 4, 0, 0] },
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
              value: mockStats.value.withdrawals.withdrawn,
              name: "Đã rút",
              itemStyle: { color: "#10b981" },
            },
            {
              value: mockStats.value.withdrawals.unwithdrawn,
              name: "Chưa rút",
              itemStyle: { color: "#64748b" },
            },
            {
              value: mockStats.value.withdrawals.pending,
              name: "Chờ duyệt",
              itemStyle: { color: "#f59e0b" },
            },
            {
              value: mockStats.value.withdrawals.canceled,
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
        data: ["Người dùng", "Hiệu suất Link"],
        axisLabel: { color: textColor },
      },
      series: [
        {
          name: "Tổng/Đã tạo",
          type: "bar",
          data: [
            mockStats.value.users.total,
            mockStats.value.performance.linksCreated,
          ],
          itemStyle: { color: "#94a3b8", borderRadius: [0, 4, 4, 0] },
        },
        {
          name: "Mới/Có đơn",
          type: "bar",
          data: [
            mockStats.value.users.new,
            mockStats.value.performance.linksWithOrders,
          ],
          itemStyle: { color: "#3b82f6", borderRadius: [0, 4, 4, 0] },
        },
      ],
    });
  }
};

const handleResize = () => {
  ordersChart?.resize();
  commissionsChart?.resize();
  withdrawalsChart?.resize();
  usersLinksChart?.resize();
};

onMounted(() => {
  renderCharts();
  window.addEventListener("resize", handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
  ordersChart?.dispose();
  commissionsChart?.dispose();
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
