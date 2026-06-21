<template>
  <div class="home-page animate-fade-in-up">
    <!-- User Welcome & Rank Section -->
    <div v-if="user" class="welcome-grid">
      <!-- Card 1: Welcome & Actions -->
      <div class="welcome-card">
        <!-- Decorative abstract glow -->
        <div class="welcome-card-glow bg-decoration blur-decoration"></div>

        <div class="welcome-info">
          <!-- Avatar -->
          <div class="welcome-avatar">
            <NuxtPicture
              v-if="userAvatar"
              :src="userAvatar"
              :img-attrs="{ class: 'welcome-avatar-img', referrerpolicy: 'no-referrer', loading: 'lazy' }"
            />
            <span v-else class="welcome-avatar-letter">{{ firstLetter }}</span>
          </div>

          <!-- Info -->
          <div class="welcome-text">
            <h2 class="welcome-name">Xin chào, {{ userName }}!</h2>
            <p class="welcome-desc">
              Rank <strong class="text-shopee-orange">{{ rankInfo.name }}</strong>
              &middot; Hoàn <strong class="text-shopee-orange">{{ rankProgress.normalRate }}%</strong>
              thưởng &middot; <strong class="text-shopee-orange">{{ rankProgress.promoRate }}%</strong>
              hoa hồng ngày đôi, 1, 15, 25 hàng tháng..
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="welcome-actions">
          <a-button type="primary" size="large" class="welcome-cta-btn flex items-center justify-center gap-2 no-underline hover:no-underline" href="/hoan-tien">
            <span>MUA SẮM HOÀN TIỀN NGAY</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a-button>
        </div>
      </div>

      <!-- Card 2: Rank Progress -->
      <div class="rank-card">
        <!-- Circular Progress Chart -->
        <div class="rank-ring" :style="{ background: `conic-gradient(#EE4D2D ${rankProgress.percent}%, #E2E8F0 ${rankProgress.percent}%)` }">
          <div class="rank-ring-inner">
            <NuxtPicture
              :src="rankInfo.image"
              :img-attrs="{ alt: rankInfo.name, class: 'rank-ring-img', loading: 'lazy' }"
            />
          </div>
        </div>

        <!-- Rank Stats -->
        <div class="rank-stats">
          <div class="rank-stats-label">XẾP HẠNG</div>
          <div class="rank-stats-name">{{ rankInfo.name }}</div>

          <div class="rank-stats-orders">
            Đơn hàng:
            <span v-if="user.rank === 'obsidian'" class="rank-stats-value">{{ user.completed_orders_count ?? 0 }}</span>
            <span v-else class="rank-stats-value">{{ user.completed_orders_count ?? 0 }} / {{ rankProgress.nextThreshold }}</span>
          </div>

          <div class="rank-stats-next">
            <span v-if="user.rank === 'obsidian'">Đã đạt cấp bậc <strong style="color:#EE4D2D">TỐI ĐA</strong></span>
            <span v-else-if="(user.ordersToNextRank ?? 0) > 0">
              Hoàn thành <strong class="rank-value">{{ user.ordersToNextRank }}</strong> đơn nữa để lên hạng <strong style="color:#EE4D2D;text-transform:uppercase">{{ rankProgress.nextRankName }}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Leaderboard Dashboard -->
    <div v-if="user" class="leaderboard-section animate-fade-in-up" style="animation-delay:0.1s">
      <div class="leaderboard-card">
        <!-- Header -->
        <div class="leaderboard-header">
          <div>
            <h2 class="leaderboard-title">🏆 Bảng Xếp Hạng</h2>
          </div>

          <!-- Tab switcher -->
          <div class="leaderboard-tabs">
            <button
              @click="activeTab = 'allTime'"
              class="leaderboard-tab"
              :class="activeTab === 'allTime' ? 'leaderboard-tab--active' : ''"
            >Tất Cả</button>
            <button
              @click="activeTab = 'monthly'"
              class="leaderboard-tab"
              :class="activeTab === 'monthly' ? 'leaderboard-tab--active' : ''"
            >Tháng Này</button>
          </div>
        </div>

        <!-- Leaderboard List -->
        <div v-if="currentLeaderboard.length > 0" class="leaderboard-list">
          <div
            v-for="(entry, idx) in currentLeaderboard"
            :key="entry.userId"
            class="leaderboard-row"
            :class="{
              'leaderboard-row--gold': idx === 0,
              'leaderboard-row--silver': idx === 1,
              'leaderboard-row--bronze': idx === 2,
              'leaderboard-row--normal': idx > 2,
            }"
          >
            <!-- Top Badge Ribbons -->
            <div v-if="idx === 0" class="leaderboard-ribbon leaderboard-ribbon--gold">👑 {{ activeTab === "monthly" ? "Chiến Thần Chốt Đơn" : "Huyền Thoại Tích Lũy" }}</div>
            <div v-else-if="idx === 1" class="leaderboard-ribbon leaderboard-ribbon--silver">🥈 {{ activeTab === "monthly" ? "Bậc Thầy Săn Deal" : "Triệu Phú Saffi" }}</div>
            <div v-else-if="idx === 2" class="leaderboard-ribbon leaderboard-ribbon--bronze">🥉 {{ activeTab === "monthly" ? "Tay Đua Hoàn Tiền" : "Chuyên Gia Tiết Kiệm" }}</div>

            <div class="leaderboard-row-left" :class="{ 'leaderboard-row-left--ribbon': idx <= 2 }">
              <!-- Rank Number -->
              <div class="leaderboard-rank-num">
                <template v-if="idx === 0">
                  <div class="rank-num rank-num--gold">
                    <span class="rank-sparkle">✨</span>
                    <span class="rank-num-text rank-num-text--gold">#1</span>
                    <span class="rank-sparkle rank-sparkle--flip">✨</span>
                  </div>
                </template>
                <template v-else-if="idx === 1">
                  <div class="rank-num rank-num--silver">
                    <span class="rank-leaf">🌿</span>
                    <span class="rank-num-text rank-num-text--silver">#2</span>
                    <span class="rank-leaf rank-leaf--flip">🌿</span>
                  </div>
                </template>
                <template v-else-if="idx === 2">
                  <div class="rank-num rank-num--bronze">
                    <span class="rank-leaf">🌿</span>
                    <span class="rank-num-text rank-num-text--bronze">#3</span>
                    <span class="rank-leaf rank-leaf--flip">🌿</span>
                  </div>
                </template>
                <template v-else>
                  <span class="rank-num-plain">#{{ idx + 1 }}</span>
                </template>
              </div>

              <!-- Avatar & Info -->
              <div class="leaderboard-user-info">
                <h3 class="leaderboard-user-name">{{ entry.name }}</h3>
                <div style="display:flex;align-items:center;gap:8px;margin-top:4px">
                  <span class="leaderboard-user-orders">{{ entry.totalOrders }} đơn hoàn thành</span>
                </div>
              </div>
            </div>

            <!-- Commission -->
            <div class="leaderboard-commission">
              <div class="leaderboard-check-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              <div class="leaderboard-commission-amount">{{ formatMoney(entry.totalCommission) }}</div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="leaderboard-empty">
          <div class="leaderboard-empty-icon">🏃</div>
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
    if (res.data) leaderboardData.value = res.data;
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
  }
};

