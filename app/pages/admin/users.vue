<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quản lý Thành Viên</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Danh sách thành viên đăng ký sử dụng nền tảng Saffi.</p>
      </div>

      <!-- Toolbar -->
      <a-space wrap>
        <a-select
          v-model:value="selectedRank"
          :options="[
            { label: 'Tất cả', value: 'all' },
            { label: 'Bạc', value: 'silver' },
            { label: 'Vàng', value: 'gold' },
            { label: 'Tinh hoa', value: 'obsidian' },
          ]"
          style="width: 130px"
          @change="handleRankChange"
        />
        <a-select
          v-model:value="selectedLimit"
          :options="[
            { label: '10 / trang', value: 10 },
            { label: '20 / trang', value: 20 },
            { label: '50 / trang', value: 50 },
            { label: '100 / trang', value: 100 },
          ]"
          style="width: 120px"
          @change="handleLimitChange"
        />
        <a-input-search
          v-model:value="searchQuery"
          placeholder="Tìm tên, email..."
          enter-button
          style="width: 240px"
          @search="handleSearch"
        />
      </a-space>
    </div>

    <!-- Error -->
    <a-alert v-if="error" type="error" show-icon :message="error" />

    <!-- Table — a-table with scroll.x handles responsive natively, no hidden/block hacks needed -->
    <a-card :bordered="false" class="admin-card" :body-style="{ padding: 0 }">
      <a-table
        :columns="columns"
        :data-source="users"
        :row-key="(r) => r.id"
        :pagination="false"
        :loading="isLoading"
        :scroll="{ x: 700 }"
        :custom-row="(record) => ({
          onClick: () => openDetails(record),
          class: 'cursor-pointer',
        })"
      >
        <template #bodyCell="{ column, record }">
          <!-- Member Info -->
          <template v-if="column.key === 'name'">
            <div class="flex items-center gap-3 py-1">
              <div class="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                <img v-if="record.image" :src="record.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" loading="lazy" />
                <span v-else class="text-slate-500 font-bold text-xs uppercase">{{ record.name?.charAt(0) || 'U' }}</span>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">{{ record.name || 'User' }}</span>
                  <a-tag v-if="isNewUser(record.createdAt)" color="green" style="font-size:8px;padding:0 4px;line-height:16px">Mới</a-tag>
                </div>
                <span class="text-[10px] text-slate-400 block mt-0.5 truncate max-w-[200px] select-all">{{ record.email }}</span>
              </div>
            </div>
          </template>

          <!-- Role -->
          <template v-else-if="column.key === 'role'">
            <a-tag :color="record.role === 'admin' ? 'orange' : 'default'">
              {{ record.role === 'admin' ? 'Admin' : 'Member' }}
            </a-tag>
          </template>

          <!-- Rank -->
          <template v-else-if="column.key === 'rank'">
            <div class="flex items-center gap-1.5">
              <img :src="getRankStyles(record.rank).image" class="h-4 w-4 object-contain" :alt="record.rank" />
              <a-tag :color="getRankTagColor(record.rank)">{{ getRankStyles(record.rank).name }}</a-tag>
            </div>
          </template>

          <!-- Balance -->
          <template v-else-if="column.key === 'availableBalance'">
            <span class="font-black text-emerald-600 dark:text-emerald-400 text-xs">{{ formatCurrency(record.availableBalance) }}</span>
          </template>

          <!-- Completed Orders -->
          <template v-else-if="column.key === 'completedOrdersCount'">
            <span class="font-bold text-slate-700 dark:text-slate-300 text-xs">{{ record.completedOrdersCount }}</span>
          </template>

          <!-- Join Date -->
          <template v-else-if="column.key === 'createdAt'">
            <span class="text-xs text-slate-400 dark:text-slate-500 font-medium">{{ formatDate(record.createdAt) }}</span>
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-4 py-3 flex justify-end border-t border-slate-100 dark:border-slate-800">
        <a-pagination
          :current="pagination.page"
          :total="pagination.totalItems"
          :page-size="selectedLimit"
          show-less-items
          @change="changePage"
        />
      </div>
    </a-card>

    <!-- User Details Drawer -->
    <a-drawer
      v-model:open="isDrawerOpen"
      title="Hồ sơ người dùng"
      placement="right"
      width="400px"
    >
      <div v-if="selectedUser" class="flex flex-col gap-6">
        <p class="text-[11px] text-slate-500 font-medium select-all -mt-4 mb-0">UID: {{ selectedUser.id }}</p>

        <!-- Avatar + Name -->
        <div class="flex flex-col items-center text-center gap-3">
          <div class="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <img v-if="selectedUser.image" :src="selectedUser.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
            <span v-else class="text-slate-500 font-bold text-2xl uppercase">{{ selectedUser.name?.charAt(0) || 'U' }}</span>
          </div>
          <div>
            <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ selectedUser.name || 'User' }}</h3>
            <p class="text-sm text-slate-500 select-all">{{ selectedUser.email }}</p>
            <a-tag v-if="isNewUser(selectedUser.createdAt)" color="green" class="mt-2">Người dùng mới</a-tag>
          </div>
        </div>

        <!-- Detail metrics using a-descriptions -->
        <a-descriptions :column="2" bordered size="small">
          <a-descriptions-item label="Cấp bậc" :span="1">
            <div class="flex items-center gap-1.5">
              <img :src="getRankStyles(selectedUser.rank).image" class="h-5 w-5 object-contain" />
              <span class="font-bold text-xs">{{ getRankStyles(selectedUser.rank).fullName }}</span>
            </div>
          </a-descriptions-item>
          <a-descriptions-item label="Số dư" :span="1">
            <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ formatCurrency(selectedUser.availableBalance) }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="Tham gia" :span="1">
            <span class="font-bold text-xs">{{ formatDate(selectedUser.createdAt) }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="Đơn thành công" :span="1">
            <span class="font-bold text-xs">{{ selectedUser.completedOrdersCount }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="Thăng hạng" :span="2">
            <span class="text-xs">
              {{ selectedUser.ordersToNextRank > 0 ? `Cần thêm ${selectedUser.ordersToNextRank} đơn` : 'Đã đạt cấp tối đa' }}
            </span>
          </a-descriptions-item>
        </a-descriptions>
      </div>
      <template #footer>
        <div class="flex items-center justify-between text-xs text-slate-400 font-medium">
          <span>Vai trò: <span class="font-bold uppercase">{{ selectedUser?.role === 'admin' ? 'ADMIN' : 'MEMBER' }}</span></span>
        </div>
      </template>
    </a-drawer>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import { useRouter } from "vue-router";
import { TeamOutlined } from "@ant-design/icons-vue";

const columns = [
  { title: "Thành viên", key: "name", width: 260 },
  { title: "Vai trò", key: "role", align: "center", width: 100 },
  { title: "Cấp bậc", key: "rank", align: "center", width: 120 },
  { title: "Số dư", key: "availableBalance", align: "right", width: 120 },
  { title: "Đơn hàng", key: "completedOrdersCount", align: "center", width: 100 },
  { title: "Tham gia", key: "createdAt", align: "right", width: 100 },
];

definePageMeta({ layout: "admin" });
useHead({ title: "Quản lý Thành Viên | Admin Saffiliate" });

const { isAdmin } = useAuth();
const router = useRouter();

onMounted(() => {
  if (!isAdmin.value) router.replace("/");
});

const { users, pagination, isLoading, error, fetchUsers } = useAdminUsers();

const searchQuery = ref("");
const selectedUser = ref(null);
const selectedLimit = ref(10);
const selectedRank = ref("all");

const isDrawerOpen = computed({
  get: () => !!selectedUser.value,
  set: (val) => { if (!val) selectedUser.value = null; },
});

const handleLimitChange = () => fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
const handleRankChange = () => fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
const handleSearch = () => fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
const changePage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  fetchUsers(page, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};
const openDetails = (user) => { selectedUser.value = user; };

const getRankTagColor = (rank) => {
  if (rank === 'obsidian') return 'default';
  if (rank === 'gold') return 'gold';
  return 'default';
};

const getRankStyles = (rank) => {
  if (rank === 'obsidian') return { name: 'TINH HOA', fullName: 'Thành viên Tinh Hoa', image: '/saffi_obsidian.webp' };
  if (rank === 'gold') return { name: 'VÀNG', fullName: 'Thành viên Vàng', image: '/saffi_gold.webp' };
  return { name: 'BẠC', fullName: 'Thành viên Bạc', image: '/saffi_silver.webp' };
};

const formatDate = (dateVal) => {
  if (!dateVal) return 'N/A';
  const d = new Date(dateVal);
  return `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
};

const formatCurrency = (val) => {
  if (val === undefined || val === null) return '0đ';
  return val.toLocaleString('vi-VN') + 'đ';
};

const isNewUser = (createdAt) => {
  if (!createdAt) return false;
  const d = new Date(createdAt);
  const now = new Date();
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
};

onMounted(async () => {
  if (isAdmin.value) await fetchUsers(1, '', selectedLimit.value, selectedRank.value);
});
</script>

<style scoped>
.admin-card { border-radius: 16px; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
:deep(.ant-table-row:hover > td) { background: rgba(248,250,252,0.8) !important; }
</style>
