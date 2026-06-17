<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2
          class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          Quản lý Đơn hàng
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Theo dõi, đối soát và upload dữ liệu đơn hàng từ mạng Affiliate.
        </p>
      </div>

      <button
        @click="showUploadModal = true"
        class="flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-lg font-semibold text-[13px] shadow-sm transition-all duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
          />
        </svg>
        Upload CSV
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <div
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div
          class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
        >
          Tổng đơn hàng
        </div>
        <div
          v-if="pending && !response"
          class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"
        ></div>
        <div
          v-else
          class="text-xl font-bold text-slate-800 dark:text-white mt-1"
        >
          {{ orders?.length || 0 }}
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div
          class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
        >
          Chờ duyệt
        </div>
        <div
          v-if="pending && !response"
          class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"
        ></div>
        <div v-else class="text-xl font-bold text-amber-500 mt-1">
          {{ pendingCount }}
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div
          class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
        >
          Hoa hồng sàn
        </div>
        <div
          v-if="pending && !response"
          class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"
        ></div>
        <div
          v-else
          class="text-xl font-bold text-indigo-600 dark:text-indigo-400 mt-1"
        >
          {{ formatMoney(totalCommission) }}
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
      >
        <div
          class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
        >
          Hoa hồng User nhận
        </div>
        <div
          v-if="pending && !response"
          class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"
        ></div>
        <div
          v-else
          class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1"
        >
          {{ formatMoney(totalUserCommission) }}
        </div>
      </div>
      <div
        class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm col-span-2 md:col-span-1"
      >
        <div
          class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider"
        >
          Doanh thu (Lợi nhuận)
        </div>
        <div
          v-if="pending && !response"
          class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"
        ></div>
        <div
          v-else
          class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1"
        >
          {{ formatMoney(systemRevenue) }}
        </div>
      </div>
    </div>

    <!-- Data Table Container -->
    <div
      class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
    >
      <!-- Toolbar -->
      <div
        class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <!-- Filter by User Button -->
        <button
          @click="showUserModal = true"
          class="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-950 text-sm font-medium transition-colors hover:border-slate-300 dark:hover:bg-slate-600 cursor-pointer whitespace-nowrap"
          :class="
            selectedUserFilter
              ? 'text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 bg-indigo-50/50 dark:bg-indigo-900/20'
              : 'text-slate-700 dark:text-slate-200'
          "
          type="button"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4.5 w-4.5 shrink-0"
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
          <span class="truncate max-w-[150px] font-medium">{{
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

        <select
          v-model="selectedStatus"
          class="block w-full sm:w-48 pl-3 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition duration-150 ease-in-out cursor-pointer font-medium"
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="pending">Chờ duyệt</option>
          <option value="success">Thành công</option>
          <option value="cancelled">Đã hủy</option>
        </select>

        <!-- Clear Filter Button -->
        <button
          v-if="selectedStatus !== 'all' || selectedUserFilter"
          @click="clearAllFilters"
          class="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors cursor-pointer whitespace-nowrap"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Xóa bộ lọc
        </button>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr
                class="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800"
              >
                <th class="px-4 py-3 pl-6 whitespace-nowrap w-[12%]">Mã đơn</th>
                <th class="px-4 py-3 whitespace-nowrap w-[15%]">Người mua</th>
                <th class="px-4 py-3 whitespace-nowrap w-[20%]">Sản phẩm</th>
                <th class="px-4 py-3 whitespace-nowrap w-[10%]">Ngày</th>
                <th class="px-4 py-3 text-right whitespace-nowrap w-[13%]">
                  Hoa hồng Sàn
                </th>
                <th class="px-4 py-3 text-right whitespace-nowrap w-[13%]">
                  Hoa hồng User
                </th>
                <th class="px-4 py-3 whitespace-nowrap text-center w-[12%]">
                  Trạng thái
                </th>
                <th class="px-4 py-3 whitespace-nowrap text-center w-[5%]"></th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-slate-100 dark:divide-slate-800 text-sm"
            >
              <tr v-if="pending && !response">
                <td colspan="7" class="p-4">
                  <div class="flex flex-col gap-2 animate-pulse">
                    <div
                      v-for="i in 5"
                      :key="i"
                      class="h-10 bg-slate-100 dark:bg-slate-800/50 rounded w-full"
                    ></div>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!filteredOrders || filteredOrders.length === 0">
                <td
                  colspan="7"
                  class="p-8 text-center text-slate-500 text-sm font-medium"
                >
                  Chưa có dữ liệu đơn hàng
                </td>
              </tr>
              <tr
                v-else
                v-for="item in filteredOrders"
                :key="item.order.orderId"
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                @click="openOrderDetails(item)"
              >
                <!-- Mã đơn -->
                <td class="px-4 py-3 pl-6">
                  <div class="flex items-center gap-2">
                    <span
                      class="font-bold text-slate-700 dark:text-slate-200 text-xs"
                      >#{{ item.order.orderId }}</span
                    >
                  </div>
                </td>
                <!-- Người mua -->
                <td class="px-4 py-3">
                  <div v-if="item.user" class="flex flex-col">
                    <span
                      class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]"
                      >{{ item.user.name || "N/A" }}</span
                    >
                    <span
                      class="text-[11px] text-slate-500 truncate max-w-[140px] font-medium mt-0.5"
                      :title="item.user.email"
                      >{{ item.user.email }}</span
                    >
                  </div>
                  <div class="text-xs text-slate-400 italic" v-else>
                    Không rõ
                  </div>
                </td>
                <!-- Sản phẩm -->
                <td class="px-4 py-3">
                  <div
                    class="font-semibold text-slate-700 dark:text-slate-300 text-[13px] truncate max-w-[180px]"
                    :title="item.order.itemName || item.order.shopName"
                  >
                    {{
                      item.order.itemName ||
                      item.order.shopName ||
                      "Sản phẩm từ Shopee"
                    }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="px-4 py-3">
                  <div class="text-xs text-slate-500 font-medium">
                    {{
                      new Date(
                        item.order.orderTime ||
                          item.order.clickTime ||
                          Date.now()
                      ).toLocaleDateString("vi-VN")
                    }}
                  </div>
                </td>
                <!-- Hoa hồng Sàn -->
                <td class="px-4 py-3 text-right">
                  <div
                    class="font-bold text-indigo-600 dark:text-indigo-500 text-[13px]"
                  >
                    {{
                      Math.round(
                        item.order.affiliateNetCommission || 0
                      ).toLocaleString("vi-VN")
                    }}đ
                  </div>
                </td>
                <!-- Hoa hồng User -->
                <td class="px-4 py-3 text-right">
                  <div
                    class="font-bold text-emerald-600 dark:text-emerald-500 text-[13px]"
                  >
                    {{
                      Math.round(
                        item.order.userCommission || 0
                      ).toLocaleString("vi-VN")
                    }}đ
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="px-4 py-3 text-center">
                  <span
                    class="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                    :class="getStatusClass(item.order.orderStatus)"
                  >
                    {{
                      item.order.orderStatus === "Completed" ||
                      item.order.orderStatus === "Thành công"
                        ? "HOÀN THÀNH"
                        : item.order.orderStatus
                    }}
                  </span>
                </td>
                <!-- Hành động -->
                <td class="px-4 py-3 text-center">
                  <button
                    class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
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

        <!-- Mobile Card List View -->
        <div
          class="block md:hidden border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800"
        >
          <div v-if="pending && !response" class="p-4 space-y-3 animate-pulse">
            <div
              v-for="i in 3"
              :key="i"
              class="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"
            ></div>
          </div>
          <div
            v-else-if="!filteredOrders || filteredOrders.length === 0"
            class="text-center py-6 text-slate-500 text-xs font-medium"
          >
            Chưa có dữ liệu đơn hàng
          </div>
          <div
            v-else
            v-for="item in filteredOrders"
            :key="item.order.orderId"
            @click="openOrderDetails(item)"
            class="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-200 text-xs"
                >#{{ item.order.orderId }}</span
              >
              <span
                class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                :class="getStatusClass(item.order.orderStatus)"
              >
                {{
                  item.order.orderStatus === "Completed" ||
                  item.order.orderStatus === "Thành công"
                    ? "HOÀN THÀNH"
                    : item.order.orderStatus
                }}
              </span>
            </div>

            <div
              class="font-semibold text-slate-700 dark:text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed"
            >
              {{
                item.order.itemName ||
                item.order.shopName ||
                "Sản phẩm từ Shopee"
              }}
            </div>

            <div class="flex items-center justify-between text-xs">
              <div class="text-slate-500 font-medium">
                {{
                  new Date(
                    item.order.orderTime || item.order.clickTime || Date.now()
                  ).toLocaleDateString("vi-VN")
                }}
              </div>
              <div class="flex gap-2 text-[11px]">
                <span class="text-slate-400 font-medium">Sàn: <span class="font-bold text-indigo-600 dark:text-indigo-400">{{ Math.round(item.order.affiliateNetCommission || 0).toLocaleString("vi-VN") }}đ</span></span>
                <span class="text-slate-400 font-medium">User: <span class="font-bold text-emerald-600 dark:text-emerald-400">{{ Math.round(item.order.userCommission || 0).toLocaleString("vi-VN") }}đ</span></span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div
        class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <div class="flex flex-wrap items-center gap-4">
          <div class="text-xs text-slate-500 font-medium">
            {{ paginationText }}
          </div>
          <div class="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span>Hiển thị:</span>
            <select
              v-model="limit"
              class="border border-slate-200 dark:border-slate-700 rounded bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 px-2 py-1 outline-none cursor-pointer font-semibold shadow-sm focus:border-slate-400"
            >
              <option :value="20">20</option>
              <option :value="50">50</option>
              <option :value="100">100</option>
            </select>
          </div>
        </div>
        <div class="flex gap-1" v-if="totalPages > 1">
          <button
            @click="currentPage > 1 && (currentPage--)"
            :disabled="currentPage === 1"
            class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &lt;
          </button>
          <template v-for="(p, index) in visiblePages" :key="index">
            <span
              v-if="p === '...'"
              class="w-8 h-8 flex items-center justify-center text-slate-400 text-xs select-none"
            >
              ...
            </span>
            <button
              v-else
              @click="currentPage = p"
              :class="
                currentPage === p
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-750'
              "
              class="w-8 h-8 rounded border font-semibold flex items-center justify-center text-xs shadow-sm transition-all duration-200"
            >
              {{ p }}
            </button>
          </template>
          <button
            @click="currentPage < totalPages && (currentPage++)"
            :disabled="currentPage === totalPages"
            class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div
      v-if="showUploadModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        @click="showUploadModal = false"
      ></div>
      <div
        class="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        <!-- Modal Header -->
        <div
          class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50"
        >
          <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">
            Upload dữ liệu đối soát
          </h3>
          <button
            @click="showUploadModal = false"
            class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
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

        <!-- Modal Body (Drag & Drop) -->
        <div class="p-6 relative">
          <!-- Loading Overlay -->
          <div
            v-if="isUploading"
            class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
          >
            <svg
              class="animate-spin h-8 w-8 text-slate-800 dark:text-white mb-3"
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
            <p class="text-sm font-bold text-slate-700 dark:text-slate-300">
              Đang xử lý...
            </p>
          </div>

          <input
            type="file"
            ref="fileInput"
            class="hidden"
            accept=".csv"
            @change="handleFileSelect"
          />
          <div
            v-if="!selectedFile"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="onDrop"
            class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group"
          >
            <div
              class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4
              class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1"
            >
              Kéo thả file CSV vào đây
            </h4>
            <p class="text-[11px] text-slate-500 mb-4">
              hoặc click để chọn file từ máy tính
            </p>

            <button
              class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
            >
              Chọn file
            </button>
          </div>

          <div
            v-else
            class="border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/30"
          >
            <div
              class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h4
              class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 truncate max-w-full"
            >
              {{ selectedFile.name }}
            </h4>
            <p class="text-[11px] text-slate-500 mb-5">
              {{ (selectedFile.size / 1024).toFixed(2) }} KB
            </p>

            <div class="flex items-center gap-3 w-full">
              <button
                @click="selectedFile = null"
                class="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                Hủy
              </button>
              <button
                @click="confirmUpload"
                class="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity"
              >
                Upload
              </button>
            </div>
          </div>

          <div class="mt-4 flex items-start gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-slate-400 mt-0.5 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              File CSV phải được trích xuất từ báo cáo của Shopee Affiliate. Hệ
              thống sẽ so khớp <span class="font-bold">Mã Đơn</span>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Drawer -->
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
          v-if="selectedOrder"
          class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm"
          @click="closeOrderDetails"
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
          v-if="selectedOrder"
          class="fixed inset-y-0 right-0 z-[210] w-full max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden"
        >
          <!-- Drawer Header -->
          <div
            class="flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0"
          >
            <div>
              <span
                class="inline-block px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider mb-2"
                :class="getStatusClass(selectedOrder.order.orderStatus)"
              >
                {{
                  selectedOrder.order.orderStatus === "Completed" ||
                  selectedOrder.order.orderStatus === "Thành công"
                    ? "HOÀN THÀNH"
                    : selectedOrder.order.orderStatus
                }}
              </span>
              <h3
                class="text-base font-bold text-slate-800 dark:text-slate-100"
              >
                Chi tiết đơn hàng #{{ selectedOrder.order.orderId }}
              </h3>
              <p class="text-xs text-slate-500 mt-1">
                Cửa hàng: {{ selectedOrder.order.shopName || "Shopee Store" }}
              </p>
            </div>
            <button
              @click="closeOrderDetails"
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
          <div
            class="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-white dark:bg-slate-950"
          >
            <!-- 1. Buyer & User Rank Info -->
            <div
              class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
            >
              <span
                class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2"
                >Thông tin người mua</span
              >
              <div
                class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
              >
                <div v-if="selectedOrder.user">
                  <h4
                    class="text-sm font-bold text-slate-800 dark:text-slate-200"
                  >
                    {{ selectedOrder.user.name || "Người dùng Saffi" }}
                  </h4>
                  <p
                    class="text-[11px] text-slate-500 font-medium select-all mt-0.5"
                  >
                    {{ selectedOrder.user.email }}
                  </p>
                </div>
                <div v-else class="text-xs text-slate-400 italic">
                  Không tìm thấy thông tin người dùng
                </div>

                <!-- Rank at purchase -->
                <div
                  v-if="selectedOrder.order.userRank"
                  class="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-slate-800 border text-[10px] font-bold tracking-wider border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto"
                >
                  Hạng: {{ getRankName(selectedOrder.order.userRank) }} ({{
                    selectedOrder.order.commissionRate
                  }}%)
                </div>
              </div>
            </div>

            <!-- 2. Product Info -->
            <div>
              <span
                class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2"
                >Thông tin sản phẩm</span
              >
              <div
                class="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800"
              >
                <div
                  class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed"
                >
                  {{ selectedOrder.order.itemName || "Sản phẩm từ Shopee" }}
                </div>
                <div
                  class="flex items-center gap-2 text-[11px] text-slate-500 font-medium"
                >
                  <span>Mã SP: {{ selectedOrder.order.itemId }}</span>
                  <span
                    class="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full"
                  ></span>
                  <span
                    >Ngành hàng:
                    {{
                      selectedOrder.order.l1GlobalCategory || "Chưa phân loại"
                    }}</span
                  >
                </div>
              </div>
            </div>

            <!-- 3. Financial Breakdown Grid -->
            <div>
              <span
                class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2"
                >Chi tiết hoa hồng & doanh số</span
              >
              <div class="grid grid-cols-2 gap-3">
                <div
                  class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center"
                >
                  <span
                    class="text-[10px] font-semibold text-slate-500 uppercase block tracking-wider"
                    >Giá trị</span
                  >
                  <span
                    class="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1"
                    >{{ formatMoney(selectedOrder.order.purchaseValue) }}</span
                  >
                </div>
                <div
                  class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center"
                >
                  <span
                    class="text-[10px] font-semibold text-indigo-500 uppercase block tracking-wider"
                    >Hoa hồng (Sàn)</span
                  >
                  <span
                    class="text-sm font-bold text-indigo-600 dark:text-indigo-400 block mt-1"
                    >+{{
                      formatMoney(selectedOrder.order.affiliateNetCommission)
                    }}</span
                  >
                </div>
                <div
                  class="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 text-center"
                >
                  <span
                    class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-500 uppercase block tracking-wider"
                    >Hoa hồng (User)</span
                  >
                  <span
                    class="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-1"
                    >+{{
                      formatMoney(selectedOrder.order.userCommission)
                    }}</span
                  >
                </div>
              </div>
            </div>

            <!-- 4. Meta & Log Details -->
            <div
              class="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-slate-500 font-medium"
            >
              <div>
                Conversion ID:
                <span class="text-slate-700 dark:text-slate-300 select-all">{{
                  selectedOrder.order.conversionId || "N/A"
                }}</span>
              </div>
              <div>
                UID Link:
                <span class="text-slate-700 dark:text-slate-300 select-all">{{
                  selectedOrder.order.subId1
                }}</span>
              </div>
              <div>
                Giờ click:
                <span class="text-slate-700 dark:text-slate-300">{{
                  selectedOrder.order.clickTime
                    ? new Date(selectedOrder.order.clickTime).toLocaleString(
                        "vi-VN"
                      )
                    : "N/A"
                }}</span>
              </div>
              <div>
                Giờ đặt:
                <span class="text-slate-700 dark:text-slate-300">{{
                  selectedOrder.order.orderTime
                    ? new Date(selectedOrder.order.orderTime).toLocaleString(
                        "vi-VN"
                      )
                    : "N/A"
                }}</span>
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
                class="relative flex items-center px-4 py-4 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900"
              >
                <svg
                  class="h-5 w-5 text-slate-400 shrink-0"
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
                <input
                  v-model="userSearchQuery"
                  @keyup.enter="handleUserSearch"
                  type="text"
                  placeholder="Tìm kiếm người dùng theo tên, email..."
                  class="w-full pl-3 pr-4 py-2 bg-transparent text-base sm:text-lg focus:outline-none font-medium text-slate-800 dark:text-slate-100 placeholder-slate-400"
                  autofocus
                />
                <button
                  @click="handleUserSearch"
                  class="shrink-0 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 mr-2 transition-opacity"
                  type="button"
                >
                  Tìm kiếm
                </button>
                <button
                  @click="showUserModal = false"
                  class="shrink-0 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  title="Đóng (Esc)"
                  type="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
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
                    class="w-full flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-800 transition-all duration-200 text-left group border border-transparent hover:border-slate-200 dark:hover:border-slate-700 hover:shadow-sm cursor-pointer"
                    type="button"
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
                    class="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    type="button"
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
                    class="w-8 h-8 flex items-center justify-center border border-slate-200 dark:border-slate-700 rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    type="button"
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

    <!-- Toast Notification -->
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform translate-y-4 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100 scale-100"
      leave-to-class="transform translate-y-4 opacity-0 scale-95"
    >
      <div
        v-if="toastMsg"
        class="fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border"
        :class="
          toastMsg.type === 'error'
            ? 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200'
            : 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200'
        "
      >
        <svg
          v-if="toastMsg.type === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-emerald-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 text-rose-500 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span class="text-sm font-semibold">{{ toastMsg.msg }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { useAdminUsers } from "~/composables/useAdminUsers";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Quản lý Đơn hàng | Admin Saffiliate",
});

