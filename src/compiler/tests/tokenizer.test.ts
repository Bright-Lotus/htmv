import { describe, expect, test } from "bun:test";
import path from "node:path";
import { tokenize } from "../tokenizer";

const commonPath = ["src", "compiler", "tests", "tokenizer"];

describe("Tokenizer tests", () => {
	test("Simple HTML", async () => {
		const input = await Bun.file(
			path.resolve(...commonPath, "input", "1.html"),
		).text();
		const tokens = tokenize(input);
		const expectedOutput = await Bun.file(
			path.resolve(...commonPath, "output", "1.json"),
		).json();
		expect(tokens).toEqual(expectedOutput);
	});
});
