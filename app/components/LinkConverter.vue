<template>
  <div class="link-converter animate-fade-in-up">
    <!-- Main Converter Card -->
    <div class="converter-card glass-panel glow-orange">
      <!-- Platform Selection -->
      <div class="platform-select">
        <div class="platform-select-header">
          <h3 class="platform-select-label">Chọn Kênh Quy Đổi</h3>
        </div>

        <div class="platform-select-grid">
          <!-- Shopee Card -->
          <button
            v-if="platforms.shopee"
            @click="selectType(AFFILIATE_TYPES.SHOPEE)"
            class="platform-card"
            :class="currentType === AFFILIATE_TYPES.SHOPEE ? 'platform-card--active' : 'platform-card--idle'"
          >
            <div class="platform-card-logo">
              <img src="/icon/shopee.png" class="platform-logo-img" alt="Shopee Logo" />
            </div>
            <div class="platform-card-meta">
              <div class="platform-card-type" :class="currentType === AFFILIATE_TYPES.SHOPEE ? 'platform-card-type--active' : ''">Hoàn tiền</div>
              <div class="platform-card-name" :class="currentType === AFFILIATE_TYPES.SHOPEE ? 'platform-card-name--active' : ''">Shopee</div>
            </div>
          </button>

          <!-- TikTok Card -->
          <button
            v-if="platforms.tiktok"
            @click="selectType(AFFILIATE_TYPES.TIKTOK)"
            class="platform-card"
            :class="currentType === AFFILIATE_TYPES.TIKTOK ? 'platform-card--active' : 'platform-card--idle'"
          >
            <div class="platform-card-logo">
              <img src="/icon/tiktok.png" class="platform-logo-img" alt="TikTok Logo" />
            </div>
            <div class="platform-card-meta">
              <div class="platform-card-type" :class="currentType === AFFILIATE_TYPES.TIKTOK ? 'platform-card-type--active' : ''">Hoàn tiền</div>
              <div class="platform-card-name" :class="currentType === AFFILIATE_TYPES.TIKTOK ? 'platform-card-name--active' : ''">
                TikTok
                <span class="platform-beta-badge">BETA</span>
              </div>
            </div>
          </button>

          <!-- Lazada Card -->
          <button
            v-if="platforms.lazada"
            @click="selectType(AFFILIATE_TYPES.LAZADA)"
            class="platform-card"
            :class="currentType === AFFILIATE_TYPES.LAZADA ? 'platform-card--active' : 'platform-card--idle'"
          >
            <div class="platform-card-logo">
              <img src="/icon/lazada.png" class="platform-logo-img" alt="Lazada Logo" />
            </div>
            <div class="platform-card-meta">
              <div class="platform-card-type" :class="currentType === AFFILIATE_TYPES.LAZADA ? 'platform-card-type--active' : ''">Hoàn tiền</div>
              <div class="platform-card-name" :class="currentType === AFFILIATE_TYPES.LAZADA ? 'platform-card-name--active' : ''">
                Lazada
                <span class="platform-beta-badge">BETA</span>
              </div>
            </div>
          </button>
        </div>
      </div>

      <!-- Mascot -->
      <div class="mascot-wrap">
        <NuxtImg
          src="/saffi_gold.webp"
          alt="Saffi Bee Mascot"
          class="mascot-img animate-float"
        />
      </div>

      <!-- Title -->
      <div class="converter-title">
        <h2 class="converter-heading">Chuyển Đổi và Xem Thông Tin Hoàn Tiền</h2>
        <p class="converter-subheading">
          Dán link sản phẩm
          <strong>{{ currentType === AFFILIATE_TYPES.SHOPEE ? "Shopee" : currentType === AFFILIATE_TYPES.TIKTOK ? "TikTok" : "Lazada" }}</strong>
          của bạn vào bên dưới để mua sắm và nhận hoàn tiền.
        </p>
      </div>

      <!-- Input Form -->
      <div class="converter-form">
        <!-- Input -->
        <a-input
          ref="urlInput"
          v-model:value="rawUrl"
          :placeholder="currentType === AFFILIATE_TYPES.SHOPEE ? 'Dán link Shopee tại đây...' : currentType === AFFILIATE_TYPES.TIKTOK ? 'Dán link TikTok tại đây...' : 'Dán link Lazada tại đây...'"
          size="large"
          :disabled="isLoading"
          allow-clear
          class="converter-input"
          @change="checkUrlInput"
          @pressEnter="handleConvert"
        >
          <template #prefix>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color:#94A3B8"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
          </template>
          <template v-if="!rawUrl" #suffix>
            <a-button size="small" type="primary" ghost class="paste-btn" @click="handlePaste" :disabled="isLoading">
              Dán nhanh
            </a-button>
          </template>
        </a-input>

        <!-- Inline validation warning -->
        <transition name="slide-fade">
          <div v-if="isValidating && !isUrlValid && rawUrl.length > 0" class="url-warning">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            <span>Không nhận dạng được định dạng link. Vui lòng kiểm tra lại.</span>
          </div>
        </transition>

        <!-- Convert Button -->
        <a-button
          type="primary"
          block
          size="large"
          :loading="isLoading"
          :disabled="isLoading || !rawUrl"
          class="convert-btn"
          @click="handleConvert"
        >
          Hoàn tiền
        </a-button>
      </div>

      <!-- Error Alert -->
      <transition name="slide-fade">
        <a-alert
          v-if="error"
          type="error"
          :message="error"
          show-icon
          closable
          banner
          class="converter-error"
        />
      </transition>
    </div>

    <!-- Result Card Component -->
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
  return (
    user.value?.platforms || {
      shopee: true,
      tiktok: true,
      lazada: false,
    }
  );
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

