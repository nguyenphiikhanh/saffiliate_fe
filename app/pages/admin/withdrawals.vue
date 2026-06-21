<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Yêu Cầu Rút Tiền
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Quản lý và duyệt các lệnh rút tiền từ người dùng.
        </p>
      </div>

      <a-button
        @click="refresh"
        :loading="pending"
        class="font-bold text-xs flex items-center gap-1"
      >
        <template #icon><SyncOutlined /></template>
        Làm mới
      </a-button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="p-5 ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Lệnh</div>
        <a-skeleton-button active v-if="pending && !response" size="small" class="mt-1" />
        <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-1">
          {{ withdrawals.length }}
        </div>
      </div>

      <div class="p-5 ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chờ Xử Lý</div>
        <a-skeleton-button active v-if="pending && !response" size="small" class="mt-1" />
        <div v-else class="text-xl font-bold text-amber-500 mt-1">
          {{ pendingCount }}
        </div>
      </div>

      <div class="p-5 ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Tiền (Chờ)</div>
        <a-skeleton-button active v-if="pending && !response" size="small" class="mt-1" />
        <div v-else class="text-xl font-bold text-rose-500 mt-1">
          {{ formatMoney(totalPendingAmount) }}
        </div>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div class="flex flex-wrap items-center gap-3 flex-1">
          <!-- Tìm kiếm mã GD -->
          <div class="flex items-center gap-2 max-w-sm w-full sm:w-auto">
            <a-input-search
              v-model:value="searchInput"
              placeholder="Tìm kiếm mã GD"
              enter-button="Tìm"
              @search="handleSearch"
              class="w-full sm:w-auto font-medium"
            />
          </div>

          <!-- Lọc trạng thái -->
          <div class="w-full sm:w-48">
            <a-select
              v-model:value="filterStatus"
              :options="statusOptions"
              class="w-full font-medium"
            />
          </div>

          <!-- Xóa bộ lọc -->
          <a-button
            v-if="searchQuery || filterStatus !== 'all' || searchInput"
            @click="clearAllFilters"
            type="text"
            danger
            class="font-bold text-xs flex items-center gap-1"
          >
            <template #icon><CloseOutlined /></template>
            Xóa bộ lọc
          </a-button>
        </div>

        <!-- Limit hiển thị -->
        <div class="flex items-center gap-1.5 whitespace-nowrap self-end sm:self-auto">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Hiển thị:</span>
          <a-select
            v-model:value="limit"
            :options="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 }
            ]"
            class="font-bold w-20"
          />
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <a-table
          :columns="columns"
          :dataSource="filteredWithdrawals"
          :rowKey="(record) => record.id"
          :pagination="false"
          :loading="pending && !response"
          :customRow="(record) => ({
            onClick: () => openDetails(record),
            class: 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 group'
          })"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'reference_id'">
              <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ record.reference_id }}</span>
            </template>
            <template v-else-if="column.key === 'user'">
              <div class="flex flex-col">
                <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">{{ record?.wallet?.user?.name || "Ẩn danh" }}</span>
                <span class="text-[11px] text-slate-500 font-medium mt-0.5 block truncate max-w-[150px]" :title="record?.wallet?.user?.email || 'N/A'">
                  {{ record?.wallet?.user?.email || "N/A" }}
                </span>
              </div>
            </template>
            <template v-else-if="column.key === 'created_at'">
              <div class="text-xs text-slate-500 font-medium">
                {{ new Date(record.created_at).toLocaleString("vi-VN") }}
              </div>
            </template>
            <template v-else-if="column.key === 'amount'">
              <div class="font-bold text-rose-500 text-[13px]">
                -{{ formatMoney(Math.abs(record.amount)) }}
              </div>
            </template>
            <template v-else-if="column.key === 'status'">
              <span
                class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-block"
                :class="
                  record.status === 'completed' || record.status === 'success' || record.status === 'approved'
                    ? 'bg-emerald-100 text-emerald-700'
                    : record.status === 'pending'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
                "
              >
                {{
                  record.status === "completed" || record.status === "success" || record.status === "approved"
                    ? "Thành công"
                    : record.status === "pending"
                    ? "Chờ duyệt"
                    : "Đã hủy"
                }}
              </span>
            </template>
          </template>
        </a-table>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div class="text-xs text-slate-500 font-medium">
          Trang {{ page }} / {{ totalPages }}
        </div>
        <a-pagination
          :current="page"
          :total="totalPages * limit"
          :pageSize="limit"
          show-less-items
          @change="(p) => page = p"
        />
      </div>
    </div>

    <!-- Detail Drawer -->
    <a-drawer
      v-model:open="isDrawerOpen"
      placement="right"
      width="450px"
      :closable="false"
      class="bg-white dark:bg-slate-950"
    >
      <template #title>
        <div v-if="selectedItem">
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">
            Chi Tiết Rút Tiền
          </h3>
          <p class="text-[11px] text-slate-500 font-medium mt-0.5">
            {{ selectedItem.reference_id || selectedItem.referenceId }}
          </p>
        </div>
      </template>
      <template #extra>
        <a-button type="text" @click="closeDetails"><CloseOutlined /></a-button>
      </template>

      <div v-if="selectedItem" class="flex flex-col gap-6">
        <!-- QR Code Section -->
        <div
          v-if="selectedItem.qr_code_url"
          class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800"
        >
          <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">
            Quét QR chuyển khoản
          </h4>
          <div class="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
            <img
              :src="selectedItem.qr_code_url"
              alt="QR Code"
              class="w-40 h-40 object-contain"
            />
          </div>
          <p class="text-[11px] text-slate-505 mt-4 text-center max-w-[250px]">
            Sử dụng App Ngân hàng để quét mã QR. Nội dung chuyển khoản đã được điền tự động.
          </p>
        </div>

        <!-- Detail Grid -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Trạng Thái</span>
            <span
              class="text-xs font-bold uppercase"
              :class="{
                'text-emerald-500': selectedItem.status === 'completed' || selectedItem.status === 'success',
                'text-amber-500': selectedItem.status === 'pending',
                'text-rose-500': selectedItem.status === 'rejected' || selectedItem.status === 'failed',
              }"
            >
              {{
                selectedItem.status === "completed" || selectedItem.status === "success"
                  ? "HOÀN THÀNH"
                  : selectedItem.status === "pending"
                  ? "CHỜ DUYỆT"
                  : "Đã HỦY"
              }}
            </span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Số Tiền</span>
            <span class="text-sm font-bold text-rose-550">{{ formatMoney(Math.abs(selectedItem.amount)) }}</span>
          </div>

          <div class="col-span-2 border-t border-slate-200 dark:border-slate-800 my-1"></div>

          <div class="flex flex-col gap-1">
            <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Khách Hàng</span>
            <span class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedItem?.wallet?.user?.name || "Ẩn danh" }}</span>
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Email</span>
            <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block truncate max-w-full" :title="selectedItem?.wallet?.user?.email || 'N/A'">
              {{ selectedItem?.wallet?.user?.email || "N/A" }}
            </span>
          </div>

          <div class="col-span-2 border-t border-slate-200 dark:border-slate-800 my-1"></div>

          <div class="col-span-2 flex flex-col gap-2">
            <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Mô Tả</span>
            <div class="text-sm font-medium text-slate-700 dark:text-slate-300 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed">
              {{ selectedItem.description || "Không có mô tả" }}
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div v-if="selectedItem">
          <!-- Reject Input Area -->
          <div v-if="showRejectInput" class="flex flex-col gap-3 w-full">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-slate-755 dark:text-slate-355">
                Lý do từ chối <span class="text-rose-500">*</span>
              </label>
              <a-textarea
                v-model:value="rejectReason"
                :maxlength="100"
                :rows="2"
                placeholder="Nhập lý do từ chối lệnh rút tiền này..."
                class="w-full text-xs font-medium"
              />
              <div class="flex justify-between items-center text-[10px]">
                <span v-if="rejectError" class="text-rose-500 font-medium">{{ rejectError }}</span>
                <span v-else class="text-slate-400"></span>
                <span class="text-slate-400">{{ rejectReason.length }}/100</span>
              </div>
            </div>
            <div class="flex items-center gap-3 w-full mt-2">
              <a-button
                @click="showRejectInput = false"
                class="flex-1 font-bold text-xs"
              >
                Hủy
              </a-button>
              <a-button
                @click="submitUpdateStatus('rejected')"
                :loading="isUpdating"
                danger
                type="primary"
                class="flex-1 font-bold text-xs"
              >
                Xác nhận từ chối
              </a-button>
            </div>
          </div>

          <!-- Normal Actions -->
          <div v-else class="flex items-center justify-end gap-3 w-full">
            <template v-if="selectedItem.status === 'pending'">
              <a-button
                @click="showRejectInput = true"
                danger
                class="flex-1 font-bold text-xs"
              >
                Từ Chối
              </a-button>
              <a-button
                @click="submitUpdateStatus('success')"
                :loading="isUpdating"
                type="primary"
                class="flex-1 font-bold text-xs bg-emerald-500 hover:bg-emerald-600 border-transparent"
              >
                Duyệt Lệnh
              </a-button>
            </template>
            <template v-else-if="selectedItem.status === 'rejected'">
              <div class="w-full p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/30 text-xs font-medium text-rose-600 dark:text-rose-400">
                <span class="font-bold block mb-1">Lý do từ chối:</span>
                {{ selectedItem.rejectReason || "Không có lý do cụ thể" }}
              </div>
            </template>
          </div>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { SyncOutlined, CloseOutlined } from "@ant-design/icons-vue";

