<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2
          class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          Quản lý Thành Viên
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Danh sách thành viên đăng ký sử dụng nền tảng Saffi.
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-3 w-full sm:w-auto">
        <!-- Limit Dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none"
            >Hiển thị:</span
          >
          <a-select
            v-model:value="selectedLimit"
            :options="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 }
            ]"
            class="font-bold w-20"
            @change="handleLimitChange"
          />
        </div>

        <!-- Rank Dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none"
            >Cấp bậc:</span
          >
          <a-select
            v-model:value="selectedRank"
            :options="[
              { label: 'Tất cả', value: 'all' },
              { label: 'Bạc', value: 'silver' },
              { label: 'Vàng', value: 'gold' },
              { label: 'Tinh hoa', value: 'obsidian' }
            ]"
            class="font-bold w-32"
            @change="handleRankChange"
          />
        </div>

        <!-- Search Box -->
        <div class="flex items-center gap-2 max-w-sm w-full sm:w-auto">
          <a-input-search
            v-model:value="searchQuery"
            placeholder="Tìm kiếm tên, email..."
            enter-button="Tìm"
            @search="handleSearch"
            class="w-full sm:w-auto font-medium"
          />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <!-- Error State -->
    <a-alert
      v-if="error"
      type="error"
      show-icon
      :message="error"
      class="mb-4"
    />

    <!-- Empty State -->
    <div
      v-if="!isLoading && users.length === 0"
      class="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center"
    >
      <TeamOutlined
        class="text-[40px] text-slate-400 dark:text-slate-650 mb-3 block"
      />
      <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
        Không tìm thấy người dùng
      </h3>
      <p class="text-xs text-slate-500">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Users Data Table (Desktop/Tablet) -->
    <div
      v-else
      class="hidden md:block overflow-hidden ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm"
    >
      <a-table
        :columns="columns"
        :dataSource="users"
        :rowKey="record => record.id"
        :pagination="false"
        :loading="isLoading"
        :customRow="(record) => ({
          onClick: () => openDetails(record),
          class: 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50'
        })"
      >
        <template #bodyCell="{ column, record }">
          <!-- Member Info -->
          <template v-if="column.key === 'name'">
            <div class="flex items-center gap-3 py-1">
              <div class="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                <img v-if="record.image" :src="record.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" loading="lazy" />
                <div v-else class="h-full w-full text-slate-550 dark:text-slate-450 font-bold text-[11px] flex items-center justify-center uppercase">
                  {{ record.name ? record.name.charAt(0).toUpperCase() : 'U' }}
                </div>
              </div>
              <div class="min-w-0">
                <div class="flex items-center gap-1.5">
                  <span class="font-bold text-slate-800 dark:text-slate-200 text-xs leading-none">{{ record.name || 'User' }}</span>
                  <span v-if="isNewUser(record.createdAt)" class="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-black tracking-wide uppercase scale-90 origin-left" title="Người dùng mới">Mới</span>
                </div>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 block mt-1 select-all truncate font-medium max-w-[200px]">{{ record.email }}</span>
              </div>
            </div>
          </template>

          <!-- Role -->
          <template v-else-if="column.key === 'role'">
            <span 
              class="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
              :class="record.role === 'admin' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-slate-100 text-slate-550 dark:bg-slate-800 dark:text-slate-450'"
            >
              {{ record.role === 'admin' ? 'Admin' : 'Member' }}
            </span>
          </template>

          <!-- Rank -->
          <template v-else-if="column.key === 'rank'">
            <span
              class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1"
              :class="getRankBgClass(record.rank)"
            >
              <img :src="getRankStyles(record.rank).image" class="h-3.5 w-3.5 object-contain shrink-0" :alt="record.rank" />
              <span>{{ getRankStyles(record.rank).name }}</span>
            </span>
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
            <span class="text-xs text-slate-400 dark:text-slate-500 font-bold">{{ formatDate(record.createdAt) }}</span>
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end bg-slate-50/50 dark:bg-slate-900/50">
        <a-pagination
          :current="pagination.page"
          :total="pagination.totalItems"
          :pageSize="selectedLimit"
          show-less-items
          @change="changePage"
        />
      </div>
    </div>

    <!-- Users Grid Card List (Mobile) -->
    <div v-if="users.length > 0" class="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        @click="openDetails(user)"
        class="p-5 flex flex-col h-full justify-between ring-1 ring-slate-200 dark:ring-slate-800 bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:scale-[1.01] transition-all duration-200 cursor-pointer relative"
      >
        <div class="flex items-start gap-4 mb-4">
          <!-- Avatar -->
          <div
            class="h-11 w-11 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700"
          >
            <img
              v-if="user.image"
              :src="user.image"
              class="h-full w-full object-cover"
              referrerpolicy="no-referrer"
              loading="lazy"
            />
            <div
              v-else
              class="h-full w-full text-slate-500 dark:text-slate-400 font-bold text-base flex items-center justify-center uppercase"
            >
              {{ user.name ? user.name.charAt(0).toUpperCase() : "U" }}
            </div>
          </div>

          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1.5">
              <h4
                class="text-xs font-black text-slate-800 dark:text-slate-100 truncate"
              >
                {{ user.name || "User" }}
              </h4>
              <span
                v-if="isNewUser(user.createdAt)"
                class="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-black tracking-wide uppercase scale-90 origin-left"
                title="Người dùng mới"
                >Mới</span
              >
            </div>
            <p class="text-[10px] text-slate-400 mt-1 truncate font-medium">
              {{ user.email }}
            </p>
          </div>
        </div>

        <div
          class="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4"
        >
          <div class="flex flex-col">
            <span
              class="text-[9px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5"
              >Số dư</span
            >
            <span
              class="text-xs font-bold text-emerald-600 dark:text-emerald-400"
              >{{ formatCurrency(user.availableBalance) }}</span
            >
          </div>
          <span
            class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0"
            :class="getRankBgClass(user.rank)"
          >
            <img
              :src="getRankStyles(user.rank).image"
              class="h-3.5 w-3.5 object-contain shrink-0"
              :alt="user.rank"
            />
            <span>{{ getRankStyles(user.rank).name }}</span>
          </span>
        </div>
      </div>

      <!-- Pagination (Mobile) -->
      <div v-if="pagination.totalPages > 1" class="flex items-center justify-center w-full mt-2">
        <a-pagination
          :current="pagination.page"
          :total="pagination.totalItems"
          :pageSize="selectedLimit"
          size="small"
          show-less-items
          @change="changePage"
        />
      </div>
    </div>

    <!-- User Details Drawer -->
    <a-drawer
      v-model:open="isDrawerOpen"
      title="Hồ sơ người dùng"
      placement="right"
      width="400px"
      :closable="true"
    >
      <div v-if="selectedUser" class="flex flex-col gap-6">
        <p class="text-[11px] text-slate-500 font-medium -mt-4 mb-4 select-all">
          UID: {{ selectedUser.id }}
        </p>
        <div class="flex flex-col items-center text-center">
          <!-- Avatar -->
          <div class="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-700 shadow-inner">
            <img
              v-if="selectedUser.image"
              :src="selectedUser.image"
              class="h-full w-full object-cover"
              referrerpolicy="no-referrer"
            />
            <div v-else class="h-full w-full text-slate-500 dark:text-slate-400 font-bold text-2xl flex items-center justify-center uppercase">
              {{ selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : "U" }}
            </div>
          </div>
          <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight">
            {{ selectedUser.name || "User" }}
          </h3>
          <p class="text-sm text-slate-500 mt-1 font-medium select-all">
            {{ selectedUser.email }}
          </p>
          <div v-if="isNewUser(selectedUser.createdAt)" class="mt-3">
            <span class="px-2 py-1 bg-emerald-50 text-emerald-600 rounded text-[10px] font-bold tracking-wider uppercase">
              Người dùng mới
            </span>
          </div>
        </div>

        <!-- Detail Metrics -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Cấp bậc</span>
            <div class="flex items-center gap-1.5 mt-1">
              <img :src="getRankStyles(selectedUser.rank).image" class="h-5 w-5 object-contain" :alt="selectedUser.rank" />
              <span class="text-xs font-bold text-slate-850 dark:text-slate-150">{{ getRankStyles(selectedUser.rank).fullName }}</span>
            </div>
          </div>

          <div class="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Số dư khả dụng</span>
            <span class="text-xs font-bold text-emerald-600 dark:text-emerald-450 mt-1.5">{{ formatCurrency(selectedUser.availableBalance) }}</span>
          </div>

          <div class="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Tham gia</span>
            <span class="text-xs font-bold text-slate-855 dark:text-slate-145 mt-1.5">{{ formatDate(selectedUser.createdAt) }}</span>
          </div>

          <div class="flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Đơn thành công</span>
            <span class="text-xs font-bold text-slate-855 dark:text-slate-145 mt-1.5">{{ selectedUser.completedOrdersCount }}</span>
          </div>

          <div class="col-span-2 flex flex-col gap-1 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-200 dark:border-slate-800">
            <span class="text-[10px] font-bold uppercase text-slate-550 tracking-wider">Thăng hạng</span>
            <span class="text-xs font-bold text-slate-855 dark:text-slate-145 mt-1">
              {{ selectedUser.ordersToNextRank > 0 ? `Cần thêm ${selectedUser.ordersToNextRank} đơn hàng` : "Đã đạt cấp tối đa" }}
            </span>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex items-center justify-between text-xs text-slate-400 font-medium w-full">
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
  {
    title: 'Thành viên',
    key: 'name',
    width: '35%',
  },
  {
    title: 'Vai trò',
    key: 'role',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Cấp bậc',
    key: 'rank',
    align: 'center',
    width: '15%',
  },
  {
    title: 'Số dư',
    key: 'availableBalance',
    align: 'right',
    width: '15%',
  },
  {
    title: 'Đơn hàng',
    key: 'completedOrdersCount',
    align: 'center',
    width: '10%',
  },
  {
    title: 'Tham gia',
    key: 'createdAt',
    align: 'right',
    width: '10%',
  },
];

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Quản lý Thành Viên | Admin Saffiliate",
});

