<template>
  <div class="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Header -->
    <div class="border-b border-[var(--vscode-border)] pb-4 space-y-1">
      <div class="text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        Academic Foundation
      </div>
      <h2 class="text-2xl md:text-3xl font-bold text-[var(--vscode-text)]">
        Education & Mentorship
      </h2>
      <p class="text-xs md:text-sm text-[var(--vscode-text-muted)]">
        Formal academic study and knowledge sharing initiatives.
      </p>
    </div>

    <!-- Cards Grid -->
    <div class="grid grid-cols-1 gap-4 sm:gap-6">
      <div
        v-for="edu in educationList"
        :key="edu.title + edu.time"
        class="p-4 sm:p-6 rounded-2xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 hover:border-[var(--vscode-accent)]/50 transition-all space-y-3"
      >
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 class="text-lg font-bold text-[var(--vscode-text)]">
              {{ edu.title }}
            </h3>
            <div class="text-xs font-semibold text-[var(--vscode-accent)]">
              {{ edu.status }}
            </div>
          </div>

          <span class="inline-block px-3 py-1 rounded-full text-[11px] font-medium bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)] border border-[var(--vscode-border)]">
            {{ edu.time }}
          </span>
        </div>

        <p class="text-xs md:text-sm text-[var(--vscode-text-muted)] leading-relaxed">
          {{ edu.description }}
        </p>

        <div v-if="edu.icon_skil" class="pt-2 flex items-center gap-2">
          <span
            v-for="icon in edu.icon_skil"
            :key="icon"
            class="w-6 h-6 flex items-center justify-center p-1 rounded bg-[var(--vscode-bg)] border border-[var(--vscode-border)]"
          >
            <Icon :name="icon" class="text-xs" />
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import educationList from '../../../list/education.js';
</script>
