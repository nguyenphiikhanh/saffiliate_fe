<template>
  <div class="w-full">
    <!-- Page Title & Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
        Hồ Sơ Cá Nhân
      </h1>
      <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
        Cấu hình thông tin tài khoản cá nhân và liên kết ngân hàng đối soát mặc định.
      </p>
    </div>

    <!-- Dynamic Member Rank Progress Card -->
    <a-card v-if="user" :bordered="false" class="mb-8 rounded-2xl shadow-sm bg-white dark:bg-slate-900 overflow-hidden relative">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Left: Rank Badge + Progress Bar -->
        <div class="flex flex-col sm:flex-row items-center gap-6 flex-1 w-full z-10">
          <div class="h-16 w-16 flex items-center justify-center shrink-0">
            <img :src="rankInfo.image" class="h-16 w-16 object-contain drop-shadow-sm" :alt="rankInfo.name" />
          </div>

          <div class="flex-1 w-full text-center sm:text-left">
            <div class="flex flex-wrap items-center justify-center sm:justify-start gap-2 text-sm font-bold tracking-wide mb-3">
              <span :class="rankInfo.textClass">{{ rankInfo.fullName }}</span>
              <span v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'" class="text-slate-400">&rarr;</span>
              <span v-if="rankProgress.nextRankName !== 'ĐẠT ĐỈNH'" class="text-[#ee4d2d]">THÀNH VIÊN {{ rankProgress.nextRankName }}</span>
            </div>

            <a-progress
              :percent="rankProgress.percent"
              :stroke-color="{ '0%': '#f97316', '100%': '#f43f5e' }"
              :show-info="false"
              class="mb-2"
            />

            <div class="flex flex-col sm:flex-row items-center justify-between gap-2">
              <p class="text-slate-500 text-[11px] font-semibold">
                <span v-if="user.rank === 'obsidian'">
                  Tổng đơn tích lũy: <span class="text-slate-700 dark:text-slate-200 font-bold">{{ user.completed_orders_count ?? 0 }} đơn</span>
                </span>
                <span v-else>
                  <span class="text-slate-700 dark:text-slate-200 font-bold">{{ user.completed_orders_count ?? 0 }}</span> / {{ rankProgress.nextThreshold }} đơn hàng
                </span>
              </p>
              <p v-if="user.rank === 'obsidian'" class="text-[11px] font-bold text-emerald-500">
                💎 Hạng Tinh Hoa tối thượng! Duy trì để bảo vệ đặc quyền.
              </p>
              <p v-else-if="(user.orders_to_next_rank ?? 0) > 0" class="text-[11px] font-bold text-slate-500">
                Hoàn thành <span class="text-[#ee4d2d]">{{ user.orders_to_next_rank }}</span> đơn nữa để thăng hạng
              </p>
              <p v-else class="text-[11px] font-bold text-emerald-500">Đã đạt cấp bậc tối đa 🎉</p>
            </div>
          </div>
        </div>

        <!-- Vertical Divider -->
        <a-divider type="vertical" class="hidden md:block h-16" />

        <!-- Right: Commission Rates -->
        <div class="flex items-center gap-8 z-10 shrink-0">
          <div class="text-center">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Ngày thường</span>
            <span class="text-2xl font-black text-slate-800 dark:text-slate-200">{{ rankProgress.normalRate }}%</span>
          </div>
          <a-divider type="vertical" class="h-10" />
          <div class="text-center">
            <span class="text-[10px] font-bold text-[#ee4d2d] uppercase tracking-widest block mb-1">Ngày đôi / KM</span>
            <span class="text-2xl font-black text-rose-500">{{ rankProgress.promoRate }}%</span>
          </div>
        </div>
      </div>
    </a-card>

    <!-- Main Grid -->
    <a-row :gutter="[24, 24]">
      <!-- Left: Profile Summary Avatar -->
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="rounded-2xl shadow-sm text-center h-full flex flex-col items-center justify-center py-6">
          <a-avatar :size="96" :src="userAvatar" class="bg-indigo-500 font-black text-3xl mb-4 border-4 border-slate-50 dark:border-slate-800 shadow-sm">
            {{ firstLetter }}
          </a-avatar>
          <h3 class="text-base font-bold text-slate-800 dark:text-slate-100 mb-1 truncate w-full">{{ userName }}</h3>
          <p class="text-xs text-slate-500 font-medium truncate w-full">{{ userEmail }}</p>
          <a-divider style="margin: 24px 0" />
          <div class="flex flex-col gap-1 items-center">
            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ngày tham gia</span>
            <span class="text-sm font-bold text-slate-700 dark:text-slate-200">{{ joinDate }}</span>
          </div>
        </a-card>
      </a-col>

      <!-- Right: Settings Forms -->
      <a-col :xs="24" :md="16">
        <div class="flex flex-col gap-6">
          
          <!-- Personal Info Form -->
          <a-card :bordered="false" class="rounded-2xl shadow-sm" title="Thông Tin Tài Khoản">
            <template #extra>
              <a-button type="text" @click="handleEditProfileToggle" class="font-bold text-xs">
                <template #icon>
                  <CloseOutlined v-if="isEditingProfile" />
                  <EditOutlined v-else />
                </template>
                {{ isEditingProfile ? "HỦY BỎ" : "CHỈNH SỬA" }}
              </a-button>
            </template>

            <a-form layout="vertical" @submit.prevent="saveProfile">
              <a-row :gutter="16">
                <a-col :xs="24" :sm="12">
                  <a-form-item label="Họ tên">
                    <a-input
                      v-model:value="profileName"
                      :disabled="!isEditingProfile || isUpdatingProfile"
                      size="large"
                      class="font-semibold"
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                  <a-form-item label="Địa chỉ email">
                    <a-input
                      :value="userEmail"
                      disabled
                      size="large"
                      class="font-semibold"
                    />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-alert
                v-if="profileMsg || profileError"
                :type="profileError ? 'error' : 'success'"
                show-icon
                :message="profileError || profileMsg"
                class="mb-4 rounded-xl"
              />

              <a-button
                v-if="isEditingProfile"
                html-type="submit"
                type="primary"
                size="large"
                :loading="isUpdatingProfile"
                :disabled="isLoading || isProfileUnchanged"
                class="font-bold"
              >
                Lưu thay đổi
              </a-button>
            </a-form>
          </a-card>

          <!-- Bank Account Form -->
          <a-card :bordered="false" class="rounded-2xl shadow-sm" title="Ngân Hàng Liên Kết Đối Soát">
            <template #extra>
              <a-button type="text" @click="handleEditToggle" class="font-bold text-xs">
                <template #icon>
                  <CloseOutlined v-if="isEditingBank" />
                  <EditOutlined v-else />
                </template>
                {{ isEditingBank ? "HỦY BỎ" : "CHỈNH SỬA" }}
              </a-button>
            </template>

            <a-form layout="vertical" @submit.prevent="saveBank">
              <a-form-item label="Ngân hàng liên kết">
                <a-select
                  v-model:value="linkedBank"
                  :options="selectMenuBanksList"
                  show-search
                  placeholder="Chọn ngân hàng..."
                  :filterOption="(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0"
                  :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                  size="large"
                  class="w-full font-semibold"
                >
                  <template #option="{ shortName, name }">
                    <span class="font-bold text-slate-500 mr-2 border border-slate-200 px-1 rounded text-xs">{{ shortName }}</span>
                    <span>{{ name }}</span>
                  </template>
                </a-select>
              </a-form-item>

              <a-row :gutter="16">
                <a-col :xs="24" :sm="12">
                  <a-form-item label="Số tài khoản">
                    <a-input
                      v-model:value="bankAccount"
                      :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                      size="large"
                      class="font-semibold"
                      placeholder="Nhập số tài khoản..."
                    />
                  </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="12">
                  <a-form-item label="Chủ tài khoản">
                    <a-input
                      v-model:value="bankOwner"
                      :disabled="!isEditingBank || isBankLoading || isUpdatingBank"
                      size="large"
                      class="font-black uppercase"
                      placeholder="NGUYEN VAN A"
                    />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-alert
                v-if="bankMsg"
                :type="isBankError ? 'error' : 'success'"
                show-icon
                :message="bankMsg"
                class="mb-4 rounded-xl"
              />

              <a-button
                v-if="isEditingBank"
                html-type="submit"
                type="primary"
                size="large"
                :loading="isUpdatingBank"
                :disabled="isLoading || isBankLoading"
                class="font-bold"
              >
                Liên kết tài khoản
              </a-button>
            </a-form>
          </a-card>

        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";
