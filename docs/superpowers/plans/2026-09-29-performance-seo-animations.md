# Nuxt 4 Upgrade, Performance, SEO, and Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the portfolio to Nuxt 4, achieve blazing-fast performance and top-tier SEO, and add rich, modern animations while maintaining clean code standards.

**Architecture:** Upgrade the core framework to Nuxt 4 while shedding legacy bloat (`element-plus`), integrate full structured JSON-LD and OpenGraph SEO protocols, embed the missing sticky navigation into layouts, and implement a lightweight, zero-dependency IntersectionObserver animation system and CSS micro-interactions with reduced-motion accessibility.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, Tailwind CSS, Bun runtime & test runner (`bun test`), Nitro, Nuxt Color Mode, `@nuxt/icon`.

**Spec:** User request: "add animation in this porto, and i want upgrade the nuxt into nuxt 4" + "fast performance and better seo" adhering to strict code conventions (guard clauses, single H1 hierarchy, responsive image best practices, accessibility standards).

## Global Constraints

- **Nuxt 4 Standards:** Upgrade to Nuxt 4 cleanly without breaking module compatibility; migrate deprecated modules (`nuxt-icon` -> `@nuxt/icon`) and remove unused `@element-plus/nuxt`.
- **Zero Heavy Animation Bloat:** Build animations using native CSS keyframes/transitions and a lightweight Vue composable / directive powered by `IntersectionObserver`.
- **Accessibility:** All animations must respect `@media (prefers-reduced-motion: reduce)`.
- **Heading Hierarchy:** Strictly one `<h1>` per page (Hero section); all other section titles are `<h2>` and cards `<h3>`/`<h4>`.
- **Code Standards:** Guard clauses, early returns, max 2 levels of nesting, max 30-50 lines per function.
- **Git Safety:** Prompt the user interactively before any git commits.

## Review Focus

1. **Nuxt 4 Module & Path Compatibility:** Ensure modules (`@nuxtjs/tailwindcss`, `@nuxtjs/color-mode`, `@nuxtjs/google-fonts`, `@nuxt/icon`) build seamlessly in Nuxt 4.
2. **SSR / Client Hydration Stability:** Ensure JSON-LD scripts and client-side animated elements avoid SSR hydration mismatch.
3. **Accessibility & Reduced Motion:** When `prefers-reduced-motion: reduce` is enabled, all elements should display statically without delays or transforms.
4. **Cumulative Layout Shift (CLS):** Fix image aspect ratios and lazy loading attributes so images do not cause layout jank on load.
5. **Heading Structure SEO:** Demote `Education.vue`'s `<h1>` to `<h2>` to maintain a single `<h1>` document outline.

---

### Task 1: Nuxt 4 Framework Upgrade & Dependency Cleanup

**Files:**
- Modify: `package.json:1-30`
- Modify: `nuxt.config.ts:1-31`
- Delete: `components/TestTab.vue`
- Test: `tests/nuxt-upgrade.test.ts`

**Interfaces:**
- Consumes: `package.json` dependencies
- Produces: Nuxt 4 runtime with `@nuxt/icon`, removal of unused `@element-plus/nuxt` and `element-plus`, and passing compatibility checks.

- [ ] **Step 1: Write failing test verifying Nuxt 4 and clean dependencies**

Create `tests/nuxt-upgrade.test.ts`:
```ts
import { expect, test } from "bun:test";
import pkg from "../package.json";
import nuxtConfig from "../nuxt.config";

test("package.json uses Nuxt 4 and does not depend on element-plus", () => {
  const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/nuxt-upgrade.test.ts`  
Expected: FAIL on Nuxt version not being 4.x and element-plus still present.

- [ ] **Step 3: Update `package.json`, remove dead code, and install Nuxt 4 dependencies**

1. In `package.json`:
   - Upgrade `nuxt` to `^4.0.0` (or `^4.5.2`).
   - Replace `nuxt-icon` with `@nuxt/icon: ^2.5.1`.
   - Remove `@element-plus/nuxt` and `element-plus`.
2. Delete unused dead component `components/TestTab.vue`.
3. In `nuxt.config.ts`:
   - Update `modules` to remove `@element-plus/nuxt` and replace `nuxt-icon` with `@nuxt/icon`.
   - Add `compatibilityVersion: 4` in `future` configuration if needed, or maintain root app configuration.
