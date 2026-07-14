<template>
  <div class="w-full pb-24 md:pb-6">
    <a-collapse
      v-model:activeKey="activeKey"
      ghost
      expandIconPosition="end"
      class="mt-4"
    >
      <!-- Important Notes -->
      <a-collapse-panel
        key="1"
        class="mb-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <template #header>
          <div class="flex items-center gap-3 py-1">
            <div
              class="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center shrink-0"
            >
              <WarningOutlined class="text-xl" />
            </div>
            <div class="flex flex-col text-left">
              <span
                class="font-bold text-[13px] text-slate-800 dark:text-slate-100 uppercase tracking-wider"
                >Lưu ý Quan trọng</span
              >
              <span class="text-[11px] font-bold text-slate-500 mt-0.5"
                >Đọc kỹ để đảm bảo nhận hoàn tiền mua sắm</span
              >
            </div>
          </div>
        </template>
        <template #extra>
          <span
            class="text-xs font-bold w-8 text-center select-none text-amber-500 mr-1"
            >{{ activeKey.includes("1") ? "Ẩn" : "Xem" }}</span
          >
        </template>

        <div class="px-2 pb-2">
          <div class="flex flex-col gap-3 mb-6">
            <div
              class="flex items-start gap-3"
              v-for="(note, idx) in importantNotes"
              :key="idx"
            >
              <div
                class="w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-500 font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5 border border-amber-100 dark:border-amber-800"
              >
                {{ idx + 1 }}
              </div>
              <p
                class="text-[13px] text-slate-600 dark:text-slate-400 font-medium leading-relaxed m-0"
                v-html="note"
              ></p>
            </div>
          </div>

          <a-row :gutter="12">
            <a-col :span="12">
              <div
                class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
              >
                <div
                  class="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/20 text-amber-500 flex items-center justify-center shrink-0"
                >
                  <ClockCircleOutlined class="text-lg" />
                </div>
                <div>
                  <div
                    class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5"
                  >
                    Thời gian ghi nhận
                  </div>
                  <div
                    class="text-[13px] font-bold text-slate-700 dark:text-slate-300"
                  >
                    Trong vòng <span class="text-[#ee4d2d]">24h</span>
                  </div>
                </div>
              </div>
            </a-col>
            <a-col :span="12">
              <div
                class="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700"
              >
                <div
                  class="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500 flex items-center justify-center shrink-0"
                >
                  <CheckCircleOutlined class="text-lg" />
                </div>
                <div>
                  <div
                    class="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5"
                  >
                    Thời gian duyệt hoàn
                  </div>
                  <div class="text-[13px] font-bold text-emerald-500">
                    7 - 14 ngày
                  </div>
                </div>
              </div>
            </a-col>
          </a-row>
        </div>
      </a-collapse-panel>

      <!-- Quick Guide Card -->
      <a-collapse-panel
        key="2"
        class="mb-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden"
      >
        <template #header>
          <div class="flex items-center gap-3 py-1">
            <div
              class="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-[#ee4d2d] flex items-center justify-center shrink-0"
            >
              <BookOutlined class="text-xl" />
            </div>
            <div class="flex flex-col text-left">
              <span
                class="font-bold text-[13px] text-slate-800 dark:text-slate-100 uppercase tracking-wider"
                >Hướng Dẫn Nhanh</span
              >
              <span class="text-[11px] font-bold text-slate-500 mt-0.5"
                >Cách mua hàng qua Saffi & nhận hoàn tiền</span
              >
            </div>
          </div>
        </template>
        <template #extra>
          <span
            class="text-xs font-bold w-8 text-center select-none text-[#ee4d2d] mr-1"
            >{{ activeKey.includes("2") ? "Ẩn" : "Xem" }}</span
          >
        </template>

        <div class="px-2 pb-2">
          <a-carousel
            arrows
            class="bg-slate-50 dark:bg-slate-800 border border-dashed border-slate-200 dark:border-slate-700 rounded-xl mb-4"
          >
            <template #prevArrow>
              <div class="custom-slick-arrow" style="left: 10px; z-index: 10">
                <a-button shape="circle" size="small"
                  ><LeftOutlined
                /></a-button>
              </div>
            </template>
            <template #nextArrow>
              <div class="custom-slick-arrow" style="right: 10px; z-index: 10">
                <a-button shape="circle" size="small"
                  ><RightOutlined
                /></a-button>
              </div>
            </template>
            <div v-for="(step, index) in steps" :key="'step-' + index">
              <div
                class="pt-6 pb-10 px-8 flex flex-col items-center text-center min-h-[260px] select-none"
              >
                <div
                  v-if="step.image"
                  class="mb-4 rounded-xl overflow-hidden shadow-sm inline-block max-w-[200px] border border-slate-100 dark:border-slate-700"
                >
                  <img
                    :src="step.image"
                    :alt="step.title"
                    class="w-full h-auto object-cover pointer-events-none"
                  />
                </div>
                <h5
                  class="text-sm font-bold text-slate-800 dark:text-slate-200 mb-2"
                >
                  {{ step.title }}
                </h5>
                <p
                  class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-0"
                  v-html="step.desc"
                ></p>
              </div>
            </div>
          </a-carousel>

          <div class="flex justify-center mt-2">
            <a-button
              type="primary"
              size="small"
              @click="activeKey = activeKey.filter((k) => k !== '2')"
              class="px-6 font-bold rounded-full"
            >
              Đã hiểu
            </a-button>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>

    <!-- Link Converter Component -->
    <div class="mt-4">
      <LinkConverter />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  WarningOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  BookOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons-vue";

