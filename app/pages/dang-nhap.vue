<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 relative overflow-hidden">
    <!-- Background Decoration -->
    <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none"></div>

    <div class="w-full max-w-md relative z-10">
      <!-- Brand Header -->
      <div class="text-center mb-8">
        <NuxtImg src="/saficon.webp" class="w-20 h-20 mx-auto mb-4 rounded-2xl shadow-sm" alt="Saffi Logo" />
        <h2 class="text-2xl font-black text-slate-800 dark:text-slate-100 tracking-tight mb-2">
          Mua sắm, <span class="text-[#ee4d2d]">Hoàn Tiền Thật</span>
        </h2>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">
          Tiết kiệm thông minh với mỗi đơn hàng mua sắm online
        </p>
      </div>

      <!-- Login Card -->
      <a-card :bordered="false" class="shadow-xl rounded-2xl">
        <a-alert
          v-if="errorMessage"
          type="error"
          message="Đăng nhập thất bại"
          :description="errorMessage"
          show-icon
          closable
          class="mb-6"
          @close="errorMessage = ''"
        />

        <a-button
          size="large"
          block
          :loading="isLoggingIn"
          class="h-12 flex items-center justify-center font-bold text-[15px]"
          @click="handleGoogleLogin"
        >
          <template #icon v-if="!isLoggingIn">
            <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
            </svg>
          </template>
          Tiếp tục với Google
        </a-button>

        <div class="mt-4 flex items-start gap-2 text-xs font-medium text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
          <InfoCircleOutlined class="text-blue-500 mt-0.5" />
          <span>Google là phương thức đăng nhập chính và được hệ thống khuyến nghị để đảm bảo an toàn.</span>
        </div>

        <a-divider style="margin: 24px 0" />

        <div class="text-center text-xs font-medium text-slate-500">
          Bằng việc tiếp tục, bạn đồng ý với
          <a href="#" class="text-blue-500 hover:underline">Điều khoản & Chính sách</a> của chúng tôi.
        </div>
      </a-card>

      <!-- Social Links -->
      <div class="mt-8 flex flex-col items-center">
        <span class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Hỗ trợ & Kết nối</span>
        <div class="flex gap-4">
          <a :href="config.public.zaloGroup || '#'" target="_blank" class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-blue-500 hover:scale-110 hover:border-blue-500 transition-all shadow-sm">
            <MessageOutlined class="text-lg" />
          </a>
          <a href="mailto:support@saffi.vn" class="w-10 h-10 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center text-rose-500 hover:scale-110 hover:border-rose-500 transition-all shadow-sm">
            <MailOutlined class="text-lg" />
          </a>
        </div>
      </div>
    </div>

    <!-- In-App Browser Blocker Modal -->
    <a-modal
      v-model:open="webViewInfo.isInApp"
      :closable="false"
      :maskClosable="false"
      :keyboard="false"
      centered
      :footer="null"
      width="400px"
      class="inapp-modal"
    >
      <div class="text-center p-4">
        <div class="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/30 text-rose-500 flex items-center justify-center text-3xl mx-auto mb-4">
          <WarningOutlined />
        </div>
        <h3 class="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">Trình duyệt không hỗ trợ</h3>
        <p class="text-sm font-medium text-slate-500 dark:text-slate-400 mb-6">
          Bạn đang sử dụng trình duyệt nội bộ của ứng dụng <strong class="text-slate-700 dark:text-slate-300">{{ webViewInfo.platform }}</strong>.
          Để đảm bảo tính năng Đăng nhập Google hoạt động, vui lòng mở trang này bằng trình duyệt web bên ngoài.
        </p>

        <div class="bg-slate-50 dark:bg-slate-900 p-4 rounded-xl text-left border border-slate-100 dark:border-slate-800 mb-6">
          <p class="text-xs font-bold text-slate-700 dark:text-slate-300 mb-3 uppercase tracking-wider">Hướng dẫn:</p>
          <ul class="text-[13px] font-medium text-slate-600 dark:text-slate-400 space-y-2 pl-4 list-decimal">
            <li v-for="(step, i) in platformSteps" :key="i" v-html="step"></li>
          </ul>
        </div>

        <div class="flex flex-col gap-3">
          <a-button v-if="webViewInfo.isAndroid" type="primary" size="large" block @click="redirectToSystemBrowser" class="font-bold">
            <template #icon><GlobalOutlined /></template>
            Mở trình duyệt mặc định
          </a-button>
          <a-button @click="copyLink" size="large" block class="font-bold">
            <template #icon>
              <CheckOutlined v-if="isCopied" class="text-emerald-500" />
              <CopyOutlined v-else />
            </template>
            {{ isCopied ? "Đã sao chép liên kết!" : "Sao chép liên kết" }}
          </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCodeClient } from "vue3-google-signin";
