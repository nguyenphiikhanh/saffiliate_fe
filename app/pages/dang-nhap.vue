<template>
  <div class="login-page">
    <!-- Dotted grid background -->
    <div class="login-dotted-grid"></div>

    <!-- Radial decorative glows -->
    <div
      class="login-glow login-glow--orange bg-decoration blur-decoration"
    ></div>
    <div
      class="login-glow login-glow--amber bg-decoration blur-decoration"
    ></div>

    <!-- Main Container -->
    <div class="login-container animate-fade-in-up">
      <!-- Logo and Branding -->
      <div class="login-brand">
        <div class="login-logo" @click="null">
          <img src="/saficon.webp" class="login-logo-img" alt="Saffi Logo" />
        </div>
        <h2 class="login-slogan">
          Mua sắm, <span class="login-slogan-highlight">Hoàn Tiền Thật</span>
        </h2>
        <p class="login-tagline">
          Tiết kiệm thông minh với mỗi đơn hàng mua sắm online
        </p>
      </div>

      <!-- Marquee Badges -->
      <div class="marquee-wrap">
        <div class="marquee-fade marquee-fade--left"></div>
        <div class="marquee-fade marquee-fade--right"></div>
        <div class="marquee-track">
          <div class="marquee-row marquee-scroll">
            <div class="badge-chip" v-for="badge in badges" :key="badge.text">
              <svg
                :class="['badge-chip-icon', badge.iconColor]"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="badge.icon"
                />
              </svg>
              <span>{{ badge.text }}</span>
            </div>
          </div>
          <div class="marquee-row marquee-scroll" aria-hidden="true">
            <div
              class="badge-chip"
              v-for="badge in badges"
              :key="badge.text + '-2'"
            >
              <svg
                :class="['badge-chip-icon', badge.iconColor]"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  :d="badge.icon"
                />
              </svg>
              <span>{{ badge.text }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Login Card -->
      <div class="login-card">
        <!-- Error Alert -->
        <a-alert
          v-if="errorMessage"
          type="error"
          :message="'Đăng nhập thất bại'"
          :description="errorMessage"
          show-icon
          closable
          class="login-alert"
          @close="errorMessage = ''"
        />

        <!-- Google Login Button -->
        <div class="login-btn-wrap">
          <button
            @click="handleGoogleLogin"
            :disabled="isLoggingIn"
            class="login-google-btn w-full cursor-pointer hover:bg-slate-50 active:bg-slate-100 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <svg v-if="isLoggingIn" class="animate-spin text-slate-500" width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg
              v-else
              class="google-logo"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                fill="#EA4335"
              />
            </svg>
            <span class="login-google-btn-text">{{
              isLoggingIn ? "Đang đăng nhập" : "Tiếp tục với Google"
            }}</span>
          </button>
        </div>

        <!-- Google recommendation notice -->
        <p class="login-security-note">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            style="flex-shrink: 0"
          >
            <rect width="11" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Google là phương thức đăng nhập chính và được khuyến nghị.
        </p>

        <!-- Terms -->
        <p class="login-terms">
          Bằng việc tiếp tục, bạn đồng ý với
          <a href="#" class="login-terms-link">Điều khoản & Chính sách</a> của
          chúng tôi.
        </p>

        <!-- Social Connect -->
        <div class="login-socials">
          <span class="login-socials-label">Kết nối với chúng tôi</span>
          <div class="login-socials-row">
            <!-- Zalo Group -->
            <a
              :href="config.public.zaloGroup || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="login-social-btn login-social-btn--primary"
              title="Nhóm Zalo hỗ trợ"
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
            <!-- Email -->
            <a
              href="mailto:support@saffi.vn"
              class="login-social-btn login-social-btn--red"
              title="Email Hỗ trợ"
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
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- In-App Browser Blocker Overlay -->
  <Transition
    enter-active-class="overlay-enter-active"
    enter-from-class="overlay-enter-from"
    enter-to-class="overlay-enter-to"
    leave-active-class="overlay-leave-active"
    leave-from-class="overlay-leave-from"
    leave-to-class="overlay-leave-to"
  >
    <div v-if="webViewInfo.isInApp" class="inapp-overlay">
      <!-- Background glows -->
      <div
        class="inapp-glow inapp-glow--orange bg-decoration blur-decoration"
      ></div>
      <div
        class="inapp-glow inapp-glow--amber bg-decoration blur-decoration"
      ></div>

      <div class="inapp-card animate-fade-in-up">
        <!-- Alert Icon -->
        <div class="inapp-alert-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="text-white"
          >
            <path
              d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
            />
            <path d="M12 9v4" />
            <path d="M12 17h.01" />
          </svg>
        </div>

        <h3 class="inapp-title">Yêu cầu mở bằng trình duyệt ngoài</h3>
        <p class="inapp-platform">
          Đang mở bằng WebView {{ webViewInfo.platform }}
        </p>
        <p class="inapp-desc">
          Để đảm bảo tính <strong>bảo mật tuyệt đối</strong> của tài khoản và
          tránh lỗi chặn liên kết từ Google, vui lòng đăng nhập trực tiếp trên
          trình duyệt Chrome hoặc Safari của thiết bị.
        </p>

        <!-- Step-by-step instructions -->
        <div class="inapp-steps">
          <h4 class="inapp-steps-title">Hướng dẫn mở nhanh:</h4>
          <ul class="inapp-steps-list">
            <li v-for="(step, i) in platformSteps" :key="i" class="inapp-step">
              <span class="inapp-step-num">{{ i + 1 }}</span>
              <span v-html="step"></span>
            </li>
          </ul>
        </div>

        <!-- Actions -->
        <div class="inapp-actions">
          <a-button
            v-if="webViewInfo.isAndroid"
            @click="redirectToSystemBrowser"
            block
            size="large"
            class="inapp-btn-primary"
          >
            <template #icon>
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
                  d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
                />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" x2="21" y1="14" y2="3" />
              </svg>
            </template>
            Mở trình duyệt mặc định
          </a-button>
          <a-button @click="copyLink" block size="large" class="inapp-btn-copy">
            <template #icon>
              <svg
                v-if="!isCopied"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                <path
                  d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
                />
              </svg>
              <svg
                v-else
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </template>
            {{ isCopied ? "Đã sao chép liên kết!" : "Sao chép liên kết" }}
          </a-button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useCodeClient } from "vue3-google-signin";

