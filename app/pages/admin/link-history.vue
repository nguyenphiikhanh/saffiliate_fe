<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500">
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

      <button
        @click="refresh"
        :disabled="pending"
        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-semibold text-[13px] transition-colors duration-200 disabled:opacity-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          :class="{ 'animate-spin text-slate-400': pending }"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Làm mới
      </button>
    </div>

    <!-- Data Table Container -->
    <div
      class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
    >
      <!-- Filter Toolbar -->
      <div
        class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <!-- Filter by User Button -->
        <button
          @click="showUserModal = true"
          class="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm font-medium transition-colors hover:border-slate-300 dark:hover:border-slate-600"
          :class="
            selectedUserFilter
              ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20'
              : 'text-slate-700 dark:text-slate-200'
          "
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
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <span class="truncate max-w-[150px]">{{
            selectedUserFilter
              ? selectedUserFilter.name || selectedUserFilter.email
              : "Tìm theo người dùng"
          }}</span>
          <div
            v-if="selectedUserFilter"
            @click.stop="clearUserFilter"
            class="ml-1 p-0.5 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-800 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3 w-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </button>

        <!-- Date Range Filter -->
        <div class="flex items-center gap-2">
          <input
            type="date"
            v-model="startDate"
            class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
          <span class="text-slate-400 font-medium text-sm">-</span>
          <input
            type="date"
            v-model="endDate"
            class="px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm text-slate-700 dark:text-slate-200 font-medium focus:outline-none focus:ring-1 focus:ring-slate-400"
          />
        </div>

        <!-- Limit Selection -->
        <div class="flex items-center gap-2 ml-auto sm:ml-0">
          <span class="text-sm font-medium text-slate-500">Hiển thị:</span>
          <select
            v-model="limit"
            class="px-2 py-1.5 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-slate-400 cursor-pointer"
          >
            <option :value="10">10</option>
            <option :value="20">20</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
          </select>
        </div>

        <!-- Clear Filter Button -->
        <button
          v-if="startDate || endDate || selectedUserFilter"
          @click="clearAllFilters"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Xóa bộ lọc
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr
              class="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800"
            >
              <th class="px-4 py-3 pl-6 whitespace-nowrap w-[10%]">
                Thời Gian
              </th>
              <th class="px-4 py-3 whitespace-nowrap w-[20%]">Tạo Bởi</th>
              <th class="px-4 py-3 whitespace-nowrap w-[10%]">Nền Tảng</th>
              <th class="px-4 py-3 whitespace-nowrap w-[55%]">Sản Phẩm</th>
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
                <div class="flex flex-col gap-2 animate-pulse">
                  <div
                    v-for="i in 5"
                    :key="i"
                    class="h-10 bg-slate-100 dark:bg-slate-800/50 rounded w-full"
                  ></div>
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
                  {{ new Date(item.createdAt).toLocaleDateString("vi-VN") }}
                </div>
                <div class="text-[10px] text-slate-400 font-medium">
                  {{ new Date(item.createdAt).toLocaleTimeString("vi-VN") }}
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
                          : item.userId
                          ? item.userId.charAt(0)
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
                      :title="item.user?.email || item.userId"
                      >{{ item.user?.email || item.userId }}</span
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
                    {{ formatMiniJson(item.productInfo) }}
                  </div>
                </div>
              </td>
              <!-- Chi tiết -->
              <td class="px-4 py-3 text-center">
                <button
                  class="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
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
          <button
            @click="page--"
            :disabled="page <= 1"
            class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &lt;
          </button>
          <button
            @click="page++"
            :disabled="page >= totalPages"
            class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- Detail Drawer -->
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
          v-if="selectedItem"
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
          v-if="selectedItem"
          class="fixed inset-y-0 right-0 z-[210] w-full max-w-2xl bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden"
        >
          <!-- Drawer Header -->
          <div
            class="flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0"
          >
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
                Product Info
              </h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">
                Lưu lúc:
                {{ new Date(selectedItem.createdAt).toLocaleString("vi-VN") }}
              </p>
            </div>
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

          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-6 bg-slate-50 dark:bg-slate-900">
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
                <button
                  @click="copyJson(selectedItem.productInfo)"
                  class="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy
                </button>
              </div>
              <div class="p-4 overflow-x-auto">
                <pre
                  class="text-[13px] leading-relaxed text-emerald-400 font-mono"
                  >{{ formatJson(selectedItem.productInfo) }}</pre
                >
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>

    <!-- User Selection Modal (Command Palette Style) -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showUserModal"
          class="fixed inset-0 z-[300] flex items-start justify-center pt-[10vh] sm:pt-[15vh] p-4"
        >
          <div
            class="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            @click="showUserModal = false"
          ></div>

          <transition
            enter-active-class="transition transform duration-300 ease-out"
            enter-from-class="opacity-0 scale-95 -translate-y-4"
            enter-to-class="opacity-100 scale-100 translate-y-0"
            leave-active-class="transition transform duration-200 ease-in"
            leave-from-class="opacity-100 scale-100 translate-y-0"
            leave-to-class="opacity-0 scale-95 -translate-y-4"
          >
            <div
              v-if="showUserModal"
              class="relative bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex flex-col max-h-[500px]"
            >
              <!-- Search Header (Seamless) -->
              <div
                class="relative flex items-center gap-3 px-4 py-4 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900"
              >
                <!-- Search Icon/Indicator -->
                <svg
                  class="h-5 w-5 text-slate-400 shrink-0 ml-1"
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

                <!-- Input wrapper containing Input + Clear Button + Search Button -->
                <div class="relative flex-1 flex items-center">
                  <input
                    v-model="userSearchQuery"
                    type="text"
                    placeholder="Tìm kiếm người dùng theo tên, email..."
                    class="w-full pl-2 pr-24 py-2 bg-transparent text-base sm:text-lg focus:outline-none font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400"
                    autofocus
                    @keydown.enter="handleUserSearch"
                  />

                  <!-- Action buttons inside the right edge of input -->
                  <div class="absolute right-0 flex items-center gap-2">
                    <!-- Clear button -->
                    <button
                      v-if="userSearchQuery"
                      @click="clearUserSearch"
                      class="p-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      title="Xóa tìm kiếm"
                      type="button"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>

                    <!-- Search button -->
                    <button
                      @click="handleUserSearch"
                      class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 font-semibold text-xs transition-colors duration-200 shadow-sm"
                      type="button"
                    >
                      <span>Tìm</span>
                    </button>
                  </div>
                </div>

                <!-- Divider -->
                <div class="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 shrink-0"></div>

                <!-- Close Button -->
                <button
                  @click="showUserModal = false"
                  class="shrink-0 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title="Đóng (Esc)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <!-- Users List -->
              <div
                class="flex-1 overflow-y-auto p-2 min-h-[150px] bg-slate-50/50 dark:bg-slate-900/20"
              >
                <div
                  v-if="usersLoading"
                  class="flex flex-col items-center justify-center h-full text-slate-400 gap-3 py-8"
                >
                  <svg
                    class="animate-spin h-6 w-6 text-indigo-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span class="text-sm font-medium">Đang tìm kiếm...</span>
                </div>

                <div
                  v-else-if="usersList.length === 0"
                  class="flex flex-col items-center justify-center h-full text-slate-500 gap-2 py-8"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-10 w-10 text-slate-300 dark:text-slate-700"
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
                  <p class="text-sm font-medium">
                    Không tìm thấy người dùng phù hợp
                  </p>
                </div>

                <div v-else class="space-y-1">
                  <button
                    v-for="u in usersList"
                    :key="u.id"
                    @click="applyUserFilter(u)"
                    class="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 text-left group border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm"
                  >
                    <div class="flex items-center gap-3 min-w-0">
                      <div
                        class="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/50 overflow-hidden relative group-hover:scale-105 transition-transform"
                      >
                        <img
                          v-if="u.image"
                          :src="u.image"
                          class="h-full w-full object-cover"
                        />
                        <span
                          v-else
                          class="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase"
                          >{{ u.name ? u.name.charAt(0) : "U" }}</span
                        >
                      </div>
                      <div class="flex flex-col min-w-0">
                        <span
                          class="text-sm font-bold text-slate-800 dark:text-slate-100 truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors"
                          >{{ u.name || "Người dùng Saffi" }}</span
                        >
                        <span
                          class="text-[11px] font-medium text-slate-500 truncate mt-0.5"
                          >{{ u.email }}</span
                        >
                      </div>
                    </div>
                    <div
                      class="opacity-0 group-hover:opacity-100 transition-opacity flex items-center shrink-0"
                    >
                      <span
                        class="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded"
                        >CHỌN</span
                      >
                    </div>
                  </button>
                </div>
              </div>

              <!-- Pagination -->
              <div
                v-if="userPagination.totalPages > 1"
                class="px-4 py-3 border-t border-slate-100 dark:border-slate-800/60 flex justify-between items-center bg-white dark:bg-slate-900"
              >
                <span
                  class="text-[11px] font-bold text-slate-400 tracking-wider uppercase"
                  >Trang {{ userPagination.page }} /
                  {{ userPagination.totalPages }}</span
                >
                <div class="flex gap-1">
                  <button
                    @click="
                      fetchUsers(userPagination.page - 1, userSearchQuery)
                    "
                    :disabled="userPagination.page === 1"
                    class="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
                  <button
                    @click="
                      fetchUsers(userPagination.page + 1, userSearchQuery)
                    "
                    :disabled="
                      userPagination.page === userPagination.totalPages
                    "
                    class="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-4 w-4"
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
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </Teleport>
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

