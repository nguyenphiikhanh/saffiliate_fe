<template>
  <a-layout class="min-h-screen font-sans" style="background: var(--bg-color)">
    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area -->
    <a-layout-content class="w-full max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10 flex flex-col">
      <!-- Dynamic Breadcrumb Navigation -->
      <Breadcrumb class="mb-4" />

      <!-- Inner page contents container -->
      <div class="flex-1 w-full flex flex-col">
        <slot />
      </div>
    </a-layout-content>

    <!-- Footer -->
    <AppFooter />
  </a-layout>
</template>

<script setup>
import { onMounted } from "vue";
import { useTheme } from "@/composables/useTheme";

const { initTheme } = useTheme();

onMounted(() => {
  initTheme();
});
</script>

<style scoped>
/* CSS Variables for Dark Mode */
html {
  --bg-color: #f8fafc; /* slate-50 */
}

html.dark {
  --bg-color: #020617; /* slate-950 */
}

:deep(.ant-layout) {
  background: transparent !important;
}
</style>
