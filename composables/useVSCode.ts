import { ref, computed } from 'vue';
import { type ThemeId, applyTheme, getStoredTheme } from '../utils/themes';
import { VFS_FILES, getFileById, type VFSFile } from '../utils/vfs';

export type ActivityType = 'explorer' | 'search' | 'git' | 'skills' | 'settings';
export type ViewMode = 'code' | 'preview' | 'split';

const activeFileId = ref<string>('README.md');
const openTabs = ref<string[]>(['README.md', 'Projects.json', 'Skills.ts']);
const activeActivity = ref<ActivityType>('explorer');
const isSidebarOpen = ref<boolean>(true);
const isTerminalOpen = ref<boolean>(false);
const isCommandPaletteOpen = ref<boolean>(false);
const activeTheme = ref<ThemeId>('dark-plus');
const editorViewMode = ref<ViewMode>('preview');

export const useVSCode = () => {
  const activeFile = computed<VFSFile>(() => getFileById(activeFileId.value));
  const openFiles = computed<VFSFile[]>(() => openTabs.value.map(id => getFileById(id)));

  const openFile = (fileId: string): void => {
    if (!VFS_FILES.some(f => f.id === fileId)) return;
    if (!openTabs.value.includes(fileId)) {
      openTabs.value.push(fileId);
    }
    activeFileId.value = fileId;
  };

  const closeTab = (fileId: string): void => {
    const index = openTabs.value.indexOf(fileId);
    if (index === -1) return;

    openTabs.value.splice(index, 1);
    if (activeFileId.value !== fileId) return;

    if (openTabs.value.length > 0) {
      const nextIndex = Math.min(index, openTabs.value.length - 1);
      activeFileId.value = openTabs.value[nextIndex];
      return;
    }

    activeFileId.value = 'README.md';
    openTabs.value = ['README.md'];
  };

  const setTheme = (theme: ThemeId): void => {
    activeTheme.value = theme;
    applyTheme(theme);
  };

  const setViewMode = (mode: ViewMode): void => {
    editorViewMode.value = mode;
  };

  const setActivity = (activity: ActivityType): void => {
    if (activeActivity.value === activity && isSidebarOpen.value) {
      isSidebarOpen.value = false;
      return;
    }
    activeActivity.value = activity;
    isSidebarOpen.value = true;
  };

  const toggleSidebar = (forced?: boolean): void => {
    isSidebarOpen.value = forced !== undefined ? forced : !isSidebarOpen.value;
  };

  const toggleTerminal = (forced?: boolean): void => {
    isTerminalOpen.value = forced !== undefined ? forced : !isTerminalOpen.value;
  };

  const toggleCommandPalette = (forced?: boolean): void => {
    isCommandPaletteOpen.value = forced !== undefined ? forced : !isCommandPaletteOpen.value;
  };

  const initTheme = (): void => {
    const stored = getStoredTheme();
    activeTheme.value = stored;
    applyTheme(stored);
  };

  return {
    activeFileId,
    openTabs,
    activeActivity,
    isSidebarOpen,
    isTerminalOpen,
    isCommandPaletteOpen,
    activeTheme,
    editorViewMode,
    activeFile,
    openFiles,
    openFile,
    closeTab,
    setTheme,
    setViewMode,
    setActivity,
    toggleSidebar,
    toggleTerminal,
    toggleCommandPalette,
    initTheme
  };
};
