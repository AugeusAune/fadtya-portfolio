<template>
  <footer class="h-6 w-full bg-[var(--vscode-statusbar-bg)] text-white text-[11px] flex items-center justify-between px-2 select-none shrink-0 z-30 font-medium">
    <!-- Left: Git & Diagnostics -->
    <div class="flex items-center gap-3">
      <!-- Git Branch -->
      <button
        @click="vscode.setActivity('git')"
        class="flex items-center gap-1.5 px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
        title="Current Git Branch"
      >
        <Icon name="mdi:source-branch" class="text-sm" />
        <span class="font-semibold">feature/vscode-style-portfolio</span>
      </button>

      <!-- Sync Status -->
      <span class="hidden sm:flex items-center gap-1 hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer" title="Git Synchronized">
        <Icon name="mdi:sync" class="text-xs" />
        <span>0↓ 0↑</span>
      </span>

      <!-- Problems & Warnings -->
      <button
        @click="vscode.toggleTerminal(true)"
        class="flex items-center gap-2 px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
        title="No Errors, No Warnings"
      >
        <span class="flex items-center gap-1">
          <Icon name="mdi:close-circle-outline" class="text-xs" />
          <span>0</span>
        </span>
        <span class="flex items-center gap-1">
          <Icon name="mdi:alert-outline" class="text-xs" />
          <span>0</span>
        </span>
      </button>
    </div>

    <!-- Right: File Details & Theme -->
    <div class="flex items-center gap-3">
      <span class="hidden md:inline hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
        Ln 1, Col 1
      </span>
      <span class="hidden md:inline hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
        Spaces: 2
      </span>
      <span class="hidden sm:inline hover:bg-white/20 px-1 py-0.5 rounded cursor-pointer">
        UTF-8
      </span>

      <!-- Language Mode -->
      <span class="hover:bg-white/20 px-1.5 py-0.5 rounded uppercase font-bold text-[10px] cursor-pointer">
        {{ currentLanguage }}
      </span>

      <!-- Theme Switcher -->
      <button
        @click="vscode.setActivity('settings')"
        class="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
        title="Switch Theme"
      >
        <Icon name="mdi:palette-outline" class="text-sm" />
        <span class="hidden sm:inline capitalize">{{ vscode.activeTheme.value }}</span>
      </button>

      <!-- Terminal toggle -->
      <button
        @click="vscode.toggleTerminal()"
        class="flex items-center gap-1 px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
        title="Toggle Integrated Terminal"
      >
        <Icon name="mdi:terminal" class="text-xs" />
      </button>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useVSCode } from '../../composables/useVSCode';

const vscode = useVSCode();

const currentLanguage = computed((): string => {
  return vscode.activeFile.value?.language || 'Text';
});
</script>
