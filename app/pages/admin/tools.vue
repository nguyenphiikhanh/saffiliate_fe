<template>
  <div class="flex flex-col gap-6 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Công cụ Affiliate
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Tổng hợp các tiện ích giúp bạn theo dõi chiến dịch, tạo link và tối ưu doanh thu.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <a-card :bordered="false" class="admin-card overflow-hidden" :body-style="{ padding: '16px' }">
      <a-tabs v-model:activeKey="activeTab" class="w-full tools-tabs">
        
        <!-- TAB 4: CONVERT TEXT/LINK -->
        <a-tab-pane key="convert_link" tab="Convert Text/Link">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 py-4">
            <!-- Input Text -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Văn bản gốc chứa Link</label>
                <a-button type="link" size="small" class="text-xs px-0" @click="pasteText">
                  Dán (Paste)
                </a-button>
              </div>
              <a-textarea v-model:value="converter.inputText" :rows="12" placeholder="Dán đoạn văn bản hoặc nhiều link vào đây..." class="w-full text-sm leading-relaxed" />
              <a-button type="primary" size="large" class="font-semibold w-full mt-2" @click="handleConvertText" :loading="converter.loading" :disabled="!converter.inputText">
                Thực hiện Convert Link
              </a-button>
            </div>

            <!-- Output Text -->
            <div class="flex flex-col gap-2">
              <div class="flex items-center justify-between">
                <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Kết quả (Văn bản đã Convert)</label>
                <a-button type="link" size="small" class="text-xs px-0" @click="copyText(converter.outputText)" :disabled="!converter.outputText">
                  Sao chép (Copy)
                </a-button>
              </div>
              <div class="relative h-full min-h-[300px]">
                <a-textarea v-model:value="converter.outputText" :rows="12" readonly class="w-full h-full text-sm leading-relaxed !bg-slate-50 dark:!bg-slate-800 !cursor-text" placeholder="Kết quả sẽ hiển thị tại đây..." />
              </div>
            </div>
          </div>
        </a-tab-pane>

        <!-- TAB 1: LINK BUILDER -->
        <a-tab-pane key="link_builder" tab="Link Builder">
          <div class="max-w-3xl py-4 flex flex-col gap-5">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Link đích (Original URL) <span class="text-red-500">*</span></label>
              <a-input v-model:value="linkBuilder.baseUrl" size="large" placeholder="Ví dụ: https://shopee.vn/san-pham-abc..." allow-clear />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Nguồn chiến dịch (utm_source)</label>
                <a-input v-model:value="linkBuilder.utmSource" placeholder="Ví dụ: facebook, tiktok, blog..." allow-clear />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Phương tiện (utm_medium)</label>
                <a-input v-model:value="linkBuilder.utmMedium" placeholder="Ví dụ: social, email, banner..." allow-clear />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Tên chiến dịch (utm_campaign)</label>
                <a-input v-model:value="linkBuilder.utmCampaign" placeholder="Ví dụ: sale_11_11, xmash_promo..." allow-clear />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Nội dung (utm_content)</label>
                <a-input v-model:value="linkBuilder.utmContent" placeholder="Ví dụ: video_1, banner_top..." allow-clear />
              </div>
            </div>

            <!-- Result Box -->
            <div class="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col gap-3">
              <span class="text-xs font-bold text-slate-500 uppercase">Link đã tạo</span>
              <a-textarea :value="generatedLink" :rows="3" readonly class="!bg-white dark:!bg-slate-900 !text-slate-700 dark:!text-slate-200 !cursor-text" />
              <a-button type="primary" size="large" class="w-full sm:w-auto font-semibold mt-2" @click="copyText(generatedLink)" :disabled="!generatedLink">
                Sao chép Link
              </a-button>
            </div>
          </div>
        </a-tab-pane>

        <!-- TAB 2: QR GENERATOR -->
        <a-tab-pane key="qr_code" tab="Tạo mã QR">
          <div class="max-w-xl py-4 flex flex-col gap-6">
            <div class="flex flex-col gap-1.5">
              <label class="text-sm font-semibold text-slate-700 dark:text-slate-200">Đường dẫn (URL)</label>
              <div class="flex flex-col sm:flex-row gap-2">
                <a-input v-model:value="qrGenerator.url" size="large" placeholder="Nhập đường dẫn cần tạo mã QR..." allow-clear />
                <a-button size="large" @click="qrGenerator.url = generatedLink" title="Lấy từ Link Builder">Lấy Link đã tạo</a-button>
              </div>
            </div>

            <div class="flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
              <div v-if="qrGenerator.url" class="flex flex-col items-center gap-6">
                <div class="p-2 bg-white rounded-lg shadow-sm">
                  <img :src="qrImageUrl" alt="QR Code" class="w-[200px] h-[200px] object-contain" />
                </div>
                <a-button type="primary" size="large" class="font-semibold px-8" @click="downloadQrCode">
                  Tải xuống mã QR
                </a-button>
              </div>
              <div v-else class="text-slate-400 text-sm text-center py-10">
                Vui lòng nhập đường dẫn để tạo mã QR.
              </div>
            </div>
          </div>
        </a-tab-pane>

        <!-- TAB 3: COMMISSION CALCULATOR -->
        <a-tab-pane key="calculator" tab="Máy tính Hoa hồng">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 py-4">
            <!-- Inputs -->
            <div class="flex flex-col gap-5">
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Lượt Click dự kiến</label>
                <a-input-number v-model:value="calculator.clicks" :min="0" :step="100" class="w-full" size="large" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Tỷ lệ chuyển đổi - CR (%)</label>
                <a-input-number v-model:value="calculator.cr" :min="0" :max="100" :step="0.1" class="w-full" size="large" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Giá trị đơn trung bình - AOV (VNĐ)</label>
                <a-input-number v-model:value="calculator.aov" :min="0" :step="10000" class="w-full" size="large" :formatter="value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')" :parser="value => value.replace(/\$\s?|(,*)/g, '')" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-sm font-medium text-slate-600 dark:text-slate-300">Tỷ lệ hoa hồng (%)</label>
                <a-input-number v-model:value="calculator.commissionRate" :min="0" :max="100" :step="0.5" class="w-full" size="large" />
              </div>
            </div>

            <!-- Results -->
            <div class="flex flex-col gap-4">
              <div class="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span class="text-slate-600 dark:text-slate-300 font-medium">Tổng số đơn hàng</span>
                <span class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ calculatorResults.orders }} đơn</span>
              </div>
              <div class="p-5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                <span class="text-slate-600 dark:text-slate-300 font-medium">Tổng doanh số</span>
                <span class="text-lg font-bold text-slate-800 dark:text-slate-100">{{ formatCurrency(calculatorResults.revenue) }}</span>
              </div>
              <div class="p-6 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-800 flex flex-col items-center justify-center gap-2 mt-2">
                <span class="text-indigo-600 dark:text-indigo-400 font-bold uppercase text-xs tracking-wider">Hoa hồng ước tính</span>
                <span class="text-3xl sm:text-4xl font-black text-indigo-700 dark:text-indigo-300">{{ formatCurrency(calculatorResults.commission) }}</span>
              </div>
            </div>
          </div>
        </a-tab-pane>

      </a-tabs>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import { message } from "ant-design-vue";

