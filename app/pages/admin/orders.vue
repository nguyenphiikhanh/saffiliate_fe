<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-slate-800 dark:text-slate-100">Quản lý Đơn hàng</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Theo dõi, đối soát và upload dữ liệu đơn hàng từ mạng Affiliate.</p>
      </div>
      
      <button 
        @click="showUploadModal = true"
        class="flex items-center gap-2 bg-shopee-orange hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-[13px] shadow-lg shadow-orange-500/20 hover:shadow-orange-500/30 transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>
        Upload CSV
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tổng đơn hàng</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-slate-800 dark:text-white mt-1">{{ orders?.length || 0 }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Hoa hồng tạm tính</div>
        <div v-if="pending && !response" class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-shopee-orange mt-1">{{ formatMoney(totalCommission) }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Chờ duyệt</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-amber-500 mt-1">{{ pendingCount }}</div>
      </div>
    </div>

    <!-- Data Table Container -->
    <div class="bg-white dark:bg-slate-900/60 rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-900/[0.02]">
      <!-- Toolbar -->
      <div class="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div class="relative max-w-sm w-full sm:w-auto">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input 
            type="text" 
            placeholder="Tìm kiếm mã đơn hoặc tên shop..." 
            class="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-shopee-orange focus:border-transparent transition duration-150 ease-in-out"
          />
        </div>
        <div class="flex items-center gap-2">
          <select class="block w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-shopee-orange transition duration-150 ease-in-out cursor-pointer appearance-none">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ duyệt</option>
            <option value="success">Thành công</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-b-2xl">
        <!-- Desktop Table View -->
        <div class="hidden md:block">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th class="p-4 pl-6 whitespace-nowrap w-[15%]">Mã đơn</th>
                <th class="p-4 whitespace-nowrap w-[18%]">Người mua</th>
                <th class="p-4 whitespace-nowrap w-[28%]">Sản phẩm</th>
                <th class="p-4 whitespace-nowrap w-[12%]">Ngày</th>
                <th class="p-4 text-right whitespace-nowrap w-[12%]">Hoa hồng</th>
                <th class="p-4 whitespace-nowrap text-center w-[10%]">Trạng thái</th>
                <th class="p-4 whitespace-nowrap text-center w-[5%]">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              <tr v-if="pending && !response">
                <td colspan="7" class="p-4">
                  <div class="flex flex-col gap-3 animate-pulse">
                    <div v-for="i in 5" :key="i" class="h-14 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-full"></div>
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
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <!-- Mã đơn -->
                <td class="p-4 pl-6">
                  <div class="flex items-center gap-2.5">
                    <div class="w-6 h-6 rounded bg-[#ff5722]/10 text-[#ff5722] flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 6h-2c0-2.8-2.2-5-5-5S7 3.2 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.7 0 3 1.3 3 3H9c0-1.7 1.3-3 3-3zm7 17H5V8h14v12zm-7-8c-1.7 0-3-1.3-3-3H7c0 2.8 2.2 5 5 5s5-2.2 5-5h-2c0 1.7-1.3 3-3 3z"/>
                      </svg>
                    </div>
                    <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ item.order.orderId }}</span>
                  </div>
                </td>
                <!-- Người mua -->
                <td class="p-4">
                  <div v-if="item.user" class="flex flex-col">
                    <span class="font-bold text-slate-800 dark:text-slate-200 text-xs truncate max-w-[140px]">{{ item.user.name || "N/A" }}</span>
                    <span class="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-[140px] font-bold select-all mt-0.5" :title="item.user.email">{{ item.user.email }}</span>
                  </div>
                  <div class="text-xs text-slate-450 italic" v-else>Không rõ</div>
                </td>
                <!-- Sản phẩm -->
                <td class="p-4">
                  <div class="font-bold text-slate-600 dark:text-slate-300 text-[13px] truncate max-w-[280px]" :title="item.order.itemName || item.order.shopName">
                    {{ item.order.itemName || item.order.shopName || "Sản phẩm từ Shopee" }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="p-4">
                  <div class="text-xs text-slate-500 font-medium">
                    {{ new Date(item.order.orderTime || item.order.clickTime || Date.now()).toLocaleDateString('vi-VN') }}
                  </div>
                </td>
                <!-- Hoa hồng -->
                <td class="p-4 text-right">
                  <div class="flex items-center justify-end gap-1.5 font-black text-emerald-500 text-[13px]">
                    +{{ (item.order.affiliateNetCommission || 0).toLocaleString('vi-VN') }}
                    <span class="w-3.5 h-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-[8px] font-bold">đ</span>
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="p-4 text-center">
                  <span 
                    class="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    :class="getStatusClass(item.order.orderStatus)"
                  >
                    {{ (item.order.orderStatus === 'Completed' || item.order.orderStatus === 'Thành công') ? 'HOÀN THÀNH' : item.order.orderStatus }}
                  </span>
                </td>
                <!-- Hành động -->
                <td class="p-4 text-center">
                  <button
                    @click="openOrderDetails(item)"
                    class="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-shopee-orange dark:hover:border-shopee-orange bg-slate-50 hover:bg-shopee-orange/5 dark:bg-slate-950/20 text-slate-600 hover:text-shopee-orange dark:text-slate-400 dark:hover:text-shopee-orange font-bold text-xs active:scale-[0.96] transition-all cursor-pointer select-none"
                    type="button"
                  >
                    Xem
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card List View -->
        <div class="block md:hidden space-y-3.5 p-4 bg-slate-50 dark:bg-slate-950/30">
          <div v-if="pending && !response" class="space-y-3 animate-pulse">
            <div v-for="i in 3" :key="i" class="h-40 bg-white dark:bg-slate-900 rounded-[1.8rem] w-full"></div>
          </div>
          <div v-else-if="!orders || orders.length === 0" class="text-center py-6 text-slate-400 text-xs font-semibold">
            Chưa có dữ liệu đơn hàng
          </div>
          <div 
            v-else
            v-for="item in orders"
            :key="item.order.orderId"
            class="bg-white dark:bg-slate-900 rounded-[1.8rem] p-4 border border-slate-100 dark:border-slate-800/80 shadow-md flex flex-col gap-2.5 relative group overflow-hidden"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-black text-slate-800 dark:text-slate-200 text-xs">#{{ item.order.orderId }}</span>
              <span 
                class="px-2.5 py-1 rounded-full text-[8.5px] font-black uppercase tracking-wider scale-95 origin-right"
                :class="getStatusClass(item.order.orderStatus)"
              >
                {{ (item.order.orderStatus === 'Completed' || item.order.orderStatus === 'Thành công') ? 'HOÀN THÀNH' : item.order.orderStatus }}
              </span>
            </div>

            <!-- Buyer Badge -->
            <div v-if="item.user" class="flex items-center gap-2 bg-slate-50 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-100/50 dark:border-slate-800/40 select-none">
              <div class="w-6.5 h-6.5 rounded-full bg-[#EC407A] text-white font-black text-[9px] flex items-center justify-center uppercase shrink-0">
                {{ item.user.name ? item.user.name.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div class="flex flex-col min-w-0">
                <span class="font-bold text-slate-750 dark:text-slate-250 text-[10px] truncate leading-tight">{{ item.user.name || "N/A" }}</span>
                <span class="text-[8.5px] text-slate-400 dark:text-slate-500 truncate leading-none mt-0.5 select-all">{{ item.user.email }}</span>
              </div>
            </div>
            
            <div class="font-bold text-slate-650 dark:text-slate-350 text-xs line-clamp-2 pr-1 leading-relaxed" :title="item.order.itemName || item.order.shopName">
              {{ item.order.itemName || item.order.shopName || "Sản phẩm từ Shopee" }}
            </div>
            
            <div class="flex items-center justify-between border-t border-slate-100/60 dark:border-slate-800/40 pt-2.5 mt-1 select-none">
              <div class="text-[10px] text-slate-400 dark:text-slate-500 font-bold">
                {{ new Date(item.order.orderTime || item.order.clickTime || Date.now()).toLocaleDateString('vi-VN') }}
              </div>
              <div class="flex items-center gap-1 font-black text-emerald-550 dark:text-emerald-450 text-xs">
                +{{ (item.order.affiliateNetCommission || 0).toLocaleString('vi-VN') }}đ
              </div>
            </div>
            
            <button
              @click="openOrderDetails(item)"
              class="w-full py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-shopee-orange bg-slate-50 hover:bg-shopee-orange/5 dark:bg-slate-950/20 text-slate-600 hover:text-shopee-orange dark:text-slate-400 dark:hover:text-shopee-orange font-bold text-xs active:scale-[0.98] transition-all cursor-pointer text-center select-none"
              type="button"
            >
              Xem chi tiết
            </button>
          </div>
        </div>
      </div>
      
      <!-- Pagination (Mock) -->
      <div class="p-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 font-medium">
        <div>Hiển thị 1 - 5 của 5 kết quả</div>
        <div class="flex gap-1">
          <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-not-allowed opacity-50">&lt;</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-shopee-orange bg-shopee-orange text-white">1</button>
          <button class="w-8 h-8 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-not-allowed opacity-50">&gt;</button>
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div v-if="showUploadModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="showUploadModal = false"></div>
      <div class="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <!-- Modal Header -->
        <div class="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 class="text-base font-black text-slate-800 dark:text-slate-100">Upload dữ liệu đối soát</h3>
          <button @click="showUploadModal = false" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body (Drag & Drop) -->
        <div class="p-6 relative">
          <!-- Loading Overlay -->
          <div v-if="isUploading" class="absolute inset-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center rounded-b-3xl">
            <svg class="animate-spin h-8 w-8 text-shopee-orange mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            class="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors duration-200 hover:border-shopee-orange hover:bg-orange-50/50 dark:hover:bg-orange-500/5 group cursor-pointer"
          >
            <div class="w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-shopee-orange mb-4 group-hover:scale-110 transition-transform">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">Kéo thả file CSV vào đây</h4>
            <p class="text-xs text-slate-500 mb-6">hoặc click để chọn file từ máy tính</p>
            
            <button class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-5 py-2 rounded-xl text-xs font-bold transition-colors">
              Chọn file CSV
            </button>
          </div>
          
          <div v-else class="border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 class="text-sm font-bold text-slate-700 dark:text-slate-200 mb-1">{{ selectedFile.name }}</h4>
            <p class="text-[11px] text-slate-500 mb-6">{{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
            
            <div class="flex items-center gap-3">
              <button @click="selectedFile = null" class="bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 px-4 py-2 rounded-xl text-xs font-bold transition-colors">
                Hủy bỏ
              </button>
              <button @click="confirmUpload" class="bg-shopee-orange hover:bg-orange-600 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors shadow-lg shadow-orange-500/20">
                Xác nhận & Upload
              </button>
            </div>
          </div>
          
          <div class="mt-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl p-3 flex items-start gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 text-slate-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p class="text-[11px] text-slate-500 leading-relaxed">
              File CSV phải được trích xuất từ báo cáo của Shopee Affiliate. Quá trình xử lý sẽ tự động so khớp <span class="font-bold">Mã Đơn</span> và cập nhật trạng thái tương ứng.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Order Details Modal -->
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
      <div v-if="selectedOrder" class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <div @click="closeOrderDetails" class="absolute inset-0 cursor-default"></div>

        <div class="relative bg-white dark:bg-slate-900 rounded-[2.5rem] w-full max-w-xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 animate-fade-in-up z-10">
          <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-shopee-orange to-rose-500"></div>

          <!-- Modal Header -->
          <div class="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-5">
            <div>
              <span class="inline-block px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider mb-2" :class="getStatusClass(selectedOrder.order.orderStatus)">
                {{ selectedOrder.order.orderStatus === 'Completed' || selectedOrder.order.orderStatus === 'Thành công' ? 'HOÀN THÀNH' : selectedOrder.order.orderStatus }}
              </span>
              <h3 class="text-base font-black text-slate-800 dark:text-slate-100">Chi tiết đơn hàng #{{ selectedOrder.order.orderId }}</h3>
              <p class="text-xs text-slate-400 mt-1">Cửa hàng: {{ selectedOrder.order.shopName || 'Shopee Store' }}</p>
            </div>
            <button @click="closeOrderDetails" class="text-slate-400 hover:text-slate-650 dark:hover:text-slate-200 p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>

          <!-- Scrollable Content Box -->
          <div class="max-h-[60vh] overflow-y-auto pr-1 space-y-5 select-none scrollbar-hide">
            
            <!-- 1. Buyer & User Rank Info -->
            <div class="bg-slate-50/50 dark:bg-slate-950/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80">
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Thông tin người mua</span>
              <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div v-if="selectedOrder.user">
                  <h4 class="text-xs font-black text-slate-800 dark:text-slate-200">{{ selectedOrder.user.name || 'Người dùng Saffi' }}</h4>
                  <p class="text-[10px] text-slate-400 dark:text-slate-500 font-bold select-all mt-0.5">{{ selectedOrder.user.email }}</p>
                </div>
                <div v-else class="text-xs text-slate-450 italic">Không tìm thấy thông tin người dùng</div>
                
                <!-- Rank at purchase -->
                <div v-if="selectedOrder.order.userRank" class="flex items-center gap-1.5 px-3 py-1 rounded-full border text-[9px] font-extrabold tracking-wider bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-650 dark:text-slate-350 self-start sm:self-auto">
                  Hạng: {{ getRankName(selectedOrder.order.userRank) }} ({{ selectedOrder.order.commissionRate }}%)
                </div>
              </div>
            </div>

            <!-- 2. Product Info -->
            <div>
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Thông tin sản phẩm</span>
              <div class="space-y-2">
                <div class="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed">{{ selectedOrder.order.itemName || 'Sản phẩm từ Shopee' }}</div>
                <div class="flex items-center gap-1.5 text-[10px] text-slate-450 dark:text-slate-500">
                  <span>Mã SP: {{ selectedOrder.order.itemId }}</span>
                  <span class="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span>Ngành hàng: {{ selectedOrder.order.l1GlobalCategory || 'Chưa phân loại' }}</span>
                </div>
              </div>
            </div>

            <!-- 3. Financial Breakdown Grid -->
            <div>
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Chi tiết hoa hồng & doanh số</span>
              <div class="grid grid-cols-2 gap-3.5">
                <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center">
                  <span class="text-[9px] font-extrabold text-slate-450 dark:text-slate-500 uppercase block tracking-wider">Đơn giá sản phẩm</span>
                  <span class="text-xs font-black text-slate-700 dark:text-slate-200 block mt-1">{{ formatMoney(selectedOrder.order.price) }} <span class="text-[10px] font-bold">x{{ selectedOrder.order.qty }}</span></span>
                </div>
                <div class="bg-slate-50/50 dark:bg-slate-950/20 p-3 rounded-2xl border border-slate-100 dark:border-slate-800/80 text-center">
                  <span class="text-[9px] font-extrabold text-slate-455 dark:text-slate-500 uppercase block tracking-wider">Giá trị đơn hàng</span>
                  <span class="text-xs font-black text-slate-700 dark:text-slate-200 block mt-1">{{ formatMoney(selectedOrder.order.purchaseValue) }}</span>
                </div>
                <div class="bg-indigo-500/5 dark:bg-indigo-500/10 p-3.5 rounded-2xl border border-indigo-500/10 dark:border-indigo-500/20 text-center">
                  <span class="text-[9px] font-black text-indigo-500 dark:text-indigo-400 uppercase block tracking-widest">Hoa hồng Net (Sàn)</span>
                  <span class="text-sm font-black text-indigo-600 dark:text-indigo-400 block mt-1">+{{ formatMoney(selectedOrder.order.affiliateNetCommission) }}</span>
                </div>
                <div class="bg-emerald-500/5 dark:bg-emerald-500/10 p-3.5 rounded-2xl border border-emerald-500/10 dark:border-emerald-500/20 text-center">
                  <span class="text-[9px] font-black text-emerald-600 dark:text-emerald-450 uppercase block tracking-widest">Hoa hồng User nhận</span>
                  <span class="text-sm font-black text-emerald-600 dark:text-emerald-400 block mt-1">+{{ formatMoney(selectedOrder.order.userCommission) }}</span>
                </div>
              </div>
            </div>

            <!-- 4. Meta & Log Details -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
              <div>Conversion ID: <span class="font-mono text-slate-600 dark:text-slate-400 select-all">{{ selectedOrder.order.conversionId || 'N/A' }}</span></div>
              <div>Sub ID 1 (UID Link): <span class="font-mono text-slate-600 dark:text-slate-400 select-all">{{ selectedOrder.order.subId1 }}</span></div>
              <div>Thời gian click: <span>{{ selectedOrder.order.clickTime ? new Date(selectedOrder.order.clickTime).toLocaleString('vi-VN') : 'N/A' }}</span></div>
              <div>Thời gian đặt hàng: <span>{{ selectedOrder.order.orderTime ? new Date(selectedOrder.order.orderTime).toLocaleString('vi-VN') : 'N/A' }}</span></div>
            </div>

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
      <div v-if="toastMsg" class="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-[150] flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-2xl border"
        :class="toastMsg.type === 'error' ? 'bg-rose-50 dark:bg-rose-900/50 border-rose-100 dark:border-rose-800/50 text-rose-600 dark:text-rose-400' : 'bg-emerald-50 dark:bg-emerald-900/50 border-emerald-100 dark:border-emerald-800/50 text-emerald-600 dark:text-emerald-400'">
        <svg v-if="toastMsg.type === 'success'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-sm font-bold">{{ toastMsg.msg }}</span>
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
const { data: response, refresh, pending } = await useFetch('/api/order', {
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
  return "bg-slate-100 text-slate-600";
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
