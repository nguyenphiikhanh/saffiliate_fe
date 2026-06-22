<template>
  <div class="w-full space-y-6">
    <!-- Page Title & Header -->
    <div class="mt-6 text-center max-w-xl mx-auto space-y-2">
      <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Trung Tâm <span class="text-[#ee4d2d]">Hỗ Trợ</span>
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
        Chúng tôi ở đây để hỗ trợ bạn giải quyết mọi vấn đề phát sinh trong quá trình đối soát hoàn tiền và rút ví.
      </p>
    </div>

    <!-- MAIN TWO SECTION COLUMNS -->
    <a-row :gutter="[24, 24]" class="mt-8 items-start">
      
      <!-- COLUMN Left: Direct Contact Channels (Span 5) -->
      <a-col :xs="24" :lg="10" class="flex flex-col gap-4">
        <h3 class="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-2">
          Kênh Liên Hệ Nhanh
        </h3>

        <!-- Zalo Box -->
        <a-card :bordered="false" hoverable class="rounded-2xl bg-blue-50/50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 transition-all shadow-sm" href="https://zalo.me" target="_blank">
          <div class="flex items-start gap-4">
            <div class="h-11 w-11 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-500 flex items-center justify-center shrink-0 font-extrabold text-xs select-none">
              Zalo
            </div>
            <div>
              <h4 class="text-xs font-black text-slate-800 dark:text-slate-100 transition-colors">Hỗ trợ Zalo OA</h4>
              <p class="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed mb-0">
                Nhắn tin trực tiếp với tổng đài viên Chăm sóc khách hàng.
              </p>
            </div>
          </div>
        </a-card>

        <!-- Telegram Box -->
        <a-card :bordered="false" hoverable class="rounded-2xl bg-sky-50/50 dark:bg-slate-900 border border-sky-100 dark:border-slate-800 transition-all shadow-sm" href="https://t.me" target="_blank">
          <div class="flex items-start gap-4">
            <div class="h-11 w-11 rounded-2xl bg-sky-100 dark:bg-sky-900/20 text-sky-500 flex items-center justify-center shrink-0 font-extrabold text-xs select-none">
              Tele
            </div>
            <div>
              <h4 class="text-xs font-black text-slate-800 dark:text-slate-100 transition-colors">Telegram Bot 24/7</h4>
              <p class="text-[10px] text-slate-500 mt-1 font-semibold leading-relaxed mb-0">
                Tra cứu tự động tiến độ đơn hàng và đối soát hoa hồng tức thì.
              </p>
            </div>
          </div>
        </a-card>

        <!-- Email Box -->
        <a-card :bordered="false" class="rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
          <span class="text-[9.5px] font-extrabold text-slate-400 uppercase tracking-wider block mb-3">Gửi thư điện tử chính thức</span>
          <div class="flex items-center gap-3 select-all">
            <div class="h-10 w-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-[#ee4d2d] flex items-center justify-center shrink-0">
              <MailOutlined class="text-lg" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black text-slate-800 dark:text-white leading-none">support@saffi.vn</span>
              <span class="text-[9px] text-slate-500 mt-1 font-semibold">Đối tác & Hợp tác doanh nghiệp</span>
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- COLUMN Right: Direct Support Message Form (Span 7) -->
      <a-col :xs="24" :lg="14">
        <a-card :bordered="false" class="rounded-3xl shadow-sm bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
          <h3 class="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60 mb-6">
            Gửi Yêu Cầu Hỗ Trợ Trực Tiếp
          </h3>

          <a-form layout="vertical" @finish="handleSubmit" class="flex flex-col gap-1">
            <!-- Subject Select -->
            <a-form-item label="Chủ đề cần hỗ trợ" class="font-extrabold text-[11px] text-slate-400 uppercase tracking-wider mb-4">
              <a-select
                v-model:value="subject"
                :options="subjectOptions"
                size="large"
                class="w-full font-bold"
              />
            </a-form-item>

            <!-- Phone (Optional) -->
            <a-form-item label="Số điện thoại liên lạc" class="font-extrabold text-[11px] text-slate-400 uppercase tracking-wider mb-4">
              <a-input
                v-model:value="phone"
                type="tel"
                placeholder="Nhập số điện thoại để chúng tôi gọi lại..."
                size="large"
                class="w-full font-semibold rounded-xl"
              />
            </a-form-item>

            <!-- Message Description -->
            <a-form-item label="Nội dung chi tiết" class="font-extrabold text-[11px] text-slate-400 uppercase tracking-wider mb-2">
              <a-textarea
                v-model:value="message"
                required
                :rows="5"
                placeholder="Hãy miêu tả chi tiết vấn đề bạn đang gặp phải (Ví dụ: Đơn hàng SP20260522-8374 mua lúc 14:30 chưa được ghi nhận tạm duyệt...)"
                size="large"
                class="w-full font-semibold resize-none rounded-xl"
              />
            </a-form-item>

            <!-- Alert updated -->
            <div v-if="successMsg" class="mb-4">
              <a-alert
                type="success"
                show-icon
                :message="successMsg"
                class="rounded-xl"
              />
            </div>

            <!-- Submit Button -->
            <a-form-item class="mb-0 mt-2">
              <a-button
                html-type="submit"
                :loading="isSubmitting"
                :disabled="!message"
                block
                type="primary"
                size="large"
                class="font-bold shadow-md shadow-orange-500/20"
              >
                Gửi Yêu Cầu Hỗ Trợ
              </a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { MailOutlined } from "@ant-design/icons-vue";

useSeoMeta({
  title: "Trung tâm hỗ trợ - Saffi",
  ogTitle: "Trung tâm hỗ trợ - Saffi",
  description: "Liên hệ trực tiếp với Saffi Team để được giải đáp và hỗ trợ kỹ thuật nhanh chóng.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const subject = ref("link");
const phone = ref("");
const message = ref("");
const isSubmitting = ref(false);
const successMsg = ref("");

const subjectOptions = [
  { label: "Lỗi quy đổi link hoàn tiền", value: "link" },
  { label: "Lỗi đối soát hoa hồng đơn hàng", value: "checkout" },
  { label: "Lỗi rút tiền ví tài chính", value: "withdraw" },
  { label: "Góp ý nâng cấp dịch vụ", value: "feedback" },
  { label: "Hợp tác kinh doanh", value: "biz" }
];

const handleSubmit = () => {
  if (!message.value) return;
  isSubmitting.value = true;
  successMsg.value = "";
  setTimeout(() => {
    isSubmitting.value = false;
    successMsg.value = "Yêu cầu hỗ trợ của bạn đã được gửi đi! Kỹ thuật viên sẽ liên lạc với bạn sớm nhất.";
    message.value = "";
    phone.value = "";
    setTimeout(() => { successMsg.value = ""; }, 4500);
  }, 1200);
};
</script>

<style scoped>
:deep(.ant-form-item-label > label) {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8 !important;
}

:deep(.ant-select-selector),
:deep(.ant-input),
:deep(.ant-input-affix-wrapper) {
  border-radius: 12px !important;
}
</style>
