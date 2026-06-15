<template>
  <div class="w-full flex flex-col gap-6 animate-fade-in-up">
    <!-- User Welcome & Rank Status Section (Visible to logged in users) -->
    <div
      v-if="user"
      class="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"
    >
      <!-- Card 1: Welcome & Actions -->
      <div
        class="lg:col-span-2 bg-[#FFFAF3] dark:bg-slate-900 border border-orange-100/50 dark:border-slate-800 rounded-[24px] p-5 sm:p-7 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow"
      >
        <!-- Decorative abstract glow -->
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-orange-400/5 dark:bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
        ></div>

        <div
          class="flex items-start sm:items-center gap-4 relative z-10 w-full"
        >
          <!-- Avatar -->
          <div
            class="h-14 w-14 shrink-0 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-2xl shadow-sm border-[3px] border-white dark:border-slate-800 overflow-hidden"
          >
            <img
              v-if="userAvatar"
              :src="userAvatar"
              class="h-full w-full object-cover"
              referrerpolicy="no-referrer"
            />
            <span v-else>{{ firstLetter }}</span>
          </div>

          <!-- Info -->
          <div class="flex-1">
            <h2
              class="text-xl font-bold text-slate-800 dark:text-slate-100 mb-1 tracking-tight"
            >
              Xin chào, {{ userName }}!
            </h2>
            <p
              class="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed max-w-lg"
            >
              Rank
              <strong class="text-shopee-orange">{{ rankInfo.name }}</strong>
              &middot; Hoàn
              <strong class="text-shopee-orange"
                >{{ rankProgress.normalRate }}%</strong
              >
              thưởng &middot;
              <strong class="text-shopee-orange"
                >{{ rankProgress.promoRate }}%</strong
              >
              hoa hồng ngày đôi, 1, 15, 25 hàng tháng..
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div
          class="flex flex-row gap-3 w-full md:w-auto shrink-0 relative z-10 mt-1 md:mt-0"
        >
          <NuxtLink
            to="/hoan-tien"
            class="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-[#f05d40] hover:bg-[#e0482a] text-white text-[13px] font-bold uppercase tracking-wide rounded-[100px] transition-all shadow-[0_8px_24px_-6px_rgba(240,93,64,0.6)] hover:shadow-[0_12px_28px_-6px_rgba(240,93,64,0.7)] active:scale-95 group"
          >
            MUA SẮM HOÀN TIỀN NGAY
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </NuxtLink>
        </div>
      </div>

      <!-- Card 2: Rank Progress -->
      <div
        class="lg:col-span-1 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[24px] p-5 flex items-center gap-5 shadow-sm group hover:shadow-md transition-shadow"
      >
        <!-- Circular Progress Chart -->
        <div
          class="relative w-[100px] h-[100px] shrink-0 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800"
          :style="{
            background: `conic-gradient(#f97316 ${rankProgress.percent}%, #e2e8f0 ${rankProgress.percent}%)`,
          }"
        >
          <!-- inner circle cutout -->
          <div
            class="absolute inset-[10px] bg-white dark:bg-slate-900 rounded-full flex items-center justify-center overflow-hidden border-[2px] border-white dark:border-slate-900"
          >
            <img
              :src="rankInfo.image"
              :alt="rankInfo.name"
              class="w-14 h-14 object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        </div>

        <!-- Rank Stats -->
        <div class="flex-1 flex flex-col justify-center">
          <div
            class="text-[11px] font-extrabold text-[#8c9eb4] uppercase tracking-wide mb-0.5"
          >
            XẾP HẠNG
          </div>
          <div
            class="text-2xl md:text-[26px] font-black text-[#1e293b] dark:text-white uppercase tracking-tight leading-none mb-2"
          >
            {{ rankInfo.name }}
          </div>

          <div
            class="text-[13px] text-[#64748b] dark:text-slate-400 font-medium"
          >
            Đơn hàng:
            <span
              v-if="user.rank === 'obsidian'"
              class="font-bold text-[#1e293b] dark:text-white"
              >{{ user.completedOrdersCount ?? 0 }}</span
            >
            <span v-else class="font-bold text-[#1e293b] dark:text-white"
              >{{ user.completedOrdersCount ?? 0 }} /
              {{ rankProgress.nextThreshold }}</span
            >
          </div>

          <div class="text-[13px] text-[#8c9eb4] dark:text-slate-500">
            <span v-if="user.rank === 'obsidian'">
              Đã đạt cấp bậc
              <strong class="text-[#ea580c] font-bold uppercase tracking-tight"
                >TỐI ĐA</strong
              >
            </span>
            <span v-else-if="(user.ordersToNextRank ?? 0) > 0">
              Hoàn thành
              <strong class="text-[#1e293b] dark:text-white font-bold">{{
                user.ordersToNextRank
              }}</strong>
              đơn hàng nữa để lên hạng
              <strong
                class="text-[#ea580c] font-bold uppercase tracking-tight"
                >{{ rankProgress.nextRankName }}</strong
              >
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Dashboard -->
    <div
      v-if="user"
      class="w-full mt-6 mb-12 animate-fade-in-up"
      style="animation-delay: 0.1s"
    >
      <!-- Leaderboard Card Container -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-[24px] p-5 md:p-7 shadow-sm mb-12 flex flex-col gap-6"
      >
        <!-- Section Header Inside Card -->
        <div
          class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800/80"
        >
          <div>
            <h2
              class="text-xl md:text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight flex items-center gap-2"
            >
              🏆 Bảng Xếp Hạng
            </h2>
          </div>

          <!-- Tabs -->
          <div
            class="inline-flex bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl shadow-inner"
          >
            <button
              @click="activeTab = 'allTime'"
              :class="[
                'px-4 py-2 text-[13px] font-bold rounded-lg transition-all duration-300',
                activeTab === 'allTime'
                  ? 'bg-white dark:bg-slate-700 text-shopee-orange shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
              ]"
            >
              Tất Cả
            </button>
            <button
              @click="activeTab = 'monthly'"
              :class="[
                'px-4 py-2 text-[13px] font-bold rounded-lg transition-all duration-300',
                activeTab === 'monthly'
                  ? 'bg-white dark:bg-slate-700 text-shopee-orange shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200',
              ]"
            >
              Tháng Này
            </button>
          </div>
        </div>

        <!-- Leaderboard List -->
        <div v-if="currentLeaderboard.length > 0" class="flex flex-col gap-4">
          <div
            v-for="(user, idx) in currentLeaderboard"
            :key="user.userId"
            class="flex items-center justify-between transition-all duration-300 group relative overflow-hidden"
            :class="{
              'border border-amber-400 dark:border-amber-500/50 bg-gradient-to-r from-amber-50/50 via-amber-50/10 to-transparent dark:from-amber-950/20 dark:via-amber-950/5 dark:to-transparent shadow-lg shadow-amber-500/10 hover:shadow-xl hover:shadow-amber-500/20 hover:-translate-y-1 rounded-[20px] p-5':
                idx === 0,
              'border border-slate-300 dark:border-slate-700 bg-gradient-to-r from-slate-50 via-slate-50/20 to-transparent dark:from-slate-800/30 dark:via-slate-800/5 dark:to-transparent shadow-md shadow-slate-400/10 hover:shadow-lg hover:shadow-slate-400/15 hover:-translate-y-0.5 rounded-[20px] p-5':
                idx === 1,
              'border border-orange-300/80 dark:border-orange-900/40 bg-gradient-to-r from-orange-50/30 via-orange-50/5 to-transparent dark:from-orange-950/10 dark:via-orange-950/2 dark:to-transparent shadow-sm hover:shadow-md hover:-translate-y-0.5 rounded-[20px] p-5':
                idx === 2,
              'border-b border-slate-100 dark:border-slate-800 last:border-0 py-4 px-5 hover:bg-slate-50/60 dark:hover:bg-slate-800/40 rounded-xl transition-all':
                idx > 2,
            }"
          >
            <!-- Top Badge Ribbons -->
            <div
              v-if="idx === 0"
              class="absolute top-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-br-lg shadow-sm flex items-center gap-1"
            >
              <span>👑</span>
              {{
                activeTab === "monthly"
                  ? "Chiến Thần Chốt Đơn"
                  : "Huyền Thoại Tích Lũy"
              }}
            </div>
            <div
              v-else-if="idx === 1"
              class="absolute top-0 left-0 bg-gradient-to-r from-slate-400 to-slate-300 text-slate-950 text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-br-lg shadow-sm flex items-center gap-1"
            >
              <span>🥈</span>
              {{
                activeTab === "monthly"
                  ? "Bậc Thầy Săn Deal"
                  : "Triệu Phú Saffi"
              }}
            </div>
            <div
              v-else-if="idx === 2"
              class="absolute top-0 left-0 bg-gradient-to-r from-orange-400 to-orange-300/80 text-white text-[9px] uppercase tracking-wider font-extrabold px-2.5 py-0.5 rounded-br-lg shadow-sm flex items-center gap-1"
            >
              <span>🥉</span>
              {{
                activeTab === "monthly"
                  ? "Tay Đua Hoàn Tiền"
                  : "Chuyên Gia Tiết Kiệm"
              }}
            </div>

            <div
              class="flex items-center gap-2 md:gap-4"
              :class="{ 'mt-2 sm:mt-0': idx <= 2 }"
            >
              <!-- Rank Element -->
              <div
                class="w-16 md:w-20 flex items-center justify-center font-black"
              >
                <template v-if="idx === 0">
                  <div
                    class="flex items-center gap-1 text-amber-500 dark:text-amber-400"
                  >
                    <span class="text-sm md:text-base opacity-80 animate-pulse"
                      >✨</span
                    >
                    <span
                      class="text-3xl md:text-4xl drop-shadow-sm font-black text-transparent bg-clip-text bg-gradient-to-b from-amber-400 to-amber-600"
                      >#1</span
                    >
                    <span
                      class="text-sm md:text-base opacity-80 animate-pulse scale-x-[-1]"
                      >✨</span
                    >
                  </div>
                </template>
                <template v-else-if="idx === 1">
                  <div
                    class="flex items-center gap-1.5 text-slate-400 dark:text-slate-500"
                  >
                    <span class="text-sm md:text-base opacity-60">🌿</span>
                    <span
                      class="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-slate-400 to-slate-500"
                      >#2</span
                    >
                    <span class="text-sm md:text-base opacity-60 scale-x-[-1]"
                      >🌿</span
                    >
                  </div>
                </template>
                <template v-else-if="idx === 2">
                  <div
                    class="flex items-center gap-1.5 text-orange-400 dark:text-orange-500"
                  >
                    <span class="text-sm md:text-base opacity-60">🌿</span>
                    <span
                      class="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-b from-orange-400 to-orange-500"
                      >#3</span
                    >
                    <span class="text-sm md:text-base opacity-60 scale-x-[-1]"
                      >🌿</span
                    >
                  </div>
                </template>
                <template v-else>
                  <span
                    class="text-xl md:text-2xl text-slate-400 dark:text-slate-500 font-bold"
                    >#{{ idx + 1 }}</span
                  >
                </template>
              </div>

              <!-- Avatar & Info -->
              <div class="flex items-center gap-4 md:gap-5">
                <div>
                  <h3
                    class="font-bold text-slate-800 dark:text-slate-100 text-[15px] md:text-[17px]"
                  >
                    {{ user.name }}
                  </h3>
                  <div class="flex items-center gap-2 mt-1">
                    <span
                      class="text-[11px] md:text-[13px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded-md border border-emerald-100 dark:border-emerald-800/50"
                    >
                      {{ user.totalOrders }} đơn hoàn thành
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Reward / Points -->
            <div class="flex flex-col items-end justify-center pr-2 md:pr-4">
              <div
                class="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-emerald-500/30 text-emerald-500 dark:text-emerald-400 mb-1 shadow-sm bg-white dark:bg-slate-900"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 md:h-5 md:w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="3"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <div
                class="font-black text-slate-700 dark:text-slate-200 text-[14px] md:text-[15px]"
              >
                {{ formatMoney(user.totalCommission) }}
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div
          v-else
          class="text-center py-10 text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/20 rounded-[20px] border border-dashed border-slate-200 dark:border-slate-700"
        >
          <div class="text-3xl mb-2 opacity-50">🏃</div>
          Chưa có dữ liệu thống kê cho bảng xếp hạng này.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useAppFetch } from "@/composables/useAppFetch";

