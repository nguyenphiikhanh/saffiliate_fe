<template>
  <transition name="fade">
    <nav v-if="shouldShow" aria-label="Breadcrumb" class="breadcrumb-nav animate-fade-in">
      <a-breadcrumb :items="antdItems" class="breadcrumb-inner">
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
.breadcrumb-nav {
  width: 100%;
  margin-bottom: 1rem;
  user-select: none;
}

.breadcrumb-inner {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(226, 232, 240, 0.5);
  padding: 0.625rem 1rem;
  border-radius: 1rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.03);
}

/* Override AntD breadcrumb styles */
:deep(.ant-breadcrumb) {
  font-size: 12px;
  font-weight: 700;
  color: #64748B;
}

:deep(.ant-breadcrumb-separator) {
  color: #CBD5E1;
  font-weight: 400;
}

.breadcrumb-link {
  color: #64748B;
  text-decoration: none;
  font-weight: 700;
  font-size: 12px;
  transition: color 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.breadcrumb-link:hover {
  color: #EE4D2D;
}

.breadcrumb-active {
  color: #EE4D2D;
  font-weight: 800;
  font-size: 12px;
}

.breadcrumb-home {
  display: inline-flex;
  align-items: center;
  gap: 4px;
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
