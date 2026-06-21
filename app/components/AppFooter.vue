<template>
  <footer class="footer-root">
    <div class="footer-container">
      <!-- BENTO GRID -->
      <div class="footer-grid">
        <!-- BOX 1: Brand (Span 5) -->
        <div class="footer-brand-box">
          <!-- Background blobs -->
          <div class="footer-brand-blob footer-brand-blob--1"></div>
          <div class="footer-brand-blob footer-brand-blob--2"></div>

          <div class="footer-brand-inner">
            <div>
              <div class="footer-brand-logo">
                <div class="footer-logo-icon">
                  <NuxtImg
                    src="/saficon.webp"
                    class="footer-logo-img"
                    alt="Saffi Logo"
                  />
                </div>
                <div class="footer-brand-title">
                  <span class="footer-brand-name">Saffi</span>
                  <span class="footer-brand-tagline">Smart Shopping</span>
                </div>
              </div>
              <p class="footer-brand-desc">
                Trợ lý mua sắm thông minh thế hệ mới. Hoàn tiền tự động, minh
                bạch và siêu tốc từ các sàn TMĐT.
              </p>
            </div>

            <div class="footer-socials">
              <a
                href="mailto:support@saffi.vn"
                class="footer-social-btn"
                aria-label="Email"
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
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </a>
              <a
                :href="zaloGroup"
                target="_blank"
                rel="noopener noreferrer"
                class="footer-social-btn"
                aria-label="Zalo"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#2962ff"
                    d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10	c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                  ></path>
                  <path
                    fill="#eee"
                    d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19	c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742	c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083	C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75	S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75	S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5	c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                  ></path>
                  <path
                    fill="#2962ff"
                    d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5	c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <!-- BOX 2: Navigation (Span 3) -->
        <div class="footer-nav-box">
          <div class="footer-section-header">
            <div class="footer-section-dot"></div>
            <span class="footer-section-title">Menu</span>
          </div>

          <div class="footer-nav-links">
            <NuxtLink to="/hoan-tien" class="footer-nav-link">
              <span>Hoàn tiền</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer-nav-arrow"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
            <div class="footer-divider"></div>
            <NuxtLink to="/don-hang" class="footer-nav-link">
              <span>Đơn hàng</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer-nav-arrow"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
            <div class="footer-divider"></div>
            <NuxtLink to="/tai-chinh" class="footer-nav-link">
              <span>Tài chính</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer-nav-arrow"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
            <div class="footer-divider"></div>
            <NuxtLink to="/huong-dan" class="footer-nav-link">
              <span>Hướng dẫn</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="footer-nav-arrow"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- BOX 3: Contact & Support -->
        <div class="footer-contact-col">
          <!-- Email contact box -->
          <div
            class="footer-contact-box"
            onclick="window.location.href='mailto:support@saffi.vn'"
          >
            <div class="footer-contact-icon">
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
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <div>
              <span class="footer-contact-label">Hỗ trợ 24/7</span>
              <span class="footer-contact-value">support@saffi.vn</span>
            </div>
          </div>

          <!-- Stats mini grid -->
          <div class="footer-stats-grid">
            <div class="footer-stat-card">
              <div class="footer-stat-icon footer-stat-icon--emerald">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <span class="footer-stat-value">08:00 - 22:00</span>
              <span class="footer-stat-label">Hàng ngày</span>
            </div>

            <div class="footer-stat-card">
              <div class="footer-stat-icon footer-stat-icon--amber">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span class="footer-stat-value">&lt; 60 Phút</span>
              <span class="footer-stat-label">Rút tiền</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom pill -->
      <div class="footer-bottom">
        <p class="footer-copy">
          &copy; 2026 Saffi Platform. All Rights Reserved.
        </p>
        <div class="footer-legal">
          <a
            :href="`${mainSiteURL}/privacy-policy`"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-legal-link"
            >Privacy Policy</a
          >
          <div class="footer-legal-dot"></div>
          <a
            :href="`${mainSiteURL}/terms-of-service`"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-legal-link"
            >Terms of Service</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const config = useRuntimeConfig();
const mainSiteURL = config.public.mainSiteURL;
const zaloGroup = config.public.zaloGroup;
</script>

<style scoped>
.footer-root {
  display: none;
  width: 100%;
  margin-top: auto;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
  background: white;
}

@media (min-width: 768px) {
  .footer-root {
    display: block;
  }
}

.footer-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

@media (min-width: 768px) {
  .footer-container {
    padding: 0 1.5rem;
  }
}
@media (min-width: 1024px) {
  .footer-container {
    padding: 0 2rem;
  }
}

/* GRID */
.footer-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}

@media (min-width: 768px) {
  .footer-grid {
    grid-template-columns: repeat(12, 1fr);
    gap: 1.25rem;
  }
}

/* BRAND BOX */
.footer-brand-box {
  position: relative;
  overflow: hidden;
  border-radius: 2rem;
  background: rgba(255, 237, 231, 0.5);
  padding: 2.5rem;
  border: 1px solid rgba(238, 77, 45, 0.1);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
  transition: box-shadow 0.5s ease;
}

