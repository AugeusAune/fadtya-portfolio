import { expect, test } from "bun:test";
// @ts-ignore
globalThis.defineNuxtConfig = (config: any) => config;
const nuxtConfig = (await import("../nuxt.config")).default;

test("Google Fonts configured with display swap", () => {
  const modules = nuxtConfig.modules || [];
  const googleFonts = modules.find(
    (m: any) => Array.isArray(m) && m[0] === "@nuxtjs/google-fonts"
  );
  expect(googleFonts).toBeDefined();
  expect(googleFonts[1].display).toBe("swap");
});

test("Preconnect resource hints configured for Google Fonts and external images", () => {
  const links = nuxtConfig.app?.head?.link || [];
  const preconnects = links.filter((l: any) => l.rel === "preconnect").map((l: any) => l.href);
  expect(preconnects).toContain("https://fonts.googleapis.com");
  expect(preconnects).toContain("https://fonts.gstatic.com");
});

test("Nitro prerender routes configured for static performance", () => {
  expect(nuxtConfig.nitro?.prerender?.routes).toContain("/");
});
