# VS Code Style Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete Visual Studio Code themed developer portfolio for Farhan Aditya, replacing the default homepage (`/`) on this branch with a responsive desktop & mobile IDE simulation featuring a virtual file system, hybrid syntax code & visual preview editor, interactive terminal, command palette, and 5-theme switcher.

**Architecture:** A reactive central composable (`useVSCode.ts`) orchestrates open tabs, active file, sidebar/terminal visibility, and theme selection over a structured Virtual File System (`utils/vfs.ts`) mapped from existing portfolio data. The interface renders an authentic IDE layout (Titlebar, Activity Bar, Sidebar, Editor with Code/Preview/Split modes, Terminal dock, Command Palette modal, and Status Bar) styled via dynamic CSS custom properties.

**Tech Stack:** Nuxt 4, Vue 3, Tailwind CSS, TypeScript, `@nuxt/icon`, Bun Test.

**Spec:** `docs/superpowers/specs/2026-10-03-vscode-style-portfolio-design.md`

## Global Constraints

- Runtime: Bun / Nuxt 4 / Vue 3.
- Test runner: `bun test`.
- Code conventions: camelCase for variables/functions, PascalCase for components.
- Max function length: 20–30 lines, maximum 50.
- Guard clauses preferred over nested conditionals; maximum 2 levels of indentation.
- Mandatory error handling: no empty `catch` blocks.
- No automatic git commits without explicit interactive user approval via `ask_question`.

## Review Focus

- Unknown file request: Opening a non-existent file ID in VFS must cleanly fall back to `README.md` without throwing unhandled exceptions.
- Empty open tabs state: Closing all open editor tabs must not crash the editor; it must gracefully show an empty editor welcome state.
- Terminal empty/malformed command: Submitting whitespace or unknown commands in the terminal must not throw errors; returns a clear guidance message.
- Mobile viewport handling: The sidebar and terminal must not overflow or clip content on viewports < 768px; sidebar closes to overlay drawer.
- SSR hydration safety: Theme and keyboard listeners accessing `window` or `localStorage` must only execute on client mount (`onMounted`) with proper teardown (`onUnmounted`).

---

### Task 1: Theme System & Tokens

**Files:**
- Create: `utils/themes.ts`
- Test: `tests/themes.test.ts`

**Interfaces:**
- Produces: `ThemeId`, `ThemeConfig`, `THEMES: Record<ThemeId, ThemeConfig>`, `applyTheme(id: ThemeId): void`, `getStoredTheme(): ThemeId`.

- [ ] **Step 1: Write failing test for theme engine in `tests/themes.test.ts`**

```ts
import { expect, test } from "bun:test";
import { THEMES, getStoredTheme, type ThemeId } from "../utils/themes";

test("THEMES contains all 5 required VS Code themes", () => {
  const themeKeys: ThemeId[] = ["dark-plus", "one-dark-pro", "tokyo-night", "dracula", "light-plus"];
  for (const key of themeKeys) {
    expect(THEMES[key]).toBeDefined();
    expect(THEMES[key].name).toBeString();
    expect(THEMES[key].colors["--vscode-bg"]).toBeString();
    expect(THEMES[key].colors["--vscode-sidebar-bg"]).toBeString();
    expect(THEMES[key].colors["--vscode-accent"]).toBeString();
  }
});

test("getStoredTheme returns dark-plus by default when no storage exists", () => {
  expect(getStoredTheme()).toBe("dark-plus");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/themes.test.ts`
Expected: FAIL with "Cannot find module '../utils/themes'"

- [ ] **Step 3: Implement `utils/themes.ts`**

Define `ThemeId`, theme color records for 5 themes (`dark-plus`, `one-dark-pro`, `tokyo-night`, `dracula`, `light-plus`), `applyTheme(id: ThemeId)`, and `getStoredTheme()`. Include guard clauses for client-side environment checks (`typeof window !== 'undefined'`).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/themes.test.ts`
Expected: PASS

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add utils/themes.ts tests/themes.test.ts
git commit -m "feat(vscode): add multi-theme engine and tokens"
```

