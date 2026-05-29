<template>
  <div class="w-full animate-fade-in-up">
    <!-- Premium Welcome Dashboard Card -->
    <div class="glass-panel rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] text-center relative overflow-hidden transition-all duration-500 border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl">
      <!-- Brand Identity Brandmark -->
      <div class="flex justify-center mb-6">
        <div class="flex h-20 w-20 items-center justify-center shrink-0 cursor-pointer transition-transform duration-500 hover:rotate-12 select-none group">
          <img src="/saficon.png" class="h-20 w-20 object-contain rounded-[24px] shadow-sm transition-transform duration-300 group-hover:scale-105" alt="Saffi Logo" />
        </div>
      </div>

      <!-- Welcome Slogan & Copy -->
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] select-none mb-5 transition-colors duration-400">
        Chào mừng bạn đến với <span class="text-shopee-orange">Saffi</span>
      </h1>
      
      <p class="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-[60ch] mx-auto mb-10 leading-relaxed transition-colors duration-400">
        Hệ thống quy đổi link mua sắm thông minh. Tự động nhận hoàn tiền và chiết khấu hấp dẫn trực tiếp khi bạn thực hiện mua hàng qua liên kết tiếp thị.
      </p>

      <!-- Key Benefits Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 text-left">
        <!-- Benefit 1 (Hero Item - spans full width on desktop) -->
        <div class="md:col-span-2 p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div class="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-shopee-orange transition-colors">Tốc Độ Siêu Tốc</h3>
            <p class="text-sm text-slate-500 leading-relaxed max-w-[50ch]">Hệ thống máy chủ tối ưu hóa giúp quy đổi và xuất mã link tiếp thị nhận hoàn tiền chỉ trong <span class="font-semibold text-slate-700 dark:text-slate-300">chưa đầy 3 giây</span>.</p>
          </div>
        </div>

        <!-- Benefit 2 -->
        <div class="p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group">
          <div class="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors">Tối Ưu Chiết Khấu</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Nhận mức hoa hồng cao nhất thị trường, cam kết chia sẻ lên đến <b>90%</b> doanh thu.</p>
        </div>

        <!-- Benefit 3 -->
        <div class="p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group">
          <div class="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <svg class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 class="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors">An Toàn Tuyệt Đối</h3>
          <p class="text-sm text-slate-500 leading-relaxed">Đảm bảo bảo mật tài khoản tuyệt đối và đối soát lịch sử giao dịch minh bạch từng đồng.</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/hoan-tien"
          class="w-full sm:w-auto px-8 py-4 bg-shopee-orange hover:bg-shopee-orange-hover border border-shopee-orange text-white font-bold text-sm tracking-wide uppercase rounded-2xl transition-premium active:scale-98 cursor-pointer shadow-lg shadow-orange-500/20 glow-orange-button flex items-center justify-center gap-2 select-none"
        >
          <span>Mua sắm hoàn tiền ngay</span>
          <svg class="h-4 w-4 shrink-0 transition-transform duration-300 hover:translate-x-1" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </NuxtLink>

        <a
          href="https://shopee.vn"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm tracking-wide uppercase rounded-2xl transition-premium active:scale-98 cursor-pointer flex items-center justify-center gap-2 select-none"
        >
          <span>Đến Shopee</span>
          <svg class="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  ogTitle: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  description: "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogDescription: "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
/* Smooth and premium transition */
.transition-premium {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