@media (min-width: 768px) {
  .footer-brand-box {
    grid-column: span 12;
  }
}
@media (min-width: 1024px) {
  .footer-brand-box {
    grid-column: span 5;
  }
}

.footer-brand-box:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
}

.footer-brand-blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  transition: transform 1s ease;
}

.footer-brand-blob--1 {
  top: -8rem;
  right: -8rem;
  width: 20rem;
  height: 20rem;
  background: rgba(238, 77, 45, 0.1);
  filter: blur(80px);
}

.footer-brand-blob--2 {
  bottom: -5rem;
  left: -5rem;
  width: 16rem;
  height: 16rem;
  background: rgba(238, 77, 45, 0.05);
  filter: blur(60px);
}

.footer-brand-box:hover .footer-brand-blob--1 {
  transform: scale(1.5);
}
.footer-brand-box:hover .footer-brand-blob--2 {
  transform: translateX(40px);
}

.footer-brand-inner {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  gap: 2rem;
}

.footer-brand-logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
}

.footer-logo-img {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.footer-brand-title {
  display: flex;
  flex-direction: column;
  color: #1e293b;
}

.footer-brand-name {
  font-size: 1.875rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  line-height: 1;
}

.footer-brand-tagline {
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-top: 4px;
}

.footer-brand-desc {
  color: #64748b;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.6;
  max-width: 20rem;
  margin-top: 1.5rem;
}

.footer-socials {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 1px solid rgba(238, 77, 45, 0.15);
  color: #94a3b8;
  text-decoration: none;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  transition: all 0.3s ease;
}

.footer-social-btn:hover {
  color: #ee4d2d;
  border-color: #ee4d2d;
  transform: scale(1.1);
}

/* NAV BOX */
.footer-nav-box {
  border-radius: 2rem;
  background: #f8fafc;
  padding: 2rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color 0.4s ease;
}

@media (min-width: 768px) {
  .footer-nav-box {
    grid-column: span 6;
  }
}
@media (min-width: 1024px) {
  .footer-nav-box {
    grid-column: span 3;
  }
}

.footer-nav-box:hover {
  border-color: rgba(238, 77, 45, 0.3);
}

.footer-section-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.footer-section-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #1e293b;
}

.footer-section-title {
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #1e293b;
  user-select: none;
}

.footer-nav-links {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.footer-nav-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  text-decoration: none;
  transition: all 0.3s ease;
}

.footer-nav-link:hover {
  color: #ee4d2d;
}

.footer-nav-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.footer-nav-link:hover .footer-nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

.footer-nav-link:hover span {
  transform: translateX(4px);
}

.footer-nav-link span {
  display: inline-block;
  transition: transform 0.3s ease;
}

.footer-divider {
  height: 1px;
  background: rgba(226, 232, 240, 0.5);
}

/* CONTACT COL */
.footer-contact-col {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .footer-contact-col {
    grid-column: span 6;
  }
}
@media (min-width: 1024px) {
  .footer-contact-col {
    grid-column: span 4;
  }
}

.footer-contact-box {
  flex: 1;
  border-radius: 2rem;
  background: #f8fafc;
  padding: 1.5rem;
  border: 1px solid #f1f5f9;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.footer-contact-box:hover {
  background: #f1f5f9;
}

.footer-contact-icon {
  width: 48px;
  height: 48px;
  border-radius: 1rem;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.footer-contact-box:hover .footer-contact-icon {
  background: #3b82f6;
  color: white;
  transform: scale(1.1);
}

.footer-contact-box > div {
  display: flex;
  flex-direction: column;
}

.footer-contact-label {
  display: block;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #94a3b8;
  margin-bottom: 2px;
}

.footer-contact-value {
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #1e293b;
}

.footer-stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex: 1;
}

.footer-stat-card {
  border-radius: 2rem;
  background: #f8fafc;
  padding: 1.25rem;
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.footer-stat-card:hover {
  transform: translateY(-4px);
}

.footer-stat-icon {
  margin-bottom: 0.5rem;
}

.footer-stat-icon--emerald {
  color: #10b981;
}
.footer-stat-icon--amber {
  color: #f59e0b;
}

.footer-stat-value {
  font-size: 12px;
  font-weight: 700;
  color: #1e293b;
}

.footer-stat-label {
  font-size: 10px;
  font-weight: 500;
  color: #64748b;
  margin-top: 2px;
}

/* BOTTOM */
.footer-bottom {
  margin-top: 1.25rem;
  border-radius: 9999px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

@media (min-width: 768px) {
  .footer-bottom {
    flex-direction: row;
  }
}

.footer-copy {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  user-select: none;
}

.footer-legal {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
}

.footer-legal-link {
  color: #64748b;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-legal-link:hover {
  color: #ee4d2d;
}

.footer-legal-dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #cbd5e1;
}
</style>
