<template>
  <a-card :bordered="false" class="rounded-3xl shadow-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
    <!-- Header -->
    <div class="flex items-center gap-2 mb-6">
      <div class="w-6 h-6 rounded-full border border-orange-500/30 text-[#ee4d2d] flex items-center justify-center shrink-0">
        <InfoCircleOutlined class="text-[10px]" />
      </div>
      <h2 class="text-[13px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-100 m-0">Quy Trình Đơn Hàng</h2>
    </div>

    <!-- Timeline -->
    <div class="flex items-start justify-between max-w-3xl mx-auto mb-8 px-1 sm:px-6 relative">
      <div class="absolute top-6 left-8 right-8 h-0.5 bg-slate-200 dark:bg-slate-700 -z-10 hidden sm:block"></div>
      
      <!-- Step 1 -->
      <div class="flex flex-col items-center gap-3 w-16 sm:w-20 shrink-0">
        <div class="w-12 h-12 rounded-full bg-[#ee4d2d] shadow-lg shadow-orange-500/20 text-white flex items-center justify-center relative">
          <ShoppingCartOutlined class="text-xl" />
        </div>
        <span class="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Mua hàng</span>
      </div>

      <!-- Connector 1 (Mobile only) -->
      <div class="flex-1 h-12 flex items-center px-1 sm:hidden">
        <div class="w-full h-0.5 bg-gradient-to-r from-[#ee4d2d] to-amber-400"></div>
      </div>

      <!-- Step 2 -->
      <div class="flex flex-col items-center gap-3 w-16 sm:w-20 shrink-0">
        <div class="w-12 h-12 rounded-full bg-amber-400 shadow-lg shadow-amber-500/20 text-white flex items-center justify-center relative">
          <ExceptionOutlined class="text-xl" />
        </div>
        <span class="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Ghi nhận</span>
      </div>

      <!-- Connector 2 (Mobile only) -->
      <div class="flex-1 h-12 flex items-center px-1 sm:hidden">
        <div class="w-full h-0.5 bg-gradient-to-r from-amber-400 to-sky-400"></div>
      </div>

      <!-- Step 3 -->
      <div class="flex flex-col items-center gap-3 w-16 sm:w-20 shrink-0">
        <div class="w-12 h-12 rounded-full bg-sky-400 shadow-lg shadow-sky-500/20 text-white flex items-center justify-center relative">
          <SyncOutlined class="text-xl" />
        </div>
        <span class="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Đối soát</span>
      </div>

      <!-- Connector 3 (Mobile only) -->
      <div class="flex-1 h-12 flex items-center px-1 sm:hidden">
        <div class="w-full h-0.5 bg-slate-200 dark:bg-slate-700"></div>
      </div>

      <!-- Step 4 -->
      <div class="flex flex-col items-center gap-3 w-16 sm:w-20 shrink-0">
        <div class="w-12 h-12 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/20 text-white flex items-center justify-center relative">
          <CheckCircleOutlined class="text-xl" />
        </div>
        <span class="text-[11px] sm:text-xs font-bold text-slate-700 dark:text-slate-300 text-center leading-tight">Duyệt hoàn</span>
      </div>
    </div>

    <!-- Toggle button -->
    <div class="flex justify-center mb-6">
      <a-button type="link" @click="isDetailsOpen = !isDetailsOpen" class="font-bold text-[#ee4d2d] flex items-center gap-1.5">
        Xem chi tiết <DownOutlined :class="{'rotate-180': isDetailsOpen}" class="transition-transform text-[10px]" />
      </a-button>
    </div>

    <!-- Details section -->
    <div v-show="isDetailsOpen" class="mb-6">
      <a-row :gutter="12">
        <a-col :span="12">
          <div class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 h-full">
            <div class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center shrink-0">
              <ClockCircleOutlined class="text-lg" />
            </div>
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Thời gian ghi nhận</div>
              <div class="text-[13px] font-bold text-slate-700 dark:text-slate-300">Trong vòng <span class="text-[#ee4d2d]">24h</span></div>
            </div>
          </div>
        </a-col>
        <a-col :span="12">
          <div class="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 h-full">
            <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircleOutlined class="text-lg" />
            </div>
            <div>
              <div class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">Thời gian duyệt hoàn</div>
              <div class="text-[13px] font-bold text-emerald-500">7 - 14 ngày</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </div>

    <!-- Footer note -->
    <div class="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5">
      Đơn hàng mua qua <strong>Saffi</strong> sẽ được tự động ghi nhận. Hãy đảm bảo bạn không bấm link khác (live, video, quảng cáo,...) hoặc chuyển sang link khác khi đang mua sắm.
    </div>
  </a-card>
</template>

<script setup>
import { ref } from 'vue';
import { InfoCircleOutlined, ShoppingCartOutlined, ExceptionOutlined, SyncOutlined, CheckCircleOutlined, DownOutlined, ClockCircleOutlined } from '@ant-design/icons-vue';

const isDetailsOpen = ref(false);
</script>
