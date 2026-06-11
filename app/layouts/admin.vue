<template>
  <div class="flex h-screen w-full bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 overflow-hidden relative font-sans">
    
    <!-- Mobile Sidebar Overlay -->
    <transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="isSidebarOpen" 
        @click="isSidebarOpen = false" 
        class="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-sm"
      ></div>
    </transition>

    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 lg:static w-64 h-full border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col z-50 transition-transform duration-300 ease-in-out lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <NuxtLink to="/admin" class="flex items-center gap-2.5 cursor-pointer" @click="isSidebarOpen = false">
          <div class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-[15px] leading-tight tracking-tight">Saffi</span>
            <span class="text-[9px] font-bold text-slate-500 tracking-widest uppercase">Workspace</span>
          </div>
        </NuxtLink>
      </div>

      <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        <NuxtLink 
          to="/admin"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
          :class="[
            $route.path === '/admin' || $route.path === '/admin/' 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Tổng quan
        </NuxtLink>

        <NuxtLink 
          to="/admin/orders"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
          :class="[
            $route.path.includes('/admin/orders') 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          Đơn hàng (Orders)
        </NuxtLink>

        <NuxtLink 
          to="/admin/withdrawals"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
          :class="[
            $route.path.includes('/admin/withdrawals') 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
          </svg>
          Rút tiền (Withdrawals)
        </NuxtLink>
        
        <NuxtLink 
          to="/admin/users"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
          :class="[
            $route.path.includes('/admin/users') 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Người dùng (Users)
        </NuxtLink>

        <NuxtLink 
          to="/admin/link-history"
          @click="isSidebarOpen = false"
          class="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold transition-all duration-200"
          :class="[
            $route.path.includes('/admin/link-history') 
              ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white' 
              : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300'
          ]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
          Lịch sử tạo Link
        </NuxtLink>
      </nav>
      
      <div class="p-4 shrink-0 border-t border-slate-200 dark:border-slate-800">
        <button 
          @click="handleSignOut" 
          class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer select-none text-left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4.5 h-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Đăng xuất
        </button>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 flex flex-col h-full overflow-hidden relative z-10 w-full min-w-0">
      <header class="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
        <div class="flex items-center gap-3">
          <button 
            @click="isSidebarOpen = !isSidebarOpen" 
            class="lg:hidden p-2 -ml-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 class="text-sm font-bold text-slate-800 dark:text-slate-100 hidden sm:block tracking-tight">Admin Console</h1>
        </div>
        <div class="flex items-center gap-3 select-none">
          <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 hidden sm:inline">{{ userName }}</span>
          <div class="h-8 w-8 rounded-full overflow-hidden flex items-center justify-center border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shrink-0">
            <img v-if="userAvatar" :src="userAvatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
            <div v-else class="h-full w-full bg-slate-800 dark:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs flex items-center justify-center uppercase">
              {{ firstLetter }}
            </div>
          </div>
        </div>
      </header>
      
      <div class="flex-1 overflow-y-auto scrollbar-hide p-4 sm:p-6 lg:p-8">
        <div class="max-w-[1400px] mx-auto w-full">
          <slot />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { useTheme } from "@/composables/useTheme";
import { useRoute } from "vue-router";

const route = useRoute();
const { initTheme } = useTheme();
const { user, logout } = useAuth();
const session = computed(() => user.value ? { user: user.value } : null);

const isSidebarOpen = ref(false);

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
});
</script>
