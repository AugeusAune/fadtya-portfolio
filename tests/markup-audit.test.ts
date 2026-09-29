import { expect, test } from "bun:test";
import { readFileSync } from "fs";

test("layouts/layout.vue renders NavBar component", () => {
  const layout = readFileSync("layouts/layout.vue", "utf-8");
  expect(layout).toMatch(/<NavBar\s*\/?>/);
});

test("CardProject.vue uses descriptive alt tag and lazy loading", () => {
  const card = readFileSync("components/Utils/CardProject.vue", "utf-8");
  expect(card).toMatch(/:alt="props\.title"/);
  expect(card).toMatch(/loading="lazy"/);
  expect(card).toMatch(/decoding="async"/);
});

test("Education.vue does not contain an h1 tag", () => {
  const education = readFileSync("components/Education.vue", "utf-8");
  expect(education).not.toMatch(/<h1/);
});
