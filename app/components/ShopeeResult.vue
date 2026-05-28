<template>
  <Teleport to="body">
    <transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div class="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md">
        <!-- Backdrop click closes modal -->
        <div @click="$emit('reset')" class="absolute inset-0 cursor-default"></div>

        <!-- Modal Content Box -->
        <div class="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 animate-fade-in-up z-10 scrollbar-container transition-all duration-300">
          <!-- Glowing header bar -->
          <div class="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-shopee-orange via-orange-500 to-yellow-500"></div>

          <!-- Close button -->
          <button
            @click="$emit('reset')"
            type="button"
            class="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors duration-200 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 shrink-0 cursor-pointer select-none"
            title="Đóng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <!-- PREMIUM PRODUCT DETAILS RESULT CARD -->
          <div v-if="productInfo" class="space-y-5 pt-2">
            <!-- Header title -->
            <div class="text-center mb-4 pr-6">
              <h3 class="text-lg font-black text-slate-850 dark:text-white tracking-tight">CHI TIẾT HOÀN TIỀN</h3>
            </div>

            <!-- Product Details area -->
            <div class="flex items-start gap-4">
              <!-- Product Image -->
              <div class="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 bg-white shadow-inner flex items-center justify-center p-1.5 transition-colors duration-400">
                <img :src="productInfo.imageUrl" :alt="productInfo.productName" class="max-w-full max-h-full object-contain" />
                <div v-if="productInfo.isXtra" class="absolute bottom-0 left-0 right-0 bg-shopee-orange text-white text-[9px] font-black text-center py-0.5 uppercase tracking-wider select-none">
                  Xtra
                </div>
              </div>

              <!-- Product info details -->
              <div class="flex-1 min-w-0 space-y-1.5 pt-0.5">
                <!-- Shop Badge and Name -->
                <div class="flex items-center gap-1.5">
                  <span class="inline-flex items-center gap-0.5 rounded bg-shopee-orange text-white px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider select-none">
                    SỘP-PE
                  </span>
                  <span class="text-xs text-slate-500 dark:text-slate-400 font-semibold truncate transition-colors duration-400">
                    {{ productInfo.shopName }}
                  </span>
                </div>

                <!-- Product Title -->
                <h3 class="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug transition-colors duration-400" :title="productInfo.productName">
                  {{ productInfo.productName }}
                </h3>
              </div>
            </div>

            <!-- Twin Info Cards (Partner Commission & Shopping Cashback Points) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <!-- Partner Commission Card -->
              <div class="flex items-center gap-3 rounded-2xl bg-orange-500/8 dark:bg-orange-500/5 border border-orange-500/12 dark:border-orange-500/8 p-4 transition-colors duration-400 shadow-sm">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-shopee-orange text-white shadow-md glow-orange">
                  <span class="font-black text-base">%</span>
                </div>
                <div>
                  <div class="text-[10px] sm:text-xs font-bold text-shopee-orange/80 dark:text-shopee-orange/90 uppercase tracking-wider">HOA HỒNG ĐỐI TÁC</div>
                  <div class="text-lg sm:text-xl font-extrabold text-shopee-orange mt-0.5 tracking-tight">
                    {{ formatPartnerCommission(productInfo.commission) }}
                  </div>
                </div>
              </div>

              <!-- Buying Points Card -->
              <div class="flex items-center gap-3 rounded-2xl bg-emerald-500/8 dark:bg-emerald-500/5 border border-emerald-500/12 dark:border-emerald-500/8 p-4 transition-colors duration-400 shadow-sm">
                <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <div>
                  <div class="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">SAFFI HOÀN TIỀN CHO BẠN</div>
                  <div class="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight">
                    Từ <span class="text-sm sm:text-base">{{ formatCashbackRange(minCashback) }}</span> đến <span class="text-sm sm:text-base">{{ formatCashbackRange(maxCashback) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Link Box with copy -->
            <div class="space-y-2">
              <label class="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider px-1 transition-colors duration-400">Link hoàn tiền:</label>
              <div class="flex items-center gap-2 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-2 pl-4 transition-colors duration-400">
                <input
                  type="text"
                  readonly
                  :value="link"
                  class="w-full bg-transparent border-none text-slate-800 dark:text-slate-200 font-semibold text-xs sm:text-sm focus:outline-none select-all transition-colors duration-400"
                  ref="linkInputProduct"
                />

                <div class="flex items-center gap-1.5 shrink-0 pr-1">
                  <!-- Copy button -->
                  <button
                    @click="handleCopy"
                    class="transition-premium flex h-10 px-4 items-center justify-center gap-2 rounded-xl text-xs font-bold shadow-md cursor-pointer select-none active:scale-95 transition-all duration-400"
                    :class="[
                      isCopied
                        ? 'bg-emerald-500 text-white border border-emerald-500 shadow-emerald-200 dark:shadow-none'
                        : 'bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700'
                    ]"
                  >
                    <svg v-if="isCopied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{{ isCopied ? 'Đã Copy!' : 'Copy' }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Main Action: OPEN TO BUY NOW -->
            <button
              type="button"
              @click="handleOpenAffiliate"
              class="w-full transition-premium flex items-center justify-center gap-2 rounded-2xl py-4 font-sans text-sm font-black text-white uppercase tracking-wider bg-shopee-orange hover:bg-shopee-orange-hover border border-shopee-orange active:scale-98 cursor-pointer select-none glow-orange-button animate-cta-pulse"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>MỞ ĐỂ MUA HÀNG NGAY</span>
            </button>

            <!-- Convert Another / Back link button -->
            <div class="flex items-center justify-between gap-4 pt-1">
              <button
                @click="$emit('reset')"
                class="transition-premium flex items-center justify-center gap-2 rounded-xl py-2.5 px-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-xs cursor-pointer select-none transition-colors duration-400"
                type="button"
              >
                Mua sản phẩm khác
              </button>

              <span class="text-[10px] font-semibold text-slate-400 dark:text-slate-500 text-right select-none leading-none max-w-[55%]">
                Hệ thống tự động phát hiện và tối ưu hóa hoa hồng tốt nhất cho bạn.
              </span>
            </div>
          </div>

          <!-- STANDARD / FALLBACK RESULT CARD -->
          <div v-else class="space-y-6 pt-2">
            <!-- Header / Icon -->
            <div class="flex items-center gap-4 pr-6">
              <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-inner transition-colors duration-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-2xs font-semibold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase tracking-wider transition-colors duration-400">
                  Thành công
                </span>
                <h3 class="text-lg font-bold text-slate-900 dark:text-white mt-1 transition-colors duration-400">Đã chuyển đổi thành công!</h3>
              </div>
            </div>

            <!-- Result Link Box -->
            <div class="space-y-2">
              <label class="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider px-1 transition-colors duration-400">Đường dẫn Affiliate của bạn:</label>
              <div class="flex items-center gap-2 rounded-2xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 p-2 pl-4 transition-colors duration-400">
                <input
                  type="text"
                  readonly
                  :value="link"
                  class="w-full bg-transparent border-none text-emerald-600 dark:text-emerald-400 font-semibold text-sm focus:outline-none select-all transition-colors duration-400"
                  ref="linkInputFallback"
                />

                <div class="flex items-center gap-1.5 shrink-0 pr-1">
                  <!-- Copy button -->
                  <button
                    @click="handleCopy"
                    class="transition-premium flex h-10 px-4 items-center justify-center gap-2 rounded-xl text-xs font-bold shadow-md cursor-pointer select-none active:scale-95 transition-colors duration-400"
                    :class="[
                      isCopied
                        ? 'bg-emerald-500 text-white border border-emerald-500'
                        : 'bg-shopee-orange hover:bg-shopee-orange-hover text-white border border-shopee-orange'
                    ]"
                  >
                    <svg v-if="isCopied" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 11-2-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>{{ isCopied ? 'Đã Copy!' : 'Copy' }}</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Action Panel -->
            <div class="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <!-- Open Link Button -->
              <button
                type="button"
                @click="handleOpenAffiliate"
                class="transition-premium w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-2xl py-3.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white font-bold text-sm cursor-pointer select-none transition-colors duration-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>Mở Link Trực Tiếp</span>
              </button>

              <!-- Convert Another Link Button -->
              <button
                @click="$emit('reset')"
                class="transition-premium w-full sm:w-1/2 flex items-center justify-center gap-2 rounded-2xl py-3.5 bg-slate-200 dark:bg-slate-900 hover:bg-slate-300 dark:hover:bg-slate-850 border border-slate-300 dark:border-slate-850 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white font-bold text-sm cursor-pointer select-none transition-colors duration-400"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18.2" />
                </svg>
                <span>Tiếp Tục Chuyển Đổi</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const props = defineProps({
  link: {
    type: String,
    required: true,
  },
  affiliateLink: {
    type: String,
    default: "",
  },
  productInfo: {
    type: Object,
    default: null,
  },
});

