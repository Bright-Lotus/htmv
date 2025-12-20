import { describe, expect, test } from "bun:test";
import fs from "node:fs/promises";
import path from "node:path";
import { render } from "../../renderer";

const inputFilesPath = path.resolve(import.meta.dir, "input");
const outputFilesPath = path.resolve(import.meta.dir, "output");
const inputFilesNames = await fs.readdir(inputFilesPath);

describe("Renderer tests", () => {
	inputFilesNames.forEach((inputFileName) => {
		const name = inputFileName.slice(0, -".json".length);
		test(name, async () => {
			const input = await Bun.file(
				path.resolve(inputFilesPath, inputFileName),
			).json();
			const output = render(input.root, input.context);
			const expectedOutput = await Bun.file(
				path.resolve(outputFilesPath, `${name}.html`),
			).text();
			expect(output).toEqual(expectedOutput);
		});
	});
});