4. Run `bun install` to update lockfile and dependencies.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/nuxt-upgrade.test.ts`  
Expected: PASS

- [ ] **Step 5: Run Nuxt build to verify Nuxt 4 compilation**

Run: `bun run build`  
Expected: Nuxt 4 client and server build passes without errors.

---

### Task 2: Performance Tuning (Fonts, Nitro Prerender, & Asset Optimization)

**Files:**
- Modify: `nuxt.config.ts`
- Test: `tests/performance-config.test.ts`

**Interfaces:**
- Consumes: Nuxt 4 config
- Produces: Google Fonts with `display: 'swap'`, preconnect resource hints, static Nitro pre-rendering rules.

- [ ] **Step 1: Write failing test for performance configuration**

Create `tests/performance-config.test.ts`:
```ts
import { expect, test } from "bun:test";
import nuxtConfig from "../nuxt.config";

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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/performance-config.test.ts`  
Expected: FAIL on missing display swap and preconnect links.

- [ ] **Step 3: Implement performance optimizations in `nuxt.config.ts`**

1. Set `display: 'swap'` on `@nuxtjs/google-fonts`.
2. Add `link` entries in `app.head.link` with `rel: 'preconnect'` for font and image origins.
3. Configure `nitro.prerender = { crawlLinks: true, routes: ['/'] }`.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/performance-config.test.ts`  
Expected: PASS

---

### Task 3: Comprehensive SEO System & Structured Data

**Files:**
- Create: `utils/seo.ts`
- Create: `tests/seo.test.ts`
- Create: `server/routes/robots.txt.ts`
- Create: `server/routes/sitemap.xml.ts`
- Modify: `pages/index.vue`
- Modify: `components/Education.vue`

**Interfaces:**
- Consumes: Farhan Aditya's portfolio profile info
- Produces: `Person` & `WebSite` JSON-LD schemas, complete OpenGraph/Twitter meta tags, canonical URL, sitemap, robots.txt, and valid single-H1 heading outline.

- [ ] **Step 1: Write failing test for SEO helpers and JSON-LD schemas**

Create `tests/seo.test.ts`:
```ts
import { expect, test } from "bun:test";
import { getSiteMetadata, generatePersonSchema, generateWebSiteSchema } from "../utils/seo";

test("getSiteMetadata returns valid title, description, and canonical URL", () => {
  const meta = getSiteMetadata();
  expect(meta.title).toContain("Farhan Aditya");
  expect(meta.description.length).toBeGreaterThan(50);
  expect(meta.url).toBe("https://farhanaditya.com");
});

test("generatePersonSchema generates valid schema.org Person object", () => {
  const schema = generatePersonSchema();
  expect(schema["@context"]).toBe("https://schema.org");
  expect(schema["@type"]).toBe("Person");
  expect(schema.name).toBe("Farhan Aditya");
  expect(schema.sameAs).toBeArray();
  expect(schema.sameAs.length).toBeGreaterThan(0);
});

test("generateWebSiteSchema generates valid schema.org WebSite object", () => {
  const schema = generateWebSiteSchema();
  expect(schema["@type"]).toBe("WebSite");
  expect(schema.name).toBe("Farhan Aditya Portfolio");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/seo.test.ts`  
Expected: FAIL with "Cannot find module '../utils/seo'".

- [ ] **Step 3: Implement `utils/seo.ts`, routes, and update index.vue & Education.vue**

1. Create `utils/seo.ts` with typed helpers for metadata and JSON-LD objects.
2. Create `server/routes/robots.txt.ts` and `server/routes/sitemap.xml.ts`.
3. In `pages/index.vue`:
   - Add `useSeoMeta()` and JSON-LD `<script type="application/ld+json">`.
   - Ensure `htmlAttrs: { lang: 'en' }`.
