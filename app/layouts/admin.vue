<template>
  <a-layout class="h-screen overflow-hidden">
    <!-- Sidebar -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :breakpoint="'lg'"
      collapsed-width="0"
      :zero-width-trigger-style="{ display: 'none' }"
      class="border-r border-slate-200 dark:border-slate-800 overflow-y-auto"
      theme="light"
      :style="{ background: 'var(--bg-color)', zIndex: 100 }"
    >
      <!-- Logo -->
      <div class="h-16 flex items-center justify-center border-b border-slate-200 dark:border-slate-800 px-4">
        <NuxtLink to="/admin" class="flex items-center gap-2 cursor-pointer w-full overflow-hidden">
          <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 flex items-center justify-center text-white dark:text-slate-900 shrink-0">
            <span class="font-black text-lg leading-none">S</span>
          </div>
          <div class="flex flex-col" v-show="!collapsed">
            <span class="font-bold text-[15px] leading-tight tracking-tight text-slate-800 dark:text-slate-100">Saffi</span>
            <span class="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Workspace</span>
          </div>
        </NuxtLink>
      </div>

      <!-- Navigation Menu -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        class="border-r-0 py-4"
        style="background: transparent"
        @click="handleMenuClick"
      >
        <a-menu-item key="/admin">
          <template #icon><DashboardOutlined /></template>
          Tổng quan
        </a-menu-item>
        
        <a-menu-item key="/admin/orders">
          <template #icon><ShoppingCartOutlined /></template>
          Đơn hàng (Orders)
        </a-menu-item>
        
        <a-menu-item key="/admin/withdrawals">
          <template #icon><WalletOutlined /></template>
          Rút tiền (Withdrawals)
        </a-menu-item>
        
        <a-menu-item key="/admin/users">
          <template #icon><TeamOutlined /></template>
          Người dùng (Users)
        </a-menu-item>
        
        <a-menu-item key="/admin/transaction-history">
          <template #icon><HistoryOutlined /></template>
          Lịch sử giao dịch
        </a-menu-item>

        <a-menu-item key="/admin/link-history">
          <template #icon><LinkOutlined /></template>
          Lịch sử tạo Link
        </a-menu-item>
        
        <a-menu-item key="/admin/settings">
          <template #icon><SettingOutlined /></template>
          Cấu hình hệ thống
        </a-menu-item>
        
        <a-divider style="margin: 8px 0" />
        
        <a-menu-item key="logout" danger @click="handleSignOut">
          <template #icon><LogoutOutlined /></template>
          Đăng xuất
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- Main Layout -->
    <a-layout>
      <!-- Header -->
      <a-layout-header class="h-16 px-4 lg:px-8 flex items-center justify-between border-b border-slate-200 dark:border-slate-800" style="background: var(--bg-color); padding: 0 24px;">
        <div class="flex items-center gap-4">
          <a-button 
            type="text" 
            class="lg:hidden" 
            @click="collapsed = !collapsed"
          >
            <MenuUnfoldOutlined v-if="collapsed" class="text-lg" />
            <MenuFoldOutlined v-else class="text-lg" />
          </a-button>
          <h1 class="text-sm font-bold text-slate-800 dark:text-slate-100 hidden sm:block tracking-tight mb-0">Admin Console</h1>
        </div>

        <div class="flex items-center gap-3 select-none">
          <a-button type="text" shape="circle" @click="toggleTheme" class="flex items-center justify-center mr-1" title="Chuyển đổi giao diện Sáng/Tối">
            <template #icon>
              <span class="text-[16px] leading-none">{{ isDark ? '🌞' : '🌙' }}</span>
            </template>
          </a-button>

          <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">{{ userName }}</span>
          <div class="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
            <img v-if="userAvatar" :src="userAvatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
            <div v-else class="h-full w-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center uppercase">
              {{ firstLetter }}
            </div>
          </div>
        </div>
      </a-layout-header>

      <!-- Content -->
      <a-layout-content class="overflow-y-auto p-4 sm:p-6 lg:p-8" style="background: var(--bg-content);">
        <div class="max-w-[1400px] mx-auto w-full">
          <slot />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { onMounted, computed, ref, watch } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useRoute, useRouter } from "vue-router";
import { 
  DashboardOutlined, 
  ShoppingCartOutlined, 
  WalletOutlined, 
  TeamOutlined, 
  LinkOutlined, 
  SettingOutlined, 
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HistoryOutlined
} from "@ant-design/icons-vue";

const route = useRoute();
const router = useRouter();
const { initTheme, toggleTheme, isDark } = useTheme();
const { user, logout } = useAuth();

const collapsed = ref(false);
const selectedKeys = ref([route.path]);

// Sync active menu item with route changes
watch(() => route.path, (newPath) => {
  // Ignore logout key or specific sub-paths if necessary
  // Here we do simple matching. If path is exactly /admin, we select /admin.
  // Otherwise we match the base path like /admin/orders.
  const pathParts = newPath.split('/');
  if (pathParts.length > 3) {
    selectedKeys.value = [`/${pathParts[1]}/${pathParts[2]}`];
  } else {
    selectedKeys.value = [newPath];
  }
});

const handleMenuClick = ({ key }) => {
  if (key === 'logout') return;
  router.push(key);
  // Auto collapse on mobile after navigation
  if (window.innerWidth < 992) {
    collapsed.value = true;
  }
};

const userName = computed(() => user.value?.name || "Admin");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => userName.value.charAt(0).toUpperCase());

const handleSignOut = async () => {
  try {
    await logout();
  } catch (err) {
    console.error("Lỗi khi đăng xuất:", err);
  }
};

onMounted(() => {
  initTheme();
  // Close sidebar by default on mobile on initial load
  if (window.innerWidth < 992) {
    collapsed.value = true;
  }
});
</script>

<style scoped>
:deep(.ant-layout-sider) {
  background: var(--bg-color) !important;
}

:deep(.ant-menu) {
  background: transparent !important;
}

:deep(.ant-layout-header) {
  background: var(--bg-color) !important;
}

:deep(.ant-layout-content) {
  background: var(--bg-content) !important;
}

:deep(.ant-menu-item-selected) {
  background-color: var(--ant-primary-color-deprecated-bg) !important;
  font-weight: bold;
}
</style>

<style>
/* Add custom CSS variables to match your Tailwind setup dynamically based on dark mode class if needed */
html {
  --bg-color: #ffffff;
  --bg-content: #f8fafc; /* slate-50 */
}

html.dark {
  --bg-color: #020617; /* slate-950 */
  --bg-content: #0B0F19; /* dark theme content bg */
}
</style>
