<template>
  <a-card :bordered="false" class="admin-card h-full flex flex-col">
    <template #title>
      <div class="flex items-center gap-2">
        <HistoryOutlined class="text-indigo-500 text-lg" />
        <span class="font-extrabold text-slate-800 dark:text-slate-100"
          >Giao dịch gần đây</span
        >
      </div>
    </template>

    <div
      class="flex flex-col gap-4 overflow-y-auto pr-2"
      style="max-height: 500px"
    >
      <div
        v-if="historyLoading && historyPage === 1"
        class="flex justify-center py-8"
      >
        <a-spin />
      </div>

      <a-empty
        v-else-if="historyTransactions.length === 0"
        description="Chưa có giao dịch nào"
        :image="simpleImage"
      />

      <template v-else>
        <div
          v-for="item in historyTransactions"
          :key="item.id"
          class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 last:border-0 last:pb-0"
        >
          <div class="flex items-center gap-3">
            <div
              class="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700"
            >
              <BankOutlined
                v-if="item.type === 'commission'"
                class="text-emerald-500"
              />
              <DollarOutlined v-else class="text-rose-500" />
            </div>
            <div>
              <div class="text-sm text-slate-800 dark:text-slate-100">
                <template v-if="item.type === 'withdrawal'">
                  <span class="font-bold text-orange-600 dark:text-orange-500">{{ item.wallet?.user?.name || 'Người dùng' }}</span> đã thực hiện rút tiền
                </template>
                <template v-else>
                  Hoàn tiền cho <span class="font-bold text-orange-600 dark:text-orange-500">{{ item.wallet?.user?.name || 'Người dùng' }}</span>
                </template>
              </div>
              <div class="text-[11px] text-slate-500">
                {{ formatRelativeTime(item.created_at) }}
              </div>
            </div>
          </div>
          <div class="text-right">
            <div
              class="text-sm font-black"
              :class="
                item.amount > 0
                  ? 'text-emerald-600'
                  : 'text-slate-700 dark:text-slate-200'
              "
            >
              {{ item.amount > 0 ? "+" : "-"
              }}{{ formatMoney(Math.abs(item.amount)) }}
            </div>
            <a-tag
              :color="
                item.status === 'success' || item.status === 'completed'
                  ? 'success'
                  : item.status === 'pending'
                  ? 'warning'
                  : 'error'
              "
              class="mr-0 mt-1 uppercase"
              style="font-size: 10px; line-height: 14px"
            >
              {{
                item.status === "success" || item.status === "completed"
                  ? "THÀNH CÔNG"
                  : item.status === "pending"
                  ? "ĐANG XỬ LÝ"
                  : "ĐÃ HỦY"
              }}
            </a-tag>
          </div>
        </div>

        <!-- Nút Xem thêm -->
        <div
          v-if="historyPage < historyTotalPages"
          class="flex justify-center mt-3 pt-2 border-t border-slate-100 dark:border-slate-800"
        >
          <a-button
            type="text"
            :loading="historyLoading"
            @click="loadMoreHistory"
            class="w-full h-10 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-orange-600 dark:text-orange-500 font-bold transition-all border border-transparent hover:border-orange-200 dark:hover:border-orange-900/30 flex items-center justify-center gap-1.5 shadow-sm"
          >
            <template #icon v-if="!historyLoading">
              <DownOutlined class="text-[12px]" />
            </template>
            Xem thêm
          </a-button>
        </div>
      </template>
    </div>
  </a-card>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { Empty } from "ant-design-vue";
import {
  HistoryOutlined,
  BankOutlined,
  DollarOutlined,
  DownOutlined,
} from "@ant-design/icons-vue";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const $router = useRouter();
const simpleImage = Empty.PRESENTED_IMAGE_SIMPLE;

// History Transactions
const historyPage = ref(1);
const historyTransactions = ref([]);
const historyTotalPages = ref(1);
const historyLoading = ref(false);

const fetchHistoryTransactions = async (isLoadMore = false) => {
  if (historyLoading.value && isLoadMore) return;
  historyLoading.value = true;
  try {
    const res = await useAppFetch().api.get("/admin/history-transaction", {
      query: { page: historyPage.value, limit: 20 },
    });

    const data = res.data?.data || res.data || [];
    if (isLoadMore) {
      historyTransactions.value = [...historyTransactions.value, ...data];
    } else {
      historyTransactions.value = data;
    }

    const lastPage =
      res.last_page !== undefined
        ? res.last_page
        : res.data?.last_page || res.data?.totalPages || 1;
    historyTotalPages.value = lastPage;
  } catch (err) {
    console.error("Failed to fetch recent transactions", err);
  } finally {
    historyLoading.value = false;
  }
};

const loadMoreHistory = () => {
  if (historyPage.value < historyTotalPages.value) {
    historyPage.value++;
    fetchHistoryTransactions(true);
  }
};

onMounted(() => {
  fetchHistoryTransactions();
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return Math.round(Number(val)).toLocaleString("vi-VN") + "đ";
};

const formatRelativeTime = (dateString) => {
  if (!dateString) return "";
  const date = dayjs(dateString);
  const now = dayjs();
  const diffMinutes = now.diff(date, "minute");
  const diffHours = now.diff(date, "hour");
  const diffDays = now.diff(date, "day");

  if (diffDays > 90) {
    return date.toDate().toLocaleString("vi-VN");
  }

  if (diffMinutes < 1) return "Vừa xong";
  if (diffMinutes < 60) return `${diffMinutes} phút trước`;
  if (diffHours < 24) return `${diffHours} giờ trước`;
  return `${diffDays} ngày trước`;
};
</script>

<style scoped>
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
</style>