const currentLeaderboard = computed(() =>
  activeTab.value === "monthly" ? leaderboardData.value.monthly : leaderboardData.value.allTime
);

onMounted(() => {
  fetchWallet();
  fetchLeaderboard();
});

const formatMoney = (val) => {
  if (!val && val !== 0) return "0đ";
  return Math.round(Number(val)).toLocaleString("vi-VN") + "đ";
};

useSeoMeta({
  title: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  ogTitle: "Saffi - Mua Sắm & Hoàn Tiền Thông Minh",
  description: "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogDescription: "Trang chủ hệ thống Saffi. Hỗ trợ mua sắm thông minh và nhận lại tiền chiết khấu hoàn tiền tự động cực kỳ nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const userName = computed(() => user.value?.name || "bạn");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => userName.value.charAt(0).toUpperCase());

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") return { name: "TINH HOA", image: "/saffi_obsidian.png" };
  if (rank === "gold") return { name: "VÀNG", image: "/saffi_gold.png" };
  return { name: "BẠC", image: "/saffi_silver.png" };
});

const rankProgress = computed(() => {
  const count = user.value?.completed_orders_count ?? 0;
  const rank = user.value?.rank || "silver";

  if (rank === "obsidian") return { nextRankName: "ĐẠT ĐỈNH", nextThreshold: 50, percent: 100, normalRate: 80, promoRate: 90 };
  if (rank === "gold") return { nextRankName: "TINH HOA", nextThreshold: 50, percent: Math.min(Math.round((count / 50) * 100), 100), normalRate: 70, promoRate: 80 };
  return { nextRankName: "VÀNG", nextThreshold: 10, percent: Math.min(Math.round((count / 10) * 100), 100), normalRate: 60, promoRate: 70 };
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
  .welcome-grid { grid-template-columns: 2fr 1fr; gap: 1.5rem; }
}

.welcome-card {
  background: #FFFAF3;
  border: 1px solid rgba(251,146,60,0.1);
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

.welcome-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.04); }

