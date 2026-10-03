<template>
  <aside class="w-12 h-full bg-[var(--vscode-activity-bg)] border-r border-[var(--vscode-border)] flex flex-col justify-between py-2 select-none z-20 shrink-0">
    <!-- Top Activities -->
    <div class="flex flex-col items-center gap-1">
      <button
        v-for="item in topActivities"
        :key="item.id"
        @click="vscode.setActivity(item.id)"
        :class="[
          'relative w-12 h-11 flex items-center justify-center transition-colors group',
          vscode.activeActivity.value === item.id && vscode.isSidebarOpen.value
            ? 'text-white border-l-2 border-[var(--vscode-accent)]'
            : 'text-[var(--vscode-text-muted)] hover:text-white border-l-2 border-transparent'
        ]"
        :title="item.label"
        :aria-label="item.label"
      >
        <Icon :name="item.icon" class="text-2xl transition-transform group-hover:scale-105" />
        
        <!-- Open files badge for Explorer -->
        <span
          v-if="item.id === 'explorer' && vscode.openTabs.value.length > 0"
          class="absolute top-2 right-2 flex h-3.5 min-w-[14px] px-0.5 items-center justify-center rounded-full bg-[var(--vscode-accent)] text-[9px] font-bold text-white leading-none shadow-sm"
        >
          {{ vscode.openTabs.value.length }}
        </span>
      </button>
    </div>

    <!-- Bottom Activities -->
    <div class="flex flex-col items-center gap-2">
      <!-- Theme Switcher / Settings -->
      <button
        @click="vscode.setActivity('settings')"
        :class="[
          'relative w-12 h-11 flex items-center justify-center transition-colors group',
          vscode.activeActivity.value === 'settings' && vscode.isSidebarOpen.value
            ? 'text-white border-l-2 border-[var(--vscode-accent)]'
            : 'text-[var(--vscode-text-muted)] hover:text-white border-l-2 border-transparent'
        ]"
        title="Settings & Themes"
        aria-label="Settings"
      >
        <Icon name="mdi:cog-outline" class="text-2xl transition-transform group-hover:rotate-45" />
      </button>

      <!-- GitHub Link -->
      <a
        href="https://github.com/AugeusAune"
        target="_blank"
        rel="noopener noreferrer"
        class="w-8 h-8 rounded-full overflow-hidden border border-[var(--vscode-border)] hover:border-[var(--vscode-accent)] transition-all hover:scale-105"
        title="Farhan's GitHub Profile"
      >
        <img
          src="/image/profile.jpg"
          alt="Avatar"
          width="32"
          height="32"
          class="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
      </a>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useVSCode, type ActivityType } from '../../composables/useVSCode';

const vscode = useVSCode();

const topActivities: Array<{ id: ActivityType; icon: string; label: string }> = [
  { id: 'explorer', icon: 'mdi:file-document-multiple-outline', label: 'Explorer (Ctrl+Shift+E)' },
  { id: 'search', icon: 'mdi:magnify', label: 'Search across portfolio' },
  { id: 'git', icon: 'mdi:source-branch', label: 'Source Control (Git)' },
  { id: 'skills', icon: 'mdi:puzzle-outline', label: 'Skills & Extensions' },
];
</script>
