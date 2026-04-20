export default defineNuxtConfig({
  devtools: { enabled: true },

  css: [
    '~/assets/css/main.css',
    '~/assets/css/custom.css',
  ],

  modules: [
    '@element-plus/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    ['@nuxtjs/google-fonts', {
      families: {
        'Heebo': true,
        download: true,
        inject: true
      }
    }],
  ],

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  }


})
