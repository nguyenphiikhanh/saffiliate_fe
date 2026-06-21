<template>
  <header class="header-root">
    <div class="header-inner-wrap">
      <div
        class="header-capsule"
        :class="isScrolled ? 'header-capsule--scrolled' : 'header-capsule--top'"
      >
        <!-- LEFT: Logo + Desktop Nav -->
        <div class="header-left">
          <!-- Logo Brand -->
          <NuxtLink to="/" class="header-logo">
            <div class="header-logo-icon">
              <NuxtImg
                src="/saficon.webp"
                class="header-logo-img"
                alt="Saffi Logo"
              />
            </div>
            <div class="header-logo-text">
              <span class="header-logo-name"
                >S<span class="text-shopee-orange">affi</span></span
              >
              <span class="header-logo-tagline">Smart Shopping</span>
            </div>
          </NuxtLink>

          <!-- Desktop divider -->
          <div class="header-divider header-divider--desktop"></div>

          <!-- Desktop: Home button -->
          <NuxtLink
            to="/"
            class="nav-icon-btn"
            :class="
              route.path === '/' ? 'nav-icon-btn--active' : 'nav-icon-btn--idle'
            "
            title="Trang chủ"
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
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <span class="nav-tooltip">Trang chủ</span>
          </NuxtLink>

          <!-- Desktop Nav Icons -->
          <div class="desktop-nav">
            <!-- Hoàn Tiền -->
            <NuxtLink
              to="/hoan-tien"
              class="nav-icon-btn nav-icon-btn--highlight"
              :class="
                route.path === '/hoan-tien'
                  ? 'nav-icon-btn--active'
                  : 'nav-icon-btn--idle'
              "
              title="Hoàn Tiền"
            >
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
                <path
                  d="M9.937 15.5A2 2 0 0 0 8.5 14.063L2 12l6.5-2.063A2 2 0 0 0 9.937 8.5L12 2l2.063 6.5A2 2 0 0 0 15.5 9.937L22 12l-6.5 2.063A2 2 0 0 0 14.063 15.5L12 22z"
                />
                <path d="M20 3v4" />
                <path d="M22 5h-4" />
                <path d="M4 17v2" />
                <path d="M5 18H3" />
              </svg>
              <span
                v-if="route.path !== '/hoan-tien'"
                class="nav-pulse-dot"
              ></span>
              <span class="nav-tooltip">Hoàn Tiền</span>
            </NuxtLink>

            <!-- Đơn Hàng -->
            <NuxtLink
              to="/don-hang"
              class="nav-icon-btn"
              :class="
                route.path === '/don-hang'
                  ? 'nav-icon-btn--active'
                  : 'nav-icon-btn--idle'
              "
              title="Đơn Hàng"
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
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span class="nav-tooltip">Đơn Hàng</span>
            </NuxtLink>

            <!-- Tài Chính -->
            <NuxtLink
              to="/tai-chinh"
              class="nav-icon-btn"
              :class="
                route.path === '/tai-chinh'
                  ? 'nav-icon-btn--active'
                  : 'nav-icon-btn--idle'
              "
              title="Tài Chính"
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
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span class="nav-tooltip">Tài Chính</span>
            </NuxtLink>

            <!-- Hướng Dẫn -->
            <NuxtLink
              to="/huong-dan"
              class="nav-icon-btn"
              :class="
                route.path === '/huong-dan'
                  ? 'nav-icon-btn--active'
                  : 'nav-icon-btn--idle'
              "
              title="Hướng Dẫn"
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
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              <span class="nav-tooltip">Hướng Dẫn</span>
            </NuxtLink>

            <!-- Hỗ Trợ -->
            <NuxtLink
              to="/ho-tro"
              class="nav-icon-btn"
              :class="
                route.path === '/ho-tro'
                  ? 'nav-icon-btn--active'
                  : 'nav-icon-btn--idle'
              "
              title="Hỗ Trợ"
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
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <path d="M12 17h.01" />
              </svg>
              <span class="nav-tooltip">Hỗ Trợ</span>
            </NuxtLink>
          </div>
        </div>

        <!-- RIGHT: Rank Badge + User Capsule -->
        <div class="header-right">
          <!-- Rank Badge -->
          <div
            v-if="user"
            class="rank-badge"
            :class="rankInfo.badgeClass"
            :title="`Hạng: ${rankInfo.fullName}`"
          >
            <img
              :src="rankInfo.image"
              class="rank-badge-img"
              :alt="rankInfo.name"
            />
            <span>{{ rankInfo.name }}</span>
          </div>

          <div class="header-divider header-divider--sm"></div>

          <!-- User Capsule -->
          <div
            ref="capsuleRef"
            @click="toggleMenu"
            class="user-capsule"
            :class="{ 'user-capsule--open': isMenuOpen }"
          >
            <span class="user-capsule-name">{{ userName }}</span>
            <div class="user-avatar">
              <img
                v-if="userAvatar"
                :src="userAvatar"
                referrerpolicy="no-referrer"
                alt="Avatar"
              />
              <div v-else class="user-avatar-fallback">{{ firstLetter }}</div>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="user-capsule-arrow"
              :class="{ 'rotate-180': isMenuOpen }"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>

            <!-- Dropdown Menu -->
            <transition
              enter-active-class="menu-enter-active"
              enter-from-class="menu-enter-from"
              enter-to-class="menu-enter-to"
              leave-active-class="menu-leave-active"
              leave-from-class="menu-leave-from"
              leave-to-class="menu-leave-to"
            >
              <div
                v-if="isMenuOpen"
                ref="menuRef"
                @click.stop
                class="user-menu"
              >
                <!-- User Info -->
                <div class="menu-user-info">
                  <component
                    :is="isAdmin ? 'NuxtLink' : 'div'"
                    v-bind="isAdmin ? { to: '/admin/orders' } : {}"
                    @click="isAdmin ? (isMenuOpen = false) : null"
                    class="menu-avatar-wrap"
                  >
                    <img
                      v-if="userAvatar"
                      :src="userAvatar"
                      referrerpolicy="no-referrer"
                      alt="Avatar"
                    />
                    <div v-else class="user-avatar-fallback">
                      {{ firstLetter }}
                    </div>
                  </component>
                  <div class="menu-user-text">
                    <span class="menu-user-name">{{ userName }}</span>
                    <span class="menu-user-email" :title="userEmail">{{
                      userEmail
                    }}</span>
                  </div>
                </div>

                <!-- Rank in menu -->
                <div v-if="user" class="menu-rank">
                  <div
                    class="rank-badge rank-badge--sm"
                    :class="rankInfo.badgeClass"
                  >
                    <img
                      :src="rankInfo.image"
                      class="rank-badge-img"
                      :alt="rankInfo.name"
                    />
                    <span>{{ rankInfo.name }}</span>
                  </div>
                  <span class="menu-rank-label">Cấp bậc hiện tại</span>
                </div>

                <!-- Nav Links -->
                <div class="menu-links">
                  <NuxtLink
                    v-if="isAdmin"
                    to="/admin/orders"
                    @click="isMenuOpen = false"
                    class="menu-link"
                  >
                    <div
                      class="menu-link-icon"
                      style="
                        background: rgba(107, 114, 128, 0.1);
                        color: #6b7280;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <span>Quản lý Đơn Hàng</span>
                  </NuxtLink>

                  <NuxtLink
                    v-if="isAdmin"
                    to="/admin/users"
                    @click="isMenuOpen = false"
                    class="menu-link"
                  >
                    <div
                      class="menu-link-icon"
                      style="
                        background: rgba(99, 102, 241, 0.1);
                        color: #6366f1;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <span>Quản lý Thành Viên</span>
                  </NuxtLink>

                  <NuxtLink
                    to="/ho-so"
                    @click="isMenuOpen = false"
                    class="menu-link"
                  >
                    <div
                      class="menu-link-icon"
                      style="background: rgba(238, 77, 45, 0.1); color: #ee4d2d"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <span>Hồ sơ</span>
                  </NuxtLink>

                  <NuxtLink
                    to="/tai-chinh"
                    @click="isMenuOpen = false"
                    class="menu-link"
                  >
                    <div
                      class="menu-link-icon"
                      style="
                        background: rgba(16, 185, 129, 0.1);
                        color: #10b981;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                      </svg>
                    </div>
                    <span>Tài chính</span>
                  </NuxtLink>
                </div>

                <!-- Logout -->
                <div class="menu-footer">
                  <button @click="handleLogout" class="menu-logout">
                    <div
                      class="menu-link-icon"
                      style="
                        background: rgba(100, 116, 139, 0.1);
                        color: #94a3b8;
                      "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                    </div>
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Spacer for fixed header -->
  <div style="height: 80px; width: 100%; pointer-events: none"></div>

  <!-- Mobile Bottom Navigation Bar -->
  <nav class="mobile-bottom-nav">
    <NuxtLink
      to="/"
      class="mobile-tab"
      :class="route.path === '/' ? 'mobile-tab--active' : ''"
    >
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
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span>Home</span>
    </NuxtLink>

    <NuxtLink
      to="/hoan-tien"
      class="mobile-tab mobile-tab--highlight"
      :class="route.path === '/hoan-tien' ? 'mobile-tab--active' : ''"
    >
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
        <path
          d="M9.937 15.5A2 2 0 0 0 8.5 14.063L2 12l6.5-2.063A2 2 0 0 0 9.937 8.5L12 2l2.063 6.5A2 2 0 0 0 15.5 9.937L22 12l-6.5 2.063A2 2 0 0 0 14.063 15.5L12 22z"
        />
        <path d="M20 3v4" />
        <path d="M22 5h-4" />
        <path d="M4 17v2" />
        <path d="M5 18H3" />
      </svg>
      <span>Hoàn tiền</span>
      <span v-if="route.path !== '/hoan-tien'" class="mobile-tab-dot"></span>
    </NuxtLink>

    <NuxtLink
      to="/don-hang"
      class="mobile-tab"
      :class="route.path === '/don-hang' ? 'mobile-tab--active' : ''"
    >
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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <line x1="3" x2="21" y1="6" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      <span>Đơn hàng</span>
    </NuxtLink>

    <NuxtLink
      to="/tai-chinh"
      class="mobile-tab"
      :class="route.path === '/tai-chinh' ? 'mobile-tab--active' : ''"
    >
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
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </svg>
      <span>Tài Chính</span>
    </NuxtLink>

    <NuxtLink
      to="/ho-so"
      class="mobile-tab"
      :class="route.path === '/ho-so' ? 'mobile-tab--active' : ''"
    >
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
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
      <span>Cá nhân</span>
    </NuxtLink>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const { user, logout, isAdmin } = useAuth();

