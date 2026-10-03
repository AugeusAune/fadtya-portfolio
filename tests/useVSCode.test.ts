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
