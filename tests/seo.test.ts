import { expect, test } from "bun:test";
import { getSiteMetadata, generatePersonSchema, generateWebSiteSchema } from "../utils/seo";

test("getSiteMetadata returns valid title, description, and canonical URL", () => {
  const meta = getSiteMetadata();
  expect(meta.title).toContain("Farhan Aditya");
  expect(meta.description.length).toBeGreaterThan(50);
  expect(meta.url).toBe("https://fadtya-portfolio.vercel.app");
  expect(meta.keywords).toBeArray();
  expect(meta.keywords.length).toBeGreaterThan(0);
});

test("generatePersonSchema generates valid schema.org Person object", () => {
  const schema = generatePersonSchema();
  expect(schema["@context"]).toBe("https://schema.org");
  expect(schema["@type"]).toBe("Person");
  expect(schema.name).toBe("Farhan Aditya");
  expect(schema.jobTitle).toContain("Full Stack");
  expect(schema.sameAs).toBeArray();
  expect(schema.sameAs.length).toBeGreaterThan(0);
});

test("generateWebSiteSchema generates valid schema.org WebSite object", () => {
  const schema = generateWebSiteSchema();
  expect(schema["@context"]).toBe("https://schema.org");
  expect(schema["@type"]).toBe("WebSite");
  expect(schema.name).toBe("Farhan Aditya Portfolio");
  expect(schema.url).toBe("https://fadtya-portfolio.vercel.app");
});
