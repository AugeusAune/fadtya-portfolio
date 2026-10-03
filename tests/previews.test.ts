import { expect, test } from "bun:test";
import { readFileSync, existsSync } from "fs";

test("All 7 preview components exist", () => {
  const previews = [
    "ReadmePreview.vue",
    "AboutPreview.vue",
    "SkillsPreview.vue",
    "ProjectsPreview.vue",
    "ExperiencePreview.vue",
    "EducationPreview.vue",
    "ContactPreview.vue"
  ];

  for (const name of previews) {
    const path = `components/vscode/previews/${name}`;
    expect(existsSync(path)).toBeTrue();
  }
});
