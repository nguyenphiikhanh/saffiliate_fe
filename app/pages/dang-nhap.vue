<template>
  <div
    class="relative min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 overflow-x-hidden transition-colors duration-400 bg-[#F8FAFC] dark:bg-[#090D16]"
  >
    <!-- Dotted grid background pattern -->
    <div class="absolute inset-0 dotted-grid pointer-events-none z-0"></div>

    <!-- Radial decorative glow (Slate / Orange) -->
    <div
      class="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-shopee-orange/5 dark:bg-shopee-orange/8 blur-[120px] pointer-events-none z-0"
    ></div>
    <div
      class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-amber-500/5 dark:bg-amber-500/8 blur-[120px] pointer-events-none z-0"
    ></div>

    <!-- Main Container -->
    <div
      class="w-full max-w-lg flex flex-col items-center z-10 relative animate-fade-in-up"
    >
      <!-- Logo and Branding -->
      <div class="flex flex-col items-center text-center mb-8">
        <!-- Brand Logo Icon -->
        <div
          class="flex h-28 w-28 items-center justify-center shrink-0 mb-4 transition-transform duration-500 hover:rotate-12 select-none"
        >
          <img
            src="/saficon.png"
            class="h-28 w-28 object-contain rounded-3xl shadow-lg"
            alt="Saffi Logo"
          />
        </div>

        <!-- Dynamic Slogan -->
        <h2
          class="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-slate-200 mt-6 tracking-tight"
        >
          Mua sắm,
          <span
            class="bg-gradient-to-r from-shopee-orange to-amber-500 bg-clip-text text-transparent"
            >Hoàn Tiền Thật</span
          >
        </h2>
        <p
          class="text-sm md:text-base font-medium text-slate-500 dark:text-slate-400 mt-2"
        >
          Tiết kiệm thông minh với mỗi đơn hàng mua sắm online
        </p>
      </div>

      <!-- Core Value Badges (Horizontal marquee scrolling left-to-right) -->
      <div class="w-full max-w-md overflow-hidden mb-8 relative">
        <!-- Fade gradient overlays -->
        <div
          class="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F8FAFC] dark:from-[#090D16] to-transparent z-10 pointer-events-none transition-colors duration-400"
        ></div>
        <div
          class="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F8FAFC] dark:from-[#090D16] to-transparent z-10 pointer-events-none transition-colors duration-400"
        ></div>

        <div class="flex overflow-hidden select-none py-1 group">
          <!-- Marquee Track 1 -->
          <div class="flex gap-3 shrink-0 pr-3 animate-marquee-left">
            <!-- Badge 1 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Hoàn tiền cực nhanh</span>
            </div>

            <!-- Badge 2 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-emerald-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Mua sắm tiết kiệm</span>
            </div>

            <!-- Badge 3 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Bảo mật tuyệt đối</span>
            </div>

            <!-- Badge 4 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Tích điểm nhanh</span>
            </div>
          </div>

          <!-- Marquee Track 2 (Duplicated for seamless looping) -->
          <div
            class="flex gap-3 shrink-0 pr-3 animate-marquee-left"
            aria-hidden="true"
          >
            <!-- Badge 1 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-orange-500"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Hoàn tiền cực nhanh</span>
            </div>

            <!-- Badge 2 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>Mua sắm tiết kiệm</span>
            </div>

            <!-- Badge 3 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-emerald-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
              <span>Bảo mật tuyệt đối</span>
            </div>

            <!-- Badge 4 -->
            <div
              class="flex items-center gap-1.5 shrink-0 px-3.5 py-2 rounded-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-sm font-semibold text-slate-700 dark:text-slate-300 shadow-sm"
            >
              <svg
                class="w-4 h-4 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              <span>Tích điểm nhanh</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Login Card -->
      <UCard
        class="w-full max-w-md shadow-xl bg-white/90 dark:bg-slate-900/90 transition-all duration-400"
        :ui="{
          body: 'p-6 md:p-8',
          background: 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-md',
          ring: 'ring-1 ring-slate-200/60 dark:ring-slate-800/80',
          rounded: 'rounded-3xl'
        }"
      >
        <!-- Error Alert (Professional UI) -->
        <UAlert
          v-if="errorMessage"
          title="Đăng nhập thất bại"
          :description="errorMessage"
          color="red"
          variant="subtle"
          icon="i-lucide-alert-triangle"
          class="mb-5 rounded-2xl"
          :close="{ onClick: () => errorMessage = '' }"
        />

        <!-- Google Login Action Button -->
        <div class="mb-6">
          <UButton
            @click="handleGoogleLogin"
            :disabled="isLoggingIn"
            size="xl"
            block
            color="neutral"
            variant="outline"
            class="py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-shopee-orange dark:hover:border-shopee-orange"
            :loading="isLoggingIn"
          >
            <template #leading>
              <!-- Google Logo SVG -->
              <svg class="h-6 w-6 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
            </template>
            <span class="font-sans text-base font-semibold text-slate-700 dark:text-slate-200">
              Tiếp tục với Google
            </span>
            <template #trailing>
              <UIcon name="i-lucide-arrow-right" class="h-4.5 w-4.5 text-slate-400 group-hover:text-shopee-orange group-hover:translate-x-1 transition-transform" />
            </template>
          </UButton>
        </div>

        <!-- Google Recommendation Notice -->
        <p
          class="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5 mb-6 font-medium"
        >
          <UIcon name="i-lucide-lock" class="h-3.5 w-3.5 text-slate-400/80 dark:text-slate-500/80 shrink-0" />
          <span>Google là phương thức đăng nhập chính và được khuyến nghị.</span>
        </p>

        <!-- Terms and Conditions Agreement -->
        <p
          class="text-xs text-slate-400 dark:text-slate-500 text-center leading-relaxed border-b border-slate-200/50 dark:border-slate-800/50 pb-6 mb-6"
        >
          Bằng việc tiếp tục, bạn đồng ý với
          <a
            href="#"
            class="text-shopee-orange dark:text-orange-400 font-semibold hover:underline"
            >Điều khoản & Chính sách</a
          >
          của chúng tôi.
        </p>

        <!-- Social Connect Section -->
        <div class="flex flex-col items-center mb-6">
          <span
            class="text-2xs uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500 mb-4 bg-white dark:bg-[#1E293B] px-3 z-10"
          >
            Kết nối với chúng tôi
          </span>
          <div class="flex items-center justify-center gap-4">
            
            <!-- Zalo Group -->
            <UButton
              :to="config.public.zaloGroup || '#'"
              target="_blank"
              size="lg"
              color="primary"
              variant="soft"
              class="h-11 w-11 rounded-2xl flex items-center justify-center p-0"
              title="Nhóm Zalo hỗ trợ"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5.5 w-5.5">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                <text x="12" y="14" fill="currentColor" stroke="none" font-size="6" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-weight="900" text-anchor="middle">zalo</text>
              </svg>
            </UButton>

            <!-- Email Support -->
            <UButton
              to="mailto:support@saffi.vn"
              size="lg"
              color="red"
              variant="soft"
              class="h-11 w-11 rounded-2xl flex items-center justify-center p-0"
              title="Email Hỗ trợ"
              icon="i-lucide-mail"
            />

          </div>
        </div>
      </UCard>
    </div>
  </div>

  <!-- In-App Browser Blocker Overlay -->
  <Transition
    enter-active-class="transition duration-400 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-300 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="webViewInfo.isInApp"
      class="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-2xl overflow-y-auto"
    >
      <!-- Radial dynamic background glow -->
      <div
        class="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-shopee-orange/20 blur-[100px] pointer-events-none"
      ></div>
      <div
        class="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[350px] h-[350px] rounded-full bg-amber-500/20 blur-[100px] pointer-events-none"
      ></div>

      <div
        class="w-full max-w-md rounded-3xl p-6 md:p-8 bg-slate-900/90 border border-slate-800 shadow-2xl relative z-10 animate-fade-in-up text-center flex flex-col items-center"
      >
        <!-- Alert Danger Icon -->
        <div
          class="h-16 w-16 flex items-center justify-center rounded-2xl bg-gradient-to-br from-shopee-orange to-amber-500 shadow-lg shadow-shopee-orange/20 mb-6 animate-pulse-slow"
        >
          <UIcon name="i-lucide-alert-triangle" class="h-9 w-9 text-white" />
        </div>

        <h3
          class="text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight"
        >
          Yêu cầu mở bằng trình duyệt ngoài
        </h3>
        <p
          class="text-xs font-semibold text-shopee-orange uppercase tracking-wider mt-2 bg-shopee-orange/10 px-3 py-1 rounded-full"
        >
          Đang mở bằng WebView {{ webViewInfo.platform }}
        </p>

        <p class="text-sm text-slate-300 mt-4 leading-relaxed">
          Để đảm bảo tính
          <strong class="text-white">bảo mật tuyệt đối</strong> của tài khoản và
          tránh lỗi chặn liên kết từ Google, vui lòng đăng nhập trực tiếp trên
          trình duyệt Chrome hoặc Safari của thiết bị.
        </p>

        <!-- Step-by-Step Instructions card -->
        <div
          class="w-full mt-6 p-5 rounded-2xl bg-slate-950/50 border border-slate-800 text-left"
        >
          <h4
            class="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-3"
          >
            Hướng dẫn mở nhanh:
          </h4>

          <!-- Platform Zalo -->
          <ul
            v-if="webViewInfo.platform === 'Zalo'"
            class="space-y-3.5 text-sm text-slate-300 font-medium"
          >
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >1</span
              >
              <span
                >Bấm vào biểu tượng menu
                <strong class="text-white">Ba chấm &bull;&bull;&bull;</strong> ở
                góc trên bên phải.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >2</span
              >
              <span
                >Chọn mục
                <strong class="text-white">Mở bằng trình duyệt</strong> để đăng
                nhập ngay.</span
              >
            </li>
          </ul>

          <!-- Platform Facebook or Messenger -->
          <ul
            v-else-if="
              webViewInfo.platform === 'Facebook' ||
              webViewInfo.platform === 'Messenger'
            "
            class="space-y-3.5 text-sm text-slate-300 font-medium"
          >
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >1</span
              >
              <span
                >Bấm vào biểu tượng menu
                <strong class="text-white">Ba chấm &bull;&bull;&bull;</strong> ở
                góc trên bên phải.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >2</span
              >
              <span
                >Chọn
                <strong class="text-white">Mở bằng trình duyệt ngoài</strong>
                hoặc
                <strong class="text-white">Mở bằng Safari/Chrome</strong>.</span
              >
            </li>
          </ul>

          <!-- Platform Telegram -->
          <ul
            v-else-if="webViewInfo.platform === 'Telegram'"
            class="space-y-3.5 text-sm text-slate-300 font-medium"
          >
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >1</span
              >
              <span
                >Nhấp biểu tượng menu
                <strong class="text-white">Ba chấm &bull;&bull;&bull;</strong> ở
                góc trên màn hình.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >2</span
              >
              <span
                >Chọn
                <strong class="text-white">Mở bằng Safari/Chrome</strong> hoặc
                nhấp biểu tượng trình duyệt.</span
              >
            </li>
          </ul>

          <!-- Platform TikTok -->
          <ul
            v-else-if="webViewInfo.platform === 'TikTok'"
            class="space-y-3.5 text-sm text-slate-300 font-medium"
          >
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >1</span
              >
              <span
                >Nhấn nút menu chia sẻ hoặc
                <strong class="text-white">Ba chấm &bull;&bull;&bull;</strong> ở
                thanh tùy chọn.</span
              >
            </li>
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >2</span
              >
              <span
                >Chọn
                <strong class="text-white">Mở bằng trình duyệt</strong>.</span
              >
            </li>
          </ul>

          <!-- Fallback General instruction -->
          <ul v-else class="space-y-3.5 text-sm text-slate-300 font-medium">
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >1</span
              >
              <span>Chọn biểu tượng tùy chọn/menu trên ứng dụng của bạn.</span>
            </li>
            <li class="flex items-start gap-2.5">
              <span
                class="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-shopee-orange/20 text-shopee-orange text-xs font-bold"
                >2</span
              >
              <span
                >Tìm và nhấp vào mục
                <strong class="text-white">Mở bằng trình duyệt ngoài</strong
                >.</span
              >
            </li>
          </ul>
        </div>

        <!-- Actions Area -->
        <div class="w-full mt-6 flex flex-col gap-3">
          <!-- Android Dynamic open chrome action -->
          <UButton
            v-if="webViewInfo.isAndroid"
            @click="redirectToSystemBrowser"
            size="xl"
            block
            class="py-4 rounded-2xl bg-gradient-to-r from-shopee-orange to-amber-500 text-white font-bold text-base hover:shadow-lg hover:shadow-shopee-orange/25 border-0"
            icon="i-lucide-external-link"
          >
            Mở trình duyệt mặc định
          </UButton>

          <!-- IOS Dynamic Copy Link action -->
          <UButton
            @click="copyLink"
            size="xl"
            block
            color="neutral"
            variant="soft"
            class="py-4 rounded-2xl font-bold text-base"
            :icon="isCopied ? 'i-lucide-check' : 'i-lucide-copy'"
          >
            {{ isCopied ? "Đã sao chép liên kết!" : "Sao chép liên kết" }}
          </UButton>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCodeClient } from "vue3-google-signin";