const showUploadModal = ref(false);
const fileInput = ref(null);
const isUploading = ref(false);
const selectedFile = ref(null);
const toastMsg = ref(null);

const showToast = (msg, type = "success") => {
  toastMsg.value = { msg, type };
  setTimeout(() => {
    if (toastMsg.value && toastMsg.value.msg === msg) {
      toastMsg.value = null;
    }
  }, 4000);
};

const searchQuery = ref("");
const selectedStatus = ref("all");
const selectedUserFilter = ref(null);
const currentPage = ref(1);
const limit = ref(20);
const { api } = useAppFetch();

const queryParams = computed(() => {
  const params = {
    page: currentPage.value,
    limit: limit.value,
  };
  if (selectedStatus.value !== "all") {
    if (selectedStatus.value === "pending") params.status = "Pending";
    else if (selectedStatus.value === "success") params.status = "Completed";
    else if (selectedStatus.value === "cancelled")
      params.status = "Cancelled";
  }
  if (selectedUserFilter.value) {
    params.userId = selectedUserFilter.value.id;
  }
  return params;
});const {
  data: response,
  refresh,
  pending,
} = useLazyAsyncData("admin-orders", () => api.get("/order", { query: queryParams.value }), {
  watch: [queryParams],
  server: false,
});
watch([selectedStatus, selectedUserFilter, limit], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => {
  if (response.value?.data?.totalPages) return response.value?.data?.totalPages;
  const total = response.value?.data?.total || 0;
  return Math.ceil(total / limit.value) || 1;
});

