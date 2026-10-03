import { expect, test } from "bun:test";
import { executeCommand } from "../utils/terminalCommands";

test("executeCommand handles empty input cleanly", () => {
  const result = executeCommand("   ");
  expect(result.output).toBe("");
  expect(result.type).toBe("normal");
});

test("executeCommand handles help command", () => {
  const result = executeCommand("help");
  expect(result.output).toContain("Available commands");
  expect(result.output).toContain("skills");
  expect(result.output).toContain("projects");
});

test("executeCommand handles ls command", () => {
  const result = executeCommand("ls");
  expect(result.output).toContain("README.md");
  expect(result.output).toContain("Projects.json");
});

test("executeCommand handles unknown command safely with guidance", () => {
  const result = executeCommand("unknowncmd");
  expect(result.output).toContain("Command not found");
  expect(result.type).toBe("error");
});
