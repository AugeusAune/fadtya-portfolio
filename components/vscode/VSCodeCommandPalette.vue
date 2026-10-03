<template>
  <div
    v-if="vscode.isCommandPaletteOpen.value"
    class="fixed inset-0 z-50 flex items-start justify-center pt-8 sm:pt-16 px-2 sm:px-4 bg-black/50 backdrop-blur-xs select-none"
    @click.self="vscode.toggleCommandPalette(false)"
  >
    <div
      class="w-full max-w-xl rounded-xl border border-[var(--vscode-border)] bg-[var(--vscode-sidebar-bg)] shadow-2xl overflow-hidden flex flex-col animate-scale-in"
      @keydown="handleKeydown"
    >
      <!-- Search Input -->
      <div class="p-3 border-b border-[var(--vscode-border)] flex items-center gap-2 bg-[var(--vscode-bg)]">
        <Icon name="mdi:magnify" class="text-base text-[var(--vscode-accent)] shrink-0" />
        <input
          ref="searchInput"
          v-model="query"
          type="text"
          placeholder="Type to search files or '>' for IDE commands..."
          class="flex-1 bg-transparent border-none outline-none text-xs text-[var(--vscode-text)] placeholder-[var(--vscode-text-muted)] focus:ring-0"
        />
        <kbd class="text-[9px] px-1.5 py-0.5 rounded bg-[var(--vscode-sidebar-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text-muted)]">
          ESC
        </kbd>
      </div>

      <!-- Results List -->
      <div class="max-h-80 overflow-y-auto p-1 text-xs space-y-0.5">
        <div
          v-for="(item, index) in filteredItems"
          :key="item.id"
          @click="selectItem(item)"
          @mouseenter="selectedIndex = index"
          :class="[
            'px-3 py-2 rounded-lg flex items-center justify-between cursor-pointer transition-colors',
            selectedIndex === index
              ? 'bg-[var(--vscode-accent)] text-white'
              : 'text-[var(--vscode-text)] hover:bg-[var(--vscode-bg)]'
          ]"
        >
          <div class="flex items-center gap-2.5 truncate">
            <Icon :name="item.icon" class="text-sm shrink-0" />
            <div class="truncate">
              <span class="font-semibold">{{ item.title }}</span>
              <span
                v-if="item.subtitle"
                :class="[
                  'text-[10px] ml-2 truncate',
                  selectedIndex === index ? 'text-white/80' : 'text-[var(--vscode-text-muted)]'
                ]"
              >
                {{ item.subtitle }}
              </span>
            </div>
          </div>

          <span
            :class="[
              'text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono shrink-0 ml-2',
              selectedIndex === index ? 'bg-black/20 text-white' : 'bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)]'
            ]"
          >
            {{ item.type }}
          </span>
        </div>

        <div v-if="filteredItems.length === 0" class="p-6 text-center text-xs text-[var(--vscode-text-muted)]">
          No matching files or commands found.
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useVSCode } from '../../composables/useVSCode';
import { VFS_FILES } from '../../utils/vfs';
import { type ThemeId } from '../../utils/themes';

const vscode = useVSCode();
const query = ref('');
const selectedIndex = ref(0);
const searchInput = ref<HTMLInputElement | null>(null);

interface PaletteItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: string;
  type: 'file' | 'command' | 'theme';
  action: () => void;
}

const commands: PaletteItem[] = [
  {
    id: 'cmd-terminal',
    title: 'View: Toggle Integrated Terminal',
    subtitle: 'Ctrl+`',
    icon: 'mdi:terminal',
    type: 'command',
    action: () => vscode.toggleTerminal()
  },
  {
    id: 'cmd-sidebar',
    title: 'View: Toggle Sidebar',
    icon: 'mdi:view-split-horizontal',
    type: 'command',
    action: () => vscode.toggleSidebar()
  },
  {
    id: 'cmd-preview',
    title: 'View: Show Visual Preview',
    icon: 'mdi:eye-outline',
    type: 'command',
    action: () => vscode.setViewMode('preview')
  },
  {
    id: 'cmd-code',
    title: 'View: Show Source Code',
    icon: 'mdi:code-tags',
    type: 'command',
    action: () => vscode.setViewMode('code')
  },
  {
    id: 'cmd-split',
    title: 'View: Toggle Split Editor',
    icon: 'mdi:view-split-vertical',
    type: 'command',
    action: () => vscode.setViewMode('split')
  },
  {
    id: 'theme-dark-plus',
    title: 'Preferences: Color Theme (Default Dark+)',
    icon: 'mdi:palette-outline',
    type: 'theme',
    action: () => vscode.setTheme('dark-plus')
  },
  {
    id: 'theme-one-dark-pro',
    title: 'Preferences: Color Theme (One Dark Pro)',
    icon: 'mdi:palette-outline',
    type: 'theme',
    action: () => vscode.setTheme('one-dark-pro')
  },
  {
    id: 'theme-tokyo-night',
    title: 'Preferences: Color Theme (Tokyo Night)',
    icon: 'mdi:palette-outline',
    type: 'theme',
    action: () => vscode.setTheme('tokyo-night')
  },
  {
    id: 'theme-dracula',
    title: 'Preferences: Color Theme (Dracula)',
    icon: 'mdi:palette-outline',
    type: 'theme',
    action: () => vscode.setTheme('dracula')
  },
  {
    id: 'theme-light-plus',
    title: 'Preferences: Color Theme (Light+)',
    icon: 'mdi:palette-outline',
    type: 'theme',
    action: () => vscode.setTheme('light-plus')
  }
];

const allItems = computed((): PaletteItem[] => {
  const fileItems: PaletteItem[] = VFS_FILES.map(file => ({
    id: `file-${file.id}`,
    title: file.name,
    subtitle: file.path,
    icon: file.icon,
    type: 'file',
    action: () => vscode.openFile(file.id)
  }));

  return [...fileItems, ...commands];
});

const filteredItems = computed((): PaletteItem[] => {
  const q = query.value.trim().toLowerCase();
  if (!q) return allItems.value;

  if (q.startsWith('>')) {
    const cmdQuery = q.slice(1).trim();
    return commands.filter(c => c.title.toLowerCase().includes(cmdQuery));
  }

  return allItems.value.filter(item =>
    item.title.toLowerCase().includes(q) ||
    item.subtitle?.toLowerCase().includes(q)
  );
});

const selectItem = (item: PaletteItem): void => {
  vscode.toggleCommandPalette(false);
  item.action();
};

const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    vscode.toggleCommandPalette(false);
    return;
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    if (selectedIndex.value < filteredItems.value.length - 1) {
      selectedIndex.value += 1;
    } else {
      selectedIndex.value = 0;
    }
    return;
  }
  if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (selectedIndex.value > 0) {
      selectedIndex.value -= 1;
    } else {
      selectedIndex.value = filteredItems.value.length - 1;
    }
    return;
  }
  if (e.key === 'Enter') {
    e.preventDefault();
    const item = filteredItems.value[selectedIndex.value];
    if (item) {
      selectItem(item);
    }
  }
};

watch(() => query.value, () => {
  selectedIndex.value = 0;
});

watch(() => vscode.isCommandPaletteOpen.value, (isOpen) => {
  if (isOpen) {
    query.value = '';
    selectedIndex.value = 0;
    nextTick(() => {
      searchInput.value?.focus();
    });
  }
});
</script>
