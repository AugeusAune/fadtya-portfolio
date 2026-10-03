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
