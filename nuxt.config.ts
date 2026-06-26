// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-01-01",
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/saficon.webp" },
        { rel: "apple-touch-icon", href: "/saficon.webp" },
        { rel: "manifest", href: "/manifest.json" }
      ],
      meta: [
        { property: "og:image", content: "/saficon.webp" },
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

  // @nuxt/image: use IPX (built-in) for local images; serves WebP/AVIF on-the-fly.
  // For Cloudflare Pages, sharp is bundled automatically by @nuxt/image.
  image: {
    format: ["webp", "avif"],
    quality: 80,
    screens: {
      xs: 375,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
    },
  },

  vite: {
    optimizeDeps: {
      include: [
        '@ant-design/icons-vue',
        'dayjs',
        'dayjs/plugin/advancedFormat',
        'dayjs/plugin/customParseFormat',
        'dayjs/plugin/localeData',
        'dayjs/plugin/quarterOfYear',
        'dayjs/plugin/weekOfYear',
        'dayjs/plugin/weekYear',
        'dayjs/plugin/weekday',
        'papaparse',
      ]
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Ant Design split into two chunks: core + icons (icons are large)
            "vendor-antd": ["ant-design-vue"],
            "vendor-antd-icons": ["@ant-design/icons-vue"],
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
