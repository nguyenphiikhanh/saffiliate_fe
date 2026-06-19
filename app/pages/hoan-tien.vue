<template>
  <div class="w-full animate-fade-in flex flex-col gap-6 pb-24 md:pb-6">
    <!-- Premium Guidelines & Instruction Card -->
    <UCard
      :ui="{
        body: 'p-6 md:p-8',
        ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
        background: 'bg-white dark:bg-slate-900/60',
        rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20'
      }"
    >
      <!-- Header banner (Toggle Button) -->
      <button
        @click="isImportantNotesOpen = !isImportantNotesOpen"
        class="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-amber-500/[0.03] dark:bg-amber-500/[0.05] border border-amber-500/10 hover:bg-amber-500/[0.06] transition-colors cursor-pointer group outline-none"
      >
        <div class="flex items-start gap-3.5">
          <div class="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shrink-0 select-none group-hover:scale-105 transition-transform">
            <UIcon name="i-heroicons-exclamation-triangle" class="h-5 w-5" />
          </div>
          <div>
            <h4 class="text-[13px] font-black uppercase tracking-widest text-slate-850 dark:text-slate-205 leading-tight">
              Lưu ý Quan trọng
            </h4>
            <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
              Đọc kỹ để đảm bảo nhận hoàn tiền mua sắm
            </p>
          </div>
        </div>
        <!-- Chevron & Text -->
        <div class="flex items-center gap-1.5 text-amber-500 shrink-0 ml-2">
          <span class="text-xs font-bold w-8 text-center select-none">
            {{ isImportantNotesOpen ? "Ẩn" : "Xem" }}
          </span>
          <div class="bg-amber-500/10 rounded-full p-1 group-hover:bg-amber-500/20 transition-colors">
            <UIcon
              name="i-heroicons-chevron-down"
              class="w-4 h-4 transition-transform duration-500"
              :class="{ 'rotate-180': isImportantNotesOpen }"
            />
          </div>
        </div>
      </button>

      <!-- Details Section (Smooth Expand/Collapse) -->
      <div
        class="grid transition-all duration-500 ease-in-out"
        :class="
          isImportantNotesOpen
            ? 'grid-rows-[1fr] opacity-100 mt-4'
            : 'grid-rows-[0fr] opacity-0 mt-0'
        "
      >
        <div class="overflow-hidden flex flex-col gap-6">
          <!-- Instruction List -->
          <div class="flex flex-col gap-4">
            <!-- Rule 1 -->
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
                1
              </div>
              <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Vui lòng <span class="font-bold text-slate-800 dark:text-slate-200">xóa các sản phẩm tương tự</span> có sẵn trong giỏ trước khi <span class="font-bold text-slate-800 dark:text-slate-200">mua hàng qua Saffi</span> để tránh lỗi ghi đè nguồn tracking.
              </p>
            </div>

            <!-- Rule 2 -->
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
                2
              </div>
              <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                <span class="font-black text-slate-800 dark:text-slate-200">Giao dịch liền mạch:</span> Hãy hoàn tất việc thanh toán <span class="font-bold text-slate-800 dark:text-slate-200">trong cùng một phiên</span> làm việc trên trình duyệt ngay sau khi nhấn link để cookie được lưu vết chính xác.
              </p>
            </div>

            <!-- Rule 3 -->
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
                3
              </div>
              <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                <span class="font-black text-slate-800 dark:text-slate-200">Ghi nhận tự động:</span> Trạng thái đơn hàng được <span class="font-bold text-slate-800 dark:text-slate-200">sàn TMĐT đối tác quyết định tự động</span>. Saffi hỗ trợ đối soát kỹ thuật và không thể trực tiếp can thiệp kết quả này.
              </p>
            </div>

            <!-- Rule 4 -->
            <div class="flex items-start gap-3">
              <div class="w-5 h-5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 font-extrabold text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-500/10 select-none">
                4
              </div>
              <p class="text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed font-semibold">
                Hãy thực hiện mua hàng với <span class="font-bold text-slate-800 dark:text-slate-200">tốc độ thao tác bình thường</span>. Mua quá nhanh có thể bị hệ thống bảo mật của sàn quét nhầm là <span class="font-bold text-slate-800 dark:text-slate-200">bot/spam</span> và từ chối hoàn tiền.
              </p>
            </div>
          </div>

          <!-- Quick Metrics Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
            <!-- Card 1 -->
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
              <div class="w-10 h-10 rounded-full bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <UIcon name="i-heroicons-bolt" class="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
                  Thời gian ghi nhận
                </div>
                <div class="text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span class="text-shopee-orange font-bold">Trong vòng 24h</span>
                </div>
              </div>
            </div>

            <!-- Card 2 -->
            <div class="flex items-center gap-4 p-4 rounded-2xl bg-slate-50/70 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 transition-all duration-300 hover:scale-[1.01] hover:-translate-y-0.5 group select-none">
              <div class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-505 shrink-0 group-hover:scale-105 transition-transform duration-300">
                <UIcon name="i-heroicons-credit-card" class="w-5 h-5" />
              </div>
              <div>
                <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-0.5">
                  Thời gian duyệt hoàn
                </div>
                <div class="text-sm font-medium text-slate-700 dark:text-slate-200">
                  <span class="text-emerald-550 dark:text-emerald-400 font-bold">7 - 14 ngày</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Premium Quick Step-by-Step Guide Wizard -->
    <UCard
      :ui="{
        body: 'p-6 md:p-8',
        ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
        background: 'bg-white dark:bg-slate-900/60',
        rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20'
      }"
    >
      <!-- Header banner (Toggle Button) -->
      <button
        @click="isQuickGuideOpen = !isQuickGuideOpen"
        class="w-full text-left flex items-center justify-between p-4 rounded-2xl bg-orange-500/[0.03] dark:bg-orange-500/[0.05] border border-orange-500/10 hover:bg-orange-500/[0.06] transition-colors cursor-pointer group outline-none"
      >
        <div class="flex items-start gap-3.5">
          <div class="p-1.5 rounded-lg bg-orange-500/10 text-shopee-orange shrink-0 select-none group-hover:scale-105 transition-transform">
            <UIcon name="i-heroicons-light-bulb" class="h-5 w-5" />
          </div>
          <div>
            <h4 class="text-[13px] font-black uppercase tracking-widest text-slate-850 dark:text-slate-205 leading-tight">
              Hướng Dẫn Nhanh
            </h4>
            <p class="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-1">
              Cách mua hàng qua Saffi & nhận hoàn tiền với vài thao tác đơn giản
            </p>
          </div>
        </div>
        <!-- Chevron & Text -->
        <div class="flex items-center gap-1.5 text-shopee-orange shrink-0 ml-2">
          <span class="text-xs font-bold w-8 text-center select-none">
            {{ isQuickGuideOpen ? "Ẩn" : "Xem" }}
          </span>
          <div class="bg-orange-500/10 rounded-full p-1 group-hover:bg-orange-500/20 transition-colors">
            <UIcon
              name="i-heroicons-chevron-down"
              class="w-4 h-4 transition-transform duration-500"
              :class="{ 'rotate-180': isQuickGuideOpen }"
            />
          </div>
        </div>
      </button>

      <!-- Wizard Details Section (Expand/Collapse) -->
      <div
        class="grid transition-all duration-500 ease-in-out"
        :class="
          isQuickGuideOpen
            ? 'grid-rows-[1fr] opacity-100 mt-4'
            : 'grid-rows-[0fr] opacity-0 mt-0'
        "
      >
        <div class="overflow-hidden flex flex-col gap-6">
          <!-- One-Card Wizard Layout -->
          <div class="w-full max-w-lg mx-auto p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 flex flex-col gap-4 relative overflow-hidden group transition-all duration-300">
            <!-- Glowing background glow -->
            <div class="absolute -right-8 -top-8 w-24 h-24 bg-orange-500/[0.04] dark:bg-orange-500/[0.08] rounded-full blur-2xl pointer-events-none"></div>

            <!-- 1. Step Image Frame -->
            <div class="w-full h-80 md:h-[400px] rounded-2xl bg-slate-100 dark:bg-slate-900/60 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 overflow-hidden border border-slate-200/50 dark:border-slate-800/70 select-none relative transition-all duration-300">
              <img
                v-if="steps[currentStep].image"
                :src="steps[currentStep].image"
                class="w-full h-full object-contain rounded-2xl transition-transform duration-500"
                :alt="steps[currentStep].title"
              />
              <div v-else class="flex flex-col items-center justify-center">
                <UIcon name="i-heroicons-photo" class="w-10 h-10 opacity-30 group-hover:scale-110 transition-transform duration-500" />
                <span class="text-[10px] font-black opacity-45 uppercase tracking-widest mt-2.5 select-none">
                  Ảnh minh họa Bước {{ currentStep + 1 }}
                </span>
              </div>
            </div>

            <!-- 2. Step Title & Description in Slide Vue Transition -->
            <transition name="slide-fade" mode="out-in">
              <div
                :key="currentStep"
                class="flex flex-col gap-3 min-h-[92px] sm:min-h-[80px]"
              >
                <div class="flex items-center justify-between">
                  <div class="w-9 h-9 rounded-xl bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
                    <UIcon :name="steps[currentStep].icon" class="w-5 h-5" />
                  </div>
                  <UBadge
                    size="xs"
                    variant="soft"
                    class="font-black uppercase tracking-wider px-2.5 py-1 rounded-full select-none"
                  >
                    Bước 0{{ currentStep + 1 }} / 0{{ steps.length }}
                  </UBadge>
                </div>

                <div>
                  <h5 class="text-sm font-extrabold text-slate-800 dark:text-slate-100 tracking-tight transition-colors">
                    {{ steps[currentStep].title }}
                  </h5>
                  <p
                    class="text-xs text-slate-550 dark:text-slate-400 leading-relaxed font-semibold mt-1 transition-colors"
                    v-html="steps[currentStep].desc"
                  ></p>
                </div>
              </div>
            </transition>

            <!-- 3. Navigation Controls -->
            <div class="flex items-center justify-between border-t border-slate-100 dark:border-slate-800/60 pt-3 mt-1">
              <!-- Dots Navigation Indicator -->
              <div class="flex items-center gap-1.5 select-none">
                <button
                  v-for="(step, index) in steps"
                  :key="index"
                  @click="currentStep = index"
                  class="w-2.5 h-1.5 rounded-full transition-all duration-300 outline-none cursor-pointer"
                  :class="
                    currentStep === index
                      ? 'w-5 bg-shopee-orange'
                      : 'bg-slate-300 dark:bg-slate-700 hover:bg-slate-400'
                  "
                  :title="`Đến bước ${index + 1}`"
                ></button>
              </div>

              <!-- Buttons Navigation -->
              <div class="flex items-center gap-2 select-none">
                <UButton
                  v-if="currentStep > 0"
                  icon="i-heroicons-chevron-left"
                  variant="soft"
                  color="neutral"
                  size="xs"
                  class="font-bold text-xs"
                  @click="currentStep--"
                >
                  Trước
                </UButton>

                <UButton
                  :icon="currentStep < steps.length - 1 ? 'i-heroicons-chevron-right' : 'i-heroicons-check'"
                  size="xs"
                  class="font-bold text-xs"
                  @click="
                    currentStep < steps.length - 1
                      ? currentStep++
                      : (isQuickGuideOpen = false)
                  "
                >
                  {{ currentStep < steps.length - 1 ? "Tiếp theo" : "Đã hiểu" }}
                </UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UCard>

    <!-- Link Converter Component -->
    <LinkConverter />
  </div>
