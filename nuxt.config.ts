// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-01-01",
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/saficon.png" },
        { rel: "apple-touch-icon", href: "/saficon.png" },
        { rel: "manifest", href: "/manifest.json" }
      ],
      meta: [
        { property: "og:image", content: "/saffi_logo.png" },
        { name: "color-scheme", content: "light" },
        { name: "apple-mobile-web-app-title", content: "Saffi" },
        { name: "application-name", content: "Saffi" }
      ]
    },
    pageTransition: { name: "page", mode: "out-in" },
    layoutTransition: { name: "layout", mode: "out-in" }
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxtjs/tailwindcss", "@ant-design-vue/nuxt", "nuxt-vue3-google-signin", "@nuxt/image", "@nuxtjs/google-fonts"],

  antd: {
    // Auto-import all components, icons, message/notification methods
  },

  vite: {
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'dayjs',
        'dayjs/plugin/advancedFormat',
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/localeData',
        'dayjs/plugin/quarterOfYear',
        'dayjs/plugin/weekOfYear',
        'dayjs/plugin/weekYear',
        'dayjs/plugin/weekday',
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            "antd-vendor": ["ant-design-vue"],
            "antd-icons": ["@ant-design/icons-vue"],
          }
        }
      }
    }
  },

  // Server-side route rules (Proxying /api calls to backend to completely bypass browser CORS)
  routeRules: {
    "/api/**": {
      proxy: `${process.env.NUXT_PUBLIC_API_BASE}/**`,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
      appURL: process.env.NUXT_PUBLIC_APP_URL,
      vietQRApi: process.env.NUXT_PUBLIC_VIETQR_API,
      mainSiteURL: process.env.NUXT_PUBLIC_MAIN_SITE_URL,
      zaloGroup: process.env.NUXT_PUBLIC_ZALO_GROUP,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
  },
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
  },

  googleFonts: {
    families: {
      Inter: [300, 400, 500, 600, 700],
      'Plus Jakarta Sans': [300, 400, 500, 600, 700, 800],
    },
    download: true,
    display: 'swap',
    subsets: ['latin', 'latin-ext', 'vietnamese'],
  },

  // for cloudflare pages
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
});