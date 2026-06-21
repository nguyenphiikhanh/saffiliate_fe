import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  corePlugins: {
    preflight: false, // Tắt CSS reset mặc định để không xung đột với Ant Design
  },
  theme: {
    extend: {
      colors: {
        'shopee-orange': '#EE4D2D',
        'shopee-orange-hover': '#F05D40',
        'shopee-orange-light': '#FFEEEB',
        'shopee-dark': '#0F172A',
        'shopee-dark-card': '#1E293B',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
