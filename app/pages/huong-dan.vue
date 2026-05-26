<template>
  <div class="w-full animate-fade-in">
    <!-- Page Title & Header -->
    <div class="mt-6 text-center max-w-2xl mx-auto">
      <h1 class="text-[30px] font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Hướng Dẫn <span class="text-shopee-orange">Mua Sắm</span> Hoàn Tiền
      </h1>
      <p class="text-[14px] text-slate-500 dark:text-slate-400 mt-1.5 font-medium leading-relaxed">
        Chỉ với 3 bước đơn giản, bạn sẽ tiết kiệm được tối đa chi phí cho mỗi đơn hàng mua sắm trên Shopee.
      </p>
    </div>

    <!-- 3-Step Visual Timeline / Narrative Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 relative">
      <!-- Background Connecting Line for Desktop -->
      <div class="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-100 dark:bg-slate-800/80 -translate-y-12 z-0"></div>

      <!-- Step Cards -->
      <div
        v-for="(step, idx) in steps"
        :key="idx"
        class="rounded-[2rem] border border-slate-100 dark:border-slate-800/60 bg-white dark:bg-slate-900/40 p-8 shadow-lg shadow-slate-900/[0.01] dark:shadow-slate-950/10 hover:border-slate-200 dark:hover:border-slate-700 hover:scale-[1.02] transition-all duration-300 z-10 group"
      >
        <!-- Step Icon & Number -->
        <div class="flex items-center justify-between gap-3">
          <!-- Big Step Number -->
          <span class="text-[52px] font-black tracking-tight transition-transform duration-300 group-hover:scale-105" :class="step.numberClass">
            {{ step.num }}
          </span>
          <!-- Beautiful Icon Badge -->
          <div class="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12" :class="step.badgeClass">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" :d="step.icon" />
            </svg>
          </div>
        </div>

        <h3 class="text-[15px] font-black text-slate-800 dark:text-slate-100 mt-5 uppercase tracking-wider">{{ step.title }}</h3>
        <p class="text-[13.5px] text-slate-400 dark:text-slate-400 mt-2 leading-relaxed font-semibold">{{ step.desc }}</p>
      </div>
    </div>

    <!-- Accordion FAQ section -->
    <div class="max-w-3xl mx-auto mt-16">
      <h2 class="text-center text-[22px] font-black text-slate-900 dark:text-white uppercase tracking-tight">
        Câu Hỏi Thường Gặp <span class="text-shopee-orange">(FAQ)</span>
      </h2>
      <p class="text-center text-slate-400 dark:text-slate-500 text-[11.5px] mt-1 font-bold">Giải đáp mọi thắc mắc của bạn về cơ chế hoàn tiền tự động</p>

      <!-- Accordion Items -->
      <div class="mt-8 flex flex-col gap-3.5">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="rounded-2xl border border-slate-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 overflow-hidden shadow-sm"
        >
          <!-- Accordion Trigger Button -->
          <button
            @click="toggleFAQ(index)"
            type="button"
            class="w-full flex items-center justify-between gap-4 p-5 text-left font-bold text-slate-800 dark:text-slate-200 text-[14px] hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors duration-300 cursor-pointer select-none"
          >
            <span>{{ faq.question }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4.5 w-4.5 text-slate-400 dark:text-slate-500 transition-transform duration-300 shrink-0"
              :class="{ 'rotate-180 text-shopee-orange': openFAQ === index }"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Accordion Content Height Truncation Panel -->
          <div
            class="transition-all duration-300 ease-in-out"
            :style="{ maxHeight: openFAQ === index ? '200px' : '0px' }"
          >
            <div class="p-5 pt-0 border-t border-slate-50 dark:border-slate-800/50 text-[13px] text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

useSeoMeta({
  title: "Hướng dẫn sử dụng - Saffi",
  ogTitle: "Hướng dẫn sử dụng - Saffi",
  description: "Cẩm nang hướng dẫn các bước mua hàng Shopee để được hoàn tiền tự động 100% tại Saffi.",
  ogDescription: "Cẩm nang hướng dẫn các bước mua hàng Shopee để được hoàn tiền tự động 100% tại Saffi.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const openFAQ = ref(null);

const toggleFAQ = (idx) => {
  openFAQ.value = openFAQ.value === idx ? null : idx;
};

const steps = [
  {
    num: "01",
    title: "COPY LINK SHOPEE",
    desc: "Sao chép liên kết sản phẩm bạn yêu thích trực tiếp trên ứng dụng Shopee (hoặc bất kỳ trình duyệt nào).",
    icon: "M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3",
    numberClass: "text-orange-500",
    badgeClass: "bg-orange-50 dark:bg-orange-950/30 text-orange-500",
  },
  {
    num: "02",
    title: "DÁN & CHUYỂN ĐỔI",
    desc: "Mở Saffi, dán liên kết vừa copy vào ô công cụ. Hệ thống sẽ tự động chuyển đổi thành đường link hoàn tiền thông minh trong 1 giây.",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    numberClass: "text-amber-500",
    badgeClass: "bg-amber-50 dark:bg-amber-950/20 text-amber-500",
  },
  {
    num: "03",
    title: "MUA SẮM & NHẬN TIỀN",
    desc: "Click vào link chuyển đổi để mua hàng trên Shopee. Hoa hồng trích lại lên tới 90% sẽ được cộng vào số dư Saffi để bạn rút về tài khoản ngân hàng bất kỳ lúc nào!",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    numberClass: "text-emerald-500",
    badgeClass: "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500",
  },
];

const faqs = [
  {
    question: "Hoàn tiền hoạt động thế nào?",
    answer: "Saffi liên kết trực tiếp với Shopee Affiliate (Tiếp thị liên kết). Khi bạn mua hàng thông qua link chuyển đổi của chúng tôi, Shopee sẽ chi trả tiền hoa hồng tiếp thị cho Saffi. Chúng tôi trích xuất phần lớn tiền hoa hồng này (lên tới 90%) để trực tiếp hoàn lại vào tài khoản ví của bạn.",
  },
  {
    question: "Sau bao lâu thì nhận được hoa hồng sau khi mua hàng?",
    answer: "Hệ thống sẽ cập nhật tự động hoa hồng 'Chờ duyệt' trong 7-14 ngày kể từ lúc bạn thanh toán hoặc đặt hàng thành công trên Shopee. Tiền hoàn chính thức khả dụng để rút sau khi đơn hàng được đối soát thành công (khách hàng không bấm trả hàng hoàn tiền).",
  },
  {
    question: "Tại sao đơn hàng của tôi bị hủy hoặc không nhận được hoàn tiền?",
    answer: "Đơn hàng có thể không được ghi nhận hoàn tiền nếu bạn hủy đơn hoặc trả hàng hoàn tiền, hoặc sử dụng các trình duyệt bật chặn quảng cáo AdBlock làm mất cookie đối soát của Shopee. Hãy đảm bảo click link chuyển đổi và đặt hàng ngay lập tức trên app Shopee sạch.Cashback có thể bị hủy từ sàn, Saffi là trung gian nên không được cung cấp lý do cụ thể, nhưng luôn sẵn sàng gửi thông tin đối soát từ sàn cho bạn để đảm bảo hệ thống minh bạch. Vui lòng liên hệ Hỗ trợ để được cung cấp thêm thông tin.",
  },
  {
    question: "Có giới hạn số tiền rút tối thiểu không?",
    answer: "Số tiền tối thiểu cho mỗi lần thực hiện lệnh rút tiền là 10,000đ. Hệ thống của chúng tôi cam kết phê duyệt lệnh rút tự động và chuyển tiền đến tài khoản MB Bank, Vietcombank, Techcombank,... trong vòng chưa đầy 60 phút.",
  },
];
</script>
