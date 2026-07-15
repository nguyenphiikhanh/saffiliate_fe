<template>
  <div class="mt-6 border-t border-slate-100 dark:border-slate-800 pt-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
        <span class="text-[#ee4d2d]">🔥</span> Sản phẩm hoa hồng cao
      </h3>
    </div>

    <!-- Toolbar: Search & Sort -->
    <div class="flex flex-col sm:flex-row gap-3 mb-4">
      <div class="flex-1">
        <a-input
          v-model:value="searchQuery"
          placeholder="Tìm kiếm sản phẩm..."
          allow-clear
          class="w-full rounded-xl"
        >
          <template #prefix>
            <SearchOutlined class="text-slate-400" />
          </template>
        </a-input>
      </div>
      <div class="flex items-center gap-2 sm:gap-3 shrink-0">
        <span class="text-[13px] font-medium text-slate-500 whitespace-nowrap">Sắp xếp:</span>
        <div class="flex w-full sm:w-auto">
          <button
            class="px-4 py-1.5 text-[13px] font-semibold border rounded-l-md transition-colors w-1/2 sm:w-auto"
            :class="sortBy === 'price_asc' ? 'border-[#ee4d2d] text-[#ee4d2d] z-10 relative' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative'"
            @click="sortBy = 'price_asc'"
          >
            Giá
          </button>
          <button
            class="px-4 py-1.5 text-[13px] font-semibold border rounded-r-md -ml-[1px] transition-colors w-1/2 sm:w-auto"
            :class="sortBy === 'commission_desc' ? 'border-[#ee4d2d] text-[#ee4d2d] z-10 relative' : 'border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 relative'"
            @click="sortBy = 'commission_desc'"
          >
            Hoa hồng (%)
          </button>
        </div>
      </div>
    </div>

    <!-- Product List (Scrollable) -->
    <div class="max-h-[500px] overflow-y-auto pr-1 -mr-1 custom-scrollbar">
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pb-4">
        <div
          v-for="product in filteredAndSortedProducts"
          :key="product.id"
          class="bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md hover:border-[#ee4d2d]/40 dark:hover:border-[#ee4d2d]/60 transition-all group flex flex-col"
        >
          <!-- Image Section -->
          <div class="relative aspect-[4/5] bg-slate-100 dark:bg-slate-900 overflow-hidden shrink-0">
            <img
              :src="product.image"
              :alt="product.title"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <!-- Xtra Badge Overlay -->
            <div
              v-if="product.commissionRate > 20"
              class="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 flex flex-col items-center leading-tight"
            >
              <span>{{ product.commissionRate }}%</span>
              <span class="uppercase">Giảm</span>
            </div>
          </div>

          <!-- Content Section -->
          <div class="p-2 sm:p-3 flex flex-col flex-1">
            <h4 class="text-xs sm:text-sm text-slate-700 dark:text-slate-200 line-clamp-2 leading-snug mb-1 min-h-[32px] sm:min-h-[40px]">
              {{ product.title }}
            </h4>

            <div class="mt-auto">
              <!-- Xtra tag -->
              <div v-if="product.hasXtra" class="mb-1.5">
                <span class="inline-block bg-[#0f2142] text-white text-[9px] font-bold px-1 py-0.5 rounded-sm">
                  <span class="text-[#ee4d2d] italic">HOA HỒNG</span> XTRA
                </span>
              </div>

              <!-- Price & Sales -->
              <div class="flex items-end justify-between mb-1">
                <div class="text-[#ee4d2d] font-medium text-sm sm:text-base">
                  <span class="text-[10px] underline align-top mr-0.5">đ</span>{{ formatPrice(product.price) }}
                </div>
                <div class="text-[10px] sm:text-xs text-slate-400">
                  {{ product.sales }} lượt bán
                </div>
              </div>

              <!-- Commission Rate -->
              <div class="text-[#ee4d2d] text-[10px] sm:text-xs mb-3">
                Tỉ lệ hoa hồng {{ product.commissionRate }}%
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-2 mt-auto">
                <!-- Select Checkbox -->
                <div 
                  class="w-6 h-6 rounded border flex items-center justify-center cursor-pointer transition-colors shrink-0"
                  :class="selectedProducts.includes(product.id) ? 'bg-[#ee4d2d] border-[#ee4d2d] text-white' : 'border-slate-300 dark:border-slate-600 hover:border-[#ee4d2d]'"
                  @click="toggleSelect(product.id)"
                >
                  <CheckOutlined v-if="selectedProducts.includes(product.id)" class="text-[12px]" />
                </div>
                <!-- Get Link Button -->
                <button
                  class="flex-1 py-1.5 px-2 border border-[#ee4d2d] text-[#ee4d2d] rounded text-xs font-medium hover:bg-[#ee4d2d]/10 transition-colors"
                  @click="$emit('get-link', product)"
                >
                  Lấy link
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-if="filteredAndSortedProducts.length === 0" class="col-span-full py-8 text-center text-slate-500">
          Không tìm thấy sản phẩm nào phù hợp.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { SearchOutlined, CheckOutlined } from '@ant-design/icons-vue';

// Emits
defineEmits(['get-link']);

// State
const searchQuery = ref('');
const sortBy = ref('commission_desc');
const selectedProducts = ref([]);


// Mock Data
const mockProducts = ref([
  {
    id: 1,
    image: 'https://picsum.photos/id/1025/300/400',
    title: 'Váy yếm jean denim dáng dài - Đầm jean midi phong cách trẻ trung cá tính',
    price: 215000,
    sales: 474,
    commissionRate: 24,
    hasXtra: true
  },
  {
    id: 2,
    image: 'https://picsum.photos/id/1027/300/400',
    title: 'Áo thun tay lỡ form rộng dáng unisex nam nữ mặc đi chơi thoải mái',
    price: 99000,
    sales: 1250,
    commissionRate: 15,
    hasXtra: false
  },
  {
    id: 3,
    image: 'https://picsum.photos/id/103/300/400',
    title: 'Giày sneaker thể thao nam nữ Ulzzang đế cao tôn dáng, phối màu cực chất',
    price: 350000,
    sales: 890,
    commissionRate: 35,
    hasXtra: true
  },
  {
    id: 4,
    image: 'https://picsum.photos/id/1043/300/400',
    title: 'Túi xách nữ đeo chéo thời trang Hàn Quốc cao cấp, da PU mềm mịn',
    price: 189000,
    sales: 320,
    commissionRate: 10,
    hasXtra: false
  },
  {
    id: 5,
    image: 'https://picsum.photos/id/1059/300/400',
    title: 'Set đồ bộ nữ mặc nhà lụa satin cao cấp siêu mát mẻ',
    price: 145000,
    sales: 2100,
    commissionRate: 20,
    hasXtra: true
  },
  {
    id: 6,
    image: 'https://picsum.photos/id/1062/300/400',
    title: 'Áo sơ mi lụa tơ tằm cổ chữ V sang trọng cho quý cô công sở',
    price: 275000,
    sales: 156,
    commissionRate: 18,
    hasXtra: false
  }
]);

// Computed
const filteredAndSortedProducts = computed(() => {
  let result = [...mockProducts.value];

  // Search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(p => p.title.toLowerCase().includes(query));
  }

  // Sort
  switch (sortBy.value) {
    case 'commission_desc':
      result.sort((a, b) => b.commissionRate - a.commissionRate);
      break;
    case 'price_asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price_desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'sales_desc':
      result.sort((a, b) => b.sales - a.sales);
      break;
  }

  return result;
});

// Methods
const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