---

### Task 2: Virtual File System (VFS) Layer

**Files:**
- Create: `utils/vfs.ts`
- Test: `tests/vfs.test.ts`

**Interfaces:**
- Consumes: `list/project.js`, `list/skils.js`, `list/experience.js`, `list/education.js`, `list/list-contact.js`.
- Produces: `VFSFile` interface, `VFS_FILES: VFSFile[]`, `getFileById(id: string): VFSFile`, `getFilesByFolder(folder: string): VFSFile[]`.

- [ ] **Step 1: Write failing test in `tests/vfs.test.ts`**

```ts
import { expect, test } from "bun:test";
import { VFS_FILES, getFileById, getFilesByFolder } from "../utils/vfs";

test("VFS_FILES defines core portfolio files", () => {
  const ids = VFS_FILES.map(f => f.id);
  expect(ids).toContain("README.md");
  expect(ids).toContain("AboutMe.vue");
  expect(ids).toContain("Skills.ts");
  expect(ids).toContain("Projects.json");
  expect(ids).toContain("Experience.md");
  expect(ids).toContain("Education.json");
  expect(ids).toContain("Contact.env");
});

test("getFileById returns requested file or defaults safely to README.md", () => {
  const readme = getFileById("README.md");
  expect(readme.id).toBe("README.md");
  const fallback = getFileById("non-existent.txt");
  expect(fallback.id).toBe("README.md");
});

test("getFilesByFolder filters files correctly", () => {
  const srcFiles = getFilesByFolder("src");
  expect(srcFiles.length).toBeGreaterThan(0);
  expect(srcFiles.every(f => f.folder === "src")).toBeTrue();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/vfs.test.ts`
Expected: FAIL with "Cannot find module '../utils/vfs'"

- [ ] **Step 3: Implement `utils/vfs.ts`**

Transform project data into formatted code strings (JSON stringified project list, formatted markdown experience, TypeScript skills objects) and declare metadata (`name`, `folder`, `icon`, `language`, `previewComponent`). Use guard clauses in `getFileById`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/vfs.test.ts`
Expected: PASS

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add utils/vfs.ts tests/vfs.test.ts
git commit -m "feat(vscode): add virtual file system with portfolio content"
```

---

### Task 3: Terminal Command Engine

**Files:**
- Create: `utils/terminalCommands.ts`
- Test: `tests/terminal.test.ts`

**Interfaces:**
- Consumes: `VFS_FILES`, `getFileById` from `utils/vfs.ts`, `THEMES` from `utils/themes.ts`.
- Produces: `TerminalResult` interface, `executeCommand(rawInput: string, onAction?: (action: string, payload?: any) => void): TerminalResult`.

- [ ] **Step 1: Write failing test in `tests/terminal.test.ts`**

```ts
import { expect, test } from "bun:test";
import { executeCommand } from "../utils/terminalCommands";

test("executeCommand handles empty input cleanly", () => {
  const result = executeCommand("   ");
  expect(result.output).toBe("");
  expect(result.type).toBe("normal");
});

test("executeCommand handles help command", () => {
  const result = executeCommand("help");
  expect(result.output).toContain("Available commands");
  expect(result.output).toContain("skills");
  expect(result.output).toContain("projects");
});

test("executeCommand handles ls command", () => {
  const result = executeCommand("ls");
  expect(result.output).toContain("README.md");
  expect(result.output).toContain("Projects.json");
});

test("executeCommand handles unknown command safely with guidance", () => {
  const result = executeCommand("unknowncmd");
  expect(result.output).toContain("Command not found");
  expect(result.type).toBe("error");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/terminal.test.ts`
Expected: FAIL with "Cannot find module '../utils/terminalCommands'"

- [ ] **Step 3: Implement `utils/terminalCommands.ts`**

