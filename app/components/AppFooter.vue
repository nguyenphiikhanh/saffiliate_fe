<template>
  <a-layout-footer class="app-footer">
    <div class="footer-container">
      <a-row :gutter="[24, 24]">
        <!-- Brand Section -->
        <a-col :xs="24" :lg="10">
          <div class="footer-brand-box">
            <div class="flex items-center gap-3 mb-4">
              <NuxtImg src="/saficon.webp" class="w-12 h-12 rounded-xl shadow-sm" alt="Saffi Logo" />
              <div>
                <div class="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight">Saffi</div>
                <div class="text-[9px] font-bold text-slate-500 tracking-[0.2em] uppercase mt-0.5">Smart Shopping</div>
              </div>
            </div>
            <p class="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6 max-w-sm">
              Trợ lý mua sắm thông minh thế hệ mới. Hoàn tiền tự động, minh bạch và siêu tốc từ các sàn TMĐT.
            </p>
            <div class="flex items-center gap-3">
              <a href="mailto:support@saffi.vn" class="social-btn">
                <MailOutlined />
              </a>
              <a :href="zaloGroup" target="_blank" class="social-btn">
                <MessageOutlined />
              </a>
            </div>
          </div>
        </a-col>

        <!-- Navigation Section -->
        <a-col :xs="24" :sm="12" :lg="6">
          <div class="footer-nav-box h-full">
            <div class="text-xs font-black tracking-widest uppercase text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <div class="w-2 h-2 rounded-full bg-slate-800 dark:bg-slate-200"></div>
              Menu
            </div>
            <div class="flex flex-col gap-4">
              <NuxtLink to="/hoan-tien" class="nav-link">Hoàn tiền</NuxtLink>
              <a-divider style="margin: 0; border-color: rgba(226,232,240,0.5)" />
              <NuxtLink to="/don-hang" class="nav-link">Đơn hàng</NuxtLink>
              <a-divider style="margin: 0; border-color: rgba(226,232,240,0.5)" />
              <NuxtLink to="/tai-chinh" class="nav-link">Tài chính</NuxtLink>
              <a-divider style="margin: 0; border-color: rgba(226,232,240,0.5)" />
              <NuxtLink to="/huong-dan" class="nav-link">Hướng dẫn</NuxtLink>
            </div>
          </div>
        </a-col>

        <!-- Contact Section -->
        <a-col :xs="24" :sm="12" :lg="8">
          <div class="flex flex-col gap-4 h-full">
            <div class="contact-card cursor-pointer" onclick="window.location.href='mailto:support@saffi.vn'">
              <div class="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-500 flex items-center justify-center text-xl shrink-0">
                <CustomerServiceOutlined />
              </div>
              <div>
                <div class="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Hỗ trợ 24/7</div>
                <div class="text-sm font-bold text-slate-800 dark:text-slate-200">support@saffi.vn</div>
              </div>
            </div>

            <a-row :gutter="16" class="flex-1">
              <a-col :span="12">
                <div class="stat-card h-full">
                  <ClockCircleOutlined class="text-emerald-500 text-xl mb-2" />
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">08:00 - 22:00</div>
                  <div class="text-[10px] font-medium text-slate-500">Hàng ngày</div>
                </div>
              </a-col>
              <a-col :span="12">
                <div class="stat-card h-full">
                  <ThunderboltOutlined class="text-amber-500 text-xl mb-2" />
                  <div class="text-xs font-bold text-slate-800 dark:text-slate-200">&lt; 60 Phút</div>
                  <div class="text-[10px] font-medium text-slate-500">Rút tiền</div>
                </div>
              </a-col>
            </a-row>
          </div>
        </a-col>
      </a-row>

      <!-- Bottom Bar -->
      <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div class="text-[11px] font-bold text-slate-500 uppercase tracking-widest">
          &copy; 2026 Saffi Platform. All Rights Reserved.
        </div>
        <div class="flex items-center gap-6 text-[11px] font-bold text-slate-500">
          <a :href="`${mainSiteURL}/privacy-policy`" target="_blank" class="hover:text-[#ee4d2d] transition-colors">Privacy Policy</a>
          <div class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <a :href="`${mainSiteURL}/terms-of-service`" target="_blank" class="hover:text-[#ee4d2d] transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </a-layout-footer>
</template>

<script setup>
import { 
  MailOutlined, 
  MessageOutlined, 
  CustomerServiceOutlined, 
  ClockCircleOutlined, 
  ThunderboltOutlined 
} from "@ant-design/icons-vue";

const config = useRuntimeConfig();
const mainSiteURL = config.public.mainSiteURL;
const zaloGroup = config.public.zaloGroup;
</script>

<style scoped>
.app-footer {
  background: white;
  padding: 48px 0 24px;
}

html.dark .app-footer {
  background: #0f172a; /* slate-900 */
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 16px;
}

.footer-brand-box {
  background: rgba(255, 237, 231, 0.4);
  border: 1px solid rgba(238, 77, 45, 0.1);
  padding: 32px;
  border-radius: 24px;
  height: 100%;
}

html.dark .footer-brand-box {
  background: rgba(238, 77, 45, 0.05);
  border-color: rgba(238, 77, 45, 0.1);
}

.social-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
}

html.dark .social-btn {
  background: #1e293b;
  color: #94a3b8;
}

.social-btn:hover {
  color: #ee4d2d;
  transform: scale(1.1);
}

.footer-nav-box {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 32px;
  border-radius: 24px;
}

html.dark .footer-nav-box {
  background: #1e293b;
  border-color: #334155;
}

.nav-link {
  font-size: 14px;
  font-weight: 700;
  color: #64748b;
  transition: color 0.3s ease;
}

html.dark .nav-link {
  color: #94a3b8;
}

.nav-link:hover {
  color: #ee4d2d;
}

.contact-card, .stat-card {
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 24px;
  padding: 24px;
  display: flex;
  transition: all 0.3s ease;
}

html.dark .contact-card, html.dark .stat-card {
  background: #1e293b;
  border-color: #334155;
}

.contact-card {
  align-items: center;
  gap: 16px;
}

.contact-card:hover, .stat-card:hover {
  border-color: rgba(59, 130, 246, 0.3);
}

.stat-card {
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
