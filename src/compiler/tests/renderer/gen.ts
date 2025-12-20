import path from "node:path";
import { $ } from "bun";
import { render } from "../../renderer";

const fileName = process.argv[2];
if (fileName === undefined) throw new Error("Missing input test file name");
const input = (
	await import(path.resolve(import.meta.dir, "input", `${fileName}.ts`))
).default;
const output = render(input.root, input.context);
const outputFilePath = path.resolve(
	import.meta.dir,
	"output",
	`${fileName}.html`,
);
await Bun.write(outputFilePath, output);
await $`bunx biome check ${outputFilePath} --fix`;
