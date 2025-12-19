import { describe, expect, test } from "bun:test";
import { type Token, tokenize } from "../tokenizer";

describe("Tokenizer tests", () => {
	test("Simple HTML", async () => {
		const input = await Bun.file("parser-1-input.html").text();
		const tokens = tokenize(input);
		const expectedOutput: Token[] = [];
		expect(tokens).toBe(expectedOutput);
	});
});
