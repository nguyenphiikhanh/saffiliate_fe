<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quản lý Đơn hàng</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Theo dõi, đối soát và upload dữ liệu đơn hàng từ mạng Affiliate.</p>
      </div>
      <div class="flex items-center gap-3">
        <a-button type="default" @click="showSyncModal = true" class="font-semibold">
          <template #icon><SyncOutlined /></template>
          Đồng bộ ID
        </a-button>
        <a-button type="primary" @click="showUploadModal = true" class="font-semibold">
          <template #icon><UploadOutlined /></template>
          Upload CSV
        </a-button>
      </div>
    </div>

    <!-- Stats Cards -->
    <a-row :gutter="[16, 16]">
      <a-col :xs="12" :sm="12" :lg="{ span: 24 / 5 }">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-skeleton-button active v-if="pending && !response" block />
          <a-statistic v-else title="Tổng đơn hàng" :value="orders?.length || 0" />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="{ span: 24 / 5 }">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-skeleton-button active v-if="pending && !response" block />
          <a-statistic v-else title="Chờ duyệt" :value="pendingCount" :value-style="{ color: '#f59e0b' }" />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="{ span: 24 / 5 }">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-skeleton-button active v-if="pending && !response" block />
          <a-statistic v-else title="Hoa hồng sàn" :value="formatMoney(totalCommission)" />
        </a-card>
      </a-col>
      <a-col :xs="12" :sm="12" :lg="{ span: 24 / 5 }">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-skeleton-button active v-if="pending && !response" block />
          <a-statistic v-else title="Hoa hồng User" :value="formatMoney(totalUserCommission)" :value-style="{ color: '#059669' }" />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="12" :lg="{ span: 24 / 5 }">
        <a-card size="small" :bordered="false" class="admin-stat-card">
          <a-skeleton-button active v-if="pending && !response" block />
          <a-statistic v-else title="Doanh thu (Lợi nhuận)" :value="formatMoney(systemRevenue)" />
        </a-card>
      </a-col>
    </a-row>

    <!-- Data Table -->
    <a-card :bordered="false" class="admin-card" :body-style="{ padding: 0 }">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-3">
        <a-button
          @click="showUserModal = true"
          :type="selectedUserFilter ? 'primary' : 'default'"
          :ghost="!!selectedUserFilter"
          class="font-medium text-xs"
        >
          <template #icon><UserOutlined /></template>
          <span class="max-w-[160px] truncate inline-block">{{ selectedUserFilter ? (selectedUserFilter.name || selectedUserFilter.email) : 'Tìm theo người dùng' }}</span>
          <CloseOutlined v-if="selectedUserFilter" class="ml-1 hover:text-rose-500" @click.stop="clearUserFilter" />
        </a-button>

        <a-select
          v-model:value="selectedStatus"
          :options="[
            { label: 'Tất cả trạng thái', value: 'all' },
            { label: 'Chờ duyệt', value: 'pending' },
            { label: 'Thành công', value: 'success' },
            { label: 'Đã hủy', value: 'cancelled' },
          ]"
          style="width: 180px"
        />

        <a-select
          v-model:value="limit"
          :options="[
            { label: '20 / trang', value: 20 },
            { label: '50 / trang', value: 50 },
            { label: '100 / trang', value: 100 },
          ]"
          style="width: 120px"
        />

        <a-button v-if="selectedStatus !== 'all' || selectedUserFilter" @click="clearAllFilters" type="text" danger>
          <template #icon><DeleteOutlined /></template>
          Xóa bộ lọc
        </a-button>
      </div>

      <!-- Table with scroll.x — works on all screen sizes -->
      <a-table
        :columns="columns"
        :data-source="filteredOrders"
        :row-key="(r) => r.order_id"
        :pagination="false"
        :loading="pending && !response"
        :scroll="{ x: 800 }"
        :custom-row="(record) => ({
          onClick: () => openOrderDetails(record),
          class: 'cursor-pointer',
        })"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'order_id'">
            <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ record.order_id }}</span>
          </template>

          <template v-else-if="column.key === 'user'">
            <div v-if="record.user_id" class="flex flex-col">
              <span class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]">{{ record.user_name || 'N/A' }}</span>
              <span class="text-[11px] text-slate-500 truncate max-w-[140px] font-medium mt-0.5">{{ record.user_email }}</span>
            </div>
            <span class="text-xs text-slate-400 italic" v-else>Không rõ</span>
          </template>

          <template v-else-if="column.key === 'product_name'">
            <div class="font-semibold text-slate-700 dark:text-slate-300 text-[13px] truncate max-w-[200px]" :title="record.product_name">
              {{ record.product_name || 'Sản phẩm từ Shopee' }}
            </div>
          </template>

          <template v-else-if="column.key === 'order_time'">
            <span class="text-xs text-slate-500 font-medium">{{ new Date(record.order_time || Date.now()).toLocaleDateString('vi-VN') }}</span>
          </template>

          <template v-else-if="column.key === 'actual_commission'">
            <span class="font-bold text-slate-800 dark:text-slate-200 text-[13px]">{{ Math.round(record.actual_commission || 0).toLocaleString('vi-VN') }}đ</span>
          </template>

          <template v-else-if="column.key === 'user_commission'">
            <span class="font-bold text-emerald-600 dark:text-emerald-500 text-[13px]">{{ Math.round(record.user_commission || 0).toLocaleString('vi-VN') }}đ</span>
          </template>

          <template v-else-if="column.key === 'order_status'">
            <a-tag :color="getStatusColor(record.order_status)">{{ getStatusLabel(record.order_status) }}</a-tag>
          </template>

          <template v-else-if="column.key === 'action'">
            <RightOutlined class="text-slate-400" />
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div class="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span class="text-xs text-slate-500">{{ paginationText }}</span>
        <a-pagination
          v-if="totalPages > 1"
          :current="currentPage"
          :total="totalPages * limit"
          :page-size="limit"
          show-less-items
          @change="(page) => currentPage = page"
        />
      </div>
    </a-card>

    <!-- Upload Modal -->
    <a-modal v-model:open="showUploadModal" title="Upload dữ liệu đối soát" :footer="null">
      <div class="relative">
        <!-- Loading overlay -->
        <div v-if="isUploading" class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 z-10 flex flex-col items-center justify-center rounded-xl">
          <a-spin size="large" />
          <p class="text-sm font-bold text-slate-700 dark:text-slate-300 mt-3">Đang xử lý...</p>
        </div>

        <input type="file" ref="fileInput" class="hidden" accept=".csv" @change="handleFileSelect" />

        <!-- Drop zone -->
        <div
          v-if="!selectedFile"
          @click="triggerFileInput"
          @dragover.prevent
          @drop.prevent="onDrop"
          class="mt-4 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:border-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
        >
          <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 mb-3">
            <UploadOutlined class="text-2xl" />
          </div>
          <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Kéo thả file CSV vào đây</h4>
          <p class="text-[11px] text-slate-500 mb-4">hoặc click để chọn file từ máy tính</p>
          <a-button>Chọn file</a-button>
        </div>

        <!-- File selected -->
        <div v-else class="mt-4 border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center text-center bg-slate-50 dark:bg-slate-800/30">
          <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 mb-3">
            <FileDoneOutlined class="text-xl" />
          </div>
          <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 truncate max-w-full">{{ selectedFile.name }}</h4>
          <p class="text-[11px] text-slate-500 mb-5">{{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
          <a-space>
            <a-button @click="selectedFile = null">Hủy</a-button>
            <a-button type="primary" @click="confirmUpload">Upload</a-button>
          </a-space>
        </div>

        <div class="mt-4 flex items-start gap-2">
          <InfoCircleOutlined class="text-slate-400 mt-0.5 shrink-0" />
          <p class="text-[11px] text-slate-500 leading-relaxed">File CSV phải được trích xuất từ báo cáo của Shopee Affiliate. Hệ thống sẽ so khớp <span class="font-bold">Mã Đơn</span>.</p>
        </div>
      </div>
    </a-modal>

    <!-- Sync Modal -->
    <a-modal v-model:open="showSyncModal" title="Đồng bộ Đơn hàng thủ công" @ok="confirmSync" :confirmLoading="isSyncing" okText="Đồng bộ" cancelText="Hủy">
      <div class="py-4">
        <p class="text-sm text-slate-600 dark:text-slate-400 mb-2">Nhập mã đơn hàng (Order ID) để đồng bộ dữ liệu:</p>
        <a-input v-model:value="syncOrderId" placeholder="Ví dụ: 123456789" allow-clear @pressEnter="confirmSync" />
      </div>
    </a-modal>

    <!-- Order Details Drawer -->
    <a-drawer v-model:open="isDrawerOpen" placement="right" width="450px" :closable="false">
      <template #title>
        <div v-if="selectedOrder" class="flex flex-col gap-1">
          <a-tag :color="getStatusColor(selectedOrder.order_status)">{{ getStatusLabel(selectedOrder.order_status) }}</a-tag>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Chi tiết đơn hàng #{{ selectedOrder.order_id }}</h3>
          <p class="text-xs text-slate-500">Cửa hàng: {{ selectedOrder.shop_name || 'Shopee Store' }}</p>
        </div>
      </template>
      <template #extra>
        <a-button type="text" @click="closeOrderDetails"><CloseOutlined /></a-button>
      </template>

      <div v-if="selectedOrder" class="flex flex-col gap-6">
        <!-- Buyer Info -->
        <a-card size="small" :bordered="false" class="bg-slate-50 dark:bg-slate-900/50">
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Thông tin người mua</p>
          <div class="flex items-center justify-between gap-3">
            <div v-if="selectedOrder.user_id">
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedOrder.user_name || 'Người dùng Saffi' }}</h4>
              <p class="text-[11px] text-slate-500 font-medium select-all mt-0.5">{{ selectedOrder.user_email }}</p>
            </div>
            <span class="text-xs text-slate-400 italic" v-else>Không tìm thấy thông tin người dùng</span>
            <a-tag v-if="selectedOrder.user_rank">Hạng: {{ getRankName(selectedOrder.user_rank) }} ({{ selectedOrder.commission_rate }}%)</a-tag>
          </div>
        </a-card>

        <!-- Product Info -->
        <div>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Thông tin sản phẩm</p>
          <a-card size="small" :bordered="false" class="bg-slate-50 dark:bg-slate-900/50">
            <p class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">{{ selectedOrder.product_name || 'Sản phẩm từ Shopee' }}</p>
          </a-card>
        </div>

        <!-- Financial Grid -->
        <div>
          <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Chi tiết hoa hồng & doanh số</p>
          <a-descriptions :column="2" bordered size="small">
            <a-descriptions-item label="Giá trị">{{ formatMoney(selectedOrder.purchase_value) }}</a-descriptions-item>
            <a-descriptions-item label="Hoa hồng (Sàn)">{{ formatMoney(selectedOrder.actual_commission) }}</a-descriptions-item>
            <a-descriptions-item label="Hoa hồng (User)" :span="2">
              <span class="font-bold text-emerald-600">{{ formatMoney(selectedOrder.user_commission) }}</span>
            </a-descriptions-item>
          </a-descriptions>
        </div>

        <!-- Meta -->
        <a-descriptions :column="1" size="small" class="pt-4 border-t border-slate-200 dark:border-slate-800">
          <a-descriptions-item label="Sub ID">
            <span class="select-all font-medium">{{ selectedOrder.sub_id }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="Giờ click">{{ selectedOrder.click_time ? new Date(selectedOrder.click_time).toLocaleString('vi-VN') : 'N/A' }}</a-descriptions-item>
          <a-descriptions-item label="Giờ đặt">{{ selectedOrder.order_time ? new Date(selectedOrder.order_time).toLocaleString('vi-VN') : 'N/A' }}</a-descriptions-item>
        </a-descriptions>
      </div>
    </a-drawer>

    <!-- User Selection Modal -->
    <a-modal v-model:open="showUserModal" title="Tìm kiếm thành viên" :footer="null">
      <a-input-search
        v-model:value="userSearchQuery"
        placeholder="Tìm kiếm thành viên..."
        enter-button="Tìm"
        @search="handleUserSearch"
        class="mb-4"
      />
      <div class="min-h-[150px] max-h-[400px] overflow-y-auto">
        <div v-if="usersLoading" class="flex flex-col items-center justify-center py-8 gap-3">
          <a-spin />
          <span class="text-xs font-semibold text-slate-400">Đang tải...</span>
        </div>
        <a-empty v-else-if="usersList.length === 0" description="Không tìm thấy người dùng" />
        <div v-else class="flex flex-col gap-1">
          <button
            v-for="u in usersList"
            :key="u.id"
            @click="applyUserFilter(u)"
            class="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer"
            type="button"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div class="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 overflow-hidden">
                <img v-if="u.image" :src="u.image" class="h-full w-full object-cover" />
                <span v-else class="text-sm font-bold text-indigo-600 uppercase">{{ u.name?.charAt(0) || 'U' }}</span>
              </div>
              <div class="flex flex-col min-w-0">
                <span class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate">{{ u.name || 'Người dùng Saffi' }}</span>
                <span class="text-[11px] font-medium text-slate-500 truncate mt-0.5">{{ u.email }}</span>
              </div>
            </div>
            <a-tag color="green">CHỌN</a-tag>
          </button>
        </div>

        <div v-if="userPagination.totalPages > 1" class="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span class="text-[11px] font-bold text-slate-400 uppercase">Trang {{ userPagination.page }} / {{ userPagination.totalPages }}</span>
          <a-space>
            <a-button :disabled="userPagination.page === 1" size="small" @click="fetchUsers(userPagination.page - 1, userSearchQuery, 20)">
              <template #icon><LeftOutlined /></template>
            </a-button>
            <a-button :disabled="userPagination.page === userPagination.totalPages" size="small" @click="fetchUsers(userPagination.page + 1, userSearchQuery, 20)">
              <template #icon><RightOutlined /></template>
            </a-button>
          </a-space>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import { UploadOutlined, UserOutlined, CloseOutlined, DeleteOutlined, RightOutlined, SyncOutlined, FileDoneOutlined, InfoCircleOutlined, TeamOutlined, LeftOutlined } from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import Papa from "papaparse";

const columns = [
  { title: 'Mã đơn', key: 'order_id', width: 110 },
  { title: 'Người mua', key: 'user', width: 180 },
  { title: 'Sản phẩm', key: 'product_name', width: 220 },
  { title: 'Ngày', key: 'order_time', width: 100 },
  { title: 'Hoa hồng Sàn', key: 'actual_commission', align: 'right', width: 130 },
  { title: 'Hoa hồng User', key: 'user_commission', align: 'right', width: 130 },
  { title: 'Trạng thái', key: 'order_status', align: 'center', width: 120 },
  { title: '', key: 'action', align: 'center', width: 50 },
];

definePageMeta({ layout: "admin" });
useHead({ title: "Quản lý Đơn hàng | Admin Saffiliate" });

const showUploadModal = ref(false);
const fileInput = ref(null);
const isUploading = ref(false);
const selectedFile = ref(null);

const showSyncModal = ref(false);
const syncOrderId = ref('');
const isSyncing = ref(false);

const confirmSync = async () => {
  if (!syncOrderId.value.trim()) {
    showToast('Vui lòng nhập ID đơn hàng', 'error');
    return;
  }
  isSyncing.value = true;
  try {
    const res = await api.post('/order/manual-sync', { data: { order_id: syncOrderId.value.trim() } });
    showToast(res?.data?.message || res?.message || 'Đồng bộ thành công!');
    showSyncModal.value = false;
    syncOrderId.value = '';
    await refresh();
  } catch (err) {
    showToast(err?.data?.message || err?.message || 'Đồng bộ thất bại. Vui lòng thử lại.', 'error');
  } finally {
    isSyncing.value = false;
  }
};

const showToast = (msg, type = "success") => {
  if (type === "success") message.success(msg);
  else message.error(msg);
};

const searchQuery = ref("");
const selectedStatus = ref("all");
const selectedUserFilter = ref(null);
const currentPage = ref(1);
const limit = ref(20);
const { api } = useAppFetch();

const queryParams = computed(() => {
  const params = { page: currentPage.value, limit: limit.value, per_page: limit.value };
  if (selectedStatus.value !== "all") {
    if (selectedStatus.value === "pending") params.status = "Pending";
    else if (selectedStatus.value === "success") params.status = "Completed";
    else if (selectedStatus.value === "cancelled") params.status = "Cancelled";
  }
  if (selectedUserFilter.value) params.userId = selectedUserFilter.value.id;
  return params;
});

const { data: response, refresh, pending } = useLazyAsyncData(
  "admin-orders",
  () => api.get("/order", { query: queryParams.value }),
  { watch: [queryParams], server: false }
);

watch([selectedStatus, selectedUserFilter, limit], () => { currentPage.value = 1; });

const totalPages = computed(() => {
  const res = response.value;
  if (!res) return 1;
  if (res.last_page !== undefined) return res.last_page;
  if (res.data?.totalPages !== undefined) return res.data.totalPages;
  const total = res.total !== undefined ? res.total : res.data?.total || 0;
  return Math.ceil(total / limit.value) || 1;
});

const orders = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data) && !res.data.hasOwnProperty('data')) return res.data;
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const filteredOrders = computed(() => {
  let list = orders.value;
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter(item => {
      return [item.order_id, item.product_name, item.shop_name, item.user_name, item.user_email]
        .some(v => v && String(v).toLowerCase().includes(q));
    });
  }
  return list;
});