import { EditOutlined, CloseOutlined } from "@ant-design/icons-vue";

const { isLoading } = usePromiseTracker();

useSeoMeta({
  title: "Hồ sơ cá nhân - Saffi",
  ogTitle: "Hồ sơ cá nhân - Saffi",
  description: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  ogDescription: "Trang cấu hình và bảo mật tài khoản thành viên Saffi.",
  twitterCard: "summary_large_image",
});

const { user } = useAuth();
const api = useAppFetch().api;
const config = useRuntimeConfig();

const userName = computed(() => user.value?.name || "User");
const userAvatar = computed(() => user.value?.image || "");
const userEmail = computed(() => user.value?.email || "");

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") return { name: "TINH HOA", fullName: "THÀNH VIÊN TINH HOA", image: "/saffi_obsidian.webp", textClass: "text-slate-700 dark:text-slate-300" };
  if (rank === "gold") return { name: "VÀNG", fullName: "THÀNH VIÊN VÀNG", image: "/saffi_gold.webp", textClass: "text-amber-500" };
  return { name: "BẠC", fullName: "THÀNH VIÊN BẠC", image: "/saffi_silver.webp", textClass: "text-slate-400" };
});

const rankProgress = computed(() => {
  const count = user.value?.completed_orders_count ?? 0;
  const rank = user.value?.rank || "silver";
  let nextRankName = ""; let nextThreshold = 0; let percent = 0; let normalRate = 60; let promoRate = 70;

  if (rank === "obsidian") { nextRankName = "ĐẠT ĐỈNH"; nextThreshold = 50; percent = 100; normalRate = 80; promoRate = 90; }
  else if (rank === "gold") { nextRankName = "TINH HOA"; nextThreshold = 50; percent = Math.min(Math.round((count / 50) * 100), 100); normalRate = 70; promoRate = 80; }
  else { nextRankName = "VÀNG"; nextThreshold = 10; percent = Math.min(Math.round((count / 10) * 100), 100); normalRate = 60; promoRate = 70; }

  return { nextRankName, nextThreshold, percent, normalRate, promoRate };
});

