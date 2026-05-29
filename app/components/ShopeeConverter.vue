<template>
  <div class="w-full animate-fade-in-up">
    <!-- Main Converter Card -->
    <div
      class="glass-panel rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500"
      :class="
        currentType === AFFILIATE_TYPES.SHOPEE ? 'glow-orange' : 'glow-tiktok'
      "
    >
      <!-- Premium Creative Brand Selection Grid -->
      <div class="mb-8 select-none">
        <div class="flex items-center gap-2 mb-4">
          <h3
            class="text-xs font-black text-slate-700 dark:text-slate-350 uppercase tracking-widest"
          >
            Chọn Kênh Quy Đổi
          </h3>
        </div>

        <div class="grid grid-cols-2 gap-4 max-w-md mx-auto">
          <!-- Shopee Card -->
          <button
            @click="selectType(AFFILIATE_TYPES.SHOPEE)"
            class="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer outline-none relative overflow-hidden group active:scale-[0.98] w-full"
            :class="[
              currentType === AFFILIATE_TYPES.SHOPEE
                ? 'bg-orange-500/[0.04] dark:bg-orange-500/[0.08] border-shopee-orange shadow-lg shadow-orange-500/[0.04] scale-[1.02]'
                : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700',
            ]"
          >
            <!-- Decorative gradient blur -->
            <div
              v-if="currentType === AFFILIATE_TYPES.SHOPEE"
              class="absolute -right-8 -bottom-8 w-20 h-20 bg-shopee-orange/5 dark:bg-shopee-orange/10 rounded-full blur-xl pointer-events-none"
            ></div>

            <!-- Brand Logo Frame -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
              :class="[
                currentType === AFFILIATE_TYPES.SHOPEE
                  ? 'bg-shopee-orange text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:scale-105',
              ]"
            >
              <!-- Official Shopee Icon -->
              <svg viewBox="0 0 24 24" class="h-5.5 w-5.5" fill="currentColor">
                <path
                  d="M19.124 5.922h-3.415a4.296 4.296 0 0 0-7.418 0H4.876A1.88 1.88 0 0 0 3 7.802v12.316C3 21.157 3.842 22 4.876 22h14.248C20.158 22 21 21.157 21 20.118V7.802a1.88 1.88 0 0 0-1.876-1.88zM12 3.766a2.417 2.417 0 0 1 2.414 2.156h-4.828A2.417 2.417 0 0 1 12 3.766zm4.843 8.358c-.563.856-1.524 1.425-2.613 1.55a4.93 4.93 0 0 1-1.343.036c-.958-.163-1.785-.688-2.3-1.464-.323-.487-.492-1.077-.492-1.7v-2.09c0-.422.342-.764.764-.764h.024c.421 0 .763.342.763.764v2.09c0 .762.392 1.4 1.054 1.708.355.166.757.228 1.15.176.452-.06.848-.28 1.12-.622.378-.475.578-1.08.578-1.74v-1.612c0-.422.342-.764.764-.764h.024c.421 0 .763.342.763.764v1.612c0 .903-.238 1.71-.633 2.31z"
                />
              </svg>
            </div>

            <!-- Brand Meta -->
            <div>
              <div
                class="text-[9px] font-black tracking-wider uppercase transition-colors"
                :class="
                  currentType === AFFILIATE_TYPES.SHOPEE
                    ? 'text-shopee-orange'
                    : 'text-slate-400'
                "
              >
                Hoàn tiền
              </div>
              <div
                class="text-sm sm:text-base font-extrabold tracking-tight mt-0.5"
                :class="
                  currentType === AFFILIATE_TYPES.SHOPEE
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400'
                "
              >
                Shopee
              </div>
            </div>
          </button>

          <!-- TikTok Card -->
          <button
            @click="selectType(AFFILIATE_TYPES.TIKTOK)"
            class="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer outline-none relative overflow-hidden group active:scale-[0.98] w-full"
            :class="[
              currentType === AFFILIATE_TYPES.TIKTOK
                ? 'bg-slate-950/[0.02] dark:bg-cyan-500/[0.08] border-slate-950 dark:border-cyan-500 shadow-lg shadow-slate-950/[0.04] dark:shadow-cyan-500/[0.04] scale-[1.02]'
                : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700',
            ]"
          >
            <!-- Decorative gradient blur -->
            <div
              v-if="currentType === AFFILIATE_TYPES.TIKTOK"
              class="absolute -right-8 -bottom-8 w-20 h-20 bg-cyan-500/5 dark:bg-cyan-500/10 rounded-full blur-xl pointer-events-none"
            ></div>

            <!-- Brand Logo Frame -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0"
              :class="[
                currentType === AFFILIATE_TYPES.TIKTOK
                  ? 'bg-slate-950 text-white dark:bg-slate-850 dark:text-cyan-400'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-400 group-hover:scale-105',
              ]"
            >
              <!-- Official TikTok Icon -->
              <svg viewBox="0 0 24 24" class="h-5.5 w-5.5" fill="currentColor">
                <path
                  d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.52-4.09-1.33a8.16 8.16 0 0 1-2.22-2.14v7.41c.07 2.11-.84 4.31-2.54 5.54-1.76 1.34-4.22 1.73-6.26 1.07-2.45-.76-4.39-2.9-4.75-5.46-.46-3.08 1.16-6.38 4.09-7.46 1.25-.47 2.6-.52 3.89-.2v4.09c-1-.26-2.1-.2-3 .34a3.84 3.84 0 0 0-2 3.25c-.09 1.64 1 3.26 2.6 3.63 1.48.36 3.2-.23 3.84-1.61.27-.57.34-1.22.32-1.85V.02z"
                />
              </svg>
            </div>

            <!-- Brand Meta -->
            <div>
              <div
                class="text-[9px] font-black tracking-wider uppercase transition-colors"
                :class="
                  currentType === AFFILIATE_TYPES.TIKTOK
                    ? 'text-slate-950 dark:text-cyan-400'
                    : 'text-slate-400'
                "
              >
                Hoàn tiền
              </div>
              <div
                class="text-sm sm:text-base font-extrabold tracking-tight mt-0.5"
                :class="
                  currentType === AFFILIATE_TYPES.TIKTOK
                    ? 'text-slate-950 dark:text-white'
                    : 'text-slate-600 dark:text-slate-400'
                "
              >
                TikTok
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Friendly Mascot Section -->
      <div class="flex justify-center mb-4 select-none">
        <div class="relative group">
          <!-- Soft breathing background glow -->
          <div
            class="absolute inset-0 bg-amber-500/10 rounded-full blur-xl scale-95 group-hover:scale-110 transition-all duration-700 animate-pulse"
          ></div>
          <!-- Cute Bee Mascot Image -->
          <img
            src="/saffi_gold.png"
            alt="Saffi Bee Mascot"
            class="h-16 w-16 sm:h-20 sm:w-20 object-contain relative z-10 transition-all duration-500 hover:scale-110 hover:-rotate-6 cursor-pointer animate-float"
          />
        </div>
      </div>

      <!-- Title Area inside Card -->
      <div class="text-center mb-8">
        <h2
          class="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-400"
        >
          Chuyển Đổi và Xem Thông Tin Hoàn Tiền
        </h2>
        <p
          class="text-slate-600 dark:text-slate-400 text-sm mt-2 font-medium transition-colors duration-400"
        >
          Dán link sản phẩm
          <span class="font-bold">{{
            currentType === AFFILIATE_TYPES.SHOPEE ? "Shopee" : "TikTok"
          }}</span>
          của bạn vào bên dưới để mua sắm và nhận hoàn tiền.
        </p>
      </div>

      <!-- Input Form -->
      <div class="space-y-5">
        <div class="relative">
          <!-- Input Field -->
          <input
            ref="urlInput"
            v-model="rawUrl"
            type="text"
            :placeholder="
              currentType === AFFILIATE_TYPES.SHOPEE
                ? 'Dán link Shopee vào đây... (Ví dụ: https://shopee.vn/product/...)'
                : 'Dán link TikTok vào đây... (Ví dụ: https://vt.tiktok.com/...)'
            "
            class="w-full bg-white dark:bg-slate-950/85 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white rounded-2xl py-4 pl-12 pr-12 text-sm font-medium transition-all duration-300 input-focus-glow"
            :class="{
              'border-shopee-orange/50':
                isValidating &&
                isUrlValid &&
                currentType === AFFILIATE_TYPES.SHOPEE,
              'border-cyan-500/50':
                isValidating &&
                isUrlValid &&
                currentType === AFFILIATE_TYPES.TIKTOK,
              'border-yellow-600/50':
                isValidating && !isUrlValid && rawUrl.length > 0,
            }"
            @input="checkUrlInput"
            @keyup.enter="handleConvert"
            :disabled="isLoading"
          />

          <!-- Input Left Icon (Link SVG) -->
          <span
            class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </span>

          <!-- Clear Button -->
          <button
            @click="handleClear"
            v-if="rawUrl"
            class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-white transition-colors duration-200"
            :disabled="isLoading"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <!-- Inline Validation Warning -->
        <transition name="slide-fade">
          <div
            v-if="isValidating && !isUrlValid && rawUrl.length > 0"
            class="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 text-xs font-semibold px-2"
          >
            <!-- Warning Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span
              >Không nhận dạng được định dạng link. Vui lòng kiểm tra lại.</span
            >
          </div>
        </transition>

        <!-- Convert Button -->
        <button
          @click="handleConvert"
          :disabled="isLoading || !rawUrl"
          class="w-full transition-premium flex items-center justify-center gap-2 rounded-2xl py-4 font-sans text-sm font-bold uppercase tracking-wider select-none border"
          :class="[
            isLoading || !rawUrl
              ? 'bg-slate-100 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700/60 text-slate-500 dark:text-slate-400 cursor-not-allowed shadow-none'
              : currentType === AFFILIATE_TYPES.SHOPEE
              ? 'bg-shopee-orange hover:bg-shopee-orange-hover border-shopee-orange text-white active:scale-98 cursor-pointer glow-orange-button'
              : 'bg-slate-900 hover:bg-slate-950 dark:bg-slate-850 dark:hover:bg-slate-800 border-slate-900 dark:border-slate-850 text-white hover:text-cyan-400 dark:hover:text-cyan-400 active:scale-98 cursor-pointer glow-tiktok-button',
          ]"
        >
          <!-- Loading Spinner -->
          <span
            v-if="isLoading"
            class="animate-spin h-5 w-5 border-2 border-white/20 border-t-white rounded-full"
          ></span>

          <!-- Normal Icon -->
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
            />
          </svg>

          <span>{{ isLoading ? "Đang chuyển đổi..." : "Hoàn tiền" }}</span>
        </button>
      </div>

      <!-- Error Message Box -->
      <transition name="slide-fade">
        <div
          v-if="error"
          class="mt-6 flex items-start gap-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 p-4 text-sm text-red-700 dark:text-red-300 animate-fade-in-up transition-colors duration-400"
        >
          <!-- Error Icon -->
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 shrink-0 text-red-500 dark:text-red-400 mt-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4
              class="font-bold text-red-800 dark:text-red-200 transition-colors duration-400"
            >
              Đã xảy ra lỗi
            </h4>
            <p
              class="mt-1 text-xs text-red-700/90 dark:text-red-300/90 leading-relaxed transition-colors duration-400"
            >
              {{ error }}
            </p>
          </div>
        </div>
      </transition>
    </div>

    <!-- Skeleton Loading Screen -->
    <transition name="fade">
      <div
        v-if="isLoading"
        class="mt-6 glass-panel rounded-3xl p-6 shadow-xl space-y-4"
      >
        <div class="flex items-center gap-3">
          <div class="shimmer-bg h-10 w-10 rounded-xl"></div>
          <div class="space-y-2 flex-1">
            <div class="shimmer-bg h-4 w-1/3 rounded-md"></div>
            <div class="shimmer-bg h-3 w-1/4 rounded-md"></div>
          </div>
        </div>
        <div class="space-y-2 mt-4">
          <div class="shimmer-bg h-8 w-full rounded-xl"></div>
          <div class="shimmer-bg h-8 w-2/3 rounded-xl"></div>
        </div>
      </div>
    </transition>

    <!-- Converted Result Card Component -->
    <ShopeeResult
      v-if="resultLink && !isLoading"
      :link="resultLink"
      :affiliate-link="affiliateLink"
      :product-info="productInfo"
      :platform-type="currentType"
      @reset="handleCloseModal"
    />
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { useShopeeApi } from "@/composables/useShopeeApi";
import { AFFILIATE_TYPES } from "@/utils/constants";