const columns = [
  { title: 'Mã GD', key: 'reference_id', width: '20%' },
  { title: 'Người Dùng', key: 'user', width: '25%' },
  { title: 'Thời Gian', key: 'created_at', width: '20%' },
  { title: 'Số Tiền', key: 'amount', align: 'right', width: '20%' },
  { title: 'Trạng Thái', key: 'status', align: 'center', width: '15%' }
];

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Yêu Cầu Rút Tiền | Admin Saffiliate",
});

const page = ref(1);
const limit = ref(20);
const searchQuery = ref("");
const searchInput = ref("");
const filterStatus = ref("all");
const selectedItem = ref(null);

const statusOptions = [
  { label: "Tất cả trạng thái", value: "all" },
  { label: "Chờ xử lý", value: "pending" },
  { label: "Đã hoàn thành", value: "success" },
  { label: "Đã hủy", value: "rejected" }
];

const isDrawerOpen = computed({
  get: () => !!selectedItem.value,
  set: (val) => {
    if (!val) selectedItem.value = null;
  }
});

const handleSearch = () => {
  searchQuery.value = searchInput.value.trim();
};

const clearAllFilters = () => {
  searchInput.value = "";
  searchQuery.value = "";
  filterStatus.value = "all";
};

const queryParams = computed(() => {
  const params = {
    page: page.value,
    limit: limit.value,
  };
  if (searchQuery.value.trim()) {
    params.search = searchQuery.value.trim();
  }
  if (filterStatus.value && filterStatus.value !== "all") {
    params.status = filterStatus.value;
  }
  return params;
});