const firstLetter = computed(() => userName.value ? userName.value.charAt(0).toUpperCase() : "U");

const profileName = ref(userName.value);
const isEditingProfile = ref(false);
const isUpdatingProfile = ref(false);
const profileMsg = ref("");
const profileError = ref("");
const originalProfileName = ref("");

const joinDate = computed(() => {
  const dateVal = user.value?.created_at;
  if (!dateVal) return "N/A";
  const dateObj = new Date(dateVal);
  return `${String(dateObj.getDate()).padStart(2, "0")}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${dateObj.getFullYear()}`;
});

const handleEditProfileToggle = () => {
  if (isEditingProfile.value) {
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
    profileError.value = ""; profileMsg.value = "";
  } else {
    originalProfileName.value = profileName.value;
    isEditingProfile.value = true;
    profileError.value = ""; profileMsg.value = "";
  }
};

const isProfileUnchanged = computed(() => profileName.value.trim() === (userName.value || "").trim());

const linkedBank = ref("970422");
const bankAccount = ref("");
const bankOwner = ref("");
const isEditingBank = ref(false);
const isUpdatingBank = ref(false);
const bankMsg = ref("");
const isBankError = ref(false);
const originalBankId = ref("");
const originalBankAccount = ref("");
const originalBankOwner = ref("");

const handleEditToggle = () => {
  if (isEditingBank.value) {
    linkedBank.value = originalBankId.value;
    bankAccount.value = originalBankAccount.value;
    bankOwner.value = originalBankOwner.value;
    isEditingBank.value = false;
  } else {
    originalBankId.value = linkedBank.value;
    originalBankAccount.value = bankAccount.value;
    originalBankOwner.value = bankOwner.value;
    isEditingBank.value = true;
  }
};

