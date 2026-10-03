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

const WORKSPACE_STORAGE_KEY = 'vscode_workspace_state';

let isStateLoaded = false;

export const useVSCode = () => {
  const activeFile = computed<VFSFile>(() => getFileById(activeFileId.value));
  const openFiles = computed<VFSFile[]>(() => openTabs.value.map(id => getFileById(id)));

  const getPathForFile = (fileId: string): string => {
    if (fileId === 'README.md') return '/';
    return `/${fileId}`;
  };

  const getFileFromPath = (path: string): string | null => {
    const clean = decodeURIComponent(path.replace(/^\/+|\/+$/g, ''));
    if (!clean || clean.toLowerCase() === 'readme.md' || clean.toLowerCase() === 'readme') return 'README.md';

    // 1. Exact match with extension (case-insensitive)
    const exactMatch = VFS_FILES.find(f => f.id.toLowerCase() === clean.toLowerCase());
    if (exactMatch) return exactMatch.id;

    // 2. Base name match without extension (e.g. 'aboutme' -> 'AboutMe.vue')
    const noExtClean = clean.replace(/\.[^.]+$/, '').toLowerCase();
    const baseMatch = VFS_FILES.find(f => f.name.replace(/\.[^.]+$/, '').toLowerCase() === noExtClean);
    if (baseMatch) return baseMatch.id;

    return null;
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

  const saveState = (): void => {
    if (typeof window === 'undefined' || !isStateLoaded) return;
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

  const openFile = (fileIdOrName: string, updateUrl = true): void => {
    const resolvedId = getFileFromPath(fileIdOrName) || (VFS_FILES.some(f => f.id === fileIdOrName) ? fileIdOrName : null);
    if (!resolvedId) return;
    const fileId = resolvedId;

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
      activeTheme.value = parsed.activeTheme as ThemeId;
      applyTheme(parsed.activeTheme as ThemeId);
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
    } finally {
      isStateLoaded = true;
    }
  };

  const initFromUrl = (): void => {
    if (typeof window === 'undefined') return;
    loadState();

    const cleanPath = window.location.pathname.replace(/^\/+|\/+$/g, '');
    if (cleanPath) {
      const pathFile = getFileFromPath(cleanPath);
      if (pathFile) {
        openFile(pathFile, false);
        syncUrl(pathFile, true);
        return;
      }
    }

    const params = new URLSearchParams(window.location.search);
    const queryFile = params.get('file');
    if (queryFile) {
      const resolvedQuery = getFileFromPath(queryFile) || (VFS_FILES.some(f => f.id === queryFile) ? queryFile : null);
      if (resolvedQuery) {
        openFile(resolvedQuery, false);
        syncUrl(resolvedQuery, true);
        return;
      }
    }

    // If at root '/' and state restored an active file, stay on that file and sync URL
    if (activeFileId.value && VFS_FILES.some(f => f.id === activeFileId.value)) {
      syncUrl(activeFileId.value, true);
      return;
    }

    syncUrl('README.md', true);
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

  const initTheme = (): void => {
    const stored = getStoredTheme();
    activeTheme.value = stored;
    applyTheme(stored);
  };

  if (typeof window !== 'undefined' && !isStateLoaded) {
    loadState();
  }

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
