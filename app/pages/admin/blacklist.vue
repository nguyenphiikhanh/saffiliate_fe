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
          Blacklist
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Người dùng bị Shopee ghim huỷ hoa hồng, phải sử dụng Affiliate ID
          khác.
        </p>
      </div>
      <div class="flex items-center gap-3">
        <a-button
          type="primary"
          @click="showUserModal = true"
          class="font-semibold"
        >
          <template #icon><PlusOutlined /></template>
          Thêm người dùng
        </a-button>
      </div>
    </div>

    <!-- Data Table -->
    <a-card :bordered="false" class="admin-card" :body-style="{ padding: 0 }">
      <!-- Toolbar -->
      <div
        class="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-end"
      >
        <a-select
          v-model:value="limit"
          :options="[
            { label: '20 / trang', value: 20 },
            { label: '50 / trang', value: 50 },
            { label: '100 / trang', value: 100 },
          ]"
          style="width: 120px"
        />
      </div>

      <!-- Table -->
      <a-table
        :columns="columns"
        :data-source="blacklistUsers"
        :row-key="(r) => r.id"
        :pagination="false"
        :loading="pending"
        :scroll="{ x: 800 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'user'">
            <div class="flex items-center gap-3">
              <div
                class="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 overflow-hidden"
              >
                <img
                  v-if="record.image"
                  :src="record.image"
                  class="h-full w-full object-cover"
                />
                <span
                  v-else
                  class="text-sm font-bold text-slate-500 uppercase"
                  >{{ record.name?.charAt(0) || "U" }}</span
                >
              </div>
              <div class="flex flex-col">
                <span
                  class="font-bold text-slate-800 dark:text-slate-200 text-sm truncate max-w-[200px]"
                  >{{ record.name || "N/A" }}</span
                >
                <span
                  class="text-[11px] text-slate-500 truncate max-w-[200px] font-medium mt-0.5"
                  >{{ record.email }}</span
                >
              </div>
            </div>
          </template>

          <template v-else-if="column.key === 'created_at'">
            <span class="text-xs text-slate-500 font-medium">
              {{
                record.created_at
                  ? new Date(record.created_at).toLocaleDateString("vi-VN")
                  : "N/A"
              }}
            </span>
          </template>

          <template v-else-if="column.key === 'action'">
            <a-popconfirm
              title="Bạn có chắc chắn muốn xoá người dùng này khỏi Blacklist?"
              ok-text="Xoá"
              cancel-text="Huỷ"
              ok-type="danger"
              @confirm="removeFromBlacklist(record.id)"
            >
              <a-button type="text" danger size="small">
                <template #icon><DeleteOutlined /></template>
                Xoá
              </a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>

      <!-- Pagination -->
      <div
        class="px-4 py-3 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3"
      >
        <span class="text-xs text-slate-500"
          >Tổng {{ blacklistUsers.length }} người dùng trên trang này</span
        >
        <a-pagination
          v-if="totalPages > 1"
          :current="currentPage"
          :total="totalPages * limit"
          :page-size="limit"
          show-less-items
          @change="(page) => (currentPage = page)"
        />
      </div>
    </a-card>

    <!-- User Selection Modal for Adding -->
    <a-modal
      v-model:open="showUserModal"
      title="Thêm người dùng vào Blacklist"
      :footer="null"
    >
      <a-input-search
        v-model:value="userSearchQuery"
        placeholder="Tìm kiếm theo tên hoặc email..."
        enter-button="Tìm"
        @search="handleUserSearch"
        class="mb-4"
      />
      <div class="min-h-[150px] max-h-[400px] overflow-y-auto">
        <div
          v-if="usersLoading"
          class="flex flex-col items-center justify-center py-8 gap-3"
        >
          <a-spin />
          <span class="text-xs font-semibold text-slate-400">Đang tải...</span>
        </div>
        <a-empty
          v-else-if="usersList.length === 0"
          description="Không tìm thấy người dùng"
        />
        <div v-else class="flex flex-col gap-1">
          <button
            v-for="u in usersList"
            :key="u.id"
            @click="addToBlacklist(u)"
            :disabled="isAdding"
            class="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-left border border-transparent hover:border-slate-200 dark:hover:border-slate-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
          >
            <div class="flex items-center gap-3 min-w-0">
              <div
                class="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 overflow-hidden"
              >
                <img
                  v-if="u.image"
                  :src="u.image"
                  class="h-full w-full object-cover"
                />
                <span
                  v-else
                  class="text-sm font-bold text-indigo-600 uppercase"
                  >{{ u.name?.charAt(0) || "U" }}</span
                >
              </div>
              <div class="flex flex-col min-w-0">
                <span
                  class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate"
                  >{{ u.name || "N/A" }}</span
                >
                <span
                  class="text-[11px] font-medium text-slate-500 truncate mt-0.5"
                  >{{ u.email }}</span
                >
              </div>
            </div>
            <a-tag color="red">THÊM</a-tag>
          </button>
        </div>

        <div
          v-if="userPagination.totalPages > 1"
          class="flex justify-between items-center mt-4 pt-4 border-t border-slate-100 dark:border-slate-800"
        >
          <span class="text-[11px] font-bold text-slate-400 uppercase"
            >Trang {{ userPagination.page }} /
            {{ userPagination.totalPages }}</span
          >
          <a-space>
            <a-button
              :disabled="userPagination.page === 1"
              size="small"
              @click="fetchUsers(userPagination.page - 1, userSearchQuery, 20)"
            >
              <template #icon><LeftOutlined /></template>
            </a-button>
            <a-button
              :disabled="userPagination.page === userPagination.totalPages"
              size="small"
              @click="fetchUsers(userPagination.page + 1, userSearchQuery, 20)"
            >
              <template #icon><RightOutlined /></template>
            </a-button>
          </a-space>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import {
  PlusOutlined,
  DeleteOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";

definePageMeta({ layout: "admin" });
useHead({ title: "Quản lý Blacklist | Admin Saffiliate" });

const { api } = useAppFetch();
const currentPage = ref(1);
const limit = ref(20);

const columns = [
  { title: "Người dùng", key: "user", width: 300 },
  { title: "Thao tác", key: "action", align: "right", width: 100 },
];

const queryParams = computed(() => ({
  page: currentPage.value,
  limit: limit.value,
  per_page: limit.value,
}));

const {
  data: response,
  refresh,
  pending,
} = useLazyAsyncData(
  "admin-blacklist",
  () => api.get("/admin/blacklist-commission", { query: queryParams.value }),
  { watch: [queryParams], server: false }
);

const totalPages = computed(() => {
  const res = response.value;
  if (!res) return 1;
  if (res.last_page !== undefined) return res.last_page;
  if (res.data?.totalPages !== undefined) return res.data.totalPages;
  const total = res.total !== undefined ? res.total : res.data?.total || 0;
  return Math.ceil(total / limit.value) || 1;
});

const blacklistUsers = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data) && !res.data.hasOwnProperty("data"))
    return res.data;
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