const isScrolled = ref(false);
const isMenuOpen = ref(false);
const menuRef = ref(null);
const capsuleRef = ref(null);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

let ticking = false;

const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (typeof window !== "undefined") {
        isScrolled.value = window.scrollY > 40;
      }
      ticking = false;
    });
    ticking = true;
  }
};

const handleClickOutside = (event) => {
  if (
    isMenuOpen.value &&
    menuRef.value &&
    !menuRef.value.contains(event.target) &&
    capsuleRef.value &&
    !capsuleRef.value.contains(event.target)
  ) {
    isMenuOpen.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
  window.addEventListener("click", handleClickOutside);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
  window.removeEventListener("click", handleClickOutside);
});

const userName = computed(() => user.value?.name || "User");
const userAvatar = computed(() => user.value?.image || "");
const firstLetter = computed(() => {
  const name = userName.value;
  return name ? name.charAt(0).toUpperCase() : "U";
});
const userEmail = computed(() => user.value?.email || "youremail@saffi.com");

const rankInfo = computed(() => {
  const rank = user.value?.rank || "silver";
  if (rank === "obsidian") {
    return {
      name: "TINH HOA",
      fullName: "THÀNH VIÊN TINH HOA",
      image: "/saffi_obsidian.webp",
      badgeClass: "rank-badge--obsidian",
    };
  } else if (rank === "gold") {
    return {
      name: "VÀNG",
      fullName: "THÀNH VIÊN VÀNG",
      image: "/saffi_gold.webp",
      badgeClass: "rank-badge--gold",
    };
  } else {
    return {
      name: "BẠC",
      fullName: "THÀNH VIÊN BẠC",
      image: "/saffi_silver.webp",
      badgeClass: "rank-badge--silver",
    };
  }
});

