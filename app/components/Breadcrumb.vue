<template>
  <transition name="fade">
    <nav
      v-if="shouldShow"
      aria-label="Breadcrumb"
      class="w-full mb-4 select-none animate-fade-in"
    >
      <UBreadcrumb
        :items="items"
        :ui="{
          list: 'flex items-center flex-wrap gap-2 rounded-2xl bg-white/50 dark:bg-slate-900/40 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/60 px-4 py-2.5 shadow-sm text-xs font-bold text-slate-555 dark:text-slate-400',
          link: 'hover:text-shopee-orange dark:hover:text-shopee-orange transition-colors duration-300',
          active: 'text-shopee-orange dark:text-shopee-orange font-extrabold'
        }"
      />
    </nav>
  </transition>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const labelMap = {
  "hoan-tien": "Hoàn tiền",
  "don-hang": "Đơn hàng",
  "tai-chinh": "Tài chính",
  "ho-so": "Hồ sơ",
  "ca-nhan": "Hồ sơ",
  "huong-dan": "Hướng dẫn",
  "ho-tro": "Hỗ trợ",
  "su-kien": "Sự kiện",
  "san-pham": "Sản phẩm",
  "thong-bao": "Thông báo"
};

const shouldShow = computed(() => {
  const path = route.path;
  return path !== "/" && path !== "/dang-nhap";
});

const items = computed(() => {
  const list = [
    { label: "Trang chủ", icon: "i-heroicons-home", to: "/" }
  ];
  
  const fullPath = route.path;
  if (!fullPath || fullPath === "/") return [];

  const segments = fullPath.replace(/\/$/, "").split("/").filter(Boolean);
  
  let currentPath = "";
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    const translatedName = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    list.push({
      label: translatedName,
      to: currentPath
    });
  });
  return list;
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