.welcome-card-glow {
  position: absolute;
  top: 0; right: 0;
  width: 16rem; height: 16rem;
  background: rgba(251,146,60,0.06);
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
  .welcome-info { align-items: center; }
}

.welcome-avatar {
  width: 56px;
  height: 56px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #EC407A;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 24px;
  border: 3px solid white;
  overflow: hidden;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
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
  color: #1E293B;
  margin: 0 0 4px;
  letter-spacing: -0.025em;
}

.welcome-desc {
  font-size: 13px;
  color: #64748B;
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
  box-shadow: 0 8px 24px -6px rgba(238,77,45,0.5) !important;
  white-space: nowrap;
}

/* Rank Card */
.rank-card {
  background: white;
  border: 1px solid #F1F5F9;
  border-radius: 1.5rem;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1.25rem;
  transition: box-shadow 0.3s ease;
}

.rank-card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.04); }

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
  color: #8C9EB4;
}

.rank-stats-name {
  font-size: 26px;
  font-weight: 800;
  color: #1E293B;
  text-transform: uppercase;
  letter-spacing: -0.025em;
  line-height: 1;
  margin: 4px 0 8px;
}

.rank-stats-orders {
  font-size: 13px;
  color: #64748B;
  font-weight: 500;
}

.rank-stats-value {
  font-weight: 700;
  color: #1E293B;
}

.rank-stats-next {
  font-size: 13px;
  color: #8C9EB4;
  margin-top: 2px;
}

.rank-value {
  font-weight: 700;
  color: #1E293B;
}

/* Leaderboard */
.leaderboard-section {
  width: 100%;
  margin-bottom: 3rem;
}

.leaderboard-card {
  background: white;
  border: 1px solid #F1F5F9;
  border-radius: 1.5rem;
  padding: 1.25rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.02);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .leaderboard-card { padding: 1.75rem; }
}

.leaderboard-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 1.25rem;
  border-bottom: 1px solid #F1F5F9;
}

@media (min-width: 640px) {
  .leaderboard-header { flex-direction: row; align-items: center; justify-content: space-between; }
}