const handleLogout = async () => {
  try {
    isMenuOpen.value = false;
    await logout();
  } catch (error) {
    console.error("Đăng xuất thất bại:", error);
  }
};
</script>

<style scoped>
/* ============================
   HEADER ROOT
   ============================ */
.header-root {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  padding: 0.5rem 1rem 0.25rem;
}

@media (min-width: 768px) {
  .header-root {
    padding: 0.5rem 1.5rem 0.25rem;
  }
}
@media (min-width: 1024px) {
  .header-root {
    padding: 0.5rem 2rem 0.25rem;
  }
}

.header-inner-wrap {
  max-width: 1280px;
  margin: 0 auto;
}

.header-capsule {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 9999px;
  border: 1px solid;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 0.375rem 1rem;
  transition: border-color 0.4s ease, box-shadow 0.4s ease, background 0.4s ease;
}

@media (max-width: 1024px) {
  .header-capsule {
    background: rgba(255, 255, 255, 0.98) !important;
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
  }
}

.header-capsule--scrolled {
  border-color: rgba(226, 232, 240, 0.4);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}

.header-capsule--top {
  border-color: rgba(226, 232, 240, 0.6);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

/* ============================
   LEFT REGION
   ============================ */
.header-left {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

@media (min-width: 640px) {
  .header-left {
    gap: 0.5rem;
  }
}

.header-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  text-decoration: none;
  flex-shrink: 0;
}

.header-logo:hover .header-logo-icon {
  transform: rotate(12deg);
}

.header-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  flex-shrink: 0;
  transition: transform 0.5s ease;
}

