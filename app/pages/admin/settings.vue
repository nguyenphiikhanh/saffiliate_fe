<template>
  <div class="flex flex-col gap-6 animate-in fade-in duration-500 pb-12">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h2 class="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-tight">
          Cấu hình hệ thống
        </h2>
        <p class="text-[13px] text-slate-500 dark:text-slate-400 mt-1">
          Cài đặt hiển thị các sàn hoàn tiền và tùy chọn hệ thống.
        </p>
      </div>

      <!-- Save Button -->
      <UButton
        @click="handleSave"
        :loading="isSaving"
        size="md"
        class="font-bold text-xs shadow-lg shadow-orange-600/15"
      >
        Lưu cấu hình
      </UButton>
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
      <div v-if="alertMessage">
        <UAlert
          v-if="alertType === 'success'"
          icon="i-lucide-circle-check"
          color="success"
          variant="soft"
          :title="alertMessage"
        />
        <UAlert
          v-else
          icon="i-lucide-alert-triangle"
          color="danger"
          variant="soft"
          :title="alertMessage"
        />
      </div>
    </transition>

    <!-- Main Config Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Section Left: Cashback Platforms Settings -->
      <div class="lg:col-span-2 space-y-6">
        <UCard
          :ui="{
            body: 'p-6 space-y-5',
            ring: 'ring-1 ring-slate-200/60 dark:ring-slate-800/80',
            background: 'bg-white dark:bg-slate-900',
            rounded: 'rounded-3xl shadow-sm'
          }"
        >
          <div>
            <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider mb-1">
              Các sàn hoàn tiền
            </h3>
            <p class="text-xs text-slate-400">
              Ẩn hoặc hiện các nút quy đổi và danh mục sàn trên giao diện người dùng.
            </p>
          </div>

          <div class="divide-y divide-slate-100 dark:divide-slate-800/60">
            <!-- Shopee Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/shopee.png" class="w-5.5 h-5.5 object-contain" alt="Shopee Logo" />
                </div>
                <div class="flex flex-col min-w-0">
                  <span class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200">Sàn Shopee Việt Nam</span>
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate">Dịch vụ liên kết tiếp thị hoàn tiền từ sàn Shopee.</span>
                </div>
              </div>
              <USwitch v-model="settings.shopee" size="md" />
            </div>

            <!-- Tiktok Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div class="w-10 h-10 rounded-xl bg-slate-900/10 dark:bg-slate-850 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/tiktok.png" class="w-5.5 h-5.5 object-contain" alt="TikTok Logo" />
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200">Sàn TikTok Shop</span>
                    <UBadge size="xs" variant="soft" color="warning" class="text-[8px] font-black uppercase tracking-wider select-none leading-none px-1.5 py-0.5 rounded">BETA</UBadge>
                  </div>
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate">Dịch vụ liên kết tiếp thị hoàn tiền từ sàn TikTok Shop.</span>
                </div>
              </div>
              <USwitch v-model="settings.tiktok" size="md" />
            </div>

            <!-- Lazada Toggle Row -->
            <div class="flex items-center justify-between py-4.5">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/lazada.png" class="w-5.5 h-5.5 object-contain" alt="Lazada Logo" />
                </div>
                <div class="flex flex-col min-w-0">
                  <div class="flex items-center gap-1.5">
                    <span class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200">Sàn Lazada Việt Nam</span>
                    <UBadge size="xs" variant="soft" color="warning" class="text-[8px] font-black uppercase tracking-wider select-none leading-none px-1.5 py-0.5 rounded">BETA</UBadge>
                  </div>
                  <span class="text-[11px] text-slate-400 mt-0.5 truncate">Dịch vụ liên kết tiếp thị hoàn tiền từ sàn Lazada.</span>
                </div>
              </div>
              <USwitch v-model="settings.lazada" size="md" />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Section Right: Preview & Guide -->
      <div class="space-y-6">
        <UCard
          :ui="{
            body: 'p-6 space-y-5',
            ring: 'ring-1 ring-slate-200/60 dark:ring-slate-800/80',
            background: 'bg-white dark:bg-slate-900',
            rounded: 'rounded-3xl shadow-sm'
          }"
        >
          <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Xem trước giao diện
          </h3>

          <div class="border border-slate-200/40 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/20 space-y-4">
            <span class="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest block">Quy đổi ở Web FE / Mobile App</span>

            <div class="flex flex-col gap-3">
              <div
                v-if="settings.shopee"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div class="w-7 h-7 rounded bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/shopee.png" class="w-4 h-4 object-contain" alt="Shopee Logo" />
                </div>
                <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Shopee (Hoàn tiền bật)</span>
              </div>

              <div
                v-if="settings.tiktok"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div class="w-7 h-7 rounded bg-slate-900/10 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/tiktok.png" class="w-4 h-4 object-contain" alt="TikTok Logo" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-300">TikTok Shop (Hoàn tiền bật)</span>
                  <UBadge size="xs" variant="soft" color="warning" class="text-[8px] font-black uppercase tracking-wider select-none leading-none px-1.5 py-0.5 rounded">BETA</UBadge>
                </div>
              </div>

              <div
                v-if="settings.lazada"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-850 shadow-xs"
              >
                <div class="w-7 h-7 rounded bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden">
                  <img src="/icon/lazada.png" class="w-4 h-4 object-contain" alt="Lazada Logo" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-700 dark:text-slate-300">Lazada (Hoàn tiền bật)</span>
                  <UBadge size="xs" variant="soft" color="warning" class="text-[8px] font-black uppercase tracking-wider select-none leading-none px-1.5 py-0.5 rounded">BETA</UBadge>
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
        </UCard>

        <UCard
          :ui="{
            body: 'p-6 space-y-4',
            ring: 'ring-1 ring-slate-200/60 dark:ring-slate-800/80',
            background: 'bg-white dark:bg-slate-900',
            rounded: 'rounded-3xl shadow-sm'
          }"
        >
          <h3 class="text-sm font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Lưu ý vận hành
          </h3>
          <ul class="text-xs text-slate-550 dark:text-slate-450 space-y-2 list-disc pl-4 leading-relaxed">
            <li>Khi ẩn sàn, người dùng sẽ không thấy sàn đó trên Web và App di động.</li>
            <li>Link quy đổi thuộc sàn bị ẩn gửi lên hệ thống sẽ tự động bị từ chối chuyển đổi để đảm bảo đồng bộ.</li>
            <li>Hãy đảm bảo bạn đã nhấn nút "Lưu cấu hình" ở góc phải màn hình để áp dụng thay đổi.</li>
          </ul>
        </UCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({
  layout: "admin",
});

useHead({
  title: "Cấu hình hệ thống | Admin Saffiliate",
});

const { user, isAdmin } = useAuth();
const router = useRouter();
const { api } = useAppFetch();

// Route Protection: verify if current logged in user is admin
onMounted(() => {
  if (!isAdmin.value) {
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
