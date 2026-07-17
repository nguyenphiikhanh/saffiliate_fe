<template>
  <div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6" ref="componentRoot">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h3
          class="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2"
        >
          <span class="text-[#ee4d2d]">🔥</span> Sản phẩm hoa hồng cao
        </h3>
        <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Có thể chứa sản phẩm bạn cần, tìm kiếm sản phẩm với hoa hồng hoàn cao
          nhất
        </p>
      </div>
    </div>

    <!-- Toolbar: Search & Sort -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <div class="flex-1 flex gap-2">
        <a-input
          v-model:value="searchQuery"
          placeholder="Tìm kiếm sản phẩm..."
          allow-clear
          class="w-full rounded-xl"
          @pressEnter="handleSearch"
        >
          <template #prefix>
            <SearchOutlined class="text-slate-400" />
          </template>
        </a-input>
        <a-button
          type="primary"
          class="!bg-[#ee4d2d] hover:!bg-[#d73f1f] !border-none !rounded-xl px-5 h-auto py-1.5 flex items-center justify-center font-medium shrink-0 shadow-sm"
          @click="handleSearch"
        >
          Tìm
        </a-button>
      </div>
    </div>

    <!-- Product List (Scrollable) -->
    <div
      ref="scrollContainerRef"
      class="max-h-[500px] overflow-y-auto pr-1 -mr-1 custom-scrollbar"
    >
      <div
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 pb-4"
      >
        <template v-if="isLoading">
          <div
            v-for="i in 10"
            :key="`skel-${i}`"
            class="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm flex flex-col"
          >
            <div class="relative aspect-[4/5] bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
            <div class="p-2 sm:p-3 flex flex-col flex-1 gap-2">
              <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-full"></div>
              <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4 mb-auto"></div>
              <div class="flex justify-between items-end mt-2">
                <div class="h-5 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
              </div>
              <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/3 mb-3"></div>
              <div class="flex gap-2">
                <div class="w-6 h-6 rounded border border-slate-200 dark:border-slate-700 animate-pulse shrink-0"></div>
                <div class="flex-1 h-6 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div
            v-for="product in products"
            :key="product.productLink"
            class="bg-white dark:bg-slate-800 rounded-xl border border-slate-300 dark:border-slate-600 overflow-hidden shadow-sm hover:shadow-md hover:border-[#ee4d2d]/40 dark:hover:border-[#ee4d2d]/60 transition-all group flex flex-col"
          >
            <!-- Image Section -->
          <div
            class="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0"
          >
            <img
              :src="product.imageUrl"
              :alt="product.productName"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <!-- Rating Star Overlay -->
            <div
              v-if="parseFloat(product.ratingStar) > 4"
              class="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-1.5 py-0.5 flex items-center gap-1 leading-tight rounded-bl-lg shadow-sm"
            >
              <span>{{ parseFloat(product.ratingStar).toFixed(1) }}</span>
              <StarFilled class="text-[10px]" />
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-2 sm:p-3 flex flex-col flex-1">
            <h4
              class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug mb-1 min-h-[32px] sm:min-h-[40px]"
            >
              {{ product.productName }}
            </h4>

            <div class="mt-auto">
              <!-- Price & Sales -->
              <div class="flex items-end justify-between mb-1">
                <div class="text-[#ee4d2d] font-medium text-sm sm:text-base">
                  <span class="text-[10px] underline align-top mr-0.5">đ</span
                  >{{ formatPrice(product.price) }}
                </div>
              </div>

              <!-- Commission Rate -->
              <div class="text-[#ee4d2d] text-[10px] sm:text-xs mb-3">
                Hoa hồng
                {{ (parseFloat(product.commissionRate) * 100).toFixed(0) }}%
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 mt-auto">
                <!-- Select Checkbox -->
                <div
                  class="w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  :class="
                    selectedProducts.includes(product.productLink)
                      ? 'bg-[#ee4d2d] border-[#ee4d2d] text-white'
                      : 'border-slate-300 dark:border-slate-600 hover:border-[#ee4d2d]'
                  "
                  @click="toggleSelect(product.productLink)"
                >
                  <CheckOutlined
                    v-if="selectedProducts.includes(product.productLink)"
                    class="text-[12px]"
                  />
                </div>
                <!-- Get Link Button -->
                <a-button
                  size="small"
                  class="flex-1 !h-6 !text-[11px] !border-[#ee4d2d] !text-[#ee4d2d] !rounded font-medium hover:!bg-[#ee4d2d]/10 flex items-center justify-center transition-colors"
                  @click="$emit('get-link', product)"
                >
                  Lấy link
                </a-button>
              </div>
            </div>
          </div>
        </div>
        </template>

        <!-- Empty State -->
        <div
          v-if="!isLoading && products.length === 0"
          class="col-span-full py-8 text-center text-slate-500"
        >
          Không tìm thấy sản phẩm nào phù hợp.
        </div>
      </div>

      <!-- Load More / End Indicator -->
      <div class="py-4 text-center text-slate-500 text-sm" ref="loadMoreRef">
        <template v-if="products.length > 0">
          <div
            v-if="isFetchingMore || isLoading"
            class="flex items-center justify-center gap-2"
          >
            <LoadingOutlined /> Đang tải thêm sản phẩm...
          </div>
          <div v-else-if="!hasNextPage">Đã hiển thị hết sản phẩm</div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import {
  SearchOutlined,
  CheckOutlined,
  LoadingOutlined,
  StarFilled,
} from "@ant-design/icons-vue";

