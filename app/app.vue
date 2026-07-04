<template>
  <a-config-provider :theme="computedTheme">
    <div
      v-if="!isMounted"
      style="
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #f8fafc;
      "
    >
      <img class="saffi-bounce" src="/saffi_gold.webp" alt="Gold" style="width: 56px; height: 56px; object-fit: contain; margin-bottom: 16px; z-index: 20;" />
      <div style="position: relative; width: 84px; height: 84px; display: flex; align-items: center; justify-content: center;">
        <div
          class="saffi-spinner"
          style="
            position: absolute;
            inset: 0;
            border-radius: 50%;
            border: 4px solid #e2e8f0;
            border-top-color: #ee4d2d;
          "
        ></div>
        <img class="saffi-pulse" src="/saficon.webp" alt="Loading" style="width: 64px; height: 64px; object-fit: cover; border-radius: 50%; z-index: 10;" />
      </div>
      <p
        style="
          margin-top: 24px;
          font-size: 15px;
          font-weight: 700;
          color: #64748b;
          font-family: sans-serif;
        "
      >
        Đang tải...
      </p>
    </div>

    <!-- Nội dung chính (Ẩn đi cho đến khi load xong CSS) -->
    <div
      :style="{
        opacity: isMounted ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
      }"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </a-config-provider>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import { theme } from "ant-design-vue";
import { useTheme } from "~/composables/useTheme";

const { isDark } = useTheme();

const isMounted = ref(false);

onMounted(() => {
  // Đợi cho CSS và DOM được tải hoàn toàn rồi mới hiển thị giao diện
  setTimeout(() => {
    isMounted.value = true;
  }, 50);
});

// AntD theme with Shopee Orange as primary + Plus Jakarta Sans font
const computedTheme = computed(() => {
  return {
    algorithm: isDark.value ? theme.darkAlgorithm : theme.defaultAlgorithm,
    token: {
      colorPrimary: "#EE4D2D",
      colorPrimaryHover: "#F05D40",
      colorPrimaryActive: "#D94429",
      fontFamily:
        "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
      borderRadius: 8,
      borderRadiusLG: 12,
      borderRadiusSM: 6,
      ...(isDark.value
        ? {
            colorBgBase: "#020617", // slate-950
            colorTextBase: "#F8FAFC", // slate-50
            colorBorder: "#1E293B", // slate-800
            colorBorderSecondary: "#0F172A", // slate-900
          }
        : {
            colorBgBase: "#FFFFFF",
            colorTextBase: "#0F172A",
            colorBorder: "#E2E8F0",
            colorBorderSecondary: "#F1F5F9",
          }),
      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)",
      boxShadowSecondary:
        "0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)",
    },
    components: {
      Button: {
        primaryShadow: "0 4px 20px rgba(238, 77, 45, 0.25)",
      },
      Input: {
        activeBorderColor: "#EE4D2D",
        hoverBorderColor: "#F05D40",
      },
      Table: {
        headerBg: isDark.value ? "#0F172A" : "#F8FAFC",
      },
      Card: {
        colorBgContainer: isDark.value ? "#0B0F19" : "#FFFFFF",
      },
    },
  };
});
</script>

<style>
.saffi-spinner {
  animation: saffi-spin 1s linear infinite;
}
@keyframes saffi-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.saffi-pulse {
  animation: saffi-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
@keyframes saffi-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
.saffi-bounce {
  animation: saffi-bounce 0.5s cubic-bezier(0.28, 0.84, 0.42, 1) infinite alternate;
}
@keyframes saffi-bounce {
  0% { transform: translateY(0) scale(0.95); }
  100% { transform: translateY(-20px) scale(1.05); }
}
</style>
