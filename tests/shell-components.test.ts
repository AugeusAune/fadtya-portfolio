import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "fs";

test("All 4 shell chrome components exist", () => {
  const components = [
    "components/vscode/VSCodeTitlebar.vue",
    "components/vscode/VSCodeActivityBar.vue",
    "components/vscode/VSCodeSidebar.vue",
    "components/vscode/VSCodeStatusBar.vue"
  ];

  for (const path of components) {
    expect(existsSync(path)).toBeTrue();
  }
});
