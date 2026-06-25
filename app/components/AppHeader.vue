<template>
  <div>
    <!-- Desktop & Tablet Header -->
    <a-layout-header class="app-header">
      <div class="header-container">
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center gap-2 mr-8">
          <NuxtImg src="/saficon.webp" class="w-8 h-8 rounded-lg shadow-sm" alt="Saffi" />
          <div class="flex items-center gap-1.5">
            <span class="font-black text-[17px] tracking-tight text-slate-800 dark:text-slate-100 leading-none">
              S<span class="text-[#ee4d2d]">affi</span>
            </span>
            <a-tag color="orange" :bordered="false" class="m-0 text-[8px] sm:text-[9px] font-extrabold tracking-widest rounded px-1.5 py-0.5 whitespace-nowrap">SMART SHOPPING</a-tag>
          </div>
        </NuxtLink>

        <!-- Desktop Menu -->
        <div class="hidden lg:block flex-1 overflow-hidden">
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="horizontal"
            class="header-menu"
            :style="{ lineHeight: '63px', borderBottom: 'none', background: 'transparent' }"
            @click="handleMenuClick"
          >
            <a-menu-item key="/">
              <template #icon><HomeOutlined /></template>
              Trang chủ
            </a-menu-item>
            <a-menu-item key="/hoan-tien">
              <template #icon><WalletOutlined /></template>
              <a-badge :dot="route.path !== '/hoan-tien'" color="#10b981" :offset="[5, 5]">
                Hoàn tiền
              </a-badge>
            </a-menu-item>
            <a-menu-item key="/don-hang">
              <template #icon><ShoppingCartOutlined /></template>
              Đơn hàng
            </a-menu-item>
            <a-menu-item key="/tai-chinh">
              <template #icon><BankOutlined /></template>
              Tài chính
            </a-menu-item>
            <a-menu-item key="/huong-dan">
              <template #icon><BookOutlined /></template>
              Hướng dẫn
            </a-menu-item>
            <a-menu-item key="/ho-tro">
              <template #icon><QuestionCircleOutlined /></template>
              Hỗ trợ
            </a-menu-item>
          </a-menu>
        </div>

        <!-- Right Side: User Dropdown & Mobile Menu Toggle -->
        <div class="flex items-center gap-3">
          <!-- Rank Badge (Hidden on mobile) -->
          <a-tag v-if="user" :color="rankColor" class="hidden md:inline-flex items-center font-bold px-2 py-1 rounded-full border-0 shadow-sm" style="margin-right: 0">
            <template #icon>
              <img :src="rankInfo.image" class="w-3.5 h-3.5 mr-1 inline-block" />
            </template>
            {{ rankInfo.name }}
          </a-tag>

          <!-- User Dropdown -->
          <a-dropdown :trigger="['click']" placement="bottomRight" v-if="user">
            <div class="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 p-1.5 rounded-full transition-colors border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm">
              <span class="text-xs font-bold text-slate-700 dark:text-slate-200 hidden sm:block pl-2">{{ userName }}</span>
              <a-avatar :src="userAvatar" :size="32" class="bg-indigo-500 font-bold uppercase">{{ firstLetter }}</a-avatar>
            </div>
            <template #overlay>
              <a-menu class="w-56 mt-2 rounded-xl shadow-lg border border-slate-100 dark:border-slate-800 p-1">
                <div class="px-3 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <div class="font-bold text-slate-800 dark:text-slate-100 text-sm truncate">{{ userName }}</div>
                  <div class="text-[11px] text-slate-500 truncate">{{ userEmail }}</div>
                </div>
                
                <a-menu-item v-if="isAdmin" key="/admin/orders" @click="router.push('/admin/orders')">
                  <template #icon><DashboardOutlined /></template>
                  Quản lý Đơn Hàng
                </a-menu-item>
                <a-menu-item v-if="isAdmin" key="/admin/users" @click="router.push('/admin/users')">
                  <template #icon><TeamOutlined /></template>
                  Quản lý Thành Viên
                </a-menu-item>
                
                <a-menu-divider v-if="isAdmin" />
                
                <a-menu-item key="/ho-so" @click="router.push('/ho-so')">
                  <template #icon><UserOutlined /></template>
                  Hồ sơ cá nhân
                </a-menu-item>
                <a-menu-item key="/tai-chinh" @click="router.push('/tai-chinh')">
                  <template #icon><BankOutlined /></template>
                  Ví & Tài chính
                </a-menu-item>
                
                <a-menu-divider />
                <a-menu-item key="logout" danger @click="handleLogout">
                  <template #icon><LogoutOutlined /></template>
                  Đăng xuất
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>

          <!-- Login Button -->
          <a-button v-else type="primary" @click="router.push('/dang-nhap')" class="font-bold shadow-sm rounded-lg" size="middle">
            Đăng nhập
          </a-button>
        </div>
      </div>
    </a-layout-header>

    <!-- Mobile Bottom Navigation (Option A) -->
    <div class="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 pb-safe z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.04)]">
      <div class="flex items-center justify-around h-[68px] px-1 pb-1">
        <div
          v-for="item in mobileMenuItems"
          :key="item.path"
          @click="handleMobileMenuClick({ key: item.path })"
          class="flex flex-col items-center justify-center w-full h-full cursor-pointer transition-all duration-300 relative z-10"
          :class="route.path === item.path ? 'text-[#ee4d2d] -translate-y-1' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'"
        >
          <div class="relative">
            <a-badge :dot="item.path === '/hoan-tien' && route.path !== item.path" color="#10b981" :offset="[0, 5]">
              <component :is="item.icon" class="text-[22px] mb-1 transition-transform duration-300" :class="route.path === item.path ? 'scale-110' : ''" />
            </a-badge>
          </div>
          <span class="text-[9px] font-extrabold uppercase tracking-widest mt-1 transition-colors duration-300">{{ item.name }}</span>
        </div>
      </div>
    </div>


  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  HomeOutlined,
  WalletOutlined,
  ShoppingCartOutlined,
  BankOutlined,
  BookOutlined,
  QuestionCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  TeamOutlined,
  MenuOutlined
} from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();
const { user, logout, isAdmin } = useAuth();