const totalCommission = computed(() => filteredOrders.value.reduce((s, o) => s + (o.actual_commission || 0), 0));
const totalUserCommission = computed(() => filteredOrders.value.reduce((s, o) => s + (o.user_commission || 0), 0));
const systemRevenue = computed(() => totalCommission.value - totalUserCommission.value);
const pendingCount = computed(() => filteredOrders.value.filter(o => o.order_status === 'Pending' || o.order_status === 'Chờ duyệt').length);
const paginationText = computed(() => `Tổng ${filteredOrders.value.length} đơn`);

const getStatusColor = (s) => {
  if (s === 'Completed' || s === 'Thành công') return 'success';
  if (s === 'Pending' || s === 'Chờ duyệt') return 'warning';
  return 'error';
};
const getStatusLabel = (s) => {
  if (s === 'Completed' || s === 'Thành công') return 'HOÀN THÀNH';
  if (s === 'Pending' || s === 'Chờ duyệt') return 'CHỜ DUYỆT';
  return 'ĐÃ HỦY';
};
const getRankName = (rank) => {
  if (rank === 'obsidian') return 'TINH HOA';
  if (rank === 'gold') return 'VÀNG';
  return 'BẠC';
};

// Drawer
const selectedOrder = ref(null);
const isDrawerOpen = computed({
  get: () => !!selectedOrder.value,
  set: (val) => { if (!val) selectedOrder.value = null; },
});
const openOrderDetails = (record) => { selectedOrder.value = record; };
const closeOrderDetails = () => { selectedOrder.value = null; };

