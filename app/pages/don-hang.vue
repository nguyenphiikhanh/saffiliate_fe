<template>
  <div class="w-full animate-fade-in space-y-6">
    <!-- Page Title & Header -->
    <div class="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
          Quản Lý <span class="text-shopee-orange">Đơn Hàng</span>
        </h1>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
          Xem thông tin chi tiết và tiến trình hoàn tiền của toàn bộ đơn hàng của bạn.
        </p>
      </div>
    </div>

    <!-- Order Process Info Component -->
    <OrderProcessInfo />

    <!-- MAIN BODY: Filters, Search & Table -->
    <UCard
      :ui="{ 
        body: 'p-6',
        ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
        background: 'bg-white dark:bg-slate-900/60',
        rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20'
      }"
      class="mt-8"
    >
      <!-- Filters Container -->
      <div class="flex items-center w-full">
        <!-- Status Tabs Filters -->
        <div class="flex items-center gap-1 bg-slate-50 dark:bg-slate-950/60 p-1 rounded-2xl border border-slate-200/40 dark:border-slate-800/50 w-full sm:w-auto">
          <UButton
            v-for="tab in tabs"
            :key="tab.value"
            @click="activeTab = tab.value"
            :variant="activeTab === tab.value ? 'solid' : 'ghost'"
            :color="activeTab === tab.value ? 'primary' : 'neutral'"
            class="flex-1 sm:flex-initial text-[11px] sm:text-xs font-bold rounded-xl whitespace-nowrap"
            :icon="tab.icon"
          >
            {{ tab.label }}
          </UButton>
        </div>
      </div>

      <!-- Info Box for Pending Tab -->
      <div v-if="activeTab === 'pending'" class="mt-5">
        <UAlert
          icon="i-lucide-info"
          color="warning"
          variant="soft"
          title="Chờ hoàn: đơn đã ghi nhận hoàn tiền, đang đợi sàn xác nhận hết thời gian hủy, đổi trả. Với Sộp-pe, hãy bấm Đã nhận hàng trong app để được hoàn sớm nhất."
        />
      </div>

      <!-- Info Box for Cancelled Tab -->
      <div v-if="activeTab === 'cancelled'" class="mt-5">
        <UAlert
          icon="i-lucide-circle-x"
          color="danger"
          variant="soft"
        >
          <template #title>
            <div class="text-[13px] leading-relaxed font-semibold">
              <span class="font-black">Đã hủy:</span> đơn có thể do bạn hủy, hoặc cashback bị hủy từ sàn. Saffi là trung gian nên không được cung cấp lý do cụ thể, nhưng luôn sẵn sàng gửi thông tin đối soát từ sàn cho bạn để đảm bảo hệ thống minh bạch. Vui lòng liên hệ <NuxtLink to="/ho-tro" class="text-rose-500 hover:underline font-black transition-all">Hỗ trợ</NuxtLink> để được cung cấp thêm thông tin.
            </div>
          </template>
        </UAlert>
      </div>

      <!-- Skeleton Loading State -->
      <div
        v-if="status === 'pending'"
        class="mt-6 overflow-x-auto bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60"
      >
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
              <th class="p-4 pl-6 whitespace-nowrap w-[20%]">Mã đơn</th>
              <th class="p-4 whitespace-nowrap w-[35%]">Sản phẩm</th>
              <th class="p-4 whitespace-nowrap w-[15%]">Ngày</th>
              <th class="p-4 text-right whitespace-nowrap w-[15%]">Hoa hồng</th>
              <th class="p-4 whitespace-nowrap text-center w-[10%]">Trạng thái</th>
              <th class="p-4 whitespace-nowrap text-center w-[5%]">Hành động</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
            <tr v-for="i in 5" :key="i">
              <td class="p-4 pl-6">
                <div class="flex items-center gap-2.5">
                  <USkeleton class="w-7 h-7 rounded shrink-0" />
                  <USkeleton class="h-3 w-16" />
                </div>
              </td>
              <td class="p-4">
                <USkeleton class="h-3.5 w-48 max-w-full" />
              </td>
              <td class="p-4">
                <USkeleton class="h-3 w-20" />
              </td>
              <td class="p-4 text-right">
                <div class="flex items-center justify-end">
                  <USkeleton class="h-3.5 w-16" />
                </div>
              </td>
              <td class="p-4 text-center">
                <USkeleton class="h-5 w-20 rounded-full mx-auto" />
              </td>
              <td class="p-4 text-center">
                <USkeleton class="h-6.5 w-12 rounded-lg mx-auto" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Orders Table -->
      <div class="mt-6" v-else-if="filteredOrders.length > 0">
        <!-- Desktop Table View -->
        <div class="hidden md:block overflow-x-auto bg-white dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800/60">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-[10px] uppercase tracking-widest font-bold text-slate-400 border-b border-slate-100 dark:border-slate-800">
                <th class="p-4 pl-6 whitespace-nowrap w-[20%]">Mã đơn</th>
                <th class="p-4 whitespace-nowrap w-[35%]">Sản phẩm</th>
                <th class="p-4 whitespace-nowrap w-[15%]">Ngày</th>
                <th class="p-4 text-right whitespace-nowrap w-[15%]">Hoa hồng</th>
                <th class="p-4 whitespace-nowrap text-center w-[10%]">Trạng thái</th>
                <th class="p-4 whitespace-nowrap text-center w-[5%]">Hành động</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60 text-sm">
              <tr
                v-for="order in filteredOrders"
                :key="order.code"
                class="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <!-- Mã đơn -->
                <td class="p-4 pl-6">
                  <div class="flex items-center gap-2.5">
                    <div class="w-7 h-7 flex items-center justify-center shrink-0">
                      <NuxtPicture
                        :src="getBrandLogo(order.type)"
                        :img-attrs="{
                          class: 'w-7 h-7 object-contain shrink-0',
                          alt: 'Logo',
                          width: '28',
                          height: '28'
                        }"
                      />
                    </div>
                    <span class="font-bold text-slate-700 dark:text-slate-200 text-xs">#{{ order.code }}</span>
                  </div>
                </td>
                <!-- Sản phẩm -->
                <td class="p-4">
                  <div
                    class="font-bold text-slate-600 dark:text-slate-300 text-[13px] truncate max-w-[280px]"
                    :title="order.itemName || order.storeName"
                  >
                    {{ order.itemName || order.storeName || "Sản phẩm từ Shopee" }}
                  </div>
                </td>
                <!-- Ngày -->
                <td class="p-4">
                  <div class="text-xs text-slate-500 font-medium">
                    {{ order.date }}
                  </div>
                </td>
                <!-- Hoa hồng -->
                <td class="p-4 text-right">
                  <div class="flex items-center justify-end gap-1.5 font-black text-emerald-505 dark:text-emerald-400 text-[13px]">
                    +{{ formatMoney(order.cashbackAmount) }}
                    <span class="w-3.5 h-3.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 flex items-center justify-center text-[8px] font-bold">đ</span>
                  </div>
                </td>
                <!-- Trạng thái -->
                <td class="p-4 text-center">
                  <UBadge
                    size="xs"
                    variant="soft"
                    :color="
                      order.status === 'Thành công' || order.status === 'Completed'
                        ? 'success'
                        : order.status === 'Chờ duyệt'
                        ? 'warning'
                        : 'danger'
                    "
                    class="font-bold uppercase tracking-wider text-[10px] px-3 py-1 rounded-full"
                  >
                    {{
                      order.status === "Completed" || order.status === "Thành công"
                        ? "HOÀN THÀNH"
                        : order.status
                    }}
                  </UBadge>
                </td>
                <!-- Hành động -->
                <td class="p-4 text-center">
                  <UButton
                    size="xs"
                    variant="outline"
                    color="primary"
                    class="font-bold cursor-pointer"
                    @click="openOrderDetails(order)"
                  >
                    Xem
                  </UButton>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Mobile Card List View -->
        <div class="block md:hidden divide-y divide-slate-100 dark:divide-slate-800/60">
          <div
            v-for="order in filteredOrders"
            :key="order.code"
            @click="openOrderDetails(order)"
            class="flex items-center justify-between py-3.5 cursor-pointer active:bg-slate-50 dark:active:bg-slate-800/40 transition-colors"
          >
            <!-- Left Side: Icon & Order Info -->
            <div class="flex items-center gap-3 min-w-0">
              <!-- Brand Icon -->
              <div class="w-10 h-10 flex items-center justify-center shrink-0">
                <NuxtPicture
                  :src="getBrandLogo(order.type)"
                  :img-attrs="{
                    class: 'w-10 h-10 object-contain shrink-0',
                    alt: 'Logo',
                    width: '40',
                    height: '40'
                  }"
                />
              </div>

              <!-- Order Text Info -->
              <div class="flex flex-col min-w-0">
                <span class="font-extrabold text-slate-800 dark:text-slate-200 text-[13.5px] truncate">
                  #{{ order.code }}
                </span>
                <span class="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px] mt-0.5">
                  {{ order.itemName || order.storeName || "Sản phẩm từ Shopee" }}
                </span>
                <span class="text-[10px] text-slate-400 dark:text-slate-500 font-medium mt-0.5">
                  {{ order.date }}
                </span>
              </div>
            </div>

            <!-- Right Side: Money & Status -->
            <div class="flex flex-col items-end shrink-0 pl-2">
              <span class="font-black text-shopee-orange text-[14px] leading-tight">
                +{{ formatMoney(order.cashbackAmount) }}<span class="underline ml-0.5">đ</span>
              </span>
              <div class="flex items-center gap-0.5 mt-1.5">
                <span
                  class="text-[11px] font-bold"
                  :class="[
                    order.status === 'Thành công'
                      ? 'text-emerald-500 dark:text-emerald-400'
                      : order.status === 'Chờ duyệt'
                      ? 'text-amber-500 dark:text-amber-400'
                      : 'text-rose-500 dark:text-rose-455',
                  ]"
                >
                  {{ order.status }}
                </span>
                <UIcon name="i-lucide-chevron-right" class="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="lastPage > 1" class="flex items-center justify-center gap-2 mt-6">
          <UButton
            icon="i-lucide-chevron-left"
            :disabled="currentPage === 1"
            variant="outline"
            color="neutral"
            @click="changePage(currentPage - 1)"
          />
          <span class="text-xs font-semibold text-slate-600 dark:text-slate-400 px-2">
            Trang {{ currentPage }} / {{ lastPage }}
          </span>
          <UButton
            icon="i-lucide-chevron-right"
            :disabled="currentPage === lastPage"
            variant="outline"
            color="neutral"
            @click="changePage(currentPage + 1)"
          />
        </div>
      </div>

      <!-- Empty state -->
      <div v-else class="py-16 flex flex-col items-center justify-center text-center">
        <template v-if="activeTab === 'pending'">
          <div class="relative">
            <div class="h-16 w-16 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-shopee-orange shadow-inner">
              <UIcon name="i-lucide-shopping-bag" class="h-7 w-7" />
            </div>
            <div class="absolute -top-1.5 -right-1.5 h-6 w-6 rounded-full bg-shopee-orange flex items-center justify-center text-white border-2 border-white dark:border-slate-900 shadow-md">
              <UIcon name="i-lucide-gift" class="h-3.5 w-3.5" />
            </div>
          </div>
          <h3 class="text-[17px] font-black text-slate-800 dark:text-slate-100 mt-5">
            Đừng bỏ lỡ cơ hội hoàn tiền!
          </h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-2.5 max-w-[320px] font-medium leading-relaxed">
            Hãy bắt đầu <b>mua sắm qua Saffi</b> để tích điểm hoàn tiền ngay cho đơn mua sắm của bạn.
          </p>
          <UButton
            to="/hoan-tien"
            size="lg"
            icon="i-lucide-sparkles"
            class="mt-6 font-bold shadow-lg shadow-orange-500/20"
          >
            MUA SẮM HOÀN TIỀN NGAY
          </UButton>
        </template>

        <template v-else>
          <div class="h-16 w-16 rounded-full bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400">
            <UIcon name="i-lucide-frown" class="h-8 w-8" />
          </div>
          <h3 class="text-xs font-bold text-slate-700 dark:text-slate-300 mt-4">
            Không tìm thấy đơn hàng nào
          </h3>
          <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 max-w-[280px]">
            Chưa có đơn hàng nào trong trạng thái này.
          </p>
        </template>
      </div>
    </UCard>

    <!-- User Order Details Drawer -->
    <USlideover v-model:open="isModalOpen" :ui="{ content: 'w-full sm:max-w-md' }">
      <template #content>
        <UCard
          v-if="selectedOrder"
          :ui="{
            body: 'p-6 space-y-6 flex-1 overflow-y-auto bg-white dark:bg-slate-950',
            header: 'flex items-start justify-between px-6 py-5 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 shrink-0'
          }"
          class="flex flex-col h-full overflow-hidden border border-slate-100 dark:border-slate-800/80"
        >
          <template #header>
            <div>
              <UBadge
                size="xs"
                variant="soft"
                :color="
                  selectedOrder.status === 'Thành công' || selectedOrder.status === 'Completed'
                    ? 'success'
                    : selectedOrder.status === 'Chờ duyệt'
                    ? 'warning'
                    : 'danger'
                "
                class="font-black uppercase tracking-wider mb-2 text-[9px] px-2.5 py-1 rounded-full"
              >
                {{
                  selectedOrder.status === "Completed" || selectedOrder.status === "Thành công"
                    ? "HOÀN THÀNH"
                    : selectedOrder.status
                }}
              </UBadge>
              <h3 class="text-base font-black text-slate-800 dark:text-slate-100">
                Chi tiết đơn hàng
                <span class="text-orange-500 dark:text-orange-400 select-all">#{{ selectedOrder.code }}</span>
              </h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">
                Cửa hàng: {{ selectedOrder.storeName || "Shopee Store" }}
              </p>
            </div>
            <UButton
              color="neutral"
              variant="ghost"
              icon="i-lucide-x"
              class="rounded-lg"
              @click="closeOrderDetails"
            />
          </template>

          <div class="space-y-6 select-none pr-1">
            <!-- 1. Rank Discount rate Info -->
            <div
              v-if="selectedOrder.rawItem?.order?.userRank"
              class="bg-slate-50/50 dark:bg-slate-955/20 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex items-center justify-between"
            >
              <div class="flex flex-col">
                <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest">Hạng thành viên mua đơn</span>
                <span class="text-xs font-black text-slate-800 dark:text-slate-200 mt-1">
                  Cấp bậc: {{ getRankName(selectedOrder.rawItem.order.userRank) }}
                </span>
              </div>
              <UBadge
                size="xs"
                variant="subtle"
                class="font-extrabold text-[9px] px-2.5 py-1 rounded-full"
              >
                Nhận {{ selectedOrder.rawItem.order.commissionRate }}% hoa hồng
              </UBadge>
            </div>

            <!-- 2. Product Details -->
            <div>
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Thông tin sản phẩm</span>
              <div class="space-y-2 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div class="text-xs font-bold text-slate-700 dark:text-slate-205 leading-relaxed">
                  {{ selectedOrder.itemName || "Sản phẩm từ Shopee" }}
                </div>
                <div class="flex items-center gap-1.5 text-[10px] text-slate-450 dark:text-slate-500 mt-2">
                  <span v-if="selectedOrder.rawItem?.order?.itemId">Mã SP: {{ selectedOrder.rawItem.order.itemId }}</span>
                  <span
                    v-if="selectedOrder.rawItem?.order?.l1GlobalCategory"
                    class="h-1 w-1 bg-slate-300 dark:bg-slate-700 rounded-full"
                  ></span>
                  <span v-if="selectedOrder.rawItem?.order?.l1GlobalCategory">
                    Danh mục: {{ selectedOrder.rawItem.order.l1GlobalCategory }}
                  </span>
                </div>
              </div>
            </div>

            <!-- 3. Financial Info Grid -->
            <div>
              <span class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2.5">Chi tiết tích lũy hoàn tiền</span>
              <div class="grid grid-cols-2 gap-3.5">
                <div class="bg-shopee-orange/5 dark:bg-shopee-orange/10 p-4 rounded-2xl border border-shopee-orange/10 dark:border-shopee-orange/20 text-center col-span-2 shadow-sm">
                  <span class="text-[9px] font-black text-shopee-orange uppercase block tracking-widest">Tiền hoàn bạn nhận được</span>
                  <span class="text-base font-black text-shopee-orange block mt-1.5">
                    +{{ formatMoney(selectedOrder.cashbackAmount) }}đ
                  </span>
                </div>
              </div>
            </div>

            <!-- 4. Date Info -->
            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex flex-col gap-2 text-[10px] text-slate-450 dark:text-slate-500 font-bold">
              <div>Thời gian đặt hàng: {{ selectedOrder.date }}</div>
              <div>Trạng thái đối soát: {{ selectedOrder.status }}</div>
            </div>
          </div>
        </UCard>
      </template>
    </USlideover>
  </div>
