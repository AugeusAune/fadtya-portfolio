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
