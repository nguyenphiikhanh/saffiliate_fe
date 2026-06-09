<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500">
    <!-- Header -->
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2
          class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight"
        >
          Cấu hình hệ thống
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Cài đặt hiển thị các sàn hoàn tiền và tùy chọn hệ thống.
        </p>
      </div>

      <!-- Save Button -->
      <button
        @click="handleSave"
        :disabled="isSaving"
        type="button"
        class="bg-orange-600 hover:bg-orange-700 disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white disabled:text-slate-400 dark:disabled:text-slate-500 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-orange-600/15 cursor-pointer shrink-0"
      >
        <svg
          v-if="isSaving"
          class="animate-spin h-4 w-4 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{{ isSaving ? "Đang lưu..." : "Lưu cấu hình" }}</span>
      </button>
    </div>

    <!-- Alert Success/Error -->
    <transition
      enter-active-class="transition-all duration-350 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="alertMessage"
        class="p-4 rounded-xl border flex items-center gap-3 text-sm font-medium"
        :class="
          alertType === 'success'
            ? 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400'
            : 'bg-rose-50 dark:bg-rose-900/20 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-450'
        "
      >
        <svg
          v-if="alertType === 'success'"
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <span>{{ alertMessage }}</span>
      </div>
    </transition>

    <!-- Main Config Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Section Left: Cashback Platforms Settings -->
      <div class="lg:col-span-2 space-y-6">
        <div
          class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-5"
        >
          <div>
            <h3
              class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1"
            >
              Các sàn hoàn tiền
            </h3>
            <p class="text-xs text-slate-400">
              Ẩn hoặc hiện các nút quy đổi và danh mục sàn trên giao diện người
              dùng.
            </p>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <!-- Shopee Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"
                >
                  <svg
                    viewBox="0 0 109.59 122.88"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5.5 h-5.5 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span
                    class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                    >Sàn Shopee Việt Nam</span
                  >
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate"
                    >Dịch vụ liên kết tiếp thị hoàn tiền từ sàn Shopee.</span
                  >
                </div>
              </div>
              <!-- Toggle Button -->
              <button
                @click="settings.shopee = !settings.shopee"
                type="button"
                class="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none shrink-0"
                :class="
                  settings.shopee
                    ? 'bg-[#ff5722]'
                    : 'bg-slate-200 dark:bg-slate-800'
                "
              >
                <div
                  class="bg-white w-4 h-4 rounded-full shadow transition-transform duration-300"
                  :class="settings.shopee ? 'translate-x-5' : 'translate-x-0'"
                ></div>
              </button>
            </div>

            <!-- Tiktok Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-slate-900/10 dark:bg-slate-850 text-slate-850 dark:text-slate-100 flex items-center justify-center shrink-0"
                >
                  <!-- Tiktok icon -->
                  <svg
                    viewBox="0 0 24 24"
                    class="w-5 h-5 shrink-0"
                    fill="currentColor"
                  >
                    <path
                      d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.52-4.09-1.33a8.16 8.16 0 0 1-2.22-2.14v7.41c.07 2.11-.84 4.31-2.54 5.54-1.76 1.34-4.22 1.73-6.26 1.07-2.45-.76-4.39-2.9-4.75-5.46-.46-3.08 1.16-6.38 4.09-7.46 1.25-.47 2.6-.52 3.89-.2v4.09c-1-.26-2.1-.2-3 .34a3.84 3.84 0 0 0-2 3.25c-.09 1.64 1 3.26 2.6 3.63 1.48.36 3.2-.23 3.84-1.61.27-.57.34-1.22.32-1.85V.02z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span
                    class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                    >Sàn TikTok Shop</span
                  >
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate"
                    >Dịch vụ liên kết tiếp thị hoàn tiền từ sàn TikTok
                    Shop.</span
                  >
                </div>
              </div>
              <!-- Toggle Button -->
              <button
                @click="settings.tiktok = !settings.tiktok"
                type="button"
                class="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none shrink-0"
                :class="
                  settings.tiktok
                    ? 'bg-[#ff5722]'
                    : 'bg-slate-200 dark:bg-slate-800'
                "
              >
                <div
                  class="bg-white w-4 h-4 rounded-full shadow transition-transform duration-300"
                  :class="settings.tiktok ? 'translate-x-5' : 'translate-x-0'"
                ></div>
              </button>
            </div>

            <!-- Lazada Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0"
                >
                  <!-- Heart / Lazada icon mockup -->
                  <svg
                    viewBox="0 0 24 24"
                    class="w-5.5 h-5.5 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <div class="flex flex-col min-w-0">
                  <span
                    class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                    >Sàn Lazada Việt Nam</span
                  >
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate"
                    >Dịch vụ liên kết tiếp thị hoàn tiền từ sàn Lazada.</span
                  >
                </div>
              </div>
              <!-- Toggle Button -->
              <button
                @click="settings.lazada = !settings.lazada"
                type="button"
                class="w-11 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 focus:outline-none shrink-0"
                :class="
                  settings.lazada
                    ? 'bg-[#ff5722]'
                    : 'bg-slate-200 dark:bg-slate-800'
                "
              >
                <div
                  class="bg-white w-4 h-4 rounded-full shadow transition-transform duration-300"
                  :class="settings.lazada ? 'translate-x-5' : 'translate-x-0'"
                ></div>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Section Right: Preview & Guide -->
      <div class="space-y-6">
        <div
          class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-5"
        >
          <h3
            class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider"
          >
            Xem trước giao diện
          </h3>

          <div
            class="border border-slate-200/40 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/20 space-y-4"
          >
            <span
              class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block"
              >Quy đổi ở Web FE / Mobile App</span
            >

            <div class="flex flex-col gap-3">
              <div
                v-if="settings.shopee"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div
                  class="w-7 h-7 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center shrink-0"
                >
                  <svg
                    viewBox="0 0 109.59 122.88"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-4 h-4 shrink-0"
                  >
                    <path
                      fill="currentColor"
                      d="M74.98,91.98C76.15,82.36,69.96,76.22,53.6,71c-7.92-2.7-11.66-6.24-11.57-11.12 c0.33-5.4,5.36-9.34,12.04-9.47c4.63,0.09,9.77,1.22,14.76,4.56c0.59,0.37,1.01,0.32,1.35-0.2c0.46-0.74,1.61-2.53,2-3.17 c0.26-0.42,0.31-0.96-0.35-1.44c-0.95-0.7-3.6-2.13-5.03-2.72c-3.88-1.62-8.23-2.64-12.86-2.63c-9.77,0.04-17.47,6.22-18.12,14.47 c-0.42,5.95,2.53,10.79,8.86,14.47c1.34,0.78,8.6,3.67,11.49,4.57c9.08,2.83,13.8,7.9,12.69,13.81c-1.01,5.36-6.65,8.83-14.43,8.93 c-6.17-0.24-11.71-2.75-16.02-6.1c-0.11-0.08-0.65-0.5-0.72-0.56c-0.53-0.42-1.11-0.39-1.47,0.15c-0.26,0.4-1.92,2.8-2.34,3.43 c-0.39,0.55-0.18,0.86,0.23,1.2c1.8,1.5,4.18,3.14,5.81,3.97c4.47,2.28,9.32,3.53,14.48,3.72c3.32,0.22,7.5-0.49,10.63-1.81 C70.63,102.67,74.25,97.92,74.98,91.98L74.98,91.98z M54.79,7.18c-10.59,0-19.22,9.98-19.62,22.47h39.25 C74.01,17.16,65.38,7.18,54.79,7.18L54.79,7.18z M94.99,122.88l-0.41,0l-80.82-0.01h0c-5.5-0.21-9.54-4.66-10.09-10.19l-0.05-1 l-3.61-79.5v0C0,32.12,0,32.06,0,32c0-1.28,1.03-2.33,2.3-2.35l0,0h25.48C28.41,13.15,40.26,0,54.79,0s26.39,13.15,27.01,29.65 h25.4h0.04c1.3,0,2.35,1.05,2.35,2.35c0,0.04,0,0.08,0,0.12v0l-3.96,79.81l-0.04,0.68C105.12,118.21,100.59,122.73,94.99,122.88 L94.99,122.88z"
                    />
                  </svg>
                </div>
                <span
                  class="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >Shopee (Hoàn tiền bật)</span
                >
              </div>

              <div
                v-if="settings.tiktok"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div
                  class="w-7 h-7 rounded bg-slate-900/10 dark:bg-slate-800 text-slate-850 dark:text-slate-100 flex items-center justify-center shrink-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="w-4 h-4 shrink-0"
                    fill="currentColor"
                  >
                    <path
                      d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.52-4.09-1.33a8.16 8.16 0 0 1-2.22-2.14v7.41c.07 2.11-.84 4.31-2.54 5.54-1.76 1.34-4.22 1.73-6.26 1.07-2.45-.76-4.39-2.9-4.75-5.46-.46-3.08 1.16-6.38 4.09-7.46 1.25-.47 2.6-.52 3.89-.2v4.09c-1-.26-2.1-.2-3 .34a3.84 3.84 0 0 0-2 3.25c-.09 1.64 1 3.26 2.6 3.63 1.48.36 3.2-.23 3.84-1.61.27-.57.34-1.22.32-1.85V.02z"
                    />
                  </svg>
                </div>
                <span
                  class="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >TikTok Shop (Hoàn tiền bật)</span
                >
              </div>

              <div
                v-if="settings.lazada"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div
                  class="w-7 h-7 rounded bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0"
                >
                  <svg
                    viewBox="0 0 24 24"
                    class="w-4 h-4 shrink-0"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2.5"
                  >
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </div>
                <span
                  class="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >Lazada (Hoàn tiền bật)</span
                >
              </div>

              <div
                v-if="!settings.shopee && !settings.tiktok && !settings.lazada"
                class="text-center py-6 text-slate-400 text-xs"
              >
                Tất cả các sàn đã bị ẩn!
              </div>
            </div>
          </div>
        </div>

        <div
          class="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/60 dark:border-slate-800/80 shadow-sm space-y-4"
        >
          <h3
            class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider"
          >
            Lưu ý vận hành
          </h3>
          <ul
            class="text-xs text-slate-500 space-y-2 list-disc pl-4 leading-relaxed"
          >
            <li>
              Khi ẩn sàn, người dùng sẽ không thấy sàn đó trên Web và App di
              động.
            </li>
            <li>
              Link quy đổi thuộc sàn bị ẩn gửi lên hệ thống sẽ tự động bị từ
              chối chuyển đổi để đảm bảo đồng bộ.
            </li>
            <li>
              Hãy đảm bảo bạn đã nhấn nút "Lưu cấu hình" ở góc phải màn hình để
              áp dụng thay đổi.
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { authClient } from "~/utils/auth-client";
import { useRouter } from "vue-router";
import { useAppFetch } from "@/composables/useAppFetch";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Cấu hình hệ thống | Admin Saffiliate",
});

