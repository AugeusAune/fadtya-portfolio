<template>
  <div class="h-9 w-full bg-[var(--vscode-sidebar-bg)] border-b border-[var(--vscode-border)] flex items-center justify-between select-none overflow-x-auto overflow-y-hidden text-xs shrink-0 z-10 scrollbar-none">
    <!-- Tab List -->
    <div class="flex items-center h-full overflow-x-auto scrollbar-none">
      <div
        v-for="file in vscode.openFiles.value"
        :key="file.id"
        @click="vscode.openFile(file.id)"
        :class="[
          'group relative h-full flex items-center gap-2 px-3 border-r border-[var(--vscode-border)] cursor-pointer text-xs transition-colors shrink-0',
          vscode.activeFileId.value === file.id
            ? 'bg-[var(--vscode-bg)] text-[var(--vscode-text)] font-semibold border-t-2 border-t-[var(--vscode-accent)]'
            : 'bg-[var(--vscode-tab-inactive-bg)] text-[var(--vscode-text-muted)] hover:bg-[var(--vscode-bg)]/60'
        ]"
      >
        <Icon :name="file.icon" class="text-sm shrink-0" />
        <span class="truncate max-w-[120px]">{{ file.name }}</span>
        
        <button
          @click.stop="vscode.closeTab(file.id)"
          class="p-0.5 rounded opacity-60 hover:opacity-100 hover:bg-[var(--vscode-border)] hover:text-white transition-opacity ml-1"
          title="Close tab"
        >
          <Icon name="mdi:close" class="text-xs" />
        </button>
      </div>
    </div>

    <!-- Right Controls: View Switcher -->
    <div class="flex items-center gap-1 px-2 shrink-0 bg-[var(--vscode-sidebar-bg)] text-[var(--vscode-text-muted)] border-l border-[var(--vscode-border)]">
      <button
        @click="vscode.setViewMode('code')"
        :class="{ 'text-[var(--vscode-accent)]': vscode.editorViewMode.value === 'code' }"
        class="p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-[var(--vscode-text)] transition-colors"
        title="Show Code (Source View)"
      >
        <Icon name="mdi:code-tags" class="text-sm" />
      </button>

      <button
        @click="vscode.setViewMode('preview')"
        :class="{ 'text-[var(--vscode-accent)]': vscode.editorViewMode.value === 'preview' }"
        class="p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-[var(--vscode-text)] transition-colors"
        title="Open Visual Preview"
      >
        <Icon name="mdi:eye-outline" class="text-sm" />
      </button>

      <button
        @click="vscode.setViewMode('split')"
        :class="{ 'text-[var(--vscode-accent)]': vscode.editorViewMode.value === 'split' }"
        class="hidden lg:inline-flex p-1 rounded hover:bg-[var(--vscode-bg)] hover:text-[var(--vscode-text)] transition-colors"
        title="Split View (Code + Preview)"
      >
        <Icon name="mdi:view-split-vertical" class="text-sm" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVSCode } from '../../composables/useVSCode';

const vscode = useVSCode();
</script>