const { walletData, fetchWallet } = useWallet();

const activeTab = ref("allTime");
const leaderboardData = ref({ allTime: [], monthly: [] });

const fetchLeaderboard = async () => {
  try {
    const res = await useAppFetch().api.get("/stat/leaderboard");
    if (res.data) {
      leaderboardData.value = res.data;
    }
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
  }
};

const currentLeaderboard = computed(() => {
  return activeTab.value === "monthly"
    ? leaderboardData.value.monthly
    : leaderboardData.value.allTime;
});

const top3 = computed(() => currentLeaderboard.value.slice(0, 3));
const top4To10 = computed(() => currentLeaderboard.value.slice(3, 10));

onMounted(() => {
  fetchWallet();
  fetchLeaderboard();
});

const formatMoney = (val) => {
  if (!val && val !== 0) return "0đ";
  return val.toLocaleString("vi-VN") + "đ";
};

useSeoMeta({
  title: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  ogTitle: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  description:
    "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogDescription:
    "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const userName = computed(() => user.value?.name || "bạn");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => userName.value.charAt(0).toUpperCase());

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      image: "/saffi_obsidian.png",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      image: "/saffi_gold.png",
    };
  } else {
    return {
      name: "BẠC",
      image: "/saffi_silver.png",
    };
  }
});

const rankProgress = computed(() => {
  const count = user.value?.completedOrdersCount ?? 0;
  const rank = user.value?.rank || "silver";

  let nextRankName = "";
  let nextThreshold = 0;
  let percent = 0;
  let normalRate = 60;
  let promoRate = 70;

  if (rank === "obsidian") {
    nextRankName = "ĐẠT ĐỈNH";
    nextThreshold = 50;
    percent = 100;
    normalRate = 80;
    promoRate = 90;
  } else if (rank === "gold") {
    nextRankName = "TINH HOA";
    nextThreshold = 50;
    percent = Math.min(Math.round((count / 50) * 100), 100);
    normalRate = 70;
    promoRate = 80;
  } else {
    nextRankName = "VÀNG";
    nextThreshold = 10;
    percent = Math.min(Math.round((count / 10) * 100), 100);
    normalRate = 60;
    promoRate = 70;
  }

  return {
    nextRankName,
    nextThreshold,
    percent,
    normalRate,
    promoRate,
  };
});
</script>

<style scoped>
/* Smooth and premium transition */
.transition-premium {
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}
</style>
