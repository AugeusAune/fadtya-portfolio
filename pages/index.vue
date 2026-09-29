<template>
  <div>
    <div id="home">
      <HeroSection />
    </div>
    <div id="skills">
      <SkilsSection />
    </div>
    <div id="about">
      <Experience />
    </div>
    <div id="education">
      <Education />
    </div>
    <div id="projects">
      <Project />
    </div>
    <div id="contact">
      <Contact />
    </div>
    <div class="mt-5">
      <Footer />
    </div>
  </div>
</template>

<script setup>
  import { getSiteMetadata, generatePersonSchema, generateWebSiteSchema } from '~/utils/seo';

  definePageMeta({
    layout: 'layout',
  });

  useScrollReveal();

  const meta = getSiteMetadata();

  useHead({
    title: meta.title,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords.join(', ') },
      { name: 'author', content: meta.author },
      { property: 'og:title', content: meta.title },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: `${meta.url}${meta.image}` },
      { property: 'og:url', content: meta.url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: meta.title },
      { name: 'twitter:description', content: meta.description },
      { name: 'twitter:image', content: `${meta.url}${meta.image}` },
    ],
    link: [
      { rel: 'canonical', href: meta.url }
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(generatePersonSchema())
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify(generateWebSiteSchema())
      }
    ]
  });
</script>

<style scoped>
  body {
    overflow-x: hidden;
  }

  #home {
    background-image:
      radial-gradient(
        circle at 20% 30%,
        rgba(22, 163, 74, 0.05) 0%,
        transparent 50%
      ),
      radial-gradient(
        circle at 80% 70%,
        rgba(22, 163, 74, 0.05) 0%,
        transparent 50%
      );
  }
</style>