const currentType = ref(AFFILIATE_TYPES.SHOPEE);
const rawUrl = ref("");
const isValidating = ref(false);
const urlInput = ref(null);

const {
  resultLink,
  affiliateLink,
  productInfo,
  isLoading,
  error,
  convertUrl,
  clearStates,
  validateShopeeUrl,
  validateTiktokUrl,
} = useShopeeApi();

// Check link validity as user types based on current platform type
const isUrlValid = computed(() => {
  if (currentType.value === AFFILIATE_TYPES.TIKTOK) {
    return validateTiktokUrl(rawUrl.value);
  }
  return validateShopeeUrl(rawUrl.value);
});

const checkUrlInput = () => {
  isValidating.value = true;
};

const handleConvert = async () => {
  if (!rawUrl.value || isLoading.value) return;
  isValidating.value = true;
  await convertUrl(rawUrl.value, currentType.value);
};

const handleCloseModal = () => {
  clearStates();
};

const handleClear = () => {
  rawUrl.value = "";
  isValidating.value = false;
  clearStates();
};

const selectType = (type) => {
  currentType.value = type;
  handleClear(); // Xóa sạch link cũ và reset trạng thái quy đổi trước đó
  nextTick(() => {
    urlInput.value?.focus(); // Tự động focus vào ô nhập link
  });
};
</script>

<style scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.glow-tiktok {
  box-shadow: 0 10px 40px -10px rgba(6, 182, 212, 0.12);
  border: 1px solid rgba(6, 182, 212, 0.2);
}

.glow-tiktok-button {
  box-shadow: 0 4px 14px 0 rgba(6, 182, 212, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glow-tiktok-button:hover:not(:disabled) {
  box-shadow: 0 6px 20px 0 rgba(6, 182, 212, 0.35);
  transform: translateY(-1px);
}

.glow-tiktok-button:active:not(:disabled) {
  transform: scale(0.98);
}

.text-cyan-455 {
  color: #06b6d4;
}

.text-2xs {
  font-size: 0.65rem;
}
.text-2xs {
  font-size: 0.65rem;
}
.text-3xs {
  font-size: 0.6rem;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
}

.animate-float {
  animation: float 3.5s ease-in-out infinite;
}
</style>