const { isAdmin } = useAuth();
const router = useRouter();

// Route Protection: verify if current logged in user is admin
onMounted(() => {
  if (!isAdmin.value) {
    router.replace("/");
  }
});

const { users, pagination, isLoading, error, fetchUsers } = useAdminUsers();

const searchQuery = ref("");
const selectedUser = ref(null);
const selectedLimit = ref(10);
const selectedRank = ref("all");

const isDrawerOpen = computed({
  get: () => !!selectedUser.value,
  set: (val) => {
    if (!val) selectedUser.value = null;
  }
});

const handleLimitChange = () => {
  fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

const handleRankChange = () => {
  fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

const handleSearch = () => {
  fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

const clearSearch = () => {
  searchQuery.value = "";
  fetchUsers(1, "", selectedLimit.value, selectedRank.value);
};

const changePage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  fetchUsers(page, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

const openDetails = (user) => {
  selectedUser.value = user;
};

const closeDetails = () => {
  selectedUser.value = null;
};

const getRankBgClass = (rank) => {
  if (rank === "obsidian") return "bg-slate-100 text-slate-800";
  if (rank === "gold") return "bg-amber-100 text-amber-700";
  return "bg-slate-100 text-slate-500"; // silver
};

const getRankStyles = (rank) => {
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "Thành viên Tinh Hoa",
      image: "/saffi_obsidian.png",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "Thành viên Vàng",
      image: "/saffi_gold.png",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "Thành viên Bạc",
      image: "/saffi_silver.png",
    };
  }
};

const formatDate = (dateVal) => {
  if (!dateVal) return "N/A";
  const dateObj = new Date(dateVal);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatCurrency = (val) => {
  if (val === undefined || val === null) return "0đ";
  return val.toLocaleString("vi-VN") + "đ";
};

const isNewUser = (createdAt) => {
  if (!createdAt) return false;
  const createdDate = new Date(createdAt);
  const now = new Date();
  return (
    createdDate.getMonth() === now.getMonth() &&
    createdDate.getFullYear() === now.getFullYear()
  );
};

// Initial Load
onMounted(async () => {
  if (isAdmin.value) {
    await fetchUsers(1, "", selectedLimit.value, selectedRank.value);
  }
});
</script>