import { 
  InfoCircleOutlined, 
  MessageOutlined, 
  MailOutlined, 
  WarningOutlined, 
  GlobalOutlined, 
  CopyOutlined, 
  CheckOutlined 
} from "@ant-design/icons-vue";

definePageMeta({ layout: false, alias: ["/login"] });

useSeoMeta({
  title: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  ogTitle: "Đăng nhập | Saffi - Mua hàng, Hoàn Tiền Thật",
  description: "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
  ogDescription: "Đăng nhập hệ thống Saffi để quy đổi liên kết Shopee nhận cashback chiết khấu cao.",
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

const platformSteps = computed(() => {
  const p = webViewInfo.value.platform;
  if (p === "Zalo") return ["Bấm vào biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên bên phải.", "Chọn mục <strong>Mở bằng trình duyệt</strong> để đăng nhập ngay."];
  if (p === "Facebook" || p === "Messenger") return ["Bấm vào biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên bên phải.", "Chọn <strong>Mở bằng trình duyệt ngoài</strong> hoặc <strong>Mở bằng Safari/Chrome</strong>."];
  if (p === "Telegram") return ["Nhấp biểu tượng menu <strong>Ba chấm &bull;&bull;&bull;</strong> ở góc trên màn hình.", "Chọn <strong>Mở bằng Safari/Chrome</strong> hoặc nhấp biểu tượng trình duyệt."];
  if (p === "TikTok") return ["Nhấn nút menu chia sẻ hoặc <strong>Ba chấm &bull;&bull;&bull;</strong> ở thanh tùy chọn.", "Chọn <strong>Mở bằng trình duyệt</strong>."];
  return ["Chọn biểu tượng tùy chọn/menu trên ứng dụng của bạn.", "Tìm và nhấp vào mục <strong>Mở bằng trình duyệt ngoài</strong>."];
});

const copyLink = async () => {
  if (typeof window === "undefined") return;
  try {
    await navigator.clipboard.writeText(window.location.href);
    isCopied.value = true;
    setTimeout(() => { isCopied.value = false; }, 2000);
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
      setTimeout(() => { isCopied.value = false; }, 2000);
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
    const isInApp = isZalo || isFacebook || isMessenger || isInstagram || isTikTok || isTelegram;

    webViewInfo.value = {
      isInApp,
      isAndroid: /Android/i.test(ua),
      isiOS: /iPhone|iPad|iPod/i.test(ua),
      platform: isZalo ? "Zalo" : isMessenger ? "Messenger" : isFacebook ? "Facebook" : isInstagram ? "Instagram" : isTikTok ? "TikTok" : isTelegram ? "Telegram" : "In-App Browser",
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
      errorMessage.value = error.data?.message || error.message || "Xác thực thất bại. Vui lòng thử lại.";
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
      errorMessage.value = error.data?.message || error.message || "Xác thực thất bại. Vui lòng thử lại.";
      isLoggingIn.value = false;
      router.replace({ query: { ...route.query, code: undefined } });
    }
  }

  if (route.query.error) {
    errorMessage.value = route.query.error === "OAuthCallbackError" || route.query.error === "OAuthError"
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
    errorMessage.value = error.data?.message || error.message || "Xác thực thất bại. Vui lòng thử lại.";
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
      errorMessage.value = "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
      isLoggingIn.value = false;
    }
  },
  onError: (errorResponse) => {
    errorMessage.value = "Không thể kết nối hoặc xác thực với tài khoản Google. Vui lòng thử lại.";
    isLoggingIn.value = false;
  },
});

const handleGoogleLogin = () => {
  if (webViewInfo.value.isInApp) {
    errorMessage.value = "Bạn đang sử dụng trình duyệt in-app. Vui lòng nhấn nút mở trình duyệt ngoài để đăng nhập an toàn.";
    return;
  }
  if (isLoggingIn.value) return;
  errorMessage.value = "";
  if (typeof window !== "undefined") {
    const redirectUri = `${window.location.origin}/dang-nhap`;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${config.public.googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = googleAuthUrl;
  }
};
</script>

<style scoped>
:deep(.inapp-modal .ant-modal-content) {
  border-radius: 24px;
  overflow: hidden;
}
</style>