// Upload
const triggerFileInput = () => fileInput.value?.click();
const handleFileSelect = (e) => { selectedFile.value = e.target.files?.[0] || null; };
const onDrop = (e) => { selectedFile.value = e.dataTransfer.files?.[0] || null; };
const confirmUpload = () => {
  if (!selectedFile.value) return;
  isUploading.value = true;

  Papa.parse(selectedFile.value, {
    header: true,
    skipEmptyLines: true,
    complete: async (results) => {
      try {
        const getVal = (row, key) => row[key] ? String(row[key]).trim() : '';
        const getNum = (row, key) => {
          const val = row[key];
          if (!val) return 0;
          const cleanStr = String(val).replace(/,/g, '');
          const num = Number(cleanStr);
          return isNaN(num) ? 0 : num;
        };

        const payload = results.data.map(row => {
          return {
            orderId: getVal(row, "Order id"),
            orderStatus: getVal(row, "Order Status"),
            conversionId: getNum(row, "Conversion id"),
            orderTime: getVal(row, "Order Time"),
            completeTime: getVal(row, "Complete Time"),
            clickTime: getVal(row, "Click Time"),
            shopName: getVal(row, "Shop Name"),
            shopId: getNum(row, "Shop id"),
            shopType: getVal(row, "Shop Type"),
            itemId: getNum(row, "Item id"),
            itemName: getVal(row, "Item Name"),
            modelId: getNum(row, "Model id"),
            productType: getVal(row, "Product Type"),
            promotionId: getNum(row, "Promotion id"),
            l1GlobalCategory: getVal(row, "L1 Global Category"),
            l2GlobalCategory: getVal(row, "L2 Global Category"),
            l3GlobalCategory: getVal(row, "L3 Global Category"),
            price: getNum(row, "Price(₫)"),
            qty: getNum(row, "Qty"),
            offerType: getVal(row, "Offer Type"),
            campaignPartner: getVal(row, "Campaign"),
            purchaseValue: getNum(row, "Purchase Value(₫)"),
            refundAmount: getNum(row, "Refund Amount(₫)"),
            itemShopeeCommissionRate: getVal(row, "Item Shopee Commission Rate"),
            itemShopeeCommission: getNum(row, "Item Shopee Commission(₫)"),
            itemSellerCommissionRate: getVal(row, "Item Seller Commission Rate"),
            itemSellerCommission: getNum(row, "Item Seller Commission(₫)"),
            itemTotalCommission: getNum(row, "Item Total Commission(₫)"),
            orderShopeeCommission: getNum(row, "Order Shopee Commission(₫)"),
            orderSellerCommission: getNum(row, "Order Seller Commission(₫)"),
            totalOrderCommission: getNum(row, "Total Order Commission(₫)"),
            linkedMcnName: getVal(row, "Linked MCN Name"),
            mcnContractId: getNum(row, "MCN Contract id"),
            mcnManagementFeeRate: getVal(row, "MCN Management Fee Rate"),
            mcnManagementFee: getNum(row, "MCN Management Fee(₫)"),
            affiliateAgreementFeeRate: getVal(row, "Affiliate Agreement Fee Rate"),
            affiliateNetCommission: getNum(row, "Affiliate Net Commission(₫)"),
            affiliateItemStatus: getVal(row, "Affiliate Item Status"),
            itemNote: getVal(row, "Item Note"),
            attributionType: getVal(row, "Attribution Type"),
            buyerStatus: getVal(row, "Buyer Status"),
            subId1: getVal(row, "Sub_id1"),
            channel: getVal(row, "Channel"),
          };
        });

        const res = await api.post('/order/import', { data: payload });
        showToast(res?.data?.message || res?.message || 'Upload thành công!');
        showUploadModal.value = false;
        selectedFile.value = null;
        await refresh();
      } catch (err) {
        showToast(err?.data?.message || err?.message || 'Upload thất bại. Vui lòng thử lại.', 'error');
      } finally {
        isUploading.value = false;
      }
    },
    error: (error) => {
      showToast('Lỗi khi đọc file CSV: ' + error.message, 'error');
      isUploading.value = false;
    }
  });
};

// User filter modal
const showUserModal = ref(false);
const userSearchQuery = ref('');
const { users: usersList, pagination: userPagination, isLoading: usersLoading, fetchUsers } = useAdminUsers();

const clearUserFilter = () => { selectedUserFilter.value = null; };
const clearAllFilters = () => { selectedStatus.value = 'all'; selectedUserFilter.value = null; };
const handleUserSearch = () => fetchUsers(1, userSearchQuery.value.trim(), 20);
const applyUserFilter = (u) => { selectedUserFilter.value = u; showUserModal.value = false; };

const formatMoney = (val) => {
  if (!val && val !== 0) return '0đ';
  return Math.round(Number(val)).toLocaleString('vi-VN') + 'đ';
};
</script>

<style scoped>
.admin-stat-card { border-radius: 12px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.admin-card { border-radius: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
:deep(.ant-table-row:hover > td) { background: rgba(248,250,252,0.8) !important; }
</style>
