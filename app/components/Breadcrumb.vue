<template>
  <transition name="fade">
    <nav v-if="shouldShow" aria-label="Breadcrumb" class="w-full mb-4 select-none animate-fade-in">
      <a-breadcrumb :items="antdItems" class="px-4 py-2 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 rounded-xl shadow-[0_1px_4px_rgba(0,0,0,0.03)] dark:shadow-[0_1px_4px_rgba(0,0,0,0.2)] inline-flex items-center">
        <template #itemRender="{ route: item, routes }">
          <span v-if="routes.indexOf(item) === routes.length - 1" class="breadcrumb-active">
            {{ item.breadcrumbName }}
          </span>
          <NuxtLink v-else :to="item.path" class="breadcrumb-link">
            {{ item.breadcrumbName }}
          </NuxtLink>
        </template>
        <a-breadcrumb-item v-for="item in antdItems" :key="item.path">
          <template v-if="item.icon">
            <NuxtLink :to="item.path" class="breadcrumb-link breadcrumb-home">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              {{ item.label }}
            </NuxtLink>
          </template>
          <span v-else :class="item.active ? 'breadcrumb-active' : 'breadcrumb-link'">
            <NuxtLink v-if="!item.active" :to="item.path" class="breadcrumb-link">{{ item.label }}</NuxtLink>
            <span v-else>{{ item.label }}</span>
          </span>
        </a-breadcrumb-item>
      </a-breadcrumb>
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

const antdItems = computed(() => {
  const list = [{ label: "Trang chủ", path: "/", icon: true, active: false }];
  const fullPath = route.path;
  if (!fullPath || fullPath === "/") return [];

  const segments = fullPath.replace(/\/$/, "").split("/").filter(Boolean);
  let currentPath = "";

  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const translatedName = labelMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);
    list.push({
      label: translatedName,
      path: currentPath,
      icon: false,
      active: index === segments.length - 1
    });
  });

  return list;
});
</script>

<style scoped>
/* Override AntD breadcrumb styles */
:deep(.ant-breadcrumb) {
  @apply text-xs font-bold text-slate-500 dark:text-slate-400;
}

:deep(.ant-breadcrumb-separator) {
  @apply text-slate-300 dark:text-slate-600 font-normal;
}

.breadcrumb-link {
  @apply text-slate-500 dark:text-slate-400 no-underline font-bold text-xs transition-colors duration-200 inline-flex items-center gap-1.5;
}

.breadcrumb-link:hover {
  @apply text-shopee-orange dark:text-shopee-orange-hover;
}

.breadcrumb-active {
  @apply text-shopee-orange dark:text-shopee-orange-hover font-extrabold text-xs;
}

.breadcrumb-home {
  @apply inline-flex items-center gap-1.5;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