.header-logo-img {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
}

.header-logo-text {
  display: none;
  flex-direction: column;
}

@media (min-width: 640px) {
  .header-logo-text {
    display: flex;
  }
}

.header-logo-name {
  font-size: 17px;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #0f172a;
  line-height: 1;
}

.header-logo-tagline {
  font-size: 7.5px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #94a3b8;
  margin-top: 2px;
  line-height: 1;
}

.header-divider {
  background: #e2e8f0;
  flex-shrink: 0;
}

.header-divider--desktop {
  display: none;
  width: 1px;
  height: 24px;
  margin: 0 0.5rem;
}

@media (min-width: 768px) {
  .header-divider--desktop {
    display: block;
  }
}

.header-divider--sm {
  display: none;
  width: 1px;
  height: 20px;
  margin: 0 0.25rem;
}

@media (min-width: 640px) {
  .header-divider--sm {
    display: block;
  }
}

/* ============================
   DESKTOP NAV ICON BUTTONS
   ============================ */
.desktop-nav {
  display: none;
  align-items: center;
  gap: 0.375rem;
  margin-left: 0.25rem;
}

@media (min-width: 768px) {
  .desktop-nav {
    display: flex;
  }
}

.nav-icon-btn {
  display: none;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  cursor: pointer;
  flex-shrink: 0;
  position: relative;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@media (min-width: 768px) {
  .nav-icon-btn {
    display: flex;
  }
}

.nav-icon-btn--active {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #ee4d2d, #f97316);
  color: white;
  box-shadow: 0 4px 12px rgba(238, 77, 45, 0.3);
  transform: scale(1.05);
}

.nav-icon-btn--idle {
  width: 32px;
  height: 32px;
  color: #94a3b8;
}

.nav-icon-btn--idle:hover {
  color: #ee4d2d;
  background: #f8fafc;
  transform: scale(1.05);
}

.nav-icon-btn--highlight.nav-icon-btn--idle {
  background: rgba(238, 77, 45, 0.05);
  border: 1px solid rgba(238, 77, 45, 0.1);
  color: #ee4d2d;
}

.nav-icon-btn--highlight.nav-icon-btn--idle:hover {
  background: rgba(238, 77, 45, 0.1);
}

/* Tooltip */
.nav-tooltip {
  position: absolute;
  top: 135%;
  left: 50%;
  transform: translateX(-50%) scale(0.9);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  white-space: nowrap;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: white;
  background: #0f172a;
  padding: 4px 10px;
  border-radius: 10px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  z-index: 50;
}

.nav-tooltip::before {
  content: "";
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 8px;
  height: 8px;
  background: #0f172a;
}

.nav-icon-btn:hover .nav-tooltip {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
}

/* Pulse dot for Hoàn Tiền highlight */
.nav-pulse-dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
  box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  animation: pulse-ring 1.8s ease-out infinite;
}

@keyframes pulse-ring {
  0% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4);
  }
  70% {
    box-shadow: 0 0 0 6px rgba(16, 185, 129, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0);
  }
}

/* ============================
   RIGHT REGION
   ============================ */
.header-right {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

@media (min-width: 640px) {
  .header-right {
    gap: 0.75rem;
  }
}

/* ============================
   RANK BADGE
   ============================ */
.rank-badge {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  border: 1px solid;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  user-select: none;
  flex-shrink: 0;
}

.rank-badge--sm {
  padding: 0.25rem 0.625rem;
  font-size: 10px;
}

.rank-badge-img {
  width: 18px;
  height: 18px;
  object-fit: contain;
  flex-shrink: 0;
}

.rank-badge--sm .rank-badge-img {
  width: 16px;
  height: 16px;
}

.rank-badge--gold {
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.2);
  color: #d97706;
}

.rank-badge--silver {
  background: rgba(148, 163, 184, 0.1);
  border-color: rgba(148, 163, 184, 0.2);
  color: #64748b;
}

.rank-badge--obsidian {
  background: rgba(15, 23, 42, 0.1);
  border-color: rgba(15, 23, 42, 0.2);
  color: #1e293b;
}

