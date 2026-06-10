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
                  class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/shopee.png" class="w-5.5 h-5.5 object-contain" alt="Shopee Logo" />
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
                  class="w-10 h-10 rounded-xl bg-slate-900/10 dark:bg-slate-850 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/tiktok.png" class="w-5.5 h-5.5 object-contain" alt="TikTok Logo" />
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span
                      class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                      >Sàn TikTok Shop</span
                    >
                    <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider select-none leading-none">BETA</span>
                  </div>
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
                  class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/lazada.png" class="w-5.5 h-5.5 object-contain" alt="Lazada Logo" />
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span
                      class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                      >Sàn Lazada Việt Nam</span
                    >
                    <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider select-none leading-none">BETA</span>
                  </div>
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
                  class="w-7 h-7 rounded bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/shopee.png" class="w-4 h-4 object-contain" alt="Shopee Logo" />
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
                  class="w-7 h-7 rounded bg-slate-900/10 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/tiktok.png" class="w-4 h-4 object-contain" alt="TikTok Logo" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >TikTok Shop (Hoàn tiền bật)</span
                  >
                  <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider select-none leading-none">BETA</span>
                </div>
              </div>

              <div
                v-if="settings.lazada"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div
                  class="w-7 h-7 rounded bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/lazada.png" class="w-4 h-4 object-contain" alt="Lazada Logo" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >Lazada (Hoàn tiền bật)</span
                  >
                  <span class="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/15 text-[8px] font-black uppercase tracking-wider select-none leading-none">BETA</span>
                </div>
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
