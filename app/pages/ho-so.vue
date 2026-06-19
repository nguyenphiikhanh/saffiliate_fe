<template>
  <div class="w-full animate-fade-in">
    <!-- Page Title & Header -->
    <div class="mt-6">
      <h1
        class="text-[30px] font-black tracking-tight text-slate-900 dark:text-white leading-tight"
      >
        Hồ Sơ <span class="text-shopee-orange">Cá Nhân</span>
      </h1>
      <p
        class="text-[14px] text-slate-500 dark:text-slate-400 mt-1 font-medium"
      >
        Cấu hình thông tin tài khoản cá nhân và liên kết ngân hàng đối soát mặc
        định.
      </p>
    </div>
    <!-- Dynamic Member Rank Progress Card -->
    <div
      v-if="user"
      class="w-full rounded-[2rem] border border-slate-100 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/60 p-6 md:p-8 mt-6 shadow-xl shadow-slate-900/[0.01] dark:shadow-slate-950/10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden backdrop-blur-md"
    >
      <!-- Decorative rank-colored glow on background -->
      <div
        class="absolute top-1/2 left-0 -translate-y-1/2 w-48 h-48 rounded-full blur-[80px] opacity-10 pointer-events-none"
        :class="rankInfo.glowClass"
      ></div>

      <!-- Left + Middle: Rank Badge Icon + Progress Bar -->
      <div
        class="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full relative z-10"
      >
        <!-- Rank Icon Badge with Hover rotate -->
        <div
          class="h-16 w-16 flex items-center justify-center shrink-0 transition-transform duration-500 hover:rotate-6 select-none"
        >
          <img
            :src="rankInfo.image"
            class="h-16 w-16 object-contain drop-shadow-sm"
            :alt="rankInfo.name"
          />
        </div>

        <!-- Progress Bar Details -->
        <div class="flex-1 w-full text-center sm:text-left">
          <!-- Step indicator: Rank name to Next rank name -->
          <div
            class="flex flex-wrap items-center justify-center sm:justify-start gap-2 font-sans font-black text-sm tracking-wide"
          >
            <span :class="rankInfo.textClass">{{ rankInfo.fullName }}</span>
            <span
              v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'"
              class="text-slate-300 dark:text-slate-700 font-normal"
              >&rarr;</span
            >
            <span
              v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'"
              class="text-shopee-orange"
              >THÀNH VIÊN {{ rankProgress.nextRankName }}</span
            >
          </div>

          <!-- The Custom Progress Bar -->
          <div
            class="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden shadow-inner relative"
          >
            <div
              class="h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: `${rankProgress.percent}%` }"
            ></div>
          </div>

          <!-- Description -->
          <div
            class="flex flex-col sm:flex-row items-center justify-between gap-2 mt-2"
          >
            <p class="text-slate-400 dark:text-slate-550 text-[11px] font-bold">
              <span v-if="user.rank === 'obsidian'">
                Tổng đơn tích lũy:
                <span class="text-slate-700 dark:text-slate-300 font-extrabold"
                  >{{ user.completed_orders_count ?? 0 }} đơn</span
                >
              </span>
              <span v-else>
                <span
                  class="text-slate-700 dark:text-slate-300 font-extrabold"
                  >{{ user.completed_orders_count ?? 0 }}</span
                >
                / {{ rankProgress.nextThreshold }} đơn hàng •
              </span>
            </p>
            <p
              v-if="user.rank === 'obsidian'"
              class="text-[11px] font-extrabold text-emerald-500"
            >
              💎 Hạng Tinh Hoa tối thượng! Hãy duy trì mua sắm để bảo vệ đặc
              quyền chiết khấu cao nhất nhé.
            </p>
            <p
              v-else-if="(user.orders_to_next_rank ?? 0) > 0"
              class="text-[11px] font-bold text-slate-400 dark:text-slate-500"
            >
              Hoàn thành
              <span class="text-shopee-orange font-black">{{
                user.orders_to_next_rank
              }}</span>
              đơn nữa để thăng hạng
            </p>
            <p v-else class="text-[11px] font-extrabold text-emerald-500">
              Đã đạt cấp bậc tối đa 🎉
            </p>
          </div>
        </div>
      </div>

      <!-- Vertical Divider for Desktop -->
      <div
        class="hidden md:block h-12 w-px bg-slate-200 dark:bg-slate-800 shrink-0"
      ></div>

      <!-- Right Side: Commission Rates representation -->
      <div class="flex items-center gap-6 relative z-10 shrink-0 select-none">
        <div class="text-center">
          <span
            class="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block"
            >Chiết khấu ngày thường</span
          >
          <span
            class="text-2xl font-black text-slate-800 dark:text-slate-200 mt-1 block"
          >
            {{ rankProgress.normalRate }}%
          </span>
        </div>
        <div class="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
        <div class="text-center">
          <span
            class="text-[9px] font-extrabold text-shopee-orange uppercase tracking-widest block"
            >Chiết khấu ngày đôi / KM</span
          >
          <span class="text-2xl font-black text-rose-500 mt-1 block">
            {{ rankProgress.promoRate }}%
          </span>
        </div>
      </div>
    </div>

    <!-- MAIN GRID layout -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-8 items-start">
      <!-- COLUMN Left: Profile Summary Avatar (Span 4) -->
      <div
        class="md:col-span-4 rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20 text-center flex flex-col items-center"
      >
        <!-- Avatar Photo Container -->
        <div
          class="h-24 w-24 rounded-full overflow-hidden flex items-center justify-center border-4 border-slate-100 dark:border-slate-800 shadow-md relative group select-none"
        >
          <img
            v-if="userAvatar"
            :src="userAvatar"
            class="h-full w-full object-cover"
            referrerpolicy="no-referrer"
          />
          <div
            v-else
            class="h-full w-full bg-[#EC407A] text-white font-black text-3xl flex items-center justify-center uppercase"
          >
            {{ firstLetter }}
          </div>
        </div>

        <h3
          class="text-sm font-black text-slate-800 dark:text-slate-100 mt-4 truncate max-w-full leading-tight"
        >
          {{ userName }}
        </h3>
        <p
          class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 truncate max-w-full font-bold select-all"
        >
          {{ userEmail }}
        </p>

        <!-- Account Metrics -->
        <div
          class="w-full mt-5 pt-5 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-center gap-2.5 select-none"
        >
          <span
            class="text-[9.5px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider"
            >Ngày tham gia:</span
          >
          <span class="text-xs font-black text-slate-700 dark:text-slate-200">{{
            joinDate
          }}</span>
        </div>
      </div>

      <!-- COLUMN Right: Settings Forms (Span 8) -->
      <div class="md:col-span-8 flex flex-col gap-6">
        <!-- Section 1: User Settings Form -->
        <div
          class="rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20"
        >
          <div
            class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60"
          >
            <h3
              class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none"
            >
              Thông Tin Tài Khoản
            </h3>

            <!-- Toggle Edit Button -->
            <UButton
              type="button"
              @click="handleEditProfileToggle"
              size="xs"
              :variant="isEditingProfile ? 'soft' : 'solid'"
              :color="isEditingProfile ? 'neutral' : 'primary'"
              class="font-extrabold tracking-wider cursor-pointer"
              :icon="isEditingProfile ? 'i-lucide-x' : 'i-lucide-pencil'"
            >
              {{ isEditingProfile ? "HỦY BỎ" : "CHỈNH SỬA" }}
            </UButton>
          </div>

          <form @submit.prevent="saveProfile" class="mt-6 flex flex-col gap-5">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                  >Họ tên</label
                >
                <UInput
                  :disabled="!isEditingProfile || isUpdatingProfile"
                  v-model="profileName"
                  type="text"
                  required
                  maxlength="35"
                  size="md"
                  :ui="{ rounded: 'rounded-2xl' }"
                  class="w-full font-semibold focus-within:ring-2 focus-within:ring-shopee-orange/20"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                  >Địa chỉ email</label
                >
                <UInput
                  :value="userEmail"
                  type="email"
                  disabled
                  size="md"
                  :ui="{ rounded: 'rounded-2xl' }"
                  class="w-full font-semibold opacity-75"
                />
              </div>
            </div>

            <!-- Profile updated alerts -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <UAlert
                v-if="profileMsg || profileError"
                :icon="
                  profileError
                    ? 'i-lucide-alert-triangle'
                    : 'i-lucide-circle-check'
                "
                :color="profileError ? 'danger' : 'success'"
                variant="soft"
                :title="profileError || profileMsg"
                class="rounded-2xl"
              />
            </transition>

            <!-- Submit Button (Trượt hiển thị mượt mà khi bấm Chỉnh sửa) -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-2 opacity-0"
            >
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-2 opacity-0"
              >
                <UButton
                  v-if="isEditingProfile"
                  type="submit"
                  :loading="isUpdatingProfile"
                  :disabled="isLoading || isProfileUnchanged"
                  size="md"
                  color="primary"
                  variant="solid"
                  class="self-start px-6 font-bold text-xs shadow-md shadow-orange-500/10 cursor-pointer rounded-2xl"
                >
                  Lưu thay đổi
                </UButton>
              </transition>
            </transition>
          </form>
        </div>

        <!-- Section 2: Default bank linkage -->
        <div
          class="rounded-3xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 p-6 shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20"
        >
          <div
            class="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/60"
          >
            <h3
              class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none"
            >
              Ngân Hàng Liên Kết Đối Soát
            </h3>

            <!-- Toggle Edit Button -->
            <UButton
              type="button"
              @click="handleEditToggle"
              size="xs"
              :variant="isEditingBank ? 'soft' : 'solid'"
              :color="isEditingBank ? 'neutral' : 'primary'"
              class="font-extrabold tracking-wider cursor-pointer"
              :icon="isEditingBank ? 'i-lucide-x' : 'i-lucide-pencil'"
            >
              {{ isEditingBank ? "HỦY BỎ" : "CHỈNH SỬA" }}
            </UButton>
          </div>

          <form @submit.prevent="saveBank" class="mt-6 flex flex-col gap-5">
            <div class="flex flex-col gap-2 relative">
              <label
                class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase"
                >Ngân hàng liên kết</label
              >

              <!-- Searchable USelectMenu from NuxtUI v3 -->
              <div class="relative w-full">
                <USelectMenu
                  v-model="linkedBank"
                  :items="selectMenuBanksList"
                  value-key="bin"
                  label-key="label"
                  placeholder="Chọn ngân hàng..."
                  :filter-fields="['label', 'bin', 'shortName', 'name']"
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  size="md"
                  :ui="{
                    base: 'w-full flex items-center gap-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 px-4 py-3.5 text-xs font-semibold text-slate-800 dark:text-slate-200 focus-within:ring-2 focus-within:ring-shopee-orange/20 focus-within:border-shopee-orange transition-all disabled:opacity-50 text-left cursor-pointer shadow-none ring-0',
                  }"
                >
                  <template #default>
                    <div class="flex items-center gap-2.5 min-w-0">
                      <span
                        v-if="selectedBankDetails"
                        class="font-extrabold text-[10px] text-shopee-orange bg-shopee-orange/5 px-2 py-0.5 rounded-lg border border-shopee-orange/10 shrink-0 select-none"
                      >
                        {{
                          selectedBankDetails.shortName ||
                          selectedBankDetails.short_name ||
                          selectedBankDetails.code
                        }}
                      </span>
                      <span
                        v-if="selectedBankDetails"
                        class="truncate text-slate-750 dark:text-slate-350"
                      >
                        {{ selectedBankDetails.name }}
                      </span>
                      <span v-else class="text-slate-400">Chọn ngân hàng...</span>
                    </div>
                  </template>
                  <template #item="{ item }">
                    <div class="flex items-center gap-2.5 min-w-0 py-0.5 select-none">
                      <span
                        class="font-extrabold text-[10px] text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-950/20 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800 shrink-0"
                      >
                        {{ item.shortName }}
                      </span>
                      <span class="truncate text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {{ item.name }}
                      </span>
                    </div>
                  </template>
                </USelectMenu>
              </div>
            </div>

            <!-- Hàng dưới: Số tài khoản & Tên chủ tài khoản (Mobile: xếp chồng, Desktop: song song) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase sm:h-8 flex items-end pb-1"
                  >Số tài khoản</label
                >
                <UInput
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  v-model="bankAccount"
                  type="text"
                  required
                  placeholder="Nhập số tài khoản ngân hàng..."
                  size="md"
                  :ui="{ rounded: 'rounded-2xl' }"
                  class="w-full font-semibold focus-within:ring-2 focus-within:ring-shopee-orange/20"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label
                  class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase sm:h-8 flex items-end pb-1"
                  >Chủ tài Khoản</label
                >
                <UInput
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  v-model="bankOwner"
                  type="text"
                  required
                  placeholder="Ví dụ: NGUYEN VAN A"
                  maxlength="35"
                  size="md"
                  :ui="{ rounded: 'rounded-2xl' }"
                  class="w-full uppercase font-black focus-within:ring-2 focus-within:ring-shopee-orange/20"
                />
              </div>
            </div>

            <!-- Bank link alerts -->
            <transition
              enter-active-class="transition duration-300 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
            >
              <UAlert
                v-if="bankMsg"
                :icon="
                  isBankError
                    ? 'i-lucide-alert-triangle'
                    : 'i-lucide-circle-check'
                "
                :color="isBankError ? 'danger' : 'success'"
                variant="soft"
                :title="bankMsg"
                class="rounded-2xl"
              />
            </transition>

            <!-- Submit Button (Trượt hiển thị mượt mà khi bấm Chỉnh sửa) -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="transform -translate-y-2 opacity-0"
              enter-to-class="transform translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="transform translate-y-0 opacity-100"
              leave-to-class="transform -translate-y-2 opacity-0"
            >
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform -translate-y-2 opacity-0"
                enter-to-class="transform translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform translate-y-0 opacity-100"
                leave-to-class="transform -translate-y-2 opacity-0"
              >
                <UButton
                  v-if="isEditingBank"
                  type="submit"
                  :loading="isUpdatingBank"
                  :disabled="isLoading || isBankLoading"
                  size="md"
                  color="primary"
                  variant="solid"
                  class="self-start px-6 font-bold text-xs shadow-md shadow-orange-500/10 cursor-pointer rounded-2xl"
                >
                  {{ isBankLoading ? "Đang tải..." : "Liên kết tài khoản" }}
                </UButton>
              </transition>
            </transition>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";

