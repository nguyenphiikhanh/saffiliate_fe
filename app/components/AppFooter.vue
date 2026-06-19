<template>
  <footer class="hidden md:block w-full mt-auto pt-12 pb-6 bg-white dark:bg-slate-950 transition-colors duration-500">
    <div class="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
      
      <!-- BENTO GRID FOOTER -->
      <div class="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
        
        <!-- BENTO BOX 1: Brand (Span 5) -->
        <div class="md:col-span-12 lg:col-span-5 relative overflow-hidden rounded-[2rem] bg-orange-50/50 dark:bg-slate-900/40 p-8 md:p-10 shadow-sm hover:shadow-md transition-shadow duration-500 group border border-orange-100/60 dark:border-slate-800/80">
          <!-- Background Abstract Shapes -->
          <div class="absolute -top-32 -right-32 w-80 h-80 bg-shopee-orange/10 dark:bg-shopee-orange/20 rounded-full blur-[80px] group-hover:scale-150 transition-transform duration-1000"></div>
          <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-shopee-orange/5 dark:bg-shopee-orange/10 rounded-full blur-[60px] group-hover:translate-x-10 transition-transform duration-700"></div>
          
          <div class="relative z-10 flex flex-col h-full justify-between gap-8">
            <div>
              <div class="flex items-center gap-3">
                <div class="flex h-12 w-12 items-center justify-center shrink-0">
                  <img src="/saficon.png" class="h-12 w-12 object-contain rounded-2xl shadow-sm" alt="Saffi Logo" />
                </div>
                <div class="flex flex-col text-slate-800 dark:text-white">
                  <span class="font-sans text-3xl font-black tracking-tight leading-none">Saffi</span>
                  <span class="text-[9px] font-bold tracking-[0.2em] uppercase text-slate-400 dark:text-slate-500 mt-1">Smart Shopping</span>
                </div>
              </div>
              <p class="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed max-w-xs mt-6">
                Trợ lý mua sắm thông minh thế hệ mới. Hoàn tiền tự động, minh bạch và siêu tốc từ các sàn TMĐT.
              </p>
            </div>

            <!-- Socials inside Brand Box -->
            <div class="flex items-center gap-3">
              <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-orange-100/60 dark:border-slate-700 text-slate-400 hover:text-shopee-orange hover:border-shopee-orange transition-all duration-300 hover:scale-110 active:scale-95">
                <UIcon name="i-lucide-facebook" class="h-5 w-5" />
              </a>
              <a href="#" class="flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-sm border border-orange-100/60 dark:border-slate-700 text-slate-400 hover:text-shopee-orange hover:border-shopee-orange transition-all duration-300 hover:scale-110 active:scale-95">
                <UIcon name="i-lucide-users" class="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <!-- BENTO BOX 2: Navigation (Span 3) -->
        <div class="md:col-span-6 lg:col-span-3 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 p-8 border border-slate-100 dark:border-slate-800/80 hover:border-orange-500/30 dark:hover:border-orange-500/30 transition-colors duration-500 flex flex-col justify-between">
          <div class="flex items-center gap-3 mb-6">
            <div class="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-200"></div>
            <span class="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none">Menu</span>
          </div>
          
          <div class="flex flex-col gap-4">
            <NuxtLink to="/hoan-tien" class="group flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-shopee-orange dark:hover:text-shopee-orange transition-all duration-300">
              <span class="group-hover:translate-x-1 transition-transform duration-300">Hoàn tiền</span>
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </NuxtLink>
            <div class="h-px w-full bg-slate-200/50 dark:bg-slate-800/50"></div>
            
            <NuxtLink to="/don-hang" class="group flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-shopee-orange dark:hover:text-shopee-orange transition-all duration-300">
              <span class="group-hover:translate-x-1 transition-transform duration-300">Đơn hàng</span>
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </NuxtLink>
            <div class="h-px w-full bg-slate-200/50 dark:bg-slate-800/50"></div>
            
            <NuxtLink to="/tai-chinh" class="group flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-shopee-orange dark:hover:text-shopee-orange transition-all duration-300">
              <span class="group-hover:translate-x-1 transition-transform duration-300">Tài chính</span>
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </NuxtLink>
            <div class="h-px w-full bg-slate-200/50 dark:bg-slate-800/50"></div>
            
            <NuxtLink to="/huong-dan" class="group flex items-center justify-between text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-shopee-orange dark:hover:text-shopee-orange transition-all duration-300">
              <span class="group-hover:translate-x-1 transition-transform duration-300">Hướng dẫn</span>
              <UIcon name="i-lucide-arrow-right" class="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
            </NuxtLink>
          </div>
        </div>

        <!-- BENTO BOX 3: Contact & Support Grid (Span 4) -->
        <div class="md:col-span-6 lg:col-span-4 flex flex-col gap-4">
          <!-- Small Box Top -->
          <div class="flex-1 rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 p-6 border border-slate-100 dark:border-slate-800/80 flex items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors duration-300 group cursor-pointer" onclick="window.location.href='mailto:support@saffi.vn'">
            <div class="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
              <UIcon name="i-lucide-mail" class="h-5 w-5" />
            </div>
            <div>
              <span class="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Hỗ trợ 24/7</span>
              <span class="block text-sm font-bold text-slate-800 dark:text-slate-200">support@saffi.vn</span>
            </div>
          </div>
          
          <!-- Small Box Bottom Grid -->
          <div class="grid grid-cols-2 gap-4 flex-1">
            <div class="rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 p-5 border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div class="text-emerald-500 mb-2">
                <UIcon name="i-lucide-clock" class="h-6 w-6" />
              </div>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-200">08:00 - 22:00</span>
              <span class="text-[10px] font-medium text-slate-500 mt-0.5">Hàng ngày</span>
            </div>
            
            <div class="rounded-[2rem] bg-slate-50 dark:bg-slate-900/40 p-5 border border-slate-100 dark:border-slate-800/80 flex flex-col items-center justify-center text-center hover:-translate-y-1 transition-transform duration-300">
              <div class="text-amber-500 mb-2">
                <UIcon name="i-lucide-zap" class="h-6 w-6" />
              </div>
              <span class="text-xs font-bold text-slate-800 dark:text-slate-200">&lt; 60 Phút</span>
              <span class="text-[10px] font-medium text-slate-500 mt-0.5">Rút tiền</span>
            </div>
          </div>
        </div>

      </div>

      <!-- BOTTOM PILL -->
      <div class="mt-5 rounded-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 select-none uppercase tracking-widest">
          &copy; 2026 Saffi Platform. All Rights Reserved.
        </p>
        <div class="flex items-center gap-6 text-[11px] font-bold text-slate-500 dark:text-slate-400">
          <a :href="`${mainSiteURL}/privacy-policy`" target="_blank" rel="noopener noreferrer" class="hover:text-shopee-orange dark:hover:text-shopee-orange transition-colors">Privacy Policy</a>
          <div class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <a :href="`${mainSiteURL}/terms-of-service`" target="_blank" rel="noopener noreferrer" class="hover:text-shopee-orange dark:hover:text-shopee-orange transition-colors">Terms of Service</a>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();
const mainSiteURL = config.public.mainSiteURL;
</script>
