export default defineNuxtConfig({
  devtools: { enabled: true },
  telemetry: false,

  css: [
    '~/assets/css/main.css',
    '~/assets/css/custom.css',
  ],

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'Farhan Aditya | Full Stack Developer & Software Engineer',
      meta: [
        { name: 'description', content: 'Farhan Aditya is a passionate Full Stack Developer specializing in high-performance web applications, Vue/Nuxt, Laravel, and scalable modern architectures.' },
        { name: 'author', content: 'Farhan Aditya' },
        { property: 'og:title', content: 'Farhan Aditya | Full Stack Developer & Software Engineer' },
        { property: 'og:description', content: 'Farhan Aditya is a passionate Full Stack Developer specializing in high-performance web applications, Vue/Nuxt, Laravel, and scalable modern architectures.' },
        { property: 'og:image', content: 'https://fadtya-portfolio.vercel.app/image/hire.png' },
        { property: 'og:url', content: 'https://fadtya-portfolio.vercel.app' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Farhan Aditya | Full Stack Developer & Software Engineer' },
        { name: 'twitter:description', content: 'Farhan Aditya is a passionate Full Stack Developer specializing in high-performance web applications, Vue/Nuxt, Laravel, and scalable modern architectures.' },
        { name: 'twitter:image', content: 'https://fadtya-portfolio.vercel.app/image/hire.png' }
      ],
      link: [
        { rel: 'canonical', href: 'https://fadtya-portfolio.vercel.app/' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'preconnect', href: 'https://images.unsplash.com' }
      ]
    }
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    ['@nuxtjs/google-fonts', {
      families: {
        'Heebo': true,
      },
      display: 'swap',
      download: true,
      inject: true
    }],
  ],

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [
        '/',
        '/README.md',
        '/AboutMe.vue',
        '/Skills.ts',
        '/Projects.json',
        '/Experience.md',
        '/Education.json',
        '/Contact.env'
      ]
    }
  },

  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark'
  }


})