const token = useCookie("auth_token");
const {
  data: response,
  refresh,
  pending,
} = await useFetch("/api/wallet/withdrawals", {
  headers: computed(() => ({
    Authorization: token.value ? `Bearer ${token.value}` : "",
  })),
  query: queryParams,
  lazy: true,
  watch: [page, limit, searchQuery, filterStatus],
});

const withdrawals = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
  if (res.data?.items) return res.data.items;
  if (res.data && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const totalPages = computed(() => {
  const res = response.value;
  if (!res) return 1;
  const target = res.data || res;
  if (target.last_page !== undefined) return target.last_page;
  if (target.meta?.last_page !== undefined) return target.meta.last_page;
  return 1;
});

// Reset page when filters or limit change
watch([limit, searchQuery, filterStatus], () => {
  page.value = 1;
});

const pendingCount = computed(() => {
  return withdrawals.value.filter((item) => item.status === "pending").length;
});

const totalPendingAmount = computed(() => {
  return withdrawals.value
    .filter((item) => item.status === "pending")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
});

const filteredWithdrawals = computed(() => {
  return withdrawals.value;
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return val.toLocaleString("vi-VN") + "đ";
};

const isUpdating = ref(false);
const showRejectInput = ref(false);
const rejectReason = ref("");
const rejectError = ref("");

const { api } = useAppFetch();

const openDetails = (item) => {
  selectedItem.value = item;
  showRejectInput.value = false;
  rejectReason.value = "";
  rejectError.value = "";
};

const closeDetails = () => {
  selectedItem.value = null;
  showRejectInput.value = false;
};

watch(selectedItem, (newVal) => {
  if (typeof document !== "undefined") {
    if (newVal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
});

onUnmounted(() => {
  if (typeof document !== "undefined") {
    document.body.style.overflow = "";
  }
});

const submitUpdateStatus = async (status) => {
  if (!selectedItem.value) return;

  if (status === "rejected") {
    if (!rejectReason.value.trim()) {
      rejectError.value = "Vui lòng nhập lý do từ chối";
      return;
    }
    if (rejectReason.value.length > 100) {
      rejectError.value = "Lý do không được vượt quá 100 ký tự";
      return;
    }
  }

  isUpdating.value = true;
  rejectError.value = "";

  try {
    const payload = { status };
    if (status === "rejected") {
      payload.rejectReason = rejectReason.value.trim();
    }

    const res = await api.put(
      `/wallet/withdrawals/${selectedItem.value.id}/status`,
      payload
    );

    if (res.success !== false) {
      await refresh();
      closeDetails();
    }
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái:", err);
    rejectError.value =
      err.data?.message || err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
  } finally {
    isUpdating.value = false;
  }
};
</script>
