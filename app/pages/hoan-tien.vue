<template>
  <div class="hoan-tien-page animate-fade-in">
    <a-collapse
      v-model:activeKey="activeKey"
      ghost
      expandIconPosition="end"
      class="custom-collapse mt-4"
    >
      <!-- Important Notes -->
      <a-collapse-panel key="1" class="guide-card mb-4">
        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                />
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
              </svg>
            </div>
            <div class="flex flex-col text-left">
              <a-typography-text
                strong
                class="uppercase text-[13px] tracking-wider"
                ><b>Lưu ý Quan trọng</b></a-typography-text
              >
              <p class="text-[11px] font-bold text-slate-400 mt-1 mb-0">
                Đọc kỹ để đảm bảo nhận hoàn tiền mua sắm
              </p>
            </div>
          </div>
        </template>
        <template #extra>
          <span class="text-[12px] font-bold w-8 text-center select-none text-amber-500 mr-1">{{ activeKey.includes('1') ? 'Ẩn' : 'Xem' }}</span>
        </template>
        <div class="pt-2">
          <div class="notes-list">
            <div
              class="note-item"
              v-for="(note, idx) in importantNotes"
              :key="idx"
            >
              <div class="note-num">{{ idx + 1 }}</div>
              <p class="note-text" v-html="note"></p>
            </div>
          </div>

          <!-- Quick Metrics Grid -->
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon metric-icon--yellow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path d="M13 3 4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <div class="metric-label">Thời gian ghi nhận</div>
                <div class="metric-value">
                  Trong vòng <span class="text-shopee-orange">24h</span>
                </div>
              </div>
            </div>
            <div class="metric-card">
              <div class="metric-icon metric-icon--emerald">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <line x1="2" x2="22" y1="10" y2="10" />
                </svg>
              </div>
              <div>
                <div class="metric-label">Thời gian duyệt hoàn</div>
                <div
                  class="metric-value"
                  style="color: #10b981; font-weight: 700"
                >
                  7 - 14 ngày
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-collapse-panel>

      <!-- Quick Guide Card -->
      <a-collapse-panel key="2" class="guide-card mb-4">
        <template #header>
          <div class="flex items-center gap-3">
            <div
              class="w-10 h-10 rounded-xl bg-[#EE4D2D]/10 text-[#EE4D2D] flex items-center justify-center shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <path d="M12 2v8" />
                <path d="m4.93 10.93 1.41 1.41" />
                <path d="M2 18h2" />
                <path d="M20 18h2" />
                <path d="m19.07 10.93-1.41 1.41" />
                <path d="M22 22H2" />
                <path d="m8 22 4-10 4 10" />
              </svg>
            </div>
            <div class="flex flex-col text-left">
              <a-typography-text
                strong
                class="uppercase text-[13px] tracking-wider"
                ><b>Hướng Dẫn Nhanh</b></a-typography-text
              >
              <p class="text-[11px] font-bold text-slate-400 mt-1 mb-0">
                Cách mua hàng qua Saffi & nhận hoàn tiền với vài thao tác đơn
                giản
              </p>
            </div>
          </div>
        </template>
        <template #extra>
          <span class="text-[12px] font-bold w-8 text-center select-none text-[#EE4D2D] mr-1">{{ activeKey.includes('2') ? 'Ẩn' : 'Xem' }}</span>
        </template>
        <div class="pt-2">
          <div class="px-2 pb-2">
            <a-carousel arrows class="guide-carousel mb-4 bg-slate-50 border border-dashed border-slate-200 rounded-lg">
              <template #prevArrow>
                <div class="custom-slick-arrow" style="left: 0px; z-index: 10;">
                  <div class="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white text-slate-600 hover:text-[#EE4D2D] rounded-full shadow-md backdrop-blur transition-all border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m15 18-6-6 6-6"/></svg>
                  </div>
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 0px; z-index: 10;">
                  <div class="w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white text-slate-600 hover:text-[#EE4D2D] rounded-full shadow-md backdrop-blur transition-all border border-slate-100">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m9 18 6-6-6-6"/></svg>
                  </div>
                </div>
              </template>
              <div v-for="(step, index) in steps" :key="'step-'+index">
                <div class="pt-6 pb-10 px-8 flex flex-col items-center text-center min-h-[260px] select-none">
                  <div v-if="step.image" class="mb-4 rounded-xl overflow-hidden shadow-sm inline-block max-w-[200px] border border-slate-100">
                    <img :src="step.image" :alt="step.title" class="w-full h-auto object-cover pointer-events-none" />
                  </div>
                  <h5 class="text-[14px] font-bold text-slate-800 mb-2">{{ step.title }}</h5>
                  <p class="text-[12px] text-slate-500 leading-relaxed mb-0" v-html="step.desc"></p>
                </div>
              </div>
            </a-carousel>
            
            <div class="flex justify-center mt-2">
              <a-button type="primary" size="small" @click="activeKey = activeKey.filter(k => k !== '2')" class="px-6 !rounded-full font-bold">
                Đã hiểu
              </a-button>
            </div>
          </div>
        </div>
      </a-collapse-panel>
    </a-collapse>

    <!-- Link Converter Component -->
    <div style="margin-top: 1rem">
      <LinkConverter />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

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
    desc: "Mở ứng dụng Shopee hoặc TikTok, chọn sản phẩm cần mua và nhấn nút <span class='step-highlight'>Chia sẻ</span> (hình mũi tên).",
    image: "/step/1.jpg",
  },
  {
    title: "Sao chép đường dẫn",
    desc: "Trong menu chia sẻ hiện ra, chọn nút <span class='step-highlight'>Sao chép đường dẫn</span>",
    image: "/step/2.jpg",
  },
  {
    title: "Dán link vào Saffi",
    desc: "Trở lại ứng dụng Saffi, <span style='color:#EE4D2D;font-weight:800'>Dán link</span> vừa sao chép vào ô nhập bên dưới, nhấn vào nút <span style='color:#EE4D2D;font-weight:800'>Hoàn Tiền</span> để xem thông tin hoàn tiền.",
    image: "/step/3.jpg",
  },
  {
    title: "Mua sắm & Nhận hoàn tiền",
    desc: "Nhấn nút đây để mở ứng dụng sàn và mua sắm như bình thường. Tiền hoàn lại sẽ <span style='color:#EE4D2D;font-weight:800'>tự động được tích lũy vào tài khoản Saffi</span> của bạn!",
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
  ogImage: "/shopee-banner.png",
  twitterCard: "summary_large_image",
});
</script>