Implement `executeCommand` using guard clauses. Tokenize arguments, dispatch matching handlers (`help`, `ls`, `cat`, `skills`, `projects`, `contact`, `theme`, `clear`, `whoami`, `sudo`). Return `{ output: string, type: 'normal' | 'success' | 'error' | 'clear', action?: string, payload?: any }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/terminal.test.ts`
Expected: PASS

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add utils/terminalCommands.ts tests/terminal.test.ts
git commit -m "feat(vscode): add terminal command execution engine"
```

---

### Task 4: Central VS Code State Store (`useVSCode.ts`)

**Files:**
- Create: `composables/useVSCode.ts`
- Test: `tests/useVSCode.test.ts`

**Interfaces:**
- Consumes: `utils/vfs.ts`, `utils/themes.ts`.
- Produces: `useVSCode()` composable returning reactive state: `activeFileId`, `openTabs`, `activeActivity`, `isSidebarOpen`, `isTerminalOpen`, `isCommandPaletteOpen`, `activeTheme`, `editorViewMode`, and action methods (`openFile`, `closeTab`, `setTheme`, `setViewMode`, `toggleSidebar`, `toggleTerminal`, `toggleCommandPalette`).

- [ ] **Step 1: Write failing test in `tests/useVSCode.test.ts`**

```ts
import { expect, test } from "bun:test";
import { useVSCode } from "../composables/useVSCode";

test("useVSCode initial state is properly configured", () => {
  const vscode = useVSCode();
  expect(vscode.activeFileId.value).toBe("README.md");
  expect(vscode.openTabs.value).toContain("README.md");
  expect(vscode.isSidebarOpen.value).toBeTrue();
});

test("openFile adds tab and sets active file", () => {
  const vscode = useVSCode();
  vscode.openFile("Projects.json");
  expect(vscode.activeFileId.value).toBe("Projects.json");
  expect(vscode.openTabs.value).toContain("Projects.json");
});