const visiblePages = computed(() => {
  const total = totalPages.value;
  const current = currentPage.value;
  const pages = [];
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3) {
      pages.push("...");
    }
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (current < total - 2) {
      pages.push("...");
    }
    pages.push(total);
  }
  return pages;
});

const orders = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const filteredOrders = computed(() => {
  let list = orders.value;
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.trim().toLowerCase();
    list = list.filter((item) => {
      const orderId = item.order.orderId
        ? String(item.order.orderId).toLowerCase()
        : "";
      const itemName = item.order.itemName
        ? String(item.order.itemName).toLowerCase()
        : "";
      const shopName = item.order.shopName
        ? String(item.order.shopName).toLowerCase()
        : "";
      const buyerName = item.user?.name
        ? String(item.user.name).toLowerCase()
        : "";
      const buyerEmail = item.user?.email
        ? String(item.user.email).toLowerCase()
        : "";
      return (
        orderId.includes(q) ||
        itemName.includes(q) ||
        shopName.includes(q) ||
        buyerName.includes(q) ||
        buyerEmail.includes(q)
      );
    });
  }
  return list;
});

const paginationText = computed(() => {
  const total = response.value?.data?.total || filteredOrders.value.length;
  const page = response.value?.data?.page || 1;
  const limitVal = response.value?.data?.limit || limit.value;

  if (filteredOrders.value.length === 0) {
    return "Hiển thị 0 kết quả";
  }

  if (searchQuery.value.trim()) {
    return `Hiển thị 1 - ${filteredOrders.value.length} của ${filteredOrders.value.length} kết quả tìm kiếm`;
  }

  const from = (page - 1) * limitVal + 1;
  const to = Math.min(page * limitVal, total);
  return `Hiển thị ${from} - ${to} của ${total} kết quả`;
});