onMounted(() => { initDefaultTab(); });
watch(platforms, () => { initDefaultTab(); }, { deep: true });

const isUrlValid = computed(() => {
  if (currentType.value === AFFILIATE_TYPES.TIKTOK) return validateTiktokUrl(rawUrl.value);
  if (currentType.value === AFFILIATE_TYPES.LAZADA) return validateLazadaUrl(rawUrl.value);
  return validateShopeeUrl(rawUrl.value);
});

const checkUrlInput = () => { isValidating.value = true; };

const handleConvert = async () => {
  if (!rawUrl.value || isLoading.value) return;
  isValidating.value = true;
  await convertUrl(rawUrl.value, currentType.value);
};

const handleCloseModal = () => { clearStates(); };

const handleClear = () => {
  rawUrl.value = "";
  isValidating.value = false;
  clearStates();
};

const handlePaste = async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      rawUrl.value = text.trim();
      isValidating.value = true;
    }
  } catch (err) {
    console.error("Không thể đọc bộ nhớ tạm:", err);
  }
};

const selectType = (type) => {
  currentType.value = type;
  handleClear();
  nextTick(() => {
    urlInput.value?.focus();
  });
};
</script>

<style scoped>
.link-converter {
  width: 100%;
}

.converter-card {
  border-radius: 1.5rem;
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .converter-card { padding: 2rem; }
}

/* Platform select */
.platform-select {
  margin-bottom: 2rem;
  user-select: none;
}

.platform-select-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.platform-select-label {
  font-size: 11px;
  font-weight: 800;
  color: #334155;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
}

.platform-select-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 20rem;
  margin: 0 auto;
  width: 100%;
}

@media (min-width: 640px) {
  .platform-select-grid {
    flex-direction: row;
    max-width: 48rem;
    justify-content: center;
  }
}

/* Platform card */
.platform-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem;
  border-radius: 1rem;
  border: 2px solid;
  text-align: left;
  transition: all 0.3s ease;
  cursor: pointer;
  outline: none;
  position: relative;
  overflow: hidden;
  width: 100%;
  background: white;
}

@media (min-width: 640px) {
  .platform-card {
    flex: 1;
    max-width: 240px;
    padding: 1rem;
  }
}

.platform-card:active {
  transform: scale(0.98);
}

.platform-card--active {
  border-color: #EE4D2D;
  box-shadow: 0 4px 16px rgba(238,77,45,0.12);
  transform: scale(1.02);
}

.platform-card--idle {
  border-color: rgba(226,232,240,0.6);
}

.platform-card--idle:hover {
  border-color: #CBD5E1;
  background: #F8FAFC;
}

.platform-card-logo {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
  background: #F1F5F9;
  transition: transform 0.3s ease;
}

.platform-card:hover .platform-card-logo {
  transform: scale(1.05);
}

.platform-logo-img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}

.platform-card-meta {
  display: flex;
  flex-direction: column;
}

.platform-card-type {
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #94A3B8;
  transition: color 0.2s;
}

.platform-card-type--active { color: #EE4D2D; }

.platform-card-name {
  font-size: 14px;
  font-weight: 800;
  letter-spacing: -0.025em;
  margin-top: 2px;
  color: #64748B;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}

@media (min-width: 640px) {
  .platform-card-name { font-size: 16px; }
}

.platform-card-name--active { color: #0F172A; }

.platform-beta-badge {
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(245,158,11,0.1);
  color: #D97706;
  border: 1px solid rgba(245,158,11,0.15);
  font-size: 8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  flex-shrink: 0;
}

/* Mascot */
.mascot-wrap {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  user-select: none;
}

.mascot-img {
  height: 64px;
  width: 64px;
  object-fit: contain;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.mascot-img:hover {
  transform: scale(1.1) rotate(-6deg);
}

@media (min-width: 640px) {
  .mascot-img { height: 80px; width: 80px; }
}

/* Title */
.converter-title {
  text-align: center;
  margin-bottom: 2rem;
}

.converter-heading {
  font-size: 20px;
  font-weight: 800;
  color: #0F172A;
  letter-spacing: -0.025em;
  margin: 0 0 0.5rem;
}

@media (min-width: 768px) {
  .converter-heading { font-size: 26px; }
}

.converter-subheading {
  color: #64748B;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

/* Form */
.converter-form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.converter-input :deep(.ant-input) {
  font-weight: 600;
  border-radius: 1rem !important;
}

.converter-input :deep(.ant-input-affix-wrapper) {
  border-radius: 1rem !important;
  padding: 10px 14px;
}

.paste-btn {
  font-weight: 800 !important;
  font-size: 10px !important;
  border-radius: 8px !important;
}

/* URL Warning */
.url-warning {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #CA8A04;
  font-size: 12px;
  font-weight: 600;
  padding: 0 0.5rem;
}

/* Convert button */
.convert-btn {
  height: 52px !important;
  font-weight: 700 !important;
  font-size: 14px !important;
  letter-spacing: 0.08em !important;
  text-transform: uppercase;
  border-radius: 1rem !important;
  box-shadow: 0 4px 20px rgba(238,77,45,0.2) !important;
}

/* Error */
.converter-error {
  border-radius: 1rem !important;
  margin-top: 0.5rem;
}

/* Transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>