</template>

<script setup>
import { ref, computed, watch, onUnmounted } from "vue";
import { AFFILIATE_TYPES } from "~/utils/constants";

const getBrandLogo = (type) => {
  if (type === AFFILIATE_TYPES.TIKTOK) return "/icon/tiktok.png";
  if (type === AFFILIATE_TYPES.LAZADA) return "/icon/lazada.png";
  return "/icon/shopee.png";
};

useSeoMeta({
  title: "Lịch sử đơn hàng - Saffi",
  ogTitle: "Lịch sử đơn hàng - Saffi",
  description:
    "Trình theo dõi và quản lý toàn bộ các đơn hàng hoàn tiền từ Shopee.",
  ogDescription:
    "Trình theo dõi và quản lý toàn bộ các đơn hàng hoàn tiền từ Shopee.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const activeTab = ref("pending");
const currentPage = ref(1);

const tabs = [
  {
    label: "Chờ duyệt",
    value: "pending",
    icon: "i-lucide-clock",
  },
  {
    label: "Thành công",
    value: "success",
    icon: "i-lucide-circle-check",
  },
  {
    label: "Đã hủy",
    value: "cancelled",
    icon: "i-lucide-circle-x",
  },
];

const statusStyles = {
  "Thành công":
    "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/15",
  "Chờ duyệt":
    "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15",
  "Đã hủy":
    "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/15",
};

const statusMap = {
  pending: "Pending",
  success: "Completed",
  cancelled: "Cancelled",
};

const { api } = useAppFetch();
const queryParams = computed(() => ({
  status: statusMap[activeTab.value],
  page: currentPage.value,
}));

const { data: response, status } = useLazyAsyncData(
  "user-orders",
  () => api.get("/order", { query: queryParams.value }),
  {
    watch: [activeTab, currentPage], // Tự động gọi lại API khi chuyển tab hoặc trang
    server: false,
  }
);

const lastPage = computed(() => response.value?.data?.last_page || 1);
const totalOrders = computed(() => response.value?.data?.total || 0);

const changePage = (page) => {
  if (page < 1 || page > lastPage.value) return;
  currentPage.value = page;
};

watch(activeTab, () => {
  currentPage.value = 1;
});

const rawOrders = computed(() => {
  const res = response.value;
  if (!res) return [];
  if (res.data && Array.isArray(res.data.data)) return res.data.data;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res)) return res;
  return [];
});