const totalCommission = computed(() => {
  return orders.value.reduce(
    (sum, item) => sum + (item.order.affiliateNetCommission || 0),
    0
  );
});

const totalUserCommission = computed(() => {
  return orders.value.reduce(
    (sum, item) => sum + (item.order.userCommission || 0),
    0
  );
});

const systemRevenue = computed(() => {
  return orders.value.reduce(
    (sum, item) =>
      sum +
      ((item.order.affiliateNetCommission || 0) -
        (item.order.userCommission || 0)),
    0
  );
});

const pendingCount = computed(() => {
  return orders.value.filter(
    (item) =>
      item.order.orderStatus === "Chờ duyệt" ||
      item.order.orderStatus === "Pending"
  ).length;
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return Math.round(Number(val)).toLocaleString("vi-VN") + "đ";
};

const getStatusClass = (status) => {
  if (status === "Thành công" || status === "Completed")
    return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Chờ duyệt" || status === "Pending")
    return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  if (status === "Đã hủy" || status === "Cancelled")
    return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
  return "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400";
};

// Handle file selection
const handleFileSelect = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  selectedFile.value = file;
};

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const onDrop = (event) => {
  const file = event.dataTransfer.files[0];
  if (!file) return;
  selectedFile.value = file;
};

const confirmUpload = () => {
  if (!selectedFile.value) return;
  parseCSVFile(selectedFile.value);
};

