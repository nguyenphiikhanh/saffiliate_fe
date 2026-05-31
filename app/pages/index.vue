<template>
  <div class="w-full flex flex-col gap-6 animate-fade-in-up">
    <!-- User Welcome & Rank Status Section (Visible to logged in users) -->
    <div
      v-if="session?.user"
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
              v-if="session?.user?.rank === 'obsidian'"
              class="font-bold text-[#1e293b] dark:text-white"
              >{{ session?.user?.completedOrdersCount ?? 0 }}</span
            >
            <span v-else class="font-bold text-[#1e293b] dark:text-white"
              >{{ session?.user?.completedOrdersCount ?? 0 }} /
              {{ rankProgress.nextThreshold }}</span
            >
          </div>

          <div class="text-[13px] text-[#8c9eb4] dark:text-slate-500">
            <span v-if="session?.user?.rank === 'obsidian'">
              Đã đạt cấp bậc
              <strong class="text-[#ea580c] font-bold uppercase tracking-tight"
                >TỐI ĐA</strong
              >
            </span>
            <span v-else-if="(session?.user?.ordersToNextRank ?? 0) > 0">
              Hoàn thành
              <strong class="text-[#1e293b] dark:text-white font-bold">{{
                session.user.ordersToNextRank
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

    <!-- User Statistics (Nhỏ xinh) -->
    <div
      v-if="session?.user"
      class="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6"
    >
      <!-- Completed Orders -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3.5">
          <div
            class="h-10 w-10 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-500 flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wide"
            >
              Đơn thành công
            </p>
            <p
              class="text-xl font-black text-slate-800 dark:text-white leading-tight mt-0.5"
            >
              {{ session?.user?.completedOrdersCount ?? 0 }}
            </p>
          </div>
        </div>
      </div>

      <!-- Available Balance -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3.5">
          <div
            class="h-10 w-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wide"
            >
              Số dư khả dụng
            </p>
            <p
              class="text-xl font-black text-slate-800 dark:text-white leading-tight mt-0.5"
            >
              {{ formatMoney(walletData?.availableBalance ?? 0) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Total Withdrawn -->
      <div
        class="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3.5">
          <div
            class="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-500 flex items-center justify-center shrink-0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
          <div>
            <p
              class="text-[11px] font-bold text-slate-400 uppercase tracking-wide"
            >
              Đã thanh toán
            </p>
            <p
              class="text-xl font-black text-slate-800 dark:text-white leading-tight mt-0.5"
            >
              {{ formatMoney(walletData?.totalPaid ?? 0) }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Original Premium Welcome Dashboard Card -->
    <div
      class="glass-panel rounded-[32px] p-8 md:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] text-center relative overflow-hidden transition-all duration-500 border border-slate-200/60 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl"
    >
      <!-- Brand Identity Brandmark -->
      <div class="flex justify-center mb-6">
        <div
          class="flex h-20 w-20 items-center justify-center shrink-0 cursor-pointer transition-transform duration-500 hover:rotate-12 select-none group"
        >
          <img
            src="/saficon.png"
            class="h-20 w-20 object-contain rounded-[24px] shadow-sm transition-transform duration-300 group-hover:scale-105"
            alt="Saffi Logo"
          />
        </div>
      </div>

      <!-- Welcome Slogan & Copy -->
      <h1
        class="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tighter leading-[1.1] select-none mb-5 transition-colors duration-400"
      >
        Chào mừng bạn đến với <span class="text-shopee-orange">Saffi</span>
      </h1>

      <p
        class="text-base md:text-lg text-slate-500 dark:text-slate-400 font-medium max-w-[60ch] mx-auto mb-10 leading-relaxed transition-colors duration-400"
      >
        Hệ thống quy đổi link mua sắm thông minh. Tự động nhận hoàn tiền và
        chiết khấu hấp dẫn trực tiếp khi bạn thực hiện mua hàng qua liên kết
        tiếp thị.
      </p>

      <!-- Key Benefits Bento Grid -->
      <div
        class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto mb-12 text-left"
      >
        <!-- Benefit 1 (Hero Item - spans full width on desktop) -->
        <div
          class="md:col-span-2 p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <div
            class="h-12 w-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              class="h-6 w-6"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div>
            <h3
              class="text-base md:text-lg font-bold text-slate-900 dark:text-white mb-1.5 group-hover:text-shopee-orange transition-colors"
            >
              Tốc Độ Siêu Tốc
            </h3>
            <p class="text-sm text-slate-500 leading-relaxed max-w-[50ch]">
              Hệ thống máy chủ tối ưu hóa giúp quy đổi và xuất mã link tiếp thị
              nhận hoàn tiền chỉ trong
              <span class="font-semibold text-slate-700 dark:text-slate-300"
                >chưa đầy 3 giây</span
              >.
            </p>
          </div>
        </div>

        <!-- Benefit 2 -->
        <div
          class="p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group"
        >
          <div
            class="h-10 w-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3
            class="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors"
          >
            Tối Ưu Chiết Khấu
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            Nhận mức hoa hồng cao nhất thị trường, cam kết chia sẻ lên đến
            <b>90%</b> doanh thu.
          </p>
        </div>

        <!-- Benefit 3 -->
        <div
          class="p-6 md:p-8 rounded-[24px] bg-slate-50/80 dark:bg-slate-950/40 border border-slate-100 dark:border-slate-800/60 hover:bg-white dark:hover:bg-slate-900 transition-colors duration-400 group"
        >
          <div
            class="h-10 w-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
          >
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
          </div>
          <h3
            class="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors"
          >
            An Toàn Tuyệt Đối
          </h3>
          <p class="text-sm text-slate-500 leading-relaxed">
            Đảm bảo bảo mật tài khoản tuyệt đối và đối soát lịch sử giao dịch
            minh bạch từng đồng.
          </p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <NuxtLink
          to="/hoan-tien"
          class="w-full sm:w-auto px-8 py-4 bg-shopee-orange hover:bg-shopee-orange-hover border border-shopee-orange text-white font-bold text-sm tracking-wide uppercase rounded-2xl transition-premium active:scale-98 cursor-pointer shadow-lg shadow-orange-500/20 glow-orange-button flex items-center justify-center gap-2 select-none"
        >
          <span>Mua sắm hoàn tiền ngay</span>
          <svg
            class="h-4 w-4 shrink-0 transition-transform duration-300 hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            stroke-width="2.5"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </NuxtLink>

        <a
          href="https://shopee.vn"
          target="_blank"
          rel="noopener noreferrer"
          class="w-full sm:w-auto px-8 py-4 bg-slate-50 hover:bg-slate-100 dark:bg-slate-950/60 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-sm tracking-wide uppercase rounded-2xl transition-premium active:scale-98 cursor-pointer flex items-center justify-center gap-2 select-none"
        >
          <span>Đến Shopee</span>
          <svg
            class="h-4 w-4 shrink-0 text-slate-400 dark:text-slate-500"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { authClient } from "@/utils/auth-client";

const { walletData, fetchWallet } = useWallet();

onMounted(() => {
  fetchWallet();
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

const { data: session } = await authClient.useSession(useFetch);
const userName = computed(() => session.value?.user?.name || "bạn");
const userAvatar = computed(() => session.value?.user?.image || "");
const firstLetter = computed(() => userName.value.charAt(0).toUpperCase());

const rankInfo = computed(() => {
  const rank = session.value?.user?.rank || "silver";
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
  const count = session.value?.user?.completedOrdersCount ?? 0;
  const rank = session.value?.user?.rank || "silver";

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
