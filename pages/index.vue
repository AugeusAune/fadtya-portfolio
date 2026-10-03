<template>
  <div>
    <VSCodeLayout />
  </div>
</template>

<script setup>
  import { getSiteMetadata, generatePersonSchema, generateWebSiteSchema } from '~/utils/seo';
  import VSCodeLayout from '~/components/vscode/VSCodeLayout.vue';

  definePageMeta({
    layout: false,
  });

  const meta = getSiteMetadata();

  useHead({
    title: `${meta.title} — Visual Studio Code Portfolio`,
    meta: [
      { name: 'description', content: meta.description },
      { name: 'keywords', content: meta.keywords.join(', ') },
      { name: 'author', content: meta.author },
      { property: 'og:title', content: `${meta.title} — Visual Studio Code Portfolio` },
      { property: 'og:description', content: meta.description },
      { property: 'og:image', content: `${meta.url}${meta.image}` },
      { property: 'og:url', content: meta.url },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: `${meta.title} — Visual Studio Code Portfolio` },
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

<style>
  html, body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
</style>
