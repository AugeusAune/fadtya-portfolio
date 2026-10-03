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

test("getPathForFile generates clean root and param-style file paths", () => {
  const vscode = useVSCode();
  expect(vscode.getPathForFile("README.md")).toBe("/");
  expect(vscode.getPathForFile("Contact.env")).toBe("/Contact.env");
  expect(vscode.getPathForFile("Projects.json")).toBe("/Projects.json");
});

test("getFileFromPath resolves file IDs from path parameters cleanly", () => {
  const vscode = useVSCode();
  expect(vscode.getFileFromPath("/")).toBe("README.md");
  expect(vscode.getFileFromPath("")).toBe("README.md");
  expect(vscode.getFileFromPath("/README.md")).toBe("README.md");
  expect(vscode.getFileFromPath("/Contact.env")).toBe("Contact.env");
  expect(vscode.getFileFromPath("/Projects.json")).toBe("Projects.json");
  expect(vscode.getFileFromPath("/Skills.ts")).toBe("Skills.ts");
  expect(vscode.getFileFromPath("/unknown-file")).toBeNull();
});

test("saveState and loadState persist and restore workspace state", () => {
  const storageMap: Record<string, string> = {};
  const mockStorage = {
    getItem: (key: string) => storageMap[key] || null,
    setItem: (key: string, val: string) => { storageMap[key] = val; },
    removeItem: (key: string) => { delete storageMap[key]; },
    clear: () => { Object.keys(storageMap).forEach(k => delete storageMap[k]); }
  };

  (globalThis as any).window = {
    innerWidth: 1024,
    location: { href: "http://localhost:3000/", pathname: "/", search: "" },
    history: { pushState: () => {}, replaceState: () => {} }
  };
  (globalThis as any).localStorage = mockStorage;

  const vscode = useVSCode();
  vscode.openFile("Education.json");
  vscode.setViewMode("code");
  vscode.saveState();

  expect(storageMap["vscode_workspace_state"]).toBeDefined();
  const parsed = JSON.parse(storageMap["vscode_workspace_state"] || '{}');
  expect(parsed.activeFileId).toBe("Education.json");
  expect(parsed.editorViewMode).toBe("code");
  expect(parsed.openTabs).toContain("Education.json");

  // Simulate fresh instance loading stored state
  vscode.loadState();
  expect(vscode.activeFileId.value).toBe("Education.json");
  expect(vscode.editorViewMode.value).toBe("code");
});
