<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
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

      <UButton
        @click="showUploadModal = true"
        icon="i-lucide-upload"
        class="font-semibold text-xs"
      >
        Upload CSV
      </UButton>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <UCard
        :ui="{
          body: 'p-5',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Tổng đơn hàng
        </div>
        <USkeleton v-if="pending && !response" class="h-8 w-16 mt-1" />
        <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-1">
          {{ orders?.length || 0 }}
        </div>
      </UCard>

      <UCard
        :ui="{
          body: 'p-5',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Chờ duyệt
        </div>
        <USkeleton v-if="pending && !response" class="h-8 w-16 mt-1" />
        <div v-else class="text-xl font-bold text-amber-500 mt-1">
          {{ pendingCount }}
        </div>
      </UCard>

      <UCard
        :ui="{
          body: 'p-5',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Hoa hồng sàn
        </div>
        <USkeleton v-if="pending && !response" class="h-8 w-32 mt-1" />
        <div v-else class="text-xl font-bold text-slate-800 dark:text-slate-100 mt-1">
          {{ formatMoney(totalCommission) }}
        </div>
      </UCard>

      <UCard
        :ui="{
          body: 'p-5',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
      >
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Hoa hồng User nhận
        </div>
        <USkeleton v-if="pending && !response" class="h-8 w-32 mt-1" />
        <div v-else class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">
          {{ formatMoney(totalUserCommission) }}
        </div>
      </UCard>

      <UCard
        :ui="{
          body: 'p-5',
          ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
          background: 'bg-white dark:bg-slate-900',
          rounded: 'rounded-xl shadow-sm'
        }"
        class="col-span-2 md:col-span-1"
      >
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
          Doanh thu (Lợi nhuận)
        </div>
        <USkeleton v-if="pending && !response" class="h-8 w-32 mt-1" />
        <div v-else class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-1">
          {{ formatMoney(systemRevenue) }}
        </div>
      </UCard>
    </div>

    <!-- Data Table Container -->
    <UCard
      :ui="{
        body: 'p-0',
        ring: 'ring-1 ring-slate-200 dark:ring-slate-800',
        background: 'bg-white dark:bg-slate-900',
        rounded: 'rounded-xl shadow-sm'
      }"
      class="overflow-hidden"
    >
      <!-- Toolbar -->
      <div
        class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 bg-slate-50/50 dark:bg-slate-900/50"
      >
        <!-- Filter by User Button -->
        <UButton
          @click="showUserModal = true"
          icon="i-lucide-user"
          variant="outline"
          color="neutral"
          class="font-medium text-xs max-w-[200px]"
          :class="selectedUserFilter ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border-emerald-500/20' : ''"
        >
          <span class="truncate">{{
            selectedUserFilter
              ? selectedUserFilter.name || selectedUserFilter.email
              : "Tìm theo người dùng"
          }}</span>
          <template #trailing>
            <UIcon
              v-if="selectedUserFilter"
              name="i-lucide-x"
              class="h-3 w-3 cursor-pointer hover:text-rose-500"
              @click.stop="clearUserFilter"
            />
          </template>
        </UButton>

        <USelect
          v-model="selectedStatus"
          :items="[
            { label: 'Tất cả trạng thái', value: 'all' },
            { label: 'Chờ duyệt', value: 'pending' },
            { label: 'Thành công', value: 'success' },
            { label: 'Đã hủy', value: 'cancelled' }
          ]"
          size="sm"
          class="font-medium w-48"
        />

        <!-- Clear Filter Button -->
        <UButton
          v-if="selectedStatus !== 'all' || selectedUserFilter"
          @click="clearAllFilters"
          variant="link"
          color="danger"
          icon="i-lucide-trash-2"
          size="xs"
          class="font-bold text-xs"
        >
          Xóa bộ lọc
        </UButton>
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
                <th class="px-4 py-3 pl-6 whitespace-nowrap">Mã đơn</th>
                <th class="px-4 py-3 whitespace-nowrap">Người mua</th>
                <th class="px-4 py-3 whitespace-nowrap">Sản phẩm</th>
                <th class="px-4 py-3 whitespace-nowrap">Ngày</th>
                <th class="px-4 py-3 text-right whitespace-nowrap">
                  Hoa hồng Sàn
                </th>
                <th class="px-4 py-3 text-right whitespace-nowrap">
                  Hoa hồng User
                </th>
                <th class="px-4 py-3 whitespace-nowrap text-center">
                  Trạng thái
                </th>
                <th class="px-4 py-3 whitespace-nowrap text-center"></th>
              </tr>
            </thead>
            <tbody
              class="divide-y divide-slate-100 dark:divide-slate-800 text-sm"
            >
              <tr v-if="pending && !response">
                <td colspan="8" class="p-4">
                  <div class="flex flex-col gap-2">
                    <USkeleton v-for="i in 5" :key="i" class="h-10 w-full" />
                  </div>
                </td>
              </tr>
              <tr v-else-if="!filteredOrders || filteredOrders.length === 0">
                <td
                  colspan="8"
                  class="p-8 text-center text-slate-500 text-sm font-medium"
                >
                  Chưa có dữ liệu đơn hàng
                </td>
              </tr>
              <tr
                v-else
                v-for="item in filteredOrders"
                :key="item.order_id"
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                @click="openOrderDetails(item)"
              >
                <!-- Mã đơn -->
                <td class="px-4 py-3 pl-6">
                  <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ item.order_id }}</span>
                </td>
                <!-- Người mua -->
                <td class="px-4 py-3">
                  <div v-if="item.user_id" class="flex flex-col">
                    <span
                      class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]"
                      >{{ item.user_name || "N/A" }}</span
                    >
                    <span
                      class="text-[11px] text-slate-500 truncate max-w-[140px] font-medium mt-0.5"
                      :title="item.user_email"
                      >{{ item.user_email }}</span
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
                    :title="item.product_name"
                  >
                    {{ item.product_name || "Sản phẩm từ Shopee" }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="px-4 py-3">
                  <div class="text-xs text-slate-505 font-medium">
                    {{
                      new Date(
                        item.order_time || Date.now()
                      ).toLocaleDateString("vi-VN")
                    }}
                  </div>
                </td>
                <!-- Hoa hồng Sàn -->
                <td class="px-4 py-3 text-right">
                  <div
                    class="font-bold text-slate-805 dark:text-slate-200 text-[13px]"
                  >
                    {{
                      Math.round(item.actual_commission || 0).toLocaleString(
                        "vi-VN"
                      )
                    }}đ
                  </div>
                </td>
                <!-- Hoa hồng User -->
                <td class="px-4 py-3 text-right">
                  <div
                    class="font-bold text-emerald-605 dark:text-emerald-500 text-[13px]"
                  >
                    {{
                      Math.round(item.user_commission || 0).toLocaleString(
                        "vi-VN"
                      )
                    }}đ
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="px-4 py-3 text-center">
                  <UBadge
                    size="xs"
                    variant="soft"
                    :color="item.order_status === 'Completed' || item.order_status === 'Thành công' ? 'success' : item.order_status === 'Pending' || item.order_status === 'Chờ duyệt' ? 'warning' : 'danger'"
                    class="font-bold uppercase tracking-wider text-[10px] px-2 py-0.5 rounded-full inline-block"
                  >
                    {{
                      item.order_status === "Completed" || item.order_status === "Thành công"
                        ? "HOÀN THÀNH"
                        : item.order_status === "Pending" || item.order_status === "Chờ duyệt"
                        ? "CHỜ DUYỆT"
                        : "ĐÃ HỦY"
                    }}
                  </UBadge>
                </td>
                <!-- Hành động -->
                <td class="px-4 py-3 text-center">
                  <UIcon
                    name="i-lucide-chevron-right"
                    class="h-4 w-4 text-slate-400"
                  />
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
            <USkeleton v-for="i in 3" :key="i" class="h-24 w-full rounded-lg" />
          </div>
          <div
            v-else-if="!filteredOrders || filteredOrders.length === 0"
            class="text-center py-6 text-slate-505 text-xs font-medium"
          >
            Chưa có dữ liệu đơn hàng
          </div>
          <div
            v-else
            v-for="item in filteredOrders"
            :key="item.order_id"
            @click="openOrderDetails(item)"
            class="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-200 text-xs"
                >#{{ item.order_id }}</span
              >
              <UBadge
                size="xs"
                variant="soft"
                :color="item.order_status === 'Completed' || item.order_status === 'Thành công' ? 'success' : item.order_status === 'Pending' || item.order_status === 'Chờ duyệt' ? 'warning' : 'danger'"
                class="font-bold uppercase tracking-wider text-[9px] px-2 py-0.5 rounded-full inline-block"
              >
                {{
                  item.order_status === "Completed" || item.order_status === "Thành công"
                    ? "HOÀN THÀNH"
                    : item.order_status === "Pending" || item.order_status === "Chờ duyệt"
                    ? "CHỜ DUYỆT"
                    : "ĐÃ HỦY"
                }}
              </UBadge>
            </div>

            <div
              class="font-semibold text-slate-700 dark:text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed"
            >
              {{ item.product_name || "Sản phẩm từ Shopee" }}
            </div>

            <div class="flex items-center justify-between text-xs">
              <div class="text-slate-500 font-medium">
                {{
                  new Date(item.order_time || Date.now()).toLocaleDateString(
                    "vi-VN"
                  )
                }}
              </div>
              <div class="flex gap-2 text-[11px]">
                <span class="text-slate-400 font-medium"
                  >Sàn:
                  <span class="font-bold text-slate-800 dark:text-slate-200"
                    >{{
                      Math.round(item.actual_commission || 0).toLocaleString(
                        "vi-VN"
                      )
                    }}đ</span
                  ></span
                >
                <span class="text-slate-400 font-medium"
                  >User:
                  <span class="font-bold text-emerald-600 dark:text-emerald-450"
                    >{{
                      Math.round(item.user_commission || 0).toLocaleString(
                        "vi-VN"
                      )
                    }}đ</span
                  ></span
                >
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
          <div
            class="flex items-center gap-1.5 text-xs text-slate-500 font-medium"
          >
            <span>Hiển thị:</span>
            <USelect
              v-model="limit"
              :items="[
                { label: '20', value: 20 },
                { label: '50', value: 50 },
                { label: '100', value: 100 }
              ]"
              size="xs"
              class="font-bold w-18"
            />
          </div>
        </div>
        <div class="flex gap-1" v-if="totalPages > 1">
          <UButton
            icon="i-lucide-chevron-left"
            :disabled="currentPage === 1"
            variant="outline"
            color="neutral"
            size="xs"
            @click="currentPage > 1 && currentPage--"
          />
          <template v-for="(p, index) in visiblePages" :key="index">
            <span
              v-if="p === '...'"
              class="w-8 h-8 flex items-center justify-center text-slate-400 text-xs select-none"
            >
              ...
            </span>
            <UButton
              v-else
              @click="currentPage = p"
              :variant="currentPage === p ? 'solid' : 'outline'"
              color="neutral"
              size="xs"
              class="w-8 h-8 font-semibold flex items-center justify-center text-xs"
            >
              {{ p }}
            </UButton>
          </template>
          <UButton
            icon="i-lucide-chevron-right"
            :disabled="currentPage === totalPages"
            variant="outline"
            color="neutral"
            size="xs"
            @click="currentPage < totalPages && currentPage++"
          />
        </div>
      </div>
    </UCard>

    <!-- Upload Modal -->
    <UModal v-model:open="showUploadModal">
      <template #content>
        <UCard
          :ui="{
            body: 'p-6 relative',
            header: 'px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50'
          }"
          class="relative w-full max-w-md overflow-hidden"
        >
          <template #header>
            <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">
              Upload dữ liệu đối soát
            </h3>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              @click="showUploadModal = false"
            />
          </template>

          <!-- Loading Overlay -->
          <div
            v-if="isUploading"
            class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center"
          >
            <UIcon name="i-lucide-refresh-cw" class="animate-spin h-8 w-8 text-emerald-500 mb-3" />
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
              <UIcon name="i-lucide-file-up" class="h-6 w-6" />
            </div>
            <h4
              class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1"
            >
              Kéo thả file CSV vào đây
            </h4>
            <p class="text-[11px] text-slate-500 mb-4">
              hoặc click để chọn file từ máy tính
            </p>

            <UButton size="xs" class="font-bold">
              Chọn file
            </UButton>
          </div>

          <div
            v-else
            class="border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/30"
          >
            <div
              class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3"
            >
              <UIcon name="i-lucide-file-check" class="h-5 w-5" />
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
              <UButton
                @click="selectedFile = null"
                variant="soft"
                color="neutral"
                class="flex-1 font-bold text-xs"
              >
                Hủy
              </UButton>
              <UButton
                @click="confirmUpload"
                class="flex-1 font-bold text-xs"
              >
                Upload
              </UButton>
            </div>
          </div>

          <div class="mt-4 flex items-start gap-2">
            <UIcon name="i-lucide-info" class="h-4 w-4 text-slate-400 mt-0.5 shrink-0" />
            <p class="text-[11px] text-slate-500 leading-relaxed">
              File CSV phải được trích xuất từ báo cáo của Shopee Affiliate. Hệ
              thống sẽ so khớp <span class="font-bold">Mã Đơn</span>.
            </p>
          </div>
        </UCard>
      </template>
    </UModal>

    <!-- Order Details Drawer -->
    <USlideover v-model:open="isDrawerOpen">
      <template #content>
        <UCard
          v-if="selectedOrder"
          :ui="{
            body: 'p-6 space-y-6 flex-1 overflow-y-auto bg-white dark:bg-slate-950',
            header: 'flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0'
          }"
          class="flex flex-col h-full overflow-hidden"
        >
          <template #header>
            <div>
              <UBadge
                size="xs"
                variant="soft"
                :color="selectedOrder.order_status === 'Completed' || selectedOrder.order_status === 'Thành công' ? 'success' : selectedOrder.order_status === 'Pending' || selectedOrder.order_status === 'Chờ duyệt' ? 'warning' : 'danger'"
                class="font-bold uppercase tracking-wider mb-2 text-[9px] px-2 py-0.5 rounded-full inline-block"
              >
                {{
                  selectedOrder.order_status === "Completed" || selectedOrder.order_status === "Thành công"
                    ? "HOÀN THÀNH"
                    : selectedOrder.order_status === "Pending" || selectedOrder.order_status === "Chờ duyệt"
                    ? "CHỜ DUYỆT"
                    : "ĐÃ HỦY"
                }}
              </UBadge>
              <h3
                class="text-base font-bold text-slate-800 dark:text-slate-100"
              >
                Chi tiết đơn hàng #{{ selectedOrder.order_id }}
              </h3>
              <p class="text-xs text-slate-500 mt-1">
                Cửa hàng: {{ selectedOrder.shop_name || "Shopee Store" }}
              </p>
            </div>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              class="rounded-lg"
              @click="closeOrderDetails"
            />
          </template>

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
              <div v-if="selectedOrder.user_id">
                <h4
                  class="text-sm font-bold text-slate-800 dark:text-slate-200"
                >
                  {{ selectedOrder.user_name || "Người dùng Saffi" }}
                </h4>
                <p
                  class="text-[11px] text-slate-500 font-medium select-all mt-0.5"
                >
                  {{ selectedOrder.user_email }}
                </p>
              </div>
              <div class="text-xs text-slate-400 italic" v-else>
                Không tìm thấy thông tin người dùng
              </div>

              <!-- Rank at purchase -->
              <div
                v-if="selectedOrder.user_rank"
                class="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-slate-800 border text-[10px] font-bold tracking-wider border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto"
              >
                Hạng: {{ getRankName(selectedOrder.user_rank) }} ({{
                  selectedOrder.commission_rate
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
                {{ selectedOrder.product_name || "Sản phẩm từ Shopee" }}
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
                  >{{ formatMoney(selectedOrder.purchase_value) }}</span
                >
              </div>
              <div
                class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center"
              >
                <span
                  class="text-[10px] font-semibold text-slate-500 uppercase block tracking-wider"
                  >Hoa hồng (Sàn)</span
                >
                <span
                  class="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1"
                  >+{{ formatMoney(selectedOrder.actual_commission) }}</span
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
                  >+{{ formatMoney(selectedOrder.user_commission) }}</span
                >
              </div>
            </div>
          </div>

          <!-- 4. Meta & Log Details -->
          <div
            class="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-slate-550 font-medium"
          >
            <div>
              Sub ID Tracking:
              <span class="text-slate-700 dark:text-slate-300 select-all">{{
                selectedOrder.sub_id
              }}</span>
            </div>
            <div>
              Giờ click:
              <span class="text-slate-700 dark:text-slate-300">{{
                selectedOrder.click_time
                  ? new Date(selectedOrder.click_time).toLocaleString("vi-VN")
                  : "N/A"
              }}</span>
            </div>
            <div>
              Giờ đặt:
              <span class="text-slate-700 dark:text-slate-300">{{
                selectedOrder.order_time
                  ? new Date(selectedOrder.order_time).toLocaleString("vi-VN")
                  : "N/A"
              }}</span>
            </div>
          </div>
        </UCard>
      </template>
    </USlideover>

    <!-- User Selection Modal -->
    <UModal v-model:open="showUserModal">
      <template #content>
        <UCard
          :ui="{
            body: 'p-2 flex-1 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/20 min-h-[150px] max-h-[400px]',
            header: 'p-4 border-b border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 flex items-center gap-3 shrink-0',
            footer: 'p-4 border-t border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900 shrink-0'
          }"
          class="relative w-full max-w-xl overflow-hidden"
        >
          <template #header>
            <UIcon name="i-lucide-search" class="h-5 w-5 text-slate-400 shrink-0 ml-1" />
            <UInput
              v-model="userSearchQuery"
              type="text"
              placeholder="Tìm kiếm thành viên..."
              class="flex-1 font-medium"
              autofocus
              @keydown.enter="handleUserSearch"
            >
              <template #trailing>
                <UButton
                  v-if="userSearchQuery"
                  color="neutral"
                  variant="link"
                  icon="i-lucide-x"
                  size="xs"
                  @click="clearUserSearch"
                />
              </template>
            </UInput>
            <UButton
              @click="handleUserSearch"
              size="sm"
              class="font-semibold text-xs whitespace-nowrap shrink-0"
            >
              Tìm
            </UButton>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              class="shrink-0"
              @click="showUserModal = false"
            />
          </template>

          <div v-if="usersLoading" class="flex flex-col items-center justify-center py-8 text-slate-400 gap-3">
            <UIcon name="i-lucide-refresh-cw" class="animate-spin h-6 w-6 text-emerald-500" />
            <span class="text-xs font-semibold">Đang tải...</span>
          </div>

          <div v-else-if="usersList.length === 0" class="flex flex-col items-center justify-center py-8 text-slate-505 gap-2">
            <UIcon name="i-lucide-users" class="h-10 w-10 text-slate-300 dark:text-slate-700" />
            <p class="text-sm font-medium">Không tìm thấy người dùng phù hợp</p>
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
                <div class="h-10 w-10 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center shrink-0 border border-indigo-100 dark:border-indigo-800/50 overflow-hidden relative group-hover:scale-105 transition-transform">
                  <img v-if="u.image" :src="u.image" class="h-full w-full object-cover" />
                  <span v-else class="text-sm font-bold text-indigo-650 dark:text-indigo-400 uppercase">
                    {{ u.name ? u.name.charAt(0) : "U" }}
                  </span>
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-sm font-bold text-slate-850 dark:text-slate-100 truncate group-hover:text-emerald-500 transition-colors">
                    {{ u.name || "Người dùng Saffi" }}
                  </span>
                  <span class="text-[11px] font-medium text-slate-500 truncate mt-0.5">{{ u.email }}</span>
                </div>
              </div>
              <div class="opacity-0 group-hover:opacity-100 transition-opacity">
                <UBadge size="xs" color="success" variant="soft" class="font-bold text-[10px]">CHỌN</UBadge>
              </div>
            </button>
          </div>

          <template #footer>
            <div v-if="userPagination.totalPages > 1" class="flex justify-between items-center w-full">
              <span class="text-[11px] font-bold text-slate-400 tracking-wider uppercase">
                Trang {{ userPagination.page }} / {{ userPagination.totalPages }}
              </span>
              <div class="flex gap-1">
                <UButton
                  icon="i-lucide-chevron-left"
                  :disabled="userPagination.page === 1"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="fetchUsers(userPagination.page - 1, userSearchQuery, 20)"
                />
                <UButton
                  icon="i-lucide-chevron-right"
                  :disabled="userPagination.page === userPagination.totalPages"
                  variant="outline"
                  color="neutral"
                  size="xs"
                  @click="fetchUsers(userPagination.page + 1, userSearchQuery, 20)"
                />
              </div>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>

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
        <UIcon
          v-if="toastMsg.type === 'success'"
          name="i-lucide-circle-check"
          class="h-5 w-5 text-emerald-500 shrink-0"
        />
        <UIcon
          v-else
          name="i-lucide-circle-x"
          class="h-5 w-5 text-rose-500 shrink-0"
        />
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
    per_page: limit.value,
  };
  if (selectedStatus.value !== "all") {
    if (selectedStatus.value === "pending") params.status = "Pending";
    else if (selectedStatus.value === "success") params.status = "Completed";
    else if (selectedStatus.value === "cancelled") params.status = "Cancelled";
  }
  if (selectedUserFilter.value) {
    params.userId = selectedUserFilter.value.id;
  }
  return params;
});

