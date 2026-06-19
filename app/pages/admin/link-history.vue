<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2
          class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          Lịch sử chuyển đổi Link
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Lưu vết và đối soát lịch sử tạo link affiliate của người dùng.
        </p>
      </div>

      <UButton
        @click="refresh"
        :loading="pending"
        icon="i-lucide-refresh-cw"
        variant="soft"
        color="neutral"
        size="sm"
        class="font-bold text-xs"
      >
        Làm mới
      </UButton>
    </div>

    <!-- Data Table Container -->
    <UCard
      :ui="{
        body: 'p-0',
        ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
        background: 'bg-white dark:bg-slate-900',
        rounded: 'rounded-xl shadow-sm'
      }"
      class="overflow-hidden"
    >
      <!-- Filter Toolbar -->
      <div
        class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <!-- Filter by User Button -->
        <UButton
          @click="showUserModal = true"
          icon="i-lucide-user"
          variant="outline"
          color="neutral"
          class="font-medium text-xs max-w-[200px]"
          :class="selectedUserFilter ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border-emerald-500/20' : ''"
        >
          <span class="truncate">{{
            selectedUserFilter
              ? selectedUserFilter.name || selectedUserFilter.email
              : "Tìm theo người dùng"
          }}</span>
          <template #trailing>
            <UIcon
              v-if="selectedUserFilter"
              name="i-lucide-x"
              class="h-3 w-3 cursor-pointer hover:text-rose-500"
              @click.stop="clearUserFilter"
            />
          </template>
        </UButton>

        <!-- Date Range Filter -->
        <div class="flex items-center gap-2">
          <UInput
            type="date"
            v-model="startDate"
            size="sm"
            class="font-medium w-38"
          />
          <span class="text-slate-400 font-medium text-sm">-</span>
          <UInput
            type="date"
            v-model="endDate"
            size="sm"
            class="font-medium w-38"
          />
        </div>

        <!-- Limit Selection -->
        <div class="flex items-center gap-2 ml-auto sm:ml-0">
          <span class="text-xs font-semibold text-slate-500 dark:text-slate-400">Hiển thị:</span>
          <USelect
            v-model="limit"
            :items="[
              { label: '10', value: 10 },
              { label: '20', value: 20 },
              { label: '50', value: 50 },
              { label: '100', value: 100 }
            ]"
            size="xs"
            class="font-bold w-18"
          />
        </div>

        <!-- Clear Filter Button -->
        <UButton
          v-if="startDate || endDate || selectedUserFilter"
          @click="clearAllFilters"
          variant="link"
          color="danger"
          icon="i-lucide-trash"
          size="xs"
          class="font-bold text-xs"
        >
          Xóa bộ lọc
        </UButton>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800"
            >
              <th class="px-4 py-3 pl-6 whitespace-nowrap w-[15%]">
                Thời Gian
              </th>
              <th class="px-4 py-3 whitespace-nowrap w-[25%]">Tạo Bởi</th>
              <th class="px-4 py-3 whitespace-nowrap w-[15%]">Nền Tảng</th>
              <th class="px-4 py-3 whitespace-nowrap w-[40%]">Sản Phẩm</th>
              <th class="px-4 py-3 text-center whitespace-nowrap w-[5%]">
                Chi Tiết
              </th>
            </tr>
          </thead>
          <tbody
            class="divide-y divide-slate-100 dark:divide-slate-800 text-sm"
          >
            <tr v-if="pending && !response">
              <td colspan="5" class="p-4">
                <div class="flex flex-col gap-2">
                  <USkeleton v-for="i in 5" :key="i" class="h-10 w-full" />
                </div>
              </td>
            </tr>
            <tr v-else-if="!links || links.length === 0">
              <td
                colspan="5"
                class="p-8 text-center text-slate-500 text-sm font-medium"
              >
                Không tìm thấy lịch sử tạo link phù hợp
              </td>
            </tr>
            <tr
              v-else
              v-for="item in links"
              :key="item.id"
              @click="openDetails(item)"
              class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
            >
              <!-- Thời Gian -->
              <td class="px-4 py-3 pl-6">
                <div
                  class="text-xs text-slate-700 dark:text-slate-300 font-bold"
                >
                  {{ new Date(item.created_at).toLocaleDateString("vi-VN") }}
                </div>
                <div class="text-[10px] text-slate-400 font-medium">
                  {{ new Date(item.created_at).toLocaleTimeString("vi-VN") }}
                </div>
              </td>
              <!-- Người Dùng -->
              <td class="px-4 py-3">
                <div class="flex items-center gap-3">
                  <div
                    class="h-8 w-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden"
                  >
                    <img
                      v-if="item.user?.image"
                      :src="item.user.image"
                      class="h-full w-full object-cover"
                      referrerpolicy="no-referrer"
                    />
                    <span
                      v-else
                      class="text-xs font-bold text-slate-500 uppercase"
                      >{{
                        item.user?.name
                          ? item.user.name.charAt(0)
                          : item.user_id
                          ? item.user_id.charAt(0)
                          : "U"
                      }}</span
                    >
                  </div>
                  <div class="flex flex-col min-w-0">
                    <span
                      class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]"
                      >{{ item.user?.name || "Ẩn danh" }}</span
                    >
                    <span
                      class="text-[11px] text-slate-500 font-medium mt-0.5 truncate max-w-[140px]"
                      :title="item.user?.email || item.user_id"
                      >{{ item.user?.email || item.user_id }}</span
                    >
                  </div>
                </div>
              </td>
              <!-- Nền Tảng -->
              <td class="px-4 py-3">
                <span
                  class="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase border"
                  :class="getPlatformStyle(item.type)"
                >
                  {{
                    item.type === AFFILIATE_TYPES.SHOPEE ? "Shopee" : "TikTok"
                  }}
                </span>
              </td>
              <!-- Sản Phẩm -->
              <td class="px-4 py-3">
                <div class="w-[200px] sm:w-[250px] lg:w-[350px]">
                  <div
                    class="bg-slate-50 dark:bg-[#0D1117] border border-slate-200 dark:border-slate-800 px-2 py-1.5 rounded-md text-[11px] font-mono text-emerald-600 dark:text-emerald-400 truncate"
                  >
                    {{ formatMiniJson(item.product_info) }}
                  </div>
                </div>
              </td>
              <!-- Chi tiết -->
              <td class="px-4 py-3 text-center">
                <UIcon
                  name="i-lucide-chevron-right"
                  class="h-4 w-4 text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="totalPages > 1"
        class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50"
      >
        <div class="text-xs text-slate-500 font-medium">
          Trang {{ page }} / {{ totalPages }}
        </div>
        <div class="flex gap-1">
          <UButton
            icon="i-lucide-chevron-left"
            :disabled="page <= 1"
            variant="outline"
            color="neutral"
            size="xs"
            @click="page--"
          />
          <UButton
            icon="i-lucide-chevron-right"
            :disabled="page >= totalPages"
            variant="outline"
            color="neutral"
            size="xs"
            @click="page++"
          />
        </div>
      </div>
    </UCard>

    <!-- Detail Drawer -->
    <USlideover v-model:open="isDrawerOpen">
      <template #content>
        <UCard
          v-if="selectedItem"
          :ui="{
            body: 'p-0 flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-900',
            header: 'p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between shrink-0',
          }"
          class="flex flex-col h-full overflow-hidden"
        >
          <template #header>
            <div>
              <span
                class="inline-block px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider mb-2 border"
                :class="getPlatformStyle(selectedItem.type)"
              >
                {{
                  selectedItem.type === AFFILIATE_TYPES.SHOPEE
                    ? "Shopee Link"
                    : "TikTok Link"
                }}
              </span>
              <h3
                class="text-base font-bold text-slate-800 dark:text-slate-100"
              >
                Thông tin sản phẩm
              </h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">
                Lưu lúc:
                {{ new Date(selectedItem.created_at).toLocaleString("vi-VN") }}
              </p>
            </div>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              class="rounded-lg"
              @click="closeDetails"
            />
          </template>

          <div class="p-6">
            <div
              class="bg-[#0D1117] rounded-xl overflow-hidden shadow-sm border border-slate-700"
            >
              <div
                class="flex items-center justify-between px-4 py-2 bg-[#161B22] border-b border-slate-700"
              >
                <span
                  class="text-xs font-bold text-slate-400 uppercase tracking-widest"
                  >JSON Response</span
                >
                <UButton
                  @click="copyJson(selectedItem.product_info)"
                  color="neutral"
                  variant="link"
                  icon="i-lucide-clipboard"
                  size="xs"
                  class="font-semibold text-xs text-slate-400 hover:text-white"
                >
                  Copy
                </UButton>
              </div>
              <div class="p-4 overflow-x-auto">
                <pre
                  class="text-[13px] leading-relaxed text-emerald-400 font-mono"
                  >{{ formatJson(selectedItem.product_info) }}</pre
                >
              </div>
            </div>
          </div>
        </UCard>
      </template>
    </USlideover>

    <!-- User Selection Modal -->
    <UModal v-model:open="showUserModal">
      <template #content>
        <UCard
          :ui="{
            body: 'p-2 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20 min-h-[150px] max-h-[400px]',
            header: 'p-4 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex items-center gap-3 shrink-0',
            footer: 'p-4 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 shrink-0'
          }"
          class="relative w-full max-w-xl overflow-hidden"
        >
          <template #header>
            <UIcon name="i-lucide-search" class="h-5 w-5 text-slate-400 shrink-0 ml-1" />
            <UInput
              v-model="userSearchQuery"
              type="text"
              placeholder="Tìm kiếm thành viên..."
              class="flex-1 font-medium"
              autofocus
              @keydown.enter="handleUserSearch"
            >
              <template #trailing>
                <UButton
                  v-if="userSearchQuery"
                  color="neutral"
                  variant="link"
                  icon="i-lucide-x"
                  size="xs"
                  @click="clearUserSearch"
                />
              </template>
            </UInput>
            <UButton
              @click="handleUserSearch"
              size="sm"
              class="font-semibold text-xs whitespace-nowrap shrink-0"
            >
              Tìm
            </UButton>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              class="shrink-0"
              @click="showUserModal = false"
            />
          </template>

          <div v-if="usersLoading" class="flex flex-col items-center justify-center py-8 text-slate-400 gap-3">
            <UIcon name="i-lucide-refresh-cw" class="animate-spin h-6 w-6 text-emerald-500" />
            <span class="text-xs font-semibold">Đang tải...</span>
          </div>

          <div v-else-if="usersList.length === 0" class="flex flex-col items-center justify-center py-8 text-slate-500 gap-2">
            <UIcon name="i-lucide-users" class="h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p class="text-sm font-medium">Không tìm thấy người dùng phù hợp</p>
          </div>

          <div v-else class="space-y-1">
            <button
              v-for="u in usersList"
              :key="u.id"
              @click="applyUserFilter(u)"
              class="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 text-left group border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm"
            >
              <div class="flex items-center gap-3 min-w-0">
                <div class="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/50 overflow-hidden relative group-hover:scale-105 transition-transform">
                  <img v-if="u.image" :src="u.image" class="h-full w-full object-cover" />
                  <span v-else class="text-sm font-bold text-indigo-650 dark:text-indigo-400 uppercase">
                    {{ u.name ? u.name.charAt(0) : "U" }}
                  </span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-bold text-slate-850 dark:text-slate-100 truncate group-hover:text-emerald-500 transition-colors">
                    {{ u.name || "Người dùng Saffi" }}
                  </span>
                  <span class="text-[11px] font-medium text-slate-500 truncate mt-0.5">{{ u.email }}</span>
                </div>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <UBadge size="xs" color="success" variant="soft" class="font-bold text-[10px]">CHỌN</UBadge>
              </div>
            </button>
          </div>

          <template #footer>
            <div v-if="userPagination.totalPages > 1" class="flex justify-between items-center w-full">
              <span class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                Trang {{ userPagination.page }} / {{ userPagination.totalPages }}
              </span>
              <div class="flex gap-1">
                <UButton
                  icon="i-lucide-chevron-left"
                  :disabled="userPagination.page === 1"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="changeUserPage(userPagination.page - 1)"
                />
                <UButton
                  icon="i-lucide-chevron-right"
                  :disabled="userPagination.page === userPagination.totalPages"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="changeUserPage(userPagination.page + 1)"
                />
              </div>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { AFFILIATE_TYPES } from "~/utils/constants";
