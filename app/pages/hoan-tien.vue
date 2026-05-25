<template>
  <div class="w-full max-w-4xl mx-auto animate-fade-in flex flex-col gap-6">
    <!-- Premium Guidelines & Instruction Card -->
    <div class="bg-white dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20 p-6 md:p-8 rounded-3xl flex flex-col gap-6">
      <!-- Header banner -->
      <div class="flex items-start gap-3.5 p-4 rounded-2xl bg-amber-500/[0.03] dark:bg-amber-500/[0.05] border border-amber-500/10">
        <div class="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 select-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h4 class="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">Lưu ý Quan trọng</h4>
          <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">Đọc kỹ để đảm bảo nhận điểm mua sắm</p>
        </div>
      </div>

      <!-- Instruction List -->
      <div class="flex flex-col gap-4">
        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            1
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            <span class="font-black text-slate-800 dark:text-slate-200">Xóa sản phẩm tương tự</span> đã có trong giỏ hàng trước khi bấm link.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            2
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            <span class="font-black text-slate-800 dark:text-slate-200">Không bấm link khác</span> (live, video, quảng cáo) khi đang mua hàng.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            3
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Hoàn tất mua hàng trong <span class="font-black text-slate-800 dark:text-slate-200">cùng một phiên</span> trình duyệt.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            4
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Việc ghi nhận đơn hàng là do <span class="font-black text-slate-800 dark:text-slate-200">đối tác (sàn TMĐT)</span> quyết định. Saffi <span class="font-black text-slate-800 dark:text-slate-200">không thể can thiệp</span>.
          </p>
        </div>

        <div class="flex items-start gap-3">
          <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
            5
          </div>
          <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
            Khi mua ở sàn, bạn <span class="font-black text-slate-800 dark:text-slate-200">thao tác từ tốn</span> nhé. Nếu mua quá nhanh, sàn có thể đánh giá là <span class="font-black text-slate-800 dark:text-slate-200">bot hoặc spam đơn</span> và <span class="font-black text-slate-800 dark:text-slate-200">hủy cashback</span>.
          </p>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
        <!-- Metric Card 1: THỜI GIAN GHI NHẬN -->
        <div class="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
          <div class="w-12 h-12 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <span class="text-[9px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">Thời gian ghi nhận</span>
            <p class="text-xs text-shopee-orange font-black mt-0.5 leading-none">
              Trong vòng 24h
            </p>
          </div>
        </div>

        <!-- Metric Card 2: THỜI GIAN DUYỆT HOÀN -->
        <div class="bg-slate-50/50 dark:bg-slate-950/20 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-4 flex items-center gap-4 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
          <div class="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <div>
            <span class="text-[9px] font-black tracking-wider text-slate-400 dark:text-slate-500 uppercase">Thời gian duyệt hoàn</span>
            <p class="text-xs text-emerald-600 dark:text-emerald-400 font-black mt-0.5 leading-none">
              7 - 14 ngày
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Link Converter Component -->
    <ShopeeConverter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Quy đổi hoàn tiền - Saffi",
  ogTitle: "Quy đổi hoàn tiền - Saffi",
  description: "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogDescription: "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});
</script>