const activeKey = ref([]);

const importantNotes = [
  "Vui lòng <strong>xóa các sản phẩm tương tự</strong> có sẵn trong giỏ trước khi <strong>mua hàng qua Saffi</strong> để tránh lỗi ghi đè nguồn tracking.",
  "<strong>Giao dịch liền mạch:</strong> Hãy hoàn tất việc thanh toán <strong>trong cùng một phiên</strong> làm việc trên trình duyệt ngay sau khi nhấn link để cookie được lưu vết chính xác.",
  "<strong>Ghi nhận tự động:</strong> Trạng thái đơn hàng được <strong>sàn TMĐT đối tác quyết định tự động</strong>. Saffi hỗ trợ đối soát kỹ thuật và không thể trực tiếp can thiệp kết quả này.",
  "Hãy thực hiện mua hàng với <strong>tốc độ thao tác bình thường</strong>. Mua quá nhanh có thể bị hệ thống bảo mật của sàn quét nhầm là <strong>bot/spam</strong> và từ chối hoàn tiền.",
];

const steps = [
  {
    title: "Tìm sản phẩm & Chia sẻ",
    desc: "Mở ứng dụng Shopee hoặc TikTok, Lazada, chọn sản phẩm cần mua và nhấn nút <span class='text-[#ee4d2d] font-bold bg-orange-50 px-1 rounded'>Chia sẻ</span> (hình mũi tên).",
    image: "/step/1.jpg",
  },
  {
    title: "Sao chép đường dẫn",
    desc: "Trong menu chia sẻ hiện ra, chọn nút <span class='text-[#ee4d2d] font-bold bg-orange-50 px-1 rounded'>Sao chép đường dẫn</span>",
    image: "/step/2.jpg",
  },
  {
    title: "Dán link vào Saffi",
    desc: "Trở lại ứng dụng Saffi, <span class='text-[#ee4d2d] font-bold'>Dán link</span> vừa sao chép vào ô nhập bên dưới, nhấn vào nút <span class='text-[#ee4d2d] font-bold'>Hoàn Tiền</span> để xem thông tin.",
    image: "/step/3.jpg",
  },
  {
    title: "Mua sắm & Nhận hoàn tiền",
    desc: "Nhấn nút đây để mở ứng dụng sàn và mua sắm như bình thường. Tiền hoàn lại sẽ <span class='text-[#ee4d2d] font-bold'>tự động được tích lũy</span> vào tài khoản Saffi của bạn!",
    image: "/step/4.jpg",
  },
];

useSeoMeta({
  title: "Quy đổi hoàn tiền - Saffi",
  ogTitle: "Quy đổi hoàn tiền - Saffi",
  description:
    "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  ogDescription:
    "Công cụ chuyển đổi link sản phẩm Shopee thành link tiếp thị liên kết hoàn tiền chuyên nghiệp và nhanh chóng.",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
:deep(.ant-collapse-item) {
  border-bottom: none !important;
}

:deep(.ant-collapse-header) {
  padding: 16px !important;
  align-items: center !important;
}

:deep(.ant-collapse-content-box) {
  padding: 0 16px 16px 16px !important;
}
</style>