const banks = ref([]);
const isBankLoading = ref(true);
const fallbackBanks = [
  { bin: "970422", code: "MB", shortName: "MBBank", name: "Ngân hàng TMCP Quân Đội" },
  { bin: "970436", code: "VCB", shortName: "Vietcombank", name: "Ngân hàng TMCP Ngoại Thương Việt Nam" },
  { bin: "970407", code: "TCB", shortName: "Techcombank", name: "Ngân hàng TMCP Kỹ Thương Việt Nam" },
  { bin: "970416", code: "ACB", shortName: "ACB", name: "Ngân hàng TMCP Á Châu" },
  { bin: "970418", code: "BIDV", shortName: "BIDV", name: "Ngân hàng TMCP Đầu tư và Phát triển Việt Nam" },
];

const fetchBanksList = async () => {
  try {
    const vietQRApiUrl = config.public.vietQRApi || "https://api.vietqr.io/v2";
    const res = await $fetch(`${vietQRApiUrl}/banks`);
    if (res && res.code === "00" && Array.isArray(res.data)) banks.value = res.data;
  } catch (err) { console.error("Lỗi khi tải danh sách ngân hàng VietQR:", err); }
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
    linkedBank.value = "970422"; bankAccount.value = ""; bankOwner.value = "";
  } finally {
    isBankLoading.value = false;
  }
};

const selectMenuBanksList = computed(() => {
  const list = banks.value.length > 0 ? banks.value : fallbackBanks;
  return list.map((b) => ({
    value: b.bin,
    label: `${b.shortName || b.short_name || b.code} - ${b.name}`,
    shortName: b.shortName || b.short_name || b.code,
    name: b.name,
  }));
});

onMounted(async () => {
  await fetchBanksList();
  await fetchUserBankAccount();
});

const saveProfile = async () => {
  isUpdatingProfile.value = true; profileMsg.value = ""; profileError.value = "";
  const trimmedName = profileName.value.trim();
  if (!trimmedName || trimmedName.length > 35) {
    profileError.value = "Họ tên không hợp lệ (tối đa 35 ký tự)!";
    isUpdatingProfile.value = false; return;
  }
  try {
    await api.put("/user/update", { name: trimmedName });
    profileMsg.value = "Cập nhật họ và tên thành công!";
    if (user.value) user.value.name = trimmedName;
    isEditingProfile.value = false;
    setTimeout(() => { profileMsg.value = ""; }, 4000);
  } catch (err) {
    profileError.value = err.message || "Có lỗi xảy ra!";
    profileName.value = originalProfileName.value;
    isEditingProfile.value = false;
  } finally {
    isUpdatingProfile.value = false;
  }
};

const saveBank = async () => {
  if (!user.value?.id) return;
  bankMsg.value = ""; isBankError.value = false;
  const trimmedOwner = bankOwner.value.trim();
  const trimmedAccount = bankAccount.value.trim();
  if (!trimmedOwner || trimmedOwner.length > 35 || !/^[A-Za-z]+(?:\s[A-Za-z]+)*$/.test(trimmedOwner)) {
    isBankError.value = true; bankMsg.value = "Tên chủ tài khoản không hợp lệ (Viết không dấu, tối đa 35 ký tự)!"; return;
  }
  if (!trimmedAccount || !/^[0-9]{5,20}$/.test(trimmedAccount)) {
    isBankError.value = true; bankMsg.value = "Số tài khoản không hợp lệ!"; return;
  }
  isUpdatingBank.value = true;
  try {
    const list = banks.value.length > 0 ? banks.value : fallbackBanks;
    const selectedBank = list.find((b) => b.bin === linkedBank.value);
    await api.put(`/bank-account/${user.value.id}`, {
      bank_id: linkedBank.value,
      bank_name: selectedBank?.name || linkedBank.value,
      account_no: trimmedAccount,
      account_name: trimmedOwner,
    });
    isBankError.value = false;
    bankMsg.value = "Cập nhật tài khoản đối soát thành công!";
    isEditingBank.value = false;
    setTimeout(() => { bankMsg.value = ""; }, 4000);
  } catch (err) {
    isBankError.value = true;
    bankMsg.value = err.data?.message || err.message || "Có lỗi xảy ra khi lưu ngân hàng!";
  } finally {
    isUpdatingBank.value = false;
  }
};
</script>
