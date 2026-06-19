<template>
  <div class="w-full animate-fade-in space-y-12">
    <!-- Page Title & Header -->
    <div class="mt-6 text-center max-w-2xl mx-auto space-y-2">
      <h1 class="text-3xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        Hướng Dẫn <span class="text-shopee-orange">Mua Sắm</span> Hoàn Tiền
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
        Chỉ với 3 bước đơn giản, bạn sẽ tiết kiệm được tối đa chi phí cho mỗi đơn hàng mua sắm trên Shopee.
      </p>
    </div>

    <!-- 3-Step Visual Timeline Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
      <!-- Background Connecting Line for Desktop -->
      <div class="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-slate-100 dark:bg-slate-800/80 -translate-y-12 z-0"></div>

      <!-- Step Cards -->
      <UCard
        v-for="(step, idx) in steps"
        :key="idx"
        :ui="{
          body: 'p-8',
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/60 hover:ring-slate-200 dark:hover:ring-slate-700',
          background: 'bg-white dark:bg-slate-900/40 hover:scale-[1.02] transition-all duration-300',
          rounded: 'rounded-[2rem] shadow-lg shadow-slate-900/[0.01] dark:shadow-slate-950/10'
        }"
        class="z-10 group"
      >
        <!-- Step Icon & Number -->
        <div class="flex items-center justify-between gap-3">
          <!-- Big Step Number -->
          <span class="text-[52px] font-black tracking-tight transition-transform duration-300 group-hover:scale-105" :class="step.numberClass">
            {{ step.num }}
          </span>
          <!-- Beautiful Icon Badge -->
          <div class="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-12" :class="step.badgeClass">
            <UIcon :name="step.icon" class="h-5.5 w-5.5" />
          </div>
        </div>

        <h3 class="text-sm font-black text-slate-850 dark:text-slate-205 mt-5 uppercase tracking-wider">
          {{ step.title }}
        </h3>
        <p class="text-xs text-slate-450 dark:text-slate-400 mt-2 leading-relaxed font-semibold">
          {{ step.desc }}
        </p>
      </UCard>
    </div>

    <!-- Accordion FAQ section -->
    <div class="max-w-3xl mx-auto space-y-6">
      <div class="text-center space-y-1">
        <h2 class="text-[22px] font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Câu Hỏi Thường Gặp <span class="text-shopee-orange">(FAQ)</span>
        </h2>
        <p class="text-slate-400 dark:text-slate-500 text-[11.5px] font-bold">
          Giải đáp mọi thắc mắc của bạn về cơ chế hoàn tiền tự động
        </p>
      </div>

      <!-- FAQ Accordion -->
      <UCard
        :ui="{
          body: 'p-4 md:p-6',
          ring: 'ring-1 ring-slate-100 dark:ring-slate-800/80',
          background: 'bg-white dark:bg-slate-900/60',
          rounded: 'rounded-2xl'
        }"
      >
        <UAccordion
          :items="faqItems"
          multiple
          class="divide-y divide-slate-100 dark:divide-slate-800/50"
        />
      </UCard>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

useSeoMeta({
  title: "Hướng dẫn sử dụng - Saffi",
  ogTitle: "Hướng dẫn sử dụng - Saffi",
  description: "Cẩm nang hướng dẫn các bước mua hàng Shopee để được hoàn tiền tự động 100% tại Saffi.",
  ogDescription: "Cẩm nang hướng dẫn các bước mua hàng Shopee để được hoàn tiền tự động 100% tại Saffi.",
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});

const steps = [
  {
    num: "01",
    title: "COPY LINK SHOPEE",
    desc: "Sao chép liên kết sản phẩm bạn yêu thích trực tiếp trên ứng dụng Shopee (hoặc bất kỳ trình duyệt nào).",
    icon: "i-heroicons-clipboard-document-list",
    numberClass: "text-orange-500",
    badgeClass: "bg-orange-50 dark:bg-orange-950/30 text-orange-500",
  },
  {
    num: "02",
    title: "DÁN & CHUYỂN ĐỔI",
    desc: "Mở Saffi, dán liên kết vừa copy vào ô công cụ. Hệ thống sẽ tự động chuyển đổi thành đường link hoàn tiền thông minh trong 1 giây.",
    icon: "i-heroicons-arrow-path",
    numberClass: "text-amber-500",
    badgeClass: "bg-amber-50 dark:bg-amber-950/20 text-amber-500",
  },
  {
    num: "03",
    title: "MUA SẮM & NHẬN TIỀN",
    desc: "Click vào link chuyển đổi để mua hàng trên Shopee. Hoa hồng trích lại lên tới 90% sẽ được cộng vào số dư Saffi để bạn rút về tài khoản ngân hàng bất kỳ lúc nào!",
    icon: "i-heroicons-banknotes",
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

const faqItems = computed(() => {
  return faqs.map(faq => ({
    label: faq.question,
    content: faq.answer
  }));
});
</script>
