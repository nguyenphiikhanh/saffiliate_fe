<template>
  <div class="w-full animate-fade-in-up">
    <!-- Main Converter Card -->
    <div
      class="glass-panel rounded-3xl p-6 md:p-8 shadow-2xl transition-all duration-500 glow-orange"
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

        <div class="flex flex-col sm:flex-row justify-center gap-4 max-w-xs sm:max-w-3xl mx-auto w-full">
          <!-- Shopee Card -->
          <button
            v-if="platforms.shopee"
            @click="selectType(AFFILIATE_TYPES.SHOPEE)"
            class="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer outline-none relative overflow-hidden group active:scale-[0.98] w-full sm:flex-1 sm:max-w-[240px]"
            :class="[
              currentType === AFFILIATE_TYPES.SHOPEE
                ? 'bg-white dark:bg-slate-900/40 border-shopee-orange shadow-md scale-[1.02]'
                : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700',
            ]"
          >
            <!-- Brand Logo Frame -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:scale-105"
            >
              <img src="/icon/shopee.png" class="h-5.5 w-5.5 object-contain" alt="Shopee Logo" />
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
                    : 'text-slate-650 dark:text-slate-400'
                "
              >
                Shopee
              </div>
            </div>
          </button>

          <!-- TikTok Card -->
          <button
            v-if="platforms.tiktok"
            @click="selectType(AFFILIATE_TYPES.TIKTOK)"
            class="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer outline-none relative overflow-hidden group active:scale-[0.98] w-full sm:flex-1 sm:max-w-[240px]"
            :class="[
              currentType === AFFILIATE_TYPES.TIKTOK
                ? 'bg-white dark:bg-slate-900/40 border-shopee-orange shadow-md scale-[1.02]'
                : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700',
            ]"
          >
            <!-- Brand Logo Frame -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:scale-105"
            >
              <img src="/icon/tiktok.png" class="h-5.5 w-5.5 object-contain" alt="TikTok Logo" />
            </div>

            <div>
              <div
                class="text-[9px] font-black tracking-wider uppercase transition-colors"
                :class="
                  currentType === AFFILIATE_TYPES.TIKTOK
                    ? 'text-shopee-orange'
                    : 'text-slate-400'
                "
              >
                Hoàn tiền
              </div>
              <div
                class="text-sm sm:text-base font-extrabold tracking-tight mt-0.5 flex items-center gap-1.5"
                :class="
                  currentType === AFFILIATE_TYPES.TIKTOK
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-650 dark:text-slate-400'
                "
              >
                <span>TikTok</span>
                <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider shrink-0 select-none">BETA</span>
              </div>
            </div>
          </button>

          <!-- Lazada Card -->
          <button
            v-if="platforms.lazada"
            @click="selectType(AFFILIATE_TYPES.LAZADA)"
            class="flex items-center gap-3.5 p-3.5 sm:p-4 rounded-2xl border-2 text-left transition-all duration-300 cursor-pointer outline-none relative overflow-hidden group active:scale-[0.98] w-full sm:flex-1 sm:max-w-[240px]"
            :class="[
              currentType === AFFILIATE_TYPES.LAZADA
                ? 'bg-white dark:bg-slate-900/40 border-shopee-orange shadow-md scale-[1.02]'
                : 'bg-white dark:bg-slate-900/40 border-slate-200/60 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-850/50 hover:border-slate-300 dark:hover:border-slate-700',
            ]"
          >
            <!-- Brand Logo Frame -->
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 shrink-0 overflow-hidden bg-slate-100 dark:bg-slate-800 group-hover:scale-105"
            >
              <img src="/icon/lazada.png" class="h-5.5 w-5.5 object-contain" alt="Lazada Logo" />
            </div>

            <div>
              <div
                class="text-[9px] font-black tracking-wider uppercase transition-colors"
                :class="
                  currentType === AFFILIATE_TYPES.LAZADA
                    ? 'text-shopee-orange'
                    : 'text-slate-400'
                "
              >
                Hoàn tiền
              </div>
              <div
                class="text-sm sm:text-base font-extrabold tracking-tight mt-0.5 flex items-center gap-1.5"
                :class="
                  currentType === AFFILIATE_TYPES.LAZADA
                    ? 'text-slate-900 dark:text-white'
                    : 'text-slate-655 dark:text-slate-400'
                "
              >
                <span>Lazada</span>
                <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider shrink-0 select-none">BETA</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Friendly Mascot Section -->
      <div class="flex justify-center mb-4 select-none">
        <div class="relative group">

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
            currentType === AFFILIATE_TYPES.SHOPEE ? "Shopee" : currentType === AFFILIATE_TYPES.TIKTOK ? "TikTok" : "Lazada"
          }}</span>
          của bạn vào bên dưới để mua sắm và nhận hoàn tiền.
        </p>
      </div>

      <!-- Input Form -->
      <div class="space-y-5">
        <div class="relative">
          <!-- Input Field -->
          <UInput
            ref="urlInput"
            v-model="rawUrl"
            type="text"
            size="md"
            :placeholder="
              currentType === AFFILIATE_TYPES.SHOPEE
                ? 'Dán link Shopee vào đây... (Ví dụ: https://shopee.vn/product/...)'
                : currentType === AFFILIATE_TYPES.TIKTOK
                ? 'Dán link TikTok vào đây... (Ví dụ: https://vt.tiktok.com/...)'
                : 'Dán link Lazada vào đây... (Ví dụ: https://s.lazada.vn/...)'
            "
            icon="i-heroicons-link-20-solid"
            :ui="{ rounded: 'rounded-2xl' }"
            class="w-full font-semibold focus-within:ring-2 focus-within:ring-shopee-orange/20"
            :disabled="isLoading"
            @input="checkUrlInput"
            @keyup.enter="handleConvert"
          >
            <template #trailing>
              <UButton
                v-if="rawUrl"
                icon="i-heroicons-x-mark-20-solid"
                color="neutral"
                variant="link"
                :padded="false"
                class="cursor-pointer"
                @click="handleClear"
                :disabled="isLoading"
              />
            </template>
          </UInput>
        </div>

        <!-- Inline Validation Warning -->
        <transition name="slide-fade">
          <div
            v-if="isValidating && !isUrlValid && rawUrl.length > 0"
            class="flex items-center gap-2 text-yellow-600 dark:text-yellow-500 text-xs font-semibold px-2"
          >
            <UIcon name="i-heroicons-exclamation-triangle-20-solid" class="h-4 w-4 shrink-0" />
            <span>Không nhận dạng được định dạng link. Vui lòng kiểm tra lại.</span>
          </div>
        </transition>

        <!-- Convert Button -->
        <UButton
          @click="handleConvert"
          :disabled="isLoading || !rawUrl"
          :loading="isLoading"
          size="md"
          color="primary"
          variant="solid"
          class="w-full flex justify-center py-4 font-bold uppercase tracking-wider cursor-pointer rounded-2xl shadow-md shadow-orange-500/10"
        >
          Hoàn tiền
        </UButton>
      </div>

      <!-- Error Message Box -->
      <transition name="slide-fade">
        <UAlert
          v-if="error"
          icon="i-heroicons-exclamation-circle-20-solid"
          color="danger"
          variant="soft"
          title="Đã xảy ra lỗi"
          :description="error"
          class="mt-6 rounded-2xl"
        />
      </transition>
    </div>



    <!-- Converted Result Card Component -->
    <ConvertLinkResult
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
import { ref, computed, nextTick, watch, onMounted } from "vue";
import { useShopeeApi } from "@/composables/useShopeeApi";
import { AFFILIATE_TYPES } from "@/utils/constants";