const selectedKeys = ref([route.path]);
const mobileMenuOpen = ref(false);

const mobileMenuItems = [
  { path: '/', name: 'Trang chủ', icon: HomeOutlined },
  { path: '/hoan-tien', name: 'Hoàn tiền', icon: WalletOutlined },
  { path: '/don-hang', name: 'Đơn hàng', icon: ShoppingCartOutlined },
  { path: '/tai-chinh', name: 'Tài chính', icon: BankOutlined },
];

watch(() => route.path, (newPath) => {
  selectedKeys.value = [newPath];
});

const handleMenuClick = ({ key }) => {
  router.push(key);
};

const handleMobileMenuClick = ({ key }) => {
  mobileMenuOpen.value = false;
  router.push(key);
};

const userName = computed(() => user.value?.name || "User");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => userName.value?.charAt(0).toUpperCase() || "U");
const userEmail = computed(() => user.value?.email || "");

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") return { name: "Tinh Hoa", image: "/saffi_obsidian.webp" };
  if (rank === "gold") return { name: "Vàng", image: "/saffi_gold.webp" };
  return { name: "Bạc", image: "/saffi_silver.webp" };
});

const rankColor = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") return "purple";
  if (rank === "gold") return "gold";
  return "default";
});

const handleLogout = async () => {
  try {
    await logout();
    router.push('/dang-nhap');
  } catch (error) {
    console.error("Logout failed:", error);
  }
};
</script>

<style scoped>
.app-header {
  position: sticky;
  top: 0;
  z-index: 50;
  width: 100%;
  height: 64px;
  line-height: 64px;
  padding: 0;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(226, 232, 240, 0.6);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.03);
}

html.dark .app-header {
  background: rgba(15, 23, 42, 0.85);
  border-bottom-color: rgba(30, 41, 59, 0.6);
}

.header-container {
  max-width: 1280px;
  margin: 0 auto;
  height: 100%;
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

:deep(.header-menu) {
  font-weight: 600;
  color: #64748b;
}

html.dark :deep(.header-menu) {
  color: #94a3b8;
}

:deep(.ant-menu-horizontal > .ant-menu-item-selected) {
  color: #ee4d2d !important;
}

:deep(.ant-menu-horizontal > .ant-menu-item-selected::after) {
  border-bottom-color: #ee4d2d !important;
}

:deep(.ant-menu-horizontal > .ant-menu-item:hover) {
  color: #ee4d2d !important;
}

:deep(.ant-menu-horizontal > .ant-menu-item:hover::after) {
  border-bottom-color: #ee4d2d !important;
}

</style>