// We must manually pass headers due to server side API call requiring auth
const headers = useRequestHeaders(["cookie"]);
const {
  data: response,
  refresh,
  pending,
} = useFetch("/api/admin/link-history", {
  headers,
  query: queryParams,
  lazy: true,
  watch: [page, limit, startDate, endDate, selectedUserFilter], // auto refetch when these change
});

const links = computed(() => {
  if (!response.value) return [];
  if (response.value.data) return response.value.data;
  return [];
});

const totalPages = computed(() => {
  if (!response.value || !response.value.meta) return 1;
  return Math.ceil(response.value.meta.total / limit.value);
});

// Reset page when filters or limit change
watch([limit, startDate, endDate, selectedUserFilter], () => {
  page.value = 1;
});

// --- Detail Drawer ---
const selectedItem = ref(null);

const openDetails = (item) => {
  selectedItem.value = item;
};

const closeDetails = () => {
  selectedItem.value = null;
};

watch(selectedItem, (newVal) => {
  if (typeof document !== "undefined") {
    if (newVal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
  }
});

onUnmounted(() => {
  if (typeof document !== "undefined") document.body.style.overflow = "";
});

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

const handleUserSearch = () => {
  fetchUsers(1, userSearchQuery.value.trim());
};

const clearUserSearch = () => {
  userSearchQuery.value = "";
  fetchUsers(1, "");
};

const handleEscKey = (e) => {
  if (e.key === "Escape") {
    showUserModal.value = false;
  }
};

watch(showUserModal, (newVal) => {
  if (newVal) {
    if (usersList.value.length === 0) {
      fetchUsers(1);
    }
    if (typeof window !== "undefined") {
      window.addEventListener("keydown", handleEscKey);
    }
  } else {
    if (typeof window !== "undefined") {
      window.removeEventListener("keydown", handleEscKey);
    }
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

const formatMoney = (val) => {
  if (!val) return "0đ";
  return Number(val).toLocaleString("vi-VN") + "đ";
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
