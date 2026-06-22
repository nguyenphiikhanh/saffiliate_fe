<template>
  <div class="w-full space-y-6">
    <!-- User Welcome & Rank Section -->
    <a-row :gutter="[24, 24]" v-if="user" class="mb-6">
      <!-- Card 1: Welcome & Actions -->
      <a-col :xs="24" :lg="15">
        <a-card :bordered="false" class="h-full rounded-[1.5rem] bg-[#fffaf3] dark:bg-[#ee4d2d]/10 border border-orange-500/10 shadow-sm relative overflow-hidden group">
          <!-- Decorative abstract glow -->
          <div class="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 dark:bg-orange-500/20 rounded-full blur-[60px] translate-x-1/3 -translate-y-1/2 pointer-events-none"></div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10 h-full">
            <div class="flex items-start sm:items-center gap-4 flex-1">
              <!-- Avatar -->
              <div class="w-14 h-14 shrink-0 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold text-2xl border-4 border-white dark:border-slate-800 overflow-hidden shadow-sm">
                <NuxtImg
                  v-if="userAvatar"
                  :src="userAvatar"
                  width="56"
                  height="56"
                  class="w-full h-full object-cover"
                  referrerpolicy="no-referrer"
                  loading="eager"
                  fit="cover"
                  format="webp"
                  :alt="userName"
                />
                <span v-else>{{ firstLetter }}</span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <h2 class="text-xl font-bold text-slate-800 dark:text-slate-100 m-0 mb-1 tracking-tight">Xin chào, {{ userName }}!</h2>
                <p class="text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed m-0 max-w-lg">
                  Rank <strong class="text-[#ee4d2d]">{{ rankInfo.name }}</strong>
                  &middot; Hoàn <strong class="text-[#ee4d2d]">{{ rankProgress.normalRate }}%</strong> thưởng &middot;
                  <strong class="text-[#ee4d2d]">{{ rankProgress.promoRate }}%</strong> hoa hồng ngày đôi, 1, 15, 25 hàng tháng..
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div class="shrink-0 mt-2 sm:mt-0">
              <a-button
                type="primary"
                size="large"
                class="h-11 font-bold text-[13px] tracking-widest rounded-full shadow-lg shadow-orange-500/30 flex items-center gap-2"
                href="/hoan-tien"
              >
                <span>MUA SẮM HOÀN TIỀN NGAY</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a-button>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- Card 2: Rank Progress -->
      <a-col :xs="24" :lg="9">
        <a-card :bordered="false" class="h-full rounded-[1.5rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-center gap-5">
            <!-- Circular Progress Chart -->
            <div
              class="relative w-[100px] h-[100px] shrink-0 rounded-full flex items-center justify-center"
              :style="{ background: `conic-gradient(#EE4D2D ${rankProgress.percent}%, transparent ${rankProgress.percent}%)` }"
            >
              <div class="absolute inset-[10px] bg-white dark:bg-slate-900 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center overflow-hidden">
                <NuxtImg
                  :src="rankInfo.image"
                  :alt="rankInfo.name"
                  width="56"
                  height="56"
                  class="w-14 h-14 object-contain transition-transform duration-500 hover:scale-110"
                  loading="eager"
                  fit="contain"
                  format="webp"
                />
              </div>
              <div class="absolute inset-0 rounded-full border border-slate-100 dark:border-slate-800 -z-10"></div>
            </div>

            <!-- Rank Stats -->
            <div class="flex flex-col flex-1">
              <div class="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">XẾP HẠNG</div>
              <div class="text-[26px] font-extrabold text-slate-800 dark:text-slate-100 uppercase tracking-tight leading-none my-1">{{ rankInfo.name }}</div>

              <div class="text-[13px] text-slate-500 font-medium mt-1">
                Đơn hàng:
                <span v-if="user.rank === 'obsidian'" class="font-bold text-slate-800 dark:text-slate-200">{{ user.completed_orders_count ?? 0 }}</span>
                <span v-else class="font-bold text-slate-800 dark:text-slate-200">
                  {{ user.completed_orders_count ?? 0 }} / {{ rankProgress.nextThreshold }}
                </span>
              </div>

              <div class="text-[13px] text-slate-400 mt-0.5">
                <span v-if="user.rank === 'obsidian'">
                  Đã đạt cấp bậc <strong class="text-[#ee4d2d]">TỐI ĐA</strong>
                </span>
                <span v-else-if="(user.ordersToNextRank ?? 0) > 0">
                  Hoàn thành <strong class="font-bold text-slate-800 dark:text-slate-200">{{ user.ordersToNextRank }}</strong> đơn nữa để lên hạng
                  <strong class="text-[#ee4d2d] uppercase">{{ rankProgress.nextRankName }}</strong>
                </span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Leaderboard -->
    <div v-if="user" ref="leaderboardRef" class="w-full min-h-[80px]">
      <LazyHomeLeaderboard v-if="leaderboardVisible" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const { fetchWallet } = useWallet();

const leaderboardRef = ref(null);
const leaderboardVisible = ref(false);

onMounted(() => {
  fetchWallet();
  if (typeof IntersectionObserver === "undefined" || !leaderboardRef.value) {
    leaderboardVisible.value = true;
    return;
  }
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        leaderboardVisible.value = true;
        observer.disconnect();
      }
    },
    { rootMargin: "200px" }
  );
  observer.observe(leaderboardRef.value);
});

useSeoMeta({
  title: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  ogTitle: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  description: "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const userName = computed(() => user.value?.name || "bạn");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => userName.value.charAt(0).toUpperCase());

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") return { name: "TINH HOA", image: "/saffi_obsidian.webp" };
  if (rank === "gold") return { name: "VÀNG", image: "/saffi_gold.webp" };
  return { name: "BẠC", image: "/saffi_silver.webp" };
});

const rankProgress = computed(() => {
  const count = user.value?.completed_orders_count ?? 0;
  const rank = user.value?.rank || "silver";

  if (rank === "obsidian")
    return { nextRankName: "ĐẠT ĐỈNH", nextThreshold: 50, percent: 100, normalRate: 80, promoRate: 90 };
  if (rank === "gold")
    return {
      nextRankName: "TINH HOA",
      nextThreshold: 50,
      percent: Math.min(Math.round((count / 50) * 100), 100),
      normalRate: 70,
      promoRate: 80,
    };
  return {
    nextRankName: "VÀNG",
    nextThreshold: 10,
    percent: Math.min(Math.round((count / 10) * 100), 100),
    normalRate: 60,
    promoRate: 70,
  };
});
</script>

<style scoped>
/* Optional specific overrides if needed */
</style>
