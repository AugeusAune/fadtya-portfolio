export type ThemeId = 'dark-plus' | 'one-dark-pro' | 'tokyo-night' | 'dracula' | 'light-plus';

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  isDark: boolean;
  colors: {
    '--vscode-bg': string;
    '--vscode-sidebar-bg': string;
    '--vscode-activity-bg': string;
    '--vscode-titlebar-bg': string;
    '--vscode-statusbar-bg': string;
    '--vscode-accent': string;
    '--vscode-text': string;
    '--vscode-text-muted': string;
    '--vscode-border': string;
    '--vscode-tab-active-bg': string;
    '--vscode-tab-inactive-bg': string;
    '--vscode-terminal-bg': string;
  };
}

export const THEMES: Record<ThemeId, ThemeConfig> = {
  'dark-plus': {
    id: 'dark-plus',
    name: 'Default Dark+',
    isDark: true,
    colors: {
      '--vscode-bg': '#1e1e1e',
      '--vscode-sidebar-bg': '#252526',
      '--vscode-activity-bg': '#333333',
      '--vscode-titlebar-bg': '#3c3c3c',
      '--vscode-statusbar-bg': '#007acc',
      '--vscode-accent': '#007acc',
      '--vscode-text': '#cccccc',
      '--vscode-text-muted': '#858585',
      '--vscode-border': '#3c3c3c',
      '--vscode-tab-active-bg': '#1e1e1e',
      '--vscode-tab-inactive-bg': '#2d2d2d',
      '--vscode-terminal-bg': '#181818'
    }
  },
  'one-dark-pro': {
    id: 'one-dark-pro',
    name: 'One Dark Pro',
    isDark: true,
    colors: {
      '--vscode-bg': '#282c34',
      '--vscode-sidebar-bg': '#21252b',
      '--vscode-activity-bg': '#1e1e24',
      '--vscode-titlebar-bg': '#21252b',
      '--vscode-statusbar-bg': '#21252b',
      '--vscode-accent': '#61afef',
      '--vscode-text': '#abb2bf',
      '--vscode-text-muted': '#5c6370',
      '--vscode-border': '#181a1f',
      '--vscode-tab-active-bg': '#282c34',
      '--vscode-tab-inactive-bg': '#21252b',
      '--vscode-terminal-bg': '#21252b'
    }
  },
  'tokyo-night': {
    id: 'tokyo-night',
    name: 'Tokyo Night',
    isDark: true,
    colors: {
      '--vscode-bg': '#1a1b26',
      '--vscode-sidebar-bg': '#16161e',
      '--vscode-activity-bg': '#13141c',
      '--vscode-titlebar-bg': '#16161e',
      '--vscode-statusbar-bg': '#1f2335',
      '--vscode-accent': '#7aa2f7',
      '--vscode-text': '#a9b1d6',
      '--vscode-text-muted': '#565f89',
      '--vscode-border': '#24283b',
      '--vscode-tab-active-bg': '#1a1b26',
      '--vscode-tab-inactive-bg': '#16161e',
      '--vscode-terminal-bg': '#16161e'
    }
  },
  dracula: {
    id: 'dracula',
    name: 'Dracula',
    isDark: true,
    colors: {
      '--vscode-bg': '#282a36',
      '--vscode-sidebar-bg': '#21222c',
      '--vscode-activity-bg': '#191a21',
      '--vscode-titlebar-bg': '#1e1f29',
      '--vscode-statusbar-bg': '#6272a4',
      '--vscode-accent': '#bd93f9',
      '--vscode-text': '#f8f8f2',
      '--vscode-text-muted': '#6272a4',
      '--vscode-border': '#44475a',
      '--vscode-tab-active-bg': '#282a36',
      '--vscode-tab-inactive-bg': '#1e1f29',
      '--vscode-terminal-bg': '#1e1f29'
    }
  },
  'light-plus': {
    id: 'light-plus',
    name: 'Light+ (Default Light)',
    isDark: false,
    colors: {
      '--vscode-bg': '#ffffff',
      '--vscode-sidebar-bg': '#f3f3f3',
      '--vscode-activity-bg': '#2c2c2c',
      '--vscode-titlebar-bg': '#dddddd',
      '--vscode-statusbar-bg': '#007acc',
      '--vscode-accent': '#007acc',
      '--vscode-text': '#333333',
      '--vscode-text-muted': '#717171',
      '--vscode-border': '#e7e7e7',
      '--vscode-tab-active-bg': '#ffffff',
      '--vscode-tab-inactive-bg': '#ececec',
      '--vscode-terminal-bg': '#f8f8f8'
    }
  }
};

const THEME_STORAGE_KEY = 'vscode-theme-preference';

export const getStoredTheme = (): ThemeId => {
  if (typeof window === 'undefined') return 'dark-plus';
  const saved = localStorage.getItem(THEME_STORAGE_KEY) as ThemeId | null;
  if (!saved || !THEMES[saved]) return 'dark-plus';
  return saved;
};

export const applyTheme = (themeId: ThemeId): void => {
  if (typeof document === 'undefined') return;
  const theme = THEMES[themeId] || THEMES['dark-plus'];
  const root = document.documentElement;

  for (const [key, value] of Object.entries(theme.colors)) {
    root.style.setProperty(key, value);
  }

  if (theme.isDark) {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }

  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_STORAGE_KEY, theme.id);
  }
};