const minCashback = computed(() => {
  const rate = props.productInfo?.commission_min_rate !== undefined 
    ? props.productInfo.commission_min_rate 
    : 56;
  return (props.productInfo?.commission || 0) * (rate / 100);
});

const maxCashback = computed(() => {
  const rate = props.productInfo?.commission_max_rate !== undefined 
    ? props.productInfo.commission_max_rate 
    : 84;
  return (props.productInfo?.commission || 0) * (rate / 100);
});

defineEmits(["reset"]);

const isCopied = ref(false);
const linkInputProduct = ref(null);
const linkInputFallback = ref(null);

onMounted(() => {
  // Prevent page scroll when the modal is active
  document.body.style.overflow = "hidden";
});

onUnmounted(() => {
  // Restore page scroll when the modal is closed
  document.body.style.overflow = "";
});

const handleOpenAffiliate = () => {
  const targetUrl = props.affiliateLink || props.link;
  window.open(targetUrl, "_blank", "noopener,noreferrer");
};

const handleCopy = async () => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(props.link);
    } else {
      // Fallback method
      const activeInput = props.productInfo ? linkInputProduct.value : linkInputFallback.value;
      if (activeInput) {
        activeInput.select();
        document.execCommand("copy");
      }
    }
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy link:", err);
  }
};

