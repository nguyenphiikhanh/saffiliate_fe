<template>
  <div class="layout-root">
    <!-- Premium background decoration (disabled on mobile via CSS) -->
    <div class="bg-decoration blur-decoration" style="position:absolute;top:-10%;left:-10%;width:50%;height:50%;border-radius:50%;background:rgba(238,77,45,0.05);filter:blur(120px);pointer-events:none"></div>
    <div class="bg-decoration blur-decoration" style="position:absolute;bottom:-10%;right:-10%;width:50%;height:50%;border-radius:50%;background:rgba(245,158,11,0.05);filter:blur(120px);pointer-events:none"></div>

    <!-- Header -->
    <AppHeader />

    <!-- Main Content Area -->
    <main class="layout-main">
      <!-- Dynamic Breadcrumb Navigation -->
      <Breadcrumb />

      <!-- Inner page contents container -->
      <div class="layout-content">
        <slot />
      </div>
    </main>

    <!-- Footer -->
    <AppFooter />
  </div>
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
.layout-root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1.5rem 1rem;
  position: relative;
  z-index: 10;
}

@media (min-width: 768px) {
  .layout-main {
    padding: 2.5rem 1.5rem;
  }
}

@media (min-width: 1024px) {
  .layout-main {
    padding: 2.5rem 2rem;
  }
}

.layout-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
