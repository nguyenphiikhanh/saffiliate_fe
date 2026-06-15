<template>
  <header 
    class="fixed top-0 left-0 right-0 z-50 w-full px-4 md:px-6 lg:px-8 pt-2 pb-1"
  >
    <div class="mx-auto max-w-7xl">
      <div 
        class="transition-[background-color,border-color,box-shadow] duration-500 ease-out flex items-center justify-between rounded-full border bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl px-4 py-2"
        :class="[
          isScrolled 
            ? 'border-slate-200/40 dark:border-slate-800/40 shadow-sm' 
            : 'border-slate-200/60 dark:border-slate-800/60 shadow-md shadow-slate-900/5 dark:shadow-slate-950/20'
        ]"
      >
        <!-- LEFT REGION: Logo, Dashboard Switch, and Hàng Icon Điều Hướng -->
        <div class="flex items-center gap-1 sm:gap-2">
          
          <!-- Logo Brand -->
          <NuxtLink to="/" class="flex items-center gap-2 mr-2 cursor-pointer group shrink-0">
            <!-- Brand Icon -->
            <div class="flex h-9 w-9 items-center justify-center shrink-0 transition-transform duration-500 group-hover:rotate-12 select-none">
              <img src="/saficon.png" class="h-9 w-9 object-contain rounded-xl shadow-sm" alt="Saffi Logo" />
            </div>
            
            <!-- Logo Text -->
            <div class="hidden sm:flex flex-col select-none">
              <span class="font-sans text-[17px] font-black tracking-tight text-slate-900 dark:text-white leading-none">
                S<span class="text-shopee-orange">affi</span>
              </span>
              <span class="text-[7.5px] font-bold tracking-widest text-slate-400 dark:text-slate-500 uppercase mt-0.5 leading-none">
                Smart Shopping
              </span>
            </div>
          </NuxtLink>

          <!-- Phân cách dọc 1 -->
          <div class="hidden md:block h-6 w-px bg-slate-200 dark:bg-slate-800 mx-2"></div>

          <!-- Nút Trang chủ (Dashboard) -->
          <NuxtLink 
            to="/"
            class="hidden md:flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
            :class="[
              route.path === '/'
                ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95'
                : 'h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-shopee-orange dark:hover:text-shopee-orange hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
            ]"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 transition-transform duration-300" :class="{'scale-110': route.path === '/'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/' ? '2.2' : '1.8'">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <!-- Tooltip -->
            <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
              <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 absolute -top-1 left-1/2 -translate-x-1/2"></div>
              <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                Trang chủ
              </div>
            </div>
          </NuxtLink>

          <!-- Hàng Icon Điều Hướng (Dành cho PC & iPad) -->
          <div class="hidden md:flex items-center gap-1.5 ml-1">
            <!-- Sparkles Icon (Hoàn Tiền - Subtle glow outline and badge when inactive) -->
            <NuxtLink 
              to="/hoan-tien" 
              class="flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
              :class="[
                route.path === '/hoan-tien'
                  ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95 z-10'
                  : 'h-8 w-8 bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10 text-shopee-orange hover:text-shopee-orange hover:bg-orange-500/10 hover:border-orange-500/20 hover:scale-105 active:scale-95'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="transition-transform duration-500 group-hover:rotate-12" :class="[route.path === '/hoan-tien' ? 'w-[19px] h-[19px]' : 'w-[18px] h-[18px]']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/hoan-tien' ? '2.2' : '1.8'" stroke-linecap="round" stroke-linejoin="round">
                <!-- Big curved star -->
                <path d="M12 3c0 4.5 3.5 8 8 8c-4.5 0-8 3.5-8 8c0-4.5-3.5-8-8-8c4.5 0 8-3.5 8-8Z" />
                <!-- Small dot -->
                <circle cx="6" cy="18" r="1" fill="currentColor" />
                <!-- Small star -->
                <path d="M19 5c0 1.5 1 2.5 2.5 2.5C20 7.5 19 8.5 19 10c0-1.5-1-2.5-2.5-2.5C18 7.5 19 6.5 19 5Z" />
              </svg>
              <!-- Glowing dot on desktop Hoàn Tiền to highlight main feature when inactive -->
              <span v-if="route.path !== '/hoan-tien'" class="absolute top-0 right-0 flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <!-- Tooltip -->
              <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
                <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 absolute -top-1 left-1/2 -translate-x-1/2"></div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                  Hoàn Tiền
                </div>
              </div>
            </NuxtLink>

            <!-- Box Icon (Đơn Hàng) -->
            <NuxtLink 
              to="/don-hang" 
              class="flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
              :class="[
                route.path === '/don-hang'
                  ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95'
                  : 'h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-shopee-orange dark:hover:text-shopee-orange hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{'scale-110': route.path === '/don-hang'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/don-hang' ? '2.2' : '1.8'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <!-- Tooltip -->
              <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
                <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 absolute -top-1 left-1/2 -translate-x-1/2"></div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                  Đơn Hàng
                </div>
              </div>
            </NuxtLink>

            <!-- Wallet Icon (Tài Chính) -->
            <NuxtLink 
              to="/tai-chinh" 
              class="flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
              :class="[
                route.path === '/tai-chinh'
                  ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95'
                  : 'h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-shopee-orange dark:hover:text-shopee-orange hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{'scale-110': route.path === '/tai-chinh'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/tai-chinh' ? '2.2' : '1.8'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              <!-- Tooltip -->
              <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
                <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 absolute -top-1 left-1/2 -translate-x-1/2"></div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                  Tài Chính
                </div>
              </div>
            </NuxtLink>

            <!-- Book Icon (Hướng Dẫn) -->
            <NuxtLink 
              to="/huong-dan" 
              class="flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
              :class="[
                route.path === '/huong-dan'
                  ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95'
                  : 'h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-shopee-orange dark:hover:text-shopee-orange hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{'scale-110': route.path === '/huong-dan'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/huong-dan' ? '2.2' : '1.8'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <!-- Tooltip -->
              <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
                <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-800 absolute -top-1 left-1/2 -translate-x-1/2"></div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                  Hướng Dẫn
                </div>
              </div>
            </NuxtLink>

            <!-- Support Icon (Hỗ Trợ) -->
            <NuxtLink 
              to="/ho-tro" 
              class="flex items-center justify-center rounded-full transition-spring cursor-pointer shrink-0 group relative"
              :class="[
                route.path === '/ho-tro'
                  ? 'h-9 w-9 bg-gradient-to-br from-shopee-orange to-orange-500 text-white shadow-lg shadow-orange-500/20 scale-108 active:scale-95'
                  : 'h-8 w-8 text-slate-400 dark:text-slate-500 hover:text-shopee-orange dark:hover:text-shopee-orange hover:bg-slate-50 dark:hover:bg-slate-800 hover:scale-105 active:scale-95'
              ]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 transition-transform duration-300" :class="{'scale-110': route.path === '/ho-tro'}" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/ho-tro' ? '2.2' : '1.8'">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <!-- Tooltip -->
              <div class="absolute top-[135%] left-1/2 -translate-x-1/2 pointer-events-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform scale-90 group-hover:scale-100 z-50 shrink-0">
                <div class="w-2 h-2 rotate-45 bg-slate-900 dark:bg-slate-900 absolute -top-1 left-1/2 -translate-x-1/2"></div>
                <div class="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-slate-900 text-white font-bold text-[11px] tracking-wide whitespace-nowrap shadow-xl">
                  Hỗ Trợ
                </div>
              </div>
            </NuxtLink>
          </div>

        </div>

        <!-- RIGHT REGION: Rank Badge, Profile Link, Theme Toggle, and User Capsule -->
        <div class="flex items-center gap-2 sm:gap-3">
          
          <!-- Rank Badge -->
          <div 
            v-if="user"
            class="flex items-center gap-1.5 px-3 py-1 rounded-full border select-none shrink-0 font-extrabold text-[11px] tracking-widest"
            :class="rankInfo.badgeClass"
            :title="`Hạng thành viên: ${rankInfo.fullName}`"
          >
            <img :src="rankInfo.image" class="h-4.5 w-4.5 object-contain shrink-0" :alt="rankInfo.name" />
            <span>{{ rankInfo.name }}</span>
          </div>


          <!-- Phân cách dọc 2 (Ẩn trên mobile) -->
          <div class="hidden sm:block h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1 shrink-0"></div>

          <!-- User Capsule (Better-Auth Session - tối giản không viền/nền và ẩn mũi tên trên mobile/tablet) -->
          <div 
            ref="capsuleRef"
            @click="toggleMenu"
            class="flex items-center gap-2 rounded-full border border-transparent lg:border-slate-200 dark:border-transparent lg:dark:border-slate-800 bg-transparent lg:bg-slate-50/50 dark:bg-transparent lg:dark:bg-slate-900/30 p-0 lg:pl-3 lg:pr-2 lg:py-1 select-none hover:border-transparent lg:hover:border-slate-300 dark:hover:border-transparent lg:hover:border-slate-700 transition-colors duration-300 shrink-0 cursor-pointer relative"
          >
            <span class="hidden lg:inline text-xs font-bold text-slate-700 dark:text-slate-200 truncate max-w-[100px] md:max-w-[120px]">
              {{ userName }}
            </span>
            <!-- Avatar Section -->
            <div class="h-8.5 w-8.5 rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-sm border border-slate-200/50 dark:border-slate-800 hover:scale-105 transition-transform">
              <img v-if="userAvatar" :src="userAvatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
              <div v-else class="h-full w-full bg-[#EC407A] text-white font-black text-sm flex items-center justify-center uppercase select-none">
                {{ firstLetter }}
              </div>
            </div>
            <!-- Arrow Down SVG (Ẩn trên mobile/tablet) -->
            <svg xmlns="http://www.w3.org/2000/svg" class="hidden lg:inline h-3 w-3 text-slate-400 dark:text-slate-500 transition-transform duration-300" :class="{ 'rotate-180': isMenuOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>

            <!-- Dropdown Menu Tài khoản -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0"
            >
              <div 
                v-if="isMenuOpen"
                ref="menuRef"
                @click.stop
                class="absolute right-0 top-[125%] mt-1 w-[290px] bg-white dark:bg-slate-900 rounded-[24px] shadow-2xl border border-slate-100 dark:border-slate-800/80 p-5 flex flex-col origin-top-right z-50 transition-all cursor-default"
              >
                <!-- 1. User Info -->
                <div class="flex items-center gap-3 pb-4 border-b border-slate-100 dark:border-slate-800/60">
                  <NuxtLink v-if="user?.role === 1" to="/admin/orders" @click="isMenuOpen = false" class="h-12 w-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm hover:scale-105 transition-transform" title="Vào trang quản trị">
                    <img v-if="userAvatar" :src="userAvatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
                    <div v-else class="h-full w-full bg-[#EC407A] text-white font-black text-lg flex items-center justify-center uppercase">
                      {{ firstLetter }}
                    </div>
                  </NuxtLink>
                  <div v-else class="h-12 w-12 rounded-full overflow-hidden flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-800 shadow-sm">
                    <img v-if="userAvatar" :src="userAvatar" class="h-full w-full object-cover" referrerpolicy="no-referrer" />
                    <div v-else class="h-full w-full bg-[#EC407A] text-white font-black text-lg flex items-center justify-center uppercase">
                      {{ firstLetter }}
                    </div>
                  </div>
                  <div class="flex flex-col truncate">
                    <span class="font-bold text-slate-800 dark:text-slate-100 text-[15px] leading-tight truncate">
                      {{ userName }}
                    </span>
                    <span class="text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5" :title="userEmail">
                      {{ userEmail }}
                    </span>
                  </div>
                </div>

                <!-- 2. Rank Badge -->
                <div v-if="user" class="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800/60">
                  <div 
                    class="flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-extrabold text-[10px] tracking-widest select-none shrink-0"
                    :class="rankInfo.badgeClass"
                  >
                    <img :src="rankInfo.image" class="h-4 w-4 object-contain shrink-0" :alt="rankInfo.name" />
                    <span>{{ rankInfo.name }}</span>
                  </div>
                  <span class="text-[10px] font-bold text-slate-400 dark:text-slate-550">Cấp bậc hiện tại</span>
                </div>

                <!-- 3. Navigation Links List -->
                <div class="flex flex-col gap-1 py-3 border-b border-slate-100 dark:border-slate-800/60">
                  <!-- Quản trị viên (Chỉ hiển thị nếu role là Admin) -->
                  <NuxtLink 
                    v-if="user?.role === 1"
                    to="/admin/orders" 
                    @click="isMenuOpen = false"
                    class="flex items-center gap-3 w-full p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer select-none text-left group"
                  >
                    <div class="h-8.5 w-8.5 rounded-xl bg-purple-500/10 dark:bg-purple-500/15 text-purple-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors duration-300">Quản lý Đơn Hàng</span>
                  </NuxtLink>

                  <!-- Quản lý thành viên (Admin) -->
                  <NuxtLink 
                    v-if="user?.role === 1"
                    to="/admin/users" 
                    @click="isMenuOpen = false"
                    class="flex items-center gap-3 w-full p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer select-none text-left group"
                  >
                    <div class="h-8.5 w-8.5 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/15 text-indigo-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors duration-300">Quản lý Thành Viên</span>
                  </NuxtLink>

                  <!-- Hồ sơ -->
                  <NuxtLink 
                    to="/ho-so" 
                    @click="isMenuOpen = false"
                    class="flex items-center gap-3 w-full p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer select-none text-left group"
                  >
                    <div class="h-8.5 w-8.5 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-shopee-orange dark:group-hover:text-shopee-orange transition-colors duration-300">Hồ sơ</span>
                  </NuxtLink>

                  <!-- Tài chính -->
                  <NuxtLink 
                    to="/tai-chinh" 
                    @click="isMenuOpen = false"
                    class="flex items-center gap-3 w-full p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer select-none text-left group"
                  >
                    <div class="h-8.5 w-8.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-700 dark:text-slate-200 group-hover:text-shopee-orange dark:group-hover:text-shopee-orange transition-colors duration-300">Tài chính</span>
                  </NuxtLink>
                </div>

                <!-- 4. Logout Section -->
                <div class="pt-3">
                  <button @click="handleLogout" class="flex items-center gap-3 w-full p-1.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-300 cursor-pointer select-none text-left group">
                    <div class="h-8.5 w-8.5 rounded-xl bg-slate-500/10 dark:bg-slate-500/15 text-slate-400 dark:text-slate-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                    </div>
                    <span class="text-xs font-bold text-slate-400 dark:text-slate-500 group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors duration-300">
                      Đăng xuất
                    </span>
                  </button>
                </div>
              </div>
            </transition>
          </div>

        </div>

      </div>
    </div>
  </header>
  <!-- Spacer to prevent content overlapping due to fixed header -->
  <div class="h-20 w-full pointer-events-none"></div>

  <!-- Mobile Bottom Navigation Bar (Apple Tab Bar Style) -->
  <div class="fixed bottom-0 left-0 right-0 z-[100] h-[72px] bg-white/98 dark:bg-slate-900/98 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800/80 flex justify-around items-center px-2 md:hidden pb-safe shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.04)] select-none transition-colors duration-300">
    
    <!-- Tab 1: Home -->
    <NuxtLink 
      to="/" 
      class="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors duration-200"
      :class="[route.path === '/' ? 'text-shopee-orange' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-200" :class="[route.path === '/' ? 'scale-105' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/' ? '2.5' : '2'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
      <span class="text-[10px] font-medium tracking-tight">Home</span>
    </NuxtLink>

    <!-- Tab 2: Hoàn Tiền -->
    <NuxtLink 
      to="/hoan-tien" 
      class="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors duration-200 relative"
      :class="[route.path === '/hoan-tien' ? 'text-shopee-orange' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-200" :class="[route.path === '/hoan-tien' ? 'scale-105 rotate-12' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/hoan-tien' ? '2.5' : '2'" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 3c0 4.5 3.5 8 8 8c-4.5 0-8 3.5-8 8c0-4.5-3.5-8-8-8c4.5 0 8-3.5 8-8Z" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
        <path d="M19 5c0 1.5 1 2.5 2.5 2.5C20 7.5 19 8.5 19 10c0-1.5-1-2.5-2.5-2.5C18 7.5 19 6.5 19 5Z" />
      </svg>
      <span class="text-[10px] font-medium tracking-tight" :class="{'font-bold text-shopee-orange': route.path === '/hoan-tien'}">Hoàn tiền</span>
      <!-- Subtle dot indicator if inactive -->
      <span v-if="route.path !== '/hoan-tien'" class="absolute top-2 right-4 flex h-2 w-2">
        <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </NuxtLink>

    <!-- Tab 3: Đơn hàng -->
    <NuxtLink 
      to="/don-hang" 
      class="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors duration-200"
      :class="[route.path === '/don-hang' ? 'text-shopee-orange' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-200" :class="[route.path === '/don-hang' ? 'scale-105' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/don-hang' ? '2.5' : '2'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
      <span class="text-[10px] font-medium tracking-tight">Đơn hàng</span>
    </NuxtLink>

    <!-- Tab 4: Tài Chính -->
    <NuxtLink 
      to="/tai-chinh" 
      class="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors duration-200"
      :class="[route.path === '/tai-chinh' ? 'text-shopee-orange' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-200" :class="[route.path === '/tai-chinh' ? 'scale-105' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/tai-chinh' ? '2.5' : '2'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
      <span class="text-[10px] font-medium tracking-tight">Tài Chính</span>
    </NuxtLink>

    <!-- Tab 5: Cá nhân -->
    <NuxtLink 
      to="/ho-so" 
      class="flex flex-col items-center justify-center gap-1 w-16 h-full transition-colors duration-200"
      :class="[route.path === '/ho-so' ? 'text-shopee-orange' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-400']"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 transition-transform duration-200" :class="[route.path === '/ho-so' ? 'scale-105' : '']" fill="none" viewBox="0 0 24 24" stroke="currentColor" :stroke-width="route.path === '/ho-so' ? '2.5' : '2'">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
      <span class="text-[10px] font-medium tracking-tight">Cá nhân</span>
    </NuxtLink>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { user, logout } = useAuth();

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const menuRef = ref(null);
const capsuleRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        isScrolled.value = window.scrollY > 40;
      }
      ticking = false;
    });
    ticking = true;
  }
};

