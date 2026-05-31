<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Quản lý Đơn hàng</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Theo dõi, đối soát và upload dữ liệu đơn hàng từ mạng Affiliate.</p>
      </div>
      
      <button 
        @click="showUploadModal = true"
        class="flex items-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 px-4 py-2.5 rounded-lg font-semibold text-[13px] shadow-sm transition-all duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload CSV
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng đơn hàng</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-1">{{ orders?.length || 0 }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Hoa hồng tạm tính</div>
        <div v-if="pending && !response" class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{{ formatMoney(totalCommission) }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chờ duyệt</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-amber-500 mt-1">{{ pendingCount }}</div>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-900/50">
        <div class="relative max-w-sm w-full sm:w-auto">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Tìm kiếm mã đơn hoặc tên shop..." 
            class="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition duration-150 ease-in-out font-medium"
          />
        </div>
        <div class="flex items-center gap-2">
          <select class="block w-full pl-3 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition duration-150 ease-in-out cursor-pointer font-medium">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="success">Thành công</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
                <th class="px-4 py-3 pl-6 whitespace-nowrap w-[15%]">Mã đơn</th>
                <th class="px-4 py-3 whitespace-nowrap w-[18%]">Người mua</th>
                <th class="px-4 py-3 whitespace-nowrap w-[28%]">Sản phẩm</th>
                <th class="px-4 py-3 whitespace-nowrap w-[12%]">Ngày</th>
                <th class="px-4 py-3 text-right whitespace-nowrap w-[12%]">Hoa hồng</th>
                <th class="px-4 py-3 whitespace-nowrap text-center w-[10%]">Trạng thái</th>
                <th class="px-4 py-3 whitespace-nowrap text-center w-[5%]"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              <tr v-if="pending && !response">
                <td colspan="7" class="p-4">
                  <div class="flex flex-col gap-2 animate-pulse">
                    <div v-for="i in 5" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800/50 rounded w-full"></div>
                  </div>
                </td>
              </tr>
              <tr v-else-if="!orders || orders.length === 0">
                <td colspan="7" class="p-8 text-center text-slate-500 text-sm font-medium">
                  Chưa có dữ liệu đơn hàng
                </td>
              </tr>
              <tr 
                v-else
                v-for="item in orders" 
                :key="item.order.orderId"
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                @click="openOrderDetails(item)"
              >
                <!-- Mã đơn -->
                <td class="px-4 py-3 pl-6">
                  <div class="flex items-center gap-2">
                    <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ item.order.orderId }}</span>
                  </div>
                </td>
                <!-- Người mua -->
                <td class="px-4 py-3">
                  <div v-if="item.user" class="flex flex-col">
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]">{{ item.user.name || "N/A" }}</span>
                    <span class="text-[11px] text-slate-500 truncate max-w-[140px] font-medium mt-0.5" :title="item.user.email">{{ item.user.email }}</span>
                  </div>
                  <div class="text-xs text-slate-400 italic" v-else>Không rõ</div>
                </td>
                <!-- Sản phẩm -->
                <td class="px-4 py-3">
                  <div class="font-semibold text-slate-700 dark:text-slate-300 text-[13px] truncate max-w-[280px]" :title="item.order.itemName || item.order.shopName">
                    {{ item.order.itemName || item.order.shopName || "Sản phẩm từ Shopee" }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="px-4 py-3">
                  <div class="text-xs text-slate-500 font-medium">
                    {{ new Date(item.order.orderTime || item.order.clickTime || Date.now()).toLocaleDateString('vi-VN') }}
                  </div>
                </td>
                <!-- Hoa hồng -->
                <td class="px-4 py-3 text-right">
                  <div class="font-bold text-emerald-600 dark:text-emerald-500 text-[13px]">
                    +{{ (item.order.affiliateNetCommission || 0).toLocaleString('vi-VN') }}đ
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="px-4 py-3 text-center">
                  <span 
                    class="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                    :class="getStatusClass(item.order.orderStatus)"
                  >
                    {{ (item.order.orderStatus === 'Completed' || item.order.orderStatus === 'Thành công') ? 'HOÀN THÀNH' : item.order.orderStatus }}
                  </span>
                </td>
                <!-- Hành động -->
                <td class="px-4 py-3 text-center">
                  <button
                    class="text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                    type="button"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card List View -->
        <div class="block md:hidden border-t border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800">
          <div v-if="pending && !response" class="p-4 space-y-3 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-24 bg-slate-100 dark:bg-slate-800 rounded-lg w-full"></div>
          </div>
          <div v-else-if="!orders || orders.length === 0" class="text-center py-6 text-slate-500 text-xs font-medium">
            Chưa có dữ liệu đơn hàng
          </div>
          <div 
            v-else
            v-for="item in orders"
            :key="item.order.orderId"
            @click="openOrderDetails(item)"
            class="p-4 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
          >
            <div class="flex items-center justify-between mb-2">
              <span class="font-bold text-slate-800 dark:text-slate-200 text-xs">#{{ item.order.orderId }}</span>
              <span 
                class="px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider"
                :class="getStatusClass(item.order.orderStatus)"
              >
                {{ (item.order.orderStatus === 'Completed' || item.order.orderStatus === 'Thành công') ? 'HOÀN THÀNH' : item.order.orderStatus }}
              </span>
            </div>
            
            <div class="font-semibold text-slate-700 dark:text-slate-300 text-xs line-clamp-2 mb-3 leading-relaxed">
              {{ item.order.itemName || item.order.shopName || "Sản phẩm từ Shopee" }}
            </div>
            
            <div class="flex items-center justify-between text-xs">
              <div class="text-slate-500 font-medium">
                {{ new Date(item.order.orderTime || item.order.clickTime || Date.now()).toLocaleDateString('vi-VN') }}
              </div>
              <div class="font-bold text-emerald-600 dark:text-emerald-500">
                +{{ (item.order.affiliateNetCommission || 0).toLocaleString('vi-VN') }}đ
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="px-4 py-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/50">
        <div class="text-xs text-slate-500 font-medium">Hiển thị 1 - 5 của 5 kết quả</div>
        <div class="flex gap-1">
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 cursor-not-allowed opacity-50 flex items-center justify-center">&lt;</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white bg-white dark:bg-slate-800 font-semibold flex items-center justify-center shadow-sm">1</button>
          <button class="w-8 h-8 rounded border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-white dark:hover:bg-slate-800 cursor-not-allowed opacity-50 flex items-center justify-center">&gt;</button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showUploadModal = false"></div>
      <div class="relative bg-white dark:bg-slate-900 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-900/50">
          <h3 class="text-sm font-bold text-slate-800 dark:text-slate-100">Upload dữ liệu đối soát</h3>
          <button @click="showUploadModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body (Drag & Drop) -->
        <div class="p-6 relative">
          <!-- Loading Overlay -->
          <div v-if="isUploading" class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center">
            <svg class="animate-spin h-8 w-8 text-slate-800 dark:text-white mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-sm font-bold text-slate-700 dark:text-slate-300">Đang xử lý...</p>
          </div>

          <input type="file" ref="fileInput" class="hidden" accept=".csv" @change="handleFileSelect" />
          <div 
            v-if="!selectedFile"
            @click="triggerFileInput"
            @dragover.prevent
            @drop.prevent="onDrop"
            class="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors duration-200 hover:border-slate-400 dark:hover:border-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer group"
          >
            <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 mb-3 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Kéo thả file CSV vào đây</h4>
            <p class="text-[11px] text-slate-500 mb-4">hoặc click để chọn file từ máy tính</p>
            
            <button class="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity">
              Chọn file
            </button>
          </div>
          
          <div v-else class="border border-slate-200 dark:border-slate-700 rounded-xl p-5 flex flex-col items-center justify-center text-center bg-slate-50 dark:bg-slate-800/30">
            <div class="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1 truncate max-w-full">{{ selectedFile.name }}</h4>
            <p class="text-[11px] text-slate-500 mb-5">{{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
            
            <div class="flex items-center gap-3 w-full">
              <button @click="selectedFile = null" class="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                Hủy
              </button>
              <button @click="confirmUpload" class="flex-1 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg text-xs font-semibold shadow-sm hover:opacity-90 transition-opacity">
                Upload
              </button>
            </div>
          </div>
          
          <div class="mt-4 flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              File CSV phải được trích xuất từ báo cáo của Shopee Affiliate. Hệ thống sẽ so khớp <span class="font-bold">Mã Đơn</span>.
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
        <div v-if="selectedOrder" class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm" @click="closeOrderDetails"></div>
      </transition>

      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="selectedOrder" class="fixed inset-y-0 right-0 z-[210] w-full max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
          
          <!-- Drawer Header -->
          <div class="flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
            <div>
              <span class="inline-block px-2.5 py-1 rounded text-[9px] font-bold uppercase tracking-wider mb-2" :class="getStatusClass(selectedOrder.order.orderStatus)">
                {{ selectedOrder.order.orderStatus === 'Completed' || selectedOrder.order.orderStatus === 'Thành công' ? 'HOÀN THÀNH' : selectedOrder.order.orderStatus }}
              </span>
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Chi tiết đơn hàng #{{ selectedOrder.order.orderId }}</h3>
              <p class="text-xs text-slate-500 mt-1">Cửa hàng: {{ selectedOrder.order.shopName || 'Shopee Store' }}</p>
            </div>
            <button @click="closeOrderDetails" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Drawer Content -->
          <div class="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-white dark:bg-slate-950">
            <!-- 1. Buyer & User Rank Info -->
            <div class="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Thông tin người mua</span>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div v-if="selectedOrder.user">
                  <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedOrder.user.name || 'Người dùng Saffi' }}</h4>
                  <p class="text-[11px] text-slate-500 font-medium select-all mt-0.5">{{ selectedOrder.user.email }}</p>
                </div>
                <div v-else class="text-xs text-slate-400 italic">Không tìm thấy thông tin người dùng</div>
                
                <!-- Rank at purchase -->
                <div v-if="selectedOrder.order.userRank" class="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white dark:bg-slate-800 border text-[10px] font-bold tracking-wider border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 self-start sm:self-auto">
                  Hạng: {{ getRankName(selectedOrder.order.userRank) }} ({{ selectedOrder.order.commissionRate }}%)
                </div>
              </div>
            </div>

            <!-- 2. Product Info -->
            <div>
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Thông tin sản phẩm</span>
              <div class="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-relaxed">{{ selectedOrder.order.itemName || 'Sản phẩm từ Shopee' }}</div>
                <div class="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                  <span>Mã SP: {{ selectedOrder.order.itemId }}</span>
                  <span class="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span>Ngành hàng: {{ selectedOrder.order.l1GlobalCategory || 'Chưa phân loại' }}</span>
                </div>
              </div>
            </div>

            <!-- 3. Financial Breakdown Grid -->
            <div>
              <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Chi tiết hoa hồng & doanh số</span>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span class="text-[10px] font-semibold text-slate-500 uppercase block tracking-wider">Đơn giá</span>
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1">{{ formatMoney(selectedOrder.order.price) }} <span class="text-[10px] text-slate-500">x{{ selectedOrder.order.qty }}</span></span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span class="text-[10px] font-semibold text-slate-500 uppercase block tracking-wider">Giá trị</span>
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200 block mt-1">{{ formatMoney(selectedOrder.order.purchaseValue) }}</span>
                </div>
                <div class="bg-slate-50 dark:bg-slate-900/50 p-3 rounded-xl border border-slate-200 dark:border-slate-800 text-center">
                  <span class="text-[10px] font-semibold text-indigo-500 uppercase block tracking-wider">Hoa hồng (Sàn)</span>
                  <span class="text-sm font-bold text-indigo-600 dark:text-indigo-400 block mt-1">+{{ formatMoney(selectedOrder.order.affiliateNetCommission) }}</span>
                </div>
                <div class="bg-emerald-50/50 dark:bg-emerald-900/10 p-3 rounded-xl border border-emerald-200/50 dark:border-emerald-800/30 text-center">
                  <span class="text-[10px] font-semibold text-emerald-600 dark:text-emerald-500 uppercase block tracking-wider">Hoa hồng (User)</span>
                  <span class="text-sm font-bold text-emerald-600 dark:text-emerald-400 block mt-1">+{{ formatMoney(selectedOrder.order.userCommission) }}</span>
                </div>
              </div>
            </div>

            <!-- 4. Meta & Log Details -->
            <div class="pt-4 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-[11px] text-slate-500 font-medium">
              <div>Conversion ID: <span class="text-slate-700 dark:text-slate-300 select-all">{{ selectedOrder.order.conversionId || 'N/A' }}</span></div>
              <div>UID Link: <span class="text-slate-700 dark:text-slate-300 select-all">{{ selectedOrder.order.subId1 }}</span></div>
              <div>Giờ click: <span class="text-slate-700 dark:text-slate-300">{{ selectedOrder.order.clickTime ? new Date(selectedOrder.order.clickTime).toLocaleString('vi-VN') : 'N/A' }}</span></div>
              <div>Giờ đặt: <span class="text-slate-700 dark:text-slate-300">{{ selectedOrder.order.orderTime ? new Date(selectedOrder.order.orderTime).toLocaleString('vi-VN') : 'N/A' }}</span></div>
            </div>
          </div>
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
      <div v-if="toastMsg" class="fixed bottom-6 right-6 z-[300] flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border"
        :class="toastMsg.type === 'error' ? 'bg-white dark:bg-slate-900 border-rose-200 dark:border-rose-800 text-slate-800 dark:text-slate-200' : 'bg-white dark:bg-slate-900 border-emerald-200 dark:border-emerald-800 text-slate-800 dark:text-slate-200'">
        <svg v-if="toastMsg.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-emerald-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm font-semibold">{{ toastMsg.msg }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

definePageMeta({
  layout: "admin"
});

const showUploadModal = ref(false);
const fileInput = ref(null);
const isUploading = ref(false);
const selectedFile = ref(null);
const toastMsg = ref(null);

const showToast = (msg, type = 'success') => {
  toastMsg.value = { msg, type };
  setTimeout(() => {
    if (toastMsg.value && toastMsg.value.msg === msg) {
      toastMsg.value = null;
    }
  }, 4000);
};

const headers = useRequestHeaders(['cookie']);
const { data: response, refresh, pending } = useFetch('/api/order', {
  headers,
  lazy: true
});
const orders = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const totalCommission = computed(() => {
  return orders.value.reduce((sum, item) => sum + (item.order.affiliateNetCommission || 0), 0);
});

const pendingCount = computed(() => {
  return orders.value.filter(item => item.order.orderStatus === "Chờ duyệt" || item.order.orderStatus === "Pending").length;
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return val.toLocaleString("vi-VN") + "đ";
};

const getStatusClass = (status) => {
  if (status === "Thành công" || status === "Completed") return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  if (status === "Chờ duyệt" || status === "Pending") return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
  if (status === "Đã hủy" || status === "Cancelled") return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
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
      const lines = text.split('\n');
      if (lines.length < 2) {
        showToast("File CSV không hợp lệ hoặc trống.", "error");
        return;
      }

      const headers = lines[0].includes('\t') ? lines[0].split('\t') : lines[0].split(',');
      const parsedHeaders = headers.map(h => h.trim().replace(/^"|"$/g, ''));
      
      const data = [];
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue;
        
        const isTab = lines[0].includes('\t');
        const values = isTab 
          ? lines[i].split('\t').map(v => v.trim().replace(/^"|"$/g, ''))
          : lines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(v => v.trim().replace(/^"|"$/g, ''));
          
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
      
      const { data: uploadRes, error } = await useFetch('/api/order/import', {
        method: 'POST',
        body: data,
        watch: false
      });
      
      if (error.value) {
        showToast("Có lỗi xảy ra: " + (error.value?.data?.message || error.value.message), "error");
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
      if (fileInput.value) fileInput.value.value = '';
    }
  };
  reader.readAsText(file);
};

const mapCSVRowToOrderPayload = (row) => {
  // Helper functions to extract values safely
  const getVal = (key) => row[key] !== undefined && row[key] !== "" ? row[key] : null;
  const getNum = (key) => {
    const val = getVal(key);
    if (!val) return null;
    // Remove everything except digits, minus sign, and dot
    const num = parseFloat(val.replace(/[^\d.-]/g, ''));
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
    channel: getVal("Channel")
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
</script>
