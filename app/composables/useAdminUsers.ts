import { ref } from "vue";

export interface AdminUser {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  rank: string;
  completedOrdersCount: number;
  availableBalance: number;
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

  const fetchUsers = async (page: number = 1, search: string = "", limit: number = 12, rank: string = "") => {
    isLoading.value = true;
    error.value = null;
    try {
      const params: any = {
        page,
        search,
        limit,
      };
      if (rank && rank !== "all") {
        params.rank = rank;
      }

      const response = await api.get("/user/list", { params });

      // Handle standard paginated structure: { data: { users: [...], pagination: {...} } }
      if (response.data) {
        const payload = response.data;

        // Mapper helper to support both camelCase and snake_case backend keys
        const mapUser = (item: any): AdminUser => ({
          id: item.id,
          name: item.name,
          email: item.email,
          image: item.image,
          role: item.role,
          rank: item.rank,
          completedOrdersCount: item.completed_orders_count !== undefined ? item.completed_orders_count : (item.completedOrdersCount !== undefined ? item.completedOrdersCount : 0),
          ordersToNextRank: item.orders_to_next_rank !== undefined ? item.orders_to_next_rank : (item.ordersToNextRank !== undefined ? item.ordersToNextRank : 0),
          createdAt: item.created_at || item.createdAt || "",
          availableBalance: item.wallet?.availableBalance !== undefined
            ? item.wallet.availableBalance
            : (item.wallet?.available_balance !== undefined
              ? item.wallet.available_balance
              : (item.available_balance !== undefined
                ? item.available_balance
                : (item.availableBalance !== undefined ? item.availableBalance : 0))),
        });

        // 1. Check for Laravel pagination structure: payload has 'current_page' and 'data' is an array
        if (payload && typeof payload === 'object' && 'current_page' in payload && Array.isArray(payload.data)) {
          users.value = payload.data.map(mapUser);
          pagination.value = {
            total: payload.total || 0,
            page: payload.current_page || page,
            limit: payload.per_page || limit,
            totalPages: payload.last_page || 1,
          };
        }
        // 2. Custom express pagination structure
        else if (payload && payload.users && Array.isArray(payload.users)) {
          users.value = payload.users.map(mapUser);
          if (payload.pagination) {
            pagination.value = {
              total: payload.pagination.total || 0,
              page: payload.pagination.page || page,
              limit: payload.pagination.limit || limit,
              totalPages: payload.pagination.totalPages || 1,
            };
          }
        }
        // 3. Directly an array
        else if (Array.isArray(payload)) {
          users.value = payload.map(mapUser);
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
