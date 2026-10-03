<template>
  <header class="h-9 w-full bg-[var(--vscode-titlebar-bg)] border-b border-[var(--vscode-border)] flex items-center justify-between px-3 select-none text-[var(--vscode-text-muted)] text-xs z-30">
    <!-- Left: Window Dots & Menus -->
    <div class="flex items-center gap-3">
      <!-- Traffic Light Dots -->
      <div class="flex items-center gap-1.5 mr-1">
        <span class="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm"></span>
        <span class="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm"></span>
        <span class="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm"></span>
      </div>

      <!-- App Menu Bar (Desktop) -->
      <div class="hidden lg:flex items-center gap-1 text-[11px] text-[var(--vscode-text)]">
        <button
          v-for="item in menuItems"
          :key="item"
          @click="handleMenuClick(item)"
          class="px-2 py-0.5 rounded hover:bg-[var(--vscode-bg)] transition-colors"
        >
          {{ item }}
        </button>
      </div>

      <!-- Mobile Hamburger / Sidebar toggle -->
      <button
        @click="vscode.toggleSidebar()"
        class="lg:hidden p-1 rounded hover:bg-[var(--vscode-bg)] text-[var(--vscode-text)]"
        aria-label="Toggle Sidebar"
      >
        <Icon name="mdi:menu" class="text-base" />
      </button>
    </div>

    <!-- Center: Search & Command Palette Bar -->
    <button
      @click="vscode.toggleCommandPalette(true)"
      class="flex items-center justify-center gap-2 max-w-sm w-full mx-2 px-3 py-1 rounded-md bg-[var(--vscode-bg)] border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)] transition-all text-[11px] shadow-inner"
    >
      <Icon name="mdi:magnify" class="text-xs text-[var(--vscode-accent)]" />
      <span class="truncate">farhan-portfolio — Visual Studio Code</span>
      <kbd class="hidden sm:inline-block ml-auto text-[9px] px-1.5 py-0.2 rounded bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)]">Ctrl+P</kbd>
    </button>

    <!-- Right Controls -->
    <div class="flex items-center gap-1 text-[var(--vscode-text)]">
      <!-- Mode toggles -->
      <button
        @click="vscode.setViewMode('code')"
        :class="{ 'text-[var(--vscode-accent)] bg-[var(--vscode-bg)]': vscode.editorViewMode.value === 'code' }"
        class="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--vscode-bg)] text-[11px] transition-colors"
        title="Source Code View"
      >
        <Icon name="mdi:code-tags" class="text-xs" />
        <span>Code</span>
      </button>

      <button
        @click="vscode.setViewMode('preview')"
        :class="{ 'text-[var(--vscode-accent)] bg-[var(--vscode-bg)]': vscode.editorViewMode.value === 'preview' }"
        class="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--vscode-bg)] text-[11px] transition-colors"
        title="Rendered Visual Preview"
      >
        <Icon name="mdi:eye-outline" class="text-xs" />
        <span>Preview</span>
      </button>

      <button
        @click="vscode.setViewMode('split')"
        :class="{ 'text-[var(--vscode-accent)] bg-[var(--vscode-bg)]': vscode.editorViewMode.value === 'split' }"
        class="hidden md:flex items-center gap-1 px-2 py-0.5 rounded hover:bg-[var(--vscode-bg)] text-[11px] transition-colors"
        title="Split View (Code + Preview)"
      >
        <Icon name="mdi:view-split-vertical" class="text-xs" />
        <span>Split</span>
      </button>

      <div class="w-[1px] h-4 bg-[var(--vscode-border)] mx-1"></div>

      <!-- Terminal toggle button -->
      <button
        @click="vscode.toggleTerminal()"
        :class="{ 'text-[var(--vscode-accent)] bg-[var(--vscode-bg)]': vscode.isTerminalOpen.value }"
        class="p-1 rounded hover:bg-[var(--vscode-bg)] transition-colors"
        title="Toggle Integrated Terminal (Ctrl+`)"
      >
        <Icon name="mdi:terminal" class="text-sm" />
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useVSCode } from '../../composables/useVSCode';

const vscode = useVSCode();
const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

const handleMenuClick = (item: string): void => {
  if (item === 'Terminal') {
    vscode.toggleTerminal();
    return;
  }
  if (item === 'View') {
    vscode.toggleSidebar();
    return;
  }
  vscode.toggleCommandPalette(true);
};
</script>