.leaderboard-title {
  font-size: 22px;
  font-weight: 800;
  color: #1E293B;
  letter-spacing: -0.025em;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (min-width: 768px) {
  .leaderboard-title { font-size: 26px; }
}

.leaderboard-tabs {
  display: flex;
  align-items: center;
  background: #F1F5F9;
  border: 1px solid rgba(226,232,240,0.5);
  border-radius: 9999px;
  padding: 4px;
  flex-shrink: 0;
}

.leaderboard-tab {
  padding: 6px 20px;
  border-radius: 9999px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border: none;
  background: none;
  color: #64748B;
  transition: all 0.2s ease;
}

.leaderboard-tab--active {
  background: #EE4D2D;
  color: white;
  box-shadow: 0 2px 8px rgba(238,77,45,0.3);
}

.leaderboard-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.leaderboard-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.leaderboard-row--gold {
  border: 1px solid rgba(245,158,11,0.4);
  background: linear-gradient(to right, rgba(254,243,199,0.5), rgba(254,243,199,0.1), transparent);
  box-shadow: 0 4px 20px rgba(245,158,11,0.06);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

.leaderboard-row--gold:hover { box-shadow: 0 8px 30px rgba(245,158,11,0.12); transform: translateY(-2px); }

.leaderboard-row--silver {
  border: 1px solid rgba(148,163,184,0.4);
  background: linear-gradient(to right, rgba(248,250,252,1), rgba(248,250,252,0.2), transparent);
  box-shadow: 0 4px 16px rgba(148,163,184,0.08);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

.leaderboard-row--silver:hover { box-shadow: 0 8px 24px rgba(148,163,184,0.12); transform: translateY(-2px); }

.leaderboard-row--bronze {
  border: 1px solid rgba(251,146,60,0.3);
  background: linear-gradient(to right, rgba(255,237,213,0.3), rgba(255,237,213,0.05), transparent);
  border-radius: 1.25rem;
  padding: 1.25rem;
}

.leaderboard-row--bronze:hover { box-shadow: 0 4px 12px rgba(251,146,60,0.08); transform: translateY(-2px); }

.leaderboard-row--normal {
  border-bottom: 1px solid #F1F5F9;
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  transition: background 0.2s ease;
}

.leaderboard-row--normal:last-child { border-bottom: none; }
.leaderboard-row--normal:hover { background: rgba(248,250,252,0.6); }

/* Ribbon */
.leaderboard-ribbon {
  position: absolute;
  top: 0; left: 0;
  padding: 2px 10px;
  border-bottom-right-radius: 8px;
  font-size: 9px;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 4px;
}

.leaderboard-ribbon--gold { background: linear-gradient(to right, #F59E0B, #EAB308); color: #1E293B; }
.leaderboard-ribbon--silver { background: linear-gradient(to right, #94A3B8, #CBD5E1); color: #1E293B; }
.leaderboard-ribbon--bronze { background: linear-gradient(to right, #F97316, rgba(251,146,60,0.8)); color: white; }

.leaderboard-row-left {
  display: flex;
  align-items: center;
  gap: 8px;
}

@media (min-width: 768px) {
  .leaderboard-row-left { gap: 1rem; }
}

.leaderboard-row-left--ribbon { margin-top: 8px; }

@media (min-width: 640px) {
  .leaderboard-row-left--ribbon { margin-top: 0; }
}

.leaderboard-rank-num {
  width: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 800;
}

@media (min-width: 768px) {
  .leaderboard-rank-num { width: 80px; }
}

.rank-num {
  display: flex;
  align-items: center;
  gap: 4px;
}

.rank-num-text { font-weight: 800; }
.rank-num-text--gold { font-size: 36px; color: transparent; background: linear-gradient(to bottom, #FBBF24, #D97706); -webkit-background-clip: text; background-clip: text; }
.rank-num-text--silver { font-size: 28px; color: transparent; background: linear-gradient(to bottom, #94A3B8, #64748B); -webkit-background-clip: text; background-clip: text; }
.rank-num-text--bronze { font-size: 28px; color: transparent; background: linear-gradient(to bottom, #F97316, #EA580C); -webkit-background-clip: text; background-clip: text; }

.rank-sparkle { font-size: 14px; opacity: 0.8; animation: pulse-glow 1.5s infinite; }
.rank-sparkle--flip { transform: scaleX(-1); }
.rank-leaf { font-size: 14px; opacity: 0.6; }
.rank-leaf--flip { transform: scaleX(-1); }
.rank-num-plain { font-size: 20px; color: #94A3B8; font-weight: 700; }

@media (min-width: 768px) {
  .rank-num-plain { font-size: 24px; }
}

@keyframes pulse-glow {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 0.4; }
}

.leaderboard-user-info {}

.leaderboard-user-name {
  font-weight: 700;
  color: #1E293B;
  font-size: 15px;
  margin: 0;
}

@media (min-width: 768px) {
  .leaderboard-user-name { font-size: 17px; }
}

.leaderboard-user-orders {
  font-size: 11px;
  font-weight: 600;
  color: #059669;
  background: rgba(5,150,105,0.07);
  padding: 2px 8px;
  border-radius: 6px;
  border: 1px solid rgba(5,150,105,0.1);
}

@media (min-width: 768px) {
  .leaderboard-user-orders { font-size: 13px; }
}

.leaderboard-commission {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding-right: 4px;
}

@media (min-width: 768px) {
  .leaderboard-commission { padding-right: 1rem; }
}

.leaderboard-check-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgba(16,185,129,0.3);
  color: #10B981;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  background: white;
}

@media (min-width: 768px) {
  .leaderboard-check-icon { width: 40px; height: 40px; }
}

.leaderboard-commission-amount {
  font-weight: 800;
  color: #334155;
  font-size: 14px;
}

@media (min-width: 768px) {
  .leaderboard-commission-amount { font-size: 15px; }
}

.leaderboard-empty {
  text-align: center;
  padding: 2.5rem;
  color: #64748B;
  background: rgba(248,250,252,0.5);
  border-radius: 1.25rem;
  border: 2px dashed #E2E8F0;
}

.leaderboard-empty-icon { font-size: 30px; opacity: 0.5; margin-bottom: 8px; }
</style>