definePageMeta({
  layout: false,
  alias: ["/login"],
});

useSeoMeta({
  title: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  ogTitle: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  description:
    "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
  ogDescription:
    "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
  twitterCard: "summary",
});

const route = useRoute();
const router = useRouter();
const config = useRuntimeConfig();
const { login, fetchUser } = useAuth();
const errorMessage = ref("");
const isLoggingIn = ref(false);
const isCopied = ref(false);

const webViewInfo = ref({
  isInApp: false,
  isAndroid: false,
  isiOS: false,
  platform: "",
});

const badges = [
  {
    text: "Hoàn tiền cực nhanh",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    iconColor: "badge-icon--orange",
  },
  {
    text: "Mua sắm tiết kiệm",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
    iconColor: "badge-icon--emerald",
  },
  {
    text: "Bảo mật tuyệt đối",
    icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    iconColor: "badge-icon--emerald",
  },
  {
    text: "Tích điểm nhanh",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    iconColor: "badge-icon--amber",
  },
];

const platformSteps = computed(() => {
  const p = webViewInfo.value.platform;
  if (p === "Zalo")
    return [
      "Bấm vào biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên bên phải.",
      "Chọn mục <strong>Mở bằng trình duyệt</strong> để đăng nhập ngay.",
    ];
  if (p === "Facebook" || p === "Messenger")
    return [
      "Bấm vào biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên bên phải.",
      "Chọn <strong>Mở bằng trình duyệt ngoài</strong> hoặc <strong>Mở bằng Safari/Chrome</strong>.",
    ];
  if (p === "Telegram")
    return [
      "Nhấp biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên màn hình.",
      "Chọn <strong>Mở bằng Safari/Chrome</strong> hoặc nhấp biểu tượng trình duyệt.",
    ];
  if (p === "TikTok")
    return [
      "Nhấn nút menu chia sẻ hoặc <strong>Ba chấm &bull;&bull;&bull;</strong> ở thanh tùy chọn.",
      "Chọn <strong>Mở bằng trình duyệt</strong>.",
    ];
  return [
    "Chọn biểu tượng tùy chọn/menu trên ứng dụng của bạn.",
    "Tìm và nhấp vào mục <strong>Mở bằng trình duyệt ngoài</strong>.",
  ];
});

