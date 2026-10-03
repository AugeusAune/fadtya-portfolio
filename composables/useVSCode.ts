import { ref, computed } from 'vue';
import { type ThemeId, applyTheme, getStoredTheme, THEMES } from '../utils/themes';
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

  const getPathForFile = (fileId: string): string => {
    if (fileId === 'README.md') return '/';
    return `/${fileId}`;
  };

  const getFileFromPath = (path: string): string | null => {
    const clean = decodeURIComponent(path.replace(/^\/+|\/+$/g, ''));
    if (!clean || clean.toLowerCase() === 'readme.md') return 'README.md';
    const match = VFS_FILES.find(f => f.id.toLowerCase() === clean.toLowerCase());
    return match ? match.id : null;
  };

  const syncUrl = (fileId: string, replace = false): void => {
    if (typeof window === 'undefined' || !window.history) return;
    const targetPath = getPathForFile(fileId);
    if (window.location.pathname === targetPath && !replace) return;
    
    if (replace) {
      window.history.replaceState({ fileId }, '', targetPath);
      return;
    }
    window.history.pushState({ fileId }, '', targetPath);
  };

  const openFile = (fileId: string, updateUrl = true): void => {
    if (!VFS_FILES.some(f => f.id === fileId)) return;
    if (!openTabs.value.includes(fileId)) {
      openTabs.value.push(fileId);
    }
    activeFileId.value = fileId;

    if (updateUrl) {
      syncUrl(fileId, false);
    }
    saveState();
  };

  const closeTab = (fileId: string): void => {
    const index = openTabs.value.indexOf(fileId);
    if (index === -1) return;

    openTabs.value.splice(index, 1);
    if (activeFileId.value !== fileId) {
      saveState();
      return;
    }

    if (openTabs.value.length > 0) {
      const nextIndex = Math.min(index, openTabs.value.length - 1);
      const nextFileId = openTabs.value[nextIndex] || 'README.md';
      activeFileId.value = nextFileId;
      syncUrl(nextFileId, true);
      saveState();
      return;
    }

    activeFileId.value = 'README.md';
    openTabs.value = ['README.md'];
    syncUrl('README.md', true);
    saveState();
  };

  const WORKSPACE_STORAGE_KEY = 'vscode_workspace_state';

  const saveState = (): void => {
    if (typeof window === 'undefined') return;
    try {
      const state = {
        openTabs: openTabs.value,
        activeFileId: activeFileId.value,
        editorViewMode: editorViewMode.value,
        activeTheme: activeTheme.value,
        activeActivity: activeActivity.value,
        isSidebarOpen: isSidebarOpen.value,
        isTerminalOpen: isTerminalOpen.value,
      };
      localStorage.setItem(WORKSPACE_STORAGE_KEY, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to persist VS Code workspace to localStorage', err);
    }
  };

  const loadState = (): void => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(WORKSPACE_STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== 'object') return;

      restoreOpenTabs(parsed.openTabs);
      restoreActiveFile(parsed.activeFileId);
      restorePreferences(parsed);
    } catch (err) {
      console.warn('Failed to restore VS Code workspace from localStorage', err);
    }
  };

  const restoreOpenTabs = (tabs: unknown): void => {
    if (!Array.isArray(tabs) || tabs.length === 0) return;
    const valid = tabs.filter((id): id is string => typeof id === 'string' && VFS_FILES.some(f => f.id === id));
    if (valid.length > 0) {
      openTabs.value = valid;
    }
  };

  const restoreActiveFile = (fileId: unknown): void => {
    if (typeof fileId !== 'string') return;
    if (VFS_FILES.some(f => f.id === fileId)) {
      activeFileId.value = fileId;
    }
  };

  const restorePreferences = (parsed: Record<string, any>): void => {
    if (['preview', 'code', 'split'].includes(parsed.editorViewMode)) {
      editorViewMode.value = parsed.editorViewMode;
    }
    if (['explorer', 'search', 'git', 'skills', 'settings'].includes(parsed.activeActivity)) {
      activeActivity.value = parsed.activeActivity;
    }
    if (typeof parsed.isSidebarOpen === 'boolean' && window.innerWidth >= 768) {
      isSidebarOpen.value = parsed.isSidebarOpen;
    }
    if (typeof parsed.isTerminalOpen === 'boolean') {
      isTerminalOpen.value = parsed.isTerminalOpen;
    }
    if (typeof parsed.activeTheme === 'string' && parsed.activeTheme in THEMES) {
      setTheme(parsed.activeTheme as ThemeId);
    }
  };

  const initFromUrl = (): void => {
    if (typeof window === 'undefined') return;
    loadState();

    const pathFile = getFileFromPath(window.location.pathname);
    if (pathFile) {
      openFile(pathFile, false);
      syncUrl(pathFile, true);
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const queryFile = params.get('file');
    if (queryFile && VFS_FILES.some(f => f.id === queryFile)) {
      openFile(queryFile, false);
      syncUrl(queryFile, true);
      return;
    }

    syncUrl(activeFileId.value, true);
  };

  const handlePopState = (event: PopStateEvent): void => {
    if (typeof window === 'undefined') return;
    const stateFileId = event.state?.fileId;
    if (stateFileId && VFS_FILES.some(f => f.id === stateFileId)) {
      openFile(stateFileId, false);
      return;
    }

    const pathFile = getFileFromPath(window.location.pathname);
    if (pathFile) {
      openFile(pathFile, false);
      return;
    }

    openFile('README.md', false);
  };

  const setTheme = (theme: ThemeId): void => {
    activeTheme.value = theme;
    applyTheme(theme);
    saveState();
  };

  const setViewMode = (mode: ViewMode): void => {
    editorViewMode.value = mode;
    saveState();
  };

  const setActivity = (activity: ActivityType): void => {
    if (activeActivity.value === activity && isSidebarOpen.value) {
      isSidebarOpen.value = false;
      saveState();
      return;
    }
    activeActivity.value = activity;
    isSidebarOpen.value = true;
    saveState();
  };

  const toggleSidebar = (forced?: boolean): void => {
    isSidebarOpen.value = forced !== undefined ? forced : !isSidebarOpen.value;
    saveState();
  };

  const toggleTerminal = (forced?: boolean): void => {
    isTerminalOpen.value = forced !== undefined ? forced : !isTerminalOpen.value;
    saveState();
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
    initTheme,
    initFromUrl,
    syncUrl,
    getPathForFile,
    getFileFromPath,
    handlePopState,
    saveState,
    loadState
  };
};
