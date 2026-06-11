import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  app: {
    head: {
      link: [
        { rel: "icon", type: "image/png", href: "/saficon.png" }
      ],
      meta: [
        { property: "og:image", content: "/saffi_logo.png" },
        { name: "color-scheme", content: "light" }
      ]
    }
  },

  css: ["~/assets/css/main.css"],

  modules: ["@nuxt/icon", "nuxt-vue3-google-signin"],

  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit'
      ]
    }
  },

  build: {
    transpile: ['@vue/devtools-core', '@vue/devtools-kit']
  },

  // Server-side route rules (Proxying /api calls to backend to completely bypass browser CORS)
  routeRules: {
    "/api/**": {
      proxy: `${process.env.NUXT_PUBLIC_API_BASE}/**`,
    },
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE, // fallback value, NUXT_PUBLIC_API_BASE in .env takes precedence
      appURL: process.env.NUXT_PUBLIC_APP_URL,
      vietQRApi: process.env.NUXT_PUBLIC_VIETQR_API,
      mainSiteURL: process.env.NUXT_PUBLIC_MAIN_SITE_URL,
      googleClientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID,
    },
  },
  googleSignIn: {
    clientId: process.env.NUXT_PUBLIC_GOOGLE_CLIENT_ID
  },

  // for cloudflare pages
  nitro: {
    prerender: {
      autoSubfolderIndex: false
    }
  }
});