// Emits
defineEmits(["get-link"]);

// State
const searchQuery = ref("");
const selectedProducts = ref([]);
const products = ref([]);
const page = ref(1);
const hasNextPage = ref(true);
const isLoading = ref(false);
const isFetchingMore = ref(false);
const loadMoreRef = ref(null);
const scrollContainerRef = ref(null);
const componentRoot = ref(null);
const hasInitiallyFetched = ref(false);

let observer = null;

const fetchProducts = async (isLoadMore = false) => {
  if (isLoadMore && (!hasNextPage.value || isFetchingMore.value)) return;
  if (!isLoadMore && isLoading.value) return;

  if (isLoadMore) {
    isFetchingMore.value = true;
  } else {
    isLoading.value = true;
  }

  try {
    const res = await useAppFetch().api.get("/link/product/list", {
      query: {
        page: page.value,
        keyword: searchQuery.value || undefined,
      },
    });

    const data = res.data?.data || res.data || {};
    const nodes = data.nodes || [];

    if (isLoadMore) {
      products.value = [...products.value, ...nodes];
    } else {
      products.value = nodes;
    }

    hasNextPage.value = !!data.pageInfo?.hasNextPage;
  } catch (err) {
    console.error("Failed to fetch products", err);
  } finally {
    if (isLoadMore) {
      isFetchingMore.value = false;
    } else {
      isLoading.value = false;
    }
  }
};

const handleSearch = () => {
  page.value = 1;
  fetchProducts();
};

watch(searchQuery, (newVal) => {
  if (!newVal) {
    handleSearch();
  }
});

const setupObserver = () => {
  if (observer) observer.disconnect();
  observer = new IntersectionObserver(
    (entries) => {
      if (
        entries[0].isIntersecting &&
        hasNextPage.value &&
        !isLoading.value &&
        !isFetchingMore.value
      ) {
        page.value++;
        fetchProducts(true);
      }
    },
    { root: scrollContainerRef.value, threshold: 0.1, rootMargin: "100px" }
  );

  if (loadMoreRef.value) {
    observer.observe(loadMoreRef.value);
  }
};

onMounted(() => {
  fetchProducts();
  setupObserver();
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
  }
});

// Methods
const formatPrice = (price) => {
  return price ? price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") : "0";
};

const toggleSelect = (id) => {
  const index = selectedProducts.value.indexOf(id);
  if (index === -1) {
    selectedProducts.value.push(id);
  } else {
    selectedProducts.value.splice(index, 1);
  }
};
</script>

<style scoped>
/* Fix lỗi iOS tự động zoom khi focus input (yêu cầu font-size >= 16px) */
:deep(.ant-input) {
  font-size: 16px !important;
}

/* Tùy chỉnh thanh cuộn cho khu vực danh sách sản phẩm */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
:deep(.dark) .custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #475569;
}
</style>