const mapOrder = (item) => {
  const order = item.order || item;

  // Format date
  let dateStr = "N/A";
  const time = order.order_time;
  if (time) {
    const d = new Date(time);
    dateStr = `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${d.getFullYear()} ${d
      .getHours()
      .toString()
      .padStart(2, "0")}:${d.getMinutes().toString().padStart(2, "0")}`;
  }

  // Normalize status cho UI hiển thị đẹp tiếng Việt
  let normStatus = "Chờ duyệt";
  const s = order.order_status?.toLowerCase() || "";

  if (s.includes("completed") || s.includes("Completed")) {
    normStatus = "Thành công";
  } else if (s.includes("cancelled") || s.includes("Cancelled")) {
    normStatus = "Đã hủy";
  }

  return {
    code: order.order_id || "N/A",
    storeName: order.shop_name || "Shopee",
    itemName: order.product_name,
    date: dateStr,
    purchaseAmount: order.purchase_value || 0,
    cashbackAmount: order.user_commission || 0,
    status: normStatus,
    type: order.type || 1,
    rawItem: item,
  };
};

// Sử dụng trực tiếp orders vì Backend đã filter rồi
const filteredOrders = computed(() => rawOrders.value.map(mapOrder));

const formatMoney = (val) => {
  if (!val) return "0";
  return Math.round(Number(val)).toLocaleString("vi-VN");
};

const selectedOrder = ref(null);

const isModalOpen = computed({
  get: () => !!selectedOrder.value,
  set: (val) => {
    if (!val) selectedOrder.value = null;
  }
});

const openOrderDetails = (orderItem) => {
  selectedOrder.value = orderItem;
};

const closeOrderDetails = () => {
  selectedOrder.value = null;
};



const getRankName = (rank) => {
  if (!rank) return "BẠC";
  const r = rank.toLowerCase();
  if (r === "obsidian") return "TINH HOA";
  if (r === "gold") return "VÀNG";
  return "BẠC";
};
</script>
