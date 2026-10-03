# VS Code Style Developer Portfolio Design Spec

- **Author**: Antigravity & Farhan Aditya
- **Date**: 2026-10-03
- **Branch**: `feature/vscode-style-portfolio`
- **Status**: Approved Design

---

## 1. Executive Summary

This specification outlines the architecture, layout, state management, and component system for converting Farhan Aditya's portfolio into an authentic, high-performance Visual Studio Code (VS Code) developer experience. 

The portfolio replaces the default homepage (`/`) on this branch with a responsive desktop & mobile IDE simulation featuring a virtual file system, syntax-highlighted code editor, interactive component previews (with split-screen capability), an interactive bottom terminal, a command palette (`Ctrl+P` / `Cmd+K`), and a multi-theme engine supporting 5 iconic themes.

---

## 2. Architecture & Directory Structure

Adhering to Nuxt 4 conventions and clean separation of concerns:

```
portfolio/
├── composables/
│   └── useVSCode.ts             # Central reactive state manager for the IDE
├── utils/
│   ├── vfs.ts                   # Virtual File System data & mapping from list/
│   ├── themes.ts                # VS Code theme definitions & CSS variables
│   └── terminalCommands.ts      # Command parser & executor for the terminal
├── components/
│   └── vscode/
│       ├── VSCodeLayout.vue         # Top-level IDE container and layout orchestration
│       ├── VSCodeTitlebar.vue       # Window controls, menu items, search/palette trigger
│       ├── VSCodeActivityBar.vue    # Left vertical activity strip (Explorer, Search, Git, Extensions, Settings)
│       ├── VSCodeSidebar.vue        # Collapsible sidebar panel with tree view, search, git, and extensions
│       ├── VSCodeTabs.vue           # Draggable/clickable tab strip with breadcrumbs
│       ├── VSCodeEditor.vue         # Main editor area: Code view, Preview view, Split view
│       ├── VSCodeTerminal.vue       # Collapsible bottom dock with interactive bash emulator
│       ├── VSCodeCommandPalette.vue # Modal quick-open file switcher & command palette
│       ├── VSCodeStatusBar.vue      # Bottom status strip with Git branch, Ln/Col, UTF-8, Theme
│       └── previews/                # Rich preview components corresponding to VFS files
│           ├── ReadmePreview.vue    # Welcome hero & quick overview
│           ├── AboutPreview.vue     # Bio, background, and stats
│           ├── SkillsPreview.vue    # Categorized skill badges and radar/progress
│           ├── ProjectsPreview.vue  # Interactive cards with live links and modals
│           ├── ExperiencePreview.vue# Work timeline and key achievements
│           ├── EducationPreview.vue # Degrees and certifications
│           └── ContactPreview.vue   # Interactive message sender
└── pages/
    └── index.vue                # Main page hosting VSCodeLayout
```

---

## 3. Virtual File System (VFS)

The Virtual File System bridges existing portfolio data (`list/project.js`, `list/skils.js`, `list/experience.js`, `list/education.js`, `list/list-contact.js`) into authentic code representations.

### File Schema
```ts
export interface VFSFile {
  id: string;                  // Unique identifier, e.g., 'Projects.json'
  name: string;                // Display name
  folder: string;              // Virtual folder: 'src' | 'docs' | 'config'
  path: string;                // Breadcrumb path: 'portfolio > src > Projects.json'
  icon: string;                // Icon name from @nuxt/icon
  language: string;            // 'vue' | 'typescript' | 'json' | 'markdown' | 'env'
  codeContent: string;         // Formatted syntax-highlighted code representation
  previewComponent: string;    // Registered preview component name
  description: string;         // Short file summary for search and command palette
}
```

### Initial Virtual Files
1. `README.md` (`src/README.md`): Welcome note, developer bio, quick commands, and social badges.
2. `AboutMe.vue` (`src/AboutMe.vue`): Personal overview, philosophy, engineering passions.
3. `Skills.ts` (`src/Skills.ts`): TypeScript interface and constant arrays of technical skills.
4. `Projects.json` (`src/Projects.json`): JSON catalog of featured projects, tech tags, and links.
5. `Experience.md` (`docs/Experience.md`): Career history and accomplishments.
6. `Education.json` (`docs/Education.json`): Academic qualifications and certifications.
7. `Contact.env` (`config/Contact.env`): Environment variable format with contact details and interactive form.

---

## 4. State Management (`useVSCode.ts`)

A Nuxt 3/4 composable using Vue 3 `reactive` / `ref` for state management:

### State Fields
- `openTabs: string[]`: Array of open file IDs.
- `activeFileId: string`: Current active file ID.
- `activeActivity: 'explorer' | 'search' | 'git' | 'skills' | 'settings'`.
- `isSidebarOpen: boolean`: Toggle for the left sidebar (default `true` on desktop, `false` on mobile).
- `isTerminalOpen: boolean`: Toggle for bottom terminal dock.
- `isCommandPaletteOpen: boolean`: Toggle for `Ctrl+P`/`Cmd+K` modal.
- `activeTheme: string`: Current theme key (default `'dark-plus'`).
- `editorViewMode: 'code' | 'preview' | 'split'`: View mode in editor.

### Guarded Operations
- `openFile(id: string)`: Validates existence; appends to `openTabs` if not present; sets as `activeFileId`.
- `closeTab(id: string)`: Removes from `openTabs`. If closed tab was active, activates adjacent tab or defaults to `'README.md'`.
- `setTheme(themeKey: string)`: Applies CSS variables to document root and caches choice in `localStorage`.
- `toggleTerminal()`, `toggleSidebar()`, `toggleCommandPalette()`.