definePageMeta({ layout: "admin" });
useHead({ title: "Công cụ Affiliate | Saffi Admin" });

const { api } = useAppFetch();

const activeTab = ref("convert_link");

// --- TAB 1: Link Builder ---
const linkBuilder = reactive({
  baseUrl: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  utmContent: "",
});

const generatedLink = computed(() => {
  if (!linkBuilder.baseUrl) return "";
  try {
    const url = new URL(linkBuilder.baseUrl);
    if (linkBuilder.utmSource) url.searchParams.set("utm_source", linkBuilder.utmSource);
    if (linkBuilder.utmMedium) url.searchParams.set("utm_medium", linkBuilder.utmMedium);
    if (linkBuilder.utmCampaign) url.searchParams.set("utm_campaign", linkBuilder.utmCampaign);
    if (linkBuilder.utmContent) url.searchParams.set("utm_content", linkBuilder.utmContent);
    return url.toString();
  } catch (e) {
    return "Đường dẫn không hợp lệ. Vui lòng thêm http:// hoặc https://";
  }
});

// --- TAB 2: QR Generator ---
const qrGenerator = reactive({
  url: "",
});

const qrImageUrl = computed(() => {
  if (!qrGenerator.url) return "";
  return `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${encodeURIComponent(qrGenerator.url)}`;
});

const downloadQrCode = async () => {
  if (!qrImageUrl.value) return;
  try {
    const response = await fetch(qrImageUrl.value);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "qrcode.png";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    message.success("Đã tải xuống mã QR!");
  } catch (err) {
    message.error("Lỗi khi tải xuống mã QR!");
  }
};

// --- TAB 3: Commission Calculator ---
const calculator = reactive({
  clicks: 1000,
  cr: 2.5,
  aov: 200000,
  commissionRate: 5.0,
});

const calculatorResults = computed(() => {
  const orders = Math.floor((calculator.clicks * calculator.cr) / 100);
  const revenue = orders * calculator.aov;
  const commission = Math.floor((revenue * calculator.commissionRate) / 100);
  return { orders, revenue, commission };
});

const formatCurrency = (value) => {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
};

// --- TAB 4: Convert Text/Link ---
const converter = reactive({
  inputText: "",
  outputText: "",
  loading: false,
});

const handleConvertText = async () => {
  if (!converter.inputText) return;
  converter.loading = true;
  try {
    const res = await api.post("/admin/link/replace", { text: converter.inputText });
    if (res?.data?.text || res?.text) {
      converter.outputText = res?.data?.text || res?.text;
      message.success("Convert Link thành công!");
    } else {
      message.error("Dữ liệu trả về không hợp lệ.");
    }
  } catch (err) {
    console.error("Lỗi convert link:", err);
    message.error(err?.data?.message || err?.message || "Lỗi khi convert link!");
  } finally {
    converter.loading = false;
  }
};

// --- Global Utilities ---
const copyText = async (text) => {
  if (!text) return;
  try {
    await navigator.clipboard.writeText(text);
    message.success("Đã sao chép vào bộ nhớ tạm!");
  } catch (err) {
    message.error("Trình duyệt không hỗ trợ sao chép tự động!");
  }
};

const pasteText = async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (text) {
      converter.inputText = text;
      message.success("Đã dán từ bộ nhớ tạm!");
    } else {
      message.warning("Bộ nhớ tạm đang trống!");
    }
  } catch (err) {
    message.error("Trình duyệt không cho phép đọc bộ nhớ tạm!");
  }
};
</script>

<style scoped>
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
/* Optimize tabs for mobile */
:deep(.tools-tabs .ant-tabs-nav) {
  margin-bottom: 0 !important;
}
:deep(.tools-tabs .ant-tabs-tab) {
  padding: 12px 16px;
  font-weight: 600;
}
</style>
