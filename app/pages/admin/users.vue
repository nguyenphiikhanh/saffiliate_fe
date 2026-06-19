<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
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
          <USelect
            v-model="selectedLimit"
            :items="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 }
            ]"
            size="xs"
            class="font-bold w-18"
            @update:model-value="handleLimitChange"
          />
        </div>

        <!-- Rank Dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-xs font-semibold text-slate-500 dark:text-slate-400 select-none"
            >Cấp bậc:</span
          >
          <USelect
            v-model="selectedRank"
            :items="[
              { label: 'Tất cả', value: 'all' },
              { label: 'Bạc', value: 'silver' },
              { label: 'Vàng', value: 'gold' },
              { label: 'Tinh hoa', value: 'obsidian' }
            ]"
            size="xs"
            class="font-bold w-28"
            @update:model-value="handleRankChange"
          />
        </div>

        <!-- Search Box -->
        <div class="flex items-center gap-2 max-w-sm w-full sm:w-auto">
          <UInput
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm tên, email..."
            @keydown.enter="handleSearch"
            icon="i-heroicons-magnifying-glass"
            size="md"
            class="w-full sm:w-auto font-medium"
          >
            <template #trailing>
              <UButton
                v-if="searchQuery"
                color="neutral"
                variant="link"
                icon="i-heroicons-x-mark"
                size="xs"
                @click="clearSearch"
              />
            </template>
          </UInput>
          <UButton
            @click="handleSearch"
            size="md"
            class="font-semibold text-xs whitespace-nowrap"
          >
            Tìm
          </UButton>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <UAlert
      v-if="error"
      icon="i-heroicons-exclamation-triangle"
      color="danger"
      variant="subtle"
      :title="error"
    />

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <UCard
        v-for="n in 8"
        :key="n"
        :ui="{
          body: 'p-5 flex items-center gap-4',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <USkeleton class="h-12 w-12 rounded-full shrink-0" />
        <div class="flex-1 space-y-2">
          <USkeleton class="h-4 w-3/4" />
          <USkeleton class="h-3 w-1/2" />
        </div>
      </UCard>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="users.length === 0"
      class="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center"
    >
      <UIcon
        name="i-heroicons-users"
        class="h-10 w-10 mx-auto text-slate-400 dark:text-slate-650 mb-3 block"
      />
      <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
        Không tìm thấy người dùng
      </h3>
      <p class="text-xs text-slate-500">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Users Data Table (Desktop/Tablet) -->
    <UCard
      v-else
      :ui="{
        body: 'p-0',
        ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
        background: 'bg-white dark:bg-slate-900',
        rounded: 'rounded-xl shadow-sm'
      }"
      class="hidden md:block overflow-hidden"
    >
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase tracking-wider font-bold text-slate-450 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
              <th class="px-6 py-4 whitespace-nowrap w-[35%]">Thành viên</th>
              <th class="px-4 py-4 whitespace-nowrap text-center w-[15%]">Vai trò</th>
              <th class="px-4 py-4 whitespace-nowrap text-center w-[15%]">Cấp bậc</th>
              <th class="px-4 py-4 whitespace-nowrap text-right w-[15%]">Số dư khả dụng</th>
              <th class="px-4 py-4 whitespace-nowrap text-center w-[10%]">Đơn hàng</th>
              <th class="px-6 py-4 whitespace-nowrap text-right w-[10%]">Tham gia</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <tr 
              v-for="user in users" 
              :key="user.id"
              @click="openDetails(user)"
              class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
            >
              <!-- Member Info -->
              <td class="px-6 py-3.5 pl-6">
                <div class="flex items-center gap-3">
                  <div class="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200 dark:border-slate-700">
                    <img v-if="user.image" :src="user.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" loading="lazy" />
                    <div v-else class="h-full w-full text-slate-550 dark:text-slate-450 font-bold text-[11px] flex items-center justify-center uppercase">
                      {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
                    </div>
                  </div>
                  <div class="min-w-0">
                    <div class="flex items-center gap-1.5">
                      <span class="font-bold text-slate-800 dark:text-slate-200 text-xs leading-none">{{ user.name || 'User' }}</span>
                      <span v-if="isNewUser(user.createdAt)" class="px-1.5 py-0.5 rounded text-[8px] bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 font-black tracking-wide uppercase scale-90 origin-left" title="Người dùng mới">Mới</span>
                    </div>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500 block mt-1 select-all truncate font-medium max-w-[200px]">{{ user.email }}</span>
                  </div>
                </div>
              </td>
              
              <!-- Role -->
              <td class="px-4 py-3.5 text-center">
                <span 
                  class="inline-block px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider"
                  :class="user.role === 'admin' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-slate-100 text-slate-550 dark:bg-slate-800 dark:text-slate-450'"
                >
                  {{ user.role === 'admin' ? 'Admin' : 'Member' }}
                </span>
              </td>

              <!-- Rank -->
              <td class="px-4 py-3.5 text-center">
                <UBadge
                  size="xs"
                  variant="soft"
                  :color="getRankColor(user.rank)"
                  class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1"
                >
                  <img :src="getRankStyles(user.rank).image" class="h-3.5 w-3.5 object-contain shrink-0" :alt="user.rank" />
                  <span>{{ getRankStyles(user.rank).name }}</span>
                </UBadge>
              </td>

              <!-- Balance -->
              <td class="px-4 py-3.5 text-right">
                <span class="font-black text-emerald-600 dark:text-emerald-400 text-xs">{{ formatCurrency(user.availableBalance) }}</span>
              </td>

              <!-- Completed Orders -->
              <td class="px-4 py-3.5 text-center">
                <span class="font-bold text-slate-700 dark:text-slate-300 text-xs">{{ user.completedOrdersCount }}</span>
              </td>

              <!-- Join Date -->
              <td class="px-6 py-3.5 text-right whitespace-nowrap">
                <span class="text-xs text-slate-400 dark:text-slate-500 font-bold">{{ formatDate(user.createdAt) }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination.totalPages > 1" class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div class="text-xs text-slate-500 font-medium">
          Trang {{ pagination.page }} / {{ pagination.totalPages }}
        </div>
        <div class="flex gap-1">
          <UButton
            icon="i-heroicons-chevron-left"
            :disabled="pagination.page <= 1"
            variant="outline"
            color="neutral"
            size="xs"
            @click="changePage(pagination.page - 1)"
          />
          <UButton
            icon="i-heroicons-chevron-right"
            :disabled="pagination.page >= pagination.totalPages"
            variant="outline"
            color="neutral"
            size="xs"
            @click="changePage(pagination.page + 1)"
          />
        </div>
      </div>
    </UCard>

    <!-- Users Grid Card List (Mobile) -->
    <div v-if="users.length > 0" class="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
      <UCard
        v-for="user in users"
        :key="user.id"
        @click="openDetails(user)"
        :ui="{
          body: 'p-5 flex flex-col h-full justify-between',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
        class="hover:scale-[1.01] transition-all duration-200 cursor-pointer relative"
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
          <UBadge
            size="xs"
            variant="soft"
            :color="getRankColor(user.rank)"
            class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-flex items-center gap-1 shrink-0"
          >
            <img
              :src="getRankStyles(user.rank).image"
              class="h-3.5 w-3.5 object-contain shrink-0"
              :alt="user.rank"
            />
            <span>{{ getRankStyles(user.rank).name }}</span>
          </UBadge>
        </div>
      </UCard>

      <!-- Pagination (Mobile) -->
      <div v-if="pagination.totalPages > 1" class="flex items-center justify-between w-full mt-2">
        <span class="text-xs text-slate-500">Trang {{ pagination.page }}/{{ pagination.totalPages }}</span>
        <div class="flex gap-2">
          <UButton
            icon="i-heroicons-chevron-left"
            :disabled="pagination.page <= 1"
            size="sm"
            @click="changePage(pagination.page - 1)"
          />
          <UButton
            icon="i-heroicons-chevron-right"
            :disabled="pagination.page >= pagination.totalPages"
            size="sm"
            @click="changePage(pagination.page + 1)"
          />
        </div>
      </div>
    </div>

    <!-- User Details Drawer -->
    <USlideover v-model="isDrawerOpen">
      <template #content>
        <UCard
          v-if="selectedUser"
          :ui="{
            body: 'p-6 flex-1 overflow-y-auto',
            header: 'p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between shrink-0',
            footer: 'p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0'
          }"
          class="flex flex-col h-full overflow-hidden"
        >
          <template #header>
            <div>
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">
                Hồ sơ người dùng
              </h3>
              <p class="text-[11px] text-slate-500 font-medium mt-0.5 select-all">
                UID: {{ selectedUser.id }}
              </p>
            </div>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-heroicons-x-mark"
              class="rounded-lg"
              @click="closeDetails"
            />
          </template>

          <!-- Drawer Content -->
          <div class="flex flex-col gap-6">
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
                <UBadge size="xs" color="success" variant="soft" class="font-bold tracking-wider uppercase">
                  Người dùng mới
                </UBadge>
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
                <span class="text-xs font-bold text-slate-850 dark:text-slate-150 mt-1.5">{{ formatDate(selectedUser.createdAt) }}</span>
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
              <span>Vai trò: <span class="font-bold uppercase">{{ selectedUser.role === 'admin' ? 'ADMIN' : 'MEMBER' }}</span></span>
              <span>ID: {{ selectedUser.id }}</span>
            </div>
          </template>
        </UCard>
      </template>
    </USlideover>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import { useRouter } from "vue-router";

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

const getRankColor = (rank) => {
  if (rank === "obsidian") return "neutral";
  if (rank === "gold") return "warning";
  return "neutral"; // silver is neutral
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