<style scoped>
.hoan-tien-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 6rem;
}

@media (min-width: 768px) {
  .hoan-tien-page {
    padding-bottom: 1.5rem;
  }
}

.guide-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 1.5rem;
  padding: 1.5rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
}

@media (min-width: 768px) {
  .guide-card {
    padding: 2rem;
  }
}

:deep(.custom-collapse .ant-collapse-item) {
  border-bottom: none !important;
}

:deep(.custom-collapse .ant-collapse-header) {
  padding: 0 !important;
  align-items: center !important;
}

:deep(.custom-collapse .ant-collapse-content-box) {
  padding: 0 !important;
}

/* Notes */
.notes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.note-item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
}

.note-num {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(245, 158, 11, 0.1);
  color: #d97706;
  font-weight: 800;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 2px;
  border: 1px solid rgba(245, 158, 11, 0.1);
  user-select: none;
}

.note-text {
  font-size: 13px;
  color: #475569;
  line-height: 1.6;
  font-weight: 500;
  margin: 0;
}

.note-text strong {
  color: #1e293b;
}

/* Metrics */
.metrics-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (min-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.metric-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.7);
  border: 1px solid #f1f5f9;
  transition: transform 0.3s ease;
  cursor: default;
  user-select: none;
}

.metric-card:hover {
  transform: scale(1.01) translateY(-2px);
}

.metric-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.metric-card:hover .metric-icon {
  transform: scale(1.05);
}

.metric-icon--yellow {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}
.metric-icon--emerald {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
}

.metric-label {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #94a3b8;
  margin-bottom: 2px;
}

.metric-value {
  font-size: 14px;
  font-weight: 500;
  color: #334155;
}

/* Wizard */
.wizard-card {
  position: relative;
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 1.25rem;
  border-radius: 1rem;
  background: rgba(248, 250, 252, 0.5);
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: hidden;
}

.wizard-card-glow {
  position: absolute;
  top: -2rem;
  right: -2rem;
  width: 6rem;
  height: 6rem;
  background: rgba(238, 77, 45, 0.05);
  border-radius: 50%;
  filter: blur(40px);
  pointer-events: none;
}

.wizard-img-frame {
  width: 100%;
  height: 20rem;
  border-radius: 1rem;
  background: #f1f5f9;
  border: 1px solid rgba(226, 232, 240, 0.5);
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (min-width: 768px) {
  .wizard-img-frame {
    height: 25rem;
  }
}

.wizard-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 1rem;
  transition: transform 0.5s ease;
}

.wizard-img-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.wizard-img-placeholder-text {
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #cbd5e1;
}

.wizard-step-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-height: 5.75rem;
}

.wizard-step-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wizard-step-icon {
  width: 36px;
  height: 36px;
  border-radius: 12px;
  background: rgba(238, 77, 45, 0.1);
  color: #ee4d2d;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.wizard-step-badge {
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #64748b;
  background: #f1f5f9;
  padding: 4px 12px;
  border-radius: 9999px;
}

.wizard-step-title {
  font-size: 14px;
  font-weight: 800;
  color: #1e293b;
  letter-spacing: -0.01em;
  margin: 0;
}

.wizard-step-desc {
  font-size: 12px;
  color: #64748b;
  line-height: 1.6;
  font-weight: 600;
  margin: 0;
}

:deep(.step-highlight) {
  color: #ee4d2d;
  font-weight: 800;
  background: rgba(238, 77, 45, 0.08);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid rgba(238, 77, 45, 0.15);
}

.wizard-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #f1f5f9;
  padding-top: 0.75rem;
  margin-top: 4px;
}

.wizard-dots {
  display: flex;
  align-items: center;
  gap: 6px;
  user-select: none;
}

.wizard-dot {
  height: 6px;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  outline: none;
  transition: all 0.3s ease;
}

.wizard-dot--active {
  width: 20px;
  background: #ee4d2d;
}
.wizard-dot--idle {
  width: 10px;
  background: #cbd5e1;
}
.wizard-dot--idle:hover {
  background: #94a3b8;
}

.wizard-nav-btns {
  display: flex;
  align-items: center;
  gap: 8px;
  user-select: none;
}

.wizard-nav-btn {
  font-weight: 700 !important;
  font-size: 12px !important;
  border-radius: 10px !important;
}

/* Slide fade transition */
.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.slide-fade-enter-from {
  transform: translateX(16px);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(-16px);
  opacity: 0;
}
</style>