const {
  data: response,
  refresh,
  pending,
} = useLazyAsyncData(
  "admin-orders",
  () => api.get("/order", { query: queryParams.value }),
  {
    watch: [queryParams],
    server: false,
  }
);

watch([selectedStatus, selectedUserFilter, limit], () => {
  currentPage.value = 1;
});

const totalPages = computed(() => {
  const res = response.value;
  if (!res) return 1;
  if (res.last_page !== undefined) return res.last_page;
  if (res.data?.totalPages !== undefined) return res.data.totalPages;
  if (res.data?.last_page !== undefined) return res.data.last_page;
  const total = res.total !== undefined ? res.total : res.data?.total || 0;
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
  if (res.data && Array.isArray(res.data) && !res.data.hasOwnProperty("data"))
    return res.data;
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
      const orderId = item.order_id ? String(item.order_id).toLowerCase() : "";
      const itemName = item.product_name
        ? String(item.product_name).toLowerCase()
        : "";
      const shopName = item.shop_name
        ? String(item.shop_name).toLowerCase()
        : "";
      const buyerName = item.user_name
        ? String(item.user_name).toLowerCase()
        : "";
      const buyerEmail = item.user_email
        ? String(item.user_email).toLowerCase()
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
  const res = response.value;
  const total =
    res?.total !== undefined
      ? res.total
      : res?.data?.total !== undefined
      ? res.data.total
      : filteredOrders.value.length;
  const page =
    res?.current_page !== undefined
      ? res.current_page
      : res?.data?.page !== undefined
      ? res.data.page
      : res?.data?.current_page || 1;
  const limitVal =
    res?.per_page !== undefined
      ? res.per_page
      : res?.data?.limit !== undefined
      ? res.data.limit
      : res?.data?.per_page || limit.value;

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
    (sum, item) => sum + (item.actual_commission || 0),
    0
  );
});

