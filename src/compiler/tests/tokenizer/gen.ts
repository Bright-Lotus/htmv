import path from "node:path";
import { $ } from "bun";
import { tokenize } from "../../tokenizer";

const fileName = process.argv[2];
if (fileName === undefined) throw new Error("Missing input test file name");
const input = await Bun.file(
	path.resolve(import.meta.dir, "input", `${fileName}.html`),
).text();
const tokens = tokenize(input);
const outputFilePath = path.resolve(
	import.meta.dir,
	"output",
	`${fileName}.json`,
);
await Bun.write(outputFilePath, JSON.stringify(tokens));
await $`bunx biome check ${outputFilePath} --fix`;
