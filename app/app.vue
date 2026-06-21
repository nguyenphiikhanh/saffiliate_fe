<template>
  <a-config-provider :theme="antdTheme">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </a-config-provider>
</template>

<script setup>
import { theme } from 'ant-design-vue';

// AntD theme with Shopee Orange as primary + Plus Jakarta Sans font
const antdTheme = {
  algorithm: theme.defaultAlgorithm,
  token: {
    colorPrimary: '#EE4D2D',
    colorPrimaryHover: '#F05D40',
    colorPrimaryActive: '#D94429',
    fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, -apple-system, sans-serif",
    borderRadius: 8,
    borderRadiusLG: 12,
    borderRadiusSM: 6,
    colorBgBase: '#FFFFFF',
    colorTextBase: '#0F172A',
    colorBorder: '#E2E8F0',
    colorBorderSecondary: '#F1F5F9',
    boxShadow: '0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px -1px rgba(0,0,0,0.1)',
    boxShadowSecondary: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)',
  },
  components: {
    Button: {
      primaryShadow: '0 4px 20px rgba(238, 77, 45, 0.25)',
    },
    Input: {
      activeBorderColor: '#EE4D2D',
      hoverBorderColor: '#F05D40',
    },
    Table: {
      headerBg: '#F8FAFC',
    },
  },
};
</script>
