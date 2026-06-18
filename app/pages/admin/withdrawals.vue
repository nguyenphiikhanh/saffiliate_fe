<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">Yêu Cầu Rút Tiền</h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">Quản lý và duyệt các lệnh rút tiền từ người dùng.</p>
      </div>
      
      <button 
        @click="refresh"
        :disabled="pending"
        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-lg font-semibold text-[13px] transition-colors duration-200 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :class="{'animate-spin text-slate-400': pending}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Làm mới
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Lệnh</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-slate-800 dark:text-white mt-1">{{ withdrawals.length }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Chờ Xử Lý</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-amber-500 mt-1">{{ pendingCount }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Tổng Tiền (Chờ)</div>
        <div v-if="pending && !response" class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-xl font-bold text-rose-500 mt-1">{{ formatMoney(totalPendingAmount) }}</div>
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
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm mã GD, email..." 
            class="block w-full pl-9 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition duration-150 ease-in-out font-medium"
          />
        </div>
        <div class="flex items-center gap-2">
          <select v-model="filterStatus" class="block w-full pl-3 pr-8 py-2 border border-slate-200 dark:border-slate-700 rounded-lg leading-5 bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-1 focus:ring-slate-400 transition duration-150 ease-in-out cursor-pointer font-medium">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="rejected">Đã hủy</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase tracking-wider font-bold text-slate-500 bg-slate-50 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
              <th class="px-4 py-3 pl-6 whitespace-nowrap w-[20%]">Mã GD</th>
              <th class="px-4 py-3 whitespace-nowrap w-[25%]">Người Dùng</th>
              <th class="px-4 py-3 whitespace-nowrap w-[20%]">Thời Gian</th>
              <th class="px-4 py-3 text-right whitespace-nowrap w-[20%]">Số Tiền</th>
              <th class="px-4 py-3 whitespace-nowrap text-center w-[15%]">Trạng Thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
            <tr v-if="pending && !response">
              <td colspan="5" class="p-4">
                <div class="flex flex-col gap-2 animate-pulse">
                  <div v-for="i in 4" :key="i" class="h-10 bg-slate-100 dark:bg-slate-800/50 rounded w-full"></div>
                </div>
              </td>
            </tr>
            <tr v-else-if="filteredWithdrawals.length === 0">
              <td colspan="5" class="p-8 text-center text-slate-500 text-sm font-medium">
                Chưa có lệnh rút tiền nào
              </td>
            </tr>
            <tr 
              v-else
              v-for="item in filteredWithdrawals" 
              :key="item.id"
              @click="openDetails(item)"
              class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors cursor-pointer group"
            >
              <!-- Mã GD -->
              <td class="px-4 py-3 pl-6">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">{{ item.referenceId }}</span>
                </div>
              </td>
              <!-- Người Dùng -->
              <td class="px-4 py-3">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">{{ item.user?.name || 'Ẩn danh' }}</span>
                  <span class="text-[11px] text-slate-500 font-medium mt-0.5">{{ item.user?.email || 'N/A' }}</span>
                </div>
              </td>
              <!-- Thời Gian -->
              <td class="px-4 py-3">
                <div class="text-xs text-slate-500 font-medium">
                  {{ new Date(item.createdAt).toLocaleString('vi-VN') }}
                </div>
              </td>
              <!-- Số Tiền -->
              <td class="px-4 py-3 text-right">
                <div class="font-bold text-rose-500 text-[13px]">
                  -{{ formatMoney(Math.abs(item.amount)) }}
                </div>
              </td>
              <!-- Trạng thái -->
              <td class="px-4 py-3 text-center">
                <span 
                  class="inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider"
                  :class="{
                    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': item.status === 'completed' || item.status === 'success',
                    'bg-amber-500/10 text-amber-600 dark:text-amber-400': item.status === 'pending',
                    'bg-rose-500/10 text-rose-600 dark:text-rose-400': item.status === 'rejected' || item.status === 'failed'
                  }"
                >
                  {{ (item.status === 'completed' || item.status === 'success') ? 'Thành công' : (item.status === 'pending' ? 'Chờ duyệt' : 'Đã hủy') }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
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
        <div v-if="selectedItem" class="fixed inset-0 z-[200] bg-slate-900/40 backdrop-blur-sm" @click="closeDetails"></div>
      </transition>

      <transition
        enter-active-class="transition-transform duration-300 ease-out"
        enter-from-class="translate-x-full"
        enter-to-class="translate-x-0"
        leave-active-class="transition-transform duration-200 ease-in"
        leave-from-class="translate-x-0"
        leave-to-class="translate-x-full"
      >
        <div v-if="selectedItem" class="fixed inset-y-0 right-0 z-[210] w-full max-w-md bg-white dark:bg-slate-950 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col h-full overflow-hidden">
          
          <!-- Drawer Header -->
          <div class="flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0">
            <div>
              <h3 class="text-base font-bold text-slate-800 dark:text-slate-100">Chi Tiết Rút Tiền</h3>
              <p class="text-[11px] text-slate-500 font-medium mt-0.5">{{ selectedItem.referenceId }}</p>
            </div>
            <button @click="closeDetails" class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
          
          <!-- Drawer Body -->
          <div class="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <div class="flex flex-col gap-6">
              <!-- QR Code Section -->
              <div v-if="selectedItem.qrCodeUrl" class="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-5 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-800">
                <h4 class="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-4">Quét QR chuyển khoản</h4>
                <div class="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
                  <img :src="selectedItem.qrCodeUrl" alt="QR Code" class="w-40 h-40 object-contain" />
                </div>
                <p class="text-[11px] text-slate-500 mt-4 text-center max-w-[250px]">
                  Sử dụng App Ngân hàng để quét mã QR. Nội dung chuyển khoản đã được điền tự động.
                </p>
              </div>

              <!-- Detail Grid -->
              <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Trạng Thái</span>
                  <span 
                    class="text-xs font-bold uppercase"
                    :class="{
                      'text-emerald-500': selectedItem.status === 'completed' || selectedItem.status === 'success',
                      'text-amber-500': selectedItem.status === 'pending',
                      'text-rose-500': selectedItem.status === 'rejected' || selectedItem.status === 'failed'
                    }"
                  >
                    {{ (selectedItem.status === 'completed' || selectedItem.status === 'success') ? 'HOÀN THÀNH' : (selectedItem.status === 'pending' ? 'CHỜ DUYỆT' : 'ĐÃ HỦY') }}
                  </span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Số Tiền</span>
                  <span class="text-sm font-bold text-rose-500">{{ formatMoney(Math.abs(selectedItem.amount)) }}</span>
                </div>
                
                <div class="col-span-2 border-t border-slate-200 dark:border-slate-800 my-1"></div>
                
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Khách Hàng</span>
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedItem.user?.name || 'Ẩn danh' }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Email</span>
                  <span class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ selectedItem.user?.email || 'N/A' }}</span>
                </div>

                <div class="col-span-2 border-t border-slate-200 dark:border-slate-800 my-1"></div>

                <div class="col-span-2 flex flex-col gap-2">
                  <span class="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Mô Tả</span>
                  <div class="text-sm font-medium text-slate-700 dark:text-slate-300 p-4 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl leading-relaxed">
                    {{ selectedItem.description || 'Không có mô tả' }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions Footer -->
          <div class="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shrink-0">
            <!-- Reject Input Area -->
            <div v-if="showRejectInput" class="flex flex-col gap-3">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-bold text-slate-700 dark:text-slate-300">Lý do từ chối <span class="text-rose-500">*</span></label>
                <textarea 
                  v-model="rejectReason" 
                  maxlength="100"
                  rows="2"
                  placeholder="Nhập lý do từ chối lệnh rút tiền này..."
                  class="w-full text-xs p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-500 resize-none font-medium"
                ></textarea>
                <div class="flex justify-between items-center text-[10px]">
                  <span v-if="rejectError" class="text-rose-500 font-medium">{{ rejectError }}</span>
                  <span v-else class="text-slate-400"></span>
                  <span class="text-slate-400">{{ rejectReason.length }}/100</span>
                </div>
              </div>
              <div class="flex items-center gap-3 w-full">
                <button @click="showRejectInput = false" class="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
                  Hủy
                </button>
                <button 
                  @click="submitUpdateStatus('rejected')"
                  :disabled="isUpdating"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white transition-colors disabled:opacity-50"
                >
                  <svg v-if="isUpdating" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Xác nhận từ chối
                </button>
              </div>
            </div>

            <!-- Normal Actions -->
            <div v-else class="flex items-center justify-end gap-3 w-full">
              <template v-if="selectedItem.status === 'pending'">
                <button 
                  @click="showRejectInput = true"
                  class="flex-1 px-4 py-2.5 rounded-lg text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors"
                >
                  Từ Chối
                </button>
                <button 
                  @click="submitUpdateStatus('success')"
                  :disabled="isUpdating"
                  class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white transition-colors disabled:opacity-50"
                >
                  <svg v-if="isUpdating" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Duyệt Lệnh
                </button>
              </template>
              <template v-else-if="selectedItem.status === 'rejected'">
                <div class="w-full p-4 rounded-xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-800/30 text-xs font-medium text-rose-600 dark:text-rose-400">
                  <span class="font-bold block mb-1">Lý do từ chối:</span>
                  {{ selectedItem.rejectReason || 'Không có lý do cụ thể' }}
                </div>
              </template>
            </div>
          </div>
          
        </div>
      </transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from 'vue';

definePageMeta({
  layout: "admin"
});

useHead({
  title: 'Yêu Cầu Rút Tiền | Admin Saffiliate'
});

const headers = useRequestHeaders(['cookie']);
const { data: response, refresh, pending } = await useFetch('/api/wallet/withdrawals', {
  headers,
  lazy: true
});

const withdrawals = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data?.data && Array.isArray(res.data.data)) return res.data.data;
  if (res.data?.items) return res.data.items;
  if (res.data && Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const searchQuery = ref('');
const filterStatus = ref('all');
const selectedItem = ref(null);

const pendingCount = computed(() => {
  return withdrawals.value.filter(item => item.status === "pending").length;
});

const totalPendingAmount = computed(() => {
  return withdrawals.value
    .filter(item => item.status === "pending")
    .reduce((sum, item) => sum + Math.abs(item.amount), 0);
});

const filteredWithdrawals = computed(() => {
  return withdrawals.value.filter(item => {
    // Text search
    const q = searchQuery.value.toLowerCase();
    const matchSearch = !q || 
      (item.referenceId && item.referenceId.toLowerCase().includes(q)) ||
      (item.user?.email && item.user.email.toLowerCase().includes(q)) ||
      (item.user?.name && item.user.name.toLowerCase().includes(q));
      
    // Status filter
    let matchStatus = filterStatus.value === 'all';
    if (!matchStatus) {
      if (filterStatus.value === 'completed') matchStatus = item.status === 'completed' || item.status === 'success';
      else if (filterStatus.value === 'rejected') matchStatus = item.status === 'rejected' || item.status === 'failed';
      else matchStatus = item.status === filterStatus.value;
    }
    
    return matchSearch && matchStatus;
  });
});

const formatMoney = (val) => {
  if (!val) return "0đ";
  return val.toLocaleString("vi-VN") + "đ";
};

const isUpdating = ref(false);
const showRejectInput = ref(false);
const rejectReason = ref('');
const rejectError = ref('');

const { api } = useAppFetch();

const openDetails = (item) => {
  selectedItem.value = item;
  showRejectInput.value = false;
  rejectReason.value = '';
  rejectError.value = '';
};

const closeDetails = () => {
  selectedItem.value = null;
  showRejectInput.value = false;
};

watch(selectedItem, (newVal) => {
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

const submitUpdateStatus = async (status) => {
  if (!selectedItem.value) return;
  
  if (status === 'rejected') {
    if (!rejectReason.value.trim()) {
      rejectError.value = 'Vui lòng nhập lý do từ chối';
      return;
    }
    if (rejectReason.value.length > 100) {
      rejectError.value = 'Lý do không được vượt quá 100 ký tự';
      return;
    }
  }

  isUpdating.value = true;
  rejectError.value = '';

  try {
    const payload = { status };
    if (status === 'rejected') {
      payload.rejectReason = rejectReason.value.trim();
    }

    const res = await api.put(`/wallet/withdrawals/${selectedItem.value.id}/status`, payload);
    
    if (res.success !== false) { // the generic fetch returns res.data but useAppFetch returns data directly
      // Success
      await refresh();
      closeDetails();
    }
  } catch (err) {
    console.error("Lỗi cập nhật trạng thái:", err);
    rejectError.value = err.data?.message || err.message || "Đã có lỗi xảy ra. Vui lòng thử lại.";
  } finally {
    isUpdating.value = false;
  }
};
</script>
