import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import { tokenize } from "../../tokenizer";

const inputFilesPath = path.resolve(import.meta.dir, "input");
const outputFilesPath = path.resolve(import.meta.dir, "output");
const inputFilesNames = await fs.readdir(inputFilesPath);

describe("Tokenizer tests", () => {
	inputFilesNames.forEach((inputFileName) => {
		const name = inputFileName.slice(0, -".html".length);
		test(name, async () => {
			const input = await Bun.file(
				path.resolve(inputFilesPath, inputFileName),
			).text();
			const tokens = tokenize(input);
			const expectedOutput = await Bun.file(
				path.resolve(outputFilesPath, `${name}.json`),
			).json();
			expect(tokens).toEqual(expectedOutput);
		});
	});
});
