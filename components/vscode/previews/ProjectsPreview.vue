<template>
  <div class="p-4 sm:p-6 md:p-10 max-w-6xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Portfolio Catalog
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        Featured Projects & Enterprise Systems
      </h2>
      <p class="text-xs md:text-sm text-[var(--vscode-text-muted)]">
        Real-world solutions built for enterprise clients across mining, energy, and taxation.
      </p>
    </div>

    <!-- Project Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      <div
        v-for="project in projects"
        :key="project.title"
        class="group rounded-2xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 overflow-hidden flex flex-col hover:border-[var(--vscode-accent)]/50 transition-all duration-300 shadow-md hover:shadow-xl"
      >
        <!-- Thumbnail -->
        <div class="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-900">
          <img
            :src="project.imageSrc"
            :alt="project.title"
            loading="lazy"
            decoding="async"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[var(--vscode-bg)] via-transparent to-transparent opacity-90" />
          
          <span
            v-if="project.isPrivat"
            class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 backdrop-blur-md"
          >
            Internal Enterprise
          </span>
          <span
            v-else
            class="absolute top-3 right-3 px-2.5 py-1 rounded-md text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md"
          >
            Production Live
          </span>
        </div>

        <!-- Body -->
        <div class="p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
          <div class="space-y-2">
            <h3 class="text-lg font-bold text-[var(--vscode-text)] group-hover:text-[var(--vscode-accent)] transition-colors">
              {{ project.title }}
            </h3>
            <p class="text-xs text-[var(--vscode-text-muted)] leading-relaxed">
              {{ project.description }}
            </p>
          </div>

          <!-- Footer: Tech & Link -->
          <div class="pt-4 border-t border-[var(--vscode-border)]/60 flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span
                v-for="icon in project.tech"
                :key="icon"
                class="w-6 h-6 flex items-center justify-center p-1 rounded bg-[var(--vscode-bg)] border border-[var(--vscode-border)]"
              >
                <Icon :name="icon" class="text-xs" />
              </span>
            </div>

            <a
              v-if="project.linkProject"
              :href="project.linkProject"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-[var(--vscode-accent)] text-white hover:brightness-110 transition-all"
            >
              <span>Visit</span>
              <Icon name="mdi:arrow-top-right" class="text-sm" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import projects from '../../../list/project.js';
</script>
