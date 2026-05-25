<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-xl font-black text-slate-800 dark:text-slate-100">Yêu Cầu Rút Tiền</h2>
        <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">Quản lý và duyệt các lệnh rút tiền từ người dùng.</p>
      </div>
      
      <button 
        @click="refresh"
        :disabled="pending"
        class="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 px-4 py-2.5 rounded-xl font-bold text-[13px] transition-all duration-300 disabled:opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" :class="{'animate-spin text-shopee-orange': pending}" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Làm mới
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tổng Lệnh</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-slate-800 dark:text-white mt-1">{{ withdrawals.length }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Chờ Xử Lý</div>
        <div v-if="pending && !response" class="h-8 w-16 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-amber-500 mt-1">{{ pendingCount }}</div>
      </div>
      <div class="bg-white dark:bg-slate-900/60 p-5 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-900/[0.02]">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Tổng Tiền (Chờ)</div>
        <div v-if="pending && !response" class="h-8 w-32 bg-slate-200 dark:bg-slate-800 rounded mt-1 animate-pulse"></div>
        <div v-else class="text-2xl font-black text-shopee-orange mt-1">{{ formatMoney(totalPendingAmount) }}</div>
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
            v-model="searchQuery"
            type="text" 
            placeholder="Tìm kiếm mã WD, email..." 
            class="block w-full pl-10 pr-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-shopee-orange focus:border-transparent transition duration-150 ease-in-out"
          />
        </div>
        <div class="flex items-center gap-2">
          <select v-model="filterStatus" class="block w-full pl-3 pr-10 py-2 border border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-shopee-orange transition duration-150 ease-in-out cursor-pointer appearance-none">
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xử lý</option>
            <option value="completed">Đã hoàn thành</option>
            <option value="rejected">Đã hủy</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto bg-white dark:bg-slate-900 rounded-b-2xl">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 pl-6 whitespace-nowrap w-[20%]">Mã GD</th>
              <th class="p-4 whitespace-nowrap w-[25%]">Người Dùng</th>
              <th class="p-4 whitespace-nowrap w-[20%]">Thời Gian</th>
              <th class="p-4 text-right whitespace-nowrap w-[20%]">Số Tiền</th>
              <th class="p-4 whitespace-nowrap text-center w-[15%]">Trạng Thái</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            <tr v-if="pending && !response">
              <td colspan="5" class="p-4">
                <div class="flex flex-col gap-3 animate-pulse">
                  <div v-for="i in 4" :key="i" class="h-14 bg-slate-100 dark:bg-slate-800/50 rounded-xl w-full"></div>
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
              <td class="p-4 pl-6">
                <div class="flex items-center gap-2.5">
                  <div class="w-6 h-6 rounded bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <span class="font-bold text-slate-700 dark:text-slate-200 text-xs group-hover:text-indigo-500 transition-colors">{{ item.referenceId }}</span>
                </div>
              </td>
              <!-- Người Dùng -->
              <td class="p-4">
                <div class="flex flex-col">
                  <span class="font-bold text-slate-700 dark:text-slate-200 text-[13px]">{{ item.user?.name || 'Ẩn danh' }}</span>
                  <span class="text-[10px] text-slate-400 font-medium">{{ item.user?.email || 'N/A' }}</span>
                </div>
              </td>
              <!-- Thời Gian -->
              <td class="p-4">
                <div class="text-xs text-slate-500 font-medium">
                  {{ new Date(item.createdAt).toLocaleString('vi-VN') }}
                </div>
              </td>
              <!-- Số Tiền -->
              <td class="p-4 text-right">
                <div class="flex items-center justify-end gap-1.5 font-black text-rose-500 text-[13px]">
                  -{{ formatMoney(Math.abs(item.amount)) }}
                </div>
              </td>
              <!-- Trạng thái -->
              <td class="p-4 text-center">
                <span 
                  class="inline-block px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
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

    <!-- Detail Modal -->
    <div v-if="selectedItem" class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="closeDetails"></div>
      <div class="relative bg-white dark:bg-slate-900 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        
        <!-- Modal Header -->
        <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between shrink-0">
          <div>
            <h3 class="text-lg font-black text-slate-800 dark:text-slate-100">Chi Tiết Rút Tiền</h3>
            <p class="text-[11px] text-slate-500 font-medium mt-0.5">{{ selectedItem.referenceId }}</p>
          </div>
          <button @click="closeDetails" class="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
        
        <!-- Modal Body -->
        <div class="p-6 overflow-y-auto">
          <div class="flex flex-col gap-6">
            <!-- QR Code Section -->
            <div v-if="selectedItem.qrCodeUrl" class="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6 flex flex-col items-center justify-center">
              <h4 class="text-xs font-black text-slate-600 dark:text-slate-300 uppercase tracking-widest mb-4">Quét QR chuyển khoản</h4>
              <div class="p-3 bg-white rounded-2xl shadow-sm border border-slate-100">
                <img :src="selectedItem.qrCodeUrl" alt="QR Code" class="w-48 h-48 object-contain" />
              </div>
              <p class="text-[10px] text-slate-400 mt-4 text-center max-w-[250px]">
                Sử dụng App Ngân hàng để quét mã QR. Nội dung chuyển khoản đã được điền tự động.
              </p>
            </div>

            <!-- Detail Grid -->
            <div class="grid grid-cols-2 gap-4">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase text-slate-400">Trạng Thái</span>
                <span 
                  class="text-xs font-black uppercase"
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
                <span class="text-[10px] font-bold uppercase text-slate-400">Số Tiền</span>
                <span class="text-sm font-black text-rose-500">{{ formatMoney(Math.abs(selectedItem.amount)) }}</span>
              </div>
              
              <div class="col-span-2 border-t border-slate-100 dark:border-slate-800/50 my-2"></div>
              
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase text-slate-400">Khách Hàng</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-200">{{ selectedItem.user?.name || 'Ẩn danh' }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase text-slate-400">Email</span>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-200">{{ selectedItem.user?.email || 'N/A' }}</span>
              </div>

              <div class="col-span-2 border-t border-slate-100 dark:border-slate-800/50 my-2"></div>

              <div class="col-span-2 flex flex-col gap-1">
                <span class="text-[10px] font-bold uppercase text-slate-400">Mô Tả</span>
                <div class="text-xs font-medium text-slate-600 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl leading-relaxed">
                  {{ selectedItem.description || 'Không có mô tả' }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="p-6 pt-0 mt-2 flex flex-col gap-4 shrink-0 border-t border-slate-100 dark:border-slate-800/50">
          
          <!-- Reject Input Area -->
          <div v-if="showRejectInput" class="pt-4 flex flex-col gap-3 animate-in fade-in slide-in-from-top-2">
            <div class="flex flex-col gap-1.5">
              <label class="text-[11px] font-bold text-slate-700 dark:text-slate-300">Lý do từ chối <span class="text-rose-500">*</span></label>
              <textarea 
                v-model="rejectReason" 
                maxlength="100"
                rows="2"
                placeholder="Nhập lý do từ chối lệnh rút tiền này..."
                class="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-none"
              ></textarea>
              <div class="flex justify-between items-center text-[10px]">
                <span v-if="rejectError" class="text-rose-500 font-medium">{{ rejectError }}</span>
                <span v-else class="text-slate-400"></span>
                <span class="text-slate-400">{{ rejectReason.length }}/100</span>
              </div>
            </div>
            <div class="flex items-center justify-end gap-2">
              <button @click="showRejectInput = false" class="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Hủy thao tác
              </button>
              <button 
                @click="submitUpdateStatus('rejected')"
                :disabled="isUpdating"
                class="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 transition-colors disabled:opacity-50"
              >
                <svg v-if="isUpdating" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Xác nhận từ chối
              </button>
            </div>
          </div>

          <!-- Normal Actions -->
          <div v-else class="pt-4 flex items-center justify-end gap-3">
            <button @click="closeDetails" class="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              Đóng
            </button>
            <template v-if="selectedItem.status === 'pending'">
              <button 
                @click="showRejectInput = true"
                class="px-5 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:hover:bg-rose-500/20 transition-colors"
              >
                Từ Chối
              </button>
              <button 
                @click="submitUpdateStatus('success')"
                :disabled="isUpdating"
                class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/20 transition-colors disabled:opacity-50"
              >
                <svg v-if="isUpdating" class="animate-spin h-3.5 w-3.5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Duyệt Lệnh
              </button>
            </template>
            <template v-if="selectedItem.status === 'rejected'">
              <div class="px-5 py-2.5 text-xs font-bold text-rose-500 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                Lý do từ chối: {{ selectedItem.rejectReason || 'Không có lý do cụ thể' }}
              </div>
            </template>
          </div>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

definePageMeta({
  layout: "admin"
});

const headers = useRequestHeaders(['cookie']);
const { data: response, refresh, pending } = await useFetch('/api/wallet/withdrawals', {
  headers,
  lazy: true
});

const withdrawals = computed(() => {
  const res = response.value;
  if (!res) return [];
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
