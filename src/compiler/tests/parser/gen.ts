import path from "node:path";
import { $ } from "bun";
import { parse } from "../../parser";

const fileName = process.argv[2];
if (fileName === undefined) throw new Error("Missing input test file name");
const input = (
	await import(path.resolve(import.meta.dir, "input", `${fileName}.ts`))
).default;
const output = parse(input);
const outputFilePath = path.resolve(
	import.meta.dir,
	"output",
	`${fileName}.json`,
);
await Bun.write(outputFilePath, JSON.stringify(output));
await $`bunx biome check ${outputFilePath} --fix`;
