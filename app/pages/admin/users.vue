<template>
  <div class="flex flex-col gap-6 animate-fade-in-up">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-xl font-black text-slate-800 dark:text-slate-100">Quản lý Thành Viên</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Danh sách thành viên đăng ký sử dụng nền tảng Saffi.</p>
      </div>

      <!-- Search Box -->
      <div class="relative w-full sm:w-72">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          type="text"
          placeholder="Tìm kiếm tên, email..."
          class="w-full rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-950/40 pl-10 pr-10 py-2.5 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange transition-all font-semibold"
        />
        <div class="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <button
          v-if="searchQuery"
          @click="clearSearch"
          class="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors shrink-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Error State -->
    <div v-if="error" class="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-300 text-xs font-bold flex items-center gap-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="n in 8" :key="n" class="bg-white dark:bg-slate-900/60 p-5 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-md flex flex-col items-center select-none animate-pulse">
        <div class="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-800 mb-3"></div>
        <div class="h-4 w-28 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
        <div class="h-3 w-36 bg-slate-200 dark:bg-slate-800 rounded mb-4"></div>
        <div class="h-8 w-24 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="users.length === 0" class="bg-white dark:bg-slate-900/60 p-12 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl text-center select-none">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      <h3 class="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">Không tìm thấy người dùng nào</h3>
      <p class="text-xs text-slate-400">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Cards Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
      <div
        v-for="user in users"
        :key="user.id"
        class="bg-white dark:bg-slate-900/60 p-5 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-md hover:shadow-xl hover:border-slate-200 dark:hover:border-slate-700 hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center relative group overflow-hidden"
      >
        <!-- Rank-colored background aura -->
        <div class="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-5 pointer-events-none" :class="getRankStyles(user.rank).glowClass"></div>

        <!-- Avatar -->
        <div class="h-16 w-16 rounded-full overflow-hidden flex items-center justify-center border-2 border-slate-100 dark:border-slate-800 shadow-sm shrink-0 mb-3 select-none relative">
          <img v-if="user.image" :src="user.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" loading="lazy" />
          <div v-else class="h-full w-full bg-[#EC407A] text-white font-black text-xl flex items-center justify-center uppercase">
            {{ user.name ? user.name.charAt(0).toUpperCase() : 'U' }}
          </div>
        </div>

        <!-- New User Tag -->
        <span v-if="isNewUser(user.createdAt)" class="bg-gradient-to-r from-emerald-500/90 to-teal-500/90 text-white text-[8px] font-black tracking-wider uppercase px-2 py-0.5 rounded-full shadow-sm select-none mb-2 animate-pulse">
          Người dùng mới
        </span>

        <!-- User Information -->
        <h4 class="text-sm font-black text-slate-800 dark:text-slate-100 truncate max-w-full leading-tight">{{ user.name || 'User' }}</h4>
        <p class="text-[10px] text-slate-400 mt-1 truncate max-w-full font-bold select-all mb-3">{{ user.email }}</p>

        <!-- Rank badge inside card -->
        <div
          class="flex items-center gap-1.5 px-3 py-1 rounded-full border font-extrabold text-[9px] tracking-wider select-none shrink-0 mb-3"
          :class="getRankStyles(user.rank).badgeClass"
        >
          <img :src="getRankStyles(user.rank).image" class="h-4 w-4 object-contain shrink-0" :alt="user.rank" />
          <span>{{ getRankStyles(user.rank).name }}</span>
        </div>

        <!-- Available Balance -->
        <div class="mb-4 select-none">
          <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase tracking-wider block mb-0.5">Số dư khả dụng</span>
          <span class="text-xs font-black text-emerald-600 dark:text-emerald-450">{{ formatCurrency(user.availableBalance) }}</span>
        </div>

        <!-- Actions -->
        <button
          @click="openDetails(user)"
          type="button"
          class="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-shopee-orange dark:hover:border-shopee-orange bg-slate-50 hover:bg-shopee-orange/5 dark:bg-slate-950/20 text-slate-600 hover:text-shopee-orange dark:text-slate-400 dark:hover:text-shopee-orange font-bold text-xs active:scale-[0.98] transition-all cursor-pointer select-none"
        >
          Xem chi tiết
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination.totalPages > 1" class="flex items-center justify-center gap-2 mt-4 select-none">
      <button
        @click="changePage(pagination.page - 1)"
        :disabled="pagination.page === 1"
        class="h-8.5 w-8.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:text-shopee-orange hover:border-shopee-orange disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <span class="text-xs font-black text-slate-700 dark:text-slate-300 px-3">
        Trang {{ pagination.page }} / {{ pagination.totalPages }}
      </span>

      <button
        @click="changePage(pagination.page + 1)"
        :disabled="pagination.page === pagination.totalPages"
        class="h-8.5 w-8.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-500 hover:text-shopee-orange hover:border-shopee-orange disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center active:scale-95 transition-all cursor-pointer"
        type="button"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

    <!-- User Details Modal (Drawer style popover) -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
      <div v-if="selectedUser" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <!-- Close overlay click -->
        <div @click="closeDetails" class="absolute inset-0 cursor-default"></div>

        <div
          class="w-full max-w-md rounded-[2.5rem] p-6 md:p-8 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 shadow-2xl relative z-10 animate-fade-in-up flex flex-col items-center animate-premium"
        >
          <!-- Top rank aura -->
          <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-shopee-orange to-rose-500"></div>

          <!-- Close button -->
          <button
            @click="closeDetails"
            class="absolute right-5 top-5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer"
            type="button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- Large Avatar -->
          <div class="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center border-4 border-slate-50 dark:border-slate-850 shadow-md shrink-0 mb-4 select-none relative">
            <img v-if="selectedUser.image" :src="selectedUser.image" class="h-full w-full object-cover" referrerpolicy="no-referrer" loading="lazy" />
            <div v-else class="h-full w-full bg-[#EC407A] text-white font-black text-2xl flex items-center justify-center uppercase">
              {{ selectedUser.name ? selectedUser.name.charAt(0).toUpperCase() : 'U' }}
            </div>
          </div>

          <!-- New User Badge inside Modal -->
          <div v-if="isNewUser(selectedUser.createdAt)" class="mb-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[8px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full shadow-sm select-none">
            Người dùng mới
          </div>

          <h3 class="text-base font-black text-slate-800 dark:text-slate-100 truncate max-w-full leading-tight text-center">{{ selectedUser.name || 'User' }}</h3>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-1 truncate max-w-full font-bold select-all mb-4 text-center">{{ selectedUser.email }}</p>

          <!-- Rank status block -->
          <div class="w-full p-4 rounded-2xl border flex flex-col items-center select-none mb-6" :class="getRankStyles(selectedUser.rank).borderClass">
            <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest mb-2.5">Cấp bậc thành viên</span>
            <div class="relative group flex flex-col items-center">
              <!-- Animated background glow -->
              <div class="absolute inset-0 w-16 h-16 rounded-full blur-xl opacity-20 group-hover:scale-125 transition-transform duration-500" :class="getRankStyles(selectedUser.rank).glowClass"></div>
              <img :src="getRankStyles(selectedUser.rank).image" class="relative z-10 h-16 w-16 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110" :alt="selectedUser.rank" />
            </div>
            <span class="text-xs font-black text-slate-800 dark:text-slate-200 mt-3">{{ getRankStyles(selectedUser.rank).fullName }}</span>
          </div>

          <!-- Detail Metrics grid -->
          <div class="w-full grid grid-cols-2 gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/60 mb-5 select-none">
            <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center col-span-2">
              <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">Số dư khả dụng</span>
              <span class="text-sm font-black text-emerald-600 dark:text-emerald-450 block mt-1.5">{{ formatCurrency(selectedUser.availableBalance) }}</span>
            </div>
            <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center">
              <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">Ngày tham gia</span>
              <span class="text-xs font-black text-slate-700 dark:text-slate-200 block mt-1.5">{{ formatDate(selectedUser.createdAt) }}</span>
            </div>
            <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center">
              <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">Đơn thành công</span>
              <span class="text-xs font-black text-slate-700 dark:text-slate-200 block mt-1.5">{{ selectedUser.completedOrdersCount }} đơn</span>
            </div>
            <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center col-span-2">
              <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">Đơn thăng hạng</span>
              <span class="text-xs font-black text-slate-700 dark:text-slate-200 block mt-1.5">
                {{ selectedUser.ordersToNextRank > 0 ? `Thiếu ${selectedUser.ordersToNextRank} đơn hàng` : 'Đã đạt cấp tối thượng 💎' }}
              </span>
            </div>
          </div>

          <!-- Bottom Meta info -->
          <div class="w-full flex items-center justify-between text-[10px] text-slate-400 select-none">
            <span>Vai trò: {{ selectedUser.role === 1 ? 'ADMIN' : 'MEMBER' }}</span>
            <span class="select-all font-mono">UID: {{ selectedUser.id }}</span>
          </div>
        </div>
      </div>
    </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import { authClient } from "~/utils/auth-client";

