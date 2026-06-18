<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500">
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

      <div class="flex items-center gap-3 w-full sm:w-auto">
        <!-- Limit Dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-xs font-bold text-slate-450 dark:text-slate-500 select-none"
            >Hiển thị:</span
          >
          <select
            v-model="selectedLimit"
            @change="handleLimitChange"
            class="block w-18 px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 transition cursor-pointer font-bold"
          >
            <option v-for="val in [10, 20, 50, 100]" :key="val" :value="val">
              {{ val }}
            </option>
          </select>
        </div>

        <!-- Rank Dropdown -->
        <div class="flex items-center gap-1.5 shrink-0">
          <span
            class="text-xs font-bold text-slate-450 dark:text-slate-500 select-none"
            >Cấp bậc:</span
          >
          <select
            v-model="selectedRank"
            @change="handleRankChange"
            class="block w-28 px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-slate-400 transition cursor-pointer font-bold"
          >
            <option value="all">Tất cả</option>
            <option value="silver">Bạc</option>
            <option value="gold">Vàng</option>
            <option value="obsidian">Tinh hoa</option>
          </select>
        </div>

        <!-- Search Box (Option C: Integrated Bordered Input Group with Icon Button) -->
        <div
          class="flex items-center flex-1 sm:w-72 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 overflow-hidden focus-within:ring-1 focus-within:ring-slate-400 transition-all"
        >
          <div class="relative flex-1 flex items-center">
            <input
              v-model="searchQuery"
              @keyup.enter="handleSearch"
              type="text"
              placeholder="Tìm kiếm tên, email..."
              class="w-full bg-transparent pl-4 pr-9 py-2.5 text-sm text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none font-medium border-0 ring-0"
            />
            <button
              v-if="searchQuery"
              @click="clearSearch"
              type="button"
              class="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4.5 w-4.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <button
            @click="handleSearch"
            type="button"
            class="bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800/80 border-l border-slate-200 dark:border-slate-700 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer shrink-0"
            title="Tìm kiếm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4.5 w-4.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-if="error"
      class="p-4 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-400 text-sm font-medium flex items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{{ error }}</span>
    </div>

    <!-- Loading State -->
    <div
      v-if="isLoading"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <div
        v-for="n in 8"
        :key="n"
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4 animate-pulse"
      >
        <div
          class="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0"
        ></div>
        <div class="flex-1 space-y-2">
          <div class="h-3.5 bg-slate-200 dark:bg-slate-800 rounded w-3/4"></div>
          <div class="h-2.5 bg-slate-200 dark:bg-slate-800 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div
      v-else-if="users.length === 0"
      class="bg-white dark:bg-slate-900 p-12 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm text-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-10 w-10 mx-auto text-slate-400 dark:text-slate-600 mb-3"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="1.5"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1">
        Không tìm thấy người dùng
      </h3>
      <p class="text-xs text-slate-500">Vui lòng thử lại với từ khóa khác.</p>
    </div>

    <!-- Users Data Table (Desktop/Tablet) -->
    <div class="hidden md:block bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/10 transition-all">
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase tracking-wider font-bold text-slate-400 bg-slate-50/40 dark:bg-slate-900/40 border-b border-slate-200 dark:border-slate-800">
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
                  :class="user.role === 'admin' ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'"
                >
                  {{ user.role === 'admin' ? 'Admin' : 'Member' }}
                </span>
              </td>

              <!-- Rank -->
              <td class="px-4 py-3.5 text-center">
                <div class="inline-flex items-center justify-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-black tracking-wide uppercase" :class="getRankStyles(user.rank).badgeClass">
                  <img :src="getRankStyles(user.rank).image" class="h-3.5 w-3.5 object-contain shrink-0" :alt="user.rank" />
                  <span>{{ getRankStyles(user.rank).name }}</span>
                </div>
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
    </div>

    <!-- Users Grid Card List (Mobile) -->
    <div class="block md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div
        v-for="user in users"
        :key="user.id"
        @click="openDetails(user)"
        class="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02] hover:scale-[1.01] transition-all duration-200 flex flex-col cursor-pointer relative"
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
          <div
            class="flex items-center gap-1.5 px-2 py-0.5 rounded bg-slate-50 dark:bg-slate-800/50 border text-[9px] font-black tracking-wider shrink-0"
            :class="getRankStyles(user.rank).badgeClass"
          >
            <img
              :src="getRankStyles(user.rank).image"
              class="h-3.5 w-3.5 object-contain shrink-0"
              :alt="user.rank"
            />
            <span>{{ getRankStyles(user.rank).name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="pagination.totalPages > 1"
      class="flex items-center justify-center gap-2 mt-4"
    >
      <button
        @click="changePage(pagination.page - 1)"
        :disabled="pagination.page === 1"
        class="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <span
        class="text-xs font-semibold text-slate-600 dark:text-slate-400 px-2"
      >
        Trang {{ pagination.page }} / {{ pagination.totalPages }}
      </span>

      <button
        @click="changePage(pagination.page + 1)"
        :disabled="pagination.page === pagination.totalPages"
        class="h-9 w-9 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>

    <!-- User Details Drawer -->
    <Teleport to="body">
      <transition
        enter-active-class="transition-opacity duration-300"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="selectedUser"
          class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm"
          @click="closeDetails"
        ></div>
      </transition>

      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div
          v-if="selectedUser"
          class="fixed inset-y-0 right-0 z-[210] w-full max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden"
        >
          <!-- Drawer Header -->
          <div
            class="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0"
          >
            <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">
              Hồ sơ người dùng
            </h3>
            <button
              @click="closeDetails"
              class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <!-- Drawer Content -->
          <div class="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div class="flex flex-col items-center text-center mb-8">
              <!-- Avatar -->
              <div
                class="h-20 w-20 rounded-full overflow-hidden flex items-center justify-center bg-slate-100 dark:bg-slate-800 mb-4 border border-slate-200 dark:border-slate-700"
              >
                <img
                  v-if="selectedUser.image"
                  :src="selectedUser.image"
                  class="h-full w-full object-cover"
                  referrerpolicy="no-referrer"
                />
                <div
                  v-else
                  class="h-full w-full text-slate-500 dark:text-slate-400 font-bold text-2xl flex items-center justify-center uppercase"
                >
                  {{
                    selectedUser.name
                      ? selectedUser.name.charAt(0).toUpperCase()
                      : "U"
                  }}
                </div>
              </div>
              <h3
                class="text-lg font-bold text-slate-800 dark:text-slate-100 leading-tight"
              >
                {{ selectedUser.name || "User" }}
              </h3>
              <p class="text-sm text-slate-500 mt-1 font-medium select-all">
                {{ selectedUser.email }}
              </p>

              <div
                v-if="isNewUser(selectedUser.createdAt)"
                class="mt-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded"
              >
                Người dùng mới
              </div>
            </div>

            <!-- Detail Metrics -->
            <div class="space-y-4">
              <!-- Rank -->
              <div
                class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <span
                  class="text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                  >Cấp bậc</span
                >
                <div class="flex items-center gap-2">
                  <img
                    :src="getRankStyles(selectedUser.rank).image"
                    class="h-5 w-5 object-contain"
                    :alt="selectedUser.rank"
                  />
                  <span
                    class="text-xs font-bold text-slate-800 dark:text-slate-200"
                    >{{ getRankStyles(selectedUser.rank).fullName }}</span
                  >
                </div>
              </div>

              <!-- Balance -->
              <div
                class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between"
              >
                <span
                  class="text-[11px] font-bold text-slate-500 uppercase tracking-wider"
                  >Số dư khả dụng</span
                >
                <span
                  class="text-sm font-bold text-emerald-600 dark:text-emerald-400"
                  >{{
                    formatCurrency(selectedUser.availableBalance)
                  }}</span
                >
              </div>

              <!-- Stats Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div
                  class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <span
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1"
                    >Tham gia</span
                  >
                  <span
                    class="text-sm font-bold text-slate-800 dark:text-slate-200"
                    >{{ formatDate(selectedUser.createdAt) }}</span
                  >
                </div>
                <div
                  class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
                >
                  <span
                    class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1"
                    >Đơn thành công</span
                  >
                  <span
                    class="text-sm font-bold text-slate-800 dark:text-slate-200"
                    >{{ selectedUser.completedOrdersCount }}</span
                  >
                </div>
              </div>

              <!-- Progress to next rank -->
              <div
                class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <span
                  class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2"
                  >Thăng hạng</span
                >
                <div
                  class="text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  {{
                    selectedUser.ordersToNextRank > 0
                      ? `Cần thêm ${selectedUser.ordersToNextRank} đơn hàng`
                      : "Đã đạt cấp tối đa"
                  }}
                </div>
              </div>

              <!-- Meta info -->
              <div
                class="pt-4 flex items-center justify-between text-xs text-slate-400 font-medium border-t border-slate-200 dark:border-slate-800"
              >
                <span
                  >Vai trò:
                  {{ selectedUser.role === "admin" ? "ADMIN" : "MEMBER" }}</span
                >
                <span class="select-all">UID: {{ selectedUser.id }}</span>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, onUnmounted, computed } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Quản lý Thành Viên | Admin Saffiliate",
});

const { user, isAdmin } = useAuth();
const router = useRouter();

// Route Protection: verify if current logged in user is admin
onMounted(() => {
  if (!isAdmin.value) {
    // Redirect non-admin back to home
    router.replace("/");
  }
});

const { users, pagination, isLoading, error, fetchUsers } = useAdminUsers();

const searchQuery = ref("");
const selectedUser = ref(null);
const selectedLimit = ref(10);
const selectedRank = ref("all");

const handleLimitChange = () => {
  fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

const handleRankChange = () => {
  fetchUsers(1, searchQuery.value.trim(), selectedLimit.value, selectedRank.value);
};

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

const getRankStyles = (rank) => {
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "Thành viên Tinh Hoa",
      image: "/saffi_obsidian.png",
      badgeClass:
        "border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "Thành viên Vàng",
      image: "/saffi_gold.png",
      badgeClass:
        "border-amber-200 dark:border-amber-800/50 text-amber-600 dark:text-amber-400",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "Thành viên Bạc",
      image: "/saffi_silver.png",
      badgeClass:
        "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400",
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
