import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import { parse } from "../../parser";

const inputFilesPath = path.resolve(import.meta.dir, "input");
const outputFilesPath = path.resolve(import.meta.dir, "output");
const inputFilesNames = await fs.readdir(inputFilesPath);

describe("Parser tests", () => {
	inputFilesNames.forEach((inputFileName) => {
		const name = inputFileName.slice(0, -".ts".length);
		test(name, async () => {
			const input = (await import(path.resolve(inputFilesPath, inputFileName)))
				.default;
			const output = parse(input);
			const expectedOutput = await Bun.file(
				path.resolve(outputFilesPath, `${name}.json`),
			).json();
			expect(output).toEqual(expectedOutput);
		});
	});
});
