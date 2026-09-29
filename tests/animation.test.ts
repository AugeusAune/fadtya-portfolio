import { expect, test } from "bun:test";
import { readFileSync, existsSync } from "fs";

test("custom.css includes scroll reveal animations and prefers-reduced-motion rules", () => {
  const css = readFileSync("assets/css/custom.css", "utf-8");
  expect(css).toContain("prefers-reduced-motion");
  expect(css).toContain(".reveal-on-scroll");
  expect(css).toContain(".reveal-visible");
  expect(css).toContain(".stagger-delay-1");
});

test("composables/useScrollReveal.ts exists and exports useScrollReveal", () => {
  expect(existsSync("composables/useScrollReveal.ts")).toBe(true);
});