const copyLink = async () => {
  if (typeof window === "undefined") return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = window.location.href;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
      isCopied.value = true;
      setTimeout(() => {
        isCopied.value = false;
      }, 2000);
    } catch (e) {
      console.error("Copy failed:", e);
    }
    document.body.removeChild(textArea);
  }
};

const redirectToSystemBrowser = () => {
  if (typeof window !== "undefined") {
    const currentUrl = window.location.href.replace(/^https?:\/\//, "");
    window.location.href = `intent://${currentUrl}#Intent;scheme=https;package=com.android.chrome;end`;
  }
};

onMounted(async () => {
  if (typeof window !== "undefined" && window.navigator) {
    const ua = navigator.userAgent || navigator.vendor || window.opera;
    const isZalo = ua.indexOf("Zalo") > -1;
    const isFacebook = ua.indexOf("FBAN") > -1 || ua.indexOf("FBAV") > -1;
    const isMessenger = ua.indexOf("Messenger") > -1;
    const isInstagram = ua.indexOf("Instagram") > -1;
    const isTikTok = ua.indexOf("TikTok") > -1;
    const isTelegram = ua.indexOf("Telegram") > -1;
    const isInApp =
      isZalo ||
      isFacebook ||
      isMessenger ||
      isInstagram ||
      isTikTok ||
      isTelegram;

    webViewInfo.value = {
      isInApp,
      isAndroid: /Android/i.test(ua),
      isiOS: /iPhone|iPad|iPod/i.test(ua),
      platform: isZalo
        ? "Zalo"
        : isMessenger
        ? "Messenger"
        : isFacebook
        ? "Facebook"
        : isInstagram
        ? "Instagram"
        : isTikTok
        ? "TikTok"
        : isTelegram
        ? "Telegram"
        : "In-App Browser",
    };

    if (isInApp && webViewInfo.value.isAndroid) redirectToSystemBrowser();
  }

  const id_token = route.query.id_token;
  const code = route.query.code;

  if (id_token) {
    errorMessage.value = "";
    isLoggingIn.value = true;
    try {
      const { api } = useAppFetch();
      const res = await api.post(`/auth/google`, { body: { id_token } });
      if (res && res.data && res.data.token) {
        login(res.data.token, res.data.user);
        await fetchUser(res.data.token);
        router.replace({ query: { ...route.query, id_token: undefined } });
        router.push("/");
      } else throw new Error("Không thể trích xuất token.");
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      errorMessage.value = getFriendlyErrorMessage(
        error,
        "Xác thực thất bại. Vui lòng thử lại."
      );
      isLoggingIn.value = false;
      router.replace({ query: { ...route.query, id_token: undefined } });
    }
  } else if (code) {
    errorMessage.value = "";
    isLoggingIn.value = true;
    try {
      const { api } = useAppFetch();
      const res = await api.post(`/auth/google`, { code });
      if (res && res.data && res.data.token) {
        login(res.data.token, res.data.user);
        await fetchUser(res.data.token);
        router.replace({ query: { ...route.query, code: undefined } });
        router.push("/");
      } else throw new Error("Không thể trích xuất token.");
    } catch (error) {
      console.error("Lỗi xác thực:", error);
      errorMessage.value = getFriendlyErrorMessage(
        error,
        "Xác thực thất bại. Vui lòng thử lại."
      );
      isLoggingIn.value = false;
      router.replace({ query: { ...route.query, code: undefined } });
    }
  }

  if (route.query.error) {
    errorMessage.value =
      route.query.error === "OAuthCallbackError" ||
      route.query.error === "OAuthError"
        ? "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại."
        : "Có lỗi xảy ra trong quá trình xác thực đăng nhập. Vui lòng thử lại.";
    router.replace({ query: { ...route.query, error: undefined } });
  }
});

useOneTap({
  use_fedcm: true,
  onSuccess: async (response) => {
    if (response.credential) await handleLoginWithToken(response.credential);
  },
  onError: (error) => console.error("Google One Tap error:", error),
});

const handleLoginWithToken = async (credential) => {
  errorMessage.value = "";
  isLoggingIn.value = true;
  try {
    const { api } = useAppFetch();
    const res = await api.post(`/auth/google`, { id_token: credential });
    if (res && res.data && res.data.token) {
      login(res.data.token, res.data.user);
      await fetchUser(res.data.token);
      router.push("/");
    } else throw new Error("Không thể trích xuất token.");
  } catch (error) {
    console.error("Lỗi xác thực:", error);
    errorMessage.value = getFriendlyErrorMessage(
      error,
      "Xác thực thất bại. Vui lòng thử lại."
    );
    isLoggingIn.value = false;
  }
};

const { isReady, login: triggerGoogleLogin } = useCodeClient({
  onSuccess: async (response) => {
    errorMessage.value = "";
    isLoggingIn.value = true;
    try {
      const { api } = useAppFetch();
      const res = await api.post(`/auth/google`, { code: response.code });
      if (res && res.data && res.data.token) {
        login(res.data.token, res.data.user);
        await fetchUser(res.data.token);
        router.push("/");
      } else throw new Error("Không thể trích xuất token.");
    } catch (error) {
      console.error("Lỗi Google Sign-In:", error);
      errorMessage.value =
        "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
      isLoggingIn.value = false;
    }
  },
  onError: (errorResponse) => {
    console.error("Lỗi Google Sign-In:", errorResponse);
    errorMessage.value =
      "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
    isLoggingIn.value = false;
  },
});

const handleGoogleLogin = () => {
  if (webViewInfo.value.isInApp) {
    errorMessage.value =
      "Bạn đang sử dụng trình duyệt in-app. Vui lòng nhấn nút mở trình duyệt ngoài để đăng nhập an toàn.";
    return;
  }
  if (isLoggingIn.value) return;
  errorMessage.value = "";
  if (typeof window !== "undefined") {
    const redirectUri = `${window.location.origin}/dang-nhap`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${
      config.public.googleClientId
    }&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = googleAuthUrl;
  }
};
</script>

<style scoped>
.login-page {
  position: relative;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  overflow-x: hidden;
  background: #f8fafc;
}

@media (min-width: 768px) {
  .login-page {
    padding: 2rem;
  }
}

/* Dotted grid */
.login-dotted-grid {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: radial-gradient(
    rgba(148, 163, 184, 0.12) 1.5px,
    transparent 1.5px
  );
  background-size: 24px 24px;
  mask-image: radial-gradient(
    ellipse 70% 70% at 50% 50%,
    black 60%,
    transparent 100%
  );
  -webkit-mask-image: radial-gradient(
    ellipse 70% 70% at 50% 50%,
    black 60%,
    transparent 100%
  );
}

.login-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
}