const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    capsuleRef.value &&
    !capsuleRef.value.contains(event.target)
  ) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("click", handleClickOutside);
  // Initial check
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
});

// Dynamic values from Custom useAuth user info
const userName = computed(() => {
  return user.value?.name || "User";
});

const userAvatar = computed(() => {
  return user.value?.image || "";
});

const firstLetter = computed(() => {
  const name = userName.value;
  return name ? name.charAt(0).toUpperCase() : "U";
});

const userEmail = computed(() => {
  return user.value?.email || "youremail@saffi.com";
});

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "THÀNH VIÊN TINH HOA",
      image: "/saffi_obsidian.png",
      badgeClass: "bg-slate-900/10 dark:bg-slate-100/10 border-slate-900/20 text-slate-800 dark:text-slate-200",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "THÀNH VIÊN VÀNG",
      image: "/saffi_gold.png",
      badgeClass: "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 text-amber-600 dark:text-amber-400",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "THÀNH VIÊN BẠC",
      image: "/saffi_silver.png",
      badgeClass: "bg-slate-300/10 dark:bg-slate-300/15 border-slate-300/20 text-slate-600 dark:text-slate-400",
    };
  }
});

const handleLogout = async () => {
  try {
    await logout();
  } catch (error) {
    console.error("Đăng xuất thất bại:", error);
  }
};
</script>

<style scoped>
/* Hover and Premium Transition Utilities */
.transition-premium {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.glow-orange {
  box-shadow: 0 4px 14px 0 rgba(239, 83, 80, 0.2);
}

/* Custom spring physics curve for ultra-smooth mobile menu transitions */
.transition-spring {
  transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), 
              color 0.25s ease-out, 
              background-color 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
              border-color 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
              box-shadow 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
              width 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), 
              height 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
</style>
