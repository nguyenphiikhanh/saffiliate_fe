<template>
  <div class="w-full">
    <!-- Page Title & Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">
        Quản Lý Tài Chính
      </h1>
      <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
        Yêu cầu rút số dư hoa hồng tích lũy về tài khoản ngân hàng của bạn cực kỳ nhanh chóng.
      </p>
    </div>

    <!-- Financial Summary Cards -->
    <a-row :gutter="[24, 24]" class="mb-8">
      <!-- Khả dụng -->
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="rounded-2xl shadow-sm bg-orange-50 dark:bg-orange-950/20">
          <div class="flex justify-between items-start mb-4">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Số dư khả dụng</span>
            <div class="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/40 text-[#ee4d2d] flex items-center justify-center text-xl">
              <BankOutlined />
            </div>
          </div>
          <div class="text-3xl font-black text-slate-800 dark:text-slate-100">{{ formatMoney(availableBalance) }}</div>
          <div class="text-[10px] text-slate-400 font-bold mt-2">Có thể thanh toán</div>
        </a-card>
      </a-col>

      <!-- Chờ xử lý -->
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="rounded-2xl shadow-sm bg-white dark:bg-slate-900">
          <div class="flex justify-between items-start mb-4">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Chờ xử lý</span>
            <div class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center text-xl">
              <ClockCircleOutlined />
            </div>
          </div>
          <div class="text-3xl font-black text-slate-800 dark:text-slate-100">{{ formatMoney(pendingBalance) }}</div>
          <div class="text-[10px] text-slate-400 font-bold mt-2">Chờ rút tiền</div>
        </a-card>
      </a-col>

      <!-- Đã thanh toán -->
      <a-col :xs="24" :md="8">
        <a-card :bordered="false" class="rounded-2xl shadow-sm bg-white dark:bg-slate-900">
          <div class="flex justify-between items-start mb-4">
            <span class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Đã thanh toán</span>
            <div class="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center text-xl">
              <CheckCircleOutlined />
            </div>
          </div>
          <div class="text-3xl font-black text-slate-800 dark:text-slate-100">{{ formatMoney(totalWithdrawn) }}</div>
          <div class="text-[10px] text-slate-400 font-bold mt-2">Saffi đã thanh toán cho bạn</div>
        </a-card>
      </a-col>
    </a-row>

    <!-- Bank Account Linked Info -->
    <a-card :bordered="false" class="mb-8 rounded-2xl shadow-sm bg-white dark:bg-slate-900">
      <a-skeleton active :loading="isBankLoading">
        <div v-if="bankAccountInfo">
          <div class="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 text-slate-500">
                <BankOutlined class="text-lg" />
              </div>
              <h3 class="text-sm font-bold text-slate-800 dark:text-slate-200">Tài khoản đối soát</h3>
            </div>
            <NuxtLink to="/ho-so">
              <a-button type="text" size="small" class="font-bold text-xs text-blue-500">
                <template #icon><EditOutlined /></template>
                Chỉnh sửa
              </a-button>
            </NuxtLink>
          </div>

          <a-row :gutter="16">
            <a-col :xs="24" :sm="8">
              <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Ngân hàng</span>
              <span class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ bankAccountInfo.bank_name }}</span>
            </a-col>
            <a-col :xs="24" :sm="8">
              <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1 mt-4 sm:mt-0">Số tài khoản</span>
              <span class="text-sm font-bold text-slate-800 dark:text-slate-200">{{ bankAccountInfo.account_no }}</span>
            </a-col>
            <a-col :xs="24" :sm="8">
              <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1 mt-4 sm:mt-0">Chủ tài khoản</span>
              <span class="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase">{{ bankAccountInfo.account_name }}</span>
            </a-col>
          </a-row>
        </div>
        
        <div v-else class="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-900/20 text-[#ee4d2d] flex items-center justify-center text-xl">
              <WarningOutlined />
            </div>
            <div>
              <h4 class="text-sm font-bold text-slate-800 dark:text-slate-200">Chưa liên kết tài khoản ngân hàng</h4>
              <p class="text-xs text-slate-500 mt-1">Vui lòng liên kết tài khoản ngân hàng trong mục Hồ sơ để rút tiền.</p>
            </div>
          </div>
          <NuxtLink to="/ho-so">
            <a-button type="primary" class="font-bold">Liên kết ngay</a-button>
          </NuxtLink>
        </div>
      </a-skeleton>
    </a-card>

    <!-- Main Grid -->
    <a-row :gutter="[24, 24]">
      <!-- Withdraw Form -->
      <a-col :xs="24" :lg="14">
        <a-card :bordered="false" class="rounded-2xl shadow-sm bg-white dark:bg-slate-900" title="Yêu Cầu Rút Tiền">
          <a-form layout="vertical" @finish="handleSubmit">
            <!-- Bank preview -->
            <div v-if="bankAccountInfo" class="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs mb-6">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded-lg bg-orange-100 text-[#ee4d2d] flex items-center justify-center">
                  <BankOutlined />
                </div>
                <div>
                  <span class="block text-[10px] font-bold text-slate-400 uppercase">Rút về tài khoản</span>
                  <span class="font-bold text-slate-800 dark:text-slate-200">{{ bankAccountInfo.bank_name }} • {{ bankAccountInfo.account_no }}</span>
                </div>
              </div>
              <span class="font-bold text-[11px] text-slate-500 uppercase">{{ bankAccountInfo.account_name }}</span>
            </div>
            
            <a-alert v-else type="warning" show-icon message="Vui lòng liên kết tài khoản ngân hàng trước khi rút tiền." class="mb-6 rounded-xl" />

            <div class="flex items-center justify-between mb-2">
              <span class="text-[11px] font-bold text-slate-500 uppercase">Số tiền rút</span>
              <a-button type="link" :disabled="isApiLoading || isSubmitting" @click="withdrawAmount = availableBalance" class="p-0 text-[10px] font-bold text-[#ee4d2d]">
                RÚT TOÀN BỘ SỐ DƯ
              </a-button>
            </div>

            <a-form-item :validate-status="amountError ? 'error' : ''" :help="amountError || '* Hạn mức rút tối thiểu: 10.000đ • Miễn phí chuyển khoản'">
              <a-input
                v-model:value="formattedWithdrawAmount"
                :disabled="isApiLoading || isSubmitting || !bankAccountInfo"
                placeholder="Nhập số tiền..."
                size="large"
                class="font-bold text-lg"
              >
                <template #suffix><span class="text-xs font-bold text-slate-400">ĐỒNG</span></template>
              </a-input>
            </a-form-item>

            <a-alert v-if="errorMsg" type="error" show-icon :message="errorMsg" class="mb-4 rounded-xl" />
            <a-alert v-if="successMsg" type="success" show-icon :message="successMsg" class="mb-4 rounded-xl" />

            <a-button
              html-type="submit"
              type="primary"
              size="large"
              block
              :loading="isSubmitting"
              :disabled="!canSubmit"
              class="font-bold shadow-md shadow-orange-500/20"
            >
              Xác Nhận Rút Tiền
            </a-button>
          </a-form>
        </a-card>
      </a-col>

      <!-- History -->
      <a-col :xs="24" :lg="10">
        <a-card :bordered="false" class="rounded-2xl shadow-sm bg-white dark:bg-slate-900" title="Lịch Sử Rút Tiền">
          <a-skeleton active :loading="isHistoryLoading">
            <div v-if="historyList.length === 0" class="text-center py-8 text-slate-400 font-medium text-xs">
              Chưa có thông tin.
            </div>
            
            <div class="flex flex-col gap-3">
              <div v-for="item in historyList" :key="item.id" class="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    :class="item.status === 'completed' || item.status === 'success' ? 'bg-emerald-100 text-emerald-500' : item.status === 'pending' ? 'bg-amber-100 text-amber-500' : 'bg-rose-100 text-rose-500'">
                    <WalletOutlined />
                  </div>
                  <div>
                    <div class="text-xs font-bold text-slate-800 dark:text-slate-200">{{ item.bankCode }} ({{ item.account }})</div>
                    <div class="text-[10px] text-slate-500 mt-0.5">{{ item.date }}</div>
                  </div>
                </div>
                
                <div class="flex flex-col items-end">
                  <span class="text-xs font-bold text-slate-800 dark:text-slate-100 mb-1">{{ formatMoney(item.amount) }}</span>
                  <div class="flex items-center gap-2">
                    <a-button v-if="item.status !== 'completed' && item.status !== 'success' && item.status !== 'pending'" type="text" size="small" class="p-0 h-auto text-[10px] text-blue-500 hover:text-blue-600" @click="showRejectReason(item.rejectReason)">
                      Lý do
                    </a-button>
                    <a-tag :color="item.status === 'completed' || item.status === 'success' ? 'success' : item.status === 'pending' ? 'warning' : 'error'" style="margin: 0">
                      {{ item.status === "completed" || item.status === "success" ? "Thành công" : item.status === "pending" ? "Đang xử lý" : "Đã hủy" }}
                    </a-tag>
                  </div>
                </div>
              </div>
            </div>
          </a-skeleton>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { usePromiseTracker } from "@/composables/usePromiseTracker";
import { BankOutlined, ClockCircleOutlined, CheckCircleOutlined, WarningOutlined, EditOutlined, WalletOutlined } from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";

const { isLoading: isApiLoading } = usePromiseTracker();

useSeoMeta({
  title: "Tài chính & Rút tiền - Saffi",
  ogTitle: "Tài chính & Rút tiền - Saffi",
  description: "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  ogDescription: "Trang đối soát số dư hoa hồng và làm lệnh yêu cầu thanh toán nhanh chóng.",
  twitterCard: "summary_large_image",
});

const { walletData, isLoading, error, fetchWallet } = useWallet();
const { user } = useAuth();
const { api } = useAppFetch();

const bankAccountInfo = ref(null);
const isBankLoading = ref(true);

const fetchBankAccount = async () => {
  if (!user.value?.id) { isBankLoading.value = false; return; }
  isBankLoading.value = true;
  try {
    const res = await api.get(`/bank-account/${user.value.id}`);
    if (res.data) bankAccountInfo.value = res.data;
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

const availableBalance = computed({ get: () => walletData.value.availableBalance, set: (val) => { walletData.value.availableBalance = val; } });
const pendingBalance = computed({ get: () => walletData.value.pendingBalance, set: (val) => { walletData.value.pendingBalance = val; } });
const totalWithdrawn = computed({ get: () => walletData.value.totalPaid, set: (val) => { walletData.value.totalPaid = val; } });

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
      let dataArray = Array.isArray(res.data) ? res.data : (Array.isArray(res.data.data) ? res.data.data : (Array.isArray(res.data.items) ? res.data.items : []));
      historyList.value = dataArray.map((item) => ({
        id: item.id || Math.random(),
        bankCode: "Tài khoản đối soát",
        account: item.reference_id,
        amount: Math.abs(item.amount),
        date: new Date(item.created_at).toLocaleString("vi-VN"),
        status: item.status,
        rejectReason: item.reject_reason,
        showReason: false,
      }));
    }
  } catch (err) {
    console.error("Lỗi khi tải lịch sử rút tiền:", err);
  } finally {
    isHistoryLoading.value = false;
  }
};