definePageMeta({
  layout: "admin",
});

const { data: session } = await authClient.useSession(useFetch);
const router = useRouter();

// Route Protection: verify if current logged in user is admin
onMounted(() => {
  if (!session.value || session.value.user?.role !== 1) {
    // Redirect non-admin back to home
    router.replace("/");
  }
});

const { users, pagination, isLoading, error, fetchUsers } = useAdminUsers();

const searchQuery = ref("");
const selectedUser = ref(null);

watch(selectedUser, (newVal) => {
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

const handleSearch = () => {
  fetchUsers(1, searchQuery.value.trim());
};

const clearSearch = () => {
  searchQuery.value = "";
  fetchUsers(1);
};

// Debounced automatic search with 350ms delay to prevent backend API spamming while typing
let searchTimeout = null;
watch(searchQuery, (newVal) => {
  if (searchTimeout) clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    fetchUsers(1, newVal.trim());
  }, 350);
});

const changePage = (page) => {
  if (page < 1 || page > pagination.value.totalPages) return;
  fetchUsers(page, searchQuery.value.trim());
};

const openDetails = (user) => {
  selectedUser.value = user;
};

const closeDetails = () => {
  selectedUser.value = null;
};

const getRankStyles = (rank) => {
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "THÀNH VIÊN TINH HOA",
      image: "/saffi_obsidian.png",
      badgeClass: "bg-slate-900/10 dark:bg-slate-100/10 border-slate-900/20 text-slate-800 dark:text-slate-200",
      borderClass: "border-slate-200/60 dark:border-slate-800/80",
      glowClass: "bg-slate-500",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "THÀNH VIÊN VÀNG",
      image: "/saffi_gold.png",
      badgeClass: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500/20 dark:border-amber-500/20",
      glowClass: "bg-amber-500",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "THÀNH VIÊN BẠC",
      image: "/saffi_silver.png",
      badgeClass: "bg-slate-300/10 dark:bg-slate-300/15 border-slate-300/20 text-slate-600 dark:text-slate-400",
      borderClass: "border-slate-200 dark:border-slate-800",
      glowClass: "bg-slate-400",
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
  if (session.value && session.value.user?.role === 1) {
    await fetchUsers(1);
  }
});
</script>