const { user } = useAuth();
const platforms = computed(() => {
  return user.value?.platforms || {
    shopee: true,
    tiktok: true,
    lazada: false,
  };
});

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
  validateLazadaUrl,
} = useShopeeApi();

// Set default active channel based on active system platforms
const initDefaultTab = () => {
  if (platforms.value) {
    if (!platforms.value.shopee && platforms.value.tiktok) {
      currentType.value = AFFILIATE_TYPES.TIKTOK;
    } else if (!platforms.value.shopee && !platforms.value.tiktok && platforms.value.lazada) {
      currentType.value = AFFILIATE_TYPES.LAZADA;
    } else {
      currentType.value = AFFILIATE_TYPES.SHOPEE;
    }
  }
};

onMounted(() => {
  initDefaultTab();
});

watch(platforms, () => {
  initDefaultTab();
}, { deep: true });

// Check link validity as user types based on current platform type
const isUrlValid = computed(() => {
  if (currentType.value === AFFILIATE_TYPES.TIKTOK) {
    return validateTiktokUrl(rawUrl.value);
  }
  if (currentType.value === AFFILIATE_TYPES.LAZADA) {
    return validateLazadaUrl(rawUrl.value);
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

.glow-lazada {
  box-shadow: 0 10px 40px -10px rgba(37, 99, 235, 0.12);
  border: 1px solid rgba(37, 99, 235, 0.2);
}

.glow-lazada-button {
  box-shadow: 0 4px 14px 0 rgba(37, 99, 235, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.glow-lazada-button:hover:not(:disabled) {
  box-shadow: 0 6px 20px 0 rgba(37, 99, 235, 0.35);
  transform: translateY(-1px);
}

.glow-lazada-button:active:not(:disabled) {
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