4. In `components/Education.vue`:
   - Change `<h1>` to `<h2>` to guarantee exactly one `<h1>` per page.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/seo.test.ts`  
Expected: PASS

---

### Task 4: Layout Navigation & Image Optimization

**Files:**
- Modify: `layouts/layout.vue`
- Modify: `components/Utils/CardProject.vue`
- Modify: `components/HeroSection.vue`
- Test: `tests/markup-audit.test.ts`

**Interfaces:**
- Consumes: `NavBar.vue` into layout
- Produces: Integrated sticky navigation across all viewport sizes, optimized images with `loading="lazy"`, `decoding="async"`, descriptive alt text, and explicit aspect ratios.

- [ ] **Step 1: Write failing test for layout integration and image markup**

Create `tests/markup-audit.test.ts`:
```ts
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
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/markup-audit.test.ts`  
Expected: FAIL on missing NavBar and image attributes.

- [ ] **Step 3: Implement Layout navigation & image improvements**

1. In `layouts/layout.vue`: Add `<NavBar />` above `<slot />`.
2. In `components/Utils/CardProject.vue`: Add `:alt="props.title"`, `loading="lazy"`, `decoding="async"`, and aspect ratio classes.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/markup-audit.test.ts`  
Expected: PASS

---

### Task 5: Rich Modern Animations & Scroll Reveal Micro-Interactions

**Files:**
- Create: `composables/useScrollReveal.ts`
- Modify: `assets/css/custom.css`
- Modify: `components/HeroSection.vue`
- Modify: `components/SkilsSection.vue`
- Modify: `components/Project.vue`
- Modify: `components/Experience.vue`
- Modify: `components/Contact.vue`
- Test: `tests/animation.test.ts`

**Interfaces:**
- Consumes: Native `IntersectionObserver` in `composables/useScrollReveal.ts`
- Produces: Smooth staggered scroll animations (fade-in, slide-up), hero glow & code shimmer, interactive hover micro-animations, and full `prefers-reduced-motion` compliance.

- [ ] **Step 1: Write failing test for animation classes and reduced-motion rules**

Create `tests/animation.test.ts`:
```ts
import { expect, test } from "bun:test";
import { readFileSync } from "fs";

test("custom.css includes scroll reveal animations and prefers-reduced-motion rules", () => {
  const css = readFileSync("assets/css/custom.css", "utf-8");
  expect(css).toContain("prefers-reduced-motion");
  expect(css).toContain(".reveal-on-scroll");
  expect(css).toContain(".reveal-visible");
  expect(css).toContain(".stagger-delay");
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `bun test tests/animation.test.ts`  
Expected: FAIL on missing animation classes.

- [ ] **Step 3: Implement Animation Composable, CSS Keyframes, and Component Enhancements**

1. In `assets/css/custom.css`:
   - Add `.reveal-on-scroll` with `opacity: 0; transform: translateY(24px); transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);`.
   - Add `.reveal-visible` with `opacity: 1; transform: translateY(0);`.
   - Add `.stagger-delay-1`, `.stagger-delay-2`, `.stagger-delay-3`, etc.
   - Add hero code glow pulse effect.
   - Add `@media (prefers-reduced-motion: reduce)` block resetting all transitions and transforms to `none !important`.
2. In `composables/useScrollReveal.ts`:
   - Implement `useScrollReveal()` hook that observes `.reveal-on-scroll` elements via `IntersectionObserver` and applies `.reveal-visible` as they scroll into view.
3. Enhance sections (`HeroSection.vue`, `SkilsSection.vue`, `Project.vue`, `Experience.vue`, `Contact.vue`):
   - Hero: animated badge ping, smooth entrance transitions, code block hover glow.
   - Skills: staggered card reveal on scroll and subtle icon lift on hover.
   - Experience: active pulse sparkle on current job and timeline fade-in.
   - Projects: 3D-feel hover elevation and subtle zoom.

- [ ] **Step 4: Run test to verify it passes**

Run: `bun test tests/animation.test.ts`  
Expected: PASS

---

### Task 6: End-to-End Verification & Production Build Audit

**Files:**
- Run: `bun test`
- Run: `bun run build`

**Interfaces:**
- Consumes: Complete project codebase
- Produces: 100% passing test suite and clean, optimized production build.

- [ ] **Step 1: Execute full test suite**

Run: `bun test`  
Expected: All tests pass (0 failures).

- [ ] **Step 2: Execute production build**

Run: `bun run build`  
Expected: Build passes with Nuxt 4, Nitro prerendering, and optimized assets.

- [ ] **Step 3: Inspect generated output**

Verify:
- Single `<h1>` in output.
- Meta tags and JSON-LD in rendered HTML.
- Correct static routes for `/robots.txt` and `/sitemap.xml`.
