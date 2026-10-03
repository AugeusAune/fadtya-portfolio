<template>
  <div class="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Engineering Profile
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        About Me & Technical Philosophy
      </h2>
    </div>

    <!-- Biography Story -->
    <div class="p-6 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 space-y-4 text-sm md:text-base leading-relaxed text-[var(--vscode-text)]">
      <p>
        I am a dedicated <strong>Full Stack Developer</strong> based in Jakarta, Indonesia, with extensive experience architecting and maintaining production web applications across procurement, finance, taxation, compliance, and energy industries.
      </p>
      <p class="text-[var(--vscode-text-muted)]">
        My daily work bridges technical design, clean implementation, performance optimization, and reliable deployment. Whether optimizing complex database queries with PostgreSQL and Redis, designing intuitive Vue/Nuxt frontends, or structuring clean domain logic in Laravel or Elysia.js, I emphasize simplicity, maintainability, and end-user performance.
      </p>
    </div>

    <!-- Engineering Principles Cards -->
    <div class="space-y-4">
      <h3 class="text-lg font-bold text-[var(--vscode-text)]">
        Core Engineering Pillars
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div
          v-for="pillar in pillars"
          :key="pillar.title"
          class="p-5 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/30 hover:border-[var(--vscode-accent)]/50 transition-colors space-y-2"
        >
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-[var(--vscode-accent)]/10 text-[var(--vscode-accent)] flex items-center justify-center">
              <Icon :name="pillar.icon" class="text-xl" />
            </div>
            <h4 class="font-bold text-[var(--vscode-text)] text-sm">
              {{ pillar.title }}
            </h4>
          </div>
          <p class="text-xs text-[var(--vscode-text-muted)] leading-relaxed">
            {{ pillar.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const pillars = [
  {
    icon: 'mdi:layers-triple-outline',
    title: 'Clean Architecture & SOLID',
    description: 'Writing decoupled, modular components and services that are easy to test, maintain, and extend without breaking existing functionality.'
  },
  {
    icon: 'mdi:lightning-bolt-outline',
    title: 'High Performance & Caching',
    description: 'Leveraging distributed Redis caching, SSR/SSG pre-rendering, and query optimization to deliver sub-second response times.'
  },
  {
    icon: 'mdi:docker',
    title: 'Containerization & DevOps',
    description: 'Ensuring seamless environments between development and production through Docker, CI/CD pipelines, and infrastructure as code.'
  },
  {
    icon: 'mdi:shield-check-outline',
    title: 'Defensive Programming & TDD',
    description: 'Validating inputs at early boundaries, handling failure states gracefully, and writing test suites to prevent regressions.'
  }
];
</script>
