<template>
  <div class="home-page animate-fade-in-up">
    <!-- User Welcome & Rank Section -->
    <div v-if="user" class="welcome-grid">
      <!-- Card 1: Welcome & Actions -->
      <div class="welcome-card">
        <!-- Decorative abstract glow -->
        <div class="welcome-card-glow bg-decoration blur-decoration"></div>

        <div class="welcome-info">
          <!-- Avatar: explicit 56x56 prevents CLS -->
          <div class="welcome-avatar">
            <NuxtImg
              v-if="userAvatar"
              :src="userAvatar"
              width="56"
              height="56"
              class="welcome-avatar-img"
              referrerpolicy="no-referrer"
              loading="eager"
              fit="cover"
              format="webp"
              :alt="userName"
            />
            <span v-else class="welcome-avatar-letter">{{ firstLetter }}</span>
          </div>

          <!-- Info -->
          <div class="welcome-text">
            <h2 class="welcome-name">Xin chào, {{ userName }}!</h2>
            <p class="welcome-desc">
              Rank
              <strong class="text-shopee-orange">{{ rankInfo.name }}</strong>
              &middot; Hoàn
              <strong class="text-shopee-orange">{{ rankProgress.normalRate }}%</strong>
              thưởng &middot;
              <strong class="text-shopee-orange">{{ rankProgress.promoRate }}%</strong>
              hoa hồng ngày đôi, 1, 15, 25 hàng tháng..
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="welcome-actions">
          <a-button
            type="primary"
            size="large"
            class="welcome-cta-btn flex items-center justify-center gap-2 no-underline hover:no-underline"
            href="/hoan-tien"
          >
            <span>MUA SẮM HOÀN TIỀN NGAY</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a-button>
        </div>
      </div>

      <!-- Card 2: Rank Progress -->
      <div class="rank-card">
        <!-- Circular Progress Chart -->
        <div
          class="rank-ring"
          :style="{
            background: `conic-gradient(#EE4D2D ${rankProgress.percent}%, #E2E8F0 ${rankProgress.percent}%)`,
          }"
        >
          <div class="rank-ring-inner">
            <!-- Explicit 56x56 prevents CLS jump when image loads -->
            <NuxtImg
              :src="rankInfo.image"
              :alt="rankInfo.name"
              width="56"
              height="56"
              class="rank-ring-img"
              loading="eager"
              fit="contain"
              format="webp"
            />
          </div>
        </div>

        <!-- Rank Stats -->
        <div class="rank-stats">
          <div class="rank-stats-label">XẾP HẠNG</div>
          <div class="rank-stats-name">{{ rankInfo.name }}</div>

          <div class="rank-stats-orders">
            Đơn hàng:
            <span v-if="user.rank === 'obsidian'" class="rank-stats-value">{{
              user.completed_orders_count ?? 0
            }}</span>
            <span v-else class="rank-stats-value">
              {{ user.completed_orders_count ?? 0 }} / {{ rankProgress.nextThreshold }}
            </span>
          </div>

          <div class="rank-stats-next">
            <span v-if="user.rank === 'obsidian'">
              Đã đạt cấp bậc <strong style="color: #ee4d2d">TỐI ĐA</strong>
            </span>
            <span v-else-if="(user.ordersToNextRank ?? 0) > 0">
              Hoàn thành
              <strong class="rank-value">{{ user.ordersToNextRank }}</strong>
              đơn nữa để lên hạng
              <strong style="color: #ee4d2d; text-transform: uppercase">{{
                rankProgress.nextRankName
              }}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaderboard: lazy-mounted only when it scrolls near the viewport.
         This defers the heavy list render + API call from the initial page load,
         cutting main-thread work on mobile significantly. -->
    <div v-if="user" ref="leaderboardRef" class="leaderboard-placeholder">
      <LazyHomeLeaderboard v-if="leaderboardVisible" />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const { fetchWallet } = useWallet();

// IntersectionObserver-based lazy activation for the leaderboard section.
// The component and its API call only fire when the user scrolls within
// 200px of it — keeping Time-to-Interactive fast on mobile.
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
.home-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Welcome Grid */
.welcome-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 1024px) {
  .welcome-grid {
    grid-template-columns: 2fr 1fr;
    gap: 1.5rem;
  }
}

.welcome-card {
  background: #fffaf3;
  border: 1px solid rgba(251, 146, 60, 0.1);
  border-radius: 1.5rem;
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  position: relative;
  overflow: hidden;
  transition: box-shadow 0.3s ease;
}

@media (min-width: 640px) {
  .welcome-card {
    padding: 1.75rem;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.welcome-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.welcome-card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 16rem;
  height: 16rem;
  background: rgba(251, 146, 60, 0.06);
  border-radius: 50%;
  transform: translate(33%, -50%);
  pointer-events: none;
  filter: blur(60px);
}

.welcome-info {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  flex: 1;
  min-width: 0;
  position: relative;
  z-index: 1;
}

@media (min-width: 640px) {
  .welcome-info {
    align-items: center;
  }
}

.welcome-avatar {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #ec407a;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 24px;
  border: 3px solid white;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

:deep(.welcome-avatar-img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.welcome-avatar-letter {
  font-size: 24px;
  font-weight: 700;
}

.welcome-text {
  flex: 1;
  min-width: 0;
}

.welcome-name {
  font-size: 20px;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 4px;
  letter-spacing: -0.025em;
}

.welcome-desc {
  font-size: 13px;
  color: #64748b;
  line-height: 1.5;
  margin: 0;
  max-width: 32rem;
}

.welcome-actions {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
}

.welcome-cta-btn {
  height: 44px !important;
  font-weight: 700 !important;
  font-size: 13px !important;
  letter-spacing: 0.08em !important;
  border-radius: 9999px !important;
  box-shadow: 0 8px 24px -6px rgba(238, 77, 45, 0.5) !important;
  white-space: nowrap;
}

/* Rank Card */
.rank-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 1.5rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: box-shadow 0.3s ease;
}

.rank-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.04);
}

.rank-ring {
  position: relative;
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank-ring-inner {
  position: absolute;
  inset: 10px;
  background: white;
  border-radius: 50%;
  border: 2px solid white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

:deep(.rank-ring-img) {
  width: 56px;
  height: 56px;
  object-fit: contain;
  transition: transform 0.5s ease;
}

.rank-card:hover :deep(.rank-ring-img) {
  transform: scale(1.1);
}

.rank-stats {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.rank-stats-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #8c9eb4;
}

.rank-stats-name {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  line-height: 1;
  margin: 4px 0 8px;
}

.rank-stats-orders {
  font-size: 13px;
  color: #64748b;
  font-weight: 500;
}

.rank-stats-value {
  font-weight: 700;
  color: #1e293b;
}

.rank-stats-next {
  font-size: 13px;
  color: #8c9eb4;
  margin-top: 2px;
}

.rank-value {
  font-weight: 700;
  color: #1e293b;
}

/* Leaderboard placeholder — reserves vertical space to prevent layout jump
   while the lazy component loads in */
.leaderboard-placeholder {
  width: 100%;
  min-height: 80px;
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  .welcome-card,
  .rank-card {
    transition: none;
  }
  :deep(.rank-ring-img) {
    transition: none;
  }
}
</style>