---

## 5. User Interface & Layout Components

### 5.1 Titlebar (`VSCodeTitlebar.vue`)
- macOS-style window controls (Red, Yellow, Green).
- Menu items: `File`, `Edit`, `Selection`, `View`, `Go`, `Run`, `Terminal`, `Help`.
- Central search bar: `farhan-aditya — Visual Studio Code (Ctrl+P)` acts as button to open Command Palette.
- Action icons: Split editor toggle, Theme switch shortcut.

### 5.2 Activity Bar (`VSCodeActivityBar.vue`)
- 5 activity icons with active indicator border on the left:
  1. **Explorer**: File tree view.
  2. **Search**: Search across files.
  3. **Source Control**: Git branch status & diffs.
  4. **Extensions/Skills**: Installed skills presented as VS Code extensions.
  5. **Settings**: Theme picker & preferences.
- Bottom avatar / profile icon linking to GitHub.

### 5.3 Sidebar (`VSCodeSidebar.vue`)
- Collapsible accordions:
  - `OPEN EDITORS` (with close-all action).
  - `FARHAN-ADITYA (PORTFOLIO)` directory tree with collapsible folders (`src/`, `docs/`, `config/`).
- Mobile adaptive: Becomes a slide-out overlay drawer on viewport width `< 768px`.

### 5.4 Editor & Tabs (`VSCodeEditor.vue` & `VSCodeTabs.vue`)
- Horizontal scrolling tab bar with active tab underline and individual close buttons.
- Breadcrumb navigation above editor buffer.
- View Mode Selector:
  - **Code View**: Line numbers column + formatted syntax highlighting.
  - **Preview View**: Rich interactive Vue cards with smooth micro-animations.
  - **Split View**: Dual-pane editor side-by-side (code on left, preview on right) on screens `>= 1024px`.

### 5.5 Interactive Terminal (`VSCodeTerminal.vue`)
- Tabs: `TERMINAL`, `OUTPUT`, `PROBLEMS (0)`.
- Interactive prompt: `visitor@farhan-portfolio:~$ `
- Command parser supporting:
  - `help`: Prints table of available commands.
  - `ls`: Lists all virtual files.
  - `cat <filename>` / `open <filename>`: Renders or opens file in editor.
  - `skills`: Categorized tech stack dump.
  - `projects`: Lists featured projects.
  - `contact`: Shows email & social links.
  - `theme <name>`: Switches theme.
  - `whoami`: Farhan's bio.
  - `clear`: Clears terminal history.
  - `sudo rm -rf /`: Humorous easter egg.
- History traversal via `Arrow Up` / `Arrow Down`.

### 5.6 Command Palette (`VSCodeCommandPalette.vue`)
- Keyboard triggered via `Ctrl+P`, `Cmd+K`, or titlebar click.
- Real-time fuzzy filtering of files and commands.
- Keyboard navigation (`Arrow Up`, `Arrow Down`, `Enter`, `Escape`).

### 5.7 Status Bar (`VSCodeStatusBar.vue`)
- VS Code status bar styled with theme-appropriate background.
- Left: Git branch name (`feature/vscode-style-portfolio`), error/warning badge (`⊗ 0 ⚠ 0`).
- Right: `Ln 1, Col 1`, `Spaces: 2`, `UTF-8`, Language identifier (`Vue`, `TypeScript`, `JSON`), Theme indicator.

---

## 6. Theme Engine (`utils/themes.ts`)

Five curated VS Code themes mapped to CSS custom variables:

| Variable | Default Dark+ | One Dark Pro | Tokyo Night | Dracula | Light+ |
|---|---|---|---|---|---|
| `--vscode-bg` | `#1e1e1e` | `#282c34` | `#1a1b26` | `#282a36` | `#ffffff` |
| `--vscode-sidebar-bg` | `#252526` | `#21252b` | `#16161e` | `#21222c` | `#f3f3f3` |
| `--vscode-activity-bg` | `#333333` | `#1e1e24` | `#13141c` | `#191a21` | `#2c2c2c` |
| `--vscode-titlebar-bg` | `#3c3c3c` | `#21252b` | `#16161e` | `#1e1f29` | `#dddddd` |
| `--vscode-statusbar-bg` | `#007acc` | `#21252b` | `#1f2335` | `#6272a4` | `#007acc` |
| `--vscode-accent` | `#007acc` | `#61afef` | `#7aa2f7` | `#bd93f9` | `#007acc` |
| `--vscode-text` | `#cccccc` | `#abb2bf` | `#a9b1d6` | `#f8f8f2` | `#333333` |
| `--vscode-border` | `#3c3c3c` | `#181a1f` | `#24283b` | `#44475a` | `#e7e7e7` |

Theme preferences are persisted to `localStorage` and applied on SSR mount.

---

## 7. Quality & Code Conventions

- **Guard Clauses**: Early returns for edge cases; max 2 levels of indentation.
- **Function Size**: 20–30 lines per function, max 50 lines.
- **SOLID / DRY**: Isolated single-responsibility components and composable utilities.
- **No Empty Blocks**: Every error path is handled and logged/displayed.
- **Git Commit Workflow**: No automatic git commits without explicit interactive user approval via `ask_question`.
