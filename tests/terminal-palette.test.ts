import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "fs";

test("VSCodeTerminal.vue and VSCodeCommandPalette.vue exist", () => {
  expect(existsSync("components/vscode/VSCodeTerminal.vue")).toBeTrue();
  expect(existsSync("components/vscode/VSCodeCommandPalette.vue")).toBeTrue();
});

test("VSCodeTerminal.vue connects with executeCommand", () => {
  const content = readFileSync("components/vscode/VSCodeTerminal.vue", "utf-8");
  expect(content).toMatch(/executeCommand/);
  expect(content).toMatch(/history/i);
});

test("VSCodeCommandPalette.vue handles search and keyboard navigation", () => {
  const content = readFileSync("components/vscode/VSCodeCommandPalette.vue", "utf-8");
  expect(content).toMatch(/VFS_FILES/);
  expect(content).toMatch(/keydown/i);
});