// Formatting helpers for currency values matching user's spec
const formatPartnerCommission = (value) => {
  if (value === undefined || value === null) return "₫0";
  return "₫" + new Intl.NumberFormat("vi-VN").format(Math.round(value));
};

const formatCashbackRange = (value) => {
  if (value === undefined || value === null) return "0 ₫";
  return new Intl.NumberFormat("vi-VN").format(Math.round(value)) + " ₫";
};
</script>

<style scoped>
.text-2xs {
  font-size: 0.65rem;
}
.text-3xs {
  font-size: 0.6rem;
}

@keyframes custom-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 10px 25px -5px rgba(239, 83, 80, 0.45), 0 8px 10px -6px rgba(239, 83, 80, 0.45);
  }
  50% {
    transform: scale(1.025);
    box-shadow: 0 20px 35px -5px rgba(239, 83, 80, 0.65), 0 12px 16px -6px rgba(239, 83, 80, 0.65);
  }
}

.animate-cta-pulse {
  animation: custom-pulse 1.8s infinite ease-in-out;
}

/* Premium scrollbar styling for the modal content */
.scrollbar-container {
  scrollbar-width: thin;
}
.scrollbar-container::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-container::-webkit-scrollbar-track {
  background: transparent;
}
.scrollbar-container::-webkit-scrollbar-thumb {
  background: rgba(156, 163, 175, 0.3);
  border-radius: 9999px;
}
.scrollbar-container::-webkit-scrollbar-thumb:hover {
  background: rgba(156, 163, 175, 0.5);
}
</style>