// Disable default layout (Nuxt 4 property)
definePageMeta({
  layout: false,
  alias: ["/login"],
});

// SEO Metadata for the login page
useSeoMeta({
  title: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  ogTitle: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  description:
    "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
  ogDescription:
    "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
  twitterCard: "summary",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { login, fetchUser } = useAuth();
const errorMessage = ref("");

// Reactive state for In-App WebView detection
const webViewInfo = ref({
  isInApp: false,
  isAndroid: false,
  isiOS: false,
  platform: "",
});

const isCopied = ref(false);

// Copy link helper for iOS users or fallback
const copyLink = async () => {
  if (typeof window === "undefined") return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    // Fallback copy method
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (fallbackErr) {
      console.error("Fallback copy failed: ", fallbackErr);
    }
    document.body.removeChild(textArea);
  }
};

// Auto-redirection helper for Android Chrome
const redirectToSystemBrowser = () => {
  if (typeof window !== "undefined") {
    const currentUrl = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `intent://${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
  }
};

onMounted(async () => {
  // Detect if opened inside an In-App Browser (WebView)
  if (typeof window !== "undefined" && window.navigator) {
    const ua = navigator.userAgent || navigator.vendor || window.opera;

    const isZalo = ua.indexOf("Zalo") > -1;
    const isFacebook = ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
    const isMessenger =
      ua.indexOf("Messenger") > -1 ||
      (isFacebook && ua.indexOf("Messenger") > -1);
    const isInstagram = ua.indexOf("Instagram") > -1;
    const isTikTok = ua.indexOf("TikTok") > -1;
    const isTelegram = ua.indexOf("Telegram") > -1;

    const isInApp =
      isZalo ||
      isFacebook ||
      isMessenger ||
      isInstagram ||
      isTikTok ||
      isTelegram;

    webViewInfo.value = {
      isInApp,
      isAndroid: /Android/i.test(ua),
      isiOS: /iPhone|iPad|iPod/i.test(ua),
      platform: isZalo
        ? "Zalo"
        : isMessenger
        ? "Messenger"
        : isFacebook
        ? "Facebook"
        : isInstagram
        ? "Instagram"
        : isTikTok
        ? "TikTok"
        : isTelegram
        ? "Telegram"
        : "In-App Browser",
    };

    // Auto redirect Android users straight to external Chrome browser
    if (isInApp && webViewInfo.value.isAndroid) {
      redirectToSystemBrowser();
    }
  }

  // Check if we got an authorization code from Google redirect callback
  const id_token = route.query.id_token;
  if (id_token) {
    errorMessage.value = "";
    isLoggingIn.value = true;
    try {
      const { api } = useAppFetch();
      const res = await api.post(`/auth/google`, {
        body: { id_token: id_token },
      });

      if (res && res.data && res.data.token) {
        const sanctumToken = res.data.token;
        const authUser = res.data.user;

        // Lưu thông tin xác thực vào Cookie & State
        login(sanctumToken, authUser);

        // Đồng bộ dữ liệu mới nhất
        await fetchUser(sanctumToken);

        // Xóa id_token khỏi query URL và chuyển hướng về trang chủ
        router.replace({ query: { ...route.query, id_token: undefined } });
        router.push("/");
      } else {
        throw new Error("Không thể trích xuất token đăng nhập từ hệ thống.");
      }
    } catch (error) {
      console.error("Lỗi xác thực Google:", error);
      errorMessage.value = getFriendlyErrorMessage(
        error,
        "Xác thực với tài khoản Google thất bại. Vui lòng thử lại."
      );
      isLoggingIn.value = false;
      router.replace({ query: { ...route.query, id_token: undefined } });
    }
  }

  // Check for auth errors passed via callback URL params
  if (route.query.error) {
    if (
      route.query.error === "OAuthCallbackError" ||
      route.query.error === "OAuthError"
    ) {
      errorMessage.value =
        "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
    } else {
      errorMessage.value =
        "Có lỗi xảy ra trong quá trình xác thực đăng nhập. Vui lòng thử lại.";
    }

    // Xóa tham số error khỏi URL để tránh hiển thị lại khi F5 (làm mới trang)
    router.replace({ query: { ...route.query, error: undefined } });
  }
});

const isLoggingIn = ref(false);

// Google One-Tap integration
useOneTap({
  use_fedcm: true,
  onSuccess: async (response) => {
    if (response.credential) {
      await handleLoginWithToken(response.credential);
    }
  },
  onError: (error) => {
    console.error("Google One Tap error:", error);
  },
});

const handleLoginWithToken = async (credential) => {
  errorMessage.value = "";
  isLoggingIn.value = true;

  try {
    const { api } = useAppFetch();
    const res = await api.post(`/auth/google`, {
      id_token: credential,
    });

    if (res && res.data && res.data.token) {
      const sanctumToken = res.data.token;
      const authUser = res.data.user;

      // Lưu thông tin xác thực vào Cookie & State
      login(sanctumToken, authUser);

      // Đồng bộ dữ liệu mới nhất
      await fetchUser(sanctumToken);

      // Chuyển hướng về trang chủ
      router.push("/");
    } else {
      throw new Error("Không thể trích xuất token đăng nhập từ hệ thống.");
    }
  } catch (error) {
    console.error("Lỗi xác thực Google:", error);
    errorMessage.value = getFriendlyErrorMessage(
      error,
      "Xác thực với tài khoản Google thất bại. Vui lòng thử lại."
    );
    isLoggingIn.value = false;
  }
};

const { isReady, login: triggerGoogleLogin } = useCodeClient({
  onSuccess: async (response) => {
    errorMessage.value = "";
    isLoggingIn.value = true;
    try {
      const { api } = useAppFetch();
      const res = await api.post(`/auth/google`, {
        code: response.code,
      });

      if (res && res.data && res.data.token) {
        const sanctumToken = res.data.token;
        const authUser = res.data.user;

        // Lưu thông tin xác thực vào Cookie & State
        login(sanctumToken, authUser);

        // Đồng bộ dữ liệu mới nhất
        await fetchUser(sanctumToken);

        // Chuyển hướng về trang chủ
        router.push("/");
      } else {
        throw new Error("Không thể trích xuất token đăng nhập từ hệ thống.");
      }
    } catch (error) {
      console.error("Lỗi xác thực Google:", error);
      errorMessage.value = getFriendlyErrorMessage(
        error,
        "Xác thực với tài khoản Google thất bại. Vui lòng thử lại."
      );
      isLoggingIn.value = false;
    }
  },
  onError: (errorResponse) => {
    console.error("Lỗi Google Sign-In:", errorResponse);
    errorMessage.value =
      "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
    isLoggingIn.value = false;
  },
});

// Google login redirect trigger
const handleGoogleLogin = () => {
  if (webViewInfo.value.isInApp) {
    errorMessage.value =
      "Bạn đang sử dụng trình duyệt in-app. Vui lòng nhấn nút mở trình duyệt ngoài để đăng nhập an toàn.";
    return;
  }

  if (isLoggingIn.value || !isReady.value) return;
  errorMessage.value = "";

  triggerGoogleLogin();
};
</script>

<style scoped>
/* Hidden scrollbar styling for badges slider */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
.scrollbar-none {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Custom premium transitions */
.transition-premium {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

/* Custom grid dots using CSS background variables */
.dotted-grid {
  background-image: radial-gradient(
    rgba(148, 163, 184, 0.12) 1.5px,
    transparent 1.5px
  );
  background-size: 24px 24px;
  mask-image: radial-gradient(
    ellipse 70% 70% at 50% 50%,
    black 60%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 70% 70% at 50% 50%,
    black 60%,
    transparent 100%
  );
}

.dark .dotted-grid {
  background-image: radial-gradient(
    rgba(71, 85, 105, 0.22) 1.5px,
    transparent 1.5px
  );
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

.text-2xs {
  font-size: 0.78rem;
}

.text-3xs {
  font-size: 0.68rem;
}

.animate-marquee-left {
  animation: scroll-left 12s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.group:hover .animate-marquee-left {
  animation-play-state: paused;
}
</style>
