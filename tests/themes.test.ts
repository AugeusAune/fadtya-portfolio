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
