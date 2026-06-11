<template>
  <div class="w-full animate-fade-in">
    <!-- Page Title & Header -->
    <div class="mt-6">
      <h1 class="text-[30px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Quản Lý <span class="text-shopee-orange">Tài Chính</span>
      </h1>
      <p class="text-[14px] text-slate-500 dark:text-slate-400 mt-1 font-medium">
        Yêu cầu rút số dư hoa hồng tích lũy về tài khoản ngân hàng của bạn cực kỳ nhanh chóng.
      </p>
    </div>

    <!-- Financial Stats Overview Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <!-- Card 1: Khả dụng -->
      <div class="rounded-3xl border border-slate-100 dark:border-slate-800/60 bg-gradient-to-br from-shopee-orange/5 to-transparent dark:from-shopee-orange/10 dark:bg-slate-900/40 p-6 shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10">
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Số dư khả dụng</span>
          <div class="h-10 w-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
        </div>
        <p class="text-[34px] font-black text-slate-800 dark:text-white mt-4 leading-none">{{ formatMoney(availableBalance) }}</p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">Có thể thanh toán</p>
      </div>

      <!-- Card 2: Chờ xử lý -->
      <div class="rounded-3xl border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 p-6 shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10">
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Chờ xử lý</span>
          <div class="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-[34px] font-black text-slate-800 dark:text-white mt-4 leading-none">{{ formatMoney(pendingBalance) }}</p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">Chờ rút tiền</p>
      </div>

      <!-- Card 3: Đã thanh toán -->
      <div class="rounded-3xl border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 p-6 shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10">
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Đã thanh toán</span>
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p class="text-[34px] font-black text-slate-800 dark:text-white mt-4 leading-none">{{ formatMoney(totalWithdrawn) }}</p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">Saffi đã thanh toán cho bạn</p>
      </div>
    </div>

    <!-- Card: Bank Account Linked Info (Screenshot style) -->
    <div class="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-900/[0.02] mt-8 animate-fade-in">
      <div v-if="isBankLoading" class="flex flex-col gap-4">
        <!-- Skeleton Loading -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-slate-100 shimmer-bg shrink-0"></div>
            <div class="h-4 w-24 bg-slate-100 shimmer-bg rounded"></div>
          </div>
          <div class="h-4 w-16 bg-slate-100 shimmer-bg rounded"></div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <div class="flex flex-col gap-2" v-for="i in 3" :key="i">
            <div class="h-3 w-16 bg-slate-100 shimmer-bg rounded"></div>
            <div class="h-4 w-32 bg-slate-100 shimmer-bg rounded"></div>
          </div>
        </div>
      </div>

      <div v-else-if="bankAccountInfo" class="w-full animate-fade-in">
        <!-- Bank linked display -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100 shrink-0 text-slate-550">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5.5 w-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4" />
              </svg>
            </div>
            <h3 class="text-sm font-black text-slate-800 leading-tight">Tài khoản</h3>
          </div>
          <NuxtLink to="/ho-so" class="text-xs font-bold text-shopee-orange flex items-center gap-1 hover:underline select-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Chỉnh sửa
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block select-none">Ngân hàng</span>
            <span class="text-sm font-black text-slate-800 block mt-1.5">{{ bankAccountInfo.bankName }}</span>
          </div>
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block select-none">Số tài khoản</span>
            <span class="text-sm font-black text-slate-800 block mt-1.5">{{ bankAccountInfo.accountNo }}</span>
          </div>
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 uppercase block select-none">Chủ tài khoản</span>
            <span class="text-sm font-black text-slate-800 block mt-1.5 uppercase">{{ bankAccountInfo.accountName }}</span>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 animate-fade-in">
        <div class="flex items-center gap-3.5 text-center sm:text-left flex-col sm:flex-row">
          <div class="h-10 w-10 rounded-full bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 class="text-xs font-black text-slate-800">Chưa liên kết tài khoản ngân hàng đối soát</h4>
            <p class="text-[10px] text-slate-400 mt-0.5 font-bold">Vui lòng liên kết tài khoản ngân hàng trong mục Hồ sơ để thực hiện rút tiền về tài khoản của bạn.</p>
          </div>
        </div>
        <NuxtLink to="/ho-so" class="px-4 py-2 rounded-xl bg-shopee-orange text-white hover:bg-shopee-orange/95 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-[11px] tracking-wide select-none shrink-0 shadow-md shadow-orange-500/10">
          Liên kết ngay
        </NuxtLink>
      </div>
    </div>

    <!-- MAIN TWO COLUMN GRID layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
      <!-- COLUMN Left: Withdraw Form (Span 7) -->
      <div class="lg:col-span-7 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20">
        <h2 class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60">
          Yêu Cầu Rút Tiền
        </h2>

        <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5">
          <!-- 1. Destination bank preview card -->
          <div v-if="bankAccountInfo" class="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="h-8 w-8 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4" />
                </svg>
              </div>
              <div class="min-w-0">
                <span class="block text-[9px] font-extrabold uppercase text-slate-400">Rút về tài khoản đối soát</span>
                <span class="font-black text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                  {{ bankAccountInfo.bankName }} • {{ bankAccountInfo.accountNo }}
                </span>
              </div>
            </div>
            <span class="font-bold text-[10px] text-slate-400 dark:text-slate-500 uppercase select-all shrink-0">
              {{ bankAccountInfo.accountName }}
            </span>
          </div>

          <!-- Alert error when not bank account linked -->
          <div v-else class="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-2.5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>Vui lòng liên kết tài khoản ngân hàng đối soát tại trang Hồ Sơ trước khi rút tiền.</span>
          </div>

          <!-- 2. Withdraw Amount -->
          <div class="flex flex-col gap-2.5">
            <div class="flex items-center justify-between">
              <label class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Số tiền rút</label>
              <button 
                type="button" 
                :disabled="isApiLoading || isSubmitting"
                @click="withdrawAmount = availableBalance" 
                class="text-[9.5px] font-black text-shopee-orange uppercase tracking-wide cursor-pointer hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Rút toàn bộ số dư
              </button>
            </div>
            <div class="relative">
              <input
                v-model="formattedWithdrawAmount"
                type="text"
                required
                :disabled="isApiLoading || isSubmitting || !bankAccountInfo"
                placeholder="Rút tối thiểu 10.000đ..."
                class="w-full rounded-2xl border bg-slate-50/50 dark:bg-slate-950/40 pl-4 pr-12 py-3 text-xs font-bold text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                :class="amountError ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-500/20 dark:border-rose-500/50 text-rose-600 dark:text-rose-400' : 'border-slate-200/80 dark:border-slate-800 focus:ring-shopee-orange/20 focus:border-shopee-orange'"
              />
              <span class="absolute right-4 top-1/2 -translate-y-1/2 font-extrabold text-[11px]" :class="amountError ? 'text-rose-500' : 'text-slate-400'">ĐỒNG</span>
            </div>
            <div class="min-h-[20px]">
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <p v-if="amountError" class="text-[10px] text-rose-500 font-bold flex items-center gap-1.5 mt-0.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span>{{ amountError }}</span>
                </p>
                <p v-else class="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-0.5 select-none">
                  * Hạn mức rút tối thiểu: <span class="text-slate-600 dark:text-slate-350">10.000đ</span> • Phí chuyển khoản: <span class="text-emerald-500">Miễn phí</span>
                </p>
              </transition>
            </div>
          </div>

          <!-- Alert message if any -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
          >
            <div v-if="successMsg || errorMsg" class="p-4 rounded-2xl text-xs font-bold flex items-center gap-2"
                 :class="errorMsg ? 'bg-rose-500/10 border border-rose-500/15 text-rose-600 dark:text-rose-400' : 'bg-emerald-500/10 border border-emerald-500/15 text-emerald-600 dark:text-emerald-400'">
              <svg v-if="errorMsg" xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4.5 w-4.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{{ errorMsg || successMsg }}</span>
            </div>
          </transition>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="!canSubmit"
            class="w-full bg-shopee-orange text-white hover:bg-shopee-orange/95 hover:scale-[1.02] active:scale-[0.98] transition-all rounded-2xl py-3.5 font-bold text-xs shadow-lg shadow-orange-500/15 cursor-pointer disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed flex items-center justify-center gap-2 select-none"
          >
            <svg v-if="isSubmitting" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>{{ isSubmitting ? 'Đang xử lý yêu cầu...' : 'Xác Nhận Rút Tiền' }}</span>
          </button>
        </form>
      </div>

      <!-- COLUMN Right: Withdrawal History (Span 5) -->
      <div class="lg:col-span-5 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20">
        <h2 class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60">
          Lịch Sử Rút Tiền
        </h2>

        <!-- History Items Stack -->
        <div v-if="isHistoryLoading" class="mt-6 flex flex-col gap-4 animate-pulse">
          <div v-for="i in 3" :key="i" class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-3.5">
            <div class="flex items-start gap-3">
              <div class="h-9 w-9 rounded-xl bg-slate-200 dark:bg-slate-800 shrink-0"></div>
              <div>
                <div class="h-4 w-24 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
                <div class="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded"></div>
              </div>
            </div>
            <div class="flex flex-col items-end shrink-0">
              <div class="h-4 w-20 bg-slate-200 dark:bg-slate-800 rounded mb-2"></div>
              <div class="h-3 w-12 bg-slate-200 dark:bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
        <div v-else class="mt-6 flex flex-col gap-4">
          <div
            v-for="item in historyList"
            :key="item.id"
            class="p-4 rounded-2xl border flex flex-col gap-3 transition-colors"
            :class="{
              'bg-emerald-500/5 border-emerald-500/10 dark:bg-emerald-500/10 dark:border-emerald-500/20': item.status === 'success' || item.status === 'completed',
              'bg-amber-500/5 border-amber-500/10 dark:bg-amber-500/10 dark:border-amber-500/20': item.status === 'pending',
              'bg-rose-500/5 border-rose-500/10 dark:bg-rose-500/10 dark:border-rose-500/20': item.status === 'rejected' || item.status === 'failed',
              'border-slate-100 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/20': !['success', 'completed', 'pending', 'rejected', 'failed'].includes(item.status)
            }"
          >
            <!-- Thông tin chính -->
            <div class="flex items-center justify-between gap-3.5">
              <div class="flex items-start gap-3">
                <!-- Wallet Icon -->
                <div class="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2" />
                  </svg>
                </div>
                <div>
                  <span class="text-xs font-black text-slate-800 dark:text-slate-100">{{ item.bankCode }} ({{ item.account }})</span>
                  <p class="text-[9.5px] text-slate-400 dark:text-slate-500 mt-1 font-bold">{{ item.date }}</p>
                </div>
              </div>

              <!-- Amount details and status -->
              <div class="flex flex-col items-end shrink-0">
                <span class="text-xs font-extrabold text-slate-800 dark:text-white leading-none">{{ formatMoney(item.amount) }}</span>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <button 
                    v-if="(item.status === 'rejected' || item.status === 'failed') && item.rejectReason"
                    @click="item.showReason = !item.showReason"
                    class="text-[9px] font-bold text-rose-500 hover:text-rose-600 underline decoration-rose-500/30 underline-offset-2 transition-colors focus:outline-none"
                  >
                    Lý do huỷ
                  </button>
                  <span
                    class="px-2 py-0.5 rounded-full text-[8.5px] font-black tracking-wide uppercase select-none"
                    :class="{
                      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400': item.status === 'completed' || item.status === 'success',
                      'bg-amber-500/10 text-amber-600 dark:text-amber-400': item.status === 'pending',
                      'bg-rose-500/10 text-rose-600 dark:text-rose-400': item.status === 'rejected' || item.status === 'failed'
                    }"
                  >
                    {{ (item.status === 'completed' || item.status === 'success') ? 'Thành công' : (item.status === 'pending' ? 'Đang xử lý' : 'Đã hủy') }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Lý do từ chối -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div v-if="item.showReason && (item.status === 'rejected' || item.status === 'failed') && item.rejectReason" class="px-3 py-2.5 bg-rose-50/80 dark:bg-rose-500/10 rounded-xl border border-rose-100 dark:border-rose-500/20 flex items-start gap-2">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                 <p class="text-[10px] text-rose-600 dark:text-rose-400 font-bold leading-relaxed">
                   <span class="uppercase tracking-widest text-rose-400 dark:text-rose-500/80 mr-1">Lý do huỷ:</span> {{ item.rejectReason }}
                 </p>
              </div>
            </transition>
          </div>

          <!-- Empty list state -->
          <div v-if="historyList.length === 0" class="py-12 text-center text-slate-400 font-medium text-xs">
            Chưa có thông tin.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";

const { isLoading: isApiLoading } = usePromiseTracker();

useSeoMeta({
  title: "Tài chính & Rút tiền - Saffi",
  ogTitle: "Tài chính & Rút tiền - Saffi",
  description: "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  ogDescription: "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { walletData, isLoading, error, fetchWallet } = useWallet();
const { user } = useAuth();
const { api } = useAppFetch();

const bankAccountInfo = ref(null);
const isBankLoading = ref(true);

const fetchBankAccount = async () => {
  if (!user.value?.id) {
    isBankLoading.value = false;
    return;
  }
  isBankLoading.value = true;
  try {
    const res = await api.get(`/bank-account/${user.value.id}`);
    if (res.data) {
      bankAccountInfo.value = res.data;
    }
  } catch (err) {
    console.error("Lỗi khi tải thông tin tài khoản ngân hàng:", err);
  } finally {
    isBankLoading.value = false;
  }
};

onMounted(() => {
  fetchWallet();
  fetchBankAccount();
  fetchHistory();
});

const availableBalance = computed({
  get: () => walletData.value.availableBalance,
  set: (val) => { walletData.value.availableBalance = val; }
});
const pendingBalance = computed({
  get: () => walletData.value.pendingBalance,
  set: (val) => { walletData.value.pendingBalance = val; }
});
const totalWithdrawn = computed({
  get: () => walletData.value.totalPaid,
  set: (val) => { walletData.value.totalPaid = val; }
});

const withdrawAmount = ref("");
const isSubmitting = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

const historyList = ref([]);
const isHistoryLoading = ref(true);

const fetchHistory = async () => {
  isHistoryLoading.value = true;
  try {
    const res = await api.get("/wallet/withdrawals");
    if (res.data) {
      // Hỗ trợ cả 2 format: có pagination (res.data.items) hoặc mảng (res.data)
      const dataArray = Array.isArray(res.data) ? res.data : (res.data.items || []);
      
      historyList.value = dataArray.map((item) => {
        return {
          id: item.id || Math.random(),
          bankCode: "Tài khoản đối soát",
          account: item.referenceId,
          amount: Math.abs(item.amount),
          date: new Date(item.createdAt).toLocaleString("vi-VN"),
          status: item.status,
          rejectReason: item.rejectReason,
          showReason: false
        };
      });
    }
  } catch (err) {
    console.error("Lỗi khi tải lịch sử rút tiền:", err);
  } finally {
    isHistoryLoading.value = false;
  }
};
const formattedWithdrawAmount = computed({
  get: () => {
    if (withdrawAmount.value === "" || withdrawAmount.value === null) return "";
    return Number(withdrawAmount.value).toLocaleString("vi-VN");
  },
  set: (val) => {
    const digits = val.replace(/\D/g, "");
    withdrawAmount.value = digits ? Number(digits) : "";
  }
});

const amountError = computed(() => {
  if (withdrawAmount.value === "") return "";
  const amount = Number(withdrawAmount.value);
  if (amount < 10000) return "Số tiền rút tối thiểu là 10.000đ";
  if (amount > availableBalance.value) return "Số dư khả dụng không đủ";
  return "";
});

const canSubmit = computed(() => {
  return !isApiLoading.value && 
         !isSubmitting.value && 
         bankAccountInfo.value && 
         withdrawAmount.value !== "" && 
         amountError.value === "";
});

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  isSubmitting.value = true;
  successMsg.value = "";
  errorMsg.value = "";

  try {
    const res = await api.post("/wallet/withdraw", {
      amount: Number(withdrawAmount.value),
    });

    // API call succeeded (if it didn't throw), update balance locally
    availableBalance.value -= withdrawAmount.value;
    
    // The API should return the new transaction in res.data
    const transaction = res.data;

    // Add to history list at beginning (optimistic update)
    historyList.value.unshift({
      id: transaction?.id || Date.now(),
      bankCode: "Tài khoản đối soát",
      account: transaction?.referenceId || "...",
      amount: withdrawAmount.value,
      date: new Date().toLocaleString("vi-VN"),
      status: "Đang xử lý",
    });

    successMsg.value = "Yêu cầu rút tiền thành công! Hệ thống đang xử lý đối soát tự động.";
    withdrawAmount.value = "";

    // Fetch wallet and history again to ensure sync
    fetchWallet();
    fetchHistory();
  } catch (error) {
    console.error("Lỗi khi rút tiền:", error, error?.data);
    
    // Extract exact message from parsedError in useAppFetch
    if (error?.message && error.message !== "Bad Request") {
      errorMsg.value = error.message;
    } else if (error?.data?.message) {
      errorMsg.value = error.data.message;
    } else {
      errorMsg.value = "Yêu cầu rút tiền bị từ chối. Vui lòng thử lại.";
    }

    if (error?.data?.stack) {
      errorMsg.value += " | STACK: " + error.data.stack;
    }
  } finally {
    isSubmitting.value = false;
    
    // Clear message after 4s
    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
    }, 4000);
  }
};

const formatMoney = (val) => {
  return val.toLocaleString("vi-VN") + "đ";
};
</script>
