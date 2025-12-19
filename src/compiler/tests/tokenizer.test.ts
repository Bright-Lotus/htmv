import { describe, expect, test } from "bun:test";
import path from "node:path";
import { type Token, tokenize } from "../tokenizer";

describe("Tokenizer tests", () => {
	test("Simple HTML", async () => {
		const input = await Bun.file(
			path.resolve("src", "compiler", "tests", "tokenizer", "input", "1.html"),
		).text();
		const tokens = tokenize(input);
		const expectedOutput: Token[] = [];
		expect(tokens).toBe(expectedOutput);
	});
});
