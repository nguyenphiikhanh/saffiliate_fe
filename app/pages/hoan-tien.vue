<template>
  <div class="w-full animate-fade-in flex flex-col gap-6">
    <!-- Premium Guidelines & Instruction Card -->
    <div class="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20 p-6 md:p-8 rounded-3xl flex flex-col gap-2">
      <!-- Header banner (Toggle Button) -->
      <button @click="isImportantNotesOpen = !isImportantNotesOpen" class="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-amber-500/[0.03] dark:bg-amber-500/[0.05] border border-amber-500/10 hover:bg-amber-500/[0.06] transition-colors cursor-pointer group outline-none">
        <div class="flex items-start gap-3.5">
          <div class="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 select-none group-hover:scale-105 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h4 class="text-[13px] font-black uppercase tracking-widest text-slate-800 dark:text-slate-100 leading-tight">Lưu ý Quan trọng</h4>
            <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">Đọc kỹ để đảm bảo nhận hoàn tiền mua sắm</p>
          </div>
        </div>
        <!-- Chevron & Text -->
        <div class="flex items-center gap-1.5 text-amber-500 shrink-0 ml-2">
          <span class="text-xs font-bold w-8 text-center select-none">{{ isImportantNotesOpen ? 'Ẩn' : 'Xem' }}</span>
          <div class="bg-amber-500/10 rounded-full p-1 group-hover:bg-amber-500/20 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 transition-transform duration-500" :class="{ 'rotate-180': isImportantNotesOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      <!-- Details Section (Smooth Expand/Collapse) -->
      <div class="grid transition-all duration-500 ease-in-out" :class="isImportantNotesOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0 mt-0'">
        <div class="overflow-hidden flex flex-col gap-6">
          <!-- Instruction List -->
      <div class="flex flex-col gap-4">
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            1
          </div>
          <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            <span class="font-black text-slate-800 dark:text-slate-200">Xóa sản phẩm tương tự</span> đã có trong giỏ hàng trước khi bấm link.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            2
          </div>
          <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            <span class="font-black text-slate-800 dark:text-slate-200">Không bấm link khác</span> (live, video, quảng cáo) khi đang mua hàng.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            3
          </div>
          <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Hoàn tất mua hàng trong <span class="font-black text-slate-800 dark:text-slate-200">cùng một phiên</span> trình duyệt.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            4
          </div>
          <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Việc ghi nhận đơn hàng là do <span class="font-black text-slate-800 dark:text-slate-200">đối tác (sàn TMĐT)</span> quyết định. Saffi <span class="font-black text-slate-800 dark:text-slate-200">không thể can thiệp</span>.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            5
          </div>
          <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Khi mua ở sàn, bạn <span class="font-black text-slate-800 dark:text-slate-200">thao tác bình tĩnh</span> thôi nhé. Nếu mua quá nhanh, sàn có thể đánh giá là <span class="font-black text-slate-800 dark:text-slate-200">bot hoặc spam đơn</span> và <span class="font-black text-slate-800 dark:text-slate-200">hủy cashback</span>.
          </p>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
        <!-- Card 1 -->
        <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
          <div class="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13 3 4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Thời gian ghi nhận</div>
            <div class="text-sm font-medium text-slate-700 dark:text-slate-200"><span class="text-shopee-orange font-bold">Trong vòng 24h</span></div>
          </div>
        </div>

        <!-- Card 2 -->
        <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
          <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/>
            </svg>
          </div>
          <div>
            <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">Thời gian duyệt hoàn</div>
            <div class="text-sm font-medium text-slate-700 dark:text-slate-200"><span class="text-emerald-500 font-bold">7 - 14 ngày</span></div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>

    <!-- Link Converter Component -->
    <ShopeeConverter />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const isImportantNotesOpen = ref(false);

useSeoMeta({
  title: "Quy đổi hoàn tiền - Saffi",
  ogTitle: "Quy đổi hoàn tiền - Saffi",
  description: "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogDescription: "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});
</script>