/* ============================
   USER CAPSULE
   ============================ */
.user-capsule {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 9999px;
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  user-select: none;
  padding: 0 0.5rem 0 0.75rem;
  height: 36px;
  border: 1px solid transparent;
  transition: border-color 0.3s ease, background 0.3s ease;
}

@media (min-width: 1024px) {
  .user-capsule {
    border-color: #e2e8f0;
    background: rgba(248, 250, 252, 0.5);
  }
  .user-capsule:hover {
    border-color: #cbd5e1;
  }
}

.user-capsule-name {
  display: none;
  font-size: 12px;
  font-weight: 700;
  color: #334155;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@media (min-width: 1024px) {
  .user-capsule-name {
    display: inline;
  }
}

.user-avatar {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid rgba(226, 232, 240, 0.5);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease;
}

.user-avatar:hover {
  transform: scale(1.05);
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-avatar-fallback {
  width: 100%;
  height: 100%;
  background: #ec407a;
  color: white;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
}

.user-capsule-arrow {
  display: none;
  color: #94a3b8;
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.rotate-180 {
  transform: rotate(180deg);
}

@media (min-width: 1024px) {
  .user-capsule-arrow {
    display: inline;
  }
}

/* ============================
   USER DROPDOWN MENU
   ============================ */
.user-menu {
  position: absolute;
  right: 0;
  top: 125%;
  margin-top: 4px;
  width: 290px;
  background: white;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12), 0 4px 20px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(241, 245, 249, 0.8);
  padding: 20px;
  display: flex;
  flex-direction: column;
  transform-origin: top right;
  z-index: 50;
  cursor: default;
}

.menu-enter-active {
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
}
.menu-enter-from {
  transform: scale(0.95);
  opacity: 0;
}
.menu-enter-to {
  transform: scale(1);
  opacity: 1;
}
.menu-leave-active {
  transition: all 0.1s ease-in;
}
.menu-leave-from {
  transform: scale(1);
  opacity: 1;
}
.menu-leave-to {
  transform: scale(0.95);
  opacity: 0;
}

.menu-user-info {
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f1f5f9;
}

.menu-avatar-wrap {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  border: 1px solid #f1f5f9;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  text-decoration: none;
  transition: transform 0.3s ease;
}

.menu-avatar-wrap:hover {
  transform: scale(1.05);
}

.menu-avatar-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-user-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1;
}

.menu-user-name {
  font-weight: 700;
  color: #1e293b;
  font-size: 15px;
  line-height: 1.2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-user-email {
  font-size: 11px;
  color: #94a3b8;
  margin-top: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.menu-rank {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.menu-rank-label {
  font-size: 10px;
  font-weight: 700;
  color: #94a3b8;
}

.menu-links {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
}

.menu-link {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 6px;
  border-radius: 16px;
  text-decoration: none;
  color: #334155;
  font-size: 12px;
  font-weight: 700;
  transition: background 0.2s ease;
  cursor: pointer;
}

.menu-link:hover {
  background: #f8fafc;
  color: #ee4d2d;
}

.menu-link-icon {
  width: 34px;
  height: 34px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.menu-link:hover .menu-link-icon {
  transform: scale(1.05);
}

.menu-footer {
  padding-top: 12px;
}

.menu-logout {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 6px;
  border-radius: 16px;
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  text-align: left;
  transition: background 0.2s ease, color 0.2s ease;
}

.menu-logout:hover {
  background: #f8fafc;
  color: #64748b;
}

/* ============================
   MOBILE BOTTOM NAV
   ============================ */
.mobile-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  background: rgba(255, 255, 255, 0.99);
  border-top: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 0.5rem;
  padding-bottom: env(safe-area-inset-bottom, 0);
  box-shadow: 0 -4px 20px -5px rgba(0, 0, 0, 0.04);
  user-select: none;
}

@media (min-width: 768px) {
  .mobile-bottom-nav {
    display: none;
  }
}

.mobile-tab {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  width: 64px;
  height: 100%;
  color: #94a3b8;
  text-decoration: none;
  font-size: 10px;
  font-weight: 500;
  letter-spacing: -0.02em;
  transition: color 0.2s ease;
  position: relative;
  touch-action: manipulation;
}

.mobile-tab--active {
  color: #ee4d2d;
}

.mobile-tab svg {
  transition: transform 0.2s ease;
}

.mobile-tab--active svg {
  transform: scale(1.05);
}

.mobile-tab-dot {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #10b981;
}
</style>