</template>

<script setup>
import { ref } from "vue";

const isImportantNotesOpen = ref(false);
const isQuickGuideOpen = ref(false);
const currentStep = ref(0);

const steps = [
  {
    title: "Tìm sản phẩm & Chia sẻ",
    desc: "Mở ứng dụng Shopee hoặc TikTok, chọn sản phẩm cần mua và nhấn nút <span class='text-red-550 dark:text-red-400 font-extrabold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20'>Chia sẻ</span> (hình mũi tên).",
    image: "/step/1.jpg",
    icon: "i-heroicons-share"
  },
  {
    title: "Sao chép đường dẫn",
    desc: "Trong menu chia sẻ hiện ra, chọn nút <span class='text-red-550 dark:text-red-400 font-extrabold bg-red-500/10 px-1.5 py-0.5 rounded border border-red-500/20'>Sao chép đường dẫn</span>",
    image: "/step/2.jpg",
    icon: "i-heroicons-link"
  },
  {
    title: "Dán link vào Saffi",
    desc: "Trở lại ứng dụng Saffi, <span class='text-shopee-orange font-extrabold'>Dán link</span> vừa sao chép vào ô nhập bên dưới, nhấn vào nút <span class='text-shopee-orange font-extrabold'>Hoàn Tiền</span> để xem thông tin hoàn tiền.",
    image: "/step/3.jpg",
    icon: "i-heroicons-clipboard"
  },
  {
    title: "Mua sắm & Nhận hoàn tiền",
    desc: "Nhấn nút đây để mở ứng dụng sàn và mua sắm như bình thường. Tiền hoàn lại sẽ <span class='text-shopee-orange font-extrabold'>tự động được tích lũy vào tài khoản Saffi</span> của bạn!",
    image: "/step/4.jpg",
    icon: "i-heroicons-shopping-bag"
  },
];

useSeoMeta({
  title: "Quy đổi hoàn tiền - Saffi",
  ogTitle: "Quy đổi hoàn tiền - Saffi",
  description:
    "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogDescription:
    "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar-none {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* Slide-fade transition for wizard step transitions */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from {
  transform: translateX(16px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-16px);
  opacity: 0;
}
</style>
