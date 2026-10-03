<template>
  <div class="p-4 sm:p-6 md:p-10 max-w-5xl mx-auto space-y-6 sm:space-y-8 animate-fade-in">
    <!-- Hero Banner Card (Flat VS Code Style) -->
    <div class="rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 p-5 sm:p-6 md:p-8">
      <div class="flex flex-col md:flex-row items-center gap-5 sm:gap-6 md:gap-8">
        <div class="relative group shrink-0">
          <div class="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-xl overflow-hidden border border-[var(--vscode-border)] p-1 bg-[var(--vscode-bg)]">
            <img
              src="/image/profile.jpg"
              alt="Farhan Aditya"
              class="w-full h-full object-cover rounded-lg"
              loading="eager"
            />
          </div>
          <span class="absolute bottom-1 right-1 flex h-3.5 w-3.5">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border border-[var(--vscode-bg)]"></span>
          </span>
        </div>

        <div class="flex-1 text-center md:text-left space-y-3">
          <button
            @click="vscode.openFile('Contact.env')"
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors cursor-pointer text-left"
            title="Open Contact Channels"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>
            <span>Available for Engineering Roles & Contracts — Get in Touch</span>
            <Icon name="mdi:arrow-right" class="text-xs shrink-0" />
          </button>

          <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[var(--vscode-text)] tracking-tight">
            Farhan Aditya
          </h1>

          <p class="text-sm sm:text-base md:text-lg text-[var(--vscode-text-muted)] font-medium max-w-2xl leading-relaxed">
            Full Stack Developer & Software Engineer specializing in scalable enterprise web applications,
            modern Vue/Nuxt architectures, robust Laravel services, and high-performance databases.
          </p>

          <!-- Primary Direct CTAs to Contact (Flat) -->
          <div class="pt-2 flex flex-col sm:flex-row flex-wrap justify-center md:justify-start gap-2.5 sm:gap-3">
            <button
              @click="vscode.openFile('Contact.env')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--vscode-accent)] text-white hover:brightness-110 active:opacity-90 transition-colors"
            >
              <Icon name="mdi:email-fast-outline" class="text-base" />
              <span>Get in Touch / Hire Me</span>
            </button>

            <button
              @click="vscode.openFile('Contact.env')"
              class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold border border-[var(--vscode-border)] bg-[var(--vscode-bg)] text-[var(--vscode-text)] hover:bg-[var(--vscode-sidebar-bg)] hover:border-[var(--vscode-accent)]/50 transition-colors active:opacity-90"
            >
              <Icon name="mdi:card-account-mail-outline" class="text-base text-[var(--vscode-accent)]" />
              <span>Contact Channels & Form</span>
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

    <!-- Dedicated Bottom Contact CTA Banner (Flat VS Code Style) -->
    <div class="rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)]/40 p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5">
      <div class="space-y-2 text-center md:text-left">
        <div class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[var(--vscode-accent)]">
          <Icon name="mdi:send-check-outline" class="text-base" />
          Ready to Collaborate?
        </div>
        <h3 class="text-lg sm:text-xl font-bold text-[var(--vscode-text)]">
          Let's Build Something Exceptional Together
        </h3>
        <p class="text-xs sm:text-sm text-[var(--vscode-text-muted)] max-w-xl leading-relaxed">
          Open for engineering roles, technical contracts, or architectural consulting. Let's discuss your project goals directly.
        </p>
      </div>

      <button
        @click="vscode.openFile('Contact.env')"
        class="w-full md:w-auto shrink-0 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold bg-[var(--vscode-accent)] text-white hover:brightness-110 active:opacity-90 transition-colors"
      >
        <Icon name="mdi:email-outline" class="text-base" />
        <span>Contact Me Directly</span>
        <Icon name="mdi:arrow-right" class="text-sm" />
      </button>
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
