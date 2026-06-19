<template>
  <div class="w-full animate-fade-in space-y-6">
    <!-- Page Title & Header -->
    <div class="mt-6">
      <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Quản Lý <span class="text-shopee-orange">Tài Chính</span>
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">
        Yêu cầu rút số dư hoa hồng tích lũy về tài khoản ngân hàng của bạn cực kỳ nhanh chóng.
      </p>
    </div>

    <!-- Financial Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
      <!-- Card 1: Khả dụng -->
      <UCard
        :ui="{ 
          body: { base: 'p-6' },
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/60',
          background: 'bg-gradient-to-br from-shopee-orange/5 to-transparent dark:from-shopee-orange/10 dark:bg-slate-900/40',
          rounded: 'rounded-3xl shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10'
        }"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Số dư khả dụng
          </span>
          <div class="h-10 w-10 rounded-xl bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-banknote" class="h-5.5 w-5.5" />
          </div>
        </div>
        <p class="text-4xl font-black text-slate-800 dark:text-white mt-4 leading-none">
          {{ formatMoney(availableBalance) }}
        </p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">
          Có thể thanh toán
        </p>
      </UCard>

      <!-- Card 2: Chờ xử lý -->
      <UCard
        :ui="{ 
          body: { base: 'p-6' },
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/60',
          background: 'bg-white dark:bg-slate-900/40',
          rounded: 'rounded-3xl shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10'
        }"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Chờ xử lý
          </span>
          <div class="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-clock" class="h-5.5 w-5.5" />
          </div>
        </div>
        <p class="text-4xl font-black text-slate-800 dark:text-white mt-4 leading-none">
          {{ formatMoney(pendingBalance) }}
        </p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">
          Chờ rút tiền
        </p>
      </UCard>

      <!-- Card 3: Đã thanh toán -->
      <UCard
        :ui="{ 
          body: { base: 'p-6' },
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/60',
          background: 'bg-white dark:bg-slate-900/40',
          rounded: 'rounded-3xl shadow-lg shadow-slate-900/[0.02] dark:shadow-slate-950/10'
        }"
      >
        <div class="flex items-center justify-between gap-3">
          <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
            Đã thanh toán
          </span>
          <div class="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-circle-check" class="h-5.5 w-5.5" />
          </div>
        </div>
        <p class="text-4xl font-black text-slate-800 dark:text-white mt-4 leading-none">
          {{ formatMoney(totalWithdrawn) }}
        </p>
        <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-semibold">
          Saffi đã thanh toán cho bạn
        </p>
      </UCard>
    </div>

    <!-- Card: Bank Account Linked Info -->
    <UCard
      :ui="{ 
        body: { base: 'p-6' },
        ring: 'ring-1 ring-slate-100 dark:ring-slate-800/60',
        background: 'bg-white dark:bg-slate-900/40',
        rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/10'
      }"
      class="mt-8"
    >
      <div v-if="isBankLoading" class="flex flex-col gap-4">
        <!-- Skeleton Loading -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <USkeleton class="h-10 w-10 rounded-full" />
            <USkeleton class="h-4 w-24" />
          </div>
          <USkeleton class="h-4 w-16" />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4">
          <div class="flex flex-col gap-2" v-for="i in 3" :key="i">
            <USkeleton class="h-3 w-16" />
            <USkeleton class="h-4 w-32" />
          </div>
        </div>
      </div>

      <div v-else-if="bankAccountInfo" class="w-full animate-fade-in">
        <!-- Bank linked display -->
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="h-10 w-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700 shrink-0 text-slate-500 dark:text-slate-400">
              <UIcon name="i-lucide-landmark" class="h-5.5 w-5.5" />
            </div>
            <h3 class="text-sm font-black text-slate-800 dark:text-slate-200 leading-tight">
              Tài khoản đối soát
            </h3>
          </div>
          <UButton
            to="/ho-so"
            variant="ghost"
            color="primary"
            size="xs"
            icon="i-lucide-pencil"
            class="font-bold text-xs"
          >
            Chỉnh sửa
          </UButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase block select-none">
              Ngân hàng
            </span>
            <span class="text-sm font-black text-slate-800 dark:text-slate-200 block mt-1.5">{{ bankAccountInfo.bank_name }}</span>
          </div>
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase block select-none">
              Số tài khoản
            </span>
            <span class="text-sm font-black text-slate-800 dark:text-slate-200 block mt-1.5">{{ bankAccountInfo.account_no }}</span>
          </div>
          <div>
            <span class="text-[10px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase block select-none">
              Chủ tài khoản
            </span>
            <span class="text-sm font-black text-slate-800 dark:text-slate-200 block mt-1.5 uppercase">{{ bankAccountInfo.account_name }}</span>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4 py-2 animate-fade-in">
        <div class="flex items-center gap-3.5 text-center sm:text-left flex-col sm:flex-row">
          <div class="h-10 w-10 rounded-full bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
            <UIcon name="i-lucide-alert-triangle" class="h-5 w-5" />
          </div>
          <div>
            <h4 class="text-xs font-black text-slate-800 dark:text-slate-200">
              Chưa liên kết tài khoản ngân hàng đối soát
            </h4>
            <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-bold">
              Vui lòng liên kết tài khoản ngân hàng trong mục Hồ sơ để thực hiện rút tiền về tài khoản của bạn.
            </p>
          </div>
        </div>
        <UButton
          to="/ho-so"
          color="primary"
          class="font-bold text-xs"
          size="sm"
        >
          Liên kết ngay
        </UButton>
      </div>
    </UCard>

    <!-- MAIN TWO COLUMN GRID layout -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8 items-start">
      <!-- COLUMN Left: Withdraw Form (Span 7) -->
      <UCard
        class="lg:col-span-7"
        :ui="{ 
          body: { base: 'p-6' },
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
          background: 'bg-white dark:bg-slate-900/60',
          rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20'
        }"
      >
        <h2 class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60">
          Yêu Cầu Rút Tiền
        </h2>

        <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5">
          <!-- 1. Destination bank preview card -->
          <div
            v-if="bankAccountInfo"
            class="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div class="flex items-center gap-2.5 min-w-0">
              <div class="h-8 w-8 rounded-xl bg-orange-500/5 dark:bg-orange-500/10 text-shopee-orange flex items-center justify-center shrink-0">
                <UIcon name="i-lucide-landmark" class="h-4.5 w-4.5" />
              </div>
              <div class="min-w-0">
                <span class="block text-[9px] font-extrabold uppercase text-slate-400">Rút về tài khoản đối soát</span>
                <span class="font-black text-slate-800 dark:text-slate-200 truncate block mt-0.5">
                  {{ bankAccountInfo.bank_name }} • {{ bankAccountInfo.account_no }}
                </span>
              </div>
            </div>
            <span class="font-bold text-[10px] text-slate-400 dark:text-slate-500 uppercase select-all shrink-0">
              {{ bankAccountInfo.account_name }}
            </span>
          </div>

          <!-- Alert error when not bank account linked -->
          <UAlert
            v-else
            icon="i-lucide-alert-triangle"
            color="warning"
            variant="soft"
            title="Vui lòng liên kết tài khoản ngân hàng đối soát tại trang Hồ Sơ trước khi rút tiền."
          />

          <!-- 2. Withdraw Amount -->
          <div class="flex flex-col gap-2">
            <UFormField
              :error="amountError"
            >
              <template #label>
                <div class="flex items-center justify-between w-full">
                  <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">
                    Số tiền rút
                  </span>
                  <UButton
                    variant="link"
                    color="primary"
                    :disabled="isApiLoading || isSubmitting"
                    @click="withdrawAmount = availableBalance"
                    class="p-0 text-[10px] font-black uppercase tracking-wide cursor-pointer hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Rút toàn bộ số dư
                  </UButton>
                </div>
              </template>

              <UInput
                v-model="formattedWithdrawAmount"
                type="text"
                required
                :disabled="isApiLoading || isSubmitting || !bankAccountInfo"
                placeholder="Rút tối thiểu 10.000đ..."
                size="lg"
                class="w-full font-bold"
                :ui="{ 
                  rounded: 'rounded-2xl',
                  ring: 'focus:ring-2 focus:ring-shopee-orange/20 focus:border-shopee-orange'
                }"
              >
                <template #trailing>
                  <span class="font-extrabold text-[11px] text-slate-400 mr-2">ĐỒNG</span>
                </template>
              </UInput>

              <template #hint>
                <span v-if="!amountError" class="text-[10px] text-slate-400 dark:text-slate-500 font-bold select-none">
                  * Hạn mức rút tối thiểu: <span class="text-slate-600 dark:text-slate-350">10.000đ</span> • Phí chuyển khoản: <span class="text-emerald-500">Miễn phí</span>
                </span>
              </template>
            </UFormField>
          </div>

          <!-- Alert message if any -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
          >
            <div v-if="successMsg || errorMsg">
              <UAlert
                v-if="errorMsg"
                icon="i-lucide-alert-triangle"
                color="danger"
                variant="soft"
                :title="errorMsg"
              />
              <UAlert
                v-else
                icon="i-lucide-circle-check"
                color="success"
                variant="soft"
                :title="successMsg"
              />
            </div>
          </transition>

          <!-- Submit Button -->
          <UButton
            type="submit"
            :loading="isSubmitting"
            :disabled="!canSubmit"
            block
            size="lg"
            class="font-bold text-xs py-3.5 rounded-2xl shadow-lg shadow-orange-500/15"
          >
            Xác Nhận Rút Tiền
          </UButton>
        </form>
      </UCard>

      <!-- COLUMN Right: Withdrawal History (Span 5) -->
      <UCard
        class="lg:col-span-5"
        :ui="{ 
          body: { base: 'p-6' },
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
          background: 'bg-white dark:bg-slate-900/60',
          rounded: 'rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20'
        }"
      >
        <h2 class="text-[13px] font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60">
          Lịch Sử Rút Tiền
        </h2>

        <!-- History Items Stack -->
        <div v-if="isHistoryLoading" class="mt-6 flex flex-col gap-4">
          <div
            v-for="i in 3"
            :key="i"
            class="p-4 rounded-2xl border border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-900/40 flex items-center justify-between gap-3.5"
          >
            <div class="flex items-start gap-3 w-full">
              <USkeleton class="h-9 w-9 rounded-xl shrink-0" />
              <div class="space-y-2 w-full">
                <USkeleton class="h-4 w-2/3" />
                <USkeleton class="h-3 w-1/3" />
              </div>
            </div>
          </div>
        </div>

        <div v-else class="mt-6 flex flex-col gap-4">
          <div
            v-for="item in historyList"
            :key="item.id"
            class="p-4 rounded-2xl border flex flex-col gap-3 transition-colors"
            :class="{
              'bg-emerald-500/5 border-emerald-500/10 dark:bg-emerald-500/10 dark:border-emerald-500/20':
                item.status === 'success' || item.status === 'completed',
              'bg-amber-500/5 border-amber-500/10 dark:bg-amber-500/10 dark:border-amber-500/20':
                item.status === 'pending',
              'bg-rose-500/5 border-rose-500/10 dark:bg-rose-500/10 dark:border-rose-500/20':
                item.status === 'rejected' || item.status === 'failed',
              'border-slate-100 dark:border-slate-800/60 bg-slate-50/20 dark:bg-slate-900/20':
                ![
                  'success',
                  'completed',
                  'pending',
                  'rejected',
                  'failed',
                ].includes(item.status),
            }"
          >
            <!-- Thông tin chính -->
            <div class="flex items-center justify-between gap-3.5">
              <div class="flex items-start gap-3">
                <!-- Wallet Icon -->
                <div class="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
                  <UIcon name="i-lucide-wallet" class="h-5 w-5" />
                </div>
                <div>
                  <span class="text-xs font-black text-slate-800 dark:text-slate-100">
                    {{ item.bankCode }} ({{ item.account }})
                  </span>
                  <p class="text-[9.5px] text-slate-400 dark:text-slate-500 mt-1 font-bold">
                    {{ item.date }}
                  </p>
                </div>
              </div>

              <!-- Amount details and status -->
              <div class="flex flex-col items-end shrink-0">
                <span class="text-xs font-extrabold text-slate-800 dark:text-white leading-none">
                  {{ formatMoney(item.amount) }}
                </span>
                <div class="flex items-center gap-1.5 mt-1.5">
                  <UButton
                    v-if="(item.status === 'rejected' || item.status === 'failed') && item.rejectReason"
                    variant="link"
                    color="danger"
                    size="xs"
                    class="p-0 text-[9px] font-bold underline decoration-rose-500/30 underline-offset-2 transition-colors focus:outline-none"
                    @click="item.showReason = !item.showReason"
                  >
                    Lý do huỷ
                  </UButton>
                  <UBadge
                    size="xs"
                    variant="soft"
                    :color="
                      item.status === 'completed' || item.status === 'success'
                        ? 'success'
                        : item.status === 'pending'
                        ? 'warning'
                        : 'danger'
                    "
                    class="font-black tracking-wide uppercase select-none text-[8.5px] px-2 py-0.5 rounded-full"
                  >
                    {{
                      item.status === "completed" || item.status === "success"
                        ? "Thành công"
                        : item.status === "pending"
                        ? "Đang xử lý"
                        : "Đã hủy"
                    }}
                  </UBadge>
                </div>
              </div>
            </div>

            <!-- Lý do từ chối -->
            <transition
              enter-active-class="transition duration-200 ease-out"
              enter-from-class="opacity-0 -translate-y-2"
              enter-to-class="opacity-100 translate-y-0"
              leave-active-class="transition duration-150 ease-in"
              leave-from-class="opacity-100 translate-y-0"
              leave-to-class="opacity-0 -translate-y-2"
            >
              <div
                v-if="
                  item.showReason &&
                  (item.status === 'rejected' || item.status === 'failed') &&
                  item.rejectReason
                "
                class="px-3 py-2.5 bg-rose-50/80 dark:bg-rose-500/10 rounded-xl border border-rose-100 dark:border-rose-500/20 flex items-start gap-2"
              >
                <UIcon name="i-lucide-alert-triangle" class="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <p class="text-[10px] text-rose-600 dark:text-rose-400 font-bold leading-relaxed">
                  <span class="uppercase tracking-widest text-rose-400 dark:text-rose-500/80 mr-1">Lý do huỷ:</span>
                  {{ item.rejectReason }}
                </p>
              </div>
            </transition>
          </div>

          <!-- Empty list state -->
          <div
            v-if="historyList.length === 0"
            class="py-12 text-center text-slate-400 font-medium text-xs"
          >
            Chưa có thông tin.
          </div>
        </div>
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";