const { isLoading } = usePromiseTracker();

useSeoMeta({
  title: "Hồ sơ cá nhân - Saffi",
  ogTitle: "Hồ sơ cá nhân - Saffi",
  description: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  ogDescription: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const api = useAppFetch().api;
const config = useRuntimeConfig();

const userName = computed(() => user.value?.name || "User");
const userAvatar = computed(() => user.value?.image || "");
const userEmail = computed(
  () => user.value?.email || "mailunlockcuakhanh2@gmail.com"
);

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "THÀNH VIÊN TINH HOA",
      image: "/saffi_obsidian.webp",
      badgeClass:
        "bg-slate-900/10 dark:bg-slate-100/10 border-slate-900/20 text-slate-800 dark:text-slate-200",
      borderClass: "border-slate-200/60 dark:border-slate-800/80",
      glowClass: "bg-slate-500",
      textClass: "text-slate-700 dark:text-slate-300",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "THÀNH VIÊN VÀNG",
      image: "/saffi_gold.webp",
      badgeClass:
        "bg-amber-500/10 dark:bg-amber-500/15 border-amber-500/20 text-amber-600 dark:text-amber-400",
      borderClass: "border-amber-500/20 dark:border-amber-500/20",
      glowClass: "bg-amber-500",
      textClass: "text-amber-500",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "THÀNH VIÊN BẠC",
      image: "/saffi_silver.webp",
      badgeClass:
        "bg-slate-300/10 dark:bg-slate-300/15 border-slate-300/20 text-slate-600 dark:text-slate-400",
      borderClass: "border-slate-200 dark:border-slate-800",
      glowClass: "bg-slate-400",
      textClass: "text-slate-400",
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

const firstLetter = computed(() => {
  const name = userName.value;
  return name ? name.charAt(0).toUpperCase() : "U";
});

// Settings Input States
const profileName = ref(userName.value);
const profilePhone = ref("0968123456");
const isEditingProfile = ref(false);
const isUpdatingProfile = ref(false);
const profileMsg = ref("");
const profileError = ref("");

const originalProfileName = ref("");

const joinDate = computed(() => {
  const dateVal = user.value?.created_at;
  if (!dateVal) return "N/A";
  const dateObj = new Date(dateVal);
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
});

const handleEditProfileToggle = () => {
  if (isEditingProfile.value) {
    // Rollback changes
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
    profileError.value = "";
    profileMsg.value = "";
  } else {
    // Backup current state
    originalProfileName.value = profileName.value;
    isEditingProfile.value = true;
    profileError.value = "";
    profileMsg.value = "";
  }
};

const isProfileUnchanged = computed(
  () => profileName.value.trim() === (userName.value || "").trim()
);

const linkedBank = ref("970422"); // MB Bank BIN as default
const bankAccount = ref("");
const bankOwner = ref("");
const isEditingBank = ref(false);
const isUpdatingBank = ref(false);
const bankMsg = ref("");
const isBankError = ref(false);

// Backup state for edit rollback
const originalBankId = ref("");
const originalBankAccount = ref("");
const originalBankOwner = ref("");

const handleEditToggle = () => {
  if (isEditingBank.value) {
    // Rollback changes
    linkedBank.value = originalBankId.value;
    bankAccount.value = originalBankAccount.value;
    bankOwner.value = originalBankOwner.value;
    isEditingBank.value = false;
  } else {
    // Backup current state
    originalBankId.value = linkedBank.value;
    originalBankAccount.value = bankAccount.value;
    originalBankOwner.value = bankOwner.value;
    isEditingBank.value = true;
  }
};

const banks = ref([]);
const isBankLoading = ref(true);

const fallbackBanks = [
  {
    bin: "970422",
    code: "MB",
    shortName: "MBBank",
    name: "Ngân hàng TMCP Quân Đội",
  },
  {
    bin: "970436",
    code: "VCB",
    shortName: "Vietcombank",
    name: "Ngân hàng TMCP Ngoại Thương Việt Nam",
  },
  {
    bin: "970407",
    code: "TCB",
    shortName: "Techcombank",
    name: "Ngân hàng TMCP Kỹ Thương Việt Nam",
  },
  {
    bin: "970416",
    code: "ACB",
    shortName: "ACB",
    name: "Ngân hàng TMCP Á Châu",
  },
  {
    bin: "970418",
    code: "BIDV",
    shortName: "BIDV",
    name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam",
  },
];

const fetchBanksList = async () => {
  try {
    const vietQRApiUrl = config.public.vietQRApi || "https://api.vietqr.io/v2";
    const res = await $fetch(`${vietQRApiUrl}/banks`);
    if (res && res.code === "00" && Array.isArray(res.data)) {
      banks.value = res.data;
    }
  } catch (err) {
    console.error("Lỗi khi tải danh sách ngân hàng VietQR:", err);
  }
};

const fetchUserBankAccount = async () => {
  if (!user.value?.id) return;
  isBankLoading.value = true;
  try {
    const res = await api.get(`/bank-account/${user.value.id}`);
    if (res.data) {
      linkedBank.value = res.data.bank_id;
      bankAccount.value = res.data.account_no;
      bankOwner.value = res.data.account_name;
    }
  } catch (err) {
    console.error("Lỗi khi lấy thông tin tài khoản ngân hàng:", err);
    // Keep defaults
    linkedBank.value = "970422";
    bankAccount.value = "";
    bankOwner.value = "";
  } finally {
    isBankLoading.value = false;
  }
};

const selectMenuBanksList = computed(() => {
  const list = banks.value.length > 0 ? banks.value : fallbackBanks;
  return list.map((b) => ({
    bin: b.bin,
    label: `${b.shortName || b.short_name || b.code} - ${b.name}`,
    shortName: b.shortName || b.short_name || b.code,
    name: b.name,
  }));
});

const selectedBankDetails = computed(() => {
  const list = banks.value.length > 0 ? banks.value : fallbackBanks;
  return list.find((b) => b.bin === linkedBank.value) || null;
});

onMounted(async () => {
  await fetchBanksList();
  await fetchUserBankAccount();
});

const saveProfile = async () => {
  isUpdatingProfile.value = true;
  profileMsg.value = "";
  profileError.value = "";

  const trimmedName = profileName.value.trim();
  if (!trimmedName) {
    profileError.value = "Họ và tên không được để trống!";
    isUpdatingProfile.value = false;
    return;
  }

  if (trimmedName.length > 35) {
    profileError.value = "Họ và tên không được vượt quá 35 ký tự!";
    isUpdatingProfile.value = false;
    return;
  }

  try {
    await api.put("/user/update", {
      name: trimmedName,
    });

    profileMsg.value = "Cập nhật họ và tên thành công!";
    // Reactively sync the session state on client side
    if (user.value) {
      user.value.name = trimmedName;
    }
    isEditingProfile.value = false; // Close editing mode on successful save!
    setTimeout(() => {
      profileMsg.value = "";
    }, 4000);
  } catch (err) {
    console.error("Lỗi khi cập nhật tên người dùng:", err);
    profileError.value = err.message || "Có lỗi xảy ra khi kết nối máy chủ!";

    // Roll back changes on failed save
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
  } finally {
    isUpdatingProfile.value = false;
  }
};

const saveBank = async () => {
  if (!user.value?.id) return;
  bankMsg.value = "";
  isBankError.value = false;

  const trimmedOwner = bankOwner.value.trim();
  if (!trimmedOwner) {
    isBankError.value = true;
    bankMsg.value = "Vui lòng nhập tên chủ tài khoản!";
    return;
  }

  if (trimmedOwner.length > 35) {
    isBankError.value = true;
    bankMsg.value = "Tên chủ tài khoản không được vượt quá 35 ký tự!";
    return;
  }

  // Regex strictly enforces A-Z, a-z and spaces without accents
  const noAccentsRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)*$/;
  if (!noAccentsRegex.test(trimmedOwner)) {
    isBankError.value = true;
    bankMsg.value =
      "Tên chủ tài khoản phải viết không dấu (chỉ gồm chữ cái và khoảng trắng)!";
    return;
  }

  isUpdatingBank.value = true;

  const activeBanksList = banks.value.length > 0 ? banks.value : fallbackBanks;
  const selectedBankObj = activeBanksList.find(
    (b) => b.bin === linkedBank.value
  );
  const bankNameVal = selectedBankObj
    ? selectedBankObj.shortName ||
      selectedBankObj.short_name ||
      selectedBankObj.code
    : "Ngân hàng";

  try {
    await api.put(`/bank-account/${user.value.id}`, {
      bank_id: linkedBank.value,
      bank_name: bankNameVal,
      account_no: bankAccount.value.trim(),
      account_name: trimmedOwner.toUpperCase(),
    });

    bankMsg.value =
      "Đã liên kết tài khoản ngân hàng đối soát mặc định thành công!";
    isBankError.value = false;
    isEditingBank.value = false;
    setTimeout(() => {
      bankMsg.value = "";
    }, 4000);
  } catch (err) {
    console.error("Lỗi khi cập nhật tài khoản ngân hàng:", err);
    bankMsg.value = "Có lỗi xảy ra: " + (err.message || "Không thể lưu!");
    isBankError.value = true;

    // Roll back changes on failed save
    linkedBank.value = originalBankId.value;
    bankAccount.value = originalBankAccount.value;
    bankOwner.value = originalBankOwner.value;
    isEditingBank.value = false;
  } finally {
    isUpdatingBank.value = false;
  }
};
</script>