const totalUserCommission = computed(() => {
  return orders.value.reduce(
    (sum, item) => sum + (item.user_commission || 0),
    0
  );
});

const systemRevenue = computed(() => {
  return orders.value.reduce(
    (sum, item) =>
      sum + ((item.actual_commission || 0) - (item.user_commission || 0)),
    0
  );
});

const pendingCount = computed(() => {
  return orders.value.filter(
    (item) =>
      item.order_status === "Chờ duyệt" || item.order_status === "Pending"
  ).length;
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return Math.round(Number(val)).toLocaleString("vi-VN") + "đ";
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

      await api.post("/order/import", { data });

      showToast("Cập nhật dữ liệu thành công!", "success");
      showUploadModal.value = false;
      selectedFile.value = null; // reset state
      refresh(); // reload list
    } catch (err) {
      console.error(err);
      const errMsg =
        err.data?.message || err.message || "Lỗi khi upload file CSV.";
      showToast("Có lỗi xảy ra: " + errMsg, "error");
    } finally {
      isUploading.value = false;
      if (fileInput.value) fileInput.value.value = "";
    }
  };
  reader.readAsText(file);
};

const mapCSVRowToOrderPayload = (row) => {
  const getVal = (key) =>
    row[key] !== undefined && row[key] !== "" ? row[key] : null;
  const getNum = (key) => {
    const val = getVal(key);
    if (!val) return null;
    const num = parseFloat(val.replace(/[^\d.-]/g, ""));
    return isNaN(num) ? null : num;
  };

  return {
    orderId: getVal("Order id"),
    orderStatus: getVal("Order Status"),
    conversionId: getNum("Conversion id"),
    orderTime: getVal("Order Time"),
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
    campaignPartner: getVal("Campaign"),
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

const isDrawerOpen = computed({
  get: () => !!selectedOrder.value,
  set: (val) => {
    if (!val) selectedOrder.value = null;
  }
});

const openOrderDetails = (item) => {
  selectedOrder.value = item;
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
};

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
  fetchUsers(1, userSearchQuery.value.trim(), 20);
};

const handleEscKey = (e) => {
  if (e.key === "Escape") {
    showUserModal.value = false;
  }
};

watch(showUserModal, (newVal) => {
  if (newVal) {
    if (usersList.value.length === 0) {
      fetchUsers(1, "", 20);
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