const { data: session } = await authClient.useSession(useFetch);
const router = useRouter();
const { api } = useAppFetch();

// Route Protection: verify if current logged in user is admin
onMounted(() => {
  if (!session.value || session.value.user?.role !== 1) {
    router.replace("/");
  }
});

// Settings State
const settings = ref({
  shopee: true,
  tiktok: true,
  lazada: false,
});

const isSaving = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

// Load Settings from API
const fetchSettings = async () => {
  try {
    const res = await api.get("/admin/system-config");
    if (res.data && res.data.platforms) {
      settings.value.shopee = res.data.platforms.shopee;
      settings.value.tiktok = res.data.platforms.tiktok;
      settings.value.lazada = res.data.platforms.lazada;
    }
  } catch (error) {
    console.error("Failed to load settings:", error);
  }
};

onMounted(async () => {
  await fetchSettings();
});

// Save Settings logic
const handleSave = async () => {
  isSaving.value = true;
  alertMessage.value = "";

  try {
    const payload = {
      platforms: {
        shopee: settings.value.shopee,
        tiktok: settings.value.tiktok,
        lazada: settings.value.lazada,
      }
    };

    await api.post("/admin/system-config", payload);

    alertType.value = "success";
    alertMessage.value = "Lưu cấu hình hệ thống thành công!";

    // Auto-hide alert after 3 seconds
    setTimeout(() => {
      alertMessage.value = "";
    }, 3000);
  } catch (error) {
    alertType.value = "error";
    alertMessage.value = error.message || "Có lỗi xảy ra khi lưu cấu hình. Vui lòng thử lại.";
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
</style>
