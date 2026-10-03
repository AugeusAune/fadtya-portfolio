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
        lang: 'en',
        class: 'dark'
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
      ],
      script: [
        {
          innerHTML: `(function(){try{var t=localStorage.getItem('vscode-theme-preference');var th={"dark-plus":{"--vscode-bg":"#1e1e1e","--vscode-sidebar-bg":"#252526","--vscode-activity-bg":"#333333","--vscode-titlebar-bg":"#3c3c3c","--vscode-statusbar-bg":"#007acc","--vscode-accent":"#007acc","--vscode-text":"#cccccc","--vscode-text-muted":"#858585","--vscode-border":"#3c3c3c","--vscode-tab-active-bg":"#1e1e1e","--vscode-tab-inactive-bg":"#2d2d2d","--vscode-terminal-bg":"#181818"},"one-dark-pro":{"--vscode-bg":"#282c34","--vscode-sidebar-bg":"#21252b","--vscode-activity-bg":"#1e1e24","--vscode-titlebar-bg":"#21252b","--vscode-statusbar-bg":"#21252b","--vscode-accent":"#61afef","--vscode-text":"#abb2bf","--vscode-text-muted":"#5c6370","--vscode-border":"#181a1f","--vscode-tab-active-bg":"#282c34","--vscode-tab-inactive-bg":"#21252b","--vscode-terminal-bg":"#21252b"},"tokyo-night":{"--vscode-bg":"#1a1b26","--vscode-sidebar-bg":"#16161e","--vscode-activity-bg":"#13141c","--vscode-titlebar-bg":"#16161e","--vscode-statusbar-bg":"#1f2335","--vscode-accent":"#7aa2f7","--vscode-text":"#a9b1d6","--vscode-text-muted":"#565f89","--vscode-border":"#24283b","--vscode-tab-active-bg":"#1a1b26","--vscode-tab-inactive-bg":"#16161e","--vscode-terminal-bg":"#16161e"},"dracula":{"--vscode-bg":"#282a36","--vscode-sidebar-bg":"#21222c","--vscode-activity-bg":"#191a21","--vscode-titlebar-bg":"#1e1f29","--vscode-statusbar-bg":"#6272a4","--vscode-accent":"#bd93f9","--vscode-text":"#f8f8f2","--vscode-text-muted":"#6272a4","--vscode-border":"#44475a","--vscode-tab-active-bg":"#282a36","--vscode-tab-inactive-bg":"#1e1f29","--vscode-terminal-bg":"#1e1f29"},"light-plus":{"--vscode-bg":"#ffffff","--vscode-sidebar-bg":"#f3f3f3","--vscode-activity-bg":"#2c2c2c","--vscode-titlebar-bg":"#dddddd","--vscode-statusbar-bg":"#007acc","--vscode-accent":"#007acc","--vscode-text":"#333333","--vscode-text-muted":"#717171","--vscode-border":"#e7e7e7","--vscode-tab-active-bg":"#ffffff","--vscode-tab-inactive-bg":"#ececec","--vscode-terminal-bg":"#f8f8f8"}};var c=th[t]||th["dark-plus"];var r=document.documentElement;for(var k in c){r.style.setProperty(k,c[k])};if(t==='light-plus'){r.classList.remove('dark')}else{r.classList.add('dark')}}catch(e){}})()`,
          type: 'text/javascript'
        }
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