watch(limit, () => {
  currentPage.value = 1;
});

// User Search & Add Modal
const showUserModal = ref(false);
const userSearchQuery = ref("");
const isAdding = ref(false);

const {
  users: usersList,
  pagination: userPagination,
  isLoading: usersLoading,
  fetchUsers,
} = useAdminUsers();

const handleUserSearch = () => fetchUsers(1, userSearchQuery.value.trim(), 20);

watch(showUserModal, (newVal) => {
  if (newVal && usersList.value.length === 0) fetchUsers(1, "", 20);
});

const addToBlacklist = async (u) => {
  if (isAdding.value) return;
  isAdding.value = true;
  try {
    const res = await api.post("/admin/blacklist-commission", {
      user_id: u.id,
    });
    message.success(
      res?.data?.message || res?.message || "Đã thêm vào Blacklist!"
    );
    showUserModal.value = false;
    await refresh();
  } catch (err) {
    message.error(err?.data?.message || err?.message || "Thêm thất bại!");
  } finally {
    isAdding.value = false;
  }
};

const removeFromBlacklist = async (id) => {
  try {
    const res = await api.delete(`/admin/blacklist-commission/${id}`);
    message.success(
      res?.data?.message || res?.message || "Đã xoá khỏi Blacklist!"
    );
    await refresh();
  } catch (err) {
    message.error(err?.data?.message || err?.message || "Xoá thất bại!");
  }
};
</script>

<style scoped>
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
:deep(.ant-table-row:hover > td) {
  background: rgba(248, 250, 252, 0.8) !important;
}
</style>
