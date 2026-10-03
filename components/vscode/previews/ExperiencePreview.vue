<template>
  <div class="p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Career Progression
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        Professional Experience & Roles
      </h2>
      <p class="text-xs md:text-sm text-[var(--vscode-text-muted)]">
        Chronological journey across engineering roles and enterprise contracts.
      </p>
    </div>

    <!-- Timeline -->
    <div class="relative border-l-2 border-[var(--vscode-border)] ml-3 md:ml-4 space-y-8 pl-6 md:pl-8">
      <div
        v-for="exp in experienceList"
        :key="exp.title + exp.time"
        class="relative group"
      >
        <!-- Marker dot -->
        <div class="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[var(--vscode-bg)] border-2 border-[var(--vscode-accent)] group-hover:scale-125 transition-transform" />

        <div class="p-6 rounded-2xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 hover:border-[var(--vscode-accent)]/50 transition-all space-y-3">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 class="text-lg font-bold text-[var(--vscode-text)]">
                {{ exp.title }}
              </h3>
              <div class="text-xs font-semibold text-[var(--vscode-accent)]">
                {{ exp.status }}
              </div>
            </div>

            <span class="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)] border border-[var(--vscode-border)]">
              {{ exp.time }}
            </span>
          </div>

          <p class="text-xs md:text-sm text-[var(--vscode-text-muted)] leading-relaxed">
            {{ exp.description }}
          </p>

          <!-- Client Projects Sublist -->
          <div v-if="exp.projects" class="pt-3 border-t border-[var(--vscode-border)] space-y-2">
            <div class="text-xs font-bold text-[var(--vscode-text)] flex items-center gap-1.5">
              <Icon name="mdi:domain" class="text-sm text-[var(--vscode-accent)]" />
              Enterprise Client Deployments
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div
                v-for="proj in exp.projects"
                :key="proj.name"
                class="p-2.5 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-0.5"
              >
                <div class="font-bold text-[var(--vscode-text)] truncate">{{ proj.name }}</div>
                <div class="text-[11px] text-[var(--vscode-accent)]">{{ proj.client }}</div>
                <div class="text-[10px] text-[var(--vscode-text-muted)]">{{ proj.time }} • {{ proj.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import experienceList from '../../../list/experience.js';
</script>
