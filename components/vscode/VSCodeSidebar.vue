<template>
  <aside
    v-if="vscode.isSidebarOpen.value"
    class="fixed md:relative top-9 md:top-auto bottom-6 md:bottom-auto left-12 md:left-auto z-40 md:z-20 w-72 max-w-[calc(100vw-3.25rem)] md:w-64 h-[calc(100vh-3.75rem)] md:h-full bg-[var(--vscode-sidebar-bg)] border-r border-[var(--vscode-border)] flex flex-col select-none text-xs text-[var(--vscode-text-muted)] shrink-0 shadow-2xl md:shadow-none transition-all duration-200"
  >
    <!-- Header -->
    <div class="h-9 px-4 flex items-center justify-between font-bold tracking-wider text-[11px] text-[var(--vscode-text)] border-b border-[var(--vscode-border)]/40">
      <span>{{ activeViewTitle }}</span>
      <div class="flex items-center gap-1">
        <button
          @click="vscode.toggleSidebar(false)"
          class="p-1 rounded hover:bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)] hover:text-[var(--vscode-text)]"
          title="Collapse Sidebar"
        >
          <Icon name="mdi:chevron-left" class="text-base" />
        </button>
      </div>
    </div>

    <!-- View Contents -->
    <div class="flex-1 overflow-y-auto">
      <!-- 1. EXPLORER VIEW -->
      <div v-if="vscode.activeActivity.value === 'explorer'" class="py-2 space-y-3">
        <!-- Open Editors Accordion -->
        <div class="space-y-1">
          <div
            @click="isOpenEditorsExpanded = !isOpenEditorsExpanded"
            class="px-3 py-1 flex items-center gap-1 font-bold text-[10px] text-[var(--vscode-text)] cursor-pointer hover:bg-[var(--vscode-bg)]/40"
          >
            <Icon :name="isOpenEditorsExpanded ? 'mdi:chevron-down' : 'mdi:chevron-right'" class="text-sm" />
            <span>OPEN EDITORS</span>
          </div>

          <div v-if="isOpenEditorsExpanded" class="space-y-0.5">
            <div
              v-for="file in vscode.openFiles.value"
              :key="file.id"
              @click="handleOpenFile(file.id)"
              :class="[
                'group px-4 py-1 flex items-center justify-between cursor-pointer transition-colors',
                vscode.activeFileId.value === file.id
                  ? 'bg-[var(--vscode-accent)]/15 text-[var(--vscode-text)] font-semibold'
                  : 'hover:bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)]'
              ]"
            >
              <div class="flex items-center gap-2 truncate">
                <Icon :name="file.icon" class="text-sm shrink-0" />
                <span class="truncate">{{ file.name }}</span>
              </div>
              <button
                @click.stop="vscode.closeTab(file.id)"
                class="opacity-0 group-hover:opacity-100 hover:text-white p-0.5 rounded"
                title="Close"
              >
                <Icon name="mdi:close" class="text-xs" />
              </button>
            </div>
          </div>
        </div>

        <!-- Project Directory Tree -->
        <div class="space-y-1">
          <div class="px-3 py-1 flex items-center gap-1 font-bold text-[10px] text-[var(--vscode-text)]">
            <Icon name="mdi:folder-table-outline" class="text-sm text-[var(--vscode-accent)]" />
            <span>FARHAN-PORTFOLIO</span>
          </div>

          <!-- Folders -->
          <div
            v-for="folder in ['src', 'docs', 'config'] as const"
            :key="folder"
            class="space-y-0.5"
          >
            <div
              @click="toggleFolder(folder)"
              class="px-4 py-1 flex items-center gap-1.5 cursor-pointer hover:bg-[var(--vscode-bg)]/40 text-[var(--vscode-text)]"
            >
              <Icon :name="expandedFolders[folder] ? 'mdi:chevron-down' : 'mdi:chevron-right'" class="text-xs text-[var(--vscode-text-muted)]" />
              <Icon :name="expandedFolders[folder] ? 'mdi:folder-open' : 'mdi:folder'" class="text-sm text-amber-400" />
              <span class="font-semibold text-[11px]">{{ folder }}</span>
            </div>

            <!-- Children Files -->
            <div v-if="expandedFolders[folder]" class="space-y-0.5 pl-4">
              <div
                v-for="file in folderFiles[folder]"
                :key="file.id"
                @click="handleOpenFile(file.id)"
                :class="[
                  'px-4 py-1 flex items-center gap-2 cursor-pointer transition-colors',
                  vscode.activeFileId.value === file.id
                    ? 'bg-[var(--vscode-accent)]/15 text-[var(--vscode-text)] font-semibold border-l-2 border-[var(--vscode-accent)]'
                    : 'hover:bg-[var(--vscode-bg)] text-[var(--vscode-text-muted)] border-l-2 border-transparent'
                ]"
              >
                <Icon :name="file.icon" class="text-sm shrink-0" />
                <span class="truncate">{{ file.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 2. SEARCH VIEW -->
      <div v-else-if="vscode.activeActivity.value === 'search'" class="p-3 space-y-3">
        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search in portfolio files..."
            class="w-full px-2.5 py-1.5 rounded bg-[var(--vscode-bg)] border border-[var(--vscode-border)] text-[var(--vscode-text)] placeholder-[var(--vscode-text-muted)] text-xs focus:outline-none focus:border-[var(--vscode-accent)]"
          />
          <Icon name="mdi:magnify" class="absolute right-2.5 top-2 text-[var(--vscode-text-muted)]" />
        </div>

        <div class="space-y-1">
          <div class="text-[10px] font-bold text-[var(--vscode-text-muted)] uppercase tracking-wider">
            Matching Files ({{ searchResults.length }})
          </div>

          <div
            v-for="file in searchResults"
            :key="file.id"
            @click="handleOpenFile(file.id)"
            class="p-2 rounded bg-[var(--vscode-bg)]/40 hover:bg-[var(--vscode-bg)] border border-[var(--vscode-border)] cursor-pointer space-y-1 transition-colors"
          >
            <div class="flex items-center gap-2 font-bold text-[var(--vscode-text)]">
              <Icon :name="file.icon" class="text-sm" />
              <span>{{ file.name }}</span>
            </div>
            <p class="text-[10px] text-[var(--vscode-text-muted)] line-clamp-2">
              {{ file.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 3. GIT VIEW -->
      <div v-else-if="vscode.activeActivity.value === 'git'" class="p-3 space-y-4">
        <div class="p-3 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-2">
          <div class="flex items-center gap-2 text-[var(--vscode-text)] font-bold">
            <Icon name="mdi:source-branch" class="text-[var(--vscode-accent)] text-base" />
            <span>feature/vscode-style-portfolio</span>
          </div>
          <div class="text-[11px] text-emerald-400 flex items-center gap-1.5">
            <Icon name="mdi:check-circle-outline" class="text-xs" />
            <span>Working tree clean</span>
          </div>
        </div>

        <div class="space-y-2">
          <div class="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-muted)]">
            Active Branch Status
          </div>
          <p class="text-xs text-[var(--vscode-text-muted)] leading-relaxed">
            All VS Code IDE components, virtual filesystem, and interactive tools are synchronized and tested on this branch.
          </p>
        </div>
      </div>

      <!-- 4. EXTENSIONS / SKILLS VIEW -->
      <div v-else-if="vscode.activeActivity.value === 'skills'" class="p-3 space-y-3">
        <div class="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-muted)]">
          Installed Extensions & Competencies
        </div>

        <div class="space-y-2">
          <div
            v-for="ext in installedExtensions"
            :key="ext.name"
            class="p-2.5 rounded-lg bg-[var(--vscode-bg)] border border-[var(--vscode-border)] space-y-1.5"
          >
            <div class="flex items-start justify-between">
              <div class="flex items-center gap-2">
                <Icon :name="ext.icon" class="text-lg shrink-0" />
                <div>
                  <div class="font-bold text-[var(--vscode-text)] text-xs">{{ ext.name }}</div>
                  <div class="text-[10px] text-[var(--vscode-text-muted)]">{{ ext.publisher }} • v{{ ext.version }}</div>
                </div>
              </div>
              <span class="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-400">
                Installed
              </span>
            </div>
            <p class="text-[10px] text-[var(--vscode-text-muted)] leading-tight">
              {{ ext.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- 5. SETTINGS / THEMES VIEW -->
      <div v-else-if="vscode.activeActivity.value === 'settings'" class="p-3 space-y-4">
        <div class="text-[10px] font-bold uppercase tracking-wider text-[var(--vscode-text-muted)]">
          Color Themes (5 Available)
        </div>

        <div class="space-y-2">
          <button
            v-for="theme in themeList"
            :key="theme.id"
            @click="vscode.setTheme(theme.id)"
            :class="[
              'w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all',
              vscode.activeTheme.value === theme.id
                ? 'bg-[var(--vscode-accent)]/20 border-[var(--vscode-accent)] text-white font-bold'
                : 'bg-[var(--vscode-bg)] border-[var(--vscode-border)] text-[var(--vscode-text)] hover:border-[var(--vscode-accent)]/40'
            ]"
          >
            <div class="flex items-center gap-2">
              <span
                class="w-3 h-3 rounded-full border border-black/20"
                :style="{ backgroundColor: theme.colors['--vscode-accent'] }"
              />
              <span class="text-xs">{{ theme.name }}</span>
            </div>
            <Icon
              v-if="vscode.activeTheme.value === theme.id"
              name="mdi:check"
              class="text-sm text-[var(--vscode-accent)]"
            />
          </button>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useVSCode } from '../../composables/useVSCode';
import { VFS_FILES, getFilesByFolder, type VFSFile } from '../../utils/vfs';
import { THEMES, type ThemeConfig } from '../../utils/themes';

const vscode = useVSCode();

const isOpenEditorsExpanded = ref(true);
const expandedFolders = ref<Record<string, boolean>>({
  src: true,
  docs: true,
  config: true
});

const searchQuery = ref('');

const toggleFolder = (folder: string): void => {
  expandedFolders.value[folder] = !expandedFolders.value[folder];
};

const folderFiles = computed(() => ({
  src: getFilesByFolder('src'),
  docs: getFilesByFolder('docs'),
  config: getFilesByFolder('config'),
}));

const handleOpenFile = (fileId: string): void => {
  vscode.openFile(fileId);
  if (typeof window !== 'undefined' && window.innerWidth < 768) {
    vscode.toggleSidebar(false);
  }
};

const activeViewTitle = computed((): string => {
  switch (vscode.activeActivity.value) {
    case 'explorer':
      return 'EXPLORER';
    case 'search':
      return 'SEARCH';
    case 'git':
      return 'SOURCE CONTROL: GIT';
    case 'skills':
      return 'EXTENSIONS';
    case 'settings':
      return 'PREFERENCES: THEME';
    default:
      return 'SIDEBAR';
  }
});

const searchResults = computed((): VFSFile[] => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return VFS_FILES;
  return VFS_FILES.filter(f =>
    f.name.toLowerCase().includes(query) ||
    f.description.toLowerCase().includes(query) ||
    f.codeContent.toLowerCase().includes(query)
  );
});

const themeList = computed((): ThemeConfig[] => Object.values(THEMES));

const installedExtensions = [
  { name: 'Vue Language Features', publisher: 'Vue', version: '3.5.0', icon: 'logos:vue', description: 'Official Vue 3 tooling with Composition API & TypeScript.' },
  { name: 'Nuxt Framework Suite', publisher: 'Nuxt', version: '4.0.0', icon: 'logos:nuxt-icon', description: 'Modern SSR, hybrid pre-rendering, and automated routing.' },
  { name: 'Laravel Artisan & Eloquent', publisher: 'Laravel', version: '11.x', icon: 'logos:laravel', description: 'Backend domain services, jobs, and enterprise DB management.' },
  { name: 'Tailwind CSS IntelliSense', publisher: 'Tailwind', version: '3.4.0', icon: 'logos:tailwindcss-icon', description: 'Utility-first modern styling and responsive flexbox/grid.' },
  { name: 'Docker Container Engine', publisher: 'Docker', version: '24.0.0', icon: 'logos:docker-icon', description: 'Microservice packaging, containerization, and orchestration.' },
  { name: 'PostgreSQL Database Tools', publisher: 'PostgreSQL', version: '16.0', icon: 'logos:postgresql', description: 'High-concurrency relational data storage & query tuning.' },
  { name: 'Redis Cache & Pub/Sub', publisher: 'Redis', version: '7.2.0', icon: 'logos:redis', description: 'In-memory low-latency key-value store and queue manager.' },
];
</script>
