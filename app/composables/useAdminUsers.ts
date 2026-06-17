import { ref } from "vue";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  rank: string;
  completedOrdersCount: number;
  ordersToNextRank: number;
  createdAt: string | number;
}

export interface PaginationInfo {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export function useAdminUsers() {
  const { api } = useAppFetch();

  const users = ref<AdminUser[]>([]);
  const pagination = ref<PaginationInfo>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 1,
  });
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const fetchUsers = async (page: number = 1, search: string = "", limit: number = 12) => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await api.get("/user/list", {
        params: {
          page,
          search,
          limit,
        },
      });

      // Handle standard paginated structure: { data: { users: [...], pagination: {...} } }
      if (response.data) {
        const payload = response.data;
        if (payload && payload.users && Array.isArray(payload.users)) {
          users.value = payload.users;
          if (payload.pagination) {
            pagination.value = {
              total: payload.pagination.total || 0,
              page: payload.pagination.page || page,
              limit: payload.pagination.limit || limit,
              totalPages: payload.pagination.totalPages || 1,
            };
          }
        } else if (Array.isArray(payload)) {
          // Fallback if returning array directly
          users.value = payload;
          pagination.value = {
            total: payload.length,
            page: 1,
            limit: payload.length || limit,
            totalPages: 1,
          };
        }
      }
    } catch (err: any) {
      error.value = err?.message || "Có lỗi xảy ra khi tải danh sách người dùng";
      console.error("useAdminUsers error:", err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    users,
    pagination,
    isLoading,
    error,
    fetchUsers,
  };
}
