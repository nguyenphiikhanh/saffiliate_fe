<template>
  <div class="flex flex-col gap-6 pb-12">
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
      <a-button
        type="primary"
        @click="handleSave"
        :loading="isSaving"
        size="large"
        class="font-bold"
      >
        Lưu cấu hình
      </a-button>
    </div>

    <!-- Alert -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
    >
      <a-alert
        v-if="alertMessage"
        :type="alertType"
        show-icon
        :message="alertMessage"
      />
    </transition>

    <!-- Config Grid -->
    <a-row :gutter="[24, 24]">
      <!-- Left: Platform toggles -->
      <a-col :xs="24" :lg="16">
        <a-card :bordered="false" class="admin-card" title="Các sàn hoàn tiền">
          <template #extra>
            <span class="text-xs text-slate-400"
              >Ẩn hoặc hiện các nút quy đổi trên giao diện người dùng</span
            >
          </template>

          <div class="divide-y divide-slate-100 dark:divide-slate-800">
            <!-- Shopee -->
            <div class="flex items-center justify-between py-4">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img
                    src="/icon/shopee.png"
                    class="w-5 h-5 object-contain"
                    alt="Shopee"
                  />
                </div>
                <div>
                  <div
                    class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                  >
                    Shopee Việt Nam
                  </div>
                  <div class="text-[11px] text-slate-400 mt-0.5">
                    Hoàn tiền Shopee.
                  </div>
                </div>
              </div>
              <a-switch v-model:checked="settings.shopee" />
            </div>

            <!-- TikTok -->
            <div class="flex items-center justify-between py-4">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-slate-900/10 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img
                    src="/icon/tiktok.png"
                    class="w-5 h-5 object-contain"
                    alt="TikTok"
                  />
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span
                      class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                      >TikTok Shop</span
                    >
                  </div>
                  <div class="text-[11px] text-slate-400 mt-0.5">
                    Hoàn tiền TikTok Shop.
                  </div>
                </div>
              </div>
              <a-switch v-model:checked="settings.tiktok" />
            </div>

            <!-- Lazada -->
            <div class="flex items-center justify-between py-4">
              <div class="flex items-center gap-3.5 min-w-0 pr-4">
                <div
                  class="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img
                    src="/icon/lazada.png"
                    class="w-5 h-5 object-contain"
                    alt="Lazada"
                  />
                </div>
                <div>
                  <div class="flex items-center gap-1.5">
                    <span
                      class="text-[13.5px] font-bold text-slate-800 dark:text-slate-200"
                      >Lazada Việt Nam</span
                    >
                    <a-tag
                      color="gold"
                      style="font-size: 8px; padding: 0 4px; line-height: 16px"
                      >BETA</a-tag
                    >
                  </div>
                  <div class="text-[11px] text-slate-400 mt-0.5">
                    Hoàn tiền Lazada.
                  </div>
                </div>
              </div>
              <a-switch v-model:checked="settings.lazada" />
            </div>
          </div>
        </a-card>
      </a-col>

      <!-- Right: Preview + Notes -->
      <a-col :xs="24" :lg="8">
        <!-- Preview card -->
        <a-card
          :bordered="false"
          class="admin-card"
          title="Xem trước giao diện"
          style="margin-bottom: 24px"
        >
          <div
            class="border border-slate-200/40 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-950/20"
          >
            <span
              class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3"
              >Quy đổi ở Web FE / Mobile App</span
            >
            <div class="flex flex-col gap-3">
              <div
                v-if="settings.shopee"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800"
              >
                <div
                  class="w-7 h-7 rounded bg-orange-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/shopee.png" class="w-4 h-4 object-contain" />
                </div>
                <span
                  class="text-xs font-bold text-slate-700 dark:text-slate-300"
                  >Shopee</span
                >
              </div>

              <div
                v-if="settings.tiktok"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800"
              >
                <div
                  class="w-7 h-7 rounded bg-slate-900/10 dark:bg-slate-800 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/tiktok.png" class="w-4 h-4 object-contain" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >TikTok Shop</span
                  >
                </div>
              </div>

              <div
                v-if="settings.lazada"
                class="flex items-center gap-3 p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200/60 dark:border-slate-800"
              >
                <div
                  class="w-7 h-7 rounded bg-blue-500/10 flex items-center justify-center shrink-0 overflow-hidden"
                >
                  <img src="/icon/lazada.png" class="w-4 h-4 object-contain" />
                </div>
                <div class="flex items-center gap-1.5">
                  <span
                    class="text-xs font-bold text-slate-700 dark:text-slate-300"
                    >Lazada</span
                  >
                  <a-tag
                    color="gold"
                    style="font-size: 8px; padding: 0 4px; line-height: 16px"
                    >BETA</a-tag
                  >
                </div>
              </div>

              <a-empty
                v-if="!settings.shopee && !settings.tiktok && !settings.lazada"
                description="Tất cả các sàn đã bị ẩn!"
              />
            </div>
          </div>
        </a-card>

        <!-- Notes card -->
        <a-card :bordered="false" class="admin-card" title="Lưu ý vận hành">
          <ul
            class="text-xs text-slate-500 dark:text-slate-400 space-y-2 list-disc pl-4 leading-relaxed"
          >
            <li>
              Khi ẩn sàn, người dùng sẽ không thấy sàn đó trên Web và App di
              động.
            </li>
            <li>
              Link quy đổi thuộc sàn bị ẩn sẽ tự động bị từ chối chuyển đổi để
              đảm bảo đồng bộ.
            </li>
            <li>
              Hãy đảm bảo bạn đã nhấn nút <strong>Lưu cấu hình</strong> để áp
              dụng thay đổi.
            </li>
          </ul>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

definePageMeta({ layout: "admin" });
useHead({ title: "Cấu hình hệ thống | Admin Saffiliate" });

const { user, isAdmin } = useAuth();
const router = useRouter();
const { api } = useAppFetch();

onMounted(() => {
  if (!isAdmin.value) router.replace("/");
});

const settings = ref({ shopee: true, tiktok: true, lazada: false });
const isSaving = ref(false);
const alertMessage = ref("");
const alertType = ref("success");

const fetchSettings = async () => {
  try {
    const res = await api.get("/admin/system-config");
    if (res.data?.platforms) {
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

const handleSave = async () => {
  isSaving.value = true;
  alertMessage.value = "";
  try {
    await api.post("/admin/system-config", {
      platforms: { ...settings.value },
    });
    alertType.value = "success";
    alertMessage.value = "Lưu cấu hình hệ thống thành công!";
    setTimeout(() => {
      alertMessage.value = "";
    }, 3000);
  } catch (error) {
    alertType.value = "error";
    alertMessage.value =
      error.message || "Có lỗi xảy ra khi lưu cấu hình. Vui lòng thử lại.";
  } finally {
    isSaving.value = false;
  }
};
</script>

<style scoped>
.admin-card {
  border-radius: 16px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
}
</style>
