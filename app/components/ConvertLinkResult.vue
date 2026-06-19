<template>
  <UModal v-model:open="isOpen" :ui="{ content: 'w-full sm:max-w-xl border-0 ring-0 bg-transparent shadow-none' }">
    <template #content>
      <!-- 1. PRODUCT DETAILS CARD -->
      <UCard
        v-if="productInfo"
        :ui="{
          body: 'p-6 space-y-6',
          header: 'relative flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0'
        }"
        class="relative overflow-hidden border border-slate-150 dark:border-slate-800/80 rounded-3xl"
      >
        <!-- Glowing header line decoration -->
        <div
          class="absolute top-0 inset-x-0 h-1.5 transition-all duration-300"
          :class="
            platformType === 2
              ? 'bg-slate-950 dark:bg-cyan-500'
              : 'bg-gradient-to-r from-orange-500 via-shopee-orange to-yellow-500'
          "
        ></div>

        <template #header>
          <div class="pr-6">
            <h3 class="text-sm font-black text-slate-800 dark:text-white tracking-wider uppercase">
              Chi tiết hoàn tiền
            </h3>
          </div>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            class="rounded-lg absolute top-4 right-4"
            @click="closeModal"
          />
        </template>

        <!-- Product detail content info -->
        <div class="space-y-6">
          <div class="flex items-start gap-4">
            <!-- Product Image -->
            <div
              class="relative shrink-0 w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800 bg-white shadow-inner flex items-center justify-center p-1.5"
            >
              <img
                :src="productInfo.imageUrl"
                :alt="productInfo.productName"
                class="max-w-full max-h-full object-contain"
              />
              <div
                v-if="productInfo.isXtra && platformType !== 2"
                class="absolute bottom-0 left-0 right-0 bg-shopee-orange text-white text-[9px] font-black text-center py-0.5 uppercase tracking-wider select-none"
              >
                Xtra
              </div>
            </div>

            <!-- Product info details -->
            <div class="flex-1 min-w-0 space-y-1.5 pt-0.5">
              <!-- Shop Badge and Name -->
              <div class="flex items-center gap-1.5">
                <span
                  class="inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider select-none text-white transition-all duration-300"
                  :class="
                    platformType === 2
                      ? 'bg-slate-950 dark:bg-cyan-500'
                      : 'bg-shopee-orange'
                  "
                >
                  {{ platformType === 2 ? "TÓP-TÓP" : "SỘP-PE" }}
                </span>
                <span
                  class="text-xs text-slate-500 dark:text-slate-400 font-semibold truncate"
                >
                  {{ productInfo.shopName }}
                </span>
              </div>

              <!-- Product Title -->
              <h3
                class="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug"
                :title="productInfo.productName"
              >
                {{ productInfo.productName }}
              </h3>
            </div>
          </div>

          <!-- Commission & Cashback Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Partner Commission -->
            <div
              class="flex items-center gap-3 rounded-2xl p-4 border"
              :class="
                platformType === 2
                  ? 'bg-slate-950/[0.02] dark:bg-slate-800/10 border-slate-950/10 dark:border-slate-800'
                  : 'bg-orange-500/[0.03] dark:bg-orange-500/[0.05] border-orange-500/10'
              "
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white shadow-md font-black text-base"
                :class="
                  platformType === 2
                    ? 'bg-slate-950 dark:bg-slate-800'
                    : 'bg-shopee-orange'
                "
              >
                %
              </div>
              <div>
                <div
                  class="text-[10px] sm:text-xs font-bold uppercase tracking-wider"
                  :class="
                    platformType === 2
                      ? 'text-slate-500 dark:text-slate-400'
                      : 'text-shopee-orange'
                  "
                >
                  HOA HỒNG ĐỐI TÁC
                </div>
                <div
                  class="text-lg sm:text-xl font-extrabold mt-0.5 tracking-tight"
                  :class="
                    platformType === 2
                      ? 'text-slate-950 dark:text-white'
                      : 'text-shopee-orange'
                  "
                >
                  {{ formatPartnerCommission(productInfo.commission) }}<span class="underline ml-0.5">đ</span>
                </div>
              </div>
            </div>

            <!-- Saffi Cashback -->
            <div
              class="flex items-center gap-3 rounded-2xl bg-emerald-500/[0.03] dark:bg-emerald-500/[0.05] border border-emerald-500/10 p-4 shadow-sm"
            >
              <div
                class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md"
              >
                <UIcon name="i-lucide-wallet" class="h-5 w-5" />
              </div>
              <div>
                <div
                  class="text-[10px] sm:text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider"
                >
                  SAFFI HOÀN TIỀN CHO BẠN
                </div>
                <div
                  class="text-xs sm:text-sm font-extrabold text-emerald-600 dark:text-emerald-400 mt-1 tracking-tight"
                >
                  Từ
                  <span class="text-sm sm:text-base">{{
                    formatCashbackRange(minCashback)
                  }}<span class="underline ml-0.5">đ</span></span>
                  đến
                  <span class="text-sm sm:text-base">{{
                    formatCashbackRange(maxCashback)
                  }}<span class="underline ml-0.5">đ</span></span>
                </div>
              </div>
            </div>
          </div>

          <!-- Main CTA to buy -->
          <UButton
            block
            size="lg"
            :color="platformType === 2 ? 'neutral' : 'primary'"
            class="py-4 font-black text-sm tracking-wider uppercase rounded-2xl shadow-lg"
            :class="platformType === 2 ? 'shadow-slate-500/10' : 'shadow-orange-500/20'"
            icon="i-lucide-shopping-bag"
            @click="handleOpenAffiliate"
          >
            MỞ ĐỂ MUA HÀNG NGAY
          </UButton>

          <!-- Extra bottom buttons -->
          <div class="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 dark:border-slate-800/60">
            <UButton
              color="neutral"
              variant="outline"
              size="xs"
              class="font-bold rounded-xl px-4 py-2"
              icon="i-lucide-refresh-cw"
              @click="closeModal"
            >
              Mua sản phẩm khác
            </UButton>

            <span
              class="text-[9.5px] font-semibold text-slate-400 dark:text-slate-500 text-right leading-relaxed max-w-[55%]"
            >
              Hệ thống tự động phát hiện và tối ưu hóa hoa hồng tốt nhất cho bạn.
            </span>
          </div>
        </div>
      </UCard>

      <!-- 2. FALLBACK CONVERTED RESULT CARD -->
      <UCard
        v-else
        :ui="{
          body: 'p-6 space-y-6',
          header: 'relative flex items-center justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0'
        }"
        class="relative overflow-hidden border border-slate-150 dark:border-slate-800/80 rounded-3xl"
      >
        <!-- Glowing header line decoration -->
        <div class="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-450 border border-emerald-500/20 shadow-inner"
            >
              <UIcon name="i-lucide-circle-check" class="h-5 w-5" />
            </div>
            <div>
              <h3 class="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wider">
                Đã chuyển đổi thành công!
              </h3>
            </div>
          </div>
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-lucide-x"
            class="rounded-lg absolute top-4 right-4"
            @click="closeModal"
          />
        </template>

        <!-- Fallback actions -->
        <div class="space-y-6">
          <div class="flex flex-col sm:flex-row items-center gap-4">
            <UButton
              block
              size="md"
              color="neutral"
              variant="outline"
              icon="i-lucide-external-link"
              class="flex-1 py-3.5 font-bold rounded-2xl"
              @click="handleOpenAffiliate"
            >
              Mở Link Trực Tiếp
            </UButton>

            <UButton
              block
              size="md"
              color="primary"
              variant="solid"
              icon="i-lucide-refresh-cw"
              class="flex-1 py-3.5 font-bold rounded-2xl shadow-lg shadow-orange-500/15"
              @click="closeModal"
            >
              Tiếp Tục Chuyển Đổi
            </UButton>
          </div>
        </div>
      </UCard>
    </template>
  </UModal>
</template>

<script setup>
import { computed } from "vue";

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
  platformType: {
    type: Number,
    default: 1,
  },
});

const emit = defineEmits(["reset"]);

const isOpen = computed({
  get: () => true,
  set: (val) => {
    if (!val) emit("reset");
  },
});

const closeModal = () => {
  emit("reset");
};

const minCashback = computed(() => {
  const rate =
    props.productInfo?.commission_min_rate !== undefined
      ? props.productInfo.commission_min_rate
      : 56;
  return (props.productInfo?.commission || 0) * (rate / 100);
});

const maxCashback = computed(() => {
  const rate =
    props.productInfo?.commission_max_rate !== undefined
      ? props.productInfo.commission_max_rate
      : 84;
  return (props.productInfo?.commission || 0) * (rate / 100);
});

const handleOpenAffiliate = () => {
  const targetUrl = props.affiliateLink || props.link;
  window.open(targetUrl, "_blank", "noopener,noreferrer");
};

// Formatting helpers for currency values
const formatPartnerCommission = (value) => {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat("vi-VN").format(Math.round(value));
};

const formatCashbackRange = (value) => {
  if (value === undefined || value === null) return "0";
  return new Intl.NumberFormat("vi-VN").format(Math.round(value));
};
</script>