const { isLoading: isApiLoading } = usePromiseTracker();

useSeoMeta({
  title: "Tài chính & Rút tiền - Saffi",
  ogTitle: "Tài chính & Rút tiền - Saffi",
  description:
    "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  ogDescription:
    "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const { walletData, isLoading, error, fetchWallet } = useWallet();
const { user } = useAuth();
const { api } = useAppFetch();

const bankAccountInfo = ref(null);
const isBankLoading = ref(true);

const fetchBankAccount = async () => {
  if (!user.value?.id) {
    isBankLoading.value = false;
    return;
  }
  isBankLoading.value = true;
  try {
    const res = await api.get(`/bank-account/${user.value.id}`);
    if (res.data) {
      bankAccountInfo.value = res.data;
    }
  } catch (err) {
    console.error("Lỗi khi tải thông tin tài khoản ngân hàng:", err);
  } finally {
    isBankLoading.value = false;
  }
};

onMounted(() => {
  fetchWallet();
  fetchBankAccount();
  fetchHistory();
});

const availableBalance = computed({
  get: () => walletData.value.availableBalance,
  set: (val) => {
    walletData.value.availableBalance = val;
  },
});
const pendingBalance = computed({
  get: () => walletData.value.pendingBalance,
  set: (val) => {
    walletData.value.pendingBalance = val;
  },
});
const totalWithdrawn = computed({
  get: () => walletData.value.totalPaid,
  set: (val) => {
    walletData.value.totalPaid = val;
  },
});

const withdrawAmount = ref("");
const isSubmitting = ref(false);
const successMsg = ref("");
const errorMsg = ref("");

const historyList = ref([]);
const isHistoryLoading = ref(true);

const fetchHistory = async () => {
  isHistoryLoading.value = true;
  try {
    const res = await api.get("/wallet/withdrawals");
    if (res.data) {
      // Hỗ trợ cả 3 format: có pagination (res.data.items), Laravel (res.data.data), hoặc mảng (res.data)
      let dataArray = [];
      if (Array.isArray(res.data)) {
        dataArray = res.data;
      } else if (res.data && Array.isArray(res.data.data)) {
        dataArray = res.data.data;
      } else if (res.data && Array.isArray(res.data.items)) {
        dataArray = res.data.items;
      }

      historyList.value = dataArray.map((item) => {
        return {
          id: item.id || Math.random(),
          bankCode: "Tài khoản đối soát",
          account: item.reference_id,
          amount: Math.abs(item.amount),
          date: new Date(item.created_at).toLocaleString("vi-VN"),
          status: item.status,
          rejectReason: item.reject_reason,
          showReason: false,
        };
      });
    }
  } catch (err) {
    console.error("Lỗi khi tải lịch sử rút tiền:", err);
  } finally {
    isHistoryLoading.value = false;
  }
};
const formattedWithdrawAmount = computed({
  get: () => {
    if (withdrawAmount.value === "" || withdrawAmount.value === null) return "";
    return Number(withdrawAmount.value).toLocaleString("vi-VN");
  },
  set: (val) => {
    const digits = val.replace(/\D/g, "");
    withdrawAmount.value = digits ? Number(digits) : "";
  },
});

const amountError = computed(() => {
  if (withdrawAmount.value === "") return "";
  const amount = Number(withdrawAmount.value);
  if (amount < 10000) return "Số tiền rút tối thiểu là 10.000đ";
  if (amount > availableBalance.value) return "Số dư khả dụng không đủ";
  return "";
});

const canSubmit = computed(() => {
  return (
    !isApiLoading.value &&
    !isSubmitting.value &&
    bankAccountInfo.value &&
    withdrawAmount.value !== "" &&
    amountError.value === ""
  );
});

const handleSubmit = async () => {
  if (!canSubmit.value) return;

  isSubmitting.value = true;
  successMsg.value = "";
  errorMsg.value = "";

  try {
    const res = await api.post("/wallet/withdraw", {
      amount: Number(withdrawAmount.value),
    });

    // API call succeeded (if it didn't throw), update balance locally
    availableBalance.value -= withdrawAmount.value;

    // The API should return the new transaction in res.data
    const transaction = res.data;

    // Add to history list at beginning (optimistic update)
    historyList.value.unshift({
      id: transaction?.id || Date.now(),
      bankCode: "Tài khoản đối soát",
      account: transaction?.referenceId || "...",
      amount: withdrawAmount.value,
      date: new Date().toLocaleString("vi-VN"),
      status: "Đang xử lý",
    });

    successMsg.value =
      "Yêu cầu rút tiền thành công! Hệ thống đang xử lý đối soát tự động.";
    withdrawAmount.value = "";

    // Fetch wallet and history again to ensure sync
    fetchWallet();
    fetchHistory();
  } catch (error) {
    console.error("Lỗi khi rút tiền:", error, error?.data);

    // Extract exact message from parsedError in useAppFetch
    if (error?.message && error.message !== "Bad Request") {
      errorMsg.value = error.message;
    } else if (error?.data?.message) {
      errorMsg.value = error.data.message;
    } else {
      errorMsg.value = "Yêu cầu rút tiền bị từ chối. Vui lòng thử lại.";
    }

    if (error?.data?.stack) {
      errorMsg.value += " | STACK: " + error.data.stack;
    }
  } finally {
    isSubmitting.value = false;

    // Clear message after 4s
    setTimeout(() => {
      successMsg.value = "";
      errorMsg.value = "";
    }, 4000);
  }
};

const formatMoney = (val) => {
  return val.toLocaleString("vi-VN") + "đ";
};
</script>
