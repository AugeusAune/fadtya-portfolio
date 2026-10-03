import { expect, test } from "bun:test";
import { existsSync, readFileSync } from "fs";

test("VSCodeTabs.vue and VSCodeEditor.vue exist", () => {
  expect(existsSync("components/vscode/VSCodeTabs.vue")).toBeTrue();
  expect(existsSync("components/vscode/VSCodeEditor.vue")).toBeTrue();
});

test("VSCodeEditor maps all 7 preview components", () => {
  const content = readFileSync("components/vscode/VSCodeEditor.vue", "utf-8");
  expect(content).toMatch(/ReadmePreview/);
  expect(content).toMatch(/AboutPreview/);
  expect(content).toMatch(/SkillsPreview/);
  expect(content).toMatch(/ProjectsPreview/);
  expect(content).toMatch(/ExperiencePreview/);
  expect(content).toMatch(/EducationPreview/);
  expect(content).toMatch(/ContactPreview/);
});