const parseCSVFile = (file) => {
  isUploading.value = true;
  const reader = new FileReader();
  reader.onload = async (e) => {
    try {
      const text = e.target.result;
      const lines = text.split("\n");
      if (lines.length < 2) {
        showToast("File CSV không hợp lệ hoặc trống.", "error");
        return;
      }

      const headers = lines[0].includes("\t")
        ? lines[0].split("\t")
        : lines[0].split(",");
      const parsedHeaders = headers.map((h) => h.trim().replace(/^"|"$/g, ""));

      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;

        const isTab = lines[0].includes("\t");
        const values = isTab
          ? lines[i].split("\t").map((v) => v.trim().replace(/^"|"$/g, ""))
          : lines[i]
              .split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)
              .map((v) => v.trim().replace(/^"|"$/g, ""));

        const row = {};
        parsedHeaders.forEach((h, index) => {
          row[h] = values[index];
        });

        const payload = mapCSVRowToOrderPayload(row);
        if (payload.orderId) {
          data.push(payload);
        }
      }

      if (data.length === 0) {
        showToast("Không tìm thấy dữ liệu hợp lệ trong file!", "error");
        return;
      }

      const { data: uploadRes, error } = await useFetch("/api/order/import", {
        method: "POST",
        body: data,
        watch: false,
      });

      if (error.value) {
        showToast(
          "Có lỗi xảy ra: " +
            (error.value?.data?.message || error.value.message),
          "error"
        );
      } else {
        showToast("Cập nhật dữ liệu thành công!", "success");
        showUploadModal.value = false;
        selectedFile.value = null; // reset state
        refresh(); // reload list
      }
    } catch (err) {
      console.error(err);
      showToast("Lỗi khi đọc file CSV.", "error");
    } finally {
      isUploading.value = false;
      if (fileInput.value) fileInput.value.value = "";
    }
  };
  reader.readAsText(file);
};