const showRejectReason = (reason) => {
  Modal.info({
    title: 'Lý do từ chối',
    content: reason || 'Không có lý do cụ thể hoặc yêu cầu bị huỷ bỏ.',
    okText: 'Đóng',
    centered: true,
  });
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
  return !isApiLoading.value && !isSubmitting.value && bankAccountInfo.value && withdrawAmount.value !== "" && amountError.value === "";
});

const handleSubmit = async () => {
  if (!canSubmit.value) return;
  isSubmitting.value = true; successMsg.value = ""; errorMsg.value = "";
  try {
    const res = await api.post("/wallet/withdraw", { amount: Number(withdrawAmount.value) });
    availableBalance.value -= withdrawAmount.value;
    const transaction = res.data;
    
    historyList.value.unshift({
      id: transaction?.id || Date.now(),
      bankCode: "Tài khoản đối soát",
      account: transaction?.referenceId || "...",
      amount: withdrawAmount.value,
      date: new Date().toLocaleString("vi-VN"),
      status: "pending",
    });

    successMsg.value = "Yêu cầu rút tiền thành công! Hệ thống đang xử lý đối soát tự động.";
    withdrawAmount.value = "";
    
    fetchWallet(); fetchHistory();
  } catch (error) {
    if (error?.message && error.message !== "Bad Request") errorMsg.value = error.message;
    else if (error?.data?.message) errorMsg.value = error.data.message;
    else errorMsg.value = "Yêu cầu rút tiền bị từ chối. Vui lòng thử lại.";
  } finally {
    isSubmitting.value = false;
    setTimeout(() => { successMsg.value = ""; errorMsg.value = ""; }, 4000);
  }
};

const formatMoney = (val) => { return (val || 0).toLocaleString("vi-VN") + "đ"; };
</script>
