<template>
  <div class="p-6 md:p-10 max-w-5xl mx-auto space-y-8 animate-fade-in">
    <!-- Hero Banner Card -->
    <div class="relative overflow-hidden rounded-2xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/60 backdrop-blur-md p-6 md:p-8 shadow-xl">
      <div class="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[var(--vscode-accent)]/10 blur-3xl pointer-events-none" />
      <div class="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
        <div class="relative group">
          <div class="w-28 h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden border-2 border-[var(--vscode-accent)]/60 shadow-lg p-1 bg-[var(--vscode-bg)]">
            <img
              src="/image/hire.png"
              alt="Farhan Aditya"
              class="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
              loading="eager"
            />
          </div>
          <span class="absolute bottom-1 right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[var(--vscode-bg)]"></span>
          </span>
        </div>

        <div class="flex-1 text-center md:text-left space-y-3">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Available for Engineering Roles & Contracts
          </div>

          <h1 class="text-3xl md:text-4xl font-extrabold text-[var(--vscode-text)] tracking-tight">
            Farhan Aditya
          </h1>

          <p class="text-base md:text-lg text-[var(--vscode-text-muted)] font-medium max-w-2xl leading-relaxed">
            Full Stack Developer & Software Engineer specializing in scalable enterprise web applications,
            modern Vue/Nuxt architectures, robust Laravel services, and high-performance databases.
          </p>

          <!-- Quick Navigation Actions -->
          <div class="pt-2 flex flex-wrap justify-center md:justify-start gap-3">
            <button
              @click="vscode.openFile('Projects.json')"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-[var(--vscode-accent)] text-white shadow-md hover:brightness-110 active:scale-95 transition-all"
            >
              <Icon name="mdi:briefcase-outline" class="text-base" />
              View Projects
            </button>

            <button
              @click="vscode.openFile('Skills.ts')"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--vscode-border)] bg-[var(--vscode-bg)] text-[var(--vscode-text)] hover:bg-[var(--vscode-accent)]/10 transition-all active:scale-95"
            >
              <Icon name="mdi:code-tags" class="text-base text-[var(--vscode-accent)]" />
              Explore Tech Stack
            </button>

            <button
              @click="vscode.toggleTerminal(true)"
              class="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-[var(--vscode-border)] bg-[var(--vscode-bg)] text-[var(--vscode-text)] hover:bg-[var(--vscode-accent)]/10 transition-all active:scale-95"
            >
              <Icon name="mdi:terminal" class="text-base text-amber-400" />
              Open Terminal
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Metrics Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-4 rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 text-center space-y-1"
      >
        <div class="text-2xl md:text-3xl font-extrabold text-[var(--vscode-accent)]">
          {{ stat.value }}
        </div>
        <div class="text-xs text-[var(--vscode-text-muted)] font-medium">
          {{ stat.label }}
        </div>
      </div>
    </div>

    <!-- IDE Quick Tips & Shortcuts -->
    <div class="rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 p-6 space-y-4">
      <div class="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
        <Icon name="mdi:keyboard-outline" class="text-lg" />
        Interactive IDE Shortcuts & Capabilities
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div class="p-3 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-1">
          <div class="font-semibold text-[var(--vscode-text)] flex items-center justify-between">
            <span>Command Palette</span>
            <kbd class="px-2 py-0.5 rounded bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] text-[10px]">Ctrl+P / Cmd+K</kbd>
          </div>
          <p class="text-[var(--vscode-text-muted)]">Instantly jump to any file or trigger IDE commands.</p>
        </div>

        <div class="p-3 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-1">
          <div class="font-semibold text-[var(--vscode-text)] flex items-center justify-between">
            <span>Integrated Terminal</span>
            <kbd class="px-2 py-0.5 rounded bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] text-[10px]">Ctrl+`</kbd>
          </div>
          <p class="text-[var(--vscode-text-muted)]">Execute interactive bash commands like <code>skills</code>, <code>projects</code>, <code>theme</code>.</p>
        </div>

        <div class="p-3 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-1">
          <div class="font-semibold text-[var(--vscode-text)] flex items-center justify-between">
            <span>Dual View Modes</span>
            <span class="text-[var(--vscode-accent)] font-mono">Code / Preview</span>
          </div>
          <p class="text-[var(--vscode-text-muted)]">Toggle between syntax-highlighted source and interactive rendered preview.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVSCode } from '../../../composables/useVSCode';

const vscode = useVSCode();

const stats = [
  { value: '4+ Years', label: 'Software Engineering Experience' },
  { value: '10+', label: 'Enterprise Systems Delivered' },
  { value: '100%', label: 'Commitment to High Code Quality' },
  { value: '24/7', label: 'Eager to Build & Learn' },
];
</script>
