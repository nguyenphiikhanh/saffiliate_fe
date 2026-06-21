<template>
  <div class="w-full space-y-6">
    <!-- Page Title & Header -->
    <div class="mt-6 text-center max-w-xl mx-auto space-y-2">
      <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Trung Tâm <span class="text-shopee-orange">Hỗ Trợ</span>
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
        Chúng tôi ở đây để hỗ trợ bạn giải quyết mọi vấn đề phát sinh trong quá trình đối soát hoàn tiền và rút ví.
      </p>
    </div>

    <!-- MAIN TWO SECTION COLUMNS -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12 items-start">
      
      <!-- COLUMN Left: Direct Contact Channels (Span 5) -->
      <div class="lg:col-span-5 flex flex-col gap-5">
        <h3 class="text-xs font-black tracking-widest text-slate-800 dark:text-slate-200 uppercase select-none pb-2">
          Kênh Liên Hệ Nhanh
        </h3>

        <!-- Zalo Box -->
        <a
          href="https://zalo.me"
          target="_blank"
          class="rounded-3xl border border-blue-500/10 bg-blue-500/[0.02] dark:bg-slate-900/40 p-5 shadow-lg shadow-slate-900/[0.01] hover:border-blue-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-between gap-4 group"
        >
          <div class="flex items-start gap-4">
            <!-- Icon Zalo representation -->
            <div class="h-11 w-11 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0 font-extrabold text-xs select-none">
              Zalo
            </div>
            <div>
              <h4 class="text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-blue-500 transition-colors">Hỗ trợ Zalo OA</h4>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-semibold leading-relaxed">
                Nhắn tin trực tiếp với tổng đài viên Chăm sóc khách hàng.
              </p>
            </div>
          </div>
          <ArrowRightOutlined class="text-[20px] text-slate-350 dark:text-slate-655 group-hover:text-blue-500 transition-colors shrink-0" />
        </a>

        <!-- Telegram Box -->
        <a
          href="https://t.me"
          target="_blank"
          class="rounded-3xl border border-sky-500/10 bg-sky-500/[0.02] dark:bg-slate-900/40 p-5 shadow-lg shadow-slate-900/[0.01] hover:border-sky-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-between gap-4 group"
        >
          <div class="flex items-start gap-4">
            <!-- Icon Telegram representation -->
            <div class="h-11 w-11 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center shrink-0 font-extrabold text-xs select-none">
              Tele
            </div>
            <div>
              <h4 class="text-xs font-black text-slate-800 dark:text-slate-100 group-hover:text-sky-500 transition-colors">Telegram Bot 24/7</h4>
              <p class="text-[10px] text-slate-400 dark:text-slate-500 mt-1 font-semibold leading-relaxed">
                Tra cứu tự động tiến độ đơn hàng và đối soát hoa hồng tức thì.
              </p>
            </div>
          </div>
          <ArrowRightOutlined class="text-[20px] text-slate-355 dark:text-slate-655 group-hover:text-sky-500 transition-colors shrink-0" />
        </a>

        <!-- Email Box -->
        <div
          class="p-5 ring-1 ring-slate-100 dark:ring-slate-800/60 bg-white dark:bg-slate-900/40 rounded-3xl shadow-lg shadow-slate-900/[0.01]"
        >
          <span class="text-[9.5px] font-extrabold text-slate-400 dark:text-slate-550 uppercase tracking-wider block mb-3">Gửi thư điện tử chính thức</span>
          <div class="flex items-center gap-3 select-all">
            <div class="h-9 w-9 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0">
              <MailOutlined class="text-[18px]" />
            </div>
            <div class="flex flex-col">
              <span class="text-xs font-black text-slate-800 dark:text-white leading-none">support@saffi.vn</span>
              <span class="text-[9px] text-slate-400 dark:text-slate-550 mt-1 font-semibold">Đối tác & Hợp tác doanh nghiệp</span>
            </div>
          </div>
        </div>
      </div>

      <!-- COLUMN Right: Direct Support Message Form (Span 7) -->
      <div
        class="lg:col-span-7 p-6 ring-1 ring-slate-100 dark:ring-slate-800/80 bg-white dark:bg-slate-900/60 rounded-3xl shadow-xl shadow-slate-900/[0.02] dark:shadow-slate-950/20"
      >
        <h3 class="text-xs font-black tracking-widest text-slate-850 dark:text-slate-205 uppercase select-none pb-4 border-b border-slate-100 dark:border-slate-800/60">
          Gửi Yêu Cầu Hỗ Trợ Trực Tiếp
        </h3>

        <form @submit.prevent="handleSubmit" class="mt-6 flex flex-col gap-5">
          <!-- Subject Select -->
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Chủ đề cần hỗ trợ</span>
            <a-select
              v-model:value="subject"
              :options="subjectOptions"
              size="large"
              class="w-full font-bold"
            />
          </div>

          <!-- Phone (Optional) -->
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Số điện thoại liên lạc</span>
            <a-input
              v-model:value="phone"
              type="tel"
              placeholder="Nhập số điện thoại để chúng tôi gọi lại..."
              size="large"
              class="w-full font-semibold rounded-2xl"
            />
          </div>

          <!-- Message Description -->
          <div class="flex flex-col gap-1">
            <span class="text-[11px] font-extrabold tracking-wider text-slate-400 dark:text-slate-500 uppercase">Nội dung chi tiết</span>
            <a-textarea
              v-model:value="message"
              required
              :rows="5"
              placeholder="Hãy miêu tả chi tiết vấn đề bạn đang gặp phải (Ví dụ: Đơn hàng SP20260522-8374 mua lúc 14:30 chưa được ghi nhận tạm duyệt...)"
              size="large"
              class="w-full font-semibold resize-none rounded-2xl"
            />
          </div>

          <!-- Alert updated -->
          <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="transform -translate-y-2 opacity-0"
            enter-to-class="transform translate-y-0 opacity-100"
          >
            <div v-if="successMsg">
              <a-alert
                type="success"
                show-icon
                :message="successMsg"
              >
                <template #icon><CheckCircleOutlined /></template>
              </a-alert>
            </div>
          </transition>

          <!-- Submit Button -->
          <a-button
            html-type="submit"
            :loading="isSubmitting"
            :disabled="!message"
            block
            type="primary"
            size="large"
            class="font-bold text-xs py-5 rounded-2xl shadow-lg shadow-orange-500/15"
          >
            Gửi Yêu Cầu Hỗ Trợ
          </a-button>
        </form>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ArrowRightOutlined, MailOutlined, CheckCircleOutlined } from "@ant-design/icons-vue";

useSeoMeta({
  title: "Trung tâm hỗ trợ - Saffi",
  ogTitle: "Trung tâm hỗ trợ - Saffi",
  description: "Liên hệ trực tiếp với Saffi Team để được giải đáp và hỗ trợ kỹ thuật nhanh chóng.",
  ogDescription: "Liên hệ trực tiếp với Saffi Team để được giải đáp và hỗ trợ kỹ thuật nhanh chóng.",
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
    
    // Clear fields
    message.value = "";
    phone.value = "";

    setTimeout(() => {
      successMsg.value = "";
    }, 4500);
  }, 1200);
};
</script>