const mapCSVRowToOrderPayload = (row) => {
  // Helper functions to extract values safely
  const getVal = (key) =>
    row[key] !== undefined && row[key] !== "" ? row[key] : null;
  const getNum = (key) => {
    const val = getVal(key);
    if (!val) return null;
    // Remove everything except digits, minus sign, and dot
    const num = parseFloat(val.replace(/[^\d.-]/g, ""));
    return isNaN(num) ? null : num;
  };

  return {
    orderId: getVal("Order id"),
    orderStatus: getVal("Order Status"),
    conversionId: getNum("Conversion id"),
    orderTime: getVal("Order Time"), // Fallback if sometimes provided
    completeTime: getVal("Complete Time"),
    clickTime: getVal("Click Time"),
    shopName: getVal("Shop Name"),
    shopId: getNum("Shop id"),
    shopType: getVal("Shop Type"),
    itemId: getNum("Item id"),
    itemName: getVal("Item Name"),
    modelId: getNum("Model id"),
    productType: getVal("Product Type"),
    promotionId: getNum("Promotion id"),
    l1GlobalCategory: getVal("L1 Global Category"),
    l2GlobalCategory: getVal("L2 Global Category"),
    l3GlobalCategory: getVal("L3 Global Category"),
    price: getNum("Price(₫)"),
    qty: getNum("Qty"),
    offerType: getVal("Offer Type"),
    campaignPartner: getVal("Campaign"), // Schema is campaignPartner
    purchaseValue: getNum("Purchase Value(₫)"),
    refundAmount: getNum("Refund Amount(₫)"),
    itemShopeeCommissionRate: getVal("Item Shopee Commission Rate"),
    itemShopeeCommission: getNum("Item Shopee Commission(₫)"),
    itemSellerCommissionRate: getVal("Item Seller Commission Rate"),
    itemSellerCommission: getNum("Item Seller Commission(₫)"),
    itemTotalCommission: getNum("Item Total Commission(₫)"),
    orderShopeeCommission: getNum("Order Shopee Commission(₫)"),
    orderSellerCommission: getNum("Order Seller Commission(₫)"),
    totalOrderCommission: getNum("Total Order Commission(₫)"),
    linkedMcnName: getVal("Linked MCN Name"),
    mcnContractId: getNum("MCN Contract id"),
    mcnManagementFeeRate: getVal("MCN Management Fee Rate"),
    mcnManagementFee: getNum("MCN Management Fee(₫)"),
    affiliateAgreementFeeRate: getVal("Affiliate Agreement Fee Rate"),
    affiliateNetCommission: getNum("Affiliate Net Commission(₫)"),
    affiliateItemStatus: getVal("Affiliate Item Status"),
    itemNote: getVal("Item Note"),
    attributionType: getVal("Attribution Type"),
    buyerStatus: getVal("Buyer Status"),
    subId1: getVal("Sub_id1"),
    channel: getVal("Channel"),
  };
};

const selectedOrder = ref(null);

const openOrderDetails = (item) => {
  selectedOrder.value = item;
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
};

watch(selectedOrder, (newVal) => {
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

const getRankName = (rank) => {
  if (!rank) return "BẠC";
  const r = rank.toLowerCase();
  if (r === "obsidian") return "TINH HOA";
  if (r === "gold") return "VÀNG";
  return "BẠC";
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
  selectedUserFilter.value = null;
  selectedStatus.value = "all";
};
</script>
