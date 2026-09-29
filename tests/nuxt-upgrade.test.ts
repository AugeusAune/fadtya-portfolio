import { expect, test } from "bun:test";
import pkg from "../package.json";
// @ts-ignore
globalThis.defineNuxtConfig = (config: any) => config;
const nuxtConfig = (await import("../nuxt.config")).default;

test("package.json uses Nuxt 4 and does not depend on element-plus", () => {
  const allDeps: Record<string, string | undefined> = { ...pkg.dependencies, ...pkg.devDependencies };
  expect(allDeps["nuxt"]).toMatch(/(\^|~)?4\./);
  expect(allDeps["@element-plus/nuxt"]).toBeUndefined();
  expect(allDeps["element-plus"]).toBeUndefined();
  expect(allDeps["@nuxt/icon"]).toBeDefined();
});

test("nuxt.config.ts modules list excludes element-plus", () => {
  const modules = nuxtConfig.modules || [];
  const hasElementPlus = modules.some(
    (m: any) => m === "@element-plus/nuxt" || (Array.isArray(m) && m[0] === "@element-plus/nuxt")
  );
  expect(hasElementPlus).toBe(false);
});