test("closeTab safely closes tab and switches active tab", () => {
  const vscode = useVSCode();
  vscode.openFile("Skills.ts");
  vscode.closeTab("Skills.ts");
  expect(vscode.openTabs.value).not.toContain("Skills.ts");
  expect(vscode.activeFileId.value).toBeDefined();
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/useVSCode.test.ts`
Expected: FAIL with "Cannot find module '../composables/useVSCode'"

- [ ] **Step 3: Implement `composables/useVSCode.ts`**

Create reactive refs for IDE state. Implement guard clauses for tab addition, removal, and active file updates. Ensure functions are modular (under 30 lines each).

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/useVSCode.test.ts`
Expected: PASS

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add composables/useVSCode.ts tests/useVSCode.test.ts
git commit -m "feat(vscode): add central reactive state composable"
```

---

### Task 5: Rich Visual Preview Components

**Files:**
- Create:
  - `components/vscode/previews/ReadmePreview.vue`
  - `components/vscode/previews/AboutPreview.vue`
  - `components/vscode/previews/SkillsPreview.vue`
  - `components/vscode/previews/ProjectsPreview.vue`
  - `components/vscode/previews/ExperiencePreview.vue`
  - `components/vscode/previews/EducationPreview.vue`
  - `components/vscode/previews/ContactPreview.vue`

**Interfaces:**
- Consumes: Portfolio data (`list/*`), `@nuxt/icon`.
- Produces: Polished interactive preview cards matching the rich web aesthetics guidelines (glassmorphism cards, badges, project preview modals/links, animated timelines, working contact form).

- [ ] **Step 1: Create `ReadmePreview.vue`**
Renders hero introduction, avatar/photo, headline "Full Stack Developer & Software Engineer", quick action pills ("Explore Projects", "Open Terminal", "View Resume"), and interactive terminal hints.

- [ ] **Step 2: Create `AboutPreview.vue` and `SkillsPreview.vue`**
`AboutPreview.vue`: Farhan's background, engineering philosophy, and quick stats.
`SkillsPreview.vue`: Categorized tech badges (Frontend, Backend, Database, Cloud & Tools) with visual level bars and icons.

- [ ] **Step 3: Create `ProjectsPreview.vue`**
Grid of featured projects from `list/project.js` with thumbnails, technology badges, GitHub repository links, and live preview buttons.

- [ ] **Step 4: Create `ExperiencePreview.vue` and `EducationPreview.vue`**
`ExperiencePreview.vue`: Interactive vertical timeline of work experience from `list/experience.js`.
`EducationPreview.vue`: Educational achievements and certifications from `list/education.js`.

- [ ] **Step 5: Create `ContactPreview.vue`**
Interactive message sender disguised with IDE telemetry styling, including validation guards for email and message.

- [ ] **Step 6: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add components/vscode/previews/
git commit -m "feat(vscode): create rich preview visual components"
```

---

### Task 6: IDE Shell Components (Titlebar, Activity Bar, Sidebar, Status Bar)

**Files:**
- Create:
  - `components/vscode/VSCodeTitlebar.vue`
  - `components/vscode/VSCodeActivityBar.vue`
  - `components/vscode/VSCodeSidebar.vue`
  - `components/vscode/VSCodeStatusBar.vue`

**Interfaces:**
- Consumes: `useVSCode.ts`, `VFS_FILES`, `THEMES`.
- Produces: Navigational shell components responding to theme variables and user actions.

- [ ] **Step 1: Create `VSCodeTitlebar.vue`**
Traffic light dots, top menu labels (`File`, `Edit`, `View`, `Terminal`, `Help`), centered search button (`farhan-aditya — Visual Studio Code (Ctrl+P)`), and view controls.

- [ ] **Step 2: Create `VSCodeActivityBar.vue`**
Vertical strip with Explorer, Search, Source Control (Git), Extensions, and Settings icons. Handles active state and sidebar toggling.

- [ ] **Step 3: Create `VSCodeSidebar.vue`**
Multi-view sidebar:
- `explorer`: "OPEN EDITORS" list and expandable tree for `src/`, `docs/`, `config/`.
- `search`: Interactive filter search input.
- `git`: Source control view with current branch (`feature/vscode-style-portfolio`).
- `skills`: Farhan's technical skills displayed as installed VS Code marketplace extensions.

- [ ] **Step 4: Create `VSCodeStatusBar.vue`**
Status bar showing Git branch, error/warning count (`0 errors`), Ln/Col indicator, Spaces, UTF-8, language badge, and theme switcher trigger.

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add components/vscode/VSCodeTitlebar.vue components/vscode/VSCodeActivityBar.vue components/vscode/VSCodeSidebar.vue components/vscode/VSCodeStatusBar.vue
git commit -m "feat(vscode): build IDE shell chrome components"
```

---

### Task 7: Editor Area & Tabs (`VSCodeTabs.vue` & `VSCodeEditor.vue`)

**Files:**
- Create:
  - `components/vscode/VSCodeTabs.vue`
  - `components/vscode/VSCodeEditor.vue`

**Interfaces:**
- Consumes: `useVSCode.ts`, `VFS_FILES`, `getFileById`, preview components.
- Produces: The core editor tab bar, breadcrumbs, line numbering gutter, syntax-highlighted code viewer, and split view pane.

- [ ] **Step 1: Create `VSCodeTabs.vue`**
Horizontal scrollable tabs with file icons, tab close buttons, active tab indicators, and right-hand view mode toggle icons (`Code`, `Preview`, `Split Editor`).

- [ ] **Step 2: Create `VSCodeEditor.vue`**
Implements:
- Breadcrumb bar (`portfolio > folder > file`).
- Code Mode: Line numbers gutter + formatted syntax blocks with copy button.
- Preview Mode: Dynamically mounts the registered preview component (`<component :is="...">`).
- Split Mode: 2-column side-by-side view (Code on left, Preview on right) on desktop.
- Guard clause for empty tabs: renders VS Code "Start / No Open Files" welcome placeholder with shortcut tips.

- [ ] **Step 3: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add components/vscode/VSCodeTabs.vue components/vscode/VSCodeEditor.vue
git commit -m "feat(vscode): build editor tabs and hybrid code-preview display"
```

---

### Task 8: Terminal Dock & Command Palette Modals

**Files:**
- Create:
  - `components/vscode/VSCodeTerminal.vue`
  - `components/vscode/VSCodeCommandPalette.vue`

**Interfaces:**
- Consumes: `useVSCode.ts`, `executeCommand` from `utils/terminalCommands.ts`, `VFS_FILES`, `THEMES`.
- Produces: Fully interactive bottom bash dock and top command palette.

- [ ] **Step 1: Create `VSCodeTerminal.vue`**
- Tabs: `TERMINAL`, `OUTPUT`, `PROBLEMS`.
- Interactive bash prompt with command history navigation (`Arrow Up` / `Arrow Down`).
- Command execution via `executeCommand` with colored outputs (`success`, `error`, `normal`).
- Height toggle and close buttons.

- [ ] **Step 2: Create `VSCodeCommandPalette.vue`**
- Modal positioned top-center with backdrop blur.
- Keyboard triggers: `Ctrl+P`, `Cmd+K`, `Escape` to close.
- Filter list of all VFS files and IDE commands (`> Switch Theme`, `> Toggle Terminal`, `> Toggle Split Editor`).
- Arrow key navigation and `Enter` selection.

- [ ] **Step 3: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add components/vscode/VSCodeTerminal.vue components/vscode/VSCodeCommandPalette.vue
git commit -m "feat(vscode): build interactive terminal and command palette"
```

---

### Task 9: Layout Orchestration, Page Integration & Verification

**Files:**
- Create: `components/vscode/VSCodeLayout.vue`
- Modify: `pages/index.vue`
- Create: `tests/vscode-layout.test.ts`

**Interfaces:**
- Consumes: All `components/vscode/*`, `useVSCode.ts`.
- Produces: The primary portfolio page at `/`.

- [ ] **Step 1: Create `components/vscode/VSCodeLayout.vue`**
Assembles Titlebar, ActivityBar, Sidebar, Editor, Terminal, Command Palette, and StatusBar into a responsive CSS Grid/Flexbox layout driven by theme CSS variables. Registers global keyboard shortcuts (`Ctrl+P`, `Ctrl+\``).

- [ ] **Step 2: Update `pages/index.vue`**
Embed `VSCodeLayout.vue` as the primary portfolio view on `feature/vscode-style-portfolio`. Retain SEO metadata, schema markup, and open graph tags.

- [ ] **Step 3: Write layout integration test in `tests/vscode-layout.test.ts`**

```ts
import { expect, test } from "bun:test";
import { readFileSync } from "fs";

test("pages/index.vue incorporates VSCodeLayout", () => {
  const indexPage = readFileSync("pages/index.vue", "utf-8");
  expect(indexPage).toMatch(/<VSCodeLayout\s*\/?>/);
});

test("VSCodeLayout imports all primary IDE components", () => {
  const layout = readFileSync("components/vscode/VSCodeLayout.vue", "utf-8");
  expect(layout).toMatch(/VSCodeTitlebar/);
  expect(layout).toMatch(/VSCodeActivityBar/);
  expect(layout).toMatch(/VSCodeSidebar/);
  expect(layout).toMatch(/VSCodeEditor/);
  expect(layout).toMatch(/VSCodeTerminal/);
  expect(layout).toMatch(/VSCodeStatusBar/);
});
```

- [ ] **Step 4: Run full test suite & build check**

Run: `bun test`
Expected: All tests pass.
Run: `bun run build`
Expected: Nuxt build succeeds without compile or TypeScript errors.

- [ ] **Step 5: Commit (interactive user confirmation required)**

Ask user confirmation via `ask_question`. If approved:
```bash
git add components/vscode/VSCodeLayout.vue pages/index.vue tests/vscode-layout.test.ts
git commit -m "feat(vscode): complete VS Code style portfolio integration"
```