import { useAdminUsers } from "~/composables/useAdminUsers";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Lịch sử chuyển đổi Link | Admin Saffiliate",
});

// --- Link History State & Fetching ---
const page = ref(1);
const limit = ref(20);
const startDate = ref("");
const endDate = ref("");
const selectedUserFilter = ref(null);
const { api } = useAppFetch();

// Build query dynamically
const queryParams = computed(() => {
  const params = {
    page: page.value,
    limit: limit.value,
  };
  if (startDate.value) params.startDate = startDate.value;
  if (endDate.value) params.endDate = endDate.value;
  if (selectedUserFilter.value) params.userId = selectedUserFilter.value.id;
  return params;
});

const {
  data: response,
  refresh,
  pending,
} = useLazyAsyncData(
  "admin-link-history",
  () => api.get("/admin/link-history", { query: queryParams.value }),
  {
    watch: [queryParams],
    server: false,
  }
);

const links = computed(() => {
  const res = response.value?.data;
  if (!res) return [];
  if (res.data) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const totalPages = computed(() => {
  const res = response.value?.data;
  if (!res || !res.meta) return 1;
  return Math.ceil(res.meta.total / limit.value);
});

// Reset page when filters or limit change
watch([limit, startDate, endDate, selectedUserFilter], () => {
  page.value = 1;
});

// --- Detail Drawer ---
const selectedItem = ref(null);

const isDrawerOpen = computed({
  get: () => !!selectedItem.value,
  set: (val) => {
    if (!val) selectedItem.value = null;
  }
});

const openDetails = (item) => {
  selectedItem.value = item;
};

const closeDetails = () => {
  selectedItem.value = null;
};

const formatJson = (obj) => {
  if (!obj) return "{}";
  try {
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    return String(obj);
  }
};

const copyJson = (obj) => {
  if (!obj) return;
  navigator.clipboard
    .writeText(JSON.stringify(obj, null, 2))
    .then(() => alert("Đã copy JSON!"))
    .catch((err) => console.error(err));
};

const getPlatformStyle = (type) => {
  if (type === AFFILIATE_TYPES.SHOPEE) {
    return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
  }
  return "bg-slate-900/10 dark:bg-slate-100/10 text-slate-800 dark:text-slate-200 border-slate-900/20 dark:border-slate-100/20";
};

// --- User Selection Modal ---
const showUserModal = ref(false);
const userSearchQuery = ref("");
const {
  users: usersList,
  pagination: userPagination,
  isLoading: usersLoading,
  fetchUsers,
} = useAdminUsers();

const changeUserPage = (targetPage) => {
  fetchUsers(targetPage, userSearchQuery.value.trim(), 20);
};

const handleUserSearch = () => {
  fetchUsers(1, userSearchQuery.value.trim(), 20);
};

const clearUserSearch = () => {
  userSearchQuery.value = "";
  fetchUsers(1, "", 20);
};

watch(showUserModal, (newVal) => {
  if (newVal && usersList.value.length === 0) {
    fetchUsers(1, "", 20);
  }
});

const applyUserFilter = (user) => {
  selectedUserFilter.value = user;
  showUserModal.value = false;
};

const clearUserFilter = () => {
  selectedUserFilter.value = null;
};

const clearAllFilters = () => {
  startDate.value = "";
  endDate.value = "";
  selectedUserFilter.value = null;
};

const formatMiniJson = (obj) => {
  if (!obj) return "{}";
  let name = obj.productName || obj.title || obj.name || "Unknown Product";
  if (name.length > 50) {
    name = name.slice(0, 50) + "...";
  }
  return `{ "productName": "${name}" }`;
};
</script>