.login-glow--orange {
  top: -10%;
  left: -10%;
  width: 60%;
  height: 60%;
  background: rgba(238, 77, 45, 0.05);
  filter: blur(120px);
}
.login-glow--amber {
  bottom: -10%;
  right: -10%;
  width: 60%;
  height: 60%;
  background: rgba(245, 158, 11, 0.05);
  filter: blur(120px);
}

.login-container {
  width: 100%;
  max-width: 32rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 10;
  position: relative;
}

/* Brand */
.login-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 2rem;
}

.login-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 112px;
  height: 112px;
  margin-bottom: 1rem;
  transition: transform 0.5s ease;
  user-select: none;
}

.login-logo:hover {
  transform: rotate(12deg);
}

.login-logo-img {
  width: 112px;
  height: 112px;
  object-fit: contain;
  border-radius: 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.login-slogan {
  font-size: 26px;
  font-weight: 800;
  color: #1e293b;
  margin: 1.5rem 0 0.5rem;
  letter-spacing: -0.025em;
}

@media (min-width: 768px) {
  .login-slogan {
    font-size: 32px;
  }
}

.login-slogan-highlight {
  background: linear-gradient(to right, #ee4d2d, #f59e0b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-tagline {
  font-size: 14px;
  font-weight: 500;
  color: #64748b;
  margin: 0;
}

@media (min-width: 768px) {
  .login-tagline {
    font-size: 16px;
  }
}

/* Marquee */
.marquee-wrap {
  width: 100%;
  max-width: 28rem;
  overflow: hidden;
  margin-bottom: 2rem;
  position: relative;
}

.marquee-fade {
  position: absolute;
  inset-block: 0;
  width: 2rem;
  z-index: 10;
  pointer-events: none;
}

.marquee-fade--left {
  left: 0;
  background: linear-gradient(to right, #f8fafc, transparent);
}
.marquee-fade--right {
  right: 0;
  background: linear-gradient(to left, #f8fafc, transparent);
}

.marquee-track {
  display: flex;
  overflow: hidden;
  user-select: none;
  padding: 4px 0;
}

.marquee-row {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
  padding-right: 0.75rem;
}

.marquee-scroll {
  animation: scroll-left 12s linear infinite;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.marquee-track:hover .marquee-scroll {
  animation-play-state: paused;
}

.badge-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
  padding: 8px 14px;
  border-radius: 9999px;
  background: white;
  border: 1px solid rgba(226, 232, 240, 0.8);
  font-size: 14px;
  font-weight: 600;
  color: #334155;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.03);
}

.badge-chip-icon {
  width: 16px;
  height: 16px;
}
.badge-icon--orange {
  color: #f97316;
}
.badge-icon--emerald {
  color: #10b981;
}
.badge-icon--amber {
  color: #f59e0b;
}

/* Login Card */
.login-card {
  width: 100%;
  max-width: 28rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 1.5rem;
  border: 1px solid rgba(226, 232, 240, 0.6);
  backdrop-filter: blur(12px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.06);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

@media (max-width: 768px) {
  .login-card {
    backdrop-filter: none;
    background: white;
  }
}

@media (min-width: 768px) {
  .login-card {
    padding: 2rem;
  }
}

.login-alert {
  border-radius: 1rem !important;
}

.login-btn-wrap {
  /* Google button container */
}

.login-google-btn {
  width: 100% !important;
  height: 52px !important;
  border-radius: 1rem !important;
  border: 1px solid #e2e8f0 !important;
  font-weight: 600 !important;
  font-size: 16px !important;
  color: #334155 !important;
  background: white !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  gap: 12px !important;
}

.login-google-btn:hover {
  border-color: #ee4d2d !important;
}

.google-logo {
  width: 24px;
  height: 24px;
  flex-shrink: 0;
}

.login-google-btn-text {
  font-size: 16px;
  font-weight: 600;
  color: #334155;
}

.login-security-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 12px;
  color: #94a3b8;
  font-weight: 500;
  margin: 0;
}

.login-terms {
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
  line-height: 1.6;
  border-bottom: 1px solid rgba(226, 232, 240, 0.5);
  padding-bottom: 1.25rem;
  margin: 0;
}

.login-terms-link {
  color: #ee4d2d;
  font-weight: 600;
  text-decoration: none;
}

.login-terms-link:hover {
  text-decoration: underline;
}

.login-socials {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.login-socials-label {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #94a3b8;
}

.login-socials-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.login-social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.login-social-btn--primary {
  background: rgba(238, 77, 45, 0.1);
  color: #ee4d2d;
}

.login-social-btn--primary:hover {
  background: #ee4d2d;
  color: white;
  transform: scale(1.1);
}

.login-social-btn--red {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

.login-social-btn--red:hover {
  background: #ef4444;
  color: white;
  transform: scale(1.1);
}

/* In-App Browser Overlay */
.inapp-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(9, 13, 22, 0.9);
  backdrop-filter: blur(20px);
  overflow-y: auto;
}

.inapp-glow {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.inapp-glow--orange {
  top: 25%;
  left: 25%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
  background: rgba(238, 77, 45, 0.2);
  filter: blur(100px);
}
.inapp-glow--amber {
  bottom: 25%;
  right: 25%;
  transform: translate(50%, 50%);
  width: 350px;
  height: 350px;
  background: rgba(245, 158, 11, 0.2);
  filter: blur(100px);
}

.inapp-card {
  width: 100%;
  max-width: 28rem;
  border-radius: 1.5rem;
  padding: 1.5rem;
  background: rgba(15, 23, 42, 0.9);
  border: 1px solid rgba(51, 65, 85, 1);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4);
  position: relative;
  z-index: 10;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media (min-width: 768px) {
  .inapp-card {
    padding: 2rem;
  }
}

.inapp-alert-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 1rem;
  background: linear-gradient(135deg, #ee4d2d, #f59e0b);
  box-shadow: 0 8px 24px rgba(238, 77, 45, 0.2);
  margin-bottom: 1.5rem;
  animation: pulse-slow 3s infinite;
}

@keyframes pulse-slow {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.inapp-title {
  font-size: 20px;
  font-weight: 800;
  color: white;
  letter-spacing: -0.025em;
  margin: 0 0 8px;
}

@media (min-width: 768px) {
  .inapp-title {
    font-size: 24px;
  }
}

.inapp-platform {
  font-size: 12px;
  font-weight: 700;
  color: #ee4d2d;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  background: rgba(238, 77, 45, 0.1);
  padding: 4px 12px;
  border-radius: 9999px;
  margin: 0 0 1rem;
}

.inapp-desc {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin: 0;
}

.inapp-desc strong {
  color: white;
}

.inapp-steps {
  width: 100%;
  margin-top: 1.5rem;
  padding: 1.25rem;
  border-radius: 1rem;
  background: rgba(9, 13, 22, 0.5);
  border: 1px solid rgba(51, 65, 85, 1);
  text-align: left;
}

.inapp-steps-title {
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: #64748b;
  margin: 0 0 0.75rem;
}

.inapp-steps-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.inapp-step {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  color: #94a3b8;
  font-weight: 500;
}

.inapp-step strong {
  color: white;
}

.inapp-step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(238, 77, 45, 0.2);
  color: #ee4d2d;
  font-size: 12px;
  font-weight: 700;
  flex-shrink: 0;
}

.inapp-actions {
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.inapp-btn-primary {
  height: 52px !important;
  background: linear-gradient(to right, #ee4d2d, #f59e0b) !important;
  border: none !important;
  color: white !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  border-radius: 1rem !important;
}

.inapp-btn-copy {
  height: 52px !important;
  border-radius: 1rem !important;
  font-weight: 700 !important;
  font-size: 16px !important;
  background: rgba(30, 41, 59, 0.8) !important;
  border: 1px solid rgba(51, 65, 85, 1) !important;
  color: #94a3b8 !important;
}

/* Transitions */
.overlay-enter-active {
  transition: all 0.4s ease;
}
.overlay-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.overlay-enter-to {
  opacity: 1;
  transform: scale(1);
}
.overlay-leave-active {
  transition: all 0.3s ease-in;
}
.overlay-leave-from {
  opacity: 1;
  transform: scale(1);
}
.overlay-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